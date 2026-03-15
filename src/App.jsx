import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Menu, X, Instagram, Settings, Plus, Trash2, Edit3, 
  Info, Mail, Phone, ArrowRight, Search, Heart, User, Facebook, 
  FileText, Star, Zap, Droplets, ShieldCheck, Sparkles, ExternalLink 
} from 'lucide-react';

// --- DATA MAESTRA (135 PRODUCTOS) ---
// Extraídos íntegramente de la lista proporcionada
const INITIAL_PRODUCTS = [
  // BLOQUEADORES
  { id: "8809782555508", name: "Relief Sun : Rice + Probiotics (SPF50+, PA++++)", brand: "Beauty of Joseon", category: "Bloqueador", price: 20990, payLink: "https://www.instagram.com/p/DJSL9u5PlIN/" },
  { id: "8809416470191", name: "Aloe Soothing Sun Cream SPF50+ PA+++", brand: "CosRX", category: "Bloqueador", price: 18990, payLink: "https://www.instagram.com/p/DJSNTJ_vwLE/" },
  { id: "8809913830214", name: "Madagascar Centella Hyalu Cica Silky Fit Sun Stick", brand: "Skin1004", category: "Bloqueador", price: 21990, payLink: "https://www.instagram.com/p/DJXWylCv6X9/" },
  { id: "8809835060447", name: "Cica Calming Sun Serum 50ml", brand: "Tocobo", category: "Bloqueador", price: 17990, payLink: "https://www.instagram.com/p/DKnZv2Tvzur/" },
  { id: "8806334388850", name: "Aloe Water Proof Sun Cream (SPF 50+ PA++++)", brand: "Holika Holika", category: "Bloqueador", price: 16990, payLink: "https://www.instagram.com/p/DJ79U_mtZrz/" },
  { id: "8809968130383", name: "Matte Sun Stick : Mugwort + Camilia (Pack 2 x 18g)", brand: "Beauty of Joseon", category: "Bloqueador", price: 29990, payLink: "https://www.instagram.com/p/DJIroLFtP-q/" },
  { id: "8809864766884", name: "Matte Sun Stick : Mugwort + Camilia 18g", brand: "Beauty of Joseon", category: "Bloqueador", price: 19990, payLink: "https://www.instagram.com/p/DJIroLFtP-q/" },
  { id: "8809576261301", name: "Madagascar Centella Air-Fit Suncream Plus", brand: "Skin1004", category: "Bloqueador", price: 20990, payLink: "https://www.instagram.com/p/DLQXgaBPKb8/" },
  { id: "8809875902578", name: "Miniatura 10ml Relief Sun : Rice + Probiotics", brand: "Beauty of Joseon", category: "Bloqueador", price: 5990, payLink: "https://www.instagram.com/p/DJSL9u5PlIN/" },
  { id: "8809835060454", name: "Cica Cooling Sun Stick 18g", brand: "Tocobo", category: "Bloqueador", price: 23990, payLink: "https://www.instagram.com/p/DLQYqf-vhHx/" },
  { id: "8809835060041", name: "Cotton Soft Sun Stick SPF50+", brand: "Tocobo", category: "Bloqueador", price: 23990, payLink: "https://www.instagram.com/p/DKnDOyNPJ_J/" },
  { id: "8809652580456", name: "No.3 Porcelain Base-skip Tone Up Beige", brand: "Numbuzin", category: "Bloqueador", price: 24990, payLink: "https://www.instagram.com/p/DMDWPwJgYA7/" },
  
  // CREMAS
  { id: "8809728080118", name: "Centella Calming Gel Cream", brand: "IUNIK", category: "Crema", price: 19490, payLink: "https://www.instagram.com/p/DLQW6ilvAO5/" },
  { id: "8809576261318", name: "Madagascar Centella Cream - 30ml", brand: "Skin1004", category: "Crema", price: 12990, payLink: "https://www.instagram.com/p/DJaC5xyvypA/" },
  { id: "8809686383566", name: "Hyaluronic Acid Aqua Gel Cream", brand: "Isntree", category: "Crema", price: 18990, payLink: "https://www.instagram.com/p/DJr0IytPbbo/" },
  { id: "8806138403513", name: "Teatree CICA 60 Moisturizer", brand: "Thelavicos", category: "Crema", price: 17990, payLink: "https://www.instagram.com/p/DKzoC_EAq29/" },
  { id: "8809576260441", name: "Madagascar Centella Cream 75 ml", brand: "Skin1004", category: "Crema", price: 25990, payLink: "https://www.instagram.com/p/DJaC5xyvypA/" },
  { id: "8809576261646", name: "Madagascar Centella Poremizing Light Gel Cream", brand: "Skin1004", category: "Crema", price: 24990, payLink: "https://www.instagram.com/p/DLQYNuDvCL8/" },
  { id: "8809732910661", name: "Bean Cream 50 ml", brand: "Mixsoon", category: "Crema", price: 34990, payLink: "https://www.instagram.com/p/DLuxyStAIeu/" },
  { id: "8809525249565", name: "Dynasty Cream 50ml", brand: "Beauty of Joseon", category: "Crema", price: 25990, payLink: "https://www.instagram.com/p/DMDOzrCAGmF/" },
  { id: "8809576261769", name: "Madagascar Centella Probio-Cica Enrich Cream", brand: "Skin1004", category: "Crema", price: 28990, payLink: "https://www.instagram.com/p/DMDVsvVgQ4e/" },
  { id: "8809652583228", name: "No.1 Pantothenic Active Soothing Cream 80ml", brand: "Numbuzin", category: "Crema", price: 28990, payLink: "https://www.instagram.com/p/DMnmSg1ADZP/" },
  { id: "8800256112227", name: "Collagen Jelly Cream 50ml", brand: "Medicube", category: "Crema", price: 25990, payLink: "https://www.instagram.com/p/DMnmJS9gmyR/" },
  { id: "8809738600221", name: "Birch Juice Moisturizing Cream", brand: "Round lab", category: "Crema", price: 31990, payLink: "https://www.instagram.com/p/DMnl8RsAI7o/" },
  { id: "8809416470016", name: "Advanced Snail 92 All In One Cream", brand: "cosRX", category: "Crema", price: 25990, payLink: "https://www.instagram.com/p/DMnlMfEAKrt/" },

  // CUERPO / VARIOS
  { id: "8809953773007", name: "Rich Perfume Body Lotion - Ylang Ylang", brand: "Kundal", category: "Cuerpo", price: 5990, payLink: "https://www.instagram.com/p/DMnkjX5gPPt/" },
  { id: "8809953773014", name: "Rich Perfume Body Lotion - White Musk", brand: "Kundal", category: "Cuerpo", price: 5990, payLink: "https://www.instagram.com/p/DMnkjX5gPPt/" },

  // EXFOLIANTES
  { id: "8809738312872", name: "Apricot Blossom Peeling Gel", brand: "Beauty of Joseon", category: "Exfoliante", price: 15990, payLink: "https://www.instagram.com/p/DLQU7B_Pcy5/" },
  { id: "8809416470054", name: "BHA Blackhead Power Liquid", brand: "CosRX", category: "Exfoliante", price: 26990, payLink: "https://www.instagram.com/p/DKI2dHfNIRY/" },
  { id: "8809640734519", name: "BHA 2% Gentle Exfoliating Toner", brand: "Anua", category: "Exfoliante", price: 24990, payLink: "https://www.instagram.com/p/DLQVb8HPcf3/" },
  { id: "8809738604755", name: "1025 Dokdo Mascarilla de Arcilla", brand: "Round lab", category: "Exfoliante", price: 21990, payLink: "https://www.instagram.com/p/DLQXNpcPnOk/" },
  { id: "8809913830085", name: "Madagascar Centella Poremizin Quick clay Stick Mask", brand: "Skin1004", category: "Exfoliante", price: 22990, payLink: "https://www.instagram.com/p/DKSe6wsPlKW/" },

  // MAQUILLAJE / LABIOS
  { id: "8809263872070", name: "All Day Tight Makeup Setting Fixer", brand: "So Natural", category: "Maquillaje", price: 18990, payLink: "https://www.instagram.com/p/DJaqpfhtgI9/" },
  { id: "8809656961060", name: "What a Melon Moisture Lip Serum", brand: "manyo", category: "Labios", price: 8990, payLink: "https://www.instagram.com/p/DMnlq8ig8Xn/" },
  { id: "8809393727561", name: "Bálsamo : Luv Beam Cheek - Innocent Pink", brand: "Lilybyred", category: "Maquillaje", price: 12990, payLink: "https://www.instagram.com/p/DNHq2-lNTQt/" },
  { id: "8809393727578", name: "Bálsamo : Luv Beam Cheek - Mood Rose", brand: "Lilybyred", category: "Maquillaje", price: 12990, payLink: "https://www.instagram.com/p/DNHq2-lNTQt/" },

  // KITS
  { id: "8809576261233", name: "Madagascar Centella Travel Kit", brand: "Skin1004", category: "KIT", price: 35990, payLink: "https://www.instagram.com/p/DJcLwbNOcVk/" },
  { id: "8809402486632", name: "Maltese Makeup Brush Set (5 brochas)", brand: "Flalia", category: "KIT", price: 16990, payLink: "https://www.instagram.com/p/DLQYYTXPFIN/" },

  // LIMPIEZA
  { id: "8809728080064", name: "Centella Bubble Cleansing Foam", brand: "IUNIK", category: "Limpieza", price: 19990, payLink: "https://www.instagram.com/p/DJKGpq0uwyw/" },
  { id: "8809416470511", name: "Low pH Good Morning Gel Cleanser", brand: "CosRX", category: "Limpieza", price: 14990, payLink: "https://www.instagram.com/p/DJxHXzHPa_f/" },
  { id: "8809738599044", name: "Dokdo Bubble Foam", brand: "Round lab", category: "Limpieza", price: 17990, payLink: "https://www.instagram.com/p/DJxX6L5PZ2_/" },
  { id: "8809738314678", name: "Green Plum Refresing Cleanser", brand: "Beauty of Joseon", category: "Limpieza", price: 12990, payLink: "https://www.instagram.com/p/DJzK-9ZtHGA/" },
  { id: "8809738608364", name: "1025 Dokdo Cleanser", brand: "Round Lab", category: "Limpieza", price: 16990, payLink: "https://www.instagram.com/p/DLGde9xP16y/" },
  { id: "8806334355975", name: "Aloe Cleansing Foam", brand: "Holika Holika", category: "Limpieza", price: 9990, payLink: "https://www.instagram.com/p/DJKv5qPP8FY/" },
  { id: "8809576261127", name: "Madagascar Centella Ampoule Foam 125ml", brand: "Skin1004", category: "Limpieza", price: 18990, payLink: "https://www.instagram.com/p/DLQYCNXv-Vm/" },
  { id: "8809759908290", name: "Clean it Zero Calming Cleansing Balm", brand: "Banila Co", category: "Limpieza", price: 20990, payLink: "https://www.instagram.com/p/DLQTM8fvWNN/" },
  { id: "8809560226378", name: "Clean It Zero Cleansing Balm Original", brand: "Banila CO", category: "Limpieza", price: 20990, payLink: "https://www.instagram.com/p/DLQTfCbvi4m/" },
  { id: "8809759908306", name: "Clean It Zero Balm Pore Clarifying", brand: "Banila CO", category: "Limpieza", price: 20990, payLink: "https://www.instagram.com/p/DLQTtVXPSm2/" },
  { id: "8809738315866", name: "Ginseng Cleansing Oil", brand: "Beauty of Joseon", category: "Limpieza", price: 22990, payLink: "https://www.instagram.com/p/DLQV2sMvWy3/" },
  { id: "8809738605677", name: "1025 Dokdo Aceite Limpiador Facial", brand: "Round Lab", category: "Limpieza", price: 25990, payLink: "https://www.instagram.com/p/DLQWByQPZTQ/" },
  { id: "8809576261110", name: "Madagascar Centella Light Cleansing Oil 200 ml", brand: "Skin1004", category: "Limpieza", price: 22990, payLink: "https://www.instagram.com/p/DLQXzxNPT8J/" },
  { id: "8809732911873", name: "Bean Cleansing Oil 195 Ml", brand: "Mixsoon", category: "Limpieza", price: 26990, payLink: "https://www.instagram.com/p/DLuyreqARJV/" },
  { id: "8809732913860", name: "Bean Cleansing Oil - 20ml", brand: "Mixsoon", category: "Limpieza", price: 5990, payLink: "https://www.instagram.com/p/DLuyreqARJV/" },

  // MASCARILLAS
  { id: "8809525246014", name: "Centella Asiatica Calming Mask", brand: "Beauty of Joseon", category: "Mascarilla", price: 2990, payLink: "https://www.instagram.com/p/DJSOS7pvPcT/" },
  { id: "8806334372132", name: "Fuerte Removedor Puntos Negros Kit 3-en-1", brand: "Holika Holika", category: "Mascarilla", price: 2990, payLink: "https://www.instagram.com/p/DJSd9aWP7I4/" },
  { id: "8809647392637", name: "Retinol Intense Reactivating Mask", brand: "Somebymi", category: "Mascarilla", price: 2990, payLink: "https://www.instagram.com/p/DJSP11ZvxGf/" },
  { id: "8809416470245", name: "Acne Pimple Master Patch", brand: "CosRX", category: "Mascarilla", price: 4890, payLink: "https://www.instagram.com/p/DJKWrxvPjr3/" },
  { id: "8806334368081", name: "Pure Essence Mask - Te Verde", brand: "Holika Holika", category: "Mascarilla", price: 1990, payLink: "https://www.instagram.com/p/DJSdMmuvJ2C/" },
  { id: "8806334368173", name: "Pure Essence Mask - Arroz", brand: "Holika Holika", category: "Mascarilla", price: 1990, payLink: "https://www.instagram.com/p/DJSdMmuvJ2C/" },
  { id: "8809416470726", name: "Ultimate Nourishing Rice Overnight Spa Mask", brand: "CosRX", category: "Mascarilla", price: 19990, payLink: "https://www.instagram.com/p/DJKXM8XvuGt/" },
  { id: "8809743541489", name: "1025 Dokdo Mascarilla Gel", brand: "Round lab", category: "Mascarilla", price: 2990, payLink: "https://www.instagram.com/p/DMn5blfP897/" },
  { id: "8809348503370", name: "Calming Lotus Sheet Mask", brand: "Rovectin", category: "Mascarilla", price: 2990, payLink: "https://www.instagram.com/p/DLQT-UhvSOn/" },
  { id: "8809624723102", name: "Mugwort Calming Mask", brand: "Round lab", category: "Mascarilla", price: 2990, payLink: "https://www.instagram.com/p/DLQUJ45Pa5k/" },
  { id: "8809624723089", name: "Soybean Nourishing Mask", brand: "Round lab", category: "Mascarilla", price: 2990, payLink: "https://www.instagram.com/p/DLQUXGmvmzD/" },
  { id: "8806334368111", name: "Pure Essence Mask Lemon", brand: "Holika Holika", category: "Mascarilla", price: 1990, payLink: "https://www.instagram.com/p/DMn5oZzPh-5/" },
  { id: "8809652580906", name: "No.2 Water Collagen 65% Voluming Mask", brand: "Numbuzin", category: "Mascarilla", price: 2990, payLink: "https://www.instagram.com/p/DMnlcUVACXh/" },

  // SERUM
  { id: "8809875906477", name: "Light On Serum : Centella + Vita C 30ml", brand: "Beauty of Joseon", category: "Serum", price: 16990, payLink: "https://www.instagram.com/p/DJW2kBGuOxS/" },
  { id: "8809576260601", name: "Madagascar Centella Ampoule 55ml", brand: "Skin1004", category: "Serum", price: 19990, payLink: "https://www.instagram.com/p/DJImGDLNvRO/" },
  { id: "8809576260663", name: "Madagascar Centella Ampoule 100ml", brand: "Skin1004", category: "Serum", price: 29990, payLink: "https://www.instagram.com/p/DJImGDLNvRO/" },
  { id: "8809738316412", name: "Calming Serum Green Tea + Panthenol", brand: "Beauty of Joseon", category: "Serum", price: 17990, payLink: "https://www.instagram.com/p/DJkXovgvtvz/" },
  { id: "8806334370435", name: "Aloe 99% Soothing Gel 250ml", brand: "Holika Holika", category: "Serum", price: 9990, payLink: "https://www.instagram.com/p/DJkaQWbvmM1/" },
  { id: "8809598451506", name: "Pure Fit Cica Serum", brand: "CosRX", category: "Serum", price: 27990, payLink: "https://www.instagram.com/p/DJ7_Rf-tikp/" },
  { id: "8809738316139", name: "Revive Serum Ginseng + Snail Mucin", brand: "Beauty of Joseon", category: "Serum", price: 18990, payLink: "https://www.instagram.com/p/DJ8AjGoNAao/" },
  { id: "8809546004181", name: "Collagen Ampule Stick", brand: "Scinic", category: "Serum", price: 19990, payLink: "https://www.instagram.com/p/DLGcofovMxu/" },
  { id: "8809546004204", name: "Hyaluronic Acid Ampoule Skin", brand: "Scinic", category: "Serum", price: 16900, payLink: "https://www.instagram.com/p/DKM5WYFNJpX/" },
  { id: "8809738313862", name: "Ginseng Essence Water 40ml", brand: "Beauty of Joseon", category: "Serum", price: 7250, payLink: "https://www.instagram.com/p/DMn52JkPbtx/" },
  { id: "8809863720016", name: "Vita B3 Source", brand: "Tiam", category: "Serum", price: 20990, payLink: "https://www.instagram.com/p/DLQWvtCv_to/" },
  { id: "8809576261462", name: "Madagascar Centella Poremizing Fresh Ampoule 100ml", brand: "Skin1004", category: "Serum", price: 27990, payLink: "https://www.instagram.com/p/DKGJCRwPHfC/" },
  { id: "8809913830115", name: "Madagascar Centella Poremizing Fresh Ampoule 50ml", brand: "Skin1004", category: "Serum", price: 19990, payLink: "https://www.instagram.com/p/DKGJCRwPHfC/" },
  { id: "8809576261875", name: "Madagascar Centella Poremizing Fresh Ampoule 30ml", brand: "Skin1004", category: "Serum", price: 12990, payLink: "https://www.instagram.com/p/DKGJCRwPHfC/" },
  { id: "8809913830627", name: "Madagascar Centella Tone Brightening Capsule Ampoule 50ml", brand: "Skin1004", category: "Serum", price: 19990, payLink: "https://www.instagram.com/p/DKX-XEHPdEK/" },
  { id: "8809732910159", name: "Bean Essence 50 ML", brand: "Mixsoon", category: "Serum", price: 34990, payLink: "https://www.instagram.com/p/DKShDAwPM2I/" },
  { id: "8806138403520", name: "Teatree CICA 80 Ampoule 30 ML", brand: "Thelavicos", category: "Serum", price: 18990, payLink: "https://www.instagram.com/p/DLuyRqPga3i/" },
  { id: "8809732911880", name: "Bean Essence 30 ML", brand: "Mixsoon", category: "Serum", price: 26990, payLink: "https://www.instagram.com/p/DKShDAwPM2I/" },
  { id: "8809416470009", name: "Advanced Snail 96 Mucin Power Essence 100 ML", brand: "CosRX", category: "Serum", price: 26990, payLink: "https://www.instagram.com/p/DLu0e0WAhhT/" },
  { id: "8803463007294", name: "100 Reedle Shot 2ml x 10ea", brand: "VT", category: "Serum", price: 14990, payLink: "https://www.instagram.com/p/DL7979DvXT_/" },
  { id: "8803463003685", name: "Pro Cica Reedle Shot 100 - 50ml", brand: "VT", category: "Serum", price: 46990, payLink: "https://www.instagram.com/p/DL76GNmv37P/" },
  { id: "8803463007249", name: "100 Reti-A Reedle Shot 2ml x 10ea", brand: "VT", category: "Serum", price: 14990, payLink: "https://www.instagram.com/p/DL76mZTvHV7/" },
  { id: "8809576261677", name: "Madagascar Centella Tea-Trica Relief Ampoule 100ml", brand: "Skin1004", category: "Serum", price: 28990, payLink: "https://www.instagram.com/p/DMDPU6oAXRB/" },
  { id: "8809576261882", name: "Madagascar Centella Tea-Trica Relief Ampoule 30ml", brand: "Skin1004", category: "Serum", price: 12990, payLink: "https://www.instagram.com/p/DMDPU6oAXRB/" },
  { id: "8803463007324", name: "100 Pro Cica Reedle Shot 2ml x 10ea", brand: "VT", category: "Serum", price: 14990, payLink: "https://www.instagram.com/p/DL8AEfCveQP/" },
  { id: "8803463007300", name: "300 Reedle Shot 2ml x 10ea", brand: "VT", category: "Serum", price: 13990, payLink: "https://www.instagram.com/p/DL77JMEP69C/" },
  { id: "8809598454644", name: "The Retinol 0.5 Oil 30ml", brand: "CosRX", category: "Serum", price: 29990, payLink: "https://www.instagram.com/p/DL8D9UQPMaH/" },
  { id: "8809640734526", name: "Niacinamide 10 TXA 4 Serum", brand: "Anua", category: "Serum", price: 31990, payLink: "https://www.instagram.com/p/DMDOAYjgTJr/" },
  { id: "8809576261417", name: "Madagascar Centella Tone Brightening Capsule Ampoule 30ml", brand: "Skin1004", category: "Serum", price: 13990, payLink: "https://www.instagram.com/p/DKX-XEHPdEK/" },
  { id: "8809576261172", name: "Madagascar Centella Tone Brightening Capsule Ampoule 100 ml", brand: "Skin1004", category: "Serum", price: 28990, payLink: "https://www.instagram.com/p/DKX-XEHPdEK/" },
  { id: "8809576260618", name: "Madagascar Centella Ampoule - 30ml", brand: "Skin1004", category: "Serum", price: 12990, payLink: "https://www.instagram.com/p/DJImGDLNvRO/" },

  // SERUM OJOS
  { id: "8809416472546", name: "Vita A Bakuchiol Firming Eye Cream 30ml", brand: "Tiam", category: "Contorno ojos", price: 15490, payLink: "https://www.instagram.com/p/DMnkLEdAV8M/" },
  { id: "8809738316146", name: "Revive Eye Serum : Ginseng+Retinal", brand: "Beauty of Joseon", category: "Contorno ojos", price: 20990, payLink: "https://www.instagram.com/p/DJzO_E-NL-0/" },
  { id: "8809728080330", name: "Propolis Vitamin Eye Cream", brand: "IUNIK", category: "Contorno ojos", price: 18990, payLink: "https://www.instagram.com/p/DJ0BUO7vMDc/" },
  { id: "8809835060157", name: "Collagen Brightening Eye Gel Cream 30ml", brand: "Tocobo", category: "Contorno ojos", price: 25990, payLink: "https://www.instagram.com/p/DLGdRGPPT3Y/" },

  // SHAMPOO
  { id: "8801046353523", name: "Tea Tree Oil Shampoo 1 Litro", brand: "Kerasys", category: "Shampoo", price: 17990, payLink: "https://www.instagram.com/p/DMn5_SWPNw2/" },
  { id: "8807779080033", name: "Ki Gold Premium Shampoo 500ml", brand: "Daeng Gi Meo Ri", category: "Shampoo", price: 15990, payLink: "https://www.instagram.com/p/DMn6NpgvCtP/" },

  // TINTA / LABIAL
  { id: "8809668023817", name: "Dear Darling Water Gel Tint - PK004 Red Bean", brand: "Etude House", category: "Tinta/labial", price: 7990, payLink: "https://www.instagram.com/p/DJSg1htvy9d/" },
  { id: "8809668023800", name: "Dear Darling Water Gel Tint - RD306 Shark Red", brand: "Etude House", category: "Tinta/labial", price: 7990, payLink: "https://www.instagram.com/p/DJSg1htvy9d/" },
  { id: "8809668023824", name: "Dear Darling Water Gel Tint - RD307 Watermelon", brand: "Etude House", category: "Tinta/labial", price: 7990, payLink: "https://www.instagram.com/p/DJSg1htvy9d/" },
  { id: "8809668023848", name: "Dear Darling Water Gel Tint - RD308 Strawberry", brand: "Etude House", category: "Tinta/labial", price: 7990, payLink: "https://www.instagram.com/p/DJSg1htvy9d/" },
  { id: "8809716942060", name: "Bloody Liar Coating Tint - 01 Soft Apricot", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/" },
  { id: "8809716942077", name: "Bloody Liar Coating Tint - 02 Sentimental Lychee", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/" },
  { id: "8809716942084", name: "Bloody Liar Coating Tint - 03 Clever Mangapple", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/" },
  { id: "8809716942091", name: "Bloody Liar Coating Tint - 04 Shy Peach", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/" },
  { id: "8809716942107", name: "Bloody Liar Coating Tint - 05 Talented Peach", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/" },
  { id: "8809716942114", name: "Bloody Liar Coating Tint - 06 Rosy Strawberry", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/" },
  { id: "8809716942138", name: "Bloody Liar Coating Tint - 08 Confident Tomato", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/" },
  { id: "8809716942459", name: "Mood Liar Velvet Tint - 01 Pure Apricot", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DJIp9WQtZAP/" },
  { id: "8809716942466", name: "Mood Liar Velvet Tint - 02 Unpretentious Lychee", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DJIp9WQtZAP/" },
  { id: "8809716942497", name: "Mood Liar Velvet Tint - 05 Immature Cherry", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DJIp9WQtZAP/" },
  { id: "8809716942503", name: "Mood Liar Velvet Tint - 06 Innocent Apple", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DJIp9WQtZAP/" },
  { id: "8809716942527", name: "Mood Liar Velvet Tint - 08 Mellow Soft persimmon", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DJIp9WQtZAP/" },
  { id: "8809716942534", name: "Mood Liar Velvet Tint - 09 Fatal Pomegranate", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DJIp9WQtZAP/" },
  { id: "8809716942541", name: "Mood Liar Velvet Tint - 10 Cynical Blueberry", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DJIp9WQtZAP/" },
  { id: "8809647770718", name: "Luv Hug velvet tint - 3 Share", brand: "Unleashia", category: "Tinta/labial", price: 11990, payLink: "https://www.instagram.com/p/DLQWgnpPLz7/" },
  { id: "8809647770701", name: "Luv Hug velvet tint - 2 Mingle", brand: "Unleashia", category: "Tinta/labial", price: 11990, payLink: "https://www.instagram.com/p/DLQWgnpPLz7/" },
  { id: "8809716944897", name: "Bloody Liar Coating Tint - 19 Calm Cherry", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DLQSdszvrU4/" },
  { id: "8809716942510", name: "Mood Liar Velvet Tint - 07 Calm Fig", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DJIp9WQtZAP/" },
  { id: "8809716942480", name: "Mood Liar Velvet Tint - 04 Elegant Wild Berry", brand: "Lilybyred", category: "Tinta/labial", price: 10990, payLink: "https://www.instagram.com/p/DJIp9WQtZAP/" },
  { id: "8809647770725", name: "Luv Hug velvet tint - 4 Join", brand: "Unleashia", category: "Tinta/labial", price: 11990, payLink: "https://www.instagram.com/p/DLQWgnpPLz7/" },
  { id: "8809647770732", name: "Luv Hug velvet tint - 5 Together", brand: "Unleashia", category: "Tinta/labial", price: 11990, payLink: "https://www.instagram.com/p/DLQWgnpPLz7/" },

  // TONER
  { id: "8809576261141", name: "Madagascar Centella Toning Toner", brand: "Skin1004", category: "Toner", price: 23990, payLink: "https://www.instagram.com/p/DJaD8QAvw-m/" },
  { id: "8809416470085", name: "Centella Water Alcohol-Free Toner 150ml", brand: "CosRX", category: "Toner", price: 15490, payLink: "https://www.instagram.com/p/DJanBf_tl5x/" },
  { id: "8809728080194", name: "Tea Tree Relief Toner", brand: "IUNIK", category: "Toner", price: 21990, payLink: "https://www.instagram.com/p/DJIsYkBtElw/" },
  { id: "8809863720030", name: "Vita B3 Mist Toner", brand: "Tiam", category: "Toner", price: 18990, payLink: "https://www.instagram.com/p/DI9uJzqvY6z/" },
  { id: "8806138403506", name: "Teatree CICA 80 Toner", brand: "Thelavicos", category: "Toner", price: 19490, payLink: "https://www.instagram.com/p/DKKxGb8PPD3/" }
];

const App = () => {
  const [view, setView] = useState('home'); 
  const [products] = useState(INITIAL_PRODUCTS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutLang, setAboutLang] = useState('es');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [view]);

  // Lógica para sacar la imagen de Instagram
  const getInstagramImg = (url) => {
    if (!url || !url.includes('instagram.com/p/')) {
      return "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600";
    }
    const cleanUrl = url.split('?')[0]; 
    const parts = cleanUrl.split('/');
    const code = parts[parts.indexOf('p') + 1];
    return `https://www.instagram.com/p/${code}/media/?size=l`;
  };

  const AnnouncementBar = () => (
    <div className="bg-gray-900 text-white text-[10px] md:text-xs py-2 text-center font-bold tracking-widest uppercase">
      ✨ 100% Original • Envíos a todo Chile • Tienda Física en Viña del Mar ✨
    </div>
  );

  const Navbar = () => (
    <nav className="sticky top-0 w-full bg-white z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-24">
          <div className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={20} className="text-gray-600 cursor-pointer" />
          </div>
          <div className="flex-shrink-0 cursor-pointer" onClick={() => setView('home')}>
            <span className="text-xl md:text-3xl font-serif font-black tracking-tighter text-gray-900">
              K-CARE<span className="text-pink-400">.</span>
            </span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => setView('home')} className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${view === 'home' ? 'text-pink-500' : 'text-gray-400 hover:text-gray-900'}`}>Inicio</button>
            <button onClick={() => setView('products')} className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${view === 'products' ? 'text-pink-500' : 'text-gray-400 hover:text-gray-900'}`}>Tienda</button>
            <button onClick={() => setView('about')} className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${view === 'about' ? 'text-pink-500' : 'text-gray-400 hover:text-gray-900'}`}>Nosotros</button>
            <button onClick={() => setView('contact')} className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${view === 'contact' ? 'text-pink-500' : 'text-gray-400 hover:text-gray-900'}`}>Contacto</button>
          </div>
          <div className="flex items-center space-x-4">
            <User size={20} className="text-gray-400 cursor-pointer hover:text-pink-500" onClick={() => setView('admin')} />
            <div className="relative cursor-pointer">
              <ShoppingBag size={20} className="text-gray-400" />
              <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{INITIAL_PRODUCTS.length}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const ProductCard = ({ p }) => (
    <div className="group bg-white rounded-none border border-transparent hover:border-gray-50 transition-all duration-300 p-2">
      <div className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden mb-4 shadow-sm border border-gray-100">
        <img 
          src={getInstagramImg(p.payLink)} 
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600";
            e.target.onerror = null;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          alt={p.name} 
        />
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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
      <p className="font-bold text-gray-900 text-base">${p.price.toLocaleString('es-CL')}</p>
    </div>
  );

  const Products = () => {
    const categories = ['Todas', 'Bloqueador', 'Crema', 'Limpieza', 'Serum', 'Tinta/labial', 'Toner', 'Exfoliante', 'Mascarilla', 'Shampoo'];
    
    const filteredProducts = useMemo(() => {
      return products.filter(p => {
        const matchesCategory = activeCategory === 'Todas' || p.category.includes(activeCategory);
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             p.brand.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }, [activeCategory, searchTerm]);

    return (
      <div className="animate-in fade-in duration-700 pt-28 pb-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tighter text-gray-900 mb-2 uppercase italic">Catálogo K-Care</h1>
              <p className="text-gray-400 text-sm italic">Explora nuestra colección completa de {INITIAL_PRODUCTS.length} productos originales.</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              <input 
                type="text" 
                placeholder="Busca por marca (Beauty of Joseon, CosRX...)" 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-full text-xs focus:ring-1 focus:ring-pink-200 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </header>

          <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-50 pb-8">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full border ${activeCategory === cat ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'text-gray-400 border-gray-100 hover:text-pink-400 hover:border-pink-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {filteredProducts.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-gray-400 italic">No pillamos nada con ese nombre, prueba buscando la marca.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const About = () => (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-serif italic tracking-tighter">Nosotros.</h1>
        <div className="flex bg-gray-50 p-1 rounded-full text-[10px] font-bold">
          <button onClick={() => setAboutLang('es')} className={`px-4 py-2 rounded-full ${aboutLang === 'es' ? 'bg-white shadow text-gray-900' : 'text-gray-400'}`}>ES</button>
          <button onClick={() => setAboutLang('en')} className={`px-4 py-2 rounded-full ${aboutLang === 'en' ? 'bg-white shadow text-gray-900' : 'text-gray-400'}`}>EN</button>
        </div>
      </div>
      <div className="space-y-8 text-gray-500 leading-relaxed font-light text-xl">
        <p><strong>K-Care Cosmetic</strong> es tu rincón de belleza coreana en el corazón de Viña del Mar (Outlet Park). Nos obsesiona la autenticidad: aquí no hay clones, solo lo mejor de Seúl.</p>
        <p>El K-beauty no es solo una rutina, es un momento para ti. Por eso elegimos marcas que realmente funcionan y respetan tu piel.</p>
        <div className="p-8 bg-pink-50 border-l-4 border-pink-200 italic font-serif text-2xl text-gray-800">
          "Traemos la innovación de Corea directamente a tu tocador en Chile."
        </div>
        <p className="text-base text-gray-400">Si quieres ver la lista completa con stock en tiempo real, puedes abrir nuestra planilla maestra.</p>
        <a 
          href="https://docs.google.com/spreadsheets/d/1usT649NsF9HND-TxhGfQKmYvuZM8RRQp/htmlview" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-pink-400 font-bold uppercase text-xs tracking-widest border-b-2 border-pink-100 pb-1 hover:text-pink-600 transition-colors"
        >
          Ver Google Sheets Original <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-pink-100">
      <AnnouncementBar />
      <Navbar />
      <main>
        {view === 'home' && (
          <div className="animate-in fade-in duration-700">
            <section className="h-[80vh] bg-[#fdfaf8] flex items-center px-4 overflow-hidden relative">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 w-full">
                <div className="z-10">
                  <span className="text-pink-400 font-bold text-[10px] uppercase tracking-[0.6em] mb-4 block">Glow like never before</span>
                  <h1 className="text-6xl md:text-9xl font-serif text-gray-900 leading-[0.85] mb-10 tracking-tighter">
                    Skin <br/><span className="italic text-pink-300">Secrets</span>.
                  </h1>
                  <button onClick={() => setView('products')} className="px-12 py-5 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-pink-500 transition-all flex items-center gap-6 shadow-2xl">
                    Ir a la Tienda <ArrowRight size={16} />
                  </button>
                </div>
                <div className="hidden md:flex justify-end relative">
                   <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-50 rounded-full blur-3xl opacity-50"></div>
                   <div className="w-full max-w-sm aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl border-[12px] border-white relative z-10">
                    <img src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="K-Beauty Model" />
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-32 max-w-7xl mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-serif italic tracking-tight mb-4">Favoritos K-Care</h2>
                <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Seleccionados por expertos</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {products.slice(0, 4).map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            </section>
          </div>
        )}
        {view === 'products' && <Products />}
        {view === 'about' && <About />}
        {view === 'contact' && (
          <div className="pt-40 px-4 max-w-2xl mx-auto text-center animate-in fade-in duration-700 pb-40">
            <h1 className="text-7xl font-serif italic mb-10 tracking-tighter">Hablemos.</h1>
            <p className="text-gray-400 text-xl mb-16 leading-relaxed">¿No sabes qué bloqueador elegir o quieres armar tu primera rutina? Estamos en Viña del Mar para asesorarte.</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a href="https://instagram.com/kcarecosmetic" className="px-10 py-6 border border-gray-100 rounded-none font-bold text-xs uppercase tracking-widest hover:bg-pink-50 transition-all">Instagram @kcarecosmetic</a>
              <div className="px-10 py-6 bg-gray-900 text-white font-bold text-xs uppercase tracking-widest">WhatsApp +56 9 1234 5678</div>
            </div>
          </div>
        )}
        {view === 'admin' && (
          <div className="pt-40 px-4 max-w-md mx-auto text-center font-bold pb-60">
            <Settings className="mx-auto mb-8 text-gray-200 animate-spin-slow" size={64} strokeWidth={1} />
            <h2 className="text-3xl font-serif italic mb-4">Acceso Admin</h2>
            <input type="password" placeholder="Passphrase" className="w-full p-4 bg-gray-50 border border-gray-100 text-center text-sm mb-4 outline-none focus:border-pink-200" />
            <button className="w-full py-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest">Entrar al Panel de Control</button>
          </div>
        )}
      </main>
      <footer className="bg-white py-32 border-t border-gray-50 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-4xl font-serif font-black tracking-tighter text-gray-900 uppercase">K-CARE<span className="text-pink-400">.</span></span>
          <p className="text-gray-300 text-[10px] mt-12 uppercase tracking-[0.6em] font-bold mb-10">Outlet Park Viña del Mar • Camino Internacional 2440</p>
          <div className="flex justify-center gap-10">
            <Instagram size={24} className="text-gray-200 hover:text-pink-400 cursor-pointer transition-colors" />
            <Facebook size={24} className="text-gray-200 hover:text-blue-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;