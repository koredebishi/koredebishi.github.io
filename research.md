---
layout: homepage
title: "Research Overview"
permalink: /research/
---

**Ph.D. Student, Computer Science, University of Georgia**\
**Research Area:** Discrete Event and Discrete Time Simulation | **Application Domain:** Microscopic Traffic Simulation\
Advisor: [Dr. John A. Miller](https://openreview.net/profile?id=~John_A._Miller1) · [ScalaTion Framework](https://github.com/scalation/scalation_2.0) · [PeMS Sensor Data](https://pems.dot.ca.gov/)

---

## 1. Formal Problem Statement

Let **M(θ)** denote a microscopic traffic simulation model parameterized by a vector **θ** containing car-following parameters, arrival process parameters, and structural modeling parameters. Let **D** denote empirical observations from the California Performance Measurement System (PeMS), recorded at lane-level resolution.

The calibration objective is:

> **L(θ) = Error( M(θ), D )**

where error is measured using lane-level flow and speed discrepancies. The dissertation investigates three interconnected questions:

1. Which modeling components materially affect **L(θ)** — and which do not?
2. How do we calibrate **θ** under physically meaningful constraints so that speed accuracy is improved without degrading flow fidelity?
3. Can a validated **M(θ\*)** support counterfactual resilience analysis under extreme disruption where real-world experimentation is infeasible?

## 2. Modeling Foundations

### 2.1 Car-Following Models

Two established car-following formulations are implemented and evaluated:

- **Intelligent Driver Model (IDM)** — continuous acceleration function based on desired speed, spacing, and relative velocity
- **Gipps Model** — safe-speed formulation with explicit reaction time and braking distance parameters

The dissertation does not introduce new car-following theory. It evaluates calibration behavior, lane-level predictive performance, and interaction with arrival processes across both models. Preliminary results show Gipps with Genetic Algorithm achieves the best overall fitness (**1.71 NRMSE×100**) on the US-101 corridor.

### 2.2 Arrival Processes

Vehicle arrivals are modeled using three distributions:

- **Poisson process** — memoryless, no minimum headway constraint
- **Erlang-2 distribution** — reduced variance relative to Poisson
- **Shifted Erlang-2 distribution** — enforces a realistic minimum inter-arrival headway

Study 1 establishes that arrival-process choice is a *structural* modeling decision, not a calibration afterthought. The shifted Erlang-2 distribution reduces flow prediction error by approximately **28%** compared to Poisson by enforcing minimum headway. Arrival processes therefore govern flow accuracy independently of car-following parameter calibration.

### 2.3 Numerical Integration

Vehicle dynamics are integrated using eight numerical schemes ranging from Explicit Euler to Dormand–Prince (RK45). Study 1 demonstrates that integrator choice produces **<1% variation** in lane-level predictive accuracy across all eight methods.

This confirms prior findings (Treiber & Kanagaraj, 2015; Přikryl & Vaniš, 2017) that simple ballistic integration suffices for car-following dynamics, and justifies prioritizing arrival process modeling over integrator refinement in calibration effort.

## 3. Study 1 — Structural Sensitivity Analysis *(ANNSIM 2026, Submitted)*

**Title:** "Beyond Corridor Averages: Lane-Level Validation of Microscopic Freeway Simulation with Data-Driven Arrivals"

### Abstract

Traffic flow modeling is an essential part of civil planning around the world, and traffic simulation is an important component of the analyses that city planners must perform to ensure safe and efficient road networks. This work advances microscopic traffic simulation through lane-level validation of speed and flow dynamics, addressing a critical gap in conventional macro-aggregated approaches. We systematically evaluate the trade-offs between numerical integration methods and vehicle arrival processes when reproducing empirical trajectory data from California's freeway network. Results demonstrate that numerical-integrator choice has negligible impact on simulation accuracy (<1% variation across eight methods), while vehicle arrival-process modeling substantially affects fidelity. The shifted Erlang-2 distribution reduces flow-prediction error by approximately 28% compared to Poisson processes by enforcing a realistic minimum headway. Lane-level validation across five detector stations reveals lane-specific dynamics that aggregated metrics often obscure.

### Research Questions

1. How does the choice of numerical integrator affect lane-level simulation accuracy across eight methods (Euler through Dormand–Prince)?
2. How does the vehicle arrival process affect flow and speed predictions — and which distribution best enforces empirically observed headway constraints?
3. What dynamics does lane-level validation reveal that corridor-level aggregate metrics miss?

### Key Findings

- Integrator choice: **<1% impact** on accuracy across all 8 methods — simple Euler suffices
- **Shifted Erlang-2 arrivals** reduce flow prediction error by ~28% vs. Poisson by enforcing minimum headway
- **Lane-level validation** reveals speed and flow dynamics that corridor-level aggregation obscures

### Significance

These findings direct calibration effort toward the modeling decisions that matter (arrival processes) and away from those that do not (integrators). This structural separation — arrival processes govern flow; car-following parameters govern speed — motivates the constrained calibration design in Study 2.

## 4. Study 2 — Constrained Calibration Framework *(WSC 2026, In Progress)*

**Title:** "Comparative Analysis of Car-Following Models and Optimization Algorithms for Multi-Lane Traffic Simulation Calibration"

### Abstract

Building on the ANNSIM 2026 findings, this work systematically compares car-following models (IDM, Gipps) with multiple optimization algorithms (SPSA, SPSA with momentum, Nelder–Mead, Genetic Algorithm, Differential Evolution) for calibration against PeMS sensor data. A key contribution is the comparison of calibration at two validation levels: corridor-level (macro), where flow and speed are aggregated across all lanes, and lane-level (micro), where each of the four lanes is evaluated independently. We evaluate which combination of model, optimizer, and validation level yields the best predictive accuracy on a US-101 freeway corridor. Preliminary results indicate that calibrating to individual lanes finds parameters that generalize better to corridor-level metrics, suggesting that aggregated corridor calibration obscures dynamics that individual lane validation captures.

### Research Questions

1. On a multi-lane freeway, which car-following model (IDM or Gipps) best reproduces individual lane dynamics?
2. Which optimization algorithm (SPSA, Nelder–Mead, GA, DE) most effectively calibrates model parameters for multi-lane accuracy?
3. Does calibrating to individual lanes versus aggregated corridor totals affect the resulting fit and the parameter values found?

### Experimental Design

- **2 car-following models × 5 optimizers × 2 fitness levels = 20 experimental conditions**
- Physically constrained parameter bounds centered on empirically validated defaults
- Flow-protected fitness function — optimizer penalized for degrading flow accuracy beyond baseline
- HPC deployment on [Georgia Advanced Computing Resource Center (GACRC)](https://gacrc.uga.edu/) — 10 parallel calibration jobs
- Multi-lane validation: 5 detector stations × 4 lanes = 20 individual lane observation points

### Calibration as Optimization

Calibration is formulated as:

> **θ\* = argmin L(θ)** subject to θ ∈ Θ

where **Θ** represents physically plausible bounds and **L(θ)** incorporates both lane-level speed error and a flow-protection penalty. The landscape is nonconvex: preliminary findings show optimizer-dependent convergence to qualitatively different parameter regions, confirming the need for constrained bounds and multiple optimizer comparisons.

### Preliminary Findings

- Lane-level calibration (micro) achieves **19–29% better corridor-level fit** than calibrating to aggregated corridor totals (macro)
- Different optimizers converge to qualitatively different parameter regions — multiple local optima exist
- **Gipps + Genetic Algorithm** achieves best overall fitness (1.71 NRMSE×100)
- Structural separation confirmed: car-following parameters govern speed; arrival processes govern flow

## 5. Validation Framework

All studies validate against [California PeMS](https://pems.dot.ca.gov/) loop-detector data on the US-101 freeway corridor (5 stations × 4 lanes = 20 lane-level observation points).

Primary metrics:

- **RMSE / NRMSE** — normalized root mean squared error for cross-station comparability
- **Flow error** — vehicles per hour per lane, compared against 5-minute PeMS aggregates
- **Speed error** — mean speed per lane per time interval

Lane-level validation reveals dynamics that corridor aggregation masks — particularly lane-specific speed variation, flow heterogeneity across lanes, and differential calibration sensitivity by lane position.

## 6. Study 3 — Wildfire Disruption & Resilience Modeling *(Proposed — Future Work)*

**Title:** "Evaluating Evacuation Resilience Under Wildfire Disruption: A PeMS-Calibrated Microscopic Simulation of I-10 During the 2025 Palisades Fire"

On January 7, 2025, the Palisades Fire triggered mass evacuation along I-10 eastbound in Los Angeles. A recurring policy question — whether directional lane reallocation (contraflow) would have improved evacuation throughput — cannot be answered through real-world experimentation. Simulation is the only feasible evaluation method.

**This study is proposed and has not yet been implemented.** Building on the validated and calibrated model from Studies 1–2, the planned work will:

1. Reproduce normal-day I-10 dynamics using PeMS data and the Study 1–2 calibration methodology
2. Reconstruct the fire-day demand surge and congestion event from PeMS observations
3. Model smoke-induced behavioral degradation (reduced desired speed, increased headway, reduced lane-change aggressiveness) from visibility-impaired driving literature
4. Evaluate structural interventions as network transformation operators under calibrated conditions

Structural interventions to be evaluated:

- Baseline — no structural change
- Partial contraflow
- Full contraflow
- Contraflow under degraded driving behavior

Resilience will be quantified using throughput, congestion clearance time, mean corridor speed, and a performance-loss-area resilience index **R = 1 − (loss area / baseline area)**.

**Target:** Winter Simulation Conference 2026 — *Simulation for Climate Resilience* track.

## 7. Technical Contributions to [ScalaTion](https://github.com/scalation/scalation_2.0)

All implementation extends the [ScalaTion 2.0](https://github.com/scalation/scalation_2.0) simulation framework developed by [Dr. John A. Miller](https://openreview.net/profile?id=~John_A._Miller1) and collaborators at the University of Georgia.

| Contribution | Description |
|---|---|
| **Lane-level validation infrastructure** | Per-lane flow and speed recording with automated PeMS data comparison |
| **Multi-level fitness functions** | Macro (corridor) and micro (lane) calibration objectives with flow-protection constraint |
| **Car-following model suite** | IDM, Gipps, and Krauss dynamics with configurable ODE solvers |
| **Route abstraction** | Doubly-linked segment structure for multi-lane freeway corridors |
| **Ramp modeling** | On-ramp merge behavior using VTransport |
| **HPC calibration pipeline** | SLURM array job orchestration for parallel optimizer evaluation on GACRC |
| **Simulation reporting** | Automated CSV/TXT export of per-sensor, per-lane validation metrics |

## 8. Publications

### Submitted

1. **Bishi, K.R.**, Bowman, J., Miller, J.A. (2026). "Beyond Corridor Averages: Lane-Level Validation of Microscopic Freeway Simulation with Data-Driven Arrivals." *Annual Modeling and Simulation Conference (ANNSIM)*. \[Under Review\]

### In Preparation

2. **Bishi, K.R.**, Miller, J.A. (2026). "Comparative Analysis of Car-Following Models and Optimization Algorithms for Lane-Level Traffic Simulation Calibration." *Winter Simulation Conference (WSC)*. \[Target: April 2026\]
3. **Bishi, K.R.**, Miller, J.A. (2026). "Evaluating Evacuation Resilience Under Wildfire Disruption: A PeMS-Calibrated Microscopic Simulation of I-10 During the 2025 Palisades Fire." *Winter Simulation Conference (WSC) — Simulation for Climate Resilience track*. \[Proposed\]

## 9. Expected Examination Areas

This dissertation spans the following domains — each area below maps directly to a study or methodological component above:

- **Discrete-event and time-stepped simulation theory** — foundations of the ScalaTion framework and car-following integration
- **Simulation-based optimization** — calibration as black-box optimization over a stochastic simulator
- **Stochastic approximation** — SPSA and SPSA with momentum; gradient estimation under noise
- **Derivative-free optimization** — Nelder–Mead simplex method; convergence properties
- **Metaheuristic optimization** — Genetic Algorithm, Differential Evolution; population-based search
- **Car-following model dynamics** — IDM and Gipps formulations; physical parameter interpretation
- **Calibration identifiability** — nonconvex landscape, multiple local optima, parameter sensitivity
- **Lane-level validation philosophy** — why corridor aggregation is insufficient; granularity trade-offs
- **Resilience metric formulation** — performance-loss-area index; counterfactual scenario design

---

[← Back to Homepage](/) · [View Simulation Demos →](/demos/)