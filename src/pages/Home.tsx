import { Link } from 'react-router-dom';
import { posts } from '../lib/posts';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="mb-20 border-l-4 border-solarized-base01 pl-6 py-2">
        <h1 className="text-5xl font-serif font-bold text-solarized-base01 mb-6 tracking-tight">
          Notes & Pensées
        </h1>
        <p className="text-lg text-solarized-base00 font-mono leading-relaxed max-w-xl">
          // Ce blog est pour le Bureau de la Cohérence. C’est pour mon sync.
        </p>
      </section>

      <div className="space-y-16">
        {posts.map((post) => (
          <article key={post.id} className="group relative">
            {/* Decorative corner marker */}
            <div className="absolute -left-4 top-0 w-1 h-full bg-solarized-base2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-baseline justify-between mb-3 border-b border-solarized-base2 pb-2">
              <span className="text-xs font-mono text-solarized-base1 uppercase tracking-widest">
                DOC_ID: {post.date.replace(/-/g, '')}
              </span>
              <span className="text-xs font-mono text-solarized-base1 border border-solarized-base1 px-2 py-0.5 rounded-sm">
                {post.readTime}
              </span>
            </div>
            
            <Link to={`/post/${post.slug}`} className="block">
              <h2 className="text-3xl font-serif font-bold text-solarized-base01 group-hover:text-solarized-orange transition-colors mb-4 decoration-solarized-base1/30 underline-offset-4">
                {post.title}
              </h2>
            </Link>
            
            <p className="text-solarized-base00 font-mono leading-relaxed mb-6 text-sm">
              {post.excerpt}
            </p>
            
            <Link 
              to={`/post/${post.slug}`}
              className="inline-flex items-center text-xs font-mono font-bold text-solarized-blue hover:text-solarized-orange transition-colors uppercase tracking-widest border-b border-transparent hover:border-solarized-orange"
            >
              [ Read File ]
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
