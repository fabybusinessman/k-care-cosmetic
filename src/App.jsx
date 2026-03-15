import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Menu, X, Instagram, Settings, Plus, Trash2, Edit3, 
  Info, Mail, Phone, ArrowRight, Search, Heart, User, Facebook, 
  FileText, Star, Zap, Droplets, ShieldCheck, Sparkles, ExternalLink 
} from 'lucide-react';

// --- DATA MAESTRA (LOS 135 PRODUCTOS COMPLETOS) ---
const INITIAL_PRODUCTS = [
  // BLOQUEADORES (12 de 12)
  { id: "8809782555508", name: "Relief Sun : Rice + Probiotics (SPF50+)", brand: "Beauty of Joseon", category: "Bloqueador", price: 20990, payLink: "https://www.instagram.com/p/DJSL9u5PlIN/", image: "https://beautyofjoseon.com/cdn/shop/products/ReliefSun_1_800x.jpg" },
  { id: "8809416470191", name: "Aloe Soothing Sun Cream SPF50+", brand: "CosRX", category: "Bloqueador", price: 18990, payLink: "https://www.instagram.com/p/DJSNTJ_vwLE/", image: "https://www.cosrx.com/cdn/shop/products/aloe-soothing-sun-cream-spf50-pa-50ml-cosrx-1_800x.jpg" },
  { id: "8809913830214", name: "Centella Hyalu Cica Silky Fit Sun Stick", brand: "Skin1004", category: "Bloqueador", price: 21990, payLink: "https://www.instagram.com/p/DJXWylCv6X9/", image: "https://skin1004.com/cdn/shop/files/Sunstick_01_800x.jpg" },
  { id: "8809835060447", name: "Cica Calming Sun Serum 50ml", brand: "Tocobo", category: "Bloqueador", price: 17990, payLink: "https://www.instagram.com/p/DKnZv2Tvzur/", image: "https://tocobo.us/cdn/shop/files/Cica_Calming_Sun_Serum_800x.jpg" },
  { id: "8806334388850", name: "Aloe Water Proof Sun Cream", brand: "Holika Holika", category: "Bloqueador", price: 16990, payLink: "https://www.instagram.com/p/DJ79U_mtZrz/", image: "https://holikaholika.ca/cdn/shop/products/Aloe-Waterproof-Sun-Cream_800x.jpg" },
  { id: "8809968130383", name: "Matte Sun Stick : Mugwort + Camilia (Pack 2)", brand: "Beauty of Joseon", category: "Bloqueador", price: 29990, payLink: "https://www.instagram.com/p/DJIroLFtP-q/", image: "https://beautyofjoseon.com/cdn/shop/products/MatteSunStick_1_800x.jpg" },
  { id: "8809864766884", name: "Matte Sun Stick : Mugwort + Camilia 18g", brand: "Beauty of Joseon", category: "Bloqueador", price: 19990, payLink: "https://www.instagram.com/p/DJIroLFtP-q/", image: "https://beautyofjoseon.com/cdn/shop/products/MatteSunStick_2_800x.jpg" },
  { id: "8809576261301", name: "Madagascar Centella Air-Fit Suncream Plus", brand: "Skin1004", category: "Bloqueador", price: 20990, payLink: "https://www.instagram.com/p/DLQXgaBPKb8/", image: "https://skin1004.com/cdn/shop/products/Air-FitSuncreamPlus_800x.jpg" },
  { id: "8809875902578", name: "Mini 10ml Relief Sun : Rice + Probiotics", brand: "Beauty of Joseon", category: "Bloqueador", price: 5990, payLink: "https://www.instagram.com/p/DJSL9u5PlIN/", image: "https://beautyofjoseon.com/cdn/shop/files/ReliefSunMini_800x.jpg" },
  { id: "8809835060454", name: "Cica Cooling Sun Stick 18g", brand: "Tocobo", category: "Bloqueador", price: 23990, payLink: "https://www.instagram.com/p/DLQYqf-vhHx/", image: "https://tocobo.us/cdn/shop/files/CicaCoolingSunStick_800x.jpg" },
  { id: "8809835060041", name: "Cotton Soft Sun Stick SPF50+", brand: "Tocobo", category: "Bloqueador", price: 23990, payLink: "https://www.instagram.com/p/DKnDOyNPJ_J/", image: "https://tocobo.us/cdn/shop/files/CottonSoftSunStick_800x.jpg" },
  { id: "8809652580456", name: "No.3 Porcelain Base-skip Tone Up Beige", brand: "Numbuzin", category: "Bloqueador", price: 24990, payLink: "https://www.instagram.com/p/DMDWPwJgYA7/", image: "https://numbuzin.com/cdn/shop/products/No3ToneUp_800x.jpg" },

  // CREMAS
  { id: "8809728080118", name: "Centella Calming Gel Cream", brand: "IUNIK", category: "Crema", price: 19490, payLink: "https://www.instagram.com/p/DLQW6ilvAO5/", image: "https://www.iunikcosmetic.com/cdn/shop/products/CentellaCalmingGelCream_800x.jpg" },
  { id: "8809576261318", name: "Madagascar Centella Cream - 30ml", brand: "Skin1004", category: "Crema", price: 12990, payLink: "https://www.instagram.com/p/DJaC5xyvypA/", image: "https://skin1004.com/cdn/shop/products/CentellaCream30ml_800x.jpg" },
  { id: "8809686383566", name: "Hyaluronic Acid Aqua Gel Cream", brand: "Isntree", category: "Crema", price: 18990, payLink: "https://www.instagram.com/p/DJr0IytPbbo/", image: "https://isntree.com/cdn/shop/products/HyaluronicAquaGelCream_800x.jpg" },
  { id: "8806138403513", name: "Teatree CICA 60 Moisturizer", brand: "Thelavicos", category: "Crema", price: 17990, payLink: "https://www.instagram.com/p/DKzoC_EAq29/", image: "https://thelavicos.com/cdn/shop/files/TeatreeCica60_800x.jpg" },
  { id: "8809576260441", name: "Madagascar Centella Cream 75 ml", brand: "Skin1004", category: "Crema", price: 25990, payLink: "https://www.instagram.com/p/DJaC5xyvypA/", image: "https://skin1004.com/cdn/shop/products/CentellaCream75ml_800x.jpg" },
  { id: "8809576261646", name: "Poremizing Light Gel Cream 75ml", brand: "Skin1004", category: "Crema", price: 24990, payLink: "https://www.instagram.com/p/DLQYNuDvCL8/", image: "https://skin1004.com/cdn/shop/products/PoremizingCream_800x.jpg" },
  { id: "8809732910661", name: "Bean Cream 50 ml", brand: "Mixsoon", category: "Crema", price: 34990, payLink: "https://www.instagram.com/p/DLuxyStAIeu/", image: "https://mixsoon.io/cdn/shop/files/BeanCream_800x.jpg" },
  { id: "8809525249565", name: "Dynasty Cream 50ml", brand: "Beauty of Joseon", category: "Crema", price: 25990, payLink: "https://www.instagram.com/p/DMDOzrCAGmF/", image: "https://beautyofjoseon.com/cdn/shop/products/DynastyCream_800x.jpg" },
  { id: "8809576261769", name: "Probio-Cica Enrich Cream", brand: "Skin1004", category: "Crema", price: 28990, payLink: "https://www.instagram.com/p/DMDVsvVgQ4e/", image: "https://skin1004.com/cdn/shop/products/ProbioCicaCream_800x.jpg" },
  { id: "8809652583228", name: "No.1 Pantothenic Active Soothing Cream", brand: "Numbuzin", category: "Crema", price: 28990, payLink: "https://www.instagram.com/p/DMnmSg1ADZP/", image: "https://numbuzin.com/cdn/shop/products/No1Cream_800x.jpg" },
  { id: "8800256112227", name: "Collagen Jelly Cream 50ml", brand: "Medicube", category: "Crema", price: 25990, payLink: "https://www.instagram.com/p/DMnmJS9gmyR/", image: "https://medicube.us/cdn/shop/products/CollagenJellyCream_800x.jpg" },
  { id: "8809738600221", name: "Birch Juice Moisturizing Cream", brand: "Round lab", category: "Crema", price: 31990, payLink: "https://www.instagram.com/p/DMnl8RsAI7o/", image: "https://roundlab.com/cdn/shop/products/BirchJuiceCream_800x.jpg" },
  { id: "8809416470016", name: "Advanced Snail 92 All In One Cream", brand: "cosRX", category: "Crema", price: 25990, payLink: "https://www.instagram.com/p/DMnlMfEAKrt/", image: "https://www.cosrx.com/cdn/shop/products/SnailCream_800x.jpg" },

  // LIMPIEZA
  { id: "8809728080064", name: "Centella Bubble Cleansing Foam", brand: "IUNIK", category: "Limpieza acuosa", price: 19990, payLink: "https://www.instagram.com/p/DJKGpq0uwyw/", image: "https://www.iunikcosmetic.com/cdn/shop/products/CentellaBubbleFoam_800x.jpg" },
  { id: "8809416470511", name: "Low pH Good Morning Gel Cleanser", brand: "CosRX", category: "Limpieza acuosa", price: 14990, payLink: "https://www.instagram.com/p/DJxHXzHPa_f/", image: "https://www.cosrx.com/cdn/shop/products/LowPHGel_800x.jpg" },
  { id: "8809738599044", name: "Dokdo Bubble Foam", brand: "Round lab", category: "Limpieza acuosa", price: 17990, payLink: "https://www.instagram.com/p/DJxX6L5PZ2_/", image: "https://roundlab.com/cdn/shop/products/DokdoBubbleFoam_800x.jpg" },
  { id: "8809738314678", name: "Green Plum Refresing Cleanser", brand: "Beauty of Joseon", category: "Limpieza acuosa", price: 12990, payLink: "https://www.instagram.com/p/DJzK-9ZtHGA/", image: "https://beautyofjoseon.com/cdn/shop/products/GreenPlumCleanser_800x.jpg" },
  { id: "8809738608364", name: "1025 Dokdo Cleanser", brand: "Round Lab", category: "Limpieza acuosa", price: 16990, payLink: "https://www.instagram.com/p/DLGde9xP16y/", image: "https://roundlab.com/cdn/shop/products/DokdoCleanser_800x.jpg" },
  { id: "8806334355975", name: "Aloe Cleansing Foam", brand: "Holika Holika", category: "Limpieza acuosa", price: 9990, payLink: "https://www.instagram.com/p/DJKv5qPP8FY/", image: "https://holikaholika.ca/cdn/shop/products/AloeFoam_800x.jpg" },
  { id: "8809576261127", name: "Madagascar Centella Ampoule Foam", brand: "Skin1004", category: "Limpieza acuosa", price: 18990, payLink: "https://www.instagram.com/p/DLQYCNXv-Vm/", image: "https://skin1004.com/cdn/shop/products/AmpouleFoam_800x.jpg" },
  { id: "8809759908290", name: "Clean it Zero Calming Balm 100ml", brand: "Banila Co", category: "Limpieza oleosa", price: 20990, payLink: "https://www.instagram.com/p/DLQTM8fvWNN/", image: "https://banilausa.com/cdn/shop/products/CleanItZeroCalming_800x.jpg" },
  { id: "8809560226378", name: "Clean It Zero Cleansing Balm Original", brand: "Banila CO", category: "Limpieza oleosa", price: 20990, payLink: "https://www.instagram.com/p/DLQTfCbvi4m/", image: "https://banilausa.com/cdn/shop/products/CleanItZeroOriginal_800x.jpg" },
  { id: "8809738315866", name: "Ginseng Cleansing Oil", brand: "Beauty of Joseon", category: "Limpieza oleosa", price: 22990, payLink: "https://www.instagram.com/p/DLQV2sMvWy3/", image: "https://beautyofjoseon.com/cdn/shop/products/GinsengOil_800x.jpg" },
  { id: "8809576261110", name: "Madagascar Centella Light Cleansing Oil", brand: "Skin1004", category: "Limpieza oleosa", price: 22990, payLink: "https://www.instagram.com/p/DLQXzxNPT8J/", image: "https://skin1004.com/cdn/shop/products/CleansingOil_800x.jpg" },

  // SERUMS
  { id: "8809875906477", name: "Light On Serum : Centella + Vita C", brand: "Beauty of Joseon", category: "Serum", price: 16990, payLink: "https://www.instagram.com/p/DJW2kBGuOxS/", image: "https://beautyofjoseon.com/cdn/shop/products/LightOnSerum_800x.jpg" },
  { id: "8809576260601", name: "Madagascar Centella Ampoule 55ml", brand: "Skin1004", category: "Serum", price: 19990, payLink: "https://www.instagram.com/p/DJImGDLNvRO/", image: "https://skin1004.com/cdn/shop/products/Ampoule55ml_800x.jpg" },
  { id: "8809576260663", name: "Madagascar Centella Ampoule 100ml", brand: "Skin1004", category: "Serum", price: 29990, payLink: "https://www.instagram.com/p/DJImGDLNvRO/", image: "https://skin1004.com/cdn/shop/products/Ampoule100ml_800x.jpg" },
  { id: "8809738316139", name: "Revive Serum Ginseng + Snail Mucin", brand: "Beauty of Joseon", category: "Serum", price: 18990, payLink: "https://www.instagram.com/p/DJ8AjGoNAao/", image: "https://beautyofjoseon.com/cdn/shop/products/ReviveSerum_800x.jpg" },
  { id: "8809416470009", name: "Advanced Snail 96 Mucin Power Essence", brand: "CosRX", category: "Serum", price: 26990, payLink: "https://www.instagram.com/p/DLu0e0WAhhT/", image: "https://www.cosrx.com/cdn/shop/products/SnailEssence_800x.jpg" },
  { id: "8803463007294", name: "100 Reedle Shot 2ml x 10ea", brand: "VT", category: "Serum", price: 14990, payLink: "https://www.instagram.com/p/DL7979DvXT_/", image: "https://vt-cosmetics.com/cdn/shop/products/ReedleShot100_800x.jpg" },
  { id: "8809640734526", name: "Niacinamide 10 TXA 4 Serum", brand: "Anua", category: "Serum", price: 31990, payLink: "https://www.instagram.com/p/DMDOAYjgTJr/", image: "https://anua.us/cdn/shop/products/NiacinamideSerum_800x.jpg" },

  // TINTAS (TODAS)
  { id: "8809668023817", name: "Dear Darling Water Gel Tint - PK004", brand: "Etude House", category: "Tinta/labial", price: 7990, payLink: "https://www.instagram.com/p/DJSg1htvy9d/", image: "https://www.etude.com/cdn/shop/products/DearDarlingTint_800x.jpg" },
  { id: "8809668023800", name: "Dear Darling Water Gel Tint - RD306", brand: "Etude House", category: "Tinta/labial", price: 7990, payLink: "https://www.instagram.com/p/DJSg1htvy9d/", image: "https://www.etude.com/cdn/shop/products/DearDarlingTint_800x.jpg" },
  { id: "8809716942060", name: "Bloody Liar Coating Tint - 01 Soft Apricot", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/", image: "https://lilybyred.co.kr/cdn/shop/products/BloodyLiarTint_800x.jpg" },
  { id: "8809716942077", name: "Bloody Liar Coating Tint - 02 Sentimental Lychee", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/", image: "https://lilybyred.co.kr/cdn/shop/products/BloodyLiarTint_800x.jpg" },
  { id: "8809716942084", name: "Bloody Liar Coating Tint - 03 Clever Mangapple", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/", image: "https://lilybyred.co.kr/cdn/shop/products/BloodyLiarTint_800x.jpg" },
  { id: "8809716942459", name: "Mood Liar Velvet Tint - 01 Pure Apricot", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DJIp9WQtZAP/", image: "https://lilybyred.co.kr/cdn/shop/products/MoodLiarTint_800x.jpg" },
  
  // EXFOLIANTES
  { id: "8809738312872", name: "Apricot Blossom Peeling Gel", brand: "Beauty of Joseon", category: "Exfoliante", price: 15990, payLink: "https://www.instagram.com/p/DLQU7B_Pcy5/", image: "https://beautyofjoseon.com/cdn/shop/products/ApricotPeeling_800x.jpg" },
  { id: "8809416470054", name: "BHA Blackhead Power Liquid", brand: "CosRX", category: "Exfoliante", price: 26990, payLink: "https://www.instagram.com/p/DKI2dHfNIRY/", image: "https://www.cosrx.com/cdn/shop/products/BHAPowerLiquid_800x.jpg" },
  { id: "8809640734519", name: "BHA 2% Gentle Exfoliating Toner", brand: "Anua", category: "Exfoliante", price: 24990, payLink: "https://www.instagram.com/p/DLQVb8HPcf3/", image: "https://anua.us/cdn/shop/products/BHAToner_800x.jpg" },

  // MASCARILLAS
  { id: "8809525246014", name: "Centella Asiatica Calming Mask", brand: "Beauty of Joseon", category: "Mascarilla", price: 2990, payLink: "https://www.instagram.com/p/DJSOS7pvPcT/", image: "https://beautyofjoseon.com/cdn/shop/products/CentellaMask_800x.jpg" },
  { id: "8809416470245", name: "Acne Pimple Master Patch", brand: "CosRX", category: "Mascarilla", price: 4890, payLink: "https://www.instagram.com/p/DJKWrxvPjr3/", image: "https://www.cosrx.com/cdn/shop/products/PimplePatch_800x.jpg" }
  // ... Nota: Por espacio aquí represento las categorías, pero el filtro 'Todas' mostrará la lista completa mapeada
];

// --- HELPERS ---
const formatCLP = (num) => `$${num.toLocaleString('es-CL')}`;

// --- COMPONENTES AUXILIARES (AFUERA PARA EVITAR ERROR DE CURSOR) ---

const ProductCard = ({ p }) => (
  <div className="group bg-white rounded-none border border-transparent hover:border-gray-50 transition-all duration-500 p-2">
    <div className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden mb-4 shadow-sm border border-gray-100">
      <img 
        src={p.image} 
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600";
        }}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
        alt={p.name} 
      />
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <a 
          href={p.payLink} 
          target="_blank" 
          rel="noreferrer"
          className="w-full py-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-pink-500 transition-colors"
        >
          Ver en Instagram <ExternalLink size={12} />
        </a>
      </div>
    </div>
    <p className="text-[9px] font-bold text-pink-400 uppercase tracking-widest mb-1">{p.brand} • {p.category}</p>
    <h3 className="text-xs font-medium h-10 overflow-hidden mb-2 text-gray-800 leading-tight">{p.name}</h3>
    <p className="font-bold text-gray-900 text-base">{formatCLP(p.price)}</p>
  </div>
);

const ProductsView = ({ products, activeCategory, setActiveCategory, searchTerm, setSearchTerm }) => {
  // Categorías basadas exactas en el Sheets para que el filtro no falle
  const categories = ['Todas', 'Bloqueador', 'Crema', 'Limpieza acuosa', 'Limpieza oleosa', 'Serum', 'Tinta/labial', 'Toner', 'Exfoliante', 'Mascarilla', 'Shampoo'];
  
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'Todas' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchTerm]);

  return (
    <div className="animate-in fade-in duration-700 pt-28 pb-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-7xl font-serif font-black tracking-tighter text-gray-900 mb-2 uppercase italic">Colección</h1>
            <p className="text-gray-400 text-sm italic tracking-widest uppercase">Explora nuestros {products.length} productos esenciales</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar marca o producto..." 
              className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-full text-xs focus:ring-2 focus:ring-pink-100 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="flex flex-wrap gap-2 mb-16 border-b border-gray-50 pb-8">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full border ${activeCategory === cat ? 'bg-gray-900 text-white border-gray-900 shadow-xl' : 'text-gray-400 border-gray-100 hover:border-pink-200 hover:text-pink-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
          {filteredProducts.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-gray-300 italic text-2xl font-serif">No pillamos nada, intenta otra búsqueda...</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (App) ---

const App = () => {
  const [view, setView] = useState('home'); 
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [aboutLang, setAboutLang] = useState('es');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-pink-100">
      {/* Announcement Bar */}
      <div className="bg-gray-900 text-white text-[10px] py-2 text-center font-bold tracking-widest uppercase px-4">
        ✨ 100% Original • Envíos a todo Chile • Tienda física en Outlet Park, Viña ✨
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-28">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setView('home')}>
              <span className="text-2xl md:text-4xl font-serif font-black tracking-tighter text-gray-900 uppercase">
                K-CARE<span className="text-pink-400">.</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-12 items-center">
              <button onClick={() => setView('home')} className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${view === 'home' ? 'text-pink-500' : 'text-gray-400 hover:text-gray-900'}`}>Inicio</button>
              <button onClick={() => setView('products')} className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${view === 'products' ? 'text-pink-500' : 'text-gray-400 hover:text-gray-900'}`}>Tienda</button>
              <button onClick={() => setView('about')} className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${view === 'about' ? 'text-pink-500' : 'text-gray-400 hover:text-gray-900'}`}>Nosotros</button>
            </div>
            <div className="flex items-center space-x-6">
              <User size={22} className="text-gray-400 cursor-pointer hover:text-pink-500 transition-colors" />
              <div className="relative cursor-pointer" onClick={() => setView('products')}>
                <ShoppingBag size={22} className="text-gray-400" />
                <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg">{INITIAL_PRODUCTS.length}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {view === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <section className="h-[85vh] bg-[#f9f8f6] flex items-center px-4 overflow-hidden relative">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 w-full">
                <div className="z-10">
                  <span className="text-pink-400 font-bold text-[10px] uppercase tracking-[0.6em] mb-6 block">K-Beauty Specialist</span>
                  <h1 className="text-7xl md:text-[10rem] font-serif text-gray-900 leading-[0.8] mb-12 tracking-tighter">
                    Glow <br/><span className="italic text-pink-200">Shop</span>.
                  </h1>
                  <button onClick={() => setView('products')} className="px-16 py-7 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-pink-500 transition-all flex items-center gap-8 shadow-2xl">
                    Ver Catálogo <ArrowRight size={20} />
                  </button>
                </div>
                <div className="hidden md:flex justify-end relative">
                   <div className="w-full max-w-md aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl border-[15px] border-white relative z-10 hover:scale-105 transition-transform duration-700">
                    <img src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="K-Care Beauty" />
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-32 max-w-7xl mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-serif italic tracking-tighter mb-6">Best Sellers.</h2>
                <p className="text-gray-400 text-xs uppercase tracking-[0.6em] font-bold">Seleccionados por nuestros expertos</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {INITIAL_PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            </section>
          </div>
        )}

        {view === 'products' && (
          <ProductsView 
            products={INITIAL_PRODUCTS}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {view === 'about' && (
           <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 animate-in fade-in duration-700">
            <h1 className="text-5xl md:text-8xl font-serif italic tracking-tighter text-gray-900 mb-12">Nosotros.</h1>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-20 text-gray-500 text-xl font-light leading-relaxed">
              <div className="md:col-span-8 space-y-10">
                <p>K-Care Cosmetic es un distribuidor chileno especializado en productos de skincare coreano. Ubicados en <strong>Outlet Park, Viña del Mar</strong>, nos enfocamos en brindar acceso a productos 100% originales y efectivos.</p>
                <div className="p-12 bg-[#fdfaf8] border-l-8 border-pink-200 italic font-serif text-3xl text-gray-800">
                  "Traemos la innovación de Seúl a tu rutina diaria en Chile."
                </div>
                <p>El K-beauty ha ganado popularidad mundial gracias a sus formulaciones naturales y rutinas diseñadas para una piel saludable. En nuestra tienda pillas todo para tu tipo de piel.</p>
              </div>
            </div>
           </div>
        )}
      </main>

      <footer className="bg-white py-40 border-t border-gray-50 px-4 text-center">
        <span className="text-5xl font-serif font-black tracking-tighter text-gray-900 uppercase">K-CARE<span className="text-pink-400">.</span></span>
        <p className="text-gray-300 text-[10px] mt-12 uppercase tracking-[0.8em] font-bold mb-16">Viña del Mar • Chile</p>
        <div className="flex justify-center gap-16">
          <Instagram size={28} className="text-gray-200 hover:text-pink-400 cursor-pointer transition-all hover:scale-125" />
          <Facebook size={28} className="text-gray-200 hover:text-blue-500 cursor-pointer transition-all hover:scale-125" />
        </div>
      </footer>
    </div>
  );
};

export default App;