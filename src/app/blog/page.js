import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true, // set to `false` to bypass the edge cache
});

// In App Router, we fetch data directly in the component
export default async function BlogPage() {
  const query = '*[_type == "blogPost"]';  // Using blogPost from your schema
  const posts = await client.fetch(query);
  console.log(posts);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.title} {post.content}</li>
          

        ))}
      </ul>
    </div>
  );
}