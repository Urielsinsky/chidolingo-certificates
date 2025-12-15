import Link from "next/link";
import { Check, Star, Mail, Gift, MousePointerClick, ArrowRight, Clock, Calendar, BookOpen, MessageCircle } from "lucide-react";

export default function Home() {
  const products = [
    {
      id: "5-lessons",
      title: "5 Lesson Gift Certificate",
      price: "$99.99",
      features: [
        "5 Private Spanish Lessons",
        "Personalized Curriculum",
        "Flexible Scheduling (7am-9pm)",
        "Valid for 1 Year",
        "All Digital Materials Included"
      ],
      link: process.env.NEXT_PUBLIC_STRIPE_LINK_5 || "#",
      // Brand Blue
      headerColor: "bg-[#008CB8]",
      btnColor: "bg-[#008CB8] hover:bg-[#007093]",
      popular: false,
    },
    {
      id: "10-lessons",
      title: "10 Lesson Gift Certificate",
      price: "$189.99",
      features: [
        "10 Private Spanish Lessons",
        "Custom Learning Plan",
        "Flexible Scheduling (7am-9pm)",
        "Valid for 1 Year",
        "All Digital Materials Included"
      ],
      link: process.env.NEXT_PUBLIC_STRIPE_LINK_10 || "#",
      // Brand Magenta
      headerColor: "bg-[#CA035E]",
      btnColor: "bg-[#CA035E] hover:bg-[#A0024B]",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen font-sans text-[#3D2E28] relative overflow-x-hidden flex flex-col">

      {/* Background Image with Overlay - Fixed to cover full scroll */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1565620861113-d0901e8529f7?q=80&w=2836&auto=format&fit=crop"
          alt="Mexico Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#FFFDF9]/90 lg:bg-gradient-to-r lg:from-[#FFFDF9] lg:via-[#FFFDF9]/75 lg:to-transparent"></div>

        {/* Glow Blobs (Fixed position) */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#008CB8]/20 rounded-full blur-[100px] animate-pulse z-0 hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#CA035E]/20 rounded-full blur-[100px] animate-pulse z-0 hidden lg:block"></div>
      </div>


      {/* Navbar */}
      <nav className="relative z-50 h-24 border-b border-[#3D2E28]/5 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ChidoLingo Logo" className="h-8 object-contain" />
          </div>
          <Link
            href="https://chidolingo.com"
            className="text-sm font-bold text-[#8C6A5D] hover:text-[#CA035E] transition-colors"
          >
            Back to Main Site
          </Link>
        </div>
        {/* Papel Picado Border Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="block w-full h-[6px]" viewBox="0 0 1200 12" preserveAspectRatio="none">
            <path d="M0,0V12H1200V0C1150,8 1100,0 1050,8C1000,0 950,8 900,0C850,8 800,0 750,8C700,0 650,8 600,0C550,8 500,0 450,8C400,0 350,8 300,0C250,8 200,0 150,8C100,0 50,8 0,0Z" className="fill-[#CA035E] opacity-50"></path>
          </svg>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

        {/* Left Column: Copy + How it Works */}
        <div className="flex-1 space-y-12 text-center flex flex-col items-center max-w-xl">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-[#3D2E28]">
              Give the Gift of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008CB8] to-[#CA035E]">
                Native Spanish.
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-[#5D4037] font-medium leading-relaxed">
              Forget socks. Give private, personalized Spanish lessons they'll actually love. Delivered instantly via email.
            </p>
          </div>

          {/* How it Works Module */}
          <div className="w-full bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-lg relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#008CB8]/10 rounded-full blur-2xl group-hover:bg-[#008CB8]/20 transition-all"></div>

            <h3 className="text-lg font-bold text-[#3D2E28] mb-6 uppercase tracking-wider relative z-10">How it works</h3>
            <div className="grid grid-cols-3 gap-4 relative z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#E5F7FC] rounded-full flex items-center justify-center border-2 border-[#3D2E28] relative shadow-[2px_2px_0px_#3D2E28] hover:scale-110 transition-transform cursor-default">
                  <span className="absolute -top-2 -left-2 bg-[#3D2E28] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">1</span>
                  <MousePointerClick className="w-5 h-5 text-[#008CB8]" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-black text-[#3D2E28]">Buy</span>
                  <span className="block text-[10px] font-medium text-[#5D4037] leading-tight mt-1">Select a certificate</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center border-2 border-[#3D2E28] relative shadow-[2px_2px_0px_#3D2E28] hover:scale-110 transition-transform cursor-default">
                  <span className="absolute -top-2 -left-2 bg-[#3D2E28] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">2</span>
                  <Mail className="w-5 h-5 text-[#CA035E]" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-black text-[#3D2E28]">Personalize</span>
                  <span className="block text-[10px] font-medium text-[#5D4037] leading-tight mt-1">Add custom note</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center border-2 border-[#3D2E28] relative shadow-[2px_2px_0px_#3D2E28] hover:scale-110 transition-transform cursor-default">
                  <span className="absolute -top-2 -left-2 bg-[#3D2E28] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">3</span>
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-black text-[#3D2E28]">Redeem</span>
                  <span className="block text-[10px] font-medium text-[#5D4037] leading-tight mt-1">They book anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing */}
        <div className="flex-1 w-full max-w-xl flex flex-col items-center justify-center">
          <div className="w-full bg-[#FFFDF9]/80 backdrop-blur-xl rounded-[2.5rem] p-6 lg:p-8 shadow-2xl border border-white/60 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#008CB8]/10 to-[#CA035E]/10 blur-3xl -z-10 rounded-full pointer-events-none"></div>

            <div className="grid sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <div key={product.id} className="relative bg-[#FFFDF9] border-2 border-[#3D2E28] rounded-2xl overflow-hidden flex flex-col shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.15)] transition-all h-[440px] group">
                  {/* Gift Ribbon */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 overflow-hidden z-20 pointer-events-none">
                    <div className={`absolute top-[18px] left-[-35px] w-[140px] h-[35px] ${product.popular ? 'bg-[#FFD700]' : 'bg-gray-200'} -rotate-45 flex items-center justify-center shadow-sm`}>
                      <Gift className={`w-7 h-7 ${product.popular ? 'text-[#3D2E28]' : 'text-gray-500'} transform rotate-45`} />
                    </div>
                  </div>

                  {product.popular && (
                    <div className="absolute top-0 right-0 left-0 bg-[#F0C987] text-[#3D2E28] text-[10px] font-bold text-center py-1 uppercase tracking-wider z-10 flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 fill-[#3D2E28]" /> Best Value
                    </div>
                  )}

                  <div className={`${product.headerColor} text-white p-5 pt-8 text-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <h3 className="text-xl font-bold opacity-90 mb-1 leading-tight px-2 relative z-10">{product.title}</h3>
                    <div className="text-3xl font-black tracking-tight relative z-10">{product.price}</div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between bg-[#FFFDF9]">
                    <ul className="space-y-3">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-bold text-[#5D4037] leading-tight group-hover:text-[#3D2E28] transition-colors">
                          <Check className="w-3.5 h-3.5 shrink-0 text-[#3D2E28]" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={product.link}
                      className={`w-full py-4 text-white rounded-xl font-bold text-xl text-center border-2 border-[#3D2E28] shadow-[2px_2px_0px_#3D2E28] active:translate-y-[2px] active:shadow-none transition-all mt-4 ${product.btnColor} flex items-center justify-center gap-2 group-hover:scale-[1.02]`}
                    >
                      Buy Gift <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Certificate Preview Section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 border-t border-[#3D2E28]/5">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-[#3D2E28] tracking-tight mb-4">What they'll get.</h2>
          <p className="text-[#5D4037] font-medium max-w-xl mx-auto">
            A beautiful, personalized digital certificate delivered straight to their inbox (or yours). Printable and forever memorable.
          </p>
        </div>

        <div className="relative mx-auto max-w-2xl transform rotate-1 hover:rotate-0 transition-all duration-500">
          {/* Decorative 'frame' glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#008CB8] to-[#CA035E] rounded-xl blur-xl opacity-30"></div>
          <img
            src="/certificate.jpg"
            alt="ChidoLingo Gift Certificate Preview"
            className="relative rounded-lg shadow-2xl border-4 border-white"
          />

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-[#3D2E28] px-4 py-2 rounded-full font-black text-sm shadow-lg border-2 border-[#3D2E28] transform -rotate-3">
            Valid for 1 Year! 🗓️
          </div>
        </div>
      </section>

      {/* NEW: Teachers Section */}
      <section className="relative z-10 w-full bg-white/50 backdrop-blur-sm py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-[#E5F7FC] text-[#008CB8] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-[#008CB8]/20">
            The Chido Team
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-[#3D2E28] tracking-tight mb-12">
            100% Mexican. 100% Certified.<br />
            <span className="text-[#CA035E]">0% Boring.</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-16">
            {[
              { img: "/teacher1.png", role: "Certified Teacher" },
              { img: "/teacher2.png", role: "Certified Teacher" },
              { img: "/teacher3.png", role: "Certified Teacher" }
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-32 h-32 rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform border-4 border-white overflow-hidden relative bg-white">
                  <img src={t.img} alt="ChidoLingo Teacher" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <img src="https://flagcdn.com/w20/mx.png" alt="Mexico" className="w-4 rounded-sm" />
                  <span className="text-xs font-black text-[#3D2E28] uppercase tracking-wide">Mexican</span>
                </div>
                <span className="text-sm font-bold text-[#5D4037]">{t.role}</span>
              </div>
            ))}
          </div>

          {/* Trustpilot CTA */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-2xl mx-auto border border-[#3D2E28]/5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#008b] transition-colors group">
            <div className="text-left">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-6 h-6 bg-[#00b67a] text-white flex items-center justify-center"><Star className="w-4 h-4 fill-white" /></div>)}
              </div>
              <p className="text-[#3D2E28] font-bold text-lg">Rated Excellent</p>
              <p className="text-sm text-[#5D4037]">Based on real student reviews on <span className="font-bold">Trustpilot</span></p>
            </div>

            <a
              href="https://www.trustpilot.com/review/chidolingo.com"
              target="_blank"
              className="px-6 py-3 bg-stone-900 text-white rounded-xl font-bold flex items-center gap-2 group-hover:bg-black transition-colors shadow-lg"
            >
              Read Reviews <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[#5D4037] text-xs font-bold uppercase tracking-widest bg-white/30 backdrop-blur-md border-t border-[#3D2E28]/5 relative z-10">
        © {new Date().getFullYear()} ChidoLingo. Español Chido.
      </footer>
    </div>
  );
}
