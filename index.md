---
layout: homepage
---

## About

I am a third-year Ph.D. student in Computer Science at the University of Georgia working in the Modeling, Simulation & Analytics Lab (MSAL) under the supervision of [Dr. John A. Miller](https://openreview.net/profile?id=~John_A._Miller1).

My research focuses on discrete-event and time-stepped simulation, simulation-based optimization, and lane-level validation of microscopic traffic models using empirical sensor data from the [California Performance Measurement System (PeMS)](https://pems.dot.ca.gov/).

I extend the [ScalaTion 2.0](https://github.com/scalation/scalation_2.0) simulation framework with lane-level validation, constrained calibration infrastructure, and structural intervention modeling for high-stakes infrastructure scenarios.

## Dissertation Theme

My dissertation investigates the following central question:

> **Can we construct lane-level microscopic traffic simulations that are sufficiently validated and calibrated to support counterfactual resilience analysis under extreme disruption — where real-world experimentation is infeasible?**

This research integrates:

- Discrete-event and time-stepped simulation
- Simulation-based optimization
- Lane-level empirical validation
- Infrastructure resilience modeling

The objective is to build data-calibrated digital twins capable of evaluating structural interventions under high-stakes conditions.

## Candidacy Research

**Discrete Event Simulation, Calibration & Resilience — Lane-Level Microscopic Traffic Modeling with PeMS Validation**

Three connected studies: (1) identifying which modeling choices materially affect accuracy, (2) constrained calibration of car-following models, and (3) wildfire evacuation resilience analysis under disruption scenarios.

[Read Full Research Overview →](/research/)

## Research Architecture

### Study 1 — Structural Sensitivity Analysis *(ANNSIM 2026, Submitted)*

- **Integrator choice:** <1% impact across all 8 methods — simple Euler suffices
- **Shifted Erlang-2 arrivals** reduce flow prediction error by ~28% vs. Poisson by enforcing minimum headway
- **Lane-level validation** reveals speed and flow dynamics that corridor aggregation obscures

These findings establish that arrival processes govern flow accuracy and car-following parameters govern speed — a structural separation that motivates Study 2's calibration design.

### Study 2 — Constrained Calibration Framework *(WSC 2026, In Progress)*

- **Lane-level calibration generalizes 19–29% better** to corridor metrics than calibrating to aggregated corridor totals
- **Gipps + Genetic Algorithm** achieves best overall fitness (1.71 NRMSE×100)
- Multiple local optima confirmed — optimizer-dependent convergence to different parameter regions

Structural separation confirmed: car-following parameters govern speed; arrival processes govern flow.

### Study 3 — Wildfire Disruption & Resilience Evaluation *(Proposed — Future Work)*

Using PeMS data from I-10 during the January 7, 2025 Palisades Fire, this study will evaluate structural interventions (contraflow scenarios) under calibrated conditions. Interventions include baseline, partial contraflow, full contraflow, and contraflow under degraded driving behavior.

## Methodological Contributions

- Lane-level validation integrated with PeMS data
- Flow-protected calibration objective design
- Comparative evaluation of stochastic approximation, direct search, and metaheuristic optimization
- Structural intervention modeling within a calibrated discrete-event framework
- HPC-based calibration deployment for reproducible experimentation

## Examination Domains

- Discrete-event and time-stepped simulation theory
- Simulation-based optimization
- Stochastic approximation — SPSA and SPSA with momentum
- Derivative-free optimization — Nelder–Mead simplex method
- Metaheuristic optimization — Genetic Algorithm, Differential Evolution
- Car-following model dynamics — IDM and Gipps formulations
- Calibration identifiability and nonconvex landscape structure
- Lane-level validation philosophy
- Resilience metric formulation under structural perturbation

{% include_relative _includes/publications.md %}

{% include_relative _includes/services.md %}