export interface Color {
  n: string;
  h: string;
}

export interface Product {
  id: string;
  name: string;
  coll: string;
  type: string;
  color: string;
  cfam: string;
  chex: string;
  len: string;
  sil: string;
  emb: string;
  eint: string;
  form: number;
  primary: string[];
  secondary: string[];
  price: number;
  desc: string;
  guide: string;
  slug: string;
  i1: string;
  i2: string;
  clrs: Color[];
  lens: string[];
  slvs: string[];
  eclrs: Color[];
  plcs: string[];
  // Added for advanced context filtering
  contexts: string[];
  fabric?: string;
  season?: string;
  searchKeywords?: string[];
  recommendationKeywords?: string[];
}

export const CAT: Product[] = [
  {
    "id": "S01",
    "name": "Sunrise Lily Field Dress",
    "coll": "Spring 26",
    "type": "dress",
    "color": "Multicolour",
    "cfam": "vibrant",
    "chex": "#D4875A",
    "len": "floor-length",
    "sil": "elongated straps",
    "emb": "Lily Embroidery",
    "eint": "heavy",
    "form": 5,
    "primary": [
      "wedding_guest",
      "evening_gala"
    ],
    "secondary": [
      "resort"
    ],
    "price": 1846,
    "desc": "Full-length lily-inspired embroidery in warm sunrise tones across a softly shimmering base.",
    "guide": "The elongated silhouette and delicate straps make this a destination-wedding masterpiece. Wear it swept up — the back carries as much beauty as the front.",
    "slug": "sunrise-lily-field-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFR1483SGO_MODEL_01.png?v=1759672501&width=900",
    "i2": "https://belafuori.com/cdn/shop/files/LFR1483SGO_MODEL_05.png?v=1759672501&width=900",
    "clrs": [
      {
        "n": "Multicolour",
        "h": "#D4875A"
      },
      {
        "n": "Ivory",
        "h": "#F5F0E0"
      }
    ],
    "lens": [
      "midi",
      "floor-length"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Copper",
        "h": "#B87333"
      }
    ],
    "plcs": [
      "neckline",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Day",
      "Outdoor",
      "Destination",
      "Romantic"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Spring",
    "searchKeywords": [
      "dress",
      "floor-length",
      "multicolour",
      "vibrant",
      "elongated straps"
    ],
    "recommendationKeywords": [
      "Lily Embroidery",
      "heavy",
      "wedding_guest",
      "evening_gala"
    ]
  },
  {
    "id": "S02",
    "name": "Sunrise Lily Field Mini Dress",
    "coll": "Spring 26",
    "type": "mini dress",
    "color": "Multicolour",
    "cfam": "vibrant",
    "chex": "#D4875A",
    "len": "mini",
    "sil": "body-skimming",
    "emb": "Lily Embroidery",
    "eint": "medium",
    "form": 3,
    "primary": [
      "cocktail_party",
      "festive"
    ],
    "secondary": [
      "resort"
    ],
    "price": 988,
    "desc": "Lively lily-inspired embroidery in warm sunrise hues over a subtly shimmering base.",
    "guide": "Youthful and vibrant. Pair with strappy gold heels and keep accessories minimal — the embroidery does the talking at any cocktail soirée.",
    "slug": "sunrise-lily-field-mini-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png?v=1759478060&width=900",
    "i2": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png?v=1759478060&width=900",
    "clrs": [
      {
        "n": "Multicolour",
        "h": "#D4875A"
      },
      {
        "n": "Gold",
        "h": "#C9A84C"
      }
    ],
    "lens": [
      "mini",
      "knee-length"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Bronze",
        "h": "#8B6914"
      }
    ],
    "plcs": [
      "neckline",
      "hemline"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Statement",
      "Playful"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Spring",
    "searchKeywords": [
      "mini dress",
      "mini",
      "multicolour",
      "vibrant",
      "body-skimming"
    ],
    "recommendationKeywords": [
      "Lily Embroidery",
      "medium",
      "cocktail_party",
      "festive"
    ]
  },
  {
    "id": "S03",
    "name": "Blush Lily Embroidered Dress",
    "coll": "Spring 26",
    "type": "dress",
    "color": "Blush Pink",
    "cfam": "pastel",
    "chex": "#F1C2C8",
    "len": "midi",
    "sil": "refined silhouette",
    "emb": "Lily Embroidery",
    "eint": "medium",
    "form": 4,
    "primary": [
      "wedding_guest",
      "festive"
    ],
    "secondary": [
      "resort"
    ],
    "price": 1248,
    "desc": "Delicate lily embroidery in gentle blush tones layered over a refined, feminine silhouette.",
    "guide": "Summer garden celebrations call for this blush midi. Pearl earrings, ivory heels — let the delicate embroidery be your story.",
    "slug": "blush-lily-embroidered-dress",
    "i1": "https://belafuori.com/cdn/shop/files/BlushLilyEmbroideredDress_6.png?v=1770279611&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/BlushLilyEmbroideredDress_4.png?v=1770279611&width=800",
    "clrs": [
      {
        "n": "Blush Pink",
        "h": "#F1C2C8"
      },
      {
        "n": "Ivory",
        "h": "#F5F0E0"
      },
      {
        "n": "Soft Sage",
        "h": "#A8C5A0"
      }
    ],
    "lens": [
      "knee-length",
      "midi",
      "floor-length"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve"
    ],
    "eclrs": [
      {
        "n": "Blush Pink",
        "h": "#E8B4B8"
      },
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Ivory",
        "h": "#FFFFF0"
      }
    ],
    "plcs": [
      "neckline",
      "sleeves",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Day",
      "Outdoor",
      "Romantic"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Spring",
    "searchKeywords": [
      "dress",
      "midi",
      "blush pink",
      "pastel",
      "refined silhouette"
    ],
    "recommendationKeywords": [
      "Lily Embroidery",
      "medium",
      "wedding_guest",
      "festive"
    ]
  },
  {
    "id": "S04",
    "name": "Yellow Lily Blossom Gown",
    "coll": "Spring 26",
    "type": "gown",
    "color": "Printed Yellow",
    "cfam": "vibrant",
    "chex": "#E8C84A",
    "len": "floor-length",
    "sil": "flowing",
    "emb": "Print",
    "eint": "all-over",
    "form": 4,
    "primary": [
      "wedding_guest",
      "festive",
      "evening_gala",
      "resort"
    ],
    "secondary": [
      "evening_gala"
    ],
    "price": 988,
    "desc": "Soft yellow lily blossom print that moves effortlessly with the body — romantic and timeless.",
    "guide": "This gown was made for formal garden events and summer weddings. The flowing silhouette means every step is a moment. Style simply.",
    "slug": "yellow-lily-blossom-gown",
    "i1": "https://belafuori.com/cdn/shop/files/LFA615PPO_MODEL_01.png?v=1772794570&width=900",
    "i2": "https://belafuori.com/cdn/shop/files/LFA615PPO_MODEL_04.png?v=1772794570&width=900",
    "clrs": [
      {
        "n": "Printed Yellow",
        "h": "#E8C84A"
      },
      {
        "n": "Pink Lily",
        "h": "#F1A7B5"
      }
    ],
    "lens": [
      "midi",
      "floor-length"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Ivory",
        "h": "#FFFFF0"
      }
    ],
    "plcs": [
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Day",
      "Outdoor",
      "Destination",
      "Romantic"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Spring",
    "searchKeywords": [
      "gown",
      "floor-length",
      "printed yellow",
      "vibrant",
      "flowing"
    ],
    "recommendationKeywords": [
      "Print",
      "all-over",
      "wedding_guest",
      "festive",
      "evening_gala",
      "resort"
    ]
  },
  {
    "id": "S05",
    "name": "Sunlit Bloom Dress",
    "coll": "Spring 26",
    "type": "dress",
    "color": "Butter Yellow",
    "cfam": "pastel",
    "chex": "#F5DFA0",
    "len": "midi",
    "sil": "breezy",
    "emb": "Floral Motifs",
    "eint": "light",
    "form": 2,
    "primary": [
      "resort",
      "wedding_guest"
    ],
    "secondary": [
      "festive"
    ],
    "price": 1846,
    "desc": "Delicate floral motifs that capture the warmth of sunlit blossoms. Light, breezy, effortlessly feminine.",
    "guide": "Garden parties, resort getaways, or casual chic occasions. This butter yellow belongs in sunlight — pair with tan sandals and no jewellery.",
    "slug": "sunlit-bloom-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFP140PPS1.png?v=1769704288&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/LFP140PPS_2_1.png?v=1769704288&width=800",
    "clrs": [
      {
        "n": "Butter Yellow",
        "h": "#F5DFA0"
      },
      {
        "n": "Blush Rose",
        "h": "#F1A7B5"
      }
    ],
    "lens": [
      "knee-length",
      "midi"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Rose Gold",
        "h": "#B76E79"
      }
    ],
    "plcs": [
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Day",
      "Outdoor",
      "Beach",
      "Minimal"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Spring",
    "searchKeywords": [
      "dress",
      "midi",
      "butter yellow",
      "pastel",
      "breezy"
    ],
    "recommendationKeywords": [
      "Floral Motifs",
      "light",
      "resort",
      "wedding_guest"
    ]
  },
  {
    "id": "S06",
    "name": "Fuchsia Bloom Balloon Gown",
    "coll": "Spring 26",
    "type": "gown",
    "color": "Fuchsia Print",
    "cfam": "vibrant",
    "chex": "#C0185A",
    "len": "floor-length",
    "sil": "balloon",
    "emb": "Print",
    "eint": "all-over",
    "form": 4,
    "primary": [
      "evening_gala",
      "festive",
      "resort"
    ],
    "secondary": [
      "wedding_guest"
    ],
    "price": 1846,
    "desc": "Bold and whimsical — vibrant fuchsia with a playful balloon silhouette that adds drama and movement.",
    "guide": "This is a show-stopping statement piece for evening soirées. The balloon silhouette means you arrive before you do. Own it completely — no competing accessories.",
    "slug": "fuchsia-bloom-balloon-gown",
    "i1": "https://belafuori.com/cdn/shop/files/LuminousFlouncehaltergown_5.png?v=1769753123&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/LuminousFlouncehaltergown_4.png?v=1769753123&width=800",
    "clrs": [
      {
        "n": "Fuchsia Print",
        "h": "#C0185A"
      },
      {
        "n": "Coral Print",
        "h": "#E8820A"
      }
    ],
    "lens": [
      "floor-length"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Rose Gold",
        "h": "#B76E79"
      }
    ],
    "plcs": [
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Statement",
      "Bold",
      "Outdoor"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Spring",
    "searchKeywords": [
      "gown",
      "floor-length",
      "fuchsia print",
      "vibrant",
      "balloon"
    ],
    "recommendationKeywords": [
      "Print",
      "all-over",
      "evening_gala",
      "festive",
      "resort"
    ]
  },
  {
    "id": "S07",
    "name": "Seafoam Sorbet Dress",
    "coll": "Spring 26 · Bestseller",
    "type": "dress",
    "color": "Seafoam Multicolour",
    "cfam": "pastel",
    "chex": "#82C9B5",
    "len": "midi",
    "sil": "draped",
    "emb": "Textural Detail",
    "eint": "light",
    "form": 2,
    "primary": [
      "resort",
      "wedding_guest"
    ],
    "secondary": [
      "cocktail_party"
    ],
    "price": 1950,
    "desc": "Fresh and luminous — soft seafoam hues with delicate textural detailing. Light and graceful.",
    "guide": "Perfect for summer evenings and destination resort occasions. The seafoam gradient is your jewellery — wear nothing else and let the colour speak.",
    "slug": "seafoam-sorbet-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFP140PPS_2_1.png?v=1769704288&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/LFP140PPS1.png?v=1769704288&width=800",
    "clrs": [
      {
        "n": "Seafoam",
        "h": "#82C9B5"
      },
      {
        "n": "Coral",
        "h": "#E8820A"
      }
    ],
    "lens": [
      "knee-length",
      "midi"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Silver",
        "h": "#C0C0C0"
      }
    ],
    "plcs": [
      "hemline"
    ],
    "contexts": [
      "Day",
      "Night",
      "Beach",
      "Minimal"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Spring",
    "searchKeywords": [
      "dress",
      "midi",
      "seafoam multicolour",
      "pastel",
      "draped"
    ],
    "recommendationKeywords": [
      "Textural Detail",
      "light",
      "resort",
      "wedding_guest"
    ]
  },
  {
    "id": "S08",
    "name": "Solar Petal Embroidered Dress",
    "coll": "Spring 26",
    "type": "dress",
    "color": "Multicolour",
    "cfam": "vibrant",
    "chex": "#E8A040",
    "len": "knee-length",
    "sil": "strapless sleek",
    "emb": "Floral Embroidery",
    "eint": "heavy",
    "form": 3,
    "primary": [
      "cocktail_party"
    ],
    "secondary": [
      "festive"
    ],
    "price": 1365,
    "desc": "Strapless, intricately embroidered with blooming petal motifs — feminine charm meets modern elegance.",
    "guide": "Cocktail evenings and summer soirées. The strapless structure is bold — wear statement earrings and nothing below the neck. Effortless confidence.",
    "slug": "solar-petal-embroidered-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFR171TBG_2_1.png?v=1770274224&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/LFR171TBG_3_1.png?v=1770274224&width=800",
    "clrs": [
      {
        "n": "Multicolour",
        "h": "#E8A040"
      },
      {
        "n": "Blush",
        "h": "#F1C2C8"
      }
    ],
    "lens": [
      "knee-length",
      "midi"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Bronze",
        "h": "#8B6914"
      }
    ],
    "plcs": [
      "neckline",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Outdoor",
      "Bold"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Spring",
    "searchKeywords": [
      "dress",
      "knee-length",
      "multicolour",
      "vibrant",
      "strapless sleek"
    ],
    "recommendationKeywords": [
      "Floral Embroidery",
      "heavy",
      "cocktail_party"
    ]
  },
  {
    "id": "R01",
    "name": "Gustav Klimt Garden Gown",
    "coll": "Resort 26 · Bestseller",
    "type": "gown",
    "color": "Blue Botanical",
    "cfam": "jewel",
    "chex": "#1A5276",
    "len": "floor-length",
    "sil": "mermaid",
    "emb": "Botanical Print",
    "eint": "all-over",
    "form": 5,
    "primary": [
      "evening_gala",
      "wedding_guest",
      "resort"
    ],
    "secondary": [
      "festive"
    ],
    "price": 2400,
    "desc": "Klimt-inspired botanical mermaid gown — wearable art for your most significant occasions.",
    "guide": "The mermaid silhouette builds drama from hem upward. Swept updo, no jewellery. Let the botanical print be the only narrative — it is sufficient.",
    "slug": "gustav-klimt-garden-gown",
    "i1": "https://belafuori.com/cdn/shop/files/LF617GKG_MODEL_02.png?v=1759607005&width=900",
    "i2": "https://belafuori.com/cdn/shop/files/LF617GKG_LOOK17_GHOSTFRONT_1.jpg?v=1759607005&width=900",
    "clrs": [
      {
        "n": "Blue Botanical",
        "h": "#1A5276"
      },
      {
        "n": "Emerald Garden",
        "h": "#1D6A4A"
      }
    ],
    "lens": [
      "midi",
      "floor-length"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Multi",
        "h": "#7D3C98"
      },
      {
        "n": "Ivory",
        "h": "#FFFFF0"
      }
    ],
    "plcs": [
      "neckline",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Statement",
      "Outdoor"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "gown",
      "floor-length",
      "blue botanical",
      "jewel",
      "mermaid"
    ],
    "recommendationKeywords": [
      "Botanical Print",
      "all-over",
      "evening_gala",
      "wedding_guest",
      "resort"
    ]
  },
  {
    "id": "R02",
    "name": "Floral Jacquard Embroidered Dress",
    "coll": "Resort 26 · Bestseller",
    "type": "dress",
    "color": "Multi Floral",
    "cfam": "vibrant",
    "chex": "#7D6B8A",
    "len": "midi",
    "sil": "A-line",
    "emb": "Jacquard Floral",
    "eint": "all-over",
    "form": 4,
    "primary": [
      "wedding_guest",
      "festive",
      "resort"
    ],
    "secondary": [
      "resort"
    ],
    "price": 1800,
    "desc": "All-over jacquard floral embroidery on a structured A-line midi — artisan weaving at its finest.",
    "guide": "The woven pattern shifts with the light — photography cannot do it justice. Wear gold jewellery only. The fabric is the entire story.",
    "slug": "floral-jacquard-embroidered-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFR120FJEMODEL01.png?v=1772794725&width=900",
    "i2": "https://belafuori.com/cdn/shop/files/LFR120FJEMODEL02.png?v=1772794725&width=900",
    "clrs": [
      {
        "n": "Multi Floral",
        "h": "#7D6B8A"
      },
      {
        "n": "Blush Floral",
        "h": "#D4A0A7"
      }
    ],
    "lens": [
      "knee-length",
      "midi",
      "floor-length"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Silver",
        "h": "#C0C0C0"
      }
    ],
    "plcs": [
      "neckline",
      "sleeves",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Day",
      "Night",
      "Outdoor",
      "Romantic"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "dress",
      "midi",
      "multi floral",
      "vibrant",
      "a-line"
    ],
    "recommendationKeywords": [
      "Jacquard Floral",
      "all-over",
      "wedding_guest",
      "festive",
      "resort"
    ]
  },
  {
    "id": "R03",
    "name": "Palm Jumeirah Embroidered Dress",
    "coll": "Resort 26 · Bestseller",
    "type": "dress",
    "color": "Multi Teal",
    "cfam": "jewel",
    "chex": "#1ABC9C",
    "len": "midi",
    "sil": "fit-and-flare",
    "emb": "Hand-Embroidered Floral",
    "eint": "heavy",
    "form": 4,
    "primary": [
      "cocktail_party",
      "wedding_guest",
      "festive",
      "resort"
    ],
    "secondary": [
      "festive"
    ],
    "price": 2100,
    "desc": "Over 40 hours of hand-embroidery per piece — richly detailed fit-and-flare inspired by Dubai.",
    "guide": "No two are identical. Nude block heels and nothing else — this piece is its own universe. Wear it with the confidence of someone who knows what they have.",
    "slug": "palm-jumeirah-embroidered-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFE24144PJEG_MODEL_01.png?v=1759671010&width=900",
    "i2": "https://belafuori.com/cdn/shop/files/LFE24144PJEG_MODEL_03.png?v=1759671010&width=900",
    "clrs": [
      {
        "n": "Teal Multi",
        "h": "#1ABC9C"
      },
      {
        "n": "Ivory Multi",
        "h": "#F5F5DC"
      }
    ],
    "lens": [
      "knee-length",
      "midi"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Ivory",
        "h": "#FFFFF0"
      },
      {
        "n": "Blush",
        "h": "#E8B4B8"
      }
    ],
    "plcs": [
      "neckline",
      "sleeves",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Destination",
      "Statement",
      "Outdoor"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "dress",
      "midi",
      "multi teal",
      "jewel",
      "fit-and-flare"
    ],
    "recommendationKeywords": [
      "Hand-Embroidered Floral",
      "heavy",
      "cocktail_party",
      "wedding_guest",
      "festive",
      "resort"
    ]
  },
  {
    "id": "R04",
    "name": "Marina Blue Embroidered Gown",
    "coll": "Resort 26",
    "type": "gown",
    "color": "Marina Blue",
    "cfam": "jewel",
    "chex": "#2E86C1",
    "len": "floor-length",
    "sil": "strapless column",
    "emb": "Marina Embroidery",
    "eint": "heavy",
    "form": 5,
    "primary": [
      "evening_gala",
      "corporate",
      "festive",
      "resort"
    ],
    "secondary": [
      "wedding_guest"
    ],
    "price": 2800,
    "desc": "Elegant strapless maxi gown in sophisticated marina blue and turquoise — sleek column for elevated occasions.",
    "guide": "The column silhouette is architectural discipline made beautiful. Wear an updo to honour the strapless neckline. This is the corporate black-tie gown.",
    "slug": "marina-blue-embroidered-gown",
    "i1": "https://belafuori.com/cdn/shop/files/ROYALAZUREmiragedress_1.png?v=1769752915&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/ROYALAZUREmiragedress_2.png?v=1769752915&width=800",
    "clrs": [
      {
        "n": "Marina Blue",
        "h": "#2E86C1"
      },
      {
        "n": "Deep Teal",
        "h": "#0E7777"
      }
    ],
    "lens": [
      "midi",
      "floor-length"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Silver",
        "h": "#C0C0C0"
      },
      {
        "n": "Turquoise",
        "h": "#48C9B0"
      }
    ],
    "plcs": [
      "neckline",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Minimal",
      "Outdoor"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "gown",
      "floor-length",
      "marina blue",
      "jewel",
      "strapless column"
    ],
    "recommendationKeywords": [
      "Marina Embroidery",
      "heavy",
      "evening_gala",
      "corporate",
      "festive",
      "resort"
    ]
  },
  {
    "id": "R05",
    "name": "Orchid Print Embroidered Gown",
    "coll": "Resort 26",
    "type": "gown",
    "color": "Pink Orchid",
    "cfam": "pastel",
    "chex": "#E0A0B8",
    "len": "floor-length",
    "sil": "graceful",
    "emb": "Orchid Floral",
    "eint": "heavy",
    "form": 3,
    "primary": [
      "resort",
      "festive",
      "evening_gala"
    ],
    "secondary": [
      "wedding_guest"
    ],
    "price": 1250,
    "desc": "A pink gown adorned with intricate orchid floral embroidery — feminine charm with elegant detailing.",
    "guide": "Garden parties, beach parties, and daytime special occasions. The orchid embroidery is romantically detailed — style with simple flats and a sun-worn elegance.",
    "slug": "orchid-print-embroidered-gown",
    "i1": "https://belafuori.com/cdn/shop/files/LuminousFlouncehaltergown_5.png?v=1769753123&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/LuminousFlouncehaltergown_4.png?v=1769753123&width=800",
    "clrs": [
      {
        "n": "Pink Orchid",
        "h": "#E0A0B8"
      },
      {
        "n": "Blush Orchid",
        "h": "#F1C2C8"
      }
    ],
    "lens": [
      "midi",
      "floor-length"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve"
    ],
    "eclrs": [
      {
        "n": "Blush",
        "h": "#E8B4B8"
      },
      {
        "n": "Gold",
        "h": "#C9A84C"
      }
    ],
    "plcs": [
      "neckline",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Day",
      "Outdoor",
      "Beach",
      "Romantic"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "gown",
      "floor-length",
      "pink orchid",
      "pastel",
      "graceful"
    ],
    "recommendationKeywords": [
      "Orchid Floral",
      "heavy",
      "resort",
      "festive",
      "evening_gala"
    ]
  },
  {
    "id": "R06",
    "name": "Rhapsody Embroidered Gown",
    "coll": "Resort 26",
    "type": "gown",
    "color": "Pink Crystal",
    "cfam": "pastel",
    "chex": "#E8A0B8",
    "len": "floor-length",
    "sil": "shimmering",
    "emb": "Crystal Encrusted",
    "eint": "heavy",
    "form": 4,
    "primary": [
      "evening_gala",
      "cocktail_party",
      "resort"
    ],
    "secondary": [
      "festive"
    ],
    "price": 2200,
    "desc": "A stunning pink gown encrusted with sparkling crystals — radiating elegance and glamour.",
    "guide": "Crystal embellishment catches every light in the room. Beach soirées, evening galas, high-glamour occasions. Wear with simple pointed heels — the gown is the spectacle.",
    "slug": "rhapsody-embroidered-gown",
    "i1": "https://belafuori.com/cdn/shop/files/LuminousFlouncehaltergown_4.png?v=1769753123&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/LuminousFlouncehaltergown_5.png?v=1769753123&width=800",
    "clrs": [
      {
        "n": "Pink Crystal",
        "h": "#E8A0B8"
      },
      {
        "n": "Champagne Crystal",
        "h": "#EDD5A0"
      }
    ],
    "lens": [
      "floor-length"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Crystal Clear",
        "h": "#D6EAF8"
      },
      {
        "n": "Rose Gold",
        "h": "#B76E79"
      }
    ],
    "plcs": [
      "neckline",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Destination",
      "Statement",
      "Outdoor"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "gown",
      "floor-length",
      "pink crystal",
      "pastel",
      "shimmering"
    ],
    "recommendationKeywords": [
      "Crystal Encrusted",
      "heavy",
      "evening_gala",
      "cocktail_party",
      "resort"
    ]
  },
  {
    "id": "R07",
    "name": "Lush Jewel Embroidered Gown",
    "coll": "Resort 26",
    "type": "gown",
    "color": "Yellow Blush Ombré",
    "cfam": "pastel",
    "chex": "#F0D080",
    "len": "floor-length",
    "sil": "fish-cut trail",
    "emb": "Hand-Beaded Floral Geometric",
    "eint": "heavy",
    "form": 5,
    "primary": [
      "evening_gala",
      "wedding_guest",
      "resort"
    ],
    "secondary": [
      "festive"
    ],
    "price": 3200,
    "desc": "Fully hand-beaded with floral and geometric embroidery. Fish-cut silhouette flowing into a dramatic trail. Yellow to blush ombré.",
    "guide": "This is couture. The fish-cut silhouette commands posture — stand tall and it will carry you. Every bead placed by hand. Wear nothing else.",
    "slug": "lush-jewel-embroidered-gown",
    "i1": "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png?v=1770275215&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/LFR165FTP_4_1.png?v=1770275215&width=800",
    "clrs": [
      {
        "n": "Yellow Blush",
        "h": "#F0D080"
      },
      {
        "n": "Blush Pink",
        "h": "#F1C2C8"
      }
    ],
    "lens": [
      "floor-length"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Pearl",
        "h": "#EAE0C8"
      },
      {
        "n": "Gold",
        "h": "#C9A84C"
      }
    ],
    "plcs": [
      "neckline",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Statement",
      "Outdoor"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "gown",
      "floor-length",
      "yellow blush ombré",
      "pastel",
      "fish-cut trail"
    ],
    "recommendationKeywords": [
      "Hand-Beaded Floral Geometric",
      "heavy",
      "evening_gala",
      "wedding_guest",
      "resort"
    ]
  },
  {
    "id": "R08",
    "name": "Regal Rose Garden Embroidered Dress",
    "coll": "Resort 26",
    "type": "dress",
    "color": "Rose Garden",
    "cfam": "jewel",
    "chex": "#A0415D",
    "len": "midi",
    "sil": "streamlined",
    "emb": "Rose Garden Embroidery",
    "eint": "medium",
    "form": 4,
    "primary": [
      "cocktail_party",
      "corporate",
      "festive",
      "resort"
    ],
    "secondary": [
      "wedding_guest"
    ],
    "price": 1800,
    "desc": "Romantic rose garden embroidery across a streamlined silhouette — timeless for cocktail and formal social occasions.",
    "guide": "Elegant poise for cocktail evenings and formal gatherings. The streamlined silhouette is controlled and confident. Paired with a heel, this dress means business.",
    "slug": "regal-rose-garden-embroidered-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFD6SPS_4_1.png?v=1770265888&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/LFD6SPS_2_1.png?v=1770265888&width=800",
    "clrs": [
      {
        "n": "Rose Garden",
        "h": "#A0415D"
      },
      {
        "n": "Ivory Rose",
        "h": "#F5F0E0"
      }
    ],
    "lens": [
      "knee-length",
      "midi"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve",
      "three-quarter sleeve"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Rose Gold",
        "h": "#B76E79"
      },
      {
        "n": "Silver",
        "h": "#C0C0C0"
      }
    ],
    "plcs": [
      "neckline",
      "sleeves",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Minimal",
      "Romantic",
      "Outdoor"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "dress",
      "midi",
      "rose garden",
      "jewel",
      "streamlined"
    ],
    "recommendationKeywords": [
      "Rose Garden Embroidery",
      "medium",
      "cocktail_party",
      "corporate",
      "festive",
      "resort"
    ]
  },
  {
    "id": "R09",
    "name": "Mini Rose Embroidered Dress",
    "coll": "Resort 26",
    "type": "mini dress",
    "color": "Blush Rose",
    "cfam": "pastel",
    "chex": "#F1C2C8",
    "len": "mini",
    "sil": "delicate",
    "emb": "Rose Embroidery",
    "eint": "medium",
    "form": 2,
    "primary": [
      "resort",
      "festive"
    ],
    "secondary": [
      "cocktail_party"
    ],
    "price": 1200,
    "desc": "Delicate and feminine mini dress with intricate rose embroidery — romance in a flirty silhouette.",
    "guide": "Garden parties, brunches, resort getaways. The mini length and rose embroidery make this effortlessly romantic. Flat sandals or kitten heels — never stilettos.",
    "slug": "mini-rose-embroidered-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFR120FJEMODEL01.png?v=1772794725&width=900",
    "i2": "https://belafuori.com/cdn/shop/files/LFR120FJEMODEL02.png?v=1772794725&width=900",
    "clrs": [
      {
        "n": "Blush Rose",
        "h": "#F1C2C8"
      },
      {
        "n": "Ivory",
        "h": "#F5F0E0"
      }
    ],
    "lens": [
      "mini",
      "knee-length"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve"
    ],
    "eclrs": [
      {
        "n": "Blush",
        "h": "#E8B4B8"
      },
      {
        "n": "Gold",
        "h": "#C9A84C"
      }
    ],
    "plcs": [
      "neckline",
      "hemline"
    ],
    "contexts": [
      "Day",
      "Outdoor",
      "Destination",
      "Romantic"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "mini dress",
      "mini",
      "blush rose",
      "pastel",
      "delicate"
    ],
    "recommendationKeywords": [
      "Rose Embroidery",
      "medium",
      "resort",
      "festive"
    ]
  },
  {
    "id": "R10",
    "name": "Petal Breeze Hydrangea Mini Dress",
    "coll": "Resort 26",
    "type": "mini dress",
    "color": "Vibrant Floral",
    "cfam": "vibrant",
    "chex": "#7098D8",
    "len": "mini",
    "sil": "flirty printed",
    "emb": "Printed Pattern",
    "eint": "all-over",
    "form": 2,
    "primary": [
      "resort",
      "cocktail_party"
    ],
    "secondary": [
      "festive",
      "cocktail_party"
    ],
    "price": 980,
    "desc": "Vibrant hydrangea-print mini — playful and effortless. Perfect for beach parties and sun-filled vacations.",
    "guide": "Day outings, beach parties, resort pools. This is the dress for the person who is always the most interesting one at the party. Wear flat sandals and nothing else.",
    "slug": "petal-breeze-hydrengea-mini-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png?v=1759478060&width=900",
    "i2": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png?v=1759478060&width=900",
    "clrs": [
      {
        "n": "Vibrant Floral",
        "h": "#7098D8"
      },
      {
        "n": "Pink Floral",
        "h": "#E8A0B8"
      }
    ],
    "lens": [
      "mini"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Silver",
        "h": "#C0C0C0"
      }
    ],
    "plcs": [
      "hemline"
    ],
    "contexts": [
      "Day",
      "Beach",
      "Bold",
      "Playful",
      "Outdoor"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "mini dress",
      "mini",
      "vibrant floral",
      "vibrant",
      "flirty printed"
    ],
    "recommendationKeywords": [
      "Printed Pattern",
      "all-over",
      "resort",
      "cocktail_party"
    ]
  },
  {
    "id": "B01",
    "name": "Claudia Green Crystal Mini Dress",
    "coll": "Bestseller",
    "type": "mini dress",
    "color": "Emerald Green",
    "cfam": "jewel",
    "chex": "#2D6A4F",
    "len": "mini",
    "sil": "crystal fitted",
    "emb": "Crystal Embellishment",
    "eint": "heavy",
    "form": 3,
    "primary": [
      "cocktail_party",
      "festive"
    ],
    "secondary": [
      "evening_gala"
    ],
    "price": 1400,
    "desc": "Crystal-encrusted mini in rich emerald — a cocktail statement that commands every room.",
    "guide": "Emerald and crystal — maximum impact, minimal effort. Strappy heeled sandals, satin clutch. The crystals are your jewellery. Nothing on the wrists or neck.",
    "slug": "claudia-green-crystal-mini-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png?v=1759478060&width=900",
    "i2": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png?v=1759478060&width=900",
    "clrs": [
      {
        "n": "Emerald Green",
        "h": "#2D6A4F"
      },
      {
        "n": "Midnight Black",
        "h": "#111111"
      },
      {
        "n": "Royal Blue",
        "h": "#1B3B6F"
      }
    ],
    "lens": [
      "mini",
      "knee-length"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Silver",
        "h": "#C0C0C0"
      },
      {
        "n": "Crystal",
        "h": "#CCE9F0"
      }
    ],
    "plcs": [
      "neckline",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Statement",
      "Bold",
      "Playful"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Bestseller",
    "searchKeywords": [
      "mini dress",
      "mini",
      "emerald green",
      "jewel",
      "crystal fitted"
    ],
    "recommendationKeywords": [
      "Crystal Embellishment",
      "heavy",
      "cocktail_party",
      "festive"
    ]
  },
  {
    "id": "B04",
    "name": "Sapphire Sage Embroidered Dress",
    "coll": "Bestseller · Resort 26",
    "type": "dress",
    "color": "Sapphire Sage",
    "cfam": "jewel",
    "chex": "#2C6B8A",
    "len": "midi",
    "sil": "column",
    "emb": "Hand-Embroidered Floral",
    "eint": "heavy",
    "form": 4,
    "primary": [
      "corporate",
      "cocktail_party",
      "festive",
      "resort"
    ],
    "secondary": [
      "wedding_guest"
    ],
    "price": 2100,
    "desc": "Sapphire and sage hand-embroidered column midi — nature's most sophisticated colour companions.",
    "guide": "The column silhouette conveys authority; the embroidery provides all the warmth. This is the dress for gallery events, elevated corporate occasions, and refined cocktail evenings.",
    "slug": "sapphire-sage-embroidered-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFD6SPS_4_1.png?v=1770265888&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/LFD6SPS_2_1.png?v=1770265888&width=800",
    "clrs": [
      {
        "n": "Sapphire Sage",
        "h": "#2C6B8A"
      },
      {
        "n": "Navy Sage",
        "h": "#1B3A6B"
      },
      {
        "n": "Teal Sage",
        "h": "#0E7777"
      }
    ],
    "lens": [
      "knee-length",
      "midi",
      "floor-length"
    ],
    "slvs": [
      "sleeveless",
      "short sleeve",
      "three-quarter sleeve",
      "full sleeve"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      },
      {
        "n": "Silver",
        "h": "#C0C0C0"
      },
      {
        "n": "Ivory",
        "h": "#FFFFF0"
      }
    ],
    "plcs": [
      "neckline",
      "sleeves",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Day",
      "Night",
      "Indoor",
      "Minimal",
      "Outdoor"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Bestseller",
    "searchKeywords": [
      "dress",
      "midi",
      "sapphire sage",
      "jewel",
      "column"
    ],
    "recommendationKeywords": [
      "Hand-Embroidered Floral",
      "heavy",
      "corporate",
      "cocktail_party",
      "festive",
      "resort"
    ]
  },
  {
    "id": "B05",
    "name": "Crystal Prism Embroidered Gown",
    "coll": "Bestseller",
    "type": "gown",
    "color": "Ivory Crystal",
    "cfam": "neutral",
    "chex": "#E8E4D8",
    "len": "floor-length",
    "sil": "column",
    "emb": "Crystal Beading",
    "eint": "heavy",
    "form": 5,
    "primary": [
      "wedding_guest",
      "corporate",
      "evening_gala"
    ],
    "secondary": [
      "evening_gala"
    ],
    "price": 3500,
    "desc": "Full crystal and bead embroidery on an ivory column gown — weeks of handwork. For receptions and engagements.",
    "guide": "Every crystal hand-set. The column silhouette requires perfect posture and rewards it magnificently. No jewellery below the neck. The gown is the jewellery.",
    "slug": "crystal-prism-embroidered-gown",
    "i1": "https://belafuori.com/cdn/shop/files/CRYSTALPRISMembroidedgown.png?v=1767708118&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/CRYSTALPRISMembroidedgown.png?v=1767708118&width=800",
    "clrs": [
      {
        "n": "Ivory Crystal",
        "h": "#F5F0E0"
      },
      {
        "n": "Champagne Crystal",
        "h": "#D4A84B"
      }
    ],
    "lens": [
      "midi",
      "floor-length"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Crystal Clear",
        "h": "#D6EAF8"
      },
      {
        "n": "Gold Crystal",
        "h": "#C9A84C"
      }
    ],
    "plcs": [
      "neckline",
      "hemline",
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Statement",
      "Minimal"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Bestseller",
    "searchKeywords": [
      "gown",
      "floor-length",
      "ivory crystal",
      "neutral",
      "column"
    ],
    "recommendationKeywords": [
      "Crystal Beading",
      "heavy",
      "wedding_guest",
      "corporate",
      "evening_gala"
    ]
  },
  {
    "id": "F01",
    "name": "Midnight Sequin Cape Gown",
    "coll": "Fall 25",
    "type": "gown",
    "color": "Midnight Black",
    "cfam": "jewel",
    "chex": "#111111",
    "len": "floor-length",
    "sil": "cape",
    "emb": "Sequins",
    "eint": "heavy",
    "form": 5,
    "primary": [
      "evening_gala"
    ],
    "secondary": [
      "wedding_guest"
    ],
    "price": 2600,
    "desc": "A dramatic black cape gown dripping in heavy sequins. Brings nocturnal elegance to any high-profile affair.",
    "guide": "The cape silhouette is inherently dramatic. Ensure the shoulders sit perfectly. Sharp updo and minimal bracelets.",
    "slug": "midnight-sequin-cape-gown",
    "i1": "https://belafuori.com/cdn/shop/files/LuminousFlouncehaltergown_5.png",
    "i2": "https://belafuori.com/cdn/shop/files/LuminousFlouncehaltergown_4.png",
    "clrs": [
      {
        "n": "Midnight",
        "h": "#1A1A1D"
      }
    ],
    "lens": [
      "floor-length"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Silver",
        "h": "#C0C0C0"
      }
    ],
    "plcs": [
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Statement"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Fall",
    "searchKeywords": [
      "gown",
      "floor-length",
      "midnight black",
      "jewel",
      "cape"
    ],
    "recommendationKeywords": [
      "Sequins",
      "heavy",
      "evening_gala"
    ]
  },
  {
    "id": "H01",
    "name": "Tropical Palm Mini Dress",
    "coll": "High Summer 26",
    "type": "mini dress",
    "color": "Palm Green",
    "cfam": "vibrant",
    "chex": "#2E8B57",
    "len": "mini",
    "sil": "A-line",
    "emb": "Print",
    "eint": "all-over",
    "form": 2,
    "primary": [
      "resort",
      "cocktail_party"
    ],
    "secondary": [
      "festive"
    ],
    "price": 850,
    "desc": "Lightweight A-line mini featuring a vibrant tropical palm print, ideal for coastal soirées.",
    "guide": "Minimalist styling works best. Strappy flats for the day, a small heel for evening cocktails.",
    "slug": "tropical-palm-mini-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png",
    "i2": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png",
    "clrs": [
      {
        "n": "Palm Green",
        "h": "#2E8B57"
      },
      {
        "n": "Sunset Orange",
        "h": "#FF4500"
      }
    ],
    "lens": [
      "mini"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      }
    ],
    "plcs": [
      "hemline"
    ],
    "contexts": [
      "Day",
      "Outdoor",
      "Beach",
      "Playful"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "High",
    "searchKeywords": [
      "mini dress",
      "mini",
      "palm green",
      "vibrant",
      "a-line"
    ],
    "recommendationKeywords": [
      "Print",
      "all-over",
      "resort",
      "cocktail_party"
    ]
  },
  {
    "id": "F02",
    "name": "Ivory Embroidered Silk Blouse",
    "coll": "Fall 25",
    "type": "top",
    "color": "Ivory",
    "cfam": "neutral",
    "chex": "#FFFFF0",
    "len": "standard",
    "sil": "relaxed",
    "emb": "Delicate Embroidery",
    "eint": "light",
    "form": 3,
    "primary": [
      "corporate"
    ],
    "secondary": [
      "festive"
    ],
    "price": 680,
    "desc": "A masterful silk blouse finished with delicate thread embroidery at the cuffs and collar.",
    "guide": "Tuck it into tailored trousers for the boardroom or pair with a velvet skirt for an evening event.",
    "slug": "ivory-embroidered-silk-blouse",
    "i1": "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg",
    "i2": "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg",
    "clrs": [
      {
        "n": "Ivory",
        "h": "#FFFFF0"
      }
    ],
    "lens": [
      "standard"
    ],
    "slvs": [
      "full sleeve"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      }
    ],
    "plcs": [
      "neckline",
      "sleeves"
    ],
    "contexts": [
      "Day",
      "Indoor",
      "Minimal"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Fall",
    "searchKeywords": [
      "top",
      "standard",
      "ivory",
      "neutral",
      "relaxed"
    ],
    "recommendationKeywords": [
      "Delicate Embroidery",
      "light",
      "corporate"
    ]
  },
  {
    "id": "F03",
    "name": "Draped Velvet Trousers",
    "coll": "Fall 25",
    "type": "bottom",
    "color": "Plum",
    "cfam": "jewel",
    "chex": "#8E4585",
    "len": "floor-length",
    "sil": "wide-leg",
    "emb": "None",
    "eint": "none",
    "form": 3,
    "primary": [
      "cocktail_party",
      "evening_gala",
      "corporate"
    ],
    "secondary": [
      "corporate"
    ],
    "price": 750,
    "desc": "Luxurious wide-leg velvet trousers that move like liquid. A refined foundation for evening separates.",
    "guide": "Pair with an embellished top or a sharp silk blouse. A pointed heel elongates the wide leg beautifully.",
    "slug": "draped-velvet-trousers",
    "i1": "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png",
    "i2": "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png",
    "clrs": [
      {
        "n": "Plum",
        "h": "#8E4585"
      },
      {
        "n": "Black",
        "h": "#000000"
      }
    ],
    "lens": [
      "floor-length"
    ],
    "slvs": [],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Night",
      "Indoor",
      "Statement",
      "Minimal"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Fall",
    "searchKeywords": [
      "bottom",
      "floor-length",
      "plum",
      "jewel",
      "wide-leg"
    ],
    "recommendationKeywords": [
      "None",
      "none",
      "cocktail_party",
      "evening_gala",
      "corporate"
    ]
  },
  {
    "id": "J01",
    "name": "Sapphire Kimono Coat",
    "coll": "Resort 26",
    "type": "jacket",
    "color": "Sapphire Blue",
    "cfam": "jewel",
    "chex": "#0F52BA",
    "len": "midi",
    "sil": "draped",
    "emb": "Hand-Embroidered Floral",
    "eint": "medium",
    "form": 4,
    "primary": [
      "evening_gala",
      "festive",
      "resort",
      "corporate"
    ],
    "secondary": [
      "cocktail_party"
    ],
    "price": 1890,
    "desc": "An incredibly soft sapphire kimono coat covered in hand-embroidered floral motifs. Designed for layering gracefully.",
    "guide": "Drape it over shoulders like a cape for evening arrivals, or tie at the waist over tailored separates.",
    "slug": "sapphire-kimono-coat",
    "i1": "https://belafuori.com/cdn/shop/files/ROYALAZUREmiragedress_1.png",
    "i2": "https://belafuori.com/cdn/shop/files/ROYALAZUREmiragedress_1.png",
    "clrs": [
      {
        "n": "Sapphire",
        "h": "#0F52BA"
      }
    ],
    "lens": [
      "midi"
    ],
    "slvs": [
      "three-quarter sleeve"
    ],
    "eclrs": [
      {
        "n": "Silver",
        "h": "#C0C0C0"
      }
    ],
    "plcs": [
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Bold",
      "Outdoor",
      "Minimal"
    ],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "jacket",
      "midi",
      "sapphire blue",
      "jewel",
      "draped"
    ],
    "recommendationKeywords": [
      "Hand-Embroidered Floral",
      "medium",
      "evening_gala",
      "festive",
      "resort",
      "corporate"
    ]
  },
  {
    "id": "H02",
    "name": "Santorini Cut-Out Midi Dress",
    "coll": "High Summer 26",
    "type": "dress",
    "color": "Cerulean Blue",
    "cfam": "jewel",
    "chex": "#007BA7",
    "len": "midi",
    "sil": "cut-out fit-and-flare",
    "emb": "Pleated",
    "eint": "light",
    "form": 2,
    "price": 1050,
    "desc": "A breezy, vividly hued midi dress perfect for coastal sunsets.",
    "guide": "Style with gold accessories and flat sandals to elevate your destination wardrobe.",
    "slug": "santorini-cut-out-midi-dress",
    "i1": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png?v=1759478060&width=900",
    "i2": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png?v=1759478060&width=900",
    "clrs": [
      {
        "n": "Cerulean Blue",
        "h": "#007BA7"
      }
    ],
    "lens": [
      "midi"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Day",
      "Outdoor",
      "Beach",
      "Destination",
      "Playful"
    ],
    "primary": [],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "High",
    "searchKeywords": [
      "dress",
      "midi",
      "cerulean blue",
      "jewel",
      "cut-out fit-and-flare"
    ],
    "recommendationKeywords": [
      "Pleated",
      "light"
    ]
  },
  {
    "id": "H03",
    "name": "Capri Lemon Linen Co-Ord",
    "coll": "High Summer 26",
    "type": "co-ord",
    "color": "Lemon Yellow",
    "cfam": "vibrant",
    "chex": "#FDFD96",
    "len": "knee-length",
    "sil": "relaxed tailored",
    "emb": "None",
    "eint": "none",
    "form": 2,
    "price": 890,
    "desc": "Effortless linen two-piece tailored to offer a relaxed yet structured fit.",
    "guide": "Great for leisurely yacht trips or European brunches.",
    "slug": "capri-lemon-linen-coord",
    "i1": "https://belafuori.com/cdn/shop/files/LFP140PPS1.png?v=1769704288&width=800",
    "i2": "https://belafuori.com/cdn/shop/files/LFP140PPS_2_1.png",
    "clrs": [
      {
        "n": "Lemon Yellow",
        "h": "#FDFD96"
      }
    ],
    "lens": [],
    "slvs": [
      "short sleeve"
    ],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Day",
      "Outdoor",
      "Resort",
      "Minimal"
    ],
    "primary": [],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "High",
    "searchKeywords": [
      "co-ord",
      "knee-length",
      "lemon yellow",
      "vibrant",
      "relaxed tailored"
    ],
    "recommendationKeywords": [
      "None",
      "none"
    ]
  },
  {
    "id": "H04",
    "name": "Ibiza Beaded Fringed Mini",
    "coll": "High Summer 26",
    "type": "mini dress",
    "color": "Silver Metallic",
    "cfam": "metallic",
    "chex": "#C0C0C0",
    "len": "mini",
    "sil": "fitted",
    "emb": "Beads and Fringe",
    "eint": "heavy",
    "form": 3,
    "price": 1600,
    "desc": "An alluring fringed mini dripping with hand-applied beadwork.",
    "guide": "Pair with dramatic metallic heels and dance the night away.",
    "slug": "ibiza-beaded-fringed-mini",
    "i1": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png",
    "i2": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png",
    "clrs": [
      {
        "n": "Silver Metallic",
        "h": "#C0C0C0"
      }
    ],
    "lens": [
      "mini"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [
      {
        "n": "Silver",
        "h": "#C0C0C0"
      }
    ],
    "plcs": [
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Statement",
      "Playful",
      "Bold"
    ],
    "primary": [],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "High",
    "searchKeywords": [
      "mini dress",
      "mini",
      "silver metallic",
      "metallic",
      "fitted"
    ],
    "recommendationKeywords": [
      "Beads and Fringe",
      "heavy"
    ]
  },
  {
    "id": "F04",
    "name": "Velvet Tuxedo Jacket",
    "coll": "Fall 25",
    "type": "jacket",
    "color": "Burgundy",
    "cfam": "jewel",
    "chex": "#800020",
    "len": "standard",
    "sil": "tailored",
    "emb": "None",
    "eint": "none",
    "form": 4,
    "price": 1250,
    "desc": "A perfectly tailored velvet tuxedo jacket for uncompromising corporate style.",
    "guide": "Layer over a silk camisole or a crisp white shirt.",
    "slug": "velvet-tuxedo-jacket",
    "i1": "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg",
    "i2": "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg",
    "clrs": [
      {
        "n": "Burgundy",
        "h": "#800020"
      }
    ],
    "lens": [
      "standard"
    ],
    "slvs": [
      "long"
    ],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Night",
      "Indoor",
      "Formal Venue",
      "Minimal",
      "Elegant"
    ],
    "primary": [
      "corporate"
    ],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Fall",
    "searchKeywords": [
      "jacket",
      "standard",
      "burgundy",
      "jewel",
      "tailored"
    ],
    "recommendationKeywords": [
      "None",
      "none",
      "corporate"
    ]
  },
  {
    "id": "F05",
    "name": "Cashmere Blend Top",
    "coll": "Fall 25",
    "type": "top",
    "color": "Oatmeal",
    "cfam": "neutral",
    "chex": "#E3dac9",
    "len": "standard",
    "sil": "relaxed",
    "emb": "Knit Details",
    "eint": "light",
    "form": 2,
    "price": 540,
    "desc": "A cozy, exceptionally soft cashmere blend top.",
    "guide": "Perfect for layering under structural jackets.",
    "slug": "cashmere-blend-top",
    "i1": "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg",
    "i2": "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg",
    "clrs": [
      {
        "n": "Oatmeal",
        "h": "#E3dac9"
      }
    ],
    "lens": [
      "standard"
    ],
    "slvs": [
      "long"
    ],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Day",
      "Indoor",
      "Minimal"
    ],
    "primary": [],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Fall",
    "searchKeywords": [
      "top",
      "standard",
      "oatmeal",
      "neutral",
      "relaxed"
    ],
    "recommendationKeywords": [
      "Knit Details",
      "light"
    ]
  },
  {
    "id": "F06",
    "name": "Satin Midi Skirt",
    "coll": "Fall 25",
    "type": "bottom",
    "color": "Champagne",
    "cfam": "pastel",
    "chex": "#F7E7CE",
    "len": "midi",
    "sil": "A-line",
    "emb": "None",
    "eint": "none",
    "form": 3,
    "price": 620,
    "desc": "Fluid, high-shine satin skirt cut on the bias.",
    "guide": "Pairs beautifully with chunky knits or sheer blouses.",
    "slug": "satin-midi-skirt",
    "i1": "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png",
    "i2": "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png",
    "clrs": [
      {
        "n": "Champagne",
        "h": "#F7E7CE"
      }
    ],
    "lens": [
      "midi"
    ],
    "slvs": [],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Day",
      "Night",
      "Indoor",
      "Romantic",
      "Minimal"
    ],
    "primary": [
      "wedding_guest",
      "corporate"
    ],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Fall",
    "searchKeywords": [
      "bottom",
      "midi",
      "champagne",
      "pastel",
      "a-line"
    ],
    "recommendationKeywords": [
      "None",
      "none",
      "wedding_guest",
      "corporate"
    ]
  },
  {
    "id": "F07",
    "name": "Emerald Sequin Blouse",
    "coll": "Fall 25",
    "type": "top",
    "color": "Emerald Green",
    "cfam": "jewel",
    "chex": "#50C878",
    "len": "standard",
    "sil": "draped",
    "emb": "Sequins",
    "eint": "heavy",
    "form": 4,
    "price": 880,
    "desc": "A high-octane sequin blouse that catches every light.",
    "guide": "Best worn with tailored black trousers to anchor its sparkle.",
    "slug": "emerald-sequin-blouse",
    "i1": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png",
    "i2": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png",
    "clrs": [
      {
        "n": "Emerald Green",
        "h": "#50C878"
      }
    ],
    "lens": [
      "standard"
    ],
    "slvs": [
      "long"
    ],
    "eclrs": [
      {
        "n": "Green",
        "h": "#50C878"
      }
    ],
    "plcs": [
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Festive",
      "Statement"
    ],
    "primary": [],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Fall",
    "searchKeywords": [
      "top",
      "standard",
      "emerald green",
      "jewel",
      "draped"
    ],
    "recommendationKeywords": [
      "Sequins",
      "heavy"
    ]
  },
  {
    "id": "F08",
    "name": "Gilded Onyx Boucle Jacket",
    "coll": "Fall 25",
    "type": "jacket",
    "color": "Onyx Black",
    "cfam": "neutral",
    "chex": "#0F0F0F",
    "len": "standard",
    "sil": "box",
    "emb": "Gold Threading",
    "eint": "medium",
    "form": 4,
    "price": 1450,
    "desc": "Classic boxy boucle jacket enriched with gold threading.",
    "guide": "A timeless heritage piece. Throw over anything to immediately formalize your look.",
    "slug": "gilded-onyx-boucle-jacket",
    "i1": "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg",
    "i2": "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg",
    "clrs": [
      {
        "n": "Onyx",
        "h": "#0F0F0F"
      }
    ],
    "lens": [
      "standard"
    ],
    "slvs": [
      "long"
    ],
    "eclrs": [
      {
        "n": "Gold",
        "h": "#C9A84C"
      }
    ],
    "plcs": [
      "full garment"
    ],
    "contexts": [
      "Day",
      "Night",
      "Corporate",
      "Elegant",
      "Minimal"
    ],
    "primary": [
      "corporate"
    ],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Fall",
    "searchKeywords": [
      "jacket",
      "standard",
      "onyx black",
      "neutral",
      "box"
    ],
    "recommendationKeywords": [
      "Gold Threading",
      "medium",
      "corporate"
    ]
  },
  {
    "id": "R11",
    "name": "Ivory Wide Leg Trouser",
    "coll": "Resort 26",
    "type": "bottom",
    "color": "Ivory",
    "cfam": "neutral",
    "chex": "#FFFFF0",
    "len": "floor-length",
    "sil": "wide-leg",
    "emb": "None",
    "eint": "none",
    "form": 3,
    "price": 650,
    "desc": "Flowing wide-leg trousers that drape sublimely.",
    "guide": "An essential resort basic. Wear with fitted tops to balance the volume.",
    "slug": "ivory-wide-leg-trouser",
    "i1": "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png",
    "i2": "https://belafuori.com/cdn/shop/files/LFR165FTP_2_1.png",
    "clrs": [
      {
        "n": "Ivory",
        "h": "#FFFFF0"
      }
    ],
    "lens": [
      "floor-length"
    ],
    "slvs": [],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Day",
      "Outdoor",
      "Resort",
      "Minimal"
    ],
    "primary": [
      "resort",
      "corporate"
    ],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "bottom",
      "floor-length",
      "ivory",
      "neutral",
      "wide-leg"
    ],
    "recommendationKeywords": [
      "None",
      "none",
      "resort",
      "corporate"
    ]
  },
  {
    "id": "R12",
    "name": "Silk Charmeuse Camisole",
    "coll": "Resort 26",
    "type": "top",
    "color": "Pearl",
    "cfam": "neutral",
    "chex": "#EAE0C8",
    "len": "standard",
    "sil": "bias cut",
    "emb": "None",
    "eint": "none",
    "form": 3,
    "price": 420,
    "desc": "A luminous silk camisole designed for effortless layering.",
    "guide": "The foundational piece for sheer overlays or strong jackets.",
    "slug": "silk-charmeuse-camisole",
    "i1": "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg",
    "i2": "https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg",
    "clrs": [
      {
        "n": "Pearl",
        "h": "#EAE0C8"
      }
    ],
    "lens": [
      "standard"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Day",
      "Night",
      "Indoor",
      "Minimal",
      "Outdoor"
    ],
    "primary": [
      "resort"
    ],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Resort",
    "searchKeywords": [
      "top",
      "standard",
      "pearl",
      "neutral",
      "bias cut"
    ],
    "recommendationKeywords": [
      "None",
      "none",
      "resort"
    ]
  },
  {
    "id": "B02",
    "name": "The Signature Silk Slip Dress",
    "coll": "Bestseller",
    "type": "dress",
    "color": "Midnight Blue",
    "cfam": "jewel",
    "chex": "#191970",
    "len": "midi",
    "sil": "slip",
    "emb": "None",
    "eint": "none",
    "form": 3,
    "price": 850,
    "desc": "The piece that started it all. Our signature flawless slip dress.",
    "guide": "Requires zero effort. Add a bold lip, a delicate earring, and go.",
    "slug": "signature-silk-slip-dress",
    "i1": "https://belafuori.com/cdn/shop/files/ROYALAZUREmiragedress_1.png",
    "i2": "https://belafuori.com/cdn/shop/files/ROYALAZUREmiragedress_2.png",
    "clrs": [
      {
        "n": "Midnight Blue",
        "h": "#191970"
      }
    ],
    "lens": [
      "midi"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Night",
      "Indoor",
      "Outdoor",
      "Romantic",
      "Minimal"
    ],
    "primary": [],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Bestseller",
    "searchKeywords": [
      "dress",
      "midi",
      "midnight blue",
      "jewel",
      "slip"
    ],
    "recommendationKeywords": [
      "None",
      "none"
    ]
  },
  {
    "id": "B03",
    "name": "Rose Quartz Wrap Midi",
    "coll": "Bestseller",
    "type": "dress",
    "color": "Rose Quartz",
    "cfam": "pastel",
    "chex": "#F7CAC9",
    "len": "midi",
    "sil": "wrap",
    "emb": "Ruffles",
    "eint": "light",
    "form": 3,
    "price": 1100,
    "desc": "A universally flattering wrap silhouette trimmed with delicate soft ruffles.",
    "guide": "The ultimate wedding guest dress. Soft, feminine, and enduringly elegant.",
    "slug": "rose-quartz-wrap-midi",
    "i1": "https://belafuori.com/cdn/shop/files/BlushLilyEmbroideredDress_6.png",
    "i2": "https://belafuori.com/cdn/shop/files/BlushLilyEmbroideredDress_4.png",
    "clrs": [
      {
        "n": "Rose Quartz",
        "h": "#F7CAC9"
      }
    ],
    "lens": [
      "midi"
    ],
    "slvs": [
      "short sleeve"
    ],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Day",
      "Outdoor",
      "Romantic"
    ],
    "primary": [
      "wedding_guest"
    ],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Bestseller",
    "searchKeywords": [
      "dress",
      "midi",
      "rose quartz",
      "pastel",
      "wrap"
    ],
    "recommendationKeywords": [
      "Ruffles",
      "light",
      "wedding_guest"
    ]
  },
  {
    "id": "S09",
    "name": "Azure Silk Wrap Gown",
    "coll": "Spring 26",
    "type": "gown",
    "color": "Azure Blue",
    "cfam": "vibrant",
    "chex": "#007FFF",
    "len": "floor-length",
    "sil": "wrap",
    "emb": "Hand-painted",
    "eint": "light",
    "form": 4,
    "price": 1950,
    "desc": "A vibrant azure gown defined by a wrap waist and hand-painted floral motifs.",
    "guide": "Vivid and commanding. Perfect for outdoor destination weddings.",
    "slug": "azure-silk-wrap-gown",
    "i1": "https://belafuori.com/cdn/shop/files/LF617GKG_MODEL_02.png",
    "i2": "https://belafuori.com/cdn/shop/files/LF617GKG_LOOK17_GGhostfront_1.jpg",
    "clrs": [
      {
        "n": "Azure Blue",
        "h": "#007FFF"
      }
    ],
    "lens": [
      "floor-length"
    ],
    "slvs": [
      "sleeveless"
    ],
    "eclrs": [],
    "plcs": [],
    "contexts": [
      "Day",
      "Outdoor",
      "Destination",
      "Bold"
    ],
    "primary": [],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Spring",
    "searchKeywords": [
      "gown",
      "floor-length",
      "azure blue",
      "vibrant",
      "wrap"
    ],
    "recommendationKeywords": [
      "Hand-painted",
      "light"
    ]
  },
  {
    "id": "S10",
    "name": "Monochrome Lace Midi",
    "coll": "Spring 26",
    "type": "dress",
    "color": "Black and White",
    "cfam": "neutral",
    "chex": "#000000",
    "len": "midi",
    "sil": "fitted",
    "emb": "Lace",
    "eint": "heavy",
    "form": 4,
    "price": 1350,
    "desc": "Precision-cut lace overlay over an ivory slip. Strikingly graphic.",
    "guide": "Sophisticated impact suitable for corporate events or formal cocktail hours.",
    "slug": "monochrome-lace-midi",
    "i1": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png",
    "i2": "https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT02.png",
    "clrs": [
      {
        "n": "Black",
        "h": "#000000"
      }
    ],
    "lens": [
      "midi"
    ],
    "slvs": [
      "short sleeve"
    ],
    "eclrs": [],
    "plcs": [
      "full garment"
    ],
    "contexts": [
      "Night",
      "Indoor",
      "Corporate",
      "Statement"
    ],
    "primary": [],
    "secondary": [],
    "fabric": "Silk Charmeuse and Tulle",
    "season": "Spring",
    "searchKeywords": [
      "dress",
      "midi",
      "black and white",
      "neutral",
      "fitted"
    ],
    "recommendationKeywords": [
      "Lace",
      "heavy"
    ]
  }
];

