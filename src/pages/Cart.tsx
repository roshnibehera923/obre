import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { formatPrice } from "../lib/utils";

export default function Cart() {
  const { cart: items, removeFromCart: removeItem, currency } = useStore();
  const navigate = useNavigate();

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

  if (items.length === 0) {
    return (
      <div className="py-32 px-10 text-center min-h-[60vh] bg-ivory">
        <h2 className="text-3xl font-serif italic text-mid mb-8">Your bag is currently empty.</h2>
        <Link to="/" className="inline-flex items-center justify-center text-[10px] uppercase tracking-widest px-8 py-3 bg-white text-ink border border-ink hover:bg-ink hover:text-white transition-colors duration-300">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-[80vh] py-16">
      <div className="max-w-[1200px] mx-auto px-10">
        <Link to="/" className="text-[10px] tracking-widest uppercase text-mid hover:text-ink block mb-8 transition-colors">← Continue Shopping</Link>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          <div className="bg-white p-10 border border-stone">
            <h1 className="text-3xl font-serif mb-8 pb-4 border-b border-stone text-ink">Your Bag</h1>
            {items.map(item => {
              const custCharge = getCustomizationCost(item.config);
              const finalPrice = item.product.price + custCharge;
              return (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 py-6 border-b border-stone last:border-0 last:pb-0">
                  <div className="w-[120px] aspect-[3/4] bg-cream shrink-0 border border-stone/50 p-1 cursor-pointer" onClick={() => navigate(`/product/${item.product.id}`)}>
                    <img src={item.product.i1} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif mb-2 text-ink cursor-pointer hover:text-gold transition-colors" onClick={() => navigate(`/product/${item.product.id}`)}>{item.product.name}</h3>
                    <div className="text-[10px] uppercase tracking-widest text-gold mb-4">{item.product.coll}</div>
                    
                    <div className="bg-cream p-4 border border-stone mb-4 relative">
                      <div className="absolute top-4 right-4">
                        <button onClick={() => navigate(`/product/${item.product.id}`)} className="text-[9px] uppercase tracking-widest text-ink hover:text-gold underline underline-offset-4 transition-colors">Edit</button>
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-mid mb-2 font-bold">Customization</div>
                      {item.config.size && (
                        <div className="text-[11px] font-serif text-ink mb-2">
                          Size: <span className="uppercase font-medium">{item.config.size}</span>
                          {item.config.size === 'Custom' && (
                            <span className="text-mid ml-2 italic">· Custom measurements provided</span>
                          )}
                        </div>
                      )}
                      <p className="text-[12px] text-charcoal font-serif leading-relaxed pr-16">
                        <span className="capitalize">{item.config.color || 'Standard'}</span> · <span className="capitalize">{item.config.length?.replace('-', ' ') || 'Standard'}</span> · <span className="capitalize">{item.config.sleeve?.replace('-', ' ') || 'Sleeveless'}</span> Sleeve · <span className="capitalize">{item.config.embColor || 'Matched'}</span> Embellishment · <span className="capitalize">{item.config.embPlacement?.replace('-', ' ') || 'Standard'}</span>
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 text-[12px] font-serif text-mid border-b border-stone pb-3 mb-3">
                      <div className="flex justify-between"><span>Base Price:</span><span>{formatPrice(item.product.price, currency)}</span></div>
                      <div className="flex justify-between"><span>Customization Charges:</span><span>{custCharge > 0 ? "+" + formatPrice(custCharge, currency) : formatPrice(0, currency)}</span></div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-lg font-serif text-ink">Final Item Price: {formatPrice(finalPrice, currency)}</div>
                      <button onClick={() => removeItem(item.id)} className="text-[10px] uppercase tracking-widest text-mid hover:text-ink border-b border-transparent hover:border-ink pb-0.5 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-cream p-10 border border-stone h-fit sticky top-[100px]">
            <h3 className="text-2xl font-serif mb-6 pb-4 border-b border-stone text-ink">Order Summary</h3>
            <div className="flex justify-between text-[13px] text-charcoal mb-3 font-serif">
              <span>Subtotal</span><span>{formatPrice(subtotal, currency)}</span>
            </div>
            {customizationTotal > 0 && (
              <div className="flex justify-between text-[13px] text-charcoal mb-3 font-serif">
                <span>Customization Charges</span><span>{formatPrice(customizationTotal, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-[13px] text-charcoal mb-3 font-serif">
              <span>Shipping</span><span>Complimentary</span>
            </div>
            <div className="flex justify-between text-[13px] text-charcoal mb-3 font-serif">
              <span>Taxes & Duties</span><span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-2xl font-serif text-ink mt-6 pt-6 border-t border-stone mb-8">
              <span>Estimated Total</span><span>{formatPrice(estimatedTotal, currency)}</span>
            </div>
            <Link to="/checkout" className="block text-center w-full bg-ink text-white text-[11px] uppercase tracking-widest py-4 hover:bg-white hover:text-ink border border-ink transition-colors duration-300">
              Proceed to Checkout →
            </Link>
            <div className="text-[10px] uppercase tracking-widest text-mid text-center mt-6">
              Global shipping included on all orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
