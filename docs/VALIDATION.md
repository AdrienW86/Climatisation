# Rapport de validation — 20 octobre 2026

Ce rapport conserve les résultats de la première phase. Les résultats courants (19 tests métier, 10 scénarios navigateur, accessibilité, consentement et mesures mobiles) figurent dans [le rapport de phase 2](PHASE-2.md).

## Résultat

Projet créé et validé localement sur la branche existante, sans création de branche, commit, push ou déploiement. Le site est consultable et compilable ; l’ouverture commerciale reste conditionnée aux informations réelles listées dans `MISE-EN-PRODUCTION.md`.

Next.js 16.4.2 installé depuis le registre npm, avec React et les autres dépendances figées dans `package.json` et `package-lock.json`. Manrope est servie localement et sa licence est incluse.

## Contrôles exécutés

| Contrôle                                         | Résultat                                                    |
| ------------------------------------------------ | ----------------------------------------------------------- |
| Installation des dépendances                     | Réussie                                                     |
| TypeScript strict — `npm.cmd run typecheck`      | Réussi                                                      |
| ESLint — `npm.cmd run lint`                      | Réussi, sans erreur ni avertissement                        |
| Tests métier — `npm.cmd test`                    | 12 réussis                                                  |
| Build de production — `npm.cmd run build`        | Réussi                                                      |
| Chrome / Playwright — `npm.cmd run test:browser` | 6 scénarios réussis                                         |
| Audit npm de production                          | Aucune vulnérabilité signalée au moment du contrôle         |
| Précontrôle de production sans configuration     | Échec attendu : liste explicite des informations manquantes |

Le build signale l’absence de `metadataBase` lorsque Next.js résout certains médias sociaux sans domaine configuré. Aucun domaine commercial n’a été supposé : les pages sont `noindex`, aucun canonical n’est généré et le sitemap est vide dans cet état. Le domaine réel doit être fourni avant une compilation destinée à la publication. Les messages `NO_COLOR`/`FORCE_COLOR` de Playwright sont des avertissements de terminal sans effet sur le site.

## Parcours contrôlé

Le visiteur découvre les solutions, consulte un service ou un guide, puis accède à la demande de devis. Sans configuration réelle, le formulaire affiche son indisponibilité et ne transmet aucune information. L’API refuse les origines étrangères et renvoie une indisponibilité explicite, jamais un succès fictif.

Les tests Chrome vérifient les 17 pages visibles, leur réponse HTTP, un H1 unique et leurs titres ; ils contrôlent également les pages volontairement non publiées en 404. Les six guides et la page Perpignan sont inclus dans le parcours. Les 225 autres communes et la page climatiseur mobile restent non publiées. Les mentions légales restent en 404 tant que l’identité juridique n’est pas validée.

Le menu mobile, l’ouverture des réponses FAQ, le lien d’accès rapide au clavier, le formulaire désactivé, le JSON-LD de la FAQ, les métadonnées sans domaine, les robots et les assets de marque sont contrôlés. Aucun débordement horizontal n’est détecté sur l’accueil aux largeurs 320, 390, 768, 1 280 et 1 920 pixels. Les captures desktop et mobile sont dans `artifacts/home-desktop.png` et `artifacts/home-mobile.png` et ont été examinées visuellement. Aucun échec de ressource n’est relevé sur l’accueil. Aucune erreur JavaScript de page ou erreur console n’est relevée pendant le parcours des routes.

Sans vidéo, le hero affiche la création abstraite de marque, sans lecteur vide et sans requête de vidéo manquante. La préférence de réduction des mouvements désactive l’animation décorative. La lecture volontaire, les codecs et le poids de la vidéo réelle devront être testés lorsque les fichiers seront fournis.

## Logique d’envoi

Les tests métier vérifient la validation, la normalisation d’email, le honeypot, le consentement, la surface et les limites de longueur. Ils vérifient l’échappement HTML et les scénarios d’acceptation ou d’échec des emails :

- Aucune confirmation si la notification est refusée.
- Demande reçue conservée comme telle si la confirmation échoue ou rencontre une erreur réseau.
- Clés distinctes pour notification et confirmation.
- Contenus déterministes lors d’un nouvel identifiant de formulaire, compatibles avec l’idempotence du prestataire.

Les réponses du prestataire sont simulées uniquement dans ces tests. Aucun email réel n’a été envoyé et aucune instance Redis n’a été créée. Le fonctionnement du script Redis en conditions distribuées, les limites, les contrats et la réception effective des messages restent à vérifier sur les services configurés par l’exploitant.

## SEO et données

Les tests de données vérifient les 226 communes officielles, les codes INSEE, les slugs uniques et les communes prioritaires. La source et sa date de récupération sont conservées dans le JSON. Le sitemap est vérifié sans domaine et avec une origine HTTPS de test : guides et Perpignan inclus, pages locales non publiées et climatiseur mobile exclus. Les canonicals rejettent les domaines non HTTPS et les URLs avec chemin. Aucun faux équipement n’est ajouté.

Les guides utilisent des références officielles, notamment [l’ADEME sur le choix d’une climatisation](https://agirpourlatransition.ademe.fr/particuliers/amenager-maison/climatiser-rafraichir/bien-choisir-climatisation). Les communes proviennent de [l’API Géo](https://geo.api.gouv.fr/decoupage-administratif/communes). La page Perpignan cite ses repères communaux et l’office de tourisme. Aucune identité juridique n’a été récupérée auprès d’une entreprise homonyme.

## Limites restantes

Aucun déploiement, envoi Resend réel, essai Redis distant ou test de vidéo réelle. Aucun score Lighthouse, mesure terrain des Core Web Vitals ou audit de conformité juridique n’est revendiqué. Les contrôles d’accessibilité effectués ne constituent pas un audit RGAA exhaustif. Analytics et Speed Insights sont actifs automatiquement sur Vercel et inactifs dans les vérifications locales ; leur collecte réelle ne peut pas être contrôlée sans déploiement.

Le code ne contient pas de secrets réels. `.env.example` ne comporte que les noms des variables ; `.env.local` et les fichiers de configuration locaux sensibles sont ignorés par Git.
