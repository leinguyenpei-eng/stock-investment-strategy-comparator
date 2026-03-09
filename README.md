# 📊 Investment Strategy Comparator
### Capstone Project — Alexia Le

A comprehensive stock market analysis dashboard comparing **Dividend Stocks**, **Growth Stocks**, **High-Risk plays**, and **Day Trading** strategies over 3-month and 6-month periods.

---

## 🔍 What This Project Analyzes

| Strategy | Tickers |
|----------|---------|
| 📗 Dividend Stocks | JNJ, KO, PG |
| 📈 Growth Stocks | META, TSLA |
| 🔥 High Risk / Speculative | PLTR, COIN, SOXL (3x Leveraged ETF) |
| ⚡ Day Trading | Simulated (44% win rate, 6 trades/day, 0.15% commission) |

## 📐 Metrics Computed
- **Total Return** (price appreciation + dividend yield)
- **Annualized Volatility** (σ × √252)
- **Sharpe Ratio** (risk-free rate: 5%)
- **Max Drawdown** (peak-to-trough)
- **Backtesting** across 1M / 3M / 6M / 1Y windows

---

## 🗂 Project Structure

```
capstone-project/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx        ← Main dashboard component
│   ├── index.js       ← React entry point
│   └── index.css      ← Global styles
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ ([download](https://nodejs.org))
- npm v8+

### Installation & Run

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/stock-capstone.git
cd stock-capstone

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

App will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

Output goes to `/build` folder — ready to deploy on GitHub Pages, Vercel, or Netlify.

---

## 🌐 Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
# Also add: "homepage": "https://YOUR_USERNAME.github.io/stock-capstone"

npm run deploy
```

---

## 📊 Data Sources

| Data | Source |
|------|--------|
| COIN, JNJ, KO, META, PG, PLTR, SOXL, TSLA | **Yahoo Finance** — real daily close prices, Mar 2025 → Mar 2026 |
| Day Trading P&L | Simulated using deterministic pseudo-random (seed=42), win rate 44%, 6 trades/day |
| NVDA | Excluded — export error in source file |

> ⚠️ **Disclaimer**: This project is for **educational purposes only** and does not constitute financial advice. Past performance does not guarantee future results.

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Recharts** — charts (LineChart, BarChart, AreaChart, RadarChart)
- **CSS-in-JS** — inline styles for portability
- No backend required — all data embedded in `App.jsx`

---

## 📁 Adding Real NVDA Data

To add NVDA data:
1. Download CSV from [Yahoo Finance NVDA History](https://finance.yahoo.com/quote/NVDA/history/)
2. Parse the CSV and add to the `REAL_PRICES` object in `src/App.jsx`:
```js
NVDA: [/* daily close prices, oldest to newest */]
```
3. Add to `STOCK_META`:
```js
NVDA: { name: "NVIDIA", type: "Growth", sector: "Technology", dividendYield: 0.03, color: "#a78bfa" }
```
4. Add `"NVDA"` to the `TICKERS` array

---

*Capstone Project — March 2026*  
*Author: Alexia Le*
