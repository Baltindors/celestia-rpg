import React, { useState } from "react";

// Local copy of the spiral logic used by the backend
function nextInSquareSpiral(tx, ty) {
  if (tx === 0 && ty === 0) return { x: 1, y: 0 };

  let x = 0,
    y = 0;
  let stepLen = 1;
  const maxAbs = Math.max(Math.abs(tx), Math.abs(ty));
  const hardCap = (2 * maxAbs + 5) ** 2;
  let stepsTaken = 0;

  function move(dx, dy, len) {
    for (let i = 0; i < len; i++) {
      if (x === tx && y === ty) {
        x += dx;
        y += dy;
        return { found: true, next: { x, y } };
      }
      x += dx;
      y += dy;
      stepsTaken++;
      if (stepsTaken > hardCap) {
        throw new Error("Spiral search exceeded safety cap (unexpected).");
      }
    }
    return { found: false };
  }

  while (true) {
    let r = move(1, 0, stepLen);
    if (r.found) return r.next; // right
    r = move(0, 1, stepLen);
    if (r.found) return r.next; // up
    stepLen++;
    r = move(-1, 0, stepLen);
    if (r.found) return r.next; // left
    r = move(0, -1, stepLen);
    if (r.found) return r.next; // down
    stepLen++;
  }
}

