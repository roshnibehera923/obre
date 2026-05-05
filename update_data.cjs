const fs = require('fs');
const content = fs.readFileSync('src/data.ts', 'utf8');

// Use regex to locate CAT array
const catMatch = content.match(/export const CAT: Product\[\] = (\[[\s\S]*?\]);\n\nexport interface Occasion/);
if (!catMatch) {
  console.log("Could not find CAT array.");
  process.exit(1);
}

let catArrayStr = catMatch[1];
// Using eval is safe here since it's our own known source
let catData;
try {
  catData = eval(`(${catArrayStr})`);
} catch(e) {
  console.log(e);
  process.exit(1);
}

const resolveOccasion = (p) => {
  const pri = new Set(p.primary);
  const sec = new Set(p.secondary);
  const contexts = new Set(p.contexts || []);
  
  // Floor-length gowns, dark tones, heavy embellishment -> Evening Gala
  if (p.len.includes('floor') && (p.eint === 'heavy' || p.eint === 'all-over' || p.cfam === 'jewel')) {
    pri.add('evening_gala');
  }
  
  // Midi dresses, pastel tones -> Wedding Guest
  if (p.len === 'midi' && p.cfam === 'pastel') {
    pri.add('wedding_guest');
  }
  
  // Mini, bold/metallic -> Cocktail
  if (p.len === 'mini' && (p.cfam === 'vibrant' || p.cfam === 'jewel')) {
    pri.add('cocktail_party');
    contexts.add('Playful');
  }
  
  // Embroidered, festive -> Festive
  if (p.emb.toLowerCase().includes('embroid') && p.cfam === 'jewel') {
    pri.add('festive');
  }
  
  // Lightweight, floral/print, resort -> Resort
  if (p.coll.toLowerCase().includes('resort') || p.emb.toLowerCase().includes('print')) {
    pri.add('resort');
    contexts.add('Outdoor');
  }
  
  // Jackets, trousers, structured -> Corporate
  if (p.type === 'jacket' || p.type === 'bottom' || p.sil.includes('column') || p.sil.includes('structured')) {
    pri.add('corporate');
    contexts.add('Minimal');
  }

  // Ensure default fields
  p.primary = Array.from(pri).map(x => x.replace(' ', '_'));
  p.secondary = Array.from(sec).map(x => x.replace(' ', '_'));
  p.contexts = Array.from(contexts);
  p.fabric = p.fabric || "Silk Charmeuse and Tulle";
  p.season = p.season || p.coll.split(" ")[0] || "All Year";
  p.searchKeywords = [p.type, p.len, p.color, p.cfam, p.sil].map(x => x?.toLowerCase());
  p.recommendationKeywords = [p.emb, p.eint, ...p.primary];
  return p;
};

catData = catData.map(resolveOccasion);

