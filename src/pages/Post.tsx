import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { posts } from '../lib/posts';
import { ArrowLeft } from 'lucide-react';

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20 font-mono">
        <h1 className="text-3xl font-bold text-solarized-red mb-4">ERROR: FILE_NOT_FOUND</h1>
        <Link to="/" className="text-solarized-blue hover:underline">
          [ Return to Index ]
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-none">
      <Link 
        to="/" 
        className="inline-flex items-center text-xs font-mono text-solarized-base1 hover:text-solarized-blue mb-10 transition-colors group uppercase tracking-widest"
      >
        <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
        ../Back_to_Index
      </Link>

      <header className="mb-12 pb-8 border-b-2 border-solarized-base2 border-dashed">
        <div className="flex gap-3 mb-6">
          {post.tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono font-bold text-solarized-violet uppercase tracking-widest border border-solarized-base2 px-2 py-1">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-solarized-base01 mb-6 leading-none tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-xs font-mono text-solarized-base1">
          <time dateTime={post.date}>DATE: {post.date}</time>
          <span>|</span>
          <span>EST_READ: {post.readTime}</span>
        </div>
      </header>

      <div className="prose prose-lg prose-solarized max-w-none font-mono text-solarized-base00 leading-loose">
        <Markdown>{post.content}</Markdown>
      </div>

      <hr className="my-16 border-solarized-base1 border-dashed opacity-30" />

      <div className="flex justify-between items-center font-mono text-sm">
        <Link 
          to="/" 
          className="text-solarized-blue hover:text-solarized-orange font-bold uppercase tracking-widest"
        >
          &lt;&lt; Return to Archive
        </Link>
      </div>
    </article>
  );
}
