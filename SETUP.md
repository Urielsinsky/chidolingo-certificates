# ChidoLingo Configuration Guide (SETUP.md)

This document details the specific configuration required to make the app function.
**Use this reference to populate your `.env.local` file.**

## 1. Environment Variables (`.env.local`)

Create a file named `.env.local` in the project root and add the following keys.

### 💳 Stripe Configuration
Required for processing payments.
```bash
# Public key (Safe to share, needed for client-side operations if any)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (Check Stripe Dashboard)

# Secret key (KEEP SECRET! Used for verifying sessions serverside)
STRIPE_SECRET_KEY=sk_live_... (Check Stripe Dashboard)
```

### 📧 Email Configuration (Resend)
Required for sending the digital certificates.
```bash
# API Key from Resend.com
RESEND_API_KEY=re_... (Check Resend Dashboard)
```

### 🔗 Payment Links
These are the Stripe Payment Links created in the Stripe Dashboard.
```bash
# 5 Lessons Package
NEXT_PUBLIC_STRIPE_LINK_5=https://buy.stripe.com/...

# 10 Lessons Package
NEXT_PUBLIC_STRIPE_LINK_10=https://buy.stripe.com/...
```

### 🌍 Site Configuration
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# In production, change to: https://gift.chidolingo.com
```

## 2. Stripe Dashboard Setup
1.  **Create Payment Links**: create two payment links (one for 5 lessons, one for 10).
2.  **Redirect Behavior**: Configure the payment link to redirect after purchase to:
    `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`
    *(Replace `http://localhost:3000` with your production domain when live)*
3.  **Metadata**: You may need to ensure the product names in Stripe match what the code expects if you are doing strict validation, though currently, the app validates based on the session existence.

## 3. Important Assets
Ensure the following files exist in your local `public/assets/` folder (these are not always in git if .gitignored, but they should be committed):
-   `public/assets/5_lessons.pdf` (or `certificate.pdf`)
-   `public/assets/10_lessons.pdf`

## 4. Troubleshooting
-   **Emails not sending?** Check your Resend API Key and ensure the domain is verified in Resend.
-   **Stripe error?** Verification on `/success` requires the `STRIPE_SECRET_KEY` to be correct.
