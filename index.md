<!-- ---
layout: homepage
---

<div class="research-banner">
  <div class="research-banner-label">Candidacy Research</div>
  <h3>Discrete Event Simulation, Calibration &amp; Resilience<br><span style="font-size:0.85em; font-weight:600;">Lane-Level Microscopic Traffic Modeling with PeMS Validation</span></h3>
  <p>Three connected studies: (1) identifying which modeling choices materially affect accuracy, (2) constrained calibration of car-following models, and (3) wildfire evacuation resilience analysis under disruption scenarios.</p>
  <a class="research-banner-btn" href="/research/">Read Full Research Overview</a>
</div>

## About

Hello! I'm Korede, a third-year Computer Science Ph.D. student at the University of Georgia working in the ScalaTion research group with [Dr. John A. Miller](https://openreview.net/profile?id=~John_A._Miller1) ([Google Scholar](https://scholar.google.com/citations?user=K7j2Uk8AAAAJ&hl=en)). My dissertation focuses on building trustworthy microscopic traffic simulation models for high-stakes infrastructure decisions where field experimentation is not feasible in order to answer what-if scenerio questions in dynamic complex systems. 

Hello! I'm Korede, a third-year Computer Science Ph.D. student at the University of Georgia working in the Modeling, Simulation & Analytics Lab (MSAL) under the supervision of [Dr. John A. Miller](https://openreview.net/profile?id=~John_A._Miller1) ([Google Scholar](https://scholar.google.com/citations?user=K7j2Uk8AAAAJ&hl=en)). My research centers on lane-level traffic simulation, trustworthy AI, and digital twins that adapt to urban mobility dynamics in real time.

