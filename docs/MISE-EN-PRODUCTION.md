# Informations à fournir avant ouverture

Le site est réalisé, mais l’ouverture commerciale dépend d’informations qui ne figurent pas dans le dépôt. Aucun renseignement d’une entreprise homonyme n’a été repris.

## Entreprise

L’identité « Gregory Roblès » provient du cahier des charges. Fournir et vérifier : forme juridique, SIREN, SIRET, adresse professionnelle, email, téléphone éventuel, régime/mentions TVA, directeur de publication et mentions complémentaires applicables. Confirmer les conditions commerciales et les informations précontractuelles adaptées à la location proposée. Les champs structurés figurent dans `src/config/business.config.ts`.

La recherche officielle de phase 2 a renvoyé plusieurs correspondances : aucun identifiant n’est attribué automatiquement. Renseigner `registry.url`, `registry.verifiedAt` et confirmer `registry.identityConfirmed` après correspondance certaine. Les contacts destinés aux prospects sont distincts dans `commercial`. Vérifier aussi les informations d’immatriculation, capital et médiation selon le statut et la clientèle.

Renseigner l’identité, l’adresse et le moyen de contact de l’hébergeur effectivement choisi. Ne pas déduire ces informations du seul fait que le code est compatible avec Vercel.

L’identité et l’adresse publiques de Vercel sont documentées dans la configuration avec leur source. Son rôle d’hébergeur reste prévu : confirmer le contrat effectif (`host.confirmed`), le téléphone applicable et les coordonnées requises avant publication des mentions.

## Offre

Fournir les références réelles, puissances, données acoustiques, dimensions, notices, photos autorisées et caractéristiques des équipements. Confirmer les surfaces indicatives avec leurs conditions, les prix et leur base fiscale, les durées, dépôts, accessoires, responsabilités, entretien, restitution, transport et installation. Les modalités de prise en charge par commune doivent être confirmées. Aucun stock, tarif ou délai n’est affiché par défaut.

## Domaine et emails

Fournir le domaine canonique HTTPS, le destinataire des demandes, la clé Resend et un expéditeur dont le domaine a été vérifié. Provisionner Redis REST et un secret de hachage. Les noms des variables sont dans `.env.example`. Vérifier le contrat, la région, la conservation et les éventuels transferts de chaque prestataire avant `BUSINESS_VERIFIED=true`.

Confirmer la durée de conservation proposée et mettre en place la suppression des demandes dans les boîtes email. Vérifier deux envois réels et l’acceptation des limites avant ouverture. La confirmation automatique n’équivaut pas à une réservation.

Les conditions générales de location restent à rédiger à partir de l’offre réelle, pour communication avant contrat. Le site ne conclut pas de location et n’encaisse pas de paiement. Le statut du client et la manière de conclure la location déterminent les informations et règles à intégrer ; ne pas présumer d’une exception de rétractation.

## Médias et contenus

La vidéo motion design et son poster sont à fournir. Le fallback abstrait est utilisable sans vidéo ; celle-ci n’est donc pas un blocage technique. Ajouter une description textuelle fidèle avant d’activer une vidéo contenant des informations nouvelles. Tester ses codecs, son poids et la lecture sur les appareils cibles.

La page Perpignan est disponible. Les 225 autres communes sont préparées mais non publiées. Leur publication nécessite un contenu spécifique, utile et sourcé ; elle n’est pas nécessaire pour l’ouverture du site.

## Contrôle final

Relire les contenus et les mentions, renseigner les paramètres, lancer `check:production`, puis TypeScript, ESLint, tests et build. Contrôler les URLs canoniques, le sitemap et l’image sociale sur le domaine retenu. Mesurer les Core Web Vitals sur l’hébergement réel ; aucune note Lighthouse ou performance terrain n’est garantie avant ces mesures. Vérifier le parcours de devis et la réception effective des deux emails. Valider les contrats et la configuration audience : consentement par défaut, ou exemption documentée avec `ANALYTICS_EXEMPTION_VERIFIED=true`, ou désactivation. Décider ensuite du déploiement.

Renseigner les codes de propriété Google/Bing s’ils sont disponibles, reconstruire et soumettre `/sitemap.xml`. Vérifier la lecture du HTML par les robots de recherche sans challenge WAF, en conservant la protection des endpoints. La politique d’entraînement (`GPTBOT_POLICY`) et celle de Google-Extended sont distinctes et facultatives. `/llms.txt` ne remplace ni le sitemap ni les règles d’accès. Le [rapport de phase 2](PHASE-2.md) rassemble les sources officielles et les résultats de validation.