export default function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [next, setNext] = useState(null);
  const [error, setError] = useState("");
  const [useApi, setUseApi] = useState(false);
  const [apiBase, setApiBase] = useState("http://localhost:3000");
  const [history, setHistory] = useState([{ x: 0, y: 0 }]);

  async function handleGetNext() {
    setError("");
    try {
      let result;
      if (useApi) {
        const url = `${apiBase.replace(/\/$/, "")}/next?x=${x}&y=${y}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        result = data.next;
      } else {
        result = nextInSquareSpiral(Number(x), Number(y));
      }
      setNext(result);
      setHistory((h) => [...h, result]);
      setX(result.x);
      setY(result.y);
    } catch (e) {
      setError(e.message || String(e));
    }
  }

  function reset() {
    setX(0);
    setY(0);
    setNext(null);
    setHistory([{ x: 0, y: 0 }]);
    setError("");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0f172a",
        color: "#e2e8f0",
        fontFamily: "Inter, ui-sans-serif, system-ui",
      }}
    >
      <div style={{ width: "min(920px, 92vw)", padding: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>
          Square Spiral — Next Coordinate Demo
        </h1>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>
          Enter an integer grid point <code>(x, y)</code> on the standard
          outward square spiral (start at (0,0) → (1,0) → (1,1) → ...), then
          click <b>Get next</b>. Toggle <b>Use API</b> to query your Express
          backend at <code>/next</code>, or leave it off to compute locally.
        </p>

        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(12, 1fr)",
            alignItems: "end",
          }}
        >
          <label style={{ gridColumn: "span 3" }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>x</div>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(parseInt(e.target.value || 0))}
              style={inputStyle}
            />
          </label>
          <label style={{ gridColumn: "span 3" }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>y</div>
            <input
              type="number"
              value={y}
              onChange={(e) => setY(parseInt(e.target.value || 0))}
              style={inputStyle}
            />
          </label>

          <button
            onClick={handleGetNext}
            style={{ ...buttonStyle, gridColumn: "span 3" }}
          >
            Get next →
          </button>
          <button
            onClick={reset}
            style={{
              ...buttonStyle,
              gridColumn: "span 3",
              background: "#0b1220",
              border: "1px solid #334155",
            }}
          >
            Reset
          </button>

          <div
            style={{
              gridColumn: "1 / -1",
              marginTop: 8,
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={useApi}
                onChange={(e) => setUseApi(e.target.checked)}
              />
              Use API (GET /next)
            </label>
            <input
              type="text"
              value={apiBase}
              onChange={(e) => setApiBase(e.target.value)}
              placeholder="http://localhost:3000"
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
        </div>

        {error && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              border: "1px solid #7f1d1d",
              background: "#1f0a0a",
              color: "#fecaca",
              borderRadius: 8,
            }}
          >
            <b>Error:</b> {error}
          </div>
        )}

        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div style={cardStyle}>
            <h2 style={h2Style}>Result</h2>
            {next ? (
              <div style={{ fontSize: 18 }}>
                Next of (<code>{history[history.length - 2]?.x}</code>,{" "}
                <code>{history[history.length - 2]?.y}</code>) is
                <div style={{ fontSize: 24, marginTop: 8 }}>
                  (<b>{next.x}</b>, <b>{next.y}</b>)
                </div>
              </div>
            ) : (
              <div style={{ opacity: 0.8 }}>
                No result yet — enter a point and click <b>Get next</b>.
              </div>
            )}
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>History</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {history.map((p, i) => (
                <span
                  key={i}
                  style={{
                    padding: "6px 10px",
                    background:
                      i === history.length - 1 ? "#0ea5e9" : "#0b1220",
                    color: i === history.length - 1 ? "#0b1220" : "#e2e8f0",
                    border: "1px solid #334155",
                    borderRadius: 9999,
                  }}
                >
                  {i}: ({p.x},{p.y})
                </span>
              ))}
            </div>
          </div>
        </div>

        <SpiralMiniMap points={history} />

        <footer style={{ marginTop: 24, opacity: 0.7, fontSize: 12 }}>
          Tip: To test with your Express server, start it locally and leave the
          default API URL. If CORS blocks, either add CORS to your server (
          <code>npm i cors</code> then <code>app.use(require('cors')())</code>)
          or keep <b>Use API</b> off and let the UI compute locally.
        </footer>
      </div>
    </div>
  );
}

function SpiralMiniMap({ points }) {
  const size = 360;
  const pad = 10;
  const coords = points;
  const extent = coords.reduce(
    (m, p) => ({
      minX: Math.min(m.minX, p.x),
      maxX: Math.max(m.maxX, p.x),
      minY: Math.min(m.minY, p.y),
      maxY: Math.max(m.maxY, p.y),
    }),
    { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  );

  const spanX = Math.max(1, extent.maxX - extent.minX);
  const spanY = Math.max(1, extent.maxY - extent.minY);
  const scale = Math.min((size - 2 * pad) / spanX, (size - 2 * pad) / spanY);

  function toSvg({ x, y }) {
    const sx = (x - extent.minX) * scale + pad;
    const sy = (extent.maxY - y) * scale + pad; // invert Y for screen
    return { sx, sy };
  }

  const pathD = coords
    .map((p, i) => {
      const { sx, sy } = toSvg(p);
      return `${i === 0 ? "M" : "L"} ${sx} ${sy}`;
    })
    .join(" ");

  const last = toSvg(coords[coords.length - 1]);

  return (
    <div style={{ ...cardStyle, marginTop: 16 }}>
      <h2 style={h2Style}>Mini Map</h2>
      <svg
        width={size}
        height={size}
        style={{
          background: "#0b1220",
          borderRadius: 12,
          border: "1px solid #334155",
        }}
      >
        <path d={pathD} fill="none" stroke="#64748b" strokeWidth={2} />
        {coords.map((p, i) => {
          const { sx, sy } = toSvg(p);
          return (
            <circle
              key={i}
              cx={sx}
              cy={sy}
              r={i === coords.length - 1 ? 5 : 3}
              fill={i === coords.length - 1 ? "#0ea5e9" : "#94a3b8"}
            />
          );
        })}
        <text x={last.sx + 8} y={last.sy - 8} fontSize={12} fill="#e2e8f0">
          ({points[points.length - 1].x},{points[points.length - 1].y})
        </text>
      </svg>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #334155",
  background: "#0b1220",
  color: "#e2e8f0",
  outline: "none",
};

const buttonStyle = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "none",
  background: "#0ea5e9",
  color: "#08121f",
  cursor: "pointer",
  fontWeight: 600,
};

const cardStyle = {
  border: "1px solid #334155",
  background: "#0b1220",
  borderRadius: 12,
  padding: 16,
};

const h2Style = { fontSize: 18, marginBottom: 10 };
