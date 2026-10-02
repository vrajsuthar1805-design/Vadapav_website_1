# 🌶️ MUMBAI SPICE: Navratri Edition ("9 Din 9 Swaad")

A mobile-first, view-only festival website built for the **Mumbai Spice: Navratri Special Vadapav Fest**.
- **Festival Dates:** 20–28 September
- **Operating Timings:** 6:00 PM to 12:00 AM
- **Tagline:** *"Fresh banta hai, garam milta hai."*

---

## 🎯 Architecture & Security Rules

* **View-Only Visitor Website:** Visitors can browse combos, full menu pricing, stamp card rules, festive offers, and stall location.
* **NO Transactions Online:** No cart, no checkout, no dummy/UPI/QR payments, and no online visitor sign-up. Everything is ordered in-person at the festival stall counter.
* **Secret Admin Portal:** Hidden route at `/admin` (not linked in navigation or footer). Only the stall owner can log in to edit prices, items, combos, offers, stamp card rules, and stall details.
* **Instant Seed Data:** Pre-populated with all festival combos, menu prices, 9-day stamp rewards, and offers out of the box.

---

## 🛠️ Tech Stack

* **Frontend Framework:** Next.js 14 (App Router) + React 18
* **Styling:** Tailwind CSS (Festive Navratri theme with deep reds, saffron, and gold accents)
* **Icons:** Lucide React
* **Backend / Database:** Firebase (Cloud Firestore + Firebase Authentication for 1 Admin)
* **Hosting:** Deploy-ready for Vercel (100% free tier compatible)

---

## 🚀 Quick Start & Exact Commands

### 1. Prerequisites
Ensure Node.js 18+ or 20+ is installed on your system.

### 2. Install Dependencies
```bash
npm install
```

### 3. Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🔑 Environment Variables Setup

Create a `.env.local` file in the project root:

```env
# Firebase Configuration (From Firebase Console > Project Settings > General > Your Apps > Web App)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyYourApiKeyHere
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mumbai-spice-navratri.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mumbai-spice-navratri
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mumbai-spice-navratri.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

> **Note on Local Development:** If `.env.local` is not configured, the website automatically runs in **Offline / Local Storage Mode** with all default festival data pre-loaded. You can log into `/admin` using the built-in development credentials:
> - **Email:** `admin@mumbaispice.com`
> - **Password:** `mumbai2026`

---

## 🔥 Firebase Setup Guide (5 Minutes)

### Step 1: Create Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add project**.
2. Name it `mumbai-spice-navratri` (disable Google Analytics if not needed).
3. Under **Project settings** > **General**, scroll to **Your apps**, click the **Web icon (</>)**, register the app, and copy the `firebaseConfig` keys into `.env.local`.

### Step 2: Enable Firebase Authentication (Single Admin Only)
1. In Firebase Console, go to **Build** > **Authentication**.
2. Click **Get started**, choose **Email/Password**, and toggle **Enable** (leave Email link disabled).
3. Under the **Users** tab, click **Add user**.
4. Enter your single owner email (e.g. `owner@mumbaispice.com`) and a strong password.
5. **Block Public Signups:** Firebase Authentication by default only allows accounts added in the console unless a public signup flow is written (and our website has zero public signup forms).

### Step 3: Setup Cloud Firestore Database
1. In Firebase Console, go to **Build** > **Firestore Database**.
2. Click **Create database**, choose a region close to your customers (e.g. `asia-south1` for Mumbai), and start in **Production mode**.
3. Click on the **Rules** tab, paste the exact rules below, and click **Publish**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // MUMBAI SPICE: NAVRATRI EDITION SECURITY RULES
    // 1. Visitors can ONLY READ (public view-only)
    // 2. Only authenticated admin can write
    
    match /stallConfig/{document=**} {
      // Anyone can read menu, combos, and fest details
      allow read: if true;
      
      // Only authenticated admin can save changes
      allow write: if request.auth != null;
    }

    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 4: One-Click Firestore Seeding
1. Open `/admin` in your browser.
2. Sign in with your admin credentials.
3. Click the green **"Save Changes"** button. The complete festival dataset (combos, items, stamp card rules, offers) is automatically written to Firestore under `stallConfig/main`!

---

## 🚢 Deploying to Vercel (100% Free)

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your repository.
4. Under **Environment Variables**, add the 6 Firebase variables:
   * `NEXT_PUBLIC_FIREBASE_API_KEY`
   * `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   * `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   * `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   * `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   * `NEXT_PUBLIC_FIREBASE_APP_ID`
5. Click **Deploy**. Vercel will build and assign you a free production URL (e.g. `https://mumbai-spice-navratri.vercel.app`).
6. Print your stall QR poster pointing to your Vercel URL!

---

## 📱 Public Features & Sections Breakdown

| Section | Description |
| :--- | :--- |
| **Top Ticker** | Sticky ribbon with festival dates (*20–28 September*) & timings (*6:00 PM to 12:00 AM*). |
| **Hero** | Steaming cheese-burst vadapav showcase, molten cheese badge, and *See Combos* CTA. |
| **Combos** | Cheezy Delights (Double Burst ₹120, Burst Maja ₹100, Burst Starter ₹80) & Saver Packs (Friends Pack ₹150, Classic Starter ₹60, Chhota Pack ₹50) with savings tags. |
| **Full Menu** | Dual-pricing table for Vadapavs & Drinks (A la carte vs In-combo savings) + Parcel charges notice. |
| **Stamp Card** | Visual 3×3 circle grid for 9 Navratri days. Milestones: Free Mumbai VP on 5th visit, Free Cheese Burst VP on 9th visit. Clarifies counter-verification rule. |
| **Offers** | Instagram Follow & Tag (Free Drink), Google Review (₹10 off next visit), Garba After Hours (₹10 off post 10 PM), and Bulk Booking for 20+. |
| **About Us** | Stall story (*"Fresh banta hai, garam milta hai"*), timings, location, and Google Maps redirect. |
| **Mobile Actions** | Sticky bottom pill for on-the-go visitors: *Combos*, *WhatsApp*, *Call*, and *Directions*. |

---

## 🔒 Secret Admin Panel Capabilities (`/admin`)

* **Stall Details:** Update stall name, dates, timings, announcement banner, contact numbers, and hero image URL.
* **Combos Manager:** Add, edit, delete, reorder (Move Up/Down), and toggle visibility of any combo.
* **Menu Items:** Add/edit/delete vadapavs and chilled drinks, adjust a la carte and in-combo prices, toggle veg tags.
* **Stamp Card:** Edit minimum bill threshold, reward texts for 5th & 9th visits, and counter rule bullet points.
* **Special Offers:** Toggle individual offers on/off, edit discount terms, and update links.
* **Section Toggles:** Enable or disable any public section without redeploying.
* **Real-time Live Sync:** Changes made in the dashboard reflect instantly for all visitors via Firestore snapshot listeners.
