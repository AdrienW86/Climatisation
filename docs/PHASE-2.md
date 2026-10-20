# Phase 2 — animations, recherche et conformité

Rapport du 20 octobre 2026. Travail effectué dans le dépôt existant, sur `master`, sans reconstruction, création de branche, commit, push ou déploiement. Les logos, la palette, le catalogue, le formulaire et les chemins de la future vidéo sont préservés.

## Audit des 17 pages

Un relevé avant modification a été réalisé dans Chrome sur les 17 pages existantes : titre, description, H1/H2/H3, canonical, robots, liens internes, images, JSON-LD et débordements à 390 pixels. Aucune page orpheline, duplication de titre, absence/doublon de H1 ou largeur débordante n’a été détectée. Le relevé après amélioration conserve ces résultats. Les titres finaux mesurés comptent 46 à 69 caractères et les descriptions 97 à 153 caractères ; ces longueurs ne constituent pas une garantie d’affichage dans les moteurs.

| Page / groupe           | Diagnostic et intervention                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| Accueil                 | Direction artistique conservée ; séquence du hero, cartes, séparateurs et liens affinés ; contrastes corrigés |
| Location de climatiseur | Title orienté location à Perpignan/66 ; contexte visible et Service relié à Organization                      |
| Particuliers            | Title et contexte explicitant l’intention logement ; lien local et maillage éditorial                         |
| Professionnels          | Intention bureaux/commerces, Service cohérent et liens contextuels                                            |
| Équipements             | Catalogue vide honnête conservé ; Product conditionné à une référence vérifiée, sans prix/stock fictifs       |
| Demande de devis        | Validation existante préservée ; micro-interactions et distinction état juridique/envoi réellement actif      |
| Contact                 | Séparation coordonnées commerciales / coordonnées juridiques                                                  |
| Conseils                | Cartes séquencées, CollectionPage et liens vers les six articles                                              |
| Six guides              | Réponse directe, complément spécifique, date de modification, durée de lecture calculée et maillage services  |
| Perpignan               | Description SEO raccourcie, question locale utile, CTA et fil d’Ariane unifié                                 |
| Confidentialité         | État du formulaire réel, destinataires, garanties à valider, transferts et mesure selon le mode configuré     |
| Cookies                 | Consentement, refus, retrait, cookie de préférence et exemption distingués                                    |

Les fichiers reproductibles de l’audit sont `artifacts/seo-before.json` et `artifacts/seo-after.json`. Ils restent hors Git ; la synthèse ci-dessus fait partie du dépôt.

## Animations et qualité perçue

Les composants `RevealOnScroll`, `StaggerContainer`, `AnimatedHeading`, `AnimatedCard` et `AnimatedSection` sont des Server Components. Ils produisent le contenu dans le HTML initial. Un seul observateur client utilise IntersectionObserver et Web Animations pour les apparitions au passage dans le viewport. Aucun gestionnaire de scroll continu, bibliothèque d’animation ou état cachant le contenu n’est ajouté.

Quatre variantes sont disponibles : remontée de 16 pixels, fondu avec déplacement de 7 pixels, révélation de carte avec très légère variation d’échelle et séparateur. Le séquençage des enfants est plafonné à 240 ms. Chaque élément est animé une seule fois par visite de page. Les textes sont lisibles avant hydratation, sans JavaScript et en cas d’échec de l’observateur. La préférence de réduction des mouvements annule les animations, y compris si elle change pendant la navigation.

Le hero conserve son affichage immédiat : titre à opacité initiale de 0,85, sous-texte et CTA séquencés, entrée du visuel et lumière discrète. La sculpture garde son souffle lent. L’opacité du lecteur prépare la transition vers la future vidéo ; MP4, WebM, poster, texte alternatif, description et lecture volontaire sont conservés. Aucun fichier vidéo artificiel n’a été créé.

Les flèches des CTA, cartes de prestations, liens de navigation/footer, cartes des guides/équipements, champs, erreurs et confirmations reçoivent des transitions modérées. La FAQ utilise un accordéon natif progressivement animé. Le menu mobile s’ouvre en douceur, se ferme par Échap et rend le focus au bouton. Les contrastes des numéros d’étapes, liens, métadonnées, fils d’Ariane et textes du CTA ont été renforcés après les mesures axe.

