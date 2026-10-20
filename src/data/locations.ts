import reference from './communes.json';
export type LocalEditorial = {
  status: 'draft' | 'published';
  verifiedAt: string;
  title: string;
  intro: string;
  metaDescription?: string;
  sections: { title: string; text: string }[];
  questions: { question: string; answer: string }[];
  relatedGuides: string[];
  sources: { title: string; url: string }[];
};
export const priorityTowns = [
  'Perpignan',
  'Canet-en-Roussillon',
  'Saint-Estève',
  'Cabestany',
  'Saint-Cyprien',
  'Argelès-sur-Mer',
  'Rivesaltes',
  'Pia',
  'Bompas',
  'Le Soler',
  'Toulouges',
  'Thuir',
  'Elne',
  'Céret',
  'Prades',
  'Le Barcarès',
  'Sainte-Marie-la-Mer',
  'Pollestres',
  'Saleilles',
];
// La publication nécessite un contenu local validé ; aucune page satellite automatique.
export const localEditorial: Record<string, LocalEditorial> = {
  '66136': {
    status: 'published',
    verifiedAt: '2026-10-20',
    title: 'Location de climatisation à Perpignan : partons de votre lieu de vie.',
    metaDescription:
      'Location de climatisation à Perpignan : critères techniques, accès au centre et préparation du devis pour un logement, un bureau ou un commerce.',
    intro:
      'Dans un appartement du centre, un bureau ou une boutique, une demande de climatisation temporaire se prépare à l’échelle de la pièce. À Perpignan, décrivez votre adresse et les contraintes d’accès pour étudier votre projet.',
    sections: [
      {
        title: 'Un projet à Perpignan, une adresse précise',
        text: 'Perpignan est identifiée par le code INSEE 66136 dans le référentiel officiel des communes. Pour votre demande, la commune est un premier repère ; l’étage, l’accès à l’immeuble et la configuration du local sont tout aussi utiles. Dans un appartement, indiquez si l’appareil devra emprunter un escalier ou un ascenseur. Pour un commerce, précisez les heures durant lesquelles un accès est possible. Ces informations permettent d’examiner la faisabilité, sans présumer de conditions de transport ni de mise en place.',
      },
      {
        title: 'Dans le centre historique, regarder d’abord les ouvertures',
        text: 'Le centre historique de Perpignan fait partie des secteurs identifiés par l’office de tourisme de la ville. Si votre projet s’y situe, ne déduisez pas la compatibilité d’un appareil du seul aspect du bâtiment. Relevez le type de fenêtre, ses dimensions et les possibilités de passage vers l’extérieur. Un monobloc doit rejeter l’air chaud hors de la pièce. Toute adaptation d’une menuiserie ou d’une façade doit être autorisée par les personnes compétentes ; aucune modification permanente n’est présumée dans une demande de location.',
      },
      {
        title: 'Logement, bureau, boutique : des priorités différentes',
        text: 'Dans un logement perpignanais, commencez par la pièce effectivement occupée et ses heures d’usage. Pour une chambre, posez la question du bruit et de l’organisation du rafraîchissement. Dans un bureau, signalez les postes informatiques et le nombre de personnes. Pour une boutique, la présence d’une vitrine et les ouvertures de porte peuvent changer les apports de chaleur. Il est plus utile de décrire ces éléments que de demander une puissance sur la seule base de la surface totale du local.',
      },
      {
        title: 'Préparer les informations avant la demande',
        text: 'Rassemblez les dimensions de la pièce, la hauteur sous plafond, les dates envisagées et le type d’ouverture disponible. Signalez les restrictions d’accès et les contraintes de circulation. Si votre période est encore incertaine, indiquez une durée approximative sans supposer de disponibilité. Le matériel, le prix, les accessoires et les éventuelles modalités de transport sont à confirmer dans une proposition adaptée.',
      },
    ],
    questions: [
      {
        question: 'Où demander une location de climatiseur à Perpignan ?',
        answer:
          'Vous pouvez préparer une demande sur le site Location Climatisation en indiquant votre commune, la période et le type de pièce. L’étude doit confirmer le matériel disponible et les conditions. Aucun point de retrait ou accueil physique n’est indiqué sans adresse vérifiée.',
      },
      {
        question: 'Puis-je demander une location pour un appartement au centre de Perpignan ?',
        answer:
          'Vous pouvez décrire le projet en précisant l’étage, les accès et l’ouverture disponible. La possibilité de mettre en place une solution dépend de ces contraintes et du matériel réellement disponible. Aucun type de bâtiment n’est considéré comme compatible sans étude.',
      },
      {
        question: 'Faut-il choisir une référence avant de demander un devis ?',
        answer:
          'Non. Une description du lieu, des horaires d’usage et de la période suffit pour commencer l’échange. La référence proposée et ses caractéristiques doivent ensuite être vérifiées. Ne réservez pas un appareil sur la seule base d’une surface indicative.',
      },
    ],
    relatedGuides: ['evacuation-air-chaud', 'puissance-climatisation-surface'],
    sources: [
      {
        title: 'API Géo — référentiel communal officiel',
        url: 'https://geo.api.gouv.fr/communes/66136',
      },
      {
        title: 'Office de tourisme de Perpignan — le centre historique',
        url: 'https://boutique.perpignantourisme.com/visites-guidees-de-perpignan',
      },
    ],
  },
};
export function locationSlug(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
export const locations = reference.communes.map((c) => ({
  ...c,
  slug: locationSlug(c.nom),
  priority: priorityTowns.includes(c.nom),
  published: localCanPublish(localEditorial[c.code]),
}));
export function localCanPublish(editorial: LocalEditorial | undefined) {
  return Boolean(
    editorial &&
    editorial.status === 'published' &&
    editorial.sections.length >= 3 &&
    editorial.questions.length >= 1 &&
    editorial.sources.length >= 1 &&
    editorial.sources.every((s) => s.url.startsWith('https://')) &&
    editorial.relatedGuides.length > 0 &&
    /^\d{4}-\d{2}-\d{2}$/.test(editorial.verifiedAt) &&
    editorial.intro.trim().length > 80 &&
    new Set(editorial.sections.map((s) => s.text.trim())).size === editorial.sections.length,
  );
}
