# ChidoLingo Gift Certificates

A dedicated web application for selling and automatically delivering digital Spanish lesson gift certificates.
Built with **Next.js**, **Stripe**, and **Resend**.

## 🚀 Installation Guide (New Laptop)

Follow these steps to set up the project on a new machine.

### 1. Prerequisites
- **Node.js** (v18.17 or higher)
- **Git**

### 2. Setup

1.  **Clone the repository**:
    ```bash
    git clone <YOUR_REPO_URL>
    cd certificado-de-regalo
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    *   Create a new file named `.env.local` in the root directory.
    *   **CRITICAL**: This file is ignored by Git. You must manually add your secrets here.
    *   Read [SETUP.md](./SETUP.md) for the exact variable names and values required.

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to ensure everything is working.

## 📂 Project Structure
- `/src/app/page.tsx`: Main landing page with pricing and "How it works".
- `/src/app/success/page.tsx`: Post-purchase page where users personalize and send the gift.
- `/public/assets`: Stores the PDF certificate templates (ensure these exist!).

## 🛠 Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Payments**: Stripe (Client-only checkout flow)
- **Emails**: Resend API
