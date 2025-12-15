import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { resend } from '@/lib/resend';
import path from 'path';
import fs from 'fs';

const getEmailTemplate = (title: string, content: string, cta?: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #FFFDF9; }
      .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 40px 20px; }
      .card { background: #ffffff; border-radius: 24px; border: 2px solid #3D2E28; overflow: hidden; box-shadow: 8px 8px 0px rgba(0,0,0,0.05); }
      .header { background-color: #008CB8; padding: 32px; text-align: center; background-image: url('https://www.transparenttextures.com/patterns/cubes.png'); }
      .content { padding: 40px 32px; color: #3D2E28; }
      h1 { margin: 0; color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: -0.5px; }
      h2 { color: #3D2E28; font-size: 24px; font-weight: 800; margin-top: 0; }
      p { font-size: 16px; line-height: 1.6; color: #5D4037; margin-bottom: 20px; }
      .highlight { color: #CA035E; font-weight: bold; }
      .quote { background: #E5F7FC; border-left: 4px solid #008CB8; padding: 16px 20px; border-radius: 8px; font-style: italic; color: #00607d; margin: 24px 0; }
      .footer { text-align: center; padding: 20px; color: #8C6A5D; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
      .btn { display: inline-block; background-color: #CA035E; color: #ffffff; padding: 12px 24px; border-radius: 12px; font-weight: bold; text-decoration: none; margin-top: 10px; border: 2px solid #3D2E28; box-shadow: 2px 2px 0px #3D2E28; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="header">
                <h1>${title}</h1>
            </div>
            <div class="content">
                ${content}
            </div>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} ChidoLingo. Español Chido.
        </div>
    </div>
</body>
</html>
`;

export async function POST(req: Request) {
    try {
        const { session_id, recipient_name, recipient_email, message } = await req.json();

        if (!session_id || !recipient_email || !recipient_name) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        // 1. Verify Session with Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status !== 'paid') {
            return new NextResponse('Payment not verified', { status: 403 });
        }

        // 2. Check if already sent (via metadata)
        if (session.metadata?.sent === 'true') {
            return new NextResponse('Certificate already sent. Please contact support if this is an error.', { status: 400 });
        }

        // 3. Determine certificate type and file based on Price or Metadata
        // $99.99 (approx 9999 cents) -> 5 Lessons
        // $189.99 (approx 18999 cents) -> 10 Lessons
        const amount = session.amount_total || 0;
        let filename = '5_lessons.pdf'; // Default fallback
        let productName = '5 Lesson Package';

        if (amount > 15000 || session.metadata?.certificate_type === '10_lessons' || session.metadata?.certificate_type === '25_lessons') {
            filename = '10_lessons.pdf';
            productName = '10 Lesson Package';
        } else {
            filename = '5_lessons.pdf';
            productName = '5 Lesson Package';
        }

        const filePath = path.join(process.cwd(), 'public', 'assets', filename);

        let attachmentBase64;
        try {
            const fileBuffer = fs.readFileSync(filePath);
            attachmentBase64 = fileBuffer.toString('base64');
        } catch (e) {
            console.error("PDF file not found", e);
            return new NextResponse(`System Error: Certificate file not found (${filename})`, { status: 500 });
        }

        // 4. Send Email(s)
        const purchaserEmail = session.customer_details?.email || 'Unknown';

        // To Recipient
        await resend.emails.send({
            from: 'ChidoLingo <hola@chidolingo.com>',
            to: [recipient_email],
            subject: `¡Sorpresa! A Gift for you from ${purchaserEmail} 🎁`,
            html: getEmailTemplate(
                "¡Hola! You've got a gift.",
                `
                <h2>Hola ${recipient_name},</h2>
                <p>You have received a <span class="highlight">${productName}</span> Gift Certificate from <strong>${purchaserEmail}</strong>.</p>
                <div class="quote">
                    "${message || 'Enjoy this gift!'}"
                </div>
                <p><strong>To redeem your lessons:</strong><br/>
                Simply reply to this email or contact us at <a href="mailto:hola@chidolingo.com" style="color:#008CB8; font-weight:bold;">hola@chidolingo.com</a> with your certificate attached.</p>
                <p style="margin-top: 30px;">¡Nos vemos en clase!</p>
                <p>- The ChidoLingo Team 🌮</p>
                `
            ),
            attachments: [
                {
                    filename: filename,
                    content: attachmentBase64,
                },
            ],
        });

        // To Buyer (Confirmation)
        await resend.emails.send({
            from: 'ChidoLingo <hola@chidolingo.com>',
            to: [purchaserEmail],
            subject: `Gift sent to ${recipient_name} ✅`,
            html: getEmailTemplate(
                "Gift Delivered!",
                `
                <h2>Mission Accomplished.</h2>
                <p>Your gift certificate for <span class="highlight">${productName}</span> has been successfully sent to <strong>${recipient_name}</strong> (${recipient_email}).</p>
                <p>You're officially awesome. Thanks for sharing the love of Español.</p>
                <p>- ChidoLingo</p>
                `
            ),
            attachments: [
                {
                    filename: filename,
                    content: attachmentBase64,
                },
            ],
        });

        // To Admin (Notification)
        await resend.emails.send({
            from: 'ChidoLingo <hola@chidolingo.com>',
            to: ['hola@chidolingo.com'],
            subject: `New Certificate: ${purchaserEmail} -> ${recipient_name}`,
            html: `
              <h1>New Order</h1>
              <p><strong>By:</strong> ${purchaserEmail}</p>
              <p><strong>To:</strong> ${recipient_name} (${recipient_email})</p>
              <p><strong>Type:</strong> ${productName}</p>
              <p><strong>Method:</strong> Stripe (${session.id})</p>
            `,
        });

        // 5. Mark as sent in Stripe Metadata
        await stripe.checkout.sessions.update(session_id, {
            metadata: {
                ...session.metadata,
                sent: 'true',
                recipient_email: recipient_email,
                recipient_name: recipient_name
            }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('API Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
