# Employer Portal Setup

Clients post and delete Gulf job openings at `#employer-portal`.

## Client link

Share this with employers:

**`https://YOUR-SITE/#/employer`**

Examples:
- Local: `http://localhost:5173/#/employer`
- GitHub Pages: `https://isajidkhan00-sys.github.io/golden-route-website/#/employer`

Password: value of `VITE_EMPLOYER_PASSWORD` (default `Salaaroutsourcing@00`)

Posted jobs appear on **`/#/positions`** with requirements and benefits.

## Firebase (recommended for live client use)

1. Create a Firebase project at https://console.firebase.google.com
2. Enable **Authentication → Email/Password**
3. Create a user, e.g. `employers@goldenrouteoep.com` with your shared password
4. Create **Firestore** database
5. Copy `.env.local.example` to `.env.local` and fill in the `VITE_FIREBASE_*` values
6. Suggested security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

7. Restart `npm run dev`

## Env vars

See `.env.local.example`.
