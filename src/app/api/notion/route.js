import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Initialize Notion client
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    
    // Query the database
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "status",
        select: {
          equals: "Published"
        }
      },
      sorts: [
        {
          property: "date",
          direction: "descending"
        }
      ]
    });


    // Process the data before sending it to the client
    const processedData = {
      results: response.results.map((page) => {
        const titleProperty = page.properties.title;
        const summaryProperty = page.properties.summary;
        const dateProperty = page.properties.date;

        // Parse title, summary, and date fields
        const title = titleProperty?.title[0]?.plain_text || "No Title";
        const summary = summaryProperty?.rich_text[0]?.plain_text || "No Summary";
        const category = page.properties.category?.select?.name || "No Category";
        const tags = page.properties.tags?.multi_select.map(tag => tag.name) || ["No Tags"];
        const date = dateProperty?.date?.start || "No Date";

        // Use cover image if available, otherwise use default
        const imageUrl = page.cover?.external?.url || page.cover?.file?.url || "https://picsum.photos/300/200";

        return {
          id: page.id,
          title,
          summary,
          category,
          tags,
          date,
          imageUrl,
          notionPageUrl: page.url,
        };
      })
    };
    // console.log(processedData.results);
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching from Notion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Notion' },
      { status: 500 }
    );
  }
}