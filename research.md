---
layout: homepage
title: "Research Overview"
permalink: /research/
---

<!-- ---
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

 -->

<!-- ===================================================== -->
<!-- TREE STRUCTURE (REFERENCE ONLY – REMOVE WHEN DEPLOYING) -->
<!-- ===================================================== -->

<!--

RESEARCH.MD STRUCTURE

1. Formal Problem Statement
2. Modeling Foundations
   2.1 Car-Following Models
   2.2 Arrival Processes
   2.3 Numerical Integration
3. Calibration as Simulation-Based Optimization
   3.1 Objective Function Design
   3.2 Optimization Algorithms Compared
   3.3 Identifiability & Landscape
4. Validation Framework
5. Disruption & Resilience Modeling (Proposed)
6. Contributions
7. Expected Examination Areas

-->

<!-- ===================================================== -->

<main class="research-page-content">
  <header class="research-page-header">
    <h1>Korede R. Bishi</h1>
    <p><strong>Ph.D. Student, Computer Science, University of Georgia</strong></p>
  </header>

  <section class="problem-statement-section">
    <h2>1. Formal Problem Statement</h2>
    <p>Let \( M(\theta) \) denote a microscopic traffic simulation model parameterized by a vector \( \theta \) containing:</p>
    <ul>
      <li>Car-following parameters</li>
      <li>Arrival process parameters</li>
      <li>Structural modeling parameters</li>
    </ul>
    <p>Let \( D \) denote empirical observations from the California Performance Measurement System (PeMS), recorded at lane-level resolution.</p>
    <p>The calibration objective can be expressed conceptually as:</p>
    <p>\[</p>
    <p>L(\theta) = \text{Error}(M(\theta), D)</p>
    <p>\]</p>
    <p>where error is measured using lane-level flow and speed discrepancies.</p>
    <p>The dissertation investigates:</p>
    <ol>
      <li>Which modeling components materially affect \( L(\theta) \)</li>
      <li>How to calibrate \( \theta \) under physically meaningful constraints</li>
      <li>Whether a validated \( M(\theta^*) \) can support counterfactual resilience analysis under disruption</li>
    </ol>
  </section>

  <section class="modeling-foundations-section">
    <h2>2. Modeling Foundations</h2>

    <section class="car-following-models-section">
      <h3>2.1 Car-Following Models</h3>
      <p>Two established car-following formulations are implemented and evaluated:</p>
      <ul>
        <li>Intelligent Driver Model (IDM)</li>
        <li>Gipps Model</li>
      </ul>
      <p>These govern vehicle acceleration and speed adaptation based on spacing and relative velocity.</p>
      <p>The dissertation does not introduce new car-following theory, but evaluates:</p>
      <ul>
        <li>Their calibration behavior</li>
        <li>Their lane-level predictive performance</li>
        <li>Their interaction with arrival processes</li>
      </ul>
    </section>

    <section class="arrival-processes-section">
      <h3>2.2 Arrival Processes</h3>
      <p>Vehicle arrivals are modeled using:</p>
      <ul>
        <li>Poisson process</li>
        <li>Erlang-2 distribution</li>
        <li>Shifted Erlang-2 distribution</li>
      </ul>
      <p>Study 1 establishes that arrival-process choice materially affects flow accuracy, particularly through minimum headway enforcement.</p>
      <p>Arrival processes therefore form a structural component of the simulation rather than a calibration afterthought.</p>
    </section>

    <section class="numerical-integration-section">
      <h3>2.3 Numerical Integration</h3>
      <p>Vehicle dynamics are simulated using multiple numerical integration schemes, including:</p>
      <ul>
        <li>Explicit Euler</li>
        <li>Higher-order Runge–Kutta methods</li>
        <li>Dormand–Prince</li>
      </ul>
      <p>Study 1 demonstrates that integrator choice produces negligible (&lt;1%) variation in lane-level predictive accuracy relative to arrival-process selection.</p>
      <p>This finding justifies prioritizing arrival modeling over integrator refinement in calibration.</p>
    </section>
  </section>

  <section class="calibration-section">
    <h2>3. Calibration as Simulation-Based Optimization</h2>
    <p>Calibration is formulated as a simulation-based optimization problem:</p>
    <p>\[</p>
    <p>\theta^* = \arg\min_{\theta \in \Theta} L(\theta)</p>
    <p>\]</p>
    <p>where \( \Theta \) represents physically plausible parameter bounds.</p>

    <section class="objective-function-section">
      <h3>3.1 Objective Function Design</h3>
      <p>The calibration objective incorporates:</p>
      <ul>
        <li>Lane-level speed error</li>
        <li>Lane-level flow error</li>
        <li>Flow-protection constraint (to prevent speed optimization from degrading flow fidelity)</li>
      </ul>
      <p>Two validation levels are compared:</p>
      <ul>
        <li>Corridor-level aggregation</li>
        <li>Lane-level independent evaluation</li>
      </ul>
    </section>

    <section class="optimization-algorithms-section">
      <h3>3.2 Optimization Algorithms Compared</h3>
      <p>Five derivative-free or stochastic optimization methods are evaluated:</p>
      <ul>
        <li>SPSA (stochastic approximation)</li>
        <li>SPSA with momentum</li>
        <li>Nelder–Mead (direct search)</li>
        <li>Genetic Algorithm</li>
        <li>Differential Evolution</li>
      </ul>
      <p>The study compares:</p>
      <ul>
        <li>Convergence behavior</li>
        <li>Sensitivity to initialization</li>
        <li>Resulting parameter regions</li>
        <li>Generalization from lane-level to corridor-level metrics</li>
      </ul>
    </section>

    <section class="identifiability-section">
      <h3>3.3 Identifiability & Calibration Landscape</h3>
      <p>Preliminary findings indicate:</p>
      <ul>
        <li>Multiple local optima in parameter space</li>
        <li>Optimizer-dependent convergence regions</li>
        <li>Structural separation between parameters governing speed and arrival processes governing flow</li>
      </ul>
      <p>This highlights the nonconvex nature of simulation-based calibration and motivates constrained parameter bounds.</p>
    </section>
  </section>

  <section class="validation-framework-section">
    <h2>4. Validation Framework</h2>
    <p>Validation is performed at lane-level resolution across five PeMS detector stations.</p>
    <p>Metrics include:</p>
    <ul>
      <li>RMSE / NRMSE</li>
      <li>Flow error</li>
      <li>Speed error</li>
    </ul>
    <p>Lane-level validation reveals dynamics that corridor aggregation masks, particularly:</p>
    <ul>
      <li>Lane-specific speed variation</li>
      <li>Flow heterogeneity</li>
      <li>Differential calibration sensitivity</li>
    </ul>
    <p>This validation framework underpins all subsequent scenario analysis.</p>
  </section>

  <section class="resilience-modeling-section">
    <h2>5. Disruption & Resilience Modeling (Proposed)</h2>
    <p>Building on the validated and calibrated model, the proposed dissertation study will extend the framework to wildfire disruption analysis.</p>
    <p>Planned components:</p>
    <ol>
      <li>Reconstruction of I-10 traffic conditions during the January 7, 2025 Palisades Fire using PeMS data</li>
      <li>Behavioral degradation modeling under smoke exposure</li>
      <li>Structural intervention modeling as network transformation operators</li>
    </ol>
    <p>Structural interventions to be evaluated include:</p>
    <ul>
      <li>Baseline (no structural change)</li>
      <li>Partial contraflow</li>
      <li>Full contraflow</li>
      <li>Contraflow under degraded driving behavior</li>
    </ul>
    <p>Resilience will be quantified using:</p>
    <ul>
      <li>Throughput</li>
      <li>Congestion clearance time</li>
      <li>Mean corridor speed</li>
      <li>Performance-loss-area-based resilience index</li>
    </ul>
    <p>This study is proposed and has not yet been implemented.</p>
  </section>

  <section class="contributions-section">
    <h2>6. Contributions</h2>
    <p>This research contributes:</p>
    <ul>
      <li>Lane-level validation methodology integrated with empirical PeMS data</li>
      <li>Comparative analysis of numerical integration and arrival processes</li>
      <li>Constrained simulation-based calibration framework</li>
      <li>Comparative evaluation of stochastic approximation, direct search, and metaheuristic optimization</li>
      <li>Structural intervention modeling within a validated discrete-event simulation framework</li>
    </ul>
    <p>All implementation extends the ScalaTion simulation platform.</p>
  </section>

  <section class="examination-areas-section">
    <h2>7. Expected Examination Areas</h2>
    <p>This dissertation spans:</p>
    <ul>
      <li>Discrete-event and time-stepped simulation theory</li>
      <li>Simulation-based optimization</li>
      <li>Stochastic approximation (SPSA)</li>
      <li>Derivative-free optimization (Nelder–Mead)</li>
      <li>Metaheuristic optimization (GA, DE)</li>
      <li>Car-following model dynamics (IDM, Gipps)</li>
      <li>Calibration identifiability</li>
      <li>Lane-level validation philosophy</li>
      <li>Resilience metric formulation</li>
    </ul>
  </section>

  <div class="research-nav-buttons">
    <a class="research-nav-btn" href="/">← Back to Homepage</a>
    <a class="research-nav-btn research-nav-btn-accent" href="/demos/">View Simulation Demos →</a>
  </div>

  <footer class="research-page-footer">
    <p>© 2026 Korede R. Bishi | University of Georgia</p>
  </footer>
</main>
