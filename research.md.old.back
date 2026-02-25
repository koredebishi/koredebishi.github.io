---
layout: homepage
title: "Research Overview"
permalink: /research/
---

# Korede R. Bishi
**Ph.D. Student, Computer Science, [University of Georgia](https://www.uga.edu/)**

**Research Area:** Discrete Event and Discrete Time Simulation  
**Application Domain:** Microscopic Traffic Simulation

---

## Research Overview

I am a PhD student in the Simulation and Analytics track, extending the **[ScalaTion](https://github.com/scalation/scalation_2.0) framework** (developed by [Dr. John A. Miller](https://openreview.net/profile?id=~John_A._Miller1) ([Google Scholar](https://scholar.google.com/citations?user=K7j2Uk8AAAAJ&hl=en)) and collaborators) to support microscopic traffic simulation with rigorous validation against real-world sensor data.

My work focuses on two complementary methodological studies:

1. **ANNSIM 2026:** Investigating numerical integration methods and arrival processes for traffic microsimulation
2. **WSC 2026:** Comparative analysis of car-following models and optimization algorithms for simulation calibration

Both studies emphasize **lane-level validation**—evaluating simulation accuracy at individual lane granularity rather than corridor aggregates—using data from the California Performance Measurement System ([PeMS](https://pems.dot.ca.gov/)).

---

## Study 1: Numerical Integration and Arrival Processes
*ANNSIM 2026 (Submitted)*

**Title:** "Beyond Corridor Averages: Lane-Level Validation of Microscopic Freeway Simulation with Data-Driven Arrivals"

**Abstract:**  
Traffic flow modeling is an essential part of civil planning around the world, and traffic simulation is an important component of the analyses that city planners must perform to ensure safe and efficient road networks for their citizens. This work advances microscopic traffic simulation through lane-level validation of speed and flow dynamics, addressing a critical gap in conventional macro-aggregated approaches. We systematically evaluate the trade-offs between numerical integration methods and vehicle arrival processes when reproducing empirical trajectory data from California's freeway network. Results demonstrate that numerical-integrator choice has negligible impact on simulation accuracy, with less than one percent variation across eight methods, while vehicle arrival-process modeling substantially affects fidelity. The shifted Erlang-2 distribution reduces flow-prediction error by approximately 28% compared to Poisson processes by enforcing a realistic minimum headway. Lane-level validation across five detector stations reveals lane-specific dynamics that aggregated metrics often obscure.

**Research Questions:**
- How does the choice of numerical integrator affect simulation accuracy?
- How does the vehicle arrival process affect flow and speed predictions?
- What dynamics does lane-level validation reveal that corridor-level metrics miss?

**Key Findings:**
- Numerical integrator choice has **<1% impact** on simulation accuracy across 8 methods (Euler through Dormand-Prince)
- **Shifted Erlang-2 arrivals** reduce flow prediction error by ~28% compared to Poisson processes
- Lane-level validation reveals speed and flow dynamics that aggregated metrics obscure

**Significance:**  
These findings confirm prior work (Treiber & Kanagaraj, 2015; Přikryl & Vaniš, 2017) that simple ballistic integration suffices for car-following models, while highlighting that arrival process modeling deserves greater attention.

---

## Study 2: Car-Following Models and Optimization Algorithms
*WSC 2026 (In Progress)*

**Title:** "Comparative Analysis of Car-Following Models and Optimization Algorithms for Multi-Lane Traffic Simulation Calibration"

**Abstract:**  
Building on our ANNSIM 2026 findings, this work systematically compares car-following models (IDM, Gipps) with multiple optimization algorithms (SPSA, SPSA with momentum, Nelder-Mead, Genetic Algorithm, Differential Evolution) for calibration against [PeMS](https://pems.dot.ca.gov/) sensor data. A key contribution is the comparison of calibration at two validation levels on a multi-lane freeway: corridor-level (macro), where flow and speed are aggregated across all lanes as a single unit, and lane-level (micro), where each of the four lanes is evaluated independently. We evaluate which combination of model, optimizer, and validation level yields the best predictive accuracy on a US-101 freeway corridor. Preliminary results indicate that calibrating to individual lanes finds parameters that generalize better to corridor-level metrics, suggesting that treating lanes as a single aggregated unit obscures dynamics that individual lane validation captures.

**Research Questions:**
- On a multi-lane freeway, which car-following model (IDM, Gipps) best reproduces individual lane dynamics?
- Which optimization algorithm (SPSA, Nelder-Mead, GA, DE) most effectively calibrates model parameters for multi-lane accuracy?
- Does calibrating to individual lanes versus aggregated corridor totals affect the resulting fit and parameter values?

**Experimental Design:**
- 2 car-following models × 5 optimizers × 2 fitness levels = 20 experimental conditions
- HPC deployment on [Georgia Advanced Computing Resource Center (GACRC)](https://gacrc.uga.edu/)
- Multi-lane validation: 5 detector stations × 4 lanes = 20 individual lane observation points

**Preliminary Findings:**
- Calibrating to individual lanes (micro) achieves 19-29% better corridor-level fit than calibrating to aggregated totals (macro)
- Different validation approaches lead to different optimal parameter values
- Gipps with GA achieves best overall fitness (1.71 NRMSE*100)

---

## Technical Contributions to [ScalaTion](https://github.com/scalation/scalation_2.0)

Extending the [ScalaTion](https://github.com/scalation/scalation_2.0) framework, I have contributed:

| Contribution | Description |
|--------------|-------------|
| **Lane-level validation infrastructure** | Per-lane flow and speed recording with PeMS data comparison |
| **Multi-level fitness functions** | Macro (corridor) and micro (lane) fitness computation |
| **Route abstraction** | Doubly-linked segment structure for multi-lane corridors |
| **Ramp modeling** | On-ramp merge behavior using VTransport |
| **HPC deployment pipeline** | SLURM array job orchestration for parallel calibration |

---

## Publications

### Submitted
1. **Bishi, K.R.**, Bowman, J., Miller, J.A. (2026). "Beyond Corridor Averages: Lane-Level Validation of Microscopic Freeway Simulation with Data-Driven Arrivals." *Annual Modeling and Simulation Conference (ANNSIM)*. [Under Review]

### In Preparation
2. **Bishi, K.R.**, Miller, J.A. (2026). "Comparative Analysis of Car-Following Models and Optimization Algorithms for Lane-Level Traffic Simulation Calibration." *Winter Simulation Conference (WSC)*. [Target: April 2026]

---

## About [ScalaTion](https://github.com/scalation/scalation_2.0)

**[ScalaTion](https://github.com/scalation/scalation_2.0)** is a Scala-based framework for simulation, optimization, and analytics developed by Dr. John A. Miller and collaborators at the [University of Georgia](https://www.uga.edu/). The framework supports:

- **Multiple simulation paradigms:** Process-oriented, event-driven, and time-stepped simulation
- **Continuous-time models within discrete-event frameworks:** e.g., IDM car-following integrated via configurable ODE solvers
- **Native optimization:** SPSA, Nelder-Mead, Differential Evolution, Genetic Algorithms
- **Analytics:** Statistical modeling, machine learning, and database connectivity

My work extends [ScalaTion](https://github.com/scalation/scalation_2.0)'s traffic simulation capabilities for microscopic freeway modeling with real-world validation.

---

## Education

**Ph.D. Computer Science** (In Progress)  
[University of Georgia](https://www.uga.edu/)  
Advisor: Dr. John A. Miller  
Track: Simulation and Analytics

**Relevant Coursework:**
- Algorithms, Software Engineering, Computer Networks
- Cloud Computing, Advanced Distributed Systems
- Trustworthy Machine Learning, Advanced Representation Learning
- Transportation Planning (Spring 2026)

---

## Contact

**Email:** korede.bishi@uga.edu  
**Advisor:** Dr. John A. Miller  
**Lab:** Modeling, Simulation & Analytics Lab (MSAL), [University of Georgia](https://www.uga.edu/)

<div class="research-nav-buttons">
  <a class="research-nav-btn" href="/">← Back to Homepage</a>
  <a class="research-nav-btn research-nav-btn-accent" href="/demos/">View Simulation Demos →</a>
</div>

© 2026 Korede R. Bishi | [University of Georgia](https://www.uga.edu/)