export interface Occasion {
  key: string;
  name: string;
  icon: string;
  formality: number;
  hint: string;
  detail: string;
  img: string;
  r: {
    fmin: number;
    cfams: string[];
    eints: string[];
    lens: string[];
  };
}

export const OCC: Occasion[] = [
  { key:'wedding_guest', name:'Wedding Guest', icon:'🕊️', formality:5, hint:'Floor gowns · Embellished', detail:'Floor-length gowns, jewel tones, embellished designs, structured formal silhouettes', img:'https://belafuori.com/cdn/shop/files/LFR1483SGO_MODEL_01.png?v=1759672501&width=800', r:{ fmin:4, cfams:['jewel','neutral','pastel'], eints:['medium','heavy','all-over','beaded floral','jacquard floral','botanical print','orchid floral','hand-beaded floral geometric'], lens:['midi','floor-length'] } },
  { key:'evening_gala', name:'Evening Gala', icon:'🌟', formality:5, hint:'Black-tie · Dramatic', detail:'Sweeping silhouettes, deep jewel colours, crystal and bead embellishments, dramatic impact', img:'https://belafuori.com/cdn/shop/files/LuminousFlouncehaltergown_5.png?v=1769753123&width=800', r:{ fmin:4, cfams:['jewel','neutral','pastel','vibrant'], eints:['heavy','all-over','crystal encrusted','crystal beading','mauve floral lace','botanical print','hand-beaded floral geometric'], lens:['floor-length','midi'] } },
  { key:'cocktail_party', name:'Cocktail Party', icon:'🥂', formality:3, hint:'Mini to midi · Bold', detail:'Mini to midi length, bold or metallic colours, sleek confident silhouettes, standout details', img:'https://belafuori.com/cdn/shop/files/LFA56CGNLOOK45_FRONT01.png?v=1759478060&width=800', r:{ fmin:3, cfams:['jewel','metallic','vibrant'], eints:['medium','heavy','crystal embellishment','gold embroidery','rose garden embroidery','hand-embroidered floral','crystal encrusted'], lens:['mini','knee-length','midi'] } },
  { key:'festive', name:'Festive Event', icon:'✨', formality:3, hint:'Vibrant · Printed', detail:'Statement prints, vibrant colours, floral embroidery, joyful designs for celebrations', img:'https://belafuori.com/cdn/shop/files/BlushLilyEmbroideredDress_6.png?v=1770279611&width=800', r:{ fmin:2, cfams:['vibrant','pastel','jewel'], eints:['medium','all-over','light','lily embroidery','orchid floral','mosaic pattern','floral embroidery'], lens:['mini','midi','floor-length'] } },
  { key:'resort', name:'Resort Vacation', icon:'🌴', formality:1, hint:'Relaxed · Coastal', detail:'Relaxed printed silhouettes, warm coastal tones, light embellishment, breezy flowing designs', img:'https://belafuori.com/cdn/shop/files/LFP140PPS1.png?v=1769704288&width=800', r:{ fmin:1, cfams:['vibrant','pastel','neutral'], eints:['light','all-over','textural detail','print','mosaic pattern','floral motifs','printed pattern'], lens:['mini','knee-length','midi'] } },
  { key:'corporate', name:'Corporate Event', icon:'💼', formality:4, hint:'Tailored · Structured', detail:'Structured silhouettes, refined neutral or jewel palettes, understated embellishment, authority', img:'https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg?v=1772882913&width=800', r:{ fmin:3, cfams:['neutral','jewel'], eints:['light','medium','geometric embroidery','delicate embroidery','marina embroidery','crystal beading'], lens:['midi','floor-length','knee-length'] } }
];

export function scoreOccasion(p: Product, occKey: string) {
  const occ = OCC.find(o => o.key === occKey);
  if (!occ) return 0;
  const r = occ.r;
  let s = 0;
  if (p.primary.includes(occKey)) s += 40;
  else if (p.secondary.includes(occKey)) s += 15;
  else s -= 5;
  
  if (p.form >= r.fmin) s += 20;
  else if (p.form < r.fmin - 1) s -= 10;
  
  if (r.cfams.includes(p.cfam)) s += 15;
  if (r.lens.includes(p.len)) s += 15;
  
  const ei = p.eint.toLowerCase();
  if (r.eints.some(e => ei.includes(e) || e.includes(ei) || ei === e)) s += 10;
  return Math.min(Math.max(s, 0), 100);
}

export function recommendForOccasion(occKey: string, contextFilters: string[] = []) {
  return CAT
    .map(p => ({ p, s: scoreOccasion(p, occKey) }))
    .filter(x => {
      if (x.s < 25) return false; // Base occasion filter
      if (contextFilters.length > 0) {
        // If context filters are applied, product must match at least one (OR logic for softer filtering)
        return contextFilters.some(c => x.p.contexts.includes(c));
      }
      return true;
    })
    .sort((a,b) => b.s - a.s);
}
