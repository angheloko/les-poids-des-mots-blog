import frontMatter from 'front-matter';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
}

interface FrontMatterAttributes {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

const postsGlob = import.meta.glob('../content/posts/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
});

export const posts: BlogPost[] = Object.entries(postsGlob).map(([path, rawContent]) => {
  const { attributes, body } = frontMatter<FrontMatterAttributes>(rawContent as string);
  
  // Extract filename as fallback ID if needed, though we use slug mostly
  const filename = path.split('/').pop()?.replace('.md', '') || '';

  return {
    id: filename,
    slug: attributes.slug || filename,
    title: attributes.title,
    date: attributes.date ? new Date(attributes.date).toISOString().split('T')[0] : '',
    excerpt: attributes.excerpt,
    content: body,
    tags: attributes.tags || [],
    readTime: attributes.readTime || '5 min read'
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
