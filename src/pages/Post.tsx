import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { posts } from '../lib/posts';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useEffect } from 'react';

export default function Post() {
  const { slug } = useParams();
  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];

  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const prevPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  useEffect(() => {
    if (!post) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": "Donato"
      },
      "datePublished": post.date,
      "url": `https://les-poids-des-mots.com/post/${post.slug}`,
      "image": "https://les-poids-des-mots.com/favicon.svg"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [post]);

  if (!post) {
    return (
      <div className="text-center py-20 font-mono">
        <SEO title="404: FICHIER_INTROUVABLE" />
        <h1 className="text-3xl font-bold text-solarized-red mb-4">ERREUR : FICHIER_INTROUVABLE</h1>
        <Link to="/" className="text-solarized-blue hover:underline">
          [ Retour à l'accueil ]
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-none">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        type="article" 
        slug={`post/${post.slug}`} 
      />

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
          <time dateTime={post.date}>DATE : {post.date}</time>
          <span>|</span>
          <span>LECTURE_ESTIMÉE : {post.readTime}</span>
        </div>
      </header>

      <div className="prose prose-lg prose-solarized max-w-none font-mono text-solarized-base00 leading-loose">
        <Markdown>{post.content}</Markdown>
      </div>

      <div className="flex flex-col gap-8 mt-16 font-mono">
        <div className="flex flex-col md:flex-row justify-between gap-4 border-t border-solarized-base2 pt-8">
          {prevPost ? (
            <Link 
              to={`/post/${prevPost.slug}`}
              className="flex-1 group"
            >
              <div className="flex items-center text-solarized-blue group-hover:text-solarized-orange transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold">{prevPost.title}</span>
              </div>
            </Link>
          ) : <div className="flex-1" />}

          {nextPost ? (
            <Link 
              to={`/post/${nextPost.slug}`}
              className="flex-1 group text-right"
            >
              <div className="flex items-center justify-end text-solarized-blue group-hover:text-solarized-orange transition-colors">
                <span className="font-bold">{nextPost.title}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </article>
  );
}
