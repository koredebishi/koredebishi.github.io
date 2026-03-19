---
layout: homepage
title: "Research Overview"
permalink: /research/
---
<div class="research-page-header">
  <h1>Korede R. Bishi</h1>
  <p><strong>Ph.D. Student, Computer Science, University of Georgia</strong></p>
  <p><strong>Research Area:</strong> Discrete Event Simulation, Empirical Validation, and Agentic Simulation Systems &nbsp;|&nbsp; <strong>Application Domain:</strong> Microscopic Traffic Simulation</p>
  <p>Advisor: <a href="https://openreview.net/profile?id=~John_A._Miller1">Dr. John A. Miller</a> &nbsp;·&nbsp; <a href="https://github.com/scalation/scalation_2.0">ScalaTion Framework</a></p>
</div>

<main class="research-page-content">
  <section class="problem-statement-section">
    <h2>1. Formal Problem Statement</h2>
    <p>Let <strong>M(θ)</strong> denote a microscopic traffic simulation model parameterized by a vector <strong>θ</strong> containing car-following parameters, arrival process parameters, and structural modeling parameters. Let <strong>D</strong> denote empirical observations from loop detectors, recorded at lane-level resolution.</p>
    <p>The calibration objective is:</p>
    <blockquote><p style="text-align:center; font-size:1.1em;"><strong>L(θ) = Error( M(θ), D )</strong></p></blockquote>
    <p>where error is measured using lane-level flow and speed discrepancies. I am investigating three interconnected questions:</p>
    <ol>
      <li>Which modeling components materially affect <strong>L(θ)</strong>, and which do not?</li>
      <li>Can a validated <strong>M(θ*)</strong> support counterfactual infrastructure policy evaluation under extreme disruption where real-world experimentation is infeasible?</li>
      <li>Can an agentic simulation architecture autonomously design, execute, and refine validated discrete-event microscopic traffic simulation experiments at scale?</li>
    </ol>
    <p><strong>Study mapping:</strong> Question 1 corresponds to Study 1 (ANNSIM 2026, accepted), Question 2 corresponds to Study 2 (WSC 2026, in progress), and Question 3 corresponds to Study 3 (dissertation proposal architecture).</p>
  </section>

  <section class="discovery-framing-section">
    <h2>2. Scientific Discovery Framing</h2>
    <p>This proposal targets scientific knowledge discovery through validated, agent-guided discrete-event microscopic traffic simulation experiments that reveal mechanisms, thresholds, and policy-relevant trade-offs under extreme disruption.</p>
  </section>

  <section class="study3-section" id="study-3-proposed-agentic-simulation-architecture">
    <h2>3. Study 3: Agentic Simulation Architecture <em style="font-weight:400; font-size:0.9em;">(In Progress, Dissertation Proposal)</em></h2>

    <h3>Motivation</h3>
    <p>Study 1 establishes that high-fidelity, empirically validated microscopic simulation is achievable. Building on that foundation and ongoing work in Study 2, I am developing a unified agentic architecture where AI-driven agents autonomously design, execute, and refine simulation experiments, grounded in the validated simulation framework.</p>

    <h3>The Core Idea</h3>
    <p>Rather than a researcher manually specifying each simulation scenario, an LLM-driven Agentic Researcher agent reasons over a knowledge graph of the road network, generates structured simulation scenarios via a domain-specific language (DSL), validates them before execution, runs them through the ScalaTion engine, and iteratively refines experiments based on results. This enables scientific knowledge discovery at a scale and speed impossible through manual experimentation, while supporting counterfactual infrastructure policy evaluation.</p>

    <figure class="research-architecture-figure" style="margin: 1.1rem 0; text-align: center;">
      <img src="/images/dissertation-architecture.svg" alt="Proposed agentic simulation architecture diagram" style="max-width: 100%; height: auto; border-radius: 8px;" />
      <figcaption style="font-size: 0.95em; margin-top: 0.5rem; color: inherit;">Proposed agentic simulation architecture for autonomous scenario generation, execution, and refinement.</figcaption>
    </figure>

    <h3>Proposed Architecture: Four Layers</h3>
    <ul>
      <li><strong>Knowledge Layer:</strong> PeMS sensor data, OpenStreetMap road topology, Neo4j knowledge graph</li>
      <li><strong>Agent Layer:</strong> GraphRAG retrieval provides network context to an LLM agent (Agentic Researcher) that autonomously proposes simulation scenarios</li>
      <li><strong>Simulation Layer:</strong> Scenarios are expressed as a Scala DSL, validated before execution, then run through the ScalaTion microscopic simulator</li>
      <li><strong>Evaluation Layer:</strong> Runtime invariant checks protect simulation correctness; metrics feed back to the agent for iterative refinement</li>
    </ul>

    <h3>Evaluation Metrics</h3>
    <ul>
      <li>Flow accuracy: RMSE, NRMSE</li>
      <li>Speed accuracy: NRMSE, sMAPE</li>
      <li>Density: per-segment (derived)</li>
      <li>R², Throughput, Resilience R</li>
    </ul>

    <h3>Expected Contributions</h3>
    <ul>
      <li>Agentic experimentation loop for microscopic traffic simulation</li>
      <li>DSL-based scenario generation that separates LLM reasoning from simulation execution</li>
      <li>Runtime invariant framework ensuring physical validity of agent-generated scenarios</li>
      <li>Scalable exploration of evacuation and infrastructure resilience scenarios</li>
    </ul>
    <p><strong>Status:</strong> In Progress (Dissertation Proposal Stage). This architecture is the long-term dissertation vision and the subject of the candidacy proposal. See the live architecture diagram above.</p>
  </section>

  <section class="study2-section">
    <h2>4. Study 2: Wildfire Evacuation Resilience &amp; Contraflow Evaluation <em style="font-weight:400; font-size:0.9em;">(WSC 2026, In Progress)</em></h2>
    <p><strong>Title:</strong> "Evaluating Evacuation Resilience Under Wildfire Disruption: A PeMS-Calibrated Microscopic Simulation of the I-210/SR-134 Corridor During the 2025 Eaton Fire"</p>

    <h3>Motivation</h3>
    <p>On January 7, 2025, the Eaton Fire triggered mass evacuation along the I-210 / SR-134 corridor (Altadena–Pasadena) in Los Angeles County. Severe congestion degraded corridor performance for hours. A recurring policy question is whether directional lane reallocation (contraflow) would have improved evacuation throughput, but that cannot be answered through real-world experimentation. Simulation provides the only feasible evaluation method.</p>

    <h3>Approach</h3>
    <ol>
      <li><strong>Baseline calibration:</strong> Reproduce normal-day I-210 / SR-134 corridor traffic dynamics using PeMS data and the validated arrival process methodology from Study 1</li>
      <li><strong>Fire-day reconstruction:</strong> Detect demand surge timing from PeMS, reconstruct the congestion event in simulation</li>
      <li><strong>Smoke-behavior modeling:</strong> Translate spatially varying smoke concentration into IDM parameter degradation (reduced desired speed, increased headway, reduced lane-change aggressiveness)</li>
      <li><strong>Hazard-aware routing (DTA):</strong> Re-route vehicles dynamically using a time-dependent cost function that penalizes smoke density and fire proximity</li>
      <li><strong>Counterfactual scenarios:</strong> Evaluate three configurations: normal-day baseline, uncontrolled fire-day evacuation, and contraflow-assisted fire-day evacuation (with hazard-aware DTA active throughout)</li>
    </ol>

    <h3>Evaluation Metrics</h3>
    <ul>
      <li>Evacuation throughput (vehicles/hour)</li>
      <li>Mean corridor speed</li>
      <li>Congestion clearance time</li>
      <li>Resilience index: <strong>R = 1 − (performance loss area / baseline area)</strong></li>
    </ul>

    <h3>Expected Contributions</h3>
    <ul>
      <li>PeMS-calibrated microscopic reconstruction of the 2025 Eaton Fire evacuation along the I-210 / SR-134 corridor</li>
      <li>Smoke-as-behavioral-degradation module for microscopic DES</li>
      <li>Coupled fire-smoke-DTA framework: fire drives smoke, smoke alters traffic, traffic adapts via hazard-aware dynamic routing</li>
      <li>Quantitative counterfactual evaluation of contraflow effectiveness under visibility impairment</li>
    </ul>
    <p><strong>Target:</strong> Winter Simulation Conference 2026, <em>Simulation for Climate Resilience</em> track, with emphasis on counterfactual infrastructure policy evaluation.</p>
  </section>

  <section class="study1-section">
    <h2>5. Study 1: Structural Sensitivity Analysis <em style="font-weight:400; font-size:0.9em;">(ANNSIM 2026, Accepted)</em></h2>
    <p><strong>Title:</strong> "Beyond Corridor Averages: Lane-Level Validation of Microscopic Freeway Simulation with Data-Driven Arrivals"</p>

    <h3>Motivation</h3>
    <p>Microscopic traffic simulators require many modeling choices, including numerical integration schemes, vehicle arrival processes, and time-step resolution, yet the sensitivity of simulation accuracy to these choices is poorly understood. Practitioners often adopt defaults without systematic evaluation.</p>

    <h3>Approach</h3>
    <p>We systematically varied two key modeling decisions, numerical integrator (8 methods, from Euler to Dormand-Prince) and vehicle arrival process (Poisson, Erlang-2, shifted Erlang-2), and evaluated their impact on lane-level flow and speed accuracy across five PeMS detector stations on a US-101 freeway corridor.</p>

    <h3>Key Findings</h3>
    <ul>
      <li>Numerical integrator choice has <strong>&lt;1% impact</strong> on simulation accuracy; simple ballistic integration suffices</li>
      <li>Vehicle <strong>arrival process modeling substantially affects fidelity</strong>; the shifted Erlang-2 distribution reduces flow error by ~28% compared to Poisson by enforcing a realistic minimum headway</li>
      <li><strong>Lane-level validation</strong> reveals dynamics that corridor-level aggregation obscures</li>
    </ul>

    <h3>Significance</h3>
    <p>These findings direct calibration effort toward the modeling decisions that matter (arrival processes) and away from those that do not (integrators), informing the constrained calibration approach in Study 2.</p>
  </section>

  <section class="publications-section">
    <h2>6. Publications</h2>
    <h3>Accepted</h3>
    <ol>
      <li><strong>Bishi, K.R.</strong>, Bowman, J., Miller, J.A. (2026). "Beyond Corridor Averages: Lane-Level Validation of Microscopic Freeway Simulation with Data-Driven Arrivals." <em>Annual Modeling and Simulation Conference (ANNSIM)</em>. <a href="/KoredeCV/2026_annsim_paper_2.pdf" target="_blank">[Accepted]</a></li>
    </ol>
    <h3>In Preparation</h3>
    <ol start="2">
      <li><strong>Bishi, K.R.</strong>, Miller, J.A. (2026). "Evaluating Evacuation Resilience Under Wildfire Disruption: A PeMS-Calibrated Microscopic Simulation of the I-210/SR-134 Corridor During the 2025 Eaton Fire." <em>Winter Simulation Conference (WSC), Simulation for Climate Resilience track</em>. [Target: April 2026]</li>
    </ol>
  </section>

  <section class="contributions-section">
    <h2>7. Technical Contributions to <a href="https://github.com/scalation/scalation_2.0">ScalaTion</a></h2>
    <p>I am actively extending the <a href="https://github.com/scalation/scalation_2.0">ScalaTion 2.0</a> simulation framework developed by <a href="https://openreview.net/profile?id=~John_A._Miller1">Dr. John A. Miller</a> and collaborators at the University of Georgia.</p>
    <table>
      <thead><tr><th>Contribution</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><strong>Lane-level validation infrastructure</strong></td><td>Per-lane flow and speed recording with automated PeMS data comparison</td></tr>
        <tr><td><strong>Multi-level fitness functions</strong></td><td>Macro (corridor) and micro (lane) calibration objectives with flow-protection constraint</td></tr>
        <tr><td><strong>Car-following model suite</strong></td><td>IDM, Gipps, and Krauss dynamics with configurable ODE solvers</td></tr>
        <tr><td><strong>Route abstraction</strong></td><td>Doubly-linked segment structure for multi-lane freeway corridors</td></tr>
        <tr><td><strong>Ramp modeling</strong></td><td>On-ramp merge behavior using VTransport</td></tr>
        <tr><td><strong>HPC calibration pipeline</strong></td><td>SLURM array job orchestration for parallel optimizer evaluation on GACRC</td></tr>
        <tr><td><strong>Simulation reporting</strong></td><td>Automated CSV/TXT export of per-sensor, per-lane validation metrics</td></tr>
      </tbody>
    </table>
  </section>

  <!-- <section class="examination-areas-section">
    <h2>8. Expected Examination Areas</h2>
    <p>This dissertation spans the following domains; each area below maps directly to a study or methodological component above:</p>
    <ul>
      <li><strong>Discrete-event and time-stepped simulation theory</strong>: foundations of the ScalaTion framework and car-following integration</li>
      <li><strong>Simulation-based optimization</strong>: calibration as black-box optimization over a stochastic simulator</li>
      <li><strong>Stochastic approximation</strong>: SPSA and SPSA with momentum; gradient estimation under noise</li>
      <li><strong>Derivative-free optimization</strong>: Nelder–Mead simplex method; convergence properties</li>
      <li><strong>Metaheuristic optimization</strong>: Genetic Algorithm; population-based search</li>
      <li><strong>Car-following model dynamics</strong>: IDM and Gipps formulations; physical parameter interpretation</li>
      <li><strong>Calibration identifiability</strong>: nonconvex landscape, multiple local optima, parameter sensitivity</li>
      <li><strong>Lane-level validation philosophy</strong>: why corridor aggregation is insufficient; granularity trade-offs</li>
      <li><strong>Resilience metric formulation</strong>: performance-loss-area index; counterfactual scenario design</li>
    </ul>
  </section> -->

  <div class="research-nav-buttons" style="clear:both; margin-top:2.5rem;">
    <a class="research-nav-btn" href="/">← Back to Homepage</a>
    <a class="research-nav-btn research-nav-btn-accent" href="/demos/">View Simulation Demos →</a>
  </div>

  <div class="page-footer" style="clear:both; text-align:center; padding:1rem 0;">
    <p>© 2026 Korede R. Bishi | University of Georgia</p>
  </div>
</main>
