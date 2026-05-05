import { useState } from "react";

const SIZES = ["00","0/XS","2/XS","4/S","6/S","8/M","10/M","12/L","14/L","16/XL","1X","2X","3X"];

const MEASUREMENTS: { label: string; data: (number | string)[] }[] = [
  { label: "Front neck to natural waist", data: [36,37,37.5,38,38.5,39,39.5,40,40.5,41,42,43,44] },
  { label: "Back neck to natural waist",  data: [38,39,39.5,40,40.5,41,41.5,42,42.5,43,44,45,46] },
  { label: "Natural waist",               data: [58,61,64,67,70,74,78,82,86,90,96,102,108] },
  { label: "Across shoulder",             data: [34,35,36,37,38,39,40,41,42,43,44,46,48] },
  { label: "Across front",               data: [29,30,31,32,33,34,35,36,37,38,40,42,44] },
  { label: "Across back",                data: [31,32,33,34,35,36,37,38,39,40,42,44,46] },
  { label: "Bust",                       data: [74,78,82,86,90,94,98,102,106,110,117,123,129] },
  { label: "Overbust",                   data: [68,72,76,80,84,88,92,96,100,104,110,116,122] },
  { label: "Underbust",                  data: [62,66,70,74,78,82,86,90,94,98,104,110,116] },
  { label: "Arm length",                 data: [55,56,57,58,59,60,61,62,63,64,64,65,66] },
  { label: "Bicep",                      data: [25,26,27,28,29,30,31,32,33,35,37,39,41] },
  { label: "Shoulder point to apex",     data: [21,22,23,24,25,26,27,27,28,29,30,31,32] },
];

const CONVERSION: { label: string; data: string[] }[] = [
  { label: "US Size", data: ["00","0","2","4","6","8","10","12","14","16","1X","2X","3X"] },
  { label: "IT Size", data: ["28","30","32","34","36","38","40","42","44","46","50","52","54"] },
  { label: "FR Size", data: ["30","32","34","36","38","40","42","44","46","48","52","54","56"] },
];

export function SizeChartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"measurements" | "conversion">("measurements");
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-ink/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[960px] border border-stone relative flex flex-col"
        style={{ maxHeight: "90vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start px-8 pt-8 shrink-0">
          <div>
            <h3 className="text-3xl font-serif italic text-ink">Size Chart</h3>
            <p className="text-[11px] uppercase tracking-widest text-mid mt-1">
              All measurements in centimetres (cm)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-mid hover:text-ink transition-colors leading-none mt-1"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone mx-8 mt-6 shrink-0">
          {(["measurements", "conversion"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[10px] uppercase tracking-widest pb-3 mr-8 border-b-2 transition-colors ${
                tab === t
                  ? "border-ink text-ink"
                  : "border-transparent text-mid hover:text-ink"
              }`}
            >
              {t === "measurements" ? "Measurements" : "Size Conversion"}
            </button>
          ))}
        </div>

        {/* Scrollable table */}
        <div className="overflow-auto flex-1 px-8 pt-4">
          {tab === "measurements" && (
            <table
              className="border-collapse text-left w-full"
              style={{ minWidth: "920px" }}
            >
              <thead>
                <tr>
                  <th
                    className="text-[9px] uppercase tracking-widest text-mid font-normal py-3 pr-6 border-b border-stone bg-white sticky left-0"
                    style={{ minWidth: "200px" }}
                  >
                    Measurement
                  </th>
                  {SIZES.map(s => (
                    <th
                      key={s}
                      className="text-[9px] uppercase tracking-widest text-ink font-medium py-3 px-3 border-b border-stone text-center whitespace-nowrap"
                    >
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MEASUREMENTS.map((row, i) => (
                  <tr key={row.label}>
                    <td
                      className="text-[11px] font-serif text-charcoal py-3 pr-6 border-b border-stone/40 sticky left-0"
                      style={{ backgroundColor: i % 2 !== 0 ? "#faf8f4" : "#ffffff" }}
                    >
                      {row.label}
                    </td>
                    {row.data.map((val, j) => (
                      <td
                        key={j}
                        className="text-[11px] text-charcoal py-3 px-3 border-b border-stone/40 text-center"
                        style={{ backgroundColor: i % 2 !== 0 ? "#faf8f4" : "#ffffff" }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "conversion" && (
            <table className="border-collapse text-left w-full" style={{ minWidth: "920px" }}>
              <thead>
                <tr>
                  <th
                    className="text-[9px] uppercase tracking-widest text-mid font-normal py-3 pr-6 border-b border-stone"
                    style={{ minWidth: "130px" }}
                  >
                    Region
                  </th>
                  {SIZES.map(s => (
                    <th
                      key={s}
                      className="text-[9px] uppercase tracking-widest text-ink font-medium py-3 px-3 border-b border-stone text-center whitespace-nowrap"
                    >
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CONVERSION.map((row, i) => (
                  <tr key={row.label} style={{ backgroundColor: i % 2 !== 0 ? "#faf8f4" : "#ffffff" }}>
                    <td className="text-[11px] font-serif text-charcoal py-4 pr-6 border-b border-stone/40 font-medium">
                      {row.label}
                    </td>
                    {row.data.map((val, j) => (
                      <td key={j} className="text-[11px] text-charcoal py-4 px-3 border-b border-stone/40 text-center">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-stone mt-4 shrink-0">
          <p className="text-[11px] text-mid italic font-serif">
            All measurements refer to body measurements, not garment dimensions.
            Customisation is available for fit, length, and coverage.
          </p>
        </div>
      </div>
    </div>
  );
}