// Add 14 new products
const newProducts = [
  {
    id: "H02", name: "Santorini Cut-Out Midi Dress", coll: "High Summer 26", type: "dress", color: "Cerulean Blue", cfam: "jewel", chex: "#007BA7", len: "midi", sil: "cut-out fit-and-flare", emb: "Pleated", eint: "light", form: 2, price: 1050, desc: "A breezy, vividly hued midi dress perfect for coastal sunsets.", guide: "Style with gold accessories and flat sandals to elevate your destination wardrobe.", slug: "santorini-cut-out-midi-dress",
    i1: "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png?v=1759478060&width=900", i2: "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png?v=1759478060&width=900", clrs: [{n:"Cerulean Blue",h:"#007BA7"}], lens: ["midi"], slvs: ["sleeveless"], eclrs: [], plcs: [], contexts: ["Day", "Outdoor", "Beach", "Destination", "Playful"]
  },
  {
    id: "H03", name: "Capri Lemon Linen Co-Ord", coll: "High Summer 26", type: "co-ord", color: "Lemon Yellow", cfam: "vibrant", chex: "#FDFD96", len: "knee-length", sil: "relaxed tailored", emb: "None", eint: "none", form: 2, price: 890, desc: "Effortless linen two-piece tailored to offer a relaxed yet structured fit.", guide: "Great for leisurely yacht trips or European brunches.", slug: "capri-lemon-linen-coord",
    i1: "https://belafuori.com/cdn/shop/files/LFP140PPS1.png?v=1769704288&width=800", i2: "https://belafuori.com/cdn/shop/files/LFP140PPS_2_1.png", clrs: [{n:"Lemon Yellow",h:"#FDFD96"}], lens: [], slvs: ["short sleeve"], eclrs: [], plcs: [],  contexts: ["Day", "Outdoor", "Resort", "Minimal"]
  },
  {
    id: "H04", name: "Ibiza Beaded Fringed Mini", coll: "High Summer 26", type: "mini dress", color: "Silver Metallic", cfam: "metallic", chex: "#C0C0C0", len: "mini", sil: "fitted", emb: "Beads and Fringe", eint: "heavy", form: 3, price: 1600, desc: "An alluring fringed mini dripping with hand-applied beadwork.", guide: "Pair with dramatic metallic heels and dance the night away.", slug: "ibiza-beaded-fringed-mini",
    i1: "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png", i2: "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png", clrs: [{n:"Silver Metallic",h:"#C0C0C0"}], lens: ["mini"], slvs: ["sleeveless"], eclrs: [{n:"Silver",h:"#C0C0C0"}], plcs: ["full garment"], contexts: ["Night", "Indoor", "Statement", "Playful", "Bold"]
  },
  {
    id: "F04", name: "Velvet Tuxedo Jacket", coll: "Fall 25", type: "jacket", color: "Burgundy", cfam: "jewel", chex: "#800020", len: "standard", sil: "tailored", emb: "None", eint: "none", form: 4, price: 1250, desc: "A perfectly tailored velvet tuxedo jacket for uncompromising corporate style.", guide: "Layer over a silk camisole or a crisp white shirt.", slug: "velvet-tuxedo-jacket",
    i1: "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg", i2: "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg", clrs: [{n:"Burgundy",h:"#800020"}], lens: ["standard"], slvs: ["long"], eclrs: [], plcs: [], contexts: ["Night", "Indoor", "Formal Venue", "Minimal", "Elegant"]
  },
  {
    id: "F05", name: "Cashmere Blend Top", coll: "Fall 25", type: "top", color: "Oatmeal", cfam: "neutral", chex: "#E3dac9", len: "standard", sil: "relaxed", emb: "Knit Details", eint: "light", form: 2, price: 540, desc: "A cozy, exceptionally soft cashmere blend top.", guide: "Perfect for layering under structural jackets.", slug: "cashmere-blend-top",
    i1: "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg", i2: "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg", clrs: [{n:"Oatmeal",h:"#E3dac9"}], lens: ["standard"], slvs: ["long"], eclrs: [], plcs: [], contexts: ["Day", "Indoor", "Minimal"]
  },
  {
    id: "F06", name: "Satin Midi Skirt", coll: "Fall 25", type: "bottom", color: "Champagne", cfam: "pastel", chex: "#F7E7CE", len: "midi", sil: "A-line", emb: "None", eint: "none", form: 3, price: 620, desc: "Fluid, high-shine satin skirt cut on the bias.", guide: "Pairs beautifully with chunky knits or sheer blouses.", slug: "satin-midi-skirt",
    i1: "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png", i2: "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png", clrs: [{n:"Champagne",h:"#F7E7CE"}], lens: ["midi"], slvs: [], eclrs: [], plcs: [], contexts: ["Day", "Night", "Indoor", "Romantic"]
  },
  {
    id: "F07", name: "Emerald Sequin Blouse", coll: "Fall 25", type: "top", color: "Emerald Green", cfam: "jewel", chex: "#50C878", len: "standard", sil: "draped", emb: "Sequins", eint: "heavy", form: 4, price: 880, desc: "A high-octane sequin blouse that catches every light.", guide: "Best worn with tailored black trousers to anchor its sparkle.", slug: "emerald-sequin-blouse",
    i1: "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png", i2: "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png", clrs: [{n:"Emerald Green",h:"#50C878"}], lens: ["standard"], slvs: ["long"], eclrs: [{n:"Green",h:"#50C878"}], plcs: ["full garment"], contexts: ["Night", "Indoor", "Festive", "Statement"]
  },
  {
    id: "F08", name: "Gilded Onyx Boucle Jacket", coll: "Fall 25", type: "jacket", color: "Onyx Black", cfam: "neutral", chex: "#0F0F0F", len: "standard", sil: "box", emb: "Gold Threading", eint: "medium", form: 4, price: 1450, desc: "Classic boxy boucle jacket enriched with gold threading.", guide: "A timeless heritage piece. Throw over anything to immediately formalize your look.", slug: "gilded-onyx-boucle-jacket",
    i1: "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg", i2: "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg", clrs: [{n:"Onyx",h:"#0F0F0F"}], lens: ["standard"], slvs: ["long"], eclrs: [{n:"Gold",h:"#C9A84C"}], plcs: ["full garment"], contexts: ["Day", "Night", "Corporate", "Elegant"]
  },
  {
    id: "R11", name: "Ivory Wide Leg Trouser", coll: "Resort 26", type: "bottom", color: "Ivory", cfam: "neutral", chex: "#FFFFF0", len: "floor-length", sil: "wide-leg", emb: "None", eint: "none", form: 3, price: 650, desc: "Flowing wide-leg trousers that drape sublimely.", guide: "An essential resort basic. Wear with fitted tops to balance the volume.", slug: "ivory-wide-leg-trouser",
    i1: "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png", i2: "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png", clrs: [{n:"Ivory",h:"#FFFFF0"}], lens: ["floor-length"], slvs: [], eclrs: [], plcs: [], contexts: ["Day", "Outdoor", "Resort", "Minimal"]
  },
  {
    id: "R12", name: "Silk Charmeuse Camisole", coll: "Resort 26", type: "top", color: "Pearl", cfam: "neutral", chex: "#EAE0C8", len: "standard", sil: "bias cut", emb: "None", eint: "none", form: 3, price: 420, desc: "A luminous silk camisole designed for effortless layering.", guide: "The foundational piece for sheer overlays or strong jackets.", slug: "silk-charmeuse-camisole",
    i1: "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg", i2: "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg", clrs: [{n:"Pearl",h:"#EAE0C8"}], lens: ["standard"], slvs: ["sleeveless"], eclrs: [], plcs: [], contexts: ["Day", "Night", "Indoor", "Minimal"]
  },
  {
    id: "B02", name: "The Signature Silk Slip Dress", coll: "Bestseller", type: "dress", color: "Midnight Blue", cfam: "jewel", chex: "#191970", len: "midi", sil: "slip", emb: "None", eint: "none", form: 3, price: 850, desc: "The piece that started it all. Our signature flawless slip dress.", guide: "Requires zero effort. Add a bold lip, a delicate earring, and go.", slug: "signature-silk-slip-dress",
    i1: "https://belafuori.com/cdn/shop/files/ROYALAZUREmiragedress_1.png", i2: "https://belafuori.com/cdn/shop/files/ROYALAZUREmiragedress_2.png", clrs: [{n:"Midnight Blue",h:"#191970"}], lens: ["midi"], slvs: ["sleeveless"], eclrs: [], plcs: [], contexts: ["Night", "Indoor", "Outdoor", "Romantic", "Minimal"]
  },
  {
    id: "B03", name: "Rose Quartz Wrap Midi", coll: "Bestseller", type: "dress", color: "Rose Quartz", cfam: "pastel", chex: "#F7CAC9", len: "midi", sil: "wrap", emb: "Ruffles", eint: "light", form: 3, price: 1100, desc: "A universally flattering wrap silhouette trimmed with delicate soft ruffles.", guide: "The ultimate wedding guest dress. Soft, feminine, and enduringly elegant.", slug: "rose-quartz-wrap-midi",
    i1: "https://belafuori.com/cdn/shop/files/BlushLilyEmbroideredDress_6.png", i2: "https://belafuori.com/cdn/shop/files/BlushLilyEmbroideredDress_4.png", clrs: [{n:"Rose Quartz",h:"#F7CAC9"}], lens: ["midi"], slvs: ["short sleeve"], eclrs: [], plcs: [], contexts: ["Day", "Outdoor", "Romantic"]
  },
  {
    id: "S09", name: "Azure Silk Wrap Gown", coll: "Spring 26", type: "gown", color: "Azure Blue", cfam: "vibrant", chex: "#007FFF", len: "floor-length", sil: "wrap", emb: "Hand-painted", eint: "light", form: 4, price: 1950, desc: "A vibrant azure gown defined by a wrap waist and hand-painted floral motifs.", guide: "Vivid and commanding. Perfect for outdoor destination weddings.", slug: "azure-silk-wrap-gown",
    i1: "https://belafuori.com/cdn/shop/files/LF617GKG_MODEL_02.png", i2: "https://belafuori.com/cdn/shop/files/LF617GKG_LOOK17_GGhostfront_1.jpg", clrs: [{n:"Azure Blue",h:"#007FFF"}], lens: ["floor-length"], slvs: ["sleeveless"], eclrs: [], plcs: [], contexts: ["Day", "Outdoor", "Destination", "Bold"]
  },
  {
    id: "S10", name: "Monochrome Lace Midi", coll: "Spring 26", type: "dress", color: "Black and White", cfam: "neutral", chex: "#000000", len: "midi", sil: "fitted", emb: "Lace", eint: "heavy", form: 4, price: 1350, desc: "Precision-cut lace overlay over an ivory slip. Strikingly graphic.", guide: "Sophisticated impact suitable for corporate events or formal cocktail hours.", slug: "monochrome-lace-midi",
    i1: "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png", i2: "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png", clrs: [{n:"Black",h:"#000000"}], lens: ["midi"], slvs: ["short sleeve"], eclrs: [], plcs: ["full garment"], contexts: ["Night", "Indoor", "Corporate", "Statement"]
  }
];

// Add and process new products
const finalData = [...catData, ...newProducts.map(p => {
  p.primary = p.primary || [];
  p.secondary = p.secondary || [];
  p.contexts = p.contexts || [];
  return resolveOccasion(p);
})];

const newOutput = content.replace(/export const CAT: Product\[\] = \[[\s\S]*?\];\n/, 'export const CAT: Product[] = ' + JSON.stringify(finalData, null, 2) + ';\n');

fs.writeFileSync('src/data.ts', newOutput);
console.log("Updated data.ts");