I extend the open-source [Scalation 2.0](https://github.com/scalation/scalation_2.0) framework with lane-level validation, constrained calibration pipelines, and scenario-analysis tooling using California PeMS sensor data.

## Research Interests

- Discrete event/time-stepped simulation for transportation systems
- Lane-level validation and calibration of microscopic freeway models
- Constrained optimization for physically valid simulation parameters
- Infrastructure resilience analysis under extreme disruption (e.g., wildfire evacuation)
- Trustworthy AI/ML for high-stakes mobility and public policy applications

{% include_relative _includes/publications.md %}

## Coursework

- **Simulation & Modeling:** Discrete Event Simulation, Transportation Planning
- **Systems & Infrastructure:** Algorithms, Software Engineering, Computer Networks, Cloud Computing, Advanced Distributed Systems
- **Machine Learning & AI:** Trustworthy Machine Learning, Advanced Representation Learning, Machine Learning in IoT
- **Human-Centered Computing:** Advanced Topics in Human-Centered Computing

{% include_relative _includes/services.md %}

## Stay in Touch

[LinkedIn](https://www.linkedin.com/in/koredebishi/) · [ORCID](https://orcid.org/0009-0003-4123-4428) · [GitHub](https://github.com/koredebishi) · [Email](mailto:korede.bishi@uga.edu) -->



---
layout: homepage
---

<!-- ===================================================== -->
<!-- TREE STRUCTURE (REFERENCE ONLY – REMOVE WHEN DEPLOYING) -->
<!-- ===================================================== -->

<!--

INDEX.MD STRUCTURE

1. Header
2. About
3. Dissertation Theme
4. Research Architecture
   - Study 1
   - Study 2
   - Study 3
5. Methodological Contributions
6. Examination Domains

-->

<!-- ===================================================== -->

<main class="homepage-content">
  <header class="page-header">
    <h1>Korede R. Bishi</h1>
    <p><strong>Ph.D. Student, Computer Science, University of Georgia</strong></p>
    <p><strong>Research Area:</strong> Discrete Event Simulation, Calibration, and Infrastructure Resilience<br><strong>Application Domain:</strong> Microscopic Traffic Simulation</p>
  </header>

  <section class="about-section">
    <h2>About</h2>
    <p>I am a third-year Ph.D. student in Computer Science at the University of Georgia working in the Modeling, Simulation & Analytics Lab (MSAL) under the supervision of Dr. John A. Miller.</p>
    <p>My research focuses on discrete-event and time-stepped simulation, simulation-based optimization, and lane-level validation of microscopic traffic models using empirical sensor data from the California Performance Measurement System (PeMS).</p>
    <p>I extend the ScalaTion simulation framework with lane-level validation, constrained calibration infrastructure, and structural intervention modeling for high-stakes infrastructure scenarios.</p>
  </section>

  <section class="dissertation-theme-section">
    <h2>Dissertation Theme</h2>
    <p>My dissertation investigates the following central question:</p>
    <blockquote>
      <p><strong>Can we construct lane-level microscopic traffic simulations that are sufficiently validated and calibrated to support counterfactual resilience analysis under extreme disruption — where real-world experimentation is infeasible?</strong></p>
    </blockquote>
    <p>This research integrates:</p>
    <ul>
      <li>Discrete-event and time-stepped simulation</li>
      <li>Simulation-based optimization</li>
      <li>Lane-level empirical validation</li>
      <li>Infrastructure resilience modeling</li>
    </ul>
    <p>The objective is to build data-calibrated digital twins capable of evaluating structural interventions under high-stakes conditions.</p>
  </section>

  <section class="research-architecture-section">
    <h2>Research Architecture</h2>

    <section class="study-section study-1">
      <h3>Study 1 — Structural Sensitivity Analysis</h3>
      <p><em>ANNSIM 2026 (Submitted)</em></p>
      <p>This study isolates which modeling decisions materially affect simulation accuracy, evaluating:</p>
      <ul>
        <li>Eight numerical integration methods</li>
        <li>Multiple vehicle arrival processes</li>
        <li>Lane-level flow and speed validation across five PeMS stations</li>
      </ul>
      <p><strong>Finding:</strong> Integrator choice has negligible impact (&lt;1%), while arrival-process modeling substantially affects flow fidelity. Lane-level validation reveals dynamics obscured by corridor aggregation.</p>
    </section>

    <section class="study-section study-2">
      <h3>Study 2 — Constrained Calibration Framework</h3>
      <p><em>WSC 2026 (In Progress)</em></p>
      <p>This study develops and evaluates a simulation-based optimization framework for calibrating car-following models under physically grounded constraints.</p>
      <p>Components:</p>
      <ul>
        <li>Models: IDM, Gipps</li>
        <li>Optimizers: SPSA, SPSA with momentum, Nelder–Mead, Genetic Algorithm, Differential Evolution</li>
        <li>Flow-protected fitness design</li>
        <li>Lane-level vs corridor-level validation</li>
      </ul>
      <p>The study examines optimizer-dependent convergence behavior and parameter identifiability in a nonconvex calibration landscape.</p>
    </section>

      <section class="study-section study-3">
    <h3>Study 3 — Wildfire Disruption & Resilience Evaluation</h3>
    <p><em>Dissertation Study (Proposed)</em></p>
    <p>
      This proposed study will investigate how a lane-level calibrated microscopic simulation can be used to evaluate structural interventions under wildfire-induced disruption.
    </p>
    <p>
      Using PeMS data from I-10 during the January 7, 2025 Palisades Fire, the study will:
    </p>
    <ol>
      <li>Extend the calibrated digital twin developed in Studies 1–2 to the I-10 corridor</li>
      <li>Reconstruct observed demand surge and congestion dynamics during the fire event</li>
      <li>Incorporate smoke-induced behavioral degradation effects (e.g., reduced desired speed, increased headway, reduced lane-change aggressiveness)</li>
      <li>Evaluate structural intervention scenarios under calibrated conditions</li>
    </ol>
    <p>
      Structural interventions will be modeled as network transformation operators, including:
    </p>
    <ul>
      <li>No intervention (baseline reconstruction)</li>
      <li>Partial contraflow</li>
      <li>Full contraflow</li>
      <li>Contraflow under degraded driving behavior</li>
    </ul>
    <p>
      Evaluation metrics will include throughput, congestion clearance time, mean corridor speed, and a resilience index defined through performance-loss area relative to baseline conditions.
    </p>
    <p>
      The objective of this study is not to advocate a specific intervention, but to assess whether a validated microscopic digital twin can provide defensible counterfactual insight under extreme infrastructure disruption.
    </p>
  </section>

</section>

  <section class="methodological-contributions-section">
    <h2>Methodological Contributions</h2>
    <ul>
      <li>Lane-level validation integrated with PeMS data</li>
      <li>Flow-protected calibration objective design</li>
      <li>Comparative evaluation of stochastic approximation, direct search, and metaheuristic optimization</li>
      <li>Structural intervention modeling within a calibrated discrete-event framework</li>
      <li>HPC-based calibration deployment for reproducible experimentation</li>
    </ul>
  </section>

  <section class="examination-domains-section">
    <h2>Examination Domains</h2>
    <ul>
      <li>Discrete-event and time-stepped simulation theory</li>
      <li>Simulation-based optimization and stochastic approximation</li>
      <li>Derivative-free optimization methods</li>
      <li>Car-following model dynamics</li>
      <li>Lane-level validation methodology</li>
      <li>Resilience metric formulation under structural perturbation</li>
    </ul>
  </section>

  <footer class="page-footer">
    <p>© 2026 Korede R. Bishi | University of Georgia</p>
  </footer>
</main>
