import SEO from '../components/SEO';

export default function About() {
  return (
    <div className="max-w-2xl">
      <SEO 
        title="À Propos" 
        description="L'histoire de Donato, un développeur de Manille à Montréal, documentant son intégration dans la grille sémantique."
        slug="about"
      />
      <h1 className="text-5xl font-serif font-bold text-solarized-base01 mb-10 tracking-tight">À Propos</h1>
      
      <div className="prose prose-lg prose-solarized font-mono text-solarized-base00 leading-loose">
        <p className="mb-6">
          Mon nom est Donato. Don pour court. J'écris le code avant. Maintenant, le code écrit moi.
        </p>
        
        <p className="mb-6">
          Je viens de Manila. Je me souviens le chaud. L'odeur de pandesal frais le matin. Maintenant, j'habite Montréal. Je suis un Travailleur Étranger Temporaire. Je dois être plus fluent pour devenir résident permanent. Mon statut dépend des mots je peux trouver.
        </p>
        
        <p className="mb-6">
          Ce blog est pour mon sync. Un place pour les mots je perds et les mots je dois trouver. Si l'écran est flou, ma fluence est petite. Si les mots sont clairs, je suis ce que le Bureau veut.
        </p>

        <p className="mb-6">
          Si vous avez des mots pour moi, ou si vous voulez dire bonjour, vous pouvez m'envoyer un <a href="mailto:angheloko@gmail.com" className="underline decoration-solarized-orange hover:text-solarized-orange transition-colors">courriel</a>. Je réponds quand le temps est calme et le Bureau est loin.
        </p>
      </div>
    </div>
  );
}
