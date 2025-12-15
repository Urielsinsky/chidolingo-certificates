# ChidoLingo Gift Certificates - Setup Guide (Simplified)

## 1. Environment Variables
Update your `.env.local` file. **Note: Supabase keys are NO LONGER NEEDED.**

```bash
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (REDACTED)
STRIPE_SECRET_KEY=sk_live_... (REDACTED - See .env.local)

# Email
RESEND_API_KEY=re_... (REDACTED - See .env.local)
# Site Config
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe Payment Links (Create these in Stripe Dashboard)
NEXT_PUBLIC_STRIPE_LINK_10=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_LINK_25=https://buy.stripe.com/...
```

## 2. Stripe Setup
1.  **Payment Links**: Ensure you have two links (10 & 25 lessons).
2.  **Redirect**: Set the confirmation page to `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`.
3.  **Metadata**: Add `certificate_type` (`10_lessons` OR `25_lessons`) to the Payment Link.
    *   *No webhook setup is required anymore since we validate on the Success page.*

## 3. Assets
Ensure PDFs are in `public/assets/`:
-   `public/assets/10_lessons.pdf`
-   `public/assets/25_lessons.pdf`

## 4. Troubleshooting
If the site looks unstyled, ensure `tailwind.config.ts` exists (I have restored it).
