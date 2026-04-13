# Firebase Unauthorized Domain Fix

## Steps to fix the Google Sign-In error:

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: "my-first-e-commerce-1e208"
3. Go to **Authentication** → **Settings** tab
4. Scroll down to **Authorized domains**
5. Click **Add domain**
6. Add your Vercel domain: **commerce-mikolo20s-projects.vercel.app**
7. Click **Add**
8. Save changes

Your other domains that should already be there:
- localhost:3000 (for local testing)
- commerce-mikolo20s-projects.vercel.app (your production domain)

Once you add the domain, Google Sign-In will work on mobile and desktop.
