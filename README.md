# TASSIVOX
**La voix de l’Algérie, l’écho du monde.**

Site Next.js en français. Hébergement prévu sur Vercel, dépôt GitHub utilisé comme stockage éditorial. **Supabase a été retiré du code.**

## Ce que contient le projet
- Accueil éditorial et rubriques en haut.
- Article à la une et dernières publications en disposition verticale.
- Pages de lecture des articles publiés.
- Administration par mot de passe avec création, modification, statut, source, image, À la une, Info spéciale et paramètres publics.
- Les articles et réglages sont enregistrés dans `content/tassivox.json` via l’API GitHub; le commit déclenche le déploiement Vercel.

## Configuration nécessaire (gratuite selon les quotas des services)
1. Décompressez le ZIP et importez le projet dans votre dépôt GitHub.
2. Dans GitHub, créez un **Personal Access Token** limité au dépôt `TassiVox`, avec la permission **Contents: Read and write**. Ne le mettez jamais dans le code.
3. Dans Vercel → projet → Settings → Environment Variables, ajoutez les quatre variables listées dans `.env.example`: `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `TASSIVOX_ADMIN_PASSWORD`, `TASSIVOX_SESSION_SECRET`.
4. Choisissez un mot de passe administrateur long et un secret de session aléatoire d’au moins 32 caractères. Gardez-les privés.
5. Redéployez le projet sur Vercel. Ouvrez `/admin/login` pour accéder à l’administration.

## Développement local
Copiez `.env.example` vers `.env.local`, renseignez les valeurs, puis lancez:
```bash
npm install
npm run dev
```
Ouvrez `http://localhost:3000`.

## Limites à connaître
- Cette version utilise un compte administrateur commun; la gestion de plusieurs comptes nominatifs et des rôles individuels n’est pas encore incluse dans cette variante sans service d’authentification tiers.
- La publication enregistre le contenu dans GitHub. Vercel doit reconstruire le site pour afficher les modifications publiques; cela peut prendre un peu de temps.
- Le token GitHub doit être limité au dépôt et conservé uniquement dans les variables d’environnement Vercel. Aucun article fictif n’est fourni.
