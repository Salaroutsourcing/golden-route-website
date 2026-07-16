# Employer Portal Setup

Clients post and delete Gulf job openings at `#employer-portal`.

## Quick start (works today)

1. Scroll to **Employer login** in the footer (or open `/#employer-portal`).
2. Enter the shared password: the value of `VITE_EMPLOYER_PASSWORD` (default matches what you provided).
3. Add jobs (title, trade, country, salary note).
4. Mark complete or delete when filled.

Without Firebase, jobs are stored in **this browser’s localStorage** so you can demo immediately. For multi-device sync across clients, connect Firebase below.

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
