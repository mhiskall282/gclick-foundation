import React, { useState, useEffect } from 'react';
import { Heart, Star, Shield, ArrowLeft, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonatePage = () => {
  const [currency, setCurrency] = useState<'USD' | 'GHS'>('USD');
  const [sliderValue, setSliderValue] = useState<number>(100);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo'>('card');
  const [momoProvider, setMomoProvider] = useState<'mtn' | 'telecel' | 'airteltigo'>('mtn');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rate = 14; // 1 USD = 14 GHS

  const formatMoney = (amount: number) => {
    if (currency === 'USD') {
      return `$${amount}`;
    }
    return `GH₵${amount * rate}`;
  };

  const getImpactMessage = (usdAmount: number) => {
    if (usdAmount < 25) {
      return `Provides internet access for 1 student for a week.`;
    } else if (usdAmount < 50) {
      return `Provides learning materials and coding textbooks for ${Math.floor(usdAmount / 15)} student(s).`;
    } else if (usdAmount < 150) {
      return `Sponsors a comprehensive React workshop session for ${Math.floor(usdAmount / 50)} student(s).`;
    } else if (usdAmount < 400) {
      return `Provides unlimited lab connectivity and high-speed mentorship setups for ${Math.floor(usdAmount / 100)} student(s).`;
    } else {
      return `Sponsors a complete 12-week mentorship program and job placement matching for a student leader.`;
    }
  };

  const tiers = [
    {
      id: 1,
      name: "Supporter",
      price: 25,
      icon: Heart,
      desc: "Help fund books and internet access."
    },
    {
      id: 2,
      name: "Champion",
      price: 100,
      icon: Star,
      desc: "Sponsor specialized coding workshops."
    },
    {
      id: 3,
      name: "Partner",
      price: 500,
      icon: Shield,
      desc: "Sponsor full mentorship and placement paths."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark-obsidian text-white pt-32 pb-24 supabase-grid">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-brand-pink mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to site
        </Link>

        {/* Headline */}
        <div className="text-left mb-16 space-y-4 max-w-2xl reveal-on-scroll">
          <span className="inline-flex items-center text-xs uppercase tracking-wider text-brand-pink font-bold bg-brand-pink/10 px-4 py-2 rounded-full border border-brand-pink/20">
            Secure Donation Console
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Sponsor Digital Growth
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            G-Click is a registered non-profit organization. 100% of sponsorship resources flow directly to developer curricula, server costs, and hardware access for local students in Ghana.
          </p>
        </div>

        {/* Currency & Preset Billing Selector */}
        <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 mb-10 shadow-2xl reveal-on-scroll">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-lg font-display font-bold">Select Contribution Level</h2>
              <p className="text-xs text-gray-500">Choose a preset or adjust the custom slider below</p>
            </div>
            
            {/* Currency toggles */}
            <div className="flex items-center gap-1.5 bg-brand-dark-obsidian p-1 rounded-xl border border-brand-dark-border">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currency === 'USD' ? 'bg-brand-dark-card text-brand-pink border border-brand-dark-border' : 'text-gray-400 hover:text-white'}`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('GHS')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currency === 'GHS' ? 'bg-brand-dark-card text-brand-pink border border-brand-dark-border' : 'text-gray-400 hover:text-white'}`}
              >
                GHS (₵)
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => setSliderValue(tier.price)}
                  className={`bg-brand-dark-obsidian border text-left p-6 rounded-2xl transition-all duration-300 hover:border-brand-pink/50 flex flex-col justify-between ${sliderValue === tier.price ? 'border-brand-pink ring-1 ring-brand-pink' : 'border-brand-dark-border'}`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tier.name}</span>
                    <Icon className={`h-4.5 w-4.5 ${sliderValue === tier.price ? 'text-brand-pink' : 'text-gray-600'}`} />
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-display font-extrabold text-white">{formatMoney(tier.price)}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-normal">{tier.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Checkout Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Slider & Impact Statement */}
          <div className="lg:col-span-7 bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl space-y-8 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Custom Value</h3>
                <span className="text-3xl font-display font-extrabold text-brand-pink">{formatMoney(sliderValue)}</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="5"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-brand-dark-obsidian border border-brand-dark-border rounded-lg appearance-none cursor-pointer accent-brand-pink focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-bold mt-2">
                <span>{formatMoney(10)}</span>
                <span>{formatMoney(500)}</span>
                <span>{formatMoney(1000)}</span>
              </div>
            </div>

            <div className="border-t border-brand-dark-border pt-6 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-brand-pink font-bold">Field Impact Metrics</h4>
              <div className="bg-brand-dark-obsidian border border-brand-dark-border rounded-2xl p-6 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center text-brand-pink text-xs font-bold flex-shrink-0 mt-0.5">
                  i
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {getImpactMessage(sliderValue)}
                </p>
              </div>
            </div>
          </div>

          {/* Secure Payment details */}
          <div className="lg:col-span-5 bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl space-y-6 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Secure Payment</h3>
            
            {/* Tabs */}
            <div className="flex gap-1.5 bg-brand-dark-obsidian p-1 rounded-xl border border-brand-dark-border">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${paymentMethod === 'card' ? 'bg-brand-dark-card text-brand-pink border border-brand-dark-border' : 'text-gray-400 hover:text-white'}`}
              >
                <CreditCard className="h-3.5 w-3.5" />
                Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('momo')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${paymentMethod === 'momo' ? 'bg-brand-dark-card text-brand-pink border border-brand-dark-border' : 'text-gray-400 hover:text-white'}`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                Momo
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert(`Transaction of ${formatMoney(sliderValue)} authorized successfully via secured Paystack sandbox.`); }}>
              {paymentMethod === 'card' ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Card Number</label>
                    <input type="text" id="cardNumber" placeholder="4000 1234 5678 9010" required className="w-full px-4 py-3 border border-brand-dark-border rounded-xl bg-brand-dark-obsidian text-sm text-white focus:outline-none focus:border-brand-pink" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Expiry</label>
                      <input type="text" id="expiry" placeholder="MM/YY" required className="w-full px-4 py-3 border border-brand-dark-border rounded-xl bg-brand-dark-obsidian text-sm text-white focus:outline-none focus:border-brand-pink" />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">CVV</label>
                      <input type="text" id="cvv" placeholder="123" required className="w-full px-4 py-3 border border-brand-dark-border rounded-xl bg-brand-dark-obsidian text-sm text-white focus:outline-none focus:border-brand-pink" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Network Provider</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setMomoProvider('mtn')}
                        className={`flex-1 py-2 text-center text-xs font-bold rounded-lg border transition-all ${momoProvider === 'mtn' ? 'border-[#FFCC00] bg-[#FFCC00]/10 text-white' : 'border-brand-dark-border text-gray-400'}`}
                      >
                        MTN
                      </button>
                      <button
                        type="button"
                        onClick={() => setMomoProvider('telecel')}
                        className={`flex-1 py-2 text-center text-xs font-bold rounded-lg border transition-all ${momoProvider === 'telecel' ? 'border-[#E60000] bg-[#E60000]/10 text-white' : 'border-brand-dark-border text-gray-400'}`}
                      >
                        Telecel
                      </button>
                      <button
                        type="button"
                        onClick={() => setMomoProvider('airteltigo')}
                        className={`flex-1 py-2 text-center text-xs font-bold rounded-lg border transition-all ${momoProvider === 'airteltigo' ? 'border-[#0055A5] bg-[#0055A5]/10 text-white' : 'border-brand-dark-border text-gray-400'}`}
                      >
                        AirtelTigo
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Mobile Money Number</label>
                    <input type="tel" id="phone" placeholder="e.g. 024 601 0890" required className="w-full px-4 py-3 border border-brand-dark-border rounded-xl bg-brand-dark-obsidian text-sm text-white focus:outline-none focus:border-brand-pink" />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-2 border-t border-brand-dark-border">
                <ShieldCheck className="h-4 w-4 text-brand-pink" />
                Secured via Paystack Gateway • SSL Secure
              </div>

              <button type="submit" className="w-full py-4 bg-brand-pink hover:bg-brand-pink/90 text-white rounded-xl font-bold transition-all text-sm shadow-lg shadow-brand-pink/30">
                Authorize {formatMoney(sliderValue)}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DonatePage;
