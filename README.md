## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Goal

The MVP shows **stable/stable pools** on **Uniswap v3** on the **Base** network and helps you quickly compare them by:

- liquidity size (TVL),
- activity (24h Volume),
- potential fee-based return (Fee APR).

---

## Data sources (The Graph / Uniswap v3 Subgraph)

### 1) Pools list (entity: `Pool`)

We query the pool list and use these fields:

- `id` — pool address
- `token0 { id, symbol }`, `token1 { id, symbol }` — pool tokens
- `feeTier` — pool fee tier (e.g. `500` = 0.05%)
- `totalValueLockedUSD` — current pool TVL in USD

Filters:

- `token0_in` and `token1_in` — both tokens must be in the stablecoin whitelist
- `totalValueLockedUSD_gt = minTvl` — filter out small pools
- sort by `totalValueLockedUSD` descending

Why:

- to get “candidates” — **large stable/stable pools** worth analyzing.

---

### 2) Pool daily data (entity: `PoolDayData`)

For the selected pools we query daily data for the last `N` days and use:

- `date` — day timestamp (rounded to the start of the day)
- `pool { id }` — which pool the record belongs to
- `volumeUSD` — trading volume for that day (24h)
- `feesUSD` — fees collected that day (24h)
- `tvlUSD` — TVL for that day

Why:

- without daily data you can’t correctly compute **24h Volume** and **Fee APR over a period**.

---

## Metric definitions

### TVL (Total Value Locked)

**What it is:** total value of assets in the pool (in USD).

**Source:** `Pool.totalValueLockedUSD` (or the most recent `PoolDayData.tvlUSD`).

**Why:**

- to exclude small pools
- a base value for yield calculations

---

### 24h Volume

**What it is:** trading volume over the last 24 hours (in USD).

**Source:** the most recent `PoolDayData.volumeUSD`.

**How we compute it:** take the latest day record and use its `volumeUSD`.

**Why:** reflects pool activity and indirectly affects fees.

---

### Fees over a period (e.g., 7 days)

**What it is:** total fees collected by the pool over the period (in USD).

**Source:** `PoolDayData.feesUSD`.

**How we compute it:**

```
feesPeriod = Σ feesUSD(day_i)
```

**Why:** this is the pool’s fee earnings over the period.

---

### Average TVL over the period (avg TVL)

**What it is:** the average pool TVL over the period.

**Source:** `PoolDayData.tvlUSD`.

**How we compute it:**

```
avgTvl = (Σ tvlUSD(day_i)) / N
```

**Why:** TVL changes over time; averaging makes the APR estimate more stable.

---

## Core calculation: Fee APR (annualized fee return)

**What it is:** an estimate of the pool’s annualized return based on collected fees.

**Based on:** `feesPeriod` and `avgTvl` over `N` days.

Period return:

```
periodReturn = feesPeriod / avgTvl
```

Annualization:

```
feeApr = periodReturn * (365 / N)
```

Final formula:

```
feeApr = (feesPeriod / avgTvl) * (365 / N)
```

---

## What the table shows and where it comes from

- **Chain:** `base` (blockchain, constant for the MVP)
- **Pair:** `token0.symbol / token1.symbol` (from `Pool`)
- **Fee tier:** `feeTier` (from `Pool`)
- **TVL:** `totalValueLockedUSD` (from `Pool`) or latest `tvlUSD` (from `PoolDayData`)
- **Volume 24h:** latest `volumeUSD` (from `PoolDayData`)
- **Fee APR (7d):** formula above based on `feesUSD` and `tvlUSD` over 7 days

---

## Limitations

- This is the **pool-level APR**, not the return of a specific Uniswap v3 LP position.
- Real LP returns depend on the **price range** of the position.
- The MVP does not account for:

  - impermanent loss,
  - APY,
  - token/bridge/smart-contract risks,
  - position-specific returns (requires position modeling).

---

## MVP parameters (configurable)

- `minTvl` — minimum TVL to include a pool
- `N` — period used to compute fees and APR (default: 7 days)
- `first` — number of pools fetched from the subgraph (e.g., top-50 by TVL)
