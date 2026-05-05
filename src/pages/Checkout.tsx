import { Link } from "react-router-dom";
import { useStore } from "../store";
import { formatPrice } from "../lib/utils";

export default function Checkout() {
  const orderRef = "LF-" + Date.now().toString().slice(-6);
  const { cart: items, currency } = useStore();

  const getCustomizationCost = (config: any) => {
    let cost = 0;
    if (config.length === 'floor-length') cost += 120;
    if (config.sleeve === 'three-quarter') cost += 60;
    if (config.sleeve === 'long') cost += 80;
    if (config.embIntensity === 'medium') cost += 90;
    if (config.embIntensity === 'heavy') cost += 180;
    if (config.embPlacement === 'sleeves') cost += 60;
    if (config.embPlacement === 'full-garment') cost += 100;
    return cost;
  };

  const subtotal = items.reduce((acc, item) => acc + item.product.price, 0);
  const customizationTotal = items.reduce((acc, item) => acc + getCustomizationCost(item.config), 0);
  const estimatedTotal = subtotal + customizationTotal;

  return (
    <div className="bg-ivory min-h-screen py-20 px-10 border-t border-stone">
      <div className="max-w-[800px] mx-auto bg-white p-16 pt-20 border border-stone">
        <div className="flex justify-between items-end border-b border-stone pb-8 mb-10">
          <h1 className="font-serif text-4xl font-light uppercase tracking-[0.25em] text-ink">Là Fuori</h1>
          <div className="text-right">
             <div className="text-[10px] uppercase tracking-widest text-mid mb-2">Order Confirmed</div>
             <div className="font-serif text-2xl text-ink">{orderRef}</div>
          </div>
        </div>

        <div className="bg-cream border border-stone p-10 mb-10 flex gap-6 items-center">
          <div className="text-3xl text-gold">✦</div>
          <div>
            <h2 className="text-2xl font-serif mb-2 text-ink">Your specification is complete.</h2>
            <div className="text-[11px] uppercase tracking-widest text-mid">This document has been securely sent to our artisans.</div>
          </div>
        </div>

        {items.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-serif mb-6 border-b border-stone pb-2 text-ink">Order Items</h3>
            <div className="space-y-6">
              {items.map((item, idx) => {
                 const custCost = getCustomizationCost(item.config);
                 return (
                   <div key={idx} className="border border-stone p-6 bg-cream">
                     <div className="flex justify-between items-start mb-4">
                       <div>
                         <div className="font-serif text-lg text-ink">{item.product.name}</div>
                         <div className="text-[10px] uppercase tracking-widest text-gold mt-1">{item.product.coll} Collection</div>
                       </div>
                       <div className="text-right">
                         <div className="font-serif text-charcoal">{formatPrice(item.product.price + custCost, currency)}</div>
                       </div>
                     </div>
                     <div className="bg-white p-4 border border-stone mb-4">
                        <div className="text-[10px] uppercase tracking-widest text-mid mb-2 font-bold">Selected Customization</div>
                        {item.config.size && (
                          <div className="text-[11px] font-serif text-ink mb-2">
                            Size: <span className="uppercase font-medium">{item.config.size}</span>
                            {item.config.size === 'Custom' && (
                              <span className="text-mid ml-2 italic">· Custom measurements provided</span>
                            )}
                          </div>
                        )}
                        <p className="text-[12px] text-charcoal font-serif leading-relaxed">
                          <span className="capitalize">{item.config.color || 'Standard'}</span> · <span className="capitalize">{item.config.length?.replace('-', ' ') || 'Standard'}</span> · <span className="capitalize">{item.config.sleeve?.replace('-', ' ') || 'Sleeveless'}</span> Sleeve · <span className="capitalize">{item.config.embColor || 'Matched'}</span> Embellishment · <span className="capitalize">{item.config.embPlacement?.replace('-', ' ') || 'Standard'}</span>
                        </p>
                     </div>
                     <div className="flex flex-col gap-1 text-[12px] font-serif text-mid pt-2 border-t border-stone">
                        <div className="flex justify-between">
                           <span>Base Price:</span>
                           <span>{formatPrice(item.product.price, currency)}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Customization Charge:</span>
                           <span>{custCost > 0 ? "+" + formatPrice(custCost, currency) : formatPrice(0, currency)}</span>
                        </div>
                        <div className="flex justify-between text-ink mt-2 font-bold">
                           <span>Final Price:</span>
                           <span>{formatPrice(item.product.price + custCost, currency)}</span>
                        </div>
                     </div>
                   </div>
                 );
              })}
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-serif mb-6 border-b border-stone pb-2 text-ink">Order Summary</h3>
            <div className="bg-cream border border-stone p-6">
              <div className="flex justify-between text-[13px] text-charcoal mb-3 font-serif">
                <span>Subtotal</span><span>{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between text-[13px] text-charcoal mb-3 font-serif">
                <span>Customization Charges</span><span>{formatPrice(customizationTotal, currency)}</span>
              </div>
              <div className="flex justify-between text-[13px] text-charcoal mb-3 font-serif">
                <span>Shipping</span><span>Complimentary</span>
              </div>
              <div className="flex justify-between text-[13px] text-charcoal mb-4 font-serif">
                <span>Taxes & Duties</span><span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-xl font-serif text-ink mt-4 pt-4 border-t border-stone">
                <span>Estimated Total</span><span>{formatPrice(estimatedTotal, currency)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12 pt-12 border-t border-stone">
           <p className="text-[12px] text-charcoal italic font-serif leading-relaxed mb-10">
             Made-to-order timeline: 3–5 weeks. Final delivery timeline may vary depending on embroidery and customization complexity.
           </p>
           <Link to="/" className="inline-flex items-center justify-center text-[10px] tracking-widest uppercase px-8 py-3 bg-white text-ink border border-ink hover:bg-ink hover:text-white transition-colors duration-300 shadow-sm">
             Return to Homepage
           </Link>
        </div>
      </div>
    </div>
  );
}
