# 📊 Investment Strategy Comparator
### Capstone Project — Alexia Le

A comprehensive stock market analysis dashboard comparing **Dividend Stocks**, **Growth Stocks**, **High-Risk plays**, and **Day Trading** strategies over 3-month and 6-month periods using **real Yahoo Finance data (Mar 2025 → Mar 2026)**.

---

## 🏆 Key Findings — Which Strategy Makes the Most Money?

### Overall Winner: High-Risk Speculative Stocks

Based on real Yahoo Finance data over a 1-year period (Mar 2025 → Mar 2026):

| Rank | Strategy | Ticker | Total Return | Risk Level |
|------|----------|--------|-------------|------------|
| 🥇 1 | High Risk | **SOXL** (3x Semiconductor ETF) | **+129%** | 🔴 Extreme |
| 🥈 2 | High Risk | **PLTR** (Palantir) | **+85%** | 🔴 Very High |
| 🥉 3 | Growth | **TSLA** (Tesla) | **+51%** | 🟠 High |
| 4 | Dividend | **JNJ** (Johnson & Johnson) | **+47%** | 🟢 Low |
| 5 | Dividend | **KO** (Coca-Cola) | **+8%** | 🟢 Low |
| 6 | Growth | **META** (Meta Platforms) | **+3.5%** | 🟠 High |
| 7 | High Risk | **COIN** (Coinbase) | **-9.3%** | 🔴 Extreme |
| 8 | Dividend | **PG** (Procter & Gamble) | **-10.2%** | 🟢 Low |
| 9 | Day Trading | **Simulated** | **~-5%** | 🟠 Medium |

---

## 📌 Conclusion by Strategy

### 1. 🔥 High Risk Stocks — Highest Return, Highest Risk
**SOXL (+129%) and PLTR (+85%)** delivered extraordinary returns in this period, driven by the AI/semiconductor boom. However:
- SOXL had a **max drawdown of -60%** at its worst point — meaning investors could have lost more than half their money before recovering
- COIN (-9.3%) shows high risk does NOT always pay off — crypto sentiment drove significant losses
- **Verdict:** High risk = high reward only if you pick the right stock AND hold through massive volatility

### 2. 📈 Growth Stocks — Strong but Inconsistent
- **TSLA (+51%)** recovered strongly after a prior decline
- **META (+3.5%)** underperformed expectations despite being a mega-cap tech stock
- **Verdict:** Growth stocks can beat dividend stocks but require careful stock selection. Not all growth stocks perform equally.

### 3. 📗 Dividend Stocks — Stable and Surprisingly Competitive
- **JNJ (+47%)** was the biggest surprise — outperforming most growth stocks with much lower volatility (19%) and a Sharpe Ratio of 1.77
- **KO (+8%)** delivered steady, predictable returns with minimal drawdown
- **PG (-10.2%)** shows even defensive stocks can underperform in certain periods
- **Verdict:** Dividend stocks offer the **best risk-adjusted returns** (Sharpe Ratio). JNJ proved you don't always need high risk for high returns.

### 4. ⚡ Day Trading — The Worst Performer
- Simulated day trading returned approximately **-5%** after commissions
- Even with a 44% win rate, transaction costs (0.15% per trade × 6 trades/day × 251 days) eroded all profits
- **Verdict:** Day trading is the **least profitable strategy** for retail investors. Even the worst-performing buy-and-hold stock required zero daily effort.

---

## 💡 Overall Recommendation

> **"Time in the market beats timing the market."**

| Investor Profile | Best Strategy | Why |
|-----------------|---------------|-----|
| Conservative / Low risk | Dividend stocks (JNJ, KO) | Stable returns, income, low volatility |
| Balanced / Medium risk | Mix of dividend + growth | Diversified risk-return profile |
| Aggressive / High risk | Speculative stocks (PLTR, SOXL) | Maximum return — but ready for -50%+ drawdowns |
| Anyone | ❌ Avoid day trading | Commissions destroy returns; no consistent edge for retail traders |

---

## ⚠️ Important Caveats
- This analysis covers **one specific 1-year period (Mar 2025 → Mar 2026)** — results would differ in bear markets
- SOXL's +129% return came with extreme volatility; a different entry/exit point could result in severe losses
- Past performance does not guarantee future results

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

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ ([download](https://nodejs.org))
- npm v8+

### Installation & Run

```bash
# 1. Clone the repo
git clone https://github.com/leinguyenpei-eng/stock-investment-strategy-comparator.git
cd stock-investment-strategy-comparator

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

App will open at **http://localhost:5173**

---

## 📊 Data Sources

| Data | Source |
|------|--------|
| COIN, JNJ, KO, META, PG, PLTR, SOXL, TSLA | **Yahoo Finance** — real daily close prices, Mar 2025 → Mar 2026 |
| Day Trading P&L | Simulated (seed=42, win rate 44%, 6 trades/day, 0.15% commission) |
| NVDA | Excluded — file export error |

---

## 🛠 Tech Stack

- **React 18** + **Vite** — UI framework & build tool
- **Recharts** — data visualization
- No backend required — all data embedded in `App.jsx`

---

> ⚠️ **Disclaimer**: This project is for **educational purposes only** and does not constitute financial advice.

*Capstone Project — March 2026*  
*Author: Alexia Le*
