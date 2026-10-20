import { enrichment } from './enrichment';
export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  modifiedAt?: string;
  directAnswer?: string;
  comparisonCaption?: string;
  sections: { id: string; title: string; paragraphs: string[]; list?: string[] }[];
  comparison?: { headers: string[]; rows: string[][] };
  sources: { title: string; url: string }[];
  related: string[];
};
const ademe = {
  title: 'ADEME — Choisir sa climatisation',
  url: 'https://agirpourlatransition.ademe.fr/particuliers/amenager-maison/climatiser-rafraichir/bien-choisir-climatisation',
};
const originalGuides: Guide[] = [
  {
    slug: 'choisir-climatiseur-location',
    title: 'Comment choisir un climatiseur en location ?',
    description:
      'Les questions à poser pour choisir un équipement temporaire : pièce, évacuation, bruit, durée et conditions du devis.',
    category: 'Bien choisir',
    readingMinutes: 5,
    publishedAt: '2026-10-20',
    related: ['puissance-climatisation-surface', 'evacuation-air-chaud'],
    sources: [ademe],
    sections: [
      {
        id: 'usage',
        title: 'Commencez par la pièce, pas par la référence',
        paragraphs: [
          'Le bon choix est celui qui répond aux contraintes du lieu et à son usage. Avant de comparer les appareils, décrivez la pièce que vous souhaitez rafraîchir : ses dimensions, la hauteur sous plafond, les vitrages et l’exposition au soleil. Un grand séjour vitré ne se comporte pas comme une petite pièce ombragée.',
          'Précisez aussi le rythme d’occupation. Une chambre utilisée la nuit, un bureau équipé d’ordinateurs et un commerce dont la porte s’ouvre souvent n’ont pas les mêmes apports de chaleur. Le nombre d’occupants et les équipements électriques sont utiles à l’étude.',
        ],
      },
      {
        id: 'technique',
        title: 'Vérifiez la possibilité de rejeter la chaleur',
        paragraphs: [
          'Un climatiseur extrait la chaleur du local pour la rejeter ailleurs. Sur un monobloc mobile, ce rejet passe par une gaine vers l’extérieur. Avant de réserver, identifiez une ouverture compatible et vérifiez si elle peut être calfeutrée sans modification interdite.',
          'La présence d’une fenêtre ne suffit pas à garantir l’installation : la forme de l’ouvrant, la longueur autorisée de la gaine et les accessoires disponibles comptent. Demandez la notice et les exigences du modèle proposé. Ne prévoyez pas un rejet dans une autre pièce fermée.',
        ],
      },
      {
        id: 'confort',
        title: 'Comparez le confort d’usage',
        paragraphs: [
          'La puissance frigorifique décrit une capacité de refroidissement ; elle ne dit pas tout sur le confort. Le bruit, les dimensions, la circulation de l’air et la gestion des condensats ont aussi un effet sur l’utilisation quotidienne. Vérifiez les données du fabricant plutôt que de vous fier au seul terme « silencieux ».',
          'Repérez l’emplacement de la prise et le cheminement des accessoires. L’appareil doit rester stable, accessible pour l’entretien prévu par la notice et éloigné des obstacles qui gênent ses entrées et sorties d’air.',
        ],
      },
      {
        id: 'devis',
        title: 'Ce que le devis doit clarifier',
        paragraphs: [
          'La location doit être lisible avant votre accord. Faites préciser la référence, les dates, le montant, les accessoires et les règles de restitution. Le transport, la mise en place, le dépôt éventuel et les responsabilités doivent être identifiés selon les conditions proposées.',
          'Une demande peut rester exploratoire : indiquez les informations dont vous disposez et les points encore incertains. Une photo de l’ouverture, transmise après un premier échange si nécessaire, peut aider à préciser la faisabilité.',
        ],
        list: [
          'Surface, volume et exposition de la pièce.',
          'Commune, étage et conditions d’accès.',
          'Dates souhaitées et durée envisagée.',
          'Ouverture disponible pour le rejet de chaleur.',
          'Contraintes de bruit et horaires d’utilisation.',
        ],
      },
    ],
  },
  {
    slug: 'puissance-climatisation-surface',
    title: 'Quelle puissance pour quelle surface ?',
    description:
      'Pourquoi les mètres carrés ne suffisent pas : puissance frigorifique, volume, isolation et apports de chaleur expliqués simplement.',
    category: 'Comprendre',
    readingMinutes: 5,
    publishedAt: '2026-10-20',
    related: ['choisir-climatiseur-location', 'consommation-climatiseur-mobile'],
    sources: [ademe],
    sections: [
      {
        id: 'reponse',
        title: 'Une surface ne donne pas, à elle seule, la puissance nécessaire',
        paragraphs: [
          'Il n’existe pas de correspondance universelle fiable entre une surface et une puissance de climatisation. Deux pièces de même superficie peuvent avoir des besoins très différents. Le volume, l’isolation, le soleil, les vitrages et les sources internes de chaleur modifient le résultat.',
          'Un ratio trouvé en ligne peut servir de premier repère, mais ne remplace pas l’étude du local. Nous ne donnons donc pas de tableau de puissance garanti par mètre carré : il risquerait de masquer les contraintes qui comptent réellement.',
        ],
      },
      {
        id: 'facteurs',
        title: 'Les informations qui changent le dimensionnement',
        paragraphs: [
          'La hauteur sous plafond détermine le volume associé à une surface. L’exposition et la taille des vitrages influencent les apports solaires. Les protections extérieures, la qualité de l’enveloppe du bâtiment et les échanges d’air modifient aussi la charge thermique.',
          'Les occupants, l’éclairage et les appareils électriques apportent de la chaleur. Dans un commerce, les ouvertures répétées peuvent accroître les échanges avec l’extérieur. Ces paramètres doivent être décrits plutôt que supposés.',
        ],
        list: [
          'Mesurez longueur, largeur et hauteur de la pièce.',
          'Repérez les fenêtres exposées et les protections solaires.',
          'Indiquez le nombre habituel de personnes présentes.',
          'Signalez les ordinateurs, vitrines et autres équipements chauffants.',
        ],
      },
      {
        id: 'unites',
        title: 'Puissance frigorifique et puissance électrique sont différentes',
        paragraphs: [
          'La puissance frigorifique correspond à la chaleur que l’appareil peut extraire dans des conditions d’essai. La puissance électrique absorbée correspond à ce qu’il demande au réseau électrique pour fonctionner. Les deux peuvent être exprimées en watts, mais elles décrivent des grandeurs distinctes.',
          'Une fiche technique peut aussi utiliser le BTU/h. Pour comparer deux modèles, mettez les valeurs dans la même unité et vérifiez les conditions de mesure. La puissance maximale annoncée ne préjuge pas du résultat dans une pièce mal adaptée à l’appareil.',
        ],
      },
      {
        id: 'limites',
        title: 'Choisir un appareil cohérent avec son installation',
        paragraphs: [
          'Augmenter la puissance ne compense pas forcément une mauvaise évacuation de l’air chaud, des entrées d’air extérieur ou un ensoleillement non maîtrisé. Il faut d’abord vérifier les conditions d’installation et réduire les apports évitables.',
          'Pour préparer une demande, transmettez les mesures disponibles et les contraintes du local. Si une information manque, indiquez-le. Le choix final doit rester conditionné aux caractéristiques vérifiées du matériel et à la faisabilité sur place.',
        ],
      },
    ],
  },
  {
    slug: 'evacuation-air-chaud',
    title: 'Comment évacuer l’air chaud d’un climatiseur mobile ?',
    description:
      'Fenêtre, gaine, calfeutrage et condensats : les points à vérifier avant de mettre en place un climatiseur monobloc.',
    category: 'Bien installer',
    readingMinutes: 5,
    publishedAt: '2026-10-20',
    related: ['choisir-climatiseur-location', 'climatiseur-mobile-ou-ventilateur'],
    sources: [ademe],
    sections: [
      {
        id: 'principe',
        title: 'La chaleur doit quitter la pièce',
        paragraphs: [
          'Un climatiseur monobloc mobile utilise une gaine pour rejeter l’air chaud à l’extérieur. Sans ce rejet, la chaleur reste dans l’espace et le fonctionnement ne correspond pas à l’usage attendu. Une porte ouverte sur une autre pièce fermée n’est pas une évacuation extérieure.',
          'Repérez l’ouverture avant de choisir la position de l’appareil. Le trajet de la gaine doit respecter la notice, de même que les dégagements autour des grilles de ventilation. La configuration de la pièce doit permettre ces deux conditions à la fois.',
        ],
      },
      {
        id: 'ouverture',
        title: 'Adapter le passage à la fenêtre',
        paragraphs: [
          'Une fenêtre coulissante, une porte-fenêtre et un ouvrant à la française demandent des accessoires différents. Vérifiez la compatibilité du kit de calfeutrage, sa fixation et les dimensions réelles de l’ouverture. L’objectif est de limiter les entrées d’air chaud tout en laissant le rejet s’effectuer correctement.',
          'Ne bloquez pas une issue nécessaire à la sécurité et ne modifiez pas une menuiserie sans autorisation. Si vous êtes locataire ou dans un local professionnel, faites valider toute adaptation qui dépasse une simple mise en place réversible.',
        ],
      },
      {
        id: 'gaine',
        title: 'Respecter la gaine prévue par le fabricant',
        paragraphs: [
          'Évitez les coudes serrés et les obstacles au rejet. N’allongez pas la gaine et ne réduisez pas son diamètre sans indication explicite de la notice. Ces modifications peuvent perturber le fonctionnement ; la longueur autorisée dépend du modèle.',
          'Le point de rejet doit rester dégagé. Vérifiez également que le tuyau et le câble ne créent pas de risque de chute dans le passage. Avant chaque utilisation, inspectez les raccordements et assurez-vous que l’appareil reste stable.',
        ],
      },
      {
        id: 'eau',
        title: 'Ne pas oublier les condensats',
        paragraphs: [
          'Le traitement de l’eau condensée varie selon les appareils et les modes de fonctionnement. Consultez la notice pour savoir si un bac doit être vidé, si une évacuation est nécessaire ou si un dispositif particulier est prévu. Ne supposez pas qu’un modèle fonctionne sans surveillance des condensats.',
          'Si l’ouverture, la distance ou l’accès ne conviennent pas, décrivez le problème avant toute réservation. Une solution adaptée ne se limite pas à la fourniture d’une machine : elle suppose une implantation techniquement compatible avec le local.',
        ],
      },
    ],
  },
  {
    slug: 'climatiseur-mobile-ou-ventilateur',
    title: 'Climatiseur mobile ou ventilateur : quelles différences ?',
    description:
      'Deux usages différents : extraire la chaleur ou créer un mouvement d’air. Les critères pour faire un choix adapté à votre pièce.',
    category: 'Comparer',
    readingMinutes: 4,
    publishedAt: '2026-10-20',
    related: ['evacuation-air-chaud', 'consommation-climatiseur-mobile'],
    sources: [ademe],
    comparison: {
      headers: ['Critère', 'Ventilateur', 'Climatiseur monobloc'],
      rows: [
        ['Principe', 'Met l’air en mouvement', 'Extrait de la chaleur du local'],
        ['Rejet extérieur', 'Pas de gaine de rejet', 'Gaine vers l’extérieur'],
        ['Effet sur la pièce', 'Ne retire pas la chaleur', 'Peut réduire la température si adapté'],
        [
          'Points à vérifier',
          'Placement, bruit, usage',
          'Puissance, évacuation, bruit, condensats',
        ],
      ],
    },
    sections: [
      {
        id: 'difference',
        title: 'Le ventilateur brasse l’air, le climatiseur déplace la chaleur',
        paragraphs: [
          'Un ventilateur crée un courant d’air. Il peut améliorer la sensation de confort d’une personne, mais n’extrait pas la chaleur du local. Le climatiseur utilise un cycle frigorifique pour retirer de la chaleur et la rejeter à l’extérieur.',
          'Cette différence de principe compte davantage que la forme ou la mobilité de l’appareil. Une machine posée sur roulettes n’est pas nécessairement un climatiseur : il faut vérifier sa technologie et sa documentation.',
        ],
      },
      {
        id: 'installation',
        title: 'L’installation n’a pas les mêmes contraintes',
        paragraphs: [
          'Un ventilateur n’a pas besoin de gaine de rejet. Un monobloc mobile doit disposer d’un passage extérieur compatible avec son système d’évacuation. Son emplacement dépend donc de la fenêtre, de l’alimentation électrique et des dégagements imposés par la notice.',
          'Pour les deux appareils, le bruit et la circulation doivent rester compatibles avec l’usage du local. Dans une chambre ou un bureau, comparez les niveaux annoncés dans des conditions cohérentes. Une simple appréciation commerciale ne remplace pas une valeur technique.',
        ],
      },
      {
        id: 'choix',
        title: 'Choisir en fonction du résultat recherché',
        paragraphs: [
          'Demandez-vous si vous cherchez un mouvement d’air ponctuel ou une baisse de la température dans un espace défini. Examinez d’abord les protections contre le soleil et la possibilité d’évacuer la chaleur accumulée lorsque les conditions extérieures le permettent.',
          'Un climatiseur ne dispense pas de limiter les apports solaires et les entrées d’air chaud. Un équipement mal adapté à l’ouverture ou à la pièce risque de décevoir, même si sa puissance annoncée paraît élevée. Pour une location, décrivez le résultat recherché et les contraintes techniques avant de demander une référence.',
        ],
      },
    ],
  },
  {
    slug: 'consommation-climatiseur-mobile',
    title: 'Comprendre la consommation d’un climatiseur mobile',
    description:
      'Puissance absorbée, durée et coût du kWh : comment estimer une consommation sans la confondre avec la puissance frigorifique.',
    category: 'Usage raisonné',
    readingMinutes: 4,
    publishedAt: '2026-10-20',
    related: ['puissance-climatisation-surface', 'choisir-climatiseur-location'],
    sources: [ademe],
    sections: [
      {
        id: 'mesure',
        title: 'Lire la bonne valeur dans la documentation',
        paragraphs: [
          'Pour estimer l’énergie consommée, cherchez la puissance électrique absorbée dans la documentation de l’appareil. La puissance frigorifique ne correspond pas à la consommation électrique : elle décrit une capacité d’extraction de chaleur.',
          'Une valeur nominale est un repère mesuré dans des conditions définies. En pratique, la régulation, la température extérieure et l’usage du local font varier le fonctionnement. Une estimation fondée sur la seule puissance nominale ne constitue donc pas une facture prévisionnelle garantie.',
        ],
      },
      {
        id: 'calcul',
        title: 'Du watt au kilowattheure',
        paragraphs: [
          'La relation de base est : énergie en kWh = puissance électrique en kW × durée de fonctionnement en heures. Le watt se convertit en kilowatt en divisant par 1 000. Cette relation suppose une puissance constante sur la durée étudiée.',
          'Pour obtenir un coût, multipliez l’énergie estimée par le prix du kWh de votre contrat au moment de l’usage. Si votre contrat distingue différentes plages horaires, appliquez les prix correspondants. Aucun tarif d’électricité universel ne peut être déduit de la fiche de l’appareil.',
        ],
      },
      {
        id: 'usage',
        title: 'Les conditions de la pièce comptent',
        paragraphs: [
          'Un local exposé au soleil, des ouvertures fréquentes ou une évacuation mal calfeutrée peuvent augmenter la demande de refroidissement. Les protections solaires et le respect des conditions de pose contribuent à un usage plus cohérent.',
          'L’entretien prévu par la notice, notamment le contrôle des filtres, doit être respecté. Ne bouchez jamais les grilles. Pour une location, faites préciser qui réalise chaque opération d’entretien et quelles consignes s’appliquent pendant votre période d’utilisation.',
        ],
      },
      {
        id: 'comparer',
        title: 'Comparer sur des bases communes',
        paragraphs: [
          'Pour deux appareils, vérifiez la technologie, la capacité frigorifique et les conditions de mesure avant de comparer la puissance absorbée. Un chiffre isolé ne dit pas si l’équipement sera adapté à votre pièce.',
          'La demande de devis peut inclure une question sur la consommation et les données énergétiques disponibles. Une réponse sérieuse s’appuie sur une référence identifiée, sa documentation et des hypothèses d’usage explicites.',
        ],
      },
    ],
  },
  {
    slug: 'climatisation-temporaire-bureau-commerce',
    title: 'Climatisation temporaire : préparer un bureau ou un commerce',
    description:
      'Occupation, vitrages, circulation, bruit et alimentation électrique : une méthode pour préparer une demande professionnelle.',
    category: 'Professionnels',
    readingMinutes: 4,
    publishedAt: '2026-10-20',
    related: ['puissance-climatisation-surface', 'evacuation-air-chaud'],
    sources: [ademe],
    sections: [
      {
        id: 'zones',
        title: 'Identifier les zones prioritaires',
        paragraphs: [
          'La première étape consiste à décrire les espaces réellement occupés, leurs horaires et les sources de chaleur. Un bureau partagé, une zone de caisse et une réserve n’ont pas le même usage. Repérez les zones où le besoin de confort est le plus marqué.',
          'Les écrans, équipements électriques et vitrages exposés sont des informations utiles. Les entrées fréquentes d’air extérieur peuvent aussi modifier le besoin. Transmettez des éléments concrets plutôt qu’une estimation unique pour l’ensemble du bâtiment.',
        ],
      },
      {
        id: 'implantation',
        title: 'Prévoir une implantation compatible avec l’activité',
        paragraphs: [
          'Un appareil temporaire occupe de la place et nécessite une alimentation adaptée. Selon sa technologie, il faut aussi prévoir un rejet de chaleur et une gestion des condensats. Ces éléments doivent être vérifiés sur le plan du local ou lors d’un échange technique.',
          'La circulation des salariés et du public doit rester libre. Ne placez pas une gaine, un câble ou l’appareil sur un cheminement nécessaire. Les dégagements prescrits par le fabricant doivent être conservés, même dans une surface de vente contrainte.',
        ],
      },
      {
        id: 'exploitation',
        title: 'Organiser l’utilisation au quotidien',
        paragraphs: [
          'Désignez la personne qui disposera des consignes d’utilisation et qui pourra réaliser les vérifications prévues dans la notice. Les règles concernant les filtres, les condensats et l’arrêt de l’appareil doivent être accessibles aux personnes concernées.',
          'Le bruit doit être compatible avec les appels, l’accueil et les échanges au poste de travail. Pour comparer plusieurs solutions, demandez les valeurs documentées et les conditions de mesure. La mention d’un usage professionnel ne garantit pas à elle seule le confort acoustique.',
        ],
      },
      {
        id: 'demande',
        title: 'Documenter votre demande de location',
        paragraphs: [
          'Indiquez la commune, les dates, les surfaces, les horaires et les contraintes d’accès. Signalez toute période durant laquelle la mise en place serait impossible. Faites préciser les modalités de transport, d’installation et de restitution dans la proposition.',
          'Pour un événement ou un espace particulier, ne présumez pas que le matériel nécessaire est disponible. Décrivez la configuration et attendez une confirmation technique et commerciale avant d’organiser votre projet autour d’un équipement donné.',
        ],
      },
    ],
  },
];
export const guides: Guide[] = originalGuides.map((guide) => {
  const extra = enrichment[guide.slug];
  const sections = extra ? [...guide.sections, extra.section] : guide.sections;
  const words = sections
    .flatMap((s) => [s.title, ...s.paragraphs, ...(s.list ?? [])])
    .join(' ')
    .split(/\s+/).length;
  return {
    ...guide,
    sections,
    directAnswer: extra?.answer,
    modifiedAt: '2026-10-20',
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
    comparisonCaption: guide.comparison
      ? 'Principes et contraintes : ventilateur et climatiseur monobloc'
      : undefined,
  };
});
