import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return new NextResponse('Missing session_id', { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Only return safe data
        return NextResponse.json({
            id: session.id,
            payment_status: session.payment_status,
            amount_total: session.amount_total,
            metadata: session.metadata
        });
    } catch (e: any) {
        console.error("Stripe Error:", e);
        return new NextResponse(`Error: ${e.message}`, { status: 500 });
    }
}
