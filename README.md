# Location Climatisation

Site vitrine en français construit dans le dépôt existant, avec Next.js App Router, React, TypeScript strict et Tailwind CSS. Aucun push, aucune branche supplémentaire et aucun déploiement ne sont nécessaires pour travailler localement. La deuxième phase est décrite dans [le rapport animations, SEO, IA et conformité](docs/PHASE-2.md).

## Démarrer

Node.js 22 LTS ou version compatible avec Next.js 16.4.2. Versions exactes dans `package.json`, verrouillées dans `package-lock.json`.

```powershell
npm.cmd ci
npm.cmd run dev -- --port 3186
```

Ouvrir `http://localhost:3186`. Sous les autres shells, `npm` remplace `npm.cmd`. Le port dédié évite de réutiliser un autre projet sur le port 3000.

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run test:browser
```

Les tests navigateur utilisent Chrome installé sur le poste et lancent un serveur de production sur `127.0.0.1:3186`. Compiler avant de les lancer et laisser ce port disponible. Les captures sont créées dans `artifacts/` (ignoré par Git). Aucun navigateur supplémentaire n’est téléchargé.

## Ce qui est livré

- Accueil, trois pages de services, catalogue, demande de devis, contact, six guides, page locale Perpignan et pages relatives à la confidentialité.
- Identité vectorielle originale : logo horizontal, versions claire/sombre/monochrome, isotype et favicon dans `public/brand/`. Composant `BrandLogo`, icône Apple, manifeste et image Open Graph générés par Next.js.
- Manrope variable hébergée localement, avec sa licence SIL OFL dans `public/fonts/`.
- Hero sans dépendance à un lecteur tiers : illustration abstraite CSS en l’absence de vidéo, pas de faux appareil commercial.
- Métadonnées uniques, canonicals conditionnels, JSON-LD fidèle au contenu, robots et sitemap automatiques.
- Référentiel officiel des 226 communes du département 66 ; seule la page locale de Perpignan possède actuellement un statut publié.
- Validation Zod partagée, envoi Resend et protection distribuée Redis préparés, sans simulation d’envoi réussi.

## Où modifier les informations

| Besoin                                                     | Fichier                                   |
| ---------------------------------------------------------- | ----------------------------------------- |
| Marque, vidéo, description et domaine                      | `src/config/site.config.ts`, `.env.local` |
| Exploitant, coordonnées, mentions et durée de conservation | `src/config/business.config.ts`           |
| Références techniques, tarifs et photos vérifiés           | `src/data/equipment.ts`                   |
| Textes de services et FAQ                                  | `src/data/services.ts`                    |
| Référentiel communal                                       | `src/data/communes.json`                  |
| Contenus locaux et publication                             | `src/data/locations.ts`                   |
| Guides structurés et sources                               | `src/content/guides/index.ts`             |
| Style, responsive et animations                            | `src/app/globals.css`                     |

La page `/climatiseur-mobile` reste en 404 tant qu’aucun équipement mobile vérifié n’est renseigné. Les équipements dont `verified` est faux sont exclus de l’affichage. Le catalogue vide présente les critères de choix sans inventer de modèles ni de prix.

Les autres communes restent en 404. Ajouter un contenu local à `localEditorial`, avec un statut `draft`, ses sources, sa date de vérification, des questions propres au projet local et des liens de guides. Passer à `published` seulement après relecture éditoriale : le statut commande la route, son lien et sa présence dans le sitemap. Ne pas dupliquer Perpignan en remplaçant le nom de ville. Le référentiel se met à jour par `npm.cmd run locations:sync`, depuis [l’API Géo officielle](https://geo.api.gouv.fr/decoupage-administratif/communes). Cette commande ne modifie pas les contenus éditoriaux.

## Ajouter la vidéo

Déposer les fichiers réels dans :

```text
public/videos/climatisation-hero.mp4
public/videos/climatisation-hero.webm           (facultatif)
public/images/climatisation-hero-poster.webp  (recommandé)
```

Créer `public/images` si nécessaire. Les chemins sont configurables. Relancer le serveur de développement ou reconstruire le site pour une publication statiquement pré-rendue ; la détection des fichiers se fait côté serveur au rendu. La structure du hero ne change pas.

Préférer une vidéo courte et compressée, sans piste audio informative. Le contenu essentiel reste en HTML. Fournir un poster optimisé et un texte `description` fidèle à la présentation dans le composant `HeroProductVideo` ; si la vidéo contient de nouvelles informations, les reporter dans ce texte accessible. `posterAlt`, `autoPlay` et `loop` sont configurables.

Pas de téléchargement automatique sur mobile, en économie de données ou en réduction des mouvements. Un bouton permet la lecture volontaire. Pause hors écran et lorsque l’onglet est masqué. Le visuel abstrait reste visible tant qu’aucune image vidéo n’est disponible. L’acceptation des fichiers réels, leurs codecs et leur poids devront être vérifiés à leur réception.

## Ouvrir les demandes de devis

Copier `.env.example` dans `.env.local`, puis renseigner les valeurs sans jamais committer de secret. `NEXT_PUBLIC_SITE_URL` doit être l’origine HTTPS réelle, sans chemin. Sans domaine, aucun canonical fictif n’est généré, les pages restent `noindex` et `robots.txt` interdit l’exploration.

Le formulaire est volontairement inactif jusqu’à ce que ces conditions soient réunies :

1. Informations de l’entreprise et de l’hébergeur validées dans `business.config.ts`, politique de conservation et contrats des prestataires relus.
2. `BUSINESS_VERIFIED=true`.
3. Domaine canonique réel, clé Resend, expéditeur vérifié et destinataire renseignés.
4. Instance Redis compatible avec l’API REST Upstash, ses deux paramètres et `RATE_LIMIT_SECRET` aléatoire d’au moins 32 caractères.

`npm.cmd run check:production` fait un contrôle bloquant et liste les informations manquantes. Les variables doivent être disponibles dans l’environnement de la commande. Le build local reste possible sans ces informations pour permettre la revue.

Le POST `/api/devis` exige la même origine que le domaine canonique. Il limite le corps à 16 Ko, valide chaque champ, refuse le honeypot et applique deux compteurs atomiques Redis : 10 tentatives par origine réseau et 3 par email sur 15 minutes. Sur Vercel, seul l’en-tête réseau réécrit par la plateforme est utilisé ; en dehors de Vercel, un compartiment réseau commun conservateur est utilisé. Toute indisponibilité de Redis ferme l’envoi. Les empreintes sont protégées par HMAC ; les données de formulaire ne sont pas conservées en clair dans Redis.

Un verrou de 120 secondes et un reçu de 24 heures limitent les doublons. Les clés d’idempotence Resend sont distinctes pour la notification et la confirmation. Leur contenu reste déterministe même après un rechargement du formulaire. Changer `RATE_LIMIT_SECRET` invalide les empreintes existantes : éviter cette rotation pendant le traitement de demandes.

La confirmation client ne part qu’après acceptation de la notification par Resend. Si seule la confirmation échoue, le site indique que la demande est reçue et qu’il est inutile de recommencer. Une acceptation API ne garantit pas la remise dans la boîte du destinataire : contrôler les événements dans Resend. Les échecs sont journalisés par étape sans nom, email ni message utilisateur.

Avant ouverture, effectuer un essai contrôlé réel, vérifier les deux boîtes email et les limites Redis. Ces essais réels ne peuvent pas être effectués sans les identifiants et l’expéditeur de l’exploitant. Les tests automatisés de la logique d’envoi utilisent des réponses de prestataire simulées et n’adressent aucun email.

## Confidentialité et hébergement

Les mentions légales sont non publiées et absentes du footer tant que `legalReady()` n’est pas satisfait. `business.registry` doit confirmer la correspondance de l’exploitant et sa source officielle ; plusieurs homonymes ont été trouvés, aucun identifiant n’a été attribué. `business.commercial` distingue les coordonnées de contact des données juridiques. L’identité publique de Vercel est renseignée comme hébergeur prévu, avec source ; son contrat et son téléphone applicable restent à confirmer. Aucun numéro ou email de l’exploitant n’est créé par défaut. La durée configurée de 12 mois est une politique proposée à valider par l’exploitant ; la suppression des emails correspondants doit être organisée dans ses boîtes et chez ses prestataires. Il n’existe pas de purge automatique de boîtes email dans ce projet.

Vercel Analytics et Speed Insights sont installés. Sur Vercel (`VERCEL=1`), `ANALYTICS_PRIVACY_MODE=consent` est appliqué par défaut : chargement après accord uniquement, choix accepter/refuser équivalents et préférence conservée 180 jours. Un retrait recharge la page sans les scripts déjà chargés. `exempt` nécessite aussi `ANALYTICS_EXEMPTION_VERIFIED=true` et une justification documentée ; cette exemption n’est pas supposée. `disabled` ou `NEXT_PUBLIC_ANALYTICS_ENABLED=false` supprime la collecte. Hors Vercel, ils restent inactifs. Configurer aussi les services dans le projet Vercel. Reconstruire après toute modification de configuration, notamment des variables publiques.

Les en-têtes de sécurité sont définis dans `next.config.ts` : CSP, protection contre l’intégration en iframe, contrôle MIME, permissions et politique de référent. La CSP autorise les scripts Next.js intégrés et les domaines de mesure Vercel ; aucune vidéo tierce n’est chargée. Une politique stricte par nonce pourra être envisagée si le périmètre d’hébergement évolue. Éviter d’ajouter un prestataire sans mettre à jour la CSP et la confidentialité.

Le projet est compatible avec le preset Next.js de Vercel, sans commande de déploiement automatique. Configurer les variables avant le build, vérifier les mentions et lancer les validations, puis déployer uniquement sur instruction de l’exploitant.

## Animations et recherche

Les composants serveur réutilisables sont dans `src/components/motion/animated.tsx`. `MotionObserver` applique un enrichissement progressif avec IntersectionObserver/Web Animations ; aucun texte n’est caché avant hydratation. `src/app/motion.css` centralise le hero, les révélations et les micro-interactions. La réduction des mouvements est respectée. Les chemins vidéo et le fallback ne changent pas.

Les pages publiques sont centralisées dans `src/lib/seo/public-pages.ts`, utilisé par le sitemap et le plan `/llms.txt`. Ce dernier n’est pas une condition d’indexation. Les règles des robots de recherche sont distinctes de `GPTBOT_POLICY` et `GOOGLE_EXTENDED_POLICY` (valeurs facultatives `allow`/`disallow`). Google-Extended concerne aussi certains usages d’ancrage Gemini. Les valeurs vides conservent la politique existante. Aucun endpoint de formulaire n’est ouvert aux robots.

`GOOGLE_SITE_VERIFICATION` et `BING_SITE_VERIFICATION` permettent d’ajouter les codes réels fournis par les outils webmasters. Après connexion du domaine HTTPS et reconstruction, vérifier `/robots.txt`, `/sitemap.xml`, les URLs canoniques et soumettre le sitemap dans les propriétés Google/Bing correspondantes. Contrôler séparément la configuration WAF/CDN de l’hébergement réel.

## Audits reproductibles

Après compilation, lancer `npm.cmd run start -- --hostname 127.0.0.1 --port 3186` dans un terminal. Dans un autre :

```powershell
node scripts/seo-audit.mjs after
node scripts/performance-audit.mjs
```

Les résultats et les captures restent dans `artifacts/`. Les mesures mobiles sont des mesures locales de laboratoire, pas des données de terrain. `scripts/privacy-audit.mjs` nécessite un serveur local démarré avec `VERCEL=1`, pour rendre la configuration de consentement sur une page dynamique ; il intercepte les scripts des prestataires pour éviter toute collecte réelle. Les tests Playwright utilisent un serveur dédié par défaut. `PLAYWRIGHT_REUSE_SERVER=true` est réservé à la réutilisation explicite d’un serveur de ce projet déjà identifié sur le port 3186.

Consulter [le rapport courant de phase 2](docs/PHASE-2.md), [le rapport historique de phase 1](docs/VALIDATION.md) et [les informations à fournir](docs/MISE-EN-PRODUCTION.md).
