import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { CAT } from "../data";
import { formatPrice, cn } from "../lib/utils";
import { useStore } from "../store";
import { ProductCard } from "../components/ProductCard";
import { SizeChartModal } from "../components/SizeChartModal";

const GARMENT_SIZES = ['XS','S','M','L','XL','1X','2X','3X','Custom'] as const;
const CUSTOM_FIELDS: { key: string; label: string }[] = [
  { key: 'bust',          label: 'Bust (cm)' },
  { key: 'waist',         label: 'Waist (cm)' },
  { key: 'hip',           label: 'Hip (cm)' },
  { key: 'shoulder',      label: 'Shoulder (cm)' },
  { key: 'height',        label: 'Height (cm)' },
  { key: 'garmentLength', label: 'Preferred Garment Length' },
  { key: 'sleeveLength',  label: 'Sleeve Length' },
  { key: 'coverage',      label: 'Coverage Preference' },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = CAT.find(p => p.id === id);
  const { addToCart, wishlist, addToWishlist, removeFromWishlist, currency } = useStore();

  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [config, setConfig] = useState({
    color: product?.clrs[0]?.n || '',
    length: product?.len || '',
    sleeve: 'sleeveless',
    embColor: 'matched',
    embIntensity: 'light',
    embPlacement: 'neckline-hemline'
  });
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [customMeasurements, setCustomMeasurements] = useState<Record<string, string>>({});
  const [sizeError, setSizeError] = useState(false);

  // Fallback if not found
  if (!product) return <div className="p-20 text-center font-serif text-2xl">Product Not Found</div>;

  const currentImg = activeImg || product.i1;
  const isWishlisted = Boolean(wishlist.find(p => p.id === product.id));

  const basePrice = product.price;
  const lengthModifier = config.length === 'floor-length' ? 120 : 0;
  const sleeveModifier = config.sleeve === 'three-quarter' ? 60 : config.sleeve === 'long' ? 80 : 0;
  const embModifier = config.embIntensity === 'medium' ? 90 : config.embIntensity === 'heavy' ? 180 : 0;
  const placementModifier = config.embPlacement === 'sleeves' ? 60 : config.embPlacement === 'full-garment' ? 100 : 0;
  
  const finalPrice = basePrice + lengthModifier + sleeveModifier + embModifier + placementModifier;

  const toggleWishlist = () => {
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart({
      id: Math.random().toString(36).substring(7),
      product,
      config: {
        ...config,
        size: selectedSize,
        ...(selectedSize === 'Custom' ? { customMeasurements } : {}),
      }
    });
    alert("Added to bag!");
  };

  // Complete the look recommendations
  const recommended = useMemo(() => {
    return CAT.filter(p => p.id !== product.id && p.coll === product.coll).slice(0, 4);
  }, [product.id, product.coll]);

  return (
    <div className="bg-ivory relative">
      <div className="px-10 py-6 border-b border-stone flex justify-between items-center">
        <button className="text-[10px] tracking-widest uppercase text-mid hover:text-ink transition-colors" onClick={() => navigate(-1)}>← Back</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_500px] min-h-[calc(100vh-130px)]">
        {/* Gallery */}
        <div className="flex flex-col md:flex-row gap-4 p-8 bg-ivory sticky top-[75px] h-auto lg:h-[calc(100vh-75px)] overflow-hidden border-r border-stone">
          <div className="flex md:flex-col gap-3 w-full md:w-24 overflow-auto scrollbar-hide shrink-0">
             <button onClick={() => setActiveImg(product.i1)} className={cn("border shrink-0 aspect-[3/4] transition-all duration-300", currentImg === product.i1 ? "border-ink" : "border-stone bg-stone/20 hover:border-mid")}>
               <img src={product.i1} alt="Thumb 1" className="w-full h-full object-cover" />
             </button>
             <button onClick={() => setActiveImg(product.i2)} className={cn("border shrink-0 aspect-[3/4] transition-all duration-300", currentImg === product.i2 ? "border-ink" : "border-stone bg-stone/20 hover:border-mid")}>
               <img src={product.i2} alt="Thumb 2" className="w-full h-full object-cover" />
             </button>
          </div>
          <div className="flex-1 bg-white relative overflow-hidden border border-stone flex items-center justify-center">
             <img src={currentImg} alt={product.name} className="w-full h-full object-cover object-center" />
          </div>
        </div>

        {/* Details Panel */}
        <div className="p-10 md:p-12 bg-white overflow-y-auto">
           <div className="flex justify-between items-start mb-3">
             <div className="text-[10px] tracking-widest uppercase text-gold">{product.coll}</div>
             <button onClick={toggleWishlist} className={cn("text-2xl hover:scale-110 transition-transform", isWishlisted ? "text-gold" : "text-mid")}>
               {isWishlisted ? '♥' : '♡'}
             </button>
           </div>
           
           <h1 className="text-[clamp(32px,3vw,42px)] font-serif leading-tight mb-4 text-ink">{product.name}</h1>
           <div className="text-2xl font-serif text-charcoal mb-6 pb-6 border-b border-stone">{formatPrice(basePrice, currency)}</div>
           
           <p className="text-[14px] text-mid italic font-serif leading-relaxed mb-8">{product.desc} Every thread is purposefully woven to capture the essence of fleeting moments, an heirloom piece destined to be cherished.</p>
           
           {/* Editorial Sections */}
           <div className="flex flex-col gap-8 mb-10 border-t border-stone pt-8">
             <div>
               <h4 className="text-[10px] tracking-widest uppercase font-bold text-ink mb-2">The Story</h4>
               <p className="text-[13px] font-serif text-charcoal">{product.desc}</p>
             </div>
             
             <div className="grid grid-cols-2 gap-8">
               <div>
                 <h4 className="text-[10px] tracking-widest uppercase font-bold text-ink mb-2">Fabric & Details</h4>
                 <p className="text-[13px] font-serif text-charcoal capitalize">{product.emb} · {product.cfam} tone</p>
               </div>
               <div>
                 <h4 className="text-[10px] tracking-widest uppercase font-bold text-ink mb-2">Fit & Silhouette</h4>
                 <p className="text-[13px] font-serif text-charcoal capitalize">{product.sil} silhouette · {product.len} length</p>
               </div>
               <div>
                 <h4 className="text-[10px] tracking-widest uppercase font-bold text-ink mb-2">Styled For</h4>
                 <p className="text-[13px] font-serif text-charcoal">{product.contexts.join(', ')}</p>
               </div>
               <div>
                 <h4 className="text-[10px] tracking-widest uppercase font-bold text-ink mb-2">Stylist's Note</h4>
                 <p className="text-[13px] font-serif text-charcoal">Designed for considered occasion dressing with emphasis on silhouette, colour, and surface detail.</p>
               </div>
             </div>
             
             <div className="bg-cream border border-stone p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <h4 className="text-[10px] tracking-widest uppercase font-bold text-ink mb-2">Made-to-Order Timeline</h4>
                 <p className="text-[13px] font-serif text-charcoal">3–5 weeks.</p>
               </div>
               <div>
                 <h4 className="text-[10px] tracking-widest uppercase font-bold text-ink mb-2">Care Instructions</h4>
                 <p className="text-[13px] font-serif text-charcoal">Dry clean only. Store on a padded hanger. Avoid prolonged exposure to direct sunlight.</p>
               </div>
             </div>
           </div>

           {/* Size Selection */}
           <div className="mb-10 pt-6 border-t border-stone">
             <div className="flex justify-between items-center mb-5">
               <h3 className="text-[10px] uppercase tracking-widest font-bold text-ink">
                 Select Size
                 {selectedSize && selectedSize !== 'Custom' && (
                   <span className="text-gold ml-3 normal-case tracking-normal font-normal text-[11px] font-serif italic">
                     — {selectedSize}
                   </span>
                 )}
               </h3>
               <button
                 onClick={() => setShowSizeGuide(true)}
                 className="text-[10px] uppercase tracking-widest text-gold hover:text-ink underline underline-offset-4 transition-colors"
               >
                 Size Chart
               </button>
             </div>

             <div className="flex flex-wrap gap-2 mb-4">
               {GARMENT_SIZES.map(sz => (
                 <button
                   key={sz}
                   onClick={() => { setSelectedSize(sz); setSizeError(false); }}
                   className={cn(
                     "px-4 py-2.5 border text-[10px] uppercase tracking-[0.12em] transition-colors min-w-[52px] text-center",
                     selectedSize === sz
                       ? "bg-ink text-white border-ink"
                       : sz === 'Custom'
                         ? "bg-white text-gold border-gold hover:bg-gold/10"
                         : "bg-white text-ink border-stone hover:border-gold hover:text-gold"
                   )}
                 >
                   {sz}
                 </button>
               ))}
             </div>

             {sizeError && (
               <p className="text-[11px] font-serif italic border-l-2 border-gold pl-3 text-charcoal mb-4">
                 Please select a size before adding this item to your cart.
               </p>
             )}

             <div className="text-[11px] text-mid font-serif space-y-0.5 mb-2">
               <p>True to size</p>
               <p>Model is 178 cm / 5'10" and wearing size XS</p>
               <p>Customisation available for fit, length, and coverage</p>
             </div>

             {selectedSize === 'Custom' && (
               <div className="border border-stone p-6 bg-cream mt-5">
                 <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-1">
                   Custom Measurements
                 </h4>
                 <p className="text-[11px] font-serif italic text-mid mb-5">
                   Customisation is available for fit, length, and coverage. Please enter your measurements carefully.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                   {CUSTOM_FIELDS.map(f => (
                     <div key={f.key}>
                       <label className="block text-[9px] uppercase tracking-widest text-mid mb-1">{f.label}</label>
                       <input
                         type="text"
                         value={customMeasurements[f.key] || ''}
                         onChange={e => setCustomMeasurements(prev => ({ ...prev, [f.key]: e.target.value }))}
                         className="w-full border border-stone bg-white px-3 py-2 text-[12px] font-serif text-ink outline-none focus:border-ink transition-colors"
                       />
                     </div>
                   ))}
                 </div>
                 <div>
                   <label className="block text-[9px] uppercase tracking-widest text-mid mb-1">Additional Fit Notes</label>
                   <textarea
                     value={customMeasurements['notes'] || ''}
                     onChange={e => setCustomMeasurements(prev => ({ ...prev, notes: e.target.value }))}
                     rows={3}
                     className="w-full border border-stone bg-white px-3 py-2 text-[12px] font-serif text-ink outline-none focus:border-ink transition-colors resize-none"
                   />
                 </div>
               </div>
             )}
           </div>

           {/* Customisation block */}
           <div className="mb-10 pt-6 border-t border-stone">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-serif text-ink">Made-to-Order Details</h3>
             </div>
             
             {/* Base Color */}
             <div className="mb-8">
               <div className="flex justify-between text-[10px] tracking-widest uppercase mb-4 text-ink">
                 <span className="text-mid">Base Color</span><span className="text-gold">{config.color}</span>
               </div>
               <div className="flex gap-4">
                 {product.clrs.map(c => (
                    <button 
                      key={c.n}
                      onClick={() => setConfig(prev => ({...prev, color: c.n}))}
                      className={cn("w-10 h-10 rounded-full border transition-all duration-300", config.color === c.n ? "border-ink ring-1 ring-offset-2 ring-ink" : "border-stone hover:border-mid scale-90 opacity-70 hover:opacity-100 hover:scale-100")}
                      style={{backgroundColor: c.h}}
                    />
                 ))}
               </div>
             </div>

             {/* Length */}
             <div className="mb-8">
               <div className="flex justify-between text-[10px] tracking-widest uppercase mb-4 text-ink">
                 <span className="text-mid">Garment Length</span><span className="text-gold">{config.length}</span>
               </div>
               <div className="grid grid-cols-2 gap-2">
                 {['mini','knee-length','midi','floor-length'].map(l => {
                   const isAv = product.lens.includes(l) || l === 'floor-length';
                   return (
                     <button 
                       key={l}
                       onClick={() => isAv && setConfig(prev => ({...prev, length: l}))}
                       className={cn("px-4 py-3 border text-[10px] text-center transition-colors uppercase tracking-[0.1em]", 
                         !isAv && "opacity-30 pointer-events-none bg-stone/10",
                         config.length === l ? "bg-ink text-white border-ink" : "bg-white text-ink border-stone hover:border-gold hover:text-gold")}
                     >
                       {l.replace('-', ' ')}
                     </button>
                   );
                 })}
               </div>
             </div>

             {/* Sleeve */}
             <div className="mb-8">
               <div className="flex justify-between text-[10px] tracking-widest uppercase mb-4 text-ink">
                 <span className="text-mid">Sleeve Type</span><span className="text-gold">{config.sleeve.replace('-', ' ')}</span>
               </div>
               <div className="grid grid-cols-2 gap-2">
                 {['sleeveless','short','three-quarter','long'].map(s => (
                   <button 
                     key={s}
                     onClick={() => setConfig(prev => ({...prev, sleeve: s}))}
                     className={cn("px-4 py-3 border text-[10px] text-center transition-colors uppercase tracking-[0.1em]", 
                       config.sleeve === s ? "bg-ink text-white border-ink" : "bg-white text-ink border-stone hover:border-gold hover:text-gold")}
                   >
                     {s.replace('-', ' ')}
                   </button>
                 ))}
               </div>
             </div>

             {/* Embellishment Color */}
             <div className="mb-8">
               <div className="flex justify-between text-[10px] tracking-widest uppercase mb-4 text-ink">
                 <span className="text-mid">Embellishment Color</span><span className="text-gold">{config.embColor}</span>
               </div>
               <div className="grid grid-cols-3 gap-2">
                 {['matched','gold','silver'].map(ec => (
                   <button 
                     key={ec}
                     onClick={() => setConfig(prev => ({...prev, embColor: ec}))}
                     className={cn("px-4 py-3 border text-[10px] text-center transition-colors uppercase tracking-[0.1em]", 
                       config.embColor === ec ? "bg-ink text-white border-ink" : "bg-white text-ink border-stone hover:border-gold hover:text-gold")}
                   >
                     {ec}
                   </button>
                 ))}
               </div>
             </div>

             {/* Embellishment Intensity */}
             <div className="mb-8">
               <div className="flex justify-between text-[10px] tracking-widest uppercase mb-4 text-ink">
                 <span className="text-mid">Embellishment Intensity</span><span className="text-gold">{config.embIntensity}</span>
               </div>
               <div className="grid grid-cols-3 gap-2">
                 {['light','medium','heavy'].map(i => (
                   <button 
                     key={i}
                     onClick={() => setConfig(prev => ({...prev, embIntensity: i}))}
                     className={cn("px-4 py-3 border text-[10px] text-center transition-colors uppercase tracking-[0.1em]", 
                       config.embIntensity === i ? "bg-ink text-white border-ink" : "bg-white text-ink border-stone hover:border-gold hover:text-gold")}
                   >
                     {i}
                   </button>
                 ))}
               </div>
             </div>

             {/* Embellishment Placement */}
             <div className="mb-8">
               <div className="flex justify-between text-[10px] tracking-widest uppercase mb-4 text-ink">
                 <span className="text-mid">Placement Customization</span><span className="text-gold">{config.embPlacement.replace('-', ' ')}</span>
               </div>
               <div className="grid grid-cols-1 gap-2">
                 {['neckline-hemline','sleeves','full-garment'].map(p => (
                   <button 
                     key={p}
                     onClick={() => setConfig(prev => ({...prev, embPlacement: p}))}
                     className={cn("px-4 py-3 border text-[10px] text-center transition-colors uppercase tracking-[0.1em]", 
                       config.embPlacement === p ? "bg-ink text-white border-ink" : "bg-white text-ink border-stone hover:border-gold hover:text-gold")}
                   >
                     {p.replace('-', ' ')}
                   </button>
                 ))}
               </div>
             </div>
           </div>

           {/* Live Customization Summary */}
           <div className="bg-white border border-stone p-6 mb-6">
             <h3 className="text-[11px] uppercase tracking-[0.1em] font-bold text-ink mb-3">Your Made-to-Order Selection</h3>
             <p className="text-[14px] text-charcoal font-serif leading-relaxed mb-4">
               {selectedSize && <><span className="uppercase">{selectedSize}</span> · </>}
               <span className="capitalize">{config.color}</span> · <span className="capitalize">{config.length.replace('-', ' ')}</span> · <span className="capitalize">{config.sleeve.replace('-', ' ')}{config.sleeve === 'sleeveless' ? '' : ' Sleeve'}</span> · <span className="capitalize">{config.embColor}</span> Embellishment · <span className="capitalize">{config.embPlacement.replace('-', ' ')}</span>
             </p>
             <p className="text-[11px] text-mid italic font-serif">Final handcrafted detailing may vary slightly due to the artisanal nature of the garment.</p>
           </div>

           {/* Live Price Breakdown */}
           <div className="bg-cream border border-stone p-6 mb-8">
             <div className="flex justify-between text-[13px] font-serif text-charcoal mb-2 pb-2 border-b border-stone">
                <span>Base Price</span><span>{formatPrice(basePrice, currency)}</span>
             </div>
             <div className="flex justify-between text-[13px] font-serif text-charcoal mb-2 pb-2 border-b border-stone">
                <span>Length Modification</span><span>{lengthModifier > 0 ? "+" + formatPrice(lengthModifier, currency) : formatPrice(0, currency)}</span>
             </div>
             <div className="flex justify-between text-[13px] font-serif text-charcoal mb-2 pb-2 border-b border-stone">
                <span>Sleeve Modification</span><span>{sleeveModifier > 0 ? "+" + formatPrice(sleeveModifier, currency) : formatPrice(0, currency)}</span>
             </div>
             <div className="flex justify-between text-[13px] font-serif text-charcoal mb-2 pb-2 border-b border-stone">
                <span>Embellishment Upgrade</span><span>{embModifier > 0 ? "+" + formatPrice(embModifier, currency) : formatPrice(0, currency)}</span>
             </div>
             <div className="flex justify-between text-[13px] font-serif text-charcoal mb-2 pb-2 border-b border-stone">
                <span>Placement Customization</span><span>{placementModifier > 0 ? "+" + formatPrice(placementModifier, currency) : formatPrice(0, currency)}</span>
             </div>
             <div className="flex justify-between text-xl font-serif text-ink pt-3 mt-1">
                <span>Estimated Final Price</span><span>{formatPrice(finalPrice, currency)}</span>
             </div>
           </div>

           <button 
             className="w-full bg-ink text-white text-[11px] uppercase tracking-widest py-4 hover:bg-white hover:text-ink border border-ink transition-colors duration-300 mb-4" 
             onClick={handleAddToCart}
           >
             Add to Bag →
           </button>
           
           <div className="text-center mb-10 pt-6 border-b border-stone pb-10">
             <h4 className="text-[11px] uppercase tracking-widest text-ink font-bold mb-3">Made-to-Order Timeline</h4>
             <div className="text-[13px] text-charcoal italic font-serif leading-relaxed">
               Made-to-order timeline: 3–5 weeks. Final artisan details may vary slightly due to the handcrafted nature of the garment.
             </div>
           </div>

           {/* Expandable Accordions */}
           <div className="space-y-2">
             <details className="group">
               <summary className="text-[11px] uppercase tracking-widest cursor-pointer outline-none text-ink flex justify-between items-center bg-white p-4 border border-stone group-hover:border-mid transition-colors select-none">
                 <span>The Craft</span>
                 <span className="text-mid group-open:rotate-180 transition-transform">▼</span>
               </summary>
               <div className="p-5 bg-cream border border-t-0 border-stone text-[13px] text-charcoal leading-relaxed font-serif italic">
                 Intentionally created by skilled artisans. This piece requires over 40 hours of meticulous handwork. We use traditional embroidery loops to ensure each motif is secured perfectly into the foundational fabric.
               </div>
             </details>
             <details className="group">
               <summary className="text-[11px] uppercase tracking-widest cursor-pointer outline-none text-ink flex justify-between items-center bg-white p-4 border border-stone group-hover:border-mid transition-colors select-none">
                 <span>Fabric & Details</span>
                 <span className="text-mid group-open:rotate-180 transition-transform">▼</span>
               </summary>
               <div className="p-5 bg-cream border border-t-0 border-stone text-[13px] text-charcoal leading-relaxed font-serif italic">
                 Cut from 100% natural fibers, offering breathable luxury for extended wear. The lining is pure silk-cotton blend, sitting soft against the skin, while outer layers provide structure and liquid movement.
               </div>
             </details>
             <details className="group">
               <summary className="text-[11px] uppercase tracking-widest cursor-pointer outline-none text-ink flex justify-between items-center bg-white p-4 border border-stone group-hover:border-mid transition-colors select-none">
                 <span>Fit & Silhouette</span>
                 <span className="text-mid group-open:rotate-180 transition-transform">▼</span>
               </summary>
               <div className="p-5 bg-cream border border-t-0 border-stone text-[13px] text-charcoal leading-relaxed font-serif italic">
                 Designed to flatter the natural waistline before cascading delicately. The piece runs true to size. View our size guide for exact measurements suited to your form.
               </div>
             </details>
             <details className="group">
               <summary className="text-[11px] uppercase tracking-widest cursor-pointer outline-none text-ink flex justify-between items-center bg-white p-4 border border-stone group-hover:border-mid transition-colors select-none">
                 <span>Styled For</span>
                 <span className="text-mid group-open:rotate-180 transition-transform">▼</span>
               </summary>
               <div className="p-5 bg-cream border border-t-0 border-stone text-[13px] text-charcoal leading-relaxed font-serif italic">
                 Perfectly suited for {[...product.primary, ...product.secondary].map(occ => occ.replace('_', ' ')).join(', ')}. Keep accessories considered—let the garment govern the overall impact.
               </div>
             </details>
             <details className="group">
               <summary className="text-[11px] uppercase tracking-widest cursor-pointer outline-none text-ink flex justify-between items-center bg-white p-4 border border-stone group-hover:border-mid transition-colors select-none">
                 <span>Care Instructions</span>
                 <span className="text-mid group-open:rotate-180 transition-transform">▼</span>
               </summary>
               <div className="p-5 bg-cream border border-t-0 border-stone text-[13px] text-charcoal leading-relaxed font-serif italic">
                 Dry clean only. Store on a padded hanger. Avoid direct sunlight for prolonged periods. For embellished variants, keep in the provided breathable cotton garment bag.
               </div>
             </details>
           </div>
        </div>
      </div>

      {/* Complete the Look */}
      {recommended.length > 0 && (
        <div className="border-t border-stone bg-ivory py-20 px-10">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="text-center font-serif text-3xl italic text-ink mb-12">Complete the Look</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map(p => (
                 <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      <SizeChartModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </div>
  );
}
