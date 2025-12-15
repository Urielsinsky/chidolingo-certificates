"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Check, Gift, Loader2, Send } from "lucide-react";
import Link from "next/link";
import confetti from 'canvas-confetti';

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const [sessionData, setSessionData] = useState<any>(null);
    const [formData, setFormData] = useState({
        recipient_name: "",
        recipient_email: "",
        message: "",
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [alreadySent, setAlreadySent] = useState(false);

    useEffect(() => {
        if (!sessionId) {
            setLoading(false);
            return;
        }

        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);


        const checkOrder = async () => {
            try {
                const res = await fetch(`/api/get-certificate?session_id=${sessionId}`);
                if (res.ok) {
                    const data = await res.json();
                    setSessionData(data);

                    if (data.metadata?.sent === 'true') {
                        setAlreadySent(true);
                        setSent(true);
                    }
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (e) {
                setLoading(false);
            }
        };

        checkOrder();
    }, [sessionId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sessionId) return;
        setSending(true);

        try {
            const res = await fetch('/api/send-certificate', {
                method: 'POST',
                body: JSON.stringify({
                    session_id: sessionId,
                    ...formData
                })
            });

            if (res.ok) {
                setSent(true);
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } else {
                const msg = await res.text();
                alert(msg || "Whoops, something went wrong. Try again.");
            }
        } catch (e) {
            alert("Error sending gift.");
        } finally {
            setSending(false);
        }
    };

    if (!sessionId) {
        return (
            <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-black text-stone-900 mb-4">Lost? 🗺️</h1>
                <p className="text-stone-600 mb-8">We couldn't find this order. Please verify the link or go back home.</p>
                <Link href="/" className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-black transition-colors">
                    Go Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans text-[#3D2E28] relative overflow-hidden flex flex-col">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1565620861113-d0901e8529f7?q=80&w=2836&auto=format&fit=crop"
                    alt="Mexico Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#FFFDF9]/90 lg:bg-gradient-to-r lg:from-[#FFFDF9] lg:via-[#FFFDF9]/75 lg:to-transparent"></div>

                {/* Glow Blobs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-[#008CB8]/20 rounded-full blur-[100px] animate-pulse z-0 hidden lg:block"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#CA035E]/20 rounded-full blur-[100px] animate-pulse z-0 hidden lg:block"></div>
            </div>

            <main className="relative z-10 max-w-3xl mx-auto px-6 py-20 w-full">
                {/* Logo Link to Home */}
                <div className="flex justify-center mb-8">
                    <Link href="/">
                        <img src="/logo.png" alt="ChidoLingo Logo" className="h-12 hover:scale-105 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6 bg-white/50 backdrop-blur-md rounded-3xl border border-white p-12">
                        <Loader2 className="w-12 h-12 text-[#CA035E] animate-spin" />
                        <p className="text-xl font-bold text-[#5D4037] animate-pulse">Looking for your gift...</p>
                    </div>
                ) : sent ? (
                    <div className="bg-[#FFFDF9] rounded-[2rem] border-2 border-[#3D2E28] shadow-[8px_8px_0px_rgba(0,0,0,0.1)] overflow-hidden text-center p-12 relative">
                        {/* Confetti Decoration */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#008CB8] to-[#CA035E]"></div>

                        <div className="w-24 h-24 bg-[#E5F7FC] text-[#008CB8] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow border-2 border-[#008CB8]">
                            <Check className="w-12 h-12 stroke-[3]" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-[#3D2E28] mb-6 tracking-tight">
                            {alreadySent ? "Already Sent!" : "Gift Sent!"}
                        </h1>

                        <p className="text-xl text-[#5D4037] max-w-lg mx-auto leading-relaxed mb-10">
                            The digital certificate has been successfully emailed to <span className="font-bold text-[#CA035E]">{alreadySent ? sessionData?.metadata?.recipient_email : formData.recipient_email}</span>.
                        </p>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#3D2E28] text-white rounded-xl font-bold text-lg hover:bg-black hover:scale-105 transition-all shadow-lg"
                        >
                            <Gift className="w-5 h-5" />
                            Send Another Gift
                        </Link>
                    </div>
                ) : sessionData ? (
                    <div className="bg-[#FFFDF9]/90 backdrop-blur-md rounded-[2rem] border-2 border-[#3D2E28] shadow-[8px_8px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                        <div className="bg-[#008CB8] p-10 text-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            <div className="relative z-10">
                                <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                                    Payment Successful! 🎉
                                </h1>
                                <p className="text-blue-100 font-bold text-lg">
                                    Now, let's make magic happen. Who is this for?
                                </p>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-[#3D2E28] uppercase tracking-wider">
                                            Recipient's Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Maria Perez"
                                            className="w-full px-5 py-4 bg-white border-2 border-[#3D2E28]/20 rounded-xl font-bold text-[#3D2E28] focus:border-[#CA035E] focus:outline-none transition-all placeholder:text-gray-300"
                                            value={formData.recipient_name}
                                            onChange={e => setFormData({ ...formData, recipient_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-[#3D2E28] uppercase tracking-wider">
                                            Their Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="maria@example.com"
                                            className="w-full px-5 py-4 bg-white border-2 border-[#3D2E28]/20 rounded-xl font-bold text-[#3D2E28] focus:border-[#CA035E] focus:outline-none transition-all placeholder:text-gray-300"
                                            value={formData.recipient_email}
                                            onChange={e => setFormData({ ...formData, recipient_email: e.target.value })}
                                        />
                                        <p className="text-xs text-[#5D4037] mt-2 font-medium leading-relaxed opacity-80">
                                            Don't have their email? Enter yours to print or forward it later. (You'll always get a receipt copy). <span className="font-bold text-[#CA035E]">Note: Only the recipient named above can redeem the lessons.</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-[#3D2E28] uppercase tracking-wider flex items-center gap-2">
                                        Personal Message <span className="text-[#5D4037] font-medium normal-case">(Make it special)</span>
                                    </label>
                                    <textarea
                                        placeholder="Happy Birthday! I hope you love learning Spanish..."
                                        className="w-full px-5 py-4 bg-white border-2 border-[#3D2E28]/20 rounded-xl font-bold text-[#3D2E28] focus:border-[#CA035E] focus:outline-none transition-all min-h-[150px] resize-none placeholder:text-gray-300"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full py-5 bg-[#CA035E] hover:bg-[#a0024b] text-white font-black text-xl rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-[4px_4px_0px_#3D2E28] active:translate-y-[2px] active:shadow-none border-2 border-[#3D2E28] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {sending ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Sending Magic...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-6 h-6" />
                                            Send Gift Now
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-12 bg-white/80 backdrop-blur rounded-[2rem] border-2 border-[#3D2E28] shadow-lg">
                        <p className="text-[#CA035E] font-black text-2xl mb-2">We couldn't verify payment.</p>
                        <p className="text-[#5D4037] font-medium">Please check your email for the receipt or contact support.</p>
                        <Link href="/" className="mt-6 inline-block text-[#008CB8] font-bold underline">Return Home</Link>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#CA035E] animate-spin" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