## SEO, entités et recherche IA

Les titres des trois services expriment désormais leur intention de recherche ; la marque n’est ajoutée au title que lorsque la longueur totale le permet. Les descriptions et canonicals restent propres à chaque page. Le domaine n’est jamais supposé.

Organization utilise `/#organization`. Les Service et Article font référence à cet identifiant ; les articles pointent vers la collection éditoriale. Les fils d’Ariane des pages sont générés à partir d’URLs explicites, sans déduction depuis les libellés. Aucun LocalBusiness n’est utilisé en l’absence d’adresse confirmée. Le Product préparé pour les équipements réels n’invente ni prix, ni disponibilité, ni avis. Les FAQ structurées reprennent les réponses visibles.

`publicPages()` alimente le sitemap et le petit plan de lecture `/llms.txt`. Ce dernier est absent sans domaine, contient uniquement les ressources publiques pertinentes et ne révèle aucun endpoint privé. Il s’agit d’une aide de navigation maintenable, pas d’un prérequis ni d’un facteur de classement établi. [Google indique que ses fonctionnalités IA reposent sur les fondamentaux de recherche et n’exigent pas de fichier IA particulier](https://developers.google.com/search/docs/appearance/ai-features).

Googlebot, Bingbot, OAI-SearchBot et PerplexityBot ont des règles explicites. Une fois le domaine réel configuré, les pages publiques et leurs ressources sont accessibles ; `/api/` reste exclu. Sans domaine, le blocage de prépublication est conservé pour tous ces robots. Ce blocage doit être levé par configuration et nouvelle compilation avant soumission aux moteurs.

Les paramètres `GPTBOT_POLICY` et `GOOGLE_EXTENDED_POLICY` sont séparés et facultatifs. Les laisser vides conserve la politique antérieure plutôt que d’inventer une préférence de l’exploitant. `allow` ou `disallow` produit une règle propre au robot concerné. [OpenAI distingue OAI-SearchBot de GPTBot](https://developers.openai.com/api/docs/bots) ; [Perplexity décrit son robot de recherche](https://docs.perplexity.ai/docs/resources/perplexity-crawlers). [Google-Extended contrôle certains usages d’entraînement et d’ancrage dans Gemini et ne commande pas Google Search](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers).

Les en-têtes de sécurité ne bloquent pas la lecture du HTML selon le user-agent. L’API conserve validation, origine, limites et protection distribuée. Aucune règle WAF/CDN n’a été modifiée. Le projet n’ayant pas de domaine ou déploiement fourni, l’absence de blocage sur un WAF réel ne peut pas être attestée. Vérifier après déploiement les réponses 200, challenges et journaux avec les instructions officielles d’identification des robots ; ne jamais contourner une protection sur la seule foi d’un user-agent.

## Les six guides enrichis

Les articles conservent leurs contenus existants et reçoivent chacun une réponse courte, visible et sélectionnable avant le sommaire.

| Guide                              | Complément                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| Choisir un climatiseur en location | Demande d’une semaine, dates souhaitées et périmètre du devis, sans créer d’offre hebdomadaire |
| Puissance et surface               | Pièce de 30 m², volume et relevé des apports ; aucune puissance arbitraire au m²               |
| Évacuation de l’air chaud          | Contrôles avant mise en marche et limites d’une adaptation de gaine                            |
| Climatiseur ou ventilateur         | Différence avec l’évaporation, technologie et documentation à vérifier                         |
| Consommation                       | Calcul pédagogique explicite de kWh, hypothèses et limites ; aucun tarif électrique inventé    |
| Bureau / commerce                  | Fiche par zone, interlocuteurs et organisation de l’accès                                      |

Les principes techniques restent accompagnés des références [ADEME](https://agirpourlatransition.ademe.fr/particuliers/amenager-maison/climatiser-rafraichir/bien-choisir-climatisation). Le calcul de volume et celui d’énergie sont pédagogiques et ne décrivent aucun appareil loué. Aucun nouvel article redondant ni contenu de santé n’a été ajouté. Les dates de publication sont conservées et une date de modification est ajoutée.

La publication locale conserve les 226 communes. `localCanPublish()` exige un statut publié, plusieurs sections distinctes, une introduction, une date, des questions, des sources HTTPS et des liens de guides. Ce contrôle technique ne remplace pas une relecture de la valeur locale. Seule Perpignan reste publiée ; les 225 autres communes, dont les priorités du cahier des charges, ne sont pas présentées comme des zones garanties.

## Vérifications juridiques et données manquantes

La recherche a été effectuée dans l’API officielle de l’Annuaire des entreprises : [requête Gregory Robles](https://recherche-entreprises.api.gouv.fr/search?q=Gregory%20Robles&per_page=10), consultée le 20 octobre 2026. Six résultats ont été renvoyés, dont deux entreprises individuelles sous ce nom. **Aucun résultat ne permet à lui seul d’établir la correspondance avec l’exploitant de ce site.** Aucun SIREN/SIRET, statut, adresse ou immatriculation trouvé n’a été affecté à `business.config.ts`. Le nom de l’exploitant provient toujours uniquement du cahier des charges. Aucun extrait RNE certifié n’a été reçu et aucune prétendue vérification INPI n’est revendiquée.

La configuration distingue maintenant `commercial` des coordonnées légales. `registry` permet d’enregistrer la source, la date et la confirmation de correspondance. Les mentions ne deviennent accessibles qu’après validation de cette identité et des informations obligatoires. Des champs conditionnels existent pour l’immatriculation, le capital et le médiateur de la consommation ; leur applicabilité et leurs valeurs restent à déterminer avec le statut réel.

L’hébergeur prévu peut être documenté : Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis, d’après son [DPA](https://vercel.com/legal/dpa) et sa [notice officielle](https://vercel.com/legal/privacy-notice). L’adresse d’assistance officielle est `https://vercel.com/help`. Cette identification ne prouve pas qu’un contrat d’hébergement de ce site a été conclu. `host.confirmed` reste faux ; le téléphone applicable de l’hébergeur n’a pas été vérifié et reste vide, donc bloquant.

Les mentions ajoutent le fonctionnement réel du formulaire, sans paiement ni réservation ni contrat conclu en ligne. Le parcours actuel recueille un besoin et ne suffit pas à définir les conditions de location. Des conditions contractuelles et informations précontractuelles devront être communiquées avant toute location effective, adaptées aux clients particuliers/professionnels et à la manière dont le contrat sera conclu. Pour un contrat à distance avec un consommateur, examiner notamment les informations d’identité, prix, exécution, réclamations, médiation et droit de rétractation applicable. Aucune exception de rétractation n’est présumée. Voir [les informations précontractuelles Service Public](https://www.service-public.gouv.fr/particuliers/vosdroits/F10483) et [les conditions générales selon le client](https://entreprendre.service-public.gouv.fr/vosdroits/F33527).

Aucune page de conditions de location fictives n’est publiée. Il manque toujours les caractéristiques de l’offre, les accessoires, prix, dépôts éventuels, assurances éventuelles, entretien, restitution, transport et mise en place. Leur validation est requise avant de rédiger un document contractuel commercialisable.

## RGPD et audience

La confidentialité tient compte de `quoteReady()` pour l’état d’envoi réel, indépendamment de la seule présence d’une identité légale. Elle décrit les données, la finalité précontractuelle, les destinataires, les délais techniques Redis, la durée proposée pour les emails, les droits et l’absence de prospection ajoutée au formulaire. La case du formulaire reste distincte d’un consentement publicitaire ; aucune inscription marketing n’est créée.

Les contrats [Vercel](https://vercel.com/legal/dpa), [Resend](https://resend.com/legal/dpa) et, si choisi, [Upstash](https://upstash.com/trust/dpa.pdf) sont référencés. Les transferts, régions, accès de sous-traitants, journaux et conservations dépendent des paramètres et contrats effectivement retenus. Une région européenne n’est pas présentée comme une garantie d’absence de transfert. Ces éléments et la purge des emails restent à valider avant ouverture.

La première version chargeait les mesures automatiquement sur Vercel. La nouvelle configuration distingue trois états :

- `consent` par défaut : pas de chargement avant accord ; accepter/refuser au même niveau ; préférence conservée 180 jours ; modification possible ; rechargement lors d’un retrait afin d’arrêter aussi les scripts déjà chargés.
- `exempt` : chargement sans demande préalable uniquement si `ANALYTICS_EXEMPTION_VERIFIED=true`, après évaluation documentée de la configuration et des contrats.
- `disabled` : aucun outil de mesure chargé. Le local est désactivé hors simulation explicite de Vercel.

Les paramètres et fragments d’URL sont retirés des événements avant envoi. Le cookie `lc_audience_v1` mémorise uniquement la préférence. [La CNIL décrit les conditions d’exemption](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience) ; ni l’absence de cookies publicitaires ni la documentation de confidentialité d’un fournisseur n’établit seule cette exemption. Le retrait ne supprime pas automatiquement les données déjà reçues par un prestataire.

## Validation et mesures

19 tests métier réussissent, ainsi que les contrôles TypeScript, ESLint et build de production. Les 10 scénarios Chrome incluent le rendu sans JavaScript, reduced motion, Échap/focus, responsive, routes, formulaire désactivé, métadonnées et données structurées. Axe ne relève plus de violation des règles WCAG 2 A/AA et 2.1 AA contrôlées sur l’accueil, le devis et un guide après corrections. Ce résultat ne vaut pas certification RGAA ni audit manuel exhaustif.

Un essai complémentaire simule Vercel sur un serveur local et intercepte les scripts des prestataires : zéro requête avant choix, zéro après refus, deux scripts demandés après acceptation et aucun script après retrait/rechargement. Aucun événement réel n’est transmis. Résultat : `artifacts/privacy-phase2.json`.

Mesures de laboratoire sur l’accueil, Chrome local, viewport 390 × 844, CPU ralenti ×4, latence 100 ms, débit 200 Ko/s, trois navigations froides :

| Mesure                 | Résultat                                        |
| ---------------------- | ----------------------------------------------- |
| LCP                    | 1 120 / 1 044 / 1 008 ms ; médiane 1 044 ms     |
| CLS                    | Maximum 0,00038                                 |
| Ressources transférées | Environ 200 Ko dans ces navigations             |
| INP                    | Non mesuré ; pas de résultat terrain revendiqué |

Les fichiers sont `artifacts/performance-phase2.json` et huit captures `artifacts/phase2-{home,devis,guide,local}-{390,1280}.png`. Les captures principales ont été examinées visuellement. Les scripts reproductibles sont dans `scripts/`. Les données de laboratoire locales ne prédisent pas un résultat de terrain ; refaire la mesure sur le vrai domaine avec la vidéo, les outils activés et les appareils cibles. Le build continue de signaler l’absence de domaine pour certains médias sociaux : aucun domaine de production n’a été inventé.

## Mise en ligne et limites

Les codes `GOOGLE_SITE_VERIFICATION` et `BING_SITE_VERIFICATION` sont configurables, sans valeur inventée. Après connexion du domaine HTTPS et reconstruction, vérifier les canonicals, robots et sitemap, puis soumettre `/sitemap.xml` dans les propriétés Google Search Console et Bing Webmaster Tools correspondantes. Contrôler l’inspection d’URL et les erreurs de collecte ; ne pas annoncer une indexation ou une citation IA comme acquise.

Blocages restants : correspondance juridique certaine, données légales et commerciales, coordonnées complètes/contrat d’hébergement, conditions réelles de location, contrats/régions de traitement, domaine, Resend, Redis et essais d’emails réels. La vidéo définitive reste à fournir et tester ; le fallback permet toutefois de consulter le site sans elle. Aucun WAF distant, domaine réel, réception email ou performance terrain n’a été testé. Aucun déploiement n’a été effectué.
