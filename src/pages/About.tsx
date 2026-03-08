import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-5xl font-serif font-bold text-solarized-base01 mb-10 tracking-tight">About</h1>
      
      <div className="prose prose-lg prose-solarized font-mono text-solarized-base00 leading-loose">
        <p className="mb-6">
          // Welcome to <strong>Ink & Light</strong>. 
          <br/>
          // This is a digital garden cultivated with the principles of minimalism and readability in mind.
        </p>
        
        <p className="mb-6">
          The design is inspired by the <a href="https://ethanschoonover.com/solarized/" target="_blank" rel="noreferrer">Solarized</a> color palette, created by Ethan Schoonover. It is designed to reduce eye strain and provide a high-quality reading experience, similar to e-ink displays but with the warmth of paper.
        </p>
        
        <h2 className="text-2xl font-serif font-bold text-solarized-base01 mt-10 mb-6 border-b border-solarized-base2 pb-2 inline-block">System Specifications</h2>
        <ul className="list-none pl-0 space-y-2 font-mono text-sm">
          <li>[x] React 19</li>
          <li>[x] Vite</li>
          <li>[x] Tailwind CSS</li>
          <li>[x] React Router</li>
          <li>[x] Framer Motion</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-solarized-base01 mt-10 mb-6 border-b border-solarized-base2 pb-2 inline-block">Communication Channels</h2>
        <p>
          You can find me on <a href="#">Twitter</a> or <a href="#">GitHub</a>.
        </p>
      </div>
    </div>
  );
}
