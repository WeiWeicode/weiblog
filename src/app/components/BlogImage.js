'use client';

import { useState } from 'react';

export default function BlogImage({ src, alt }) {
  const [imageError, setImageError] = useState(false);
  
  if (imageError) {
    return null;
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover"
      onError={() => setImageError(true)}
    />
  );
}