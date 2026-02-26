---
layout: homepage
title: "Research Overview"
permalink: /research/
---
<div class="research-page-header">
  <h1>Korede R. Bishi</h1>
  <p><strong>Ph.D. Student, Computer Science, University of Georgia</strong></p>
  <p><strong>Research Area:</strong> Discrete Event Simulation and Discrete Time Simulation &nbsp;|&nbsp; <strong>Application Domain:</strong> Microscopic Traffic Simulation</p>
  <p>Advisor: <a href="https://openreview.net/profile?id=~John_A._Miller1">Dr. John A. Miller</a> &nbsp;·&nbsp; <a href="https://github.com/scalation/scalation_2.0">ScalaTion Framework</a> &nbsp;·&nbsp; <a href="https://pems.dot.ca.gov/">PeMS Sensor Data</a></p>
</div>

<main class="research-page-content">
  <section class="problem-statement-section">
    <h2>1. Formal Problem Statement</h2>
    <p>Let <strong>M(θ)</strong> denote a microscopic traffic simulation model parameterized by a vector <strong>θ</strong> containing car-following parameters, arrival process parameters, and structural modeling parameters. Let <strong>D</strong> denote empirical observations from the California Performance Measurement System (PeMS), recorded at lane-level resolution.</p>
    <p>The calibration objective is:</p>
    <blockquote><p style="text-align:center; font-size:1.1em;"><strong>L(θ) = Error( M(θ), D )</strong></p></blockquote>
    <p>where error is measured using lane-level flow and speed discrepancies. The dissertation investigates three interconnected questions:</p>
    <ol>
      <li>Which modeling components materially affect <strong>L(θ)</strong> — and which do not?</li>
      <li>How do we calibrate <strong>θ</strong> under physically meaningful constraints so that speed accuracy is improved without degrading flow fidelity?</li>
      <li>Can a validated <strong>M(θ*)</strong> support counterfactual resilience analysis under extreme disruption where real-world experimentation is infeasible?</li>
    </ol>
  </section>

  <section class="modeling-foundations-section">
    <h2>2. Modeling Foundations</h2>

    <section class="car-following-models-section">
      <h3>2.1 Car-Following Models</h3>
      <p>Two established car-following formulations are implemented and evaluated:</p>
      <ul>
        <li><strong>Intelligent Driver Model (IDM)</strong> — continuous acceleration function based on desired speed, spacing, and relative velocity</li>
        <li><strong>Gipps Model</strong> — safe-speed formulation with explicit reaction time and braking distance parameters</li>
      </ul>
      <p>The dissertation does not introduce new car-following theory. It evaluates calibration behavior, lane-level predictive performance, and interaction with arrival processes across both models. Preliminary results show Gipps with Genetic Algorithm achieves the best overall fitness (<strong>1.71 NRMSE×100</strong>) on the US-101 corridor.</p>
    </section>

    <section class="arrival-processes-section">
      <h3>2.2 Arrival Processes</h3>
      <p>Vehicle arrivals are modeled using three distributions:</p>
      <ul>
        <li><strong>Poisson process</strong> — memoryless, no minimum headway constraint</li>
        <li><strong>Erlang-2 distribution</strong> — reduced variance relative to Poisson</li>
        <li><strong>Shifted Erlang-2 distribution</strong> — enforces a realistic minimum inter-arrival headway</li>
      </ul>
      <p>Study 1 establishes that arrival-process choice is a <em>structural</em> modeling decision, not a calibration afterthought. The shifted Erlang-2 distribution reduces flow prediction error by approximately <strong>28%</strong> compared to Poisson by enforcing minimum headway — a finding consistent with prior work on headway distributions in freeway microsimulation.</p>
      <p>Arrival processes therefore govern flow accuracy independently of car-following parameter calibration.</p>
    </section>

    <section class="numerical-integration-section">
      <h3>2.3 Numerical Integration</h3>
      <p>Vehicle dynamics are integrated using eight numerical schemes ranging from Explicit Euler to Dormand–Prince (RK45). Study 1 demonstrates that integrator choice produces <strong>&lt;1% variation</strong> in lane-level predictive accuracy across all eight methods.</p>
      <p>This confirms prior findings (Treiber &amp; Kanagaraj, 2015; Přikryl &amp; Vaniš, 2017) that simple ballistic integration suffices for car-following dynamics, and justifies prioritizing arrival process modeling over integrator refinement in calibration effort.</p>
    </section>
  </section>

  <section class="study1-section">
    <h2>3. Study 1 — Structural Sensitivity Analysis <em style="font-weight:400; font-size:0.9em;">(ANNSIM 2026, Submitted)</em></h2>
    <p><strong>Title:</strong> "Beyond Corridor Averages: Lane-Level Validation of Microscopic Freeway Simulation with Data-Driven Arrivals"</p>

    <h3>Abstract</h3>
    <p>Traffic flow modeling is an essential part of civil planning around the world, and traffic simulation is an important component of the analyses that city planners must perform to ensure safe and efficient road networks. This work advances microscopic traffic simulation through lane-level validation of speed and flow dynamics, addressing a critical gap in conventional macro-aggregated approaches. We systematically evaluate the trade-offs between numerical integration methods and vehicle arrival processes when reproducing empirical trajectory data from California's freeway network. Results demonstrate that numerical-integrator choice has negligible impact on simulation accuracy (&lt;1% variation across eight methods), while vehicle arrival-process modeling substantially affects fidelity. The shifted Erlang-2 distribution reduces flow-prediction error by approximately 28% compared to Poisson processes by enforcing a realistic minimum headway. Lane-level validation across five detector stations reveals lane-specific dynamics that aggregated metrics often obscure.</p>

    <h3>Research Questions</h3>
    <ol>
      <li>How does the choice of numerical integrator affect lane-level simulation accuracy across eight methods (Euler through Dormand–Prince)?</li>
      <li>How does the vehicle arrival process affect flow and speed predictions — and which distribution best enforces empirically observed headway constraints?</li>
      <li>What dynamics does lane-level validation reveal that corridor-level aggregate metrics miss?</li>
    </ol>

    <h3>Key Findings</h3>
    <ul>
      <li>Integrator choice: <strong>&lt;1% impact</strong> on accuracy across all 8 methods — simple Euler suffices</li>
      <li><strong>Shifted Erlang-2 arrivals</strong> reduce flow prediction error by ~28% vs. Poisson by enforcing minimum headway</li>
      <li><strong>Lane-level validation</strong> reveals speed and flow dynamics that corridor-level aggregation obscures</li>
    </ul>

    <h3>Significance</h3>
    <p>These findings direct calibration effort toward the modeling decisions that matter (arrival processes) and away from those that do not (integrators). This structural separation — arrival processes govern flow; car-following parameters govern speed — motivates the constrained calibration design in Study 2.</p>
  </section>

  <section class="study2-section">
    <h2>4. Study 2 — Constrained Calibration Framework <em style="font-weight:400; font-size:0.9em;">(WSC 2026, In Progress)</em></h2>
    <p><strong>Title:</strong> "Comparative Analysis of Car-Following Models and Optimization Algorithms for Multi-Lane Traffic Simulation Calibration"</p>

    <h3>Abstract</h3>
    <p>Building on the ANNSIM 2026 findings, this work systematically compares car-following models (IDM, Gipps) with multiple optimization algorithms (SPSA, SPSA with momentum, Nelder–Mead, Genetic Algorithm, Differential Evolution) for calibration against PeMS sensor data. A key contribution is the comparison of calibration at two validation levels: corridor-level (macro), where flow and speed are aggregated across all lanes, and lane-level (micro), where each of the four lanes is evaluated independently. We evaluate which combination of model, optimizer, and validation level yields the best predictive accuracy on a US-101 freeway corridor. Preliminary results indicate that calibrating to individual lanes finds parameters that generalize better to corridor-level metrics, suggesting that aggregated corridor calibration obscures dynamics that individual lane validation captures.</p>

    <h3>Research Questions</h3>
    <ol>
      <li>On a multi-lane freeway, which car-following model (IDM or Gipps) best reproduces individual lane dynamics?</li>
      <li>Which optimization algorithm (SPSA, Nelder–Mead, GA, DE) most effectively calibrates model parameters for multi-lane accuracy?</li>
      <li>Does calibrating to individual lanes versus aggregated corridor totals affect the resulting fit and the parameter values found?</li>
    </ol>

    <h3>Experimental Design</h3>
    <ul>
      <li><strong>2 car-following models × 5 optimizers × 2 fitness levels = 20 experimental conditions</strong></li>
      <li>Physically constrained parameter bounds centered on empirically validated defaults</li>
      <li>Flow-protected fitness function — optimizer penalized for degrading flow accuracy beyond baseline</li>
      <li>HPC deployment on <a href="https://gacrc.uga.edu/">Georgia Advanced Computing Resource Center (GACRC)</a> — 10 parallel calibration jobs</li>
      <li>Multi-lane validation: 5 detector stations × 4 lanes = 20 individual lane observation points</li>
    </ul>

    <h3>Calibration as Optimization</h3>
    <p>Calibration is formulated as:</p>
    <blockquote><p style="text-align:center; font-size:1.1em;"><strong>θ* = argmin<sub>θ ∈ Θ</sub> L(θ)</strong></p></blockquote>
    <p>where <strong>Θ</strong> represents physically plausible bounds and <strong>L(θ)</strong> incorporates both lane-level speed error and a flow-protection penalty. The landscape is nonconvex: preliminary findings show optimizer-dependent convergence to qualitatively different parameter regions, confirming the need for constrained bounds and multiple optimizer comparisons.</p>

    <h3>Preliminary Findings</h3>
    <ul>
      <li>Lane-level calibration (micro) achieves <strong>19–29% better corridor-level fit</strong> than calibrating to aggregated corridor totals (macro)</li>
      <li>Different optimizers converge to qualitatively different parameter regions — multiple local optima exist</li>
      <li><strong>Gipps + Genetic Algorithm</strong> achieves best overall fitness (1.71 NRMSE×100)</li>
      <li>Structural separation confirmed: car-following parameters govern speed; arrival processes govern flow</li>
    </ul>
  </section>

  <section class="validation-framework-section">
    <h2>5. Validation Framework</h2>
    <p>All studies validate against <a href="https://pems.dot.ca.gov/">California PeMS</a> loop-detector data on the US-101 freeway corridor (5 stations × 4 lanes = 20 lane-level observation points).</p>
    <p>Primary metrics:</p>
    <ul>
      <li><strong>RMSE / NRMSE</strong> — normalized root mean squared error for cross-station comparability</li>
      <li><strong>Flow error</strong> — vehicles per hour per lane, compared against 5-minute PeMS aggregates</li>
      <li><strong>Speed error</strong> — mean speed per lane per time interval</li>
    </ul>
    <p>Lane-level validation reveals dynamics that corridor aggregation masks particularly lane-specific speed variation, flow heterogeneity across lanes, and differential calibration sensitivity by lane position. This granularity is what motivates the entire lane-level validation philosophy of this dissertation.</p>
  </section>

  <section class="resilience-modeling-section">
    <h2>6. Study 3 — Wildfire Disruption &amp; Resilience Modeling <em style="font-weight:400; font-size:0.9em;">(Proposed — Future Work)</em></h2>
    <p><strong>Title:</strong> "Evaluating Evacuation Resilience Under Wildfire Disruption: A PeMS-Calibrated Microscopic Simulation of I-10 During the 2025 Palisades Fire"</p>
    <p>On January 7, 2025, the Palisades Fire triggered mass evacuation along I-10 eastbound in Los Angeles. A recurring policy question — whether directional lane reallocation (contraflow) would have improved evacuation throughput — cannot be answered through real-world experimentation. Simulation is the only feasible evaluation method.</p>
    <p><strong>This study is proposed and has not yet been implemented.</strong> Building on the validated and calibrated model from Studies 1–2, the planned work will:</p>
    <ol>
      <li>Reproduce normal-day I-10 dynamics using PeMS data and the Study 1–2 calibration methodology</li>
      <li>Reconstruct the fire-day demand surge and congestion event from PeMS observations</li>
      <li>Model smoke-induced behavioral degradation (reduced desired speed, increased headway, reduced lane-change aggressiveness) from visibility-impaired driving literature</li>
      <li>Evaluate structural interventions as network transformation operators under calibrated conditions</li>
    </ol>
    <p>Structural interventions to be evaluated:</p>
    <ul>
      <li>Baseline — no structural change</li>
      <li>Partial contraflow</li>
      <li>Full contraflow</li>
      <li>Contraflow under degraded driving behavior</li>
    </ul>
    <p>Resilience will be quantified using throughput, congestion clearance time, mean corridor speed, and a performance-loss-area resilience index <strong>R = 1 − (loss area / baseline area)</strong>.</p>
    <p><strong>Target:</strong> Winter Simulation Conference 2026 — <em>Simulation for Climate Resilience</em> track.</p>
  </section>

  <section class="contributions-section">
    <h2>7. Technical Contributions to <a href="https://github.com/scalation/scalation_2.0">ScalaTion</a></h2>
    <p>All implementation extends the <a href="https://github.com/scalation/scalation_2.0">ScalaTion 2.0</a> simulation framework developed by <a href="https://openreview.net/profile?id=~John_A._Miller1">Dr. John A. Miller</a> and collaborators at the University of Georgia.</p>
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

  <section class="publications-section">
    <h2>8. Publications</h2>
    <h3>Submitted</h3>
    <ol>
      <li><strong>Bishi, K.R.</strong>, Bowman, J., Miller, J.A. (2026). "Beyond Corridor Averages: Lane-Level Validation of Microscopic Freeway Simulation with Data-Driven Arrivals." <em>Annual Modeling and Simulation Conference (ANNSIM)</em>. [Under Review]</li>
    </ol>
    <h3>In Preparation</h3>
    <ol start="2">
      <li><strong>Bishi, K.R.</strong>, Miller, J.A. (2026). "Comparative Analysis of Car-Following Models and Optimization Algorithms for Lane-Level Traffic Simulation Calibration." <em>Winter Simulation Conference (WSC)</em>. [Target: April 2026]</li>
      <li><strong>Bishi, K.R.</strong>, Miller, J.A. (2026). "Evaluating Evacuation Resilience Under Wildfire Disruption: A PeMS-Calibrated Microscopic Simulation of I-10 During the 2025 Palisades Fire." <em>Winter Simulation Conference (WSC) — Simulation for Climate Resilience track</em>. [Proposed]</li>
    </ol>
  </section>

  <section class="examination-areas-section">
    <h2>9. Expected Examination Areas</h2>
    <p>This dissertation spans the following domains — each area below maps directly to a study or methodological component above:</p>
    <ul>
      <li><strong>Discrete-event and time-stepped simulation theory</strong> — foundations of the ScalaTion framework and car-following integration</li>
      <li><strong>Simulation-based optimization</strong> — calibration as black-box optimization over a stochastic simulator</li>
      <li><strong>Stochastic approximation</strong> — SPSA and SPSA with momentum; gradient estimation under noise</li>
      <li><strong>Derivative-free optimization</strong> — Nelder–Mead simplex method; convergence properties</li>
      <li><strong>Metaheuristic optimization</strong> — Genetic Algorithm, Differential Evolution; population-based search</li>
      <li><strong>Car-following model dynamics</strong> — IDM and Gipps formulations; physical parameter interpretation</li>
      <li><strong>Calibration identifiability</strong> — nonconvex landscape, multiple local optima, parameter sensitivity</li>
      <li><strong>Lane-level validation philosophy</strong> — why corridor aggregation is insufficient; granularity trade-offs</li>
      <li><strong>Resilience metric formulation</strong> — performance-loss-area index; counterfactual scenario design</li>
    </ul>
  </section>

  <div class="research-nav-buttons" style="clear:both; margin-top:2.5rem;">
    <a class="research-nav-btn" href="/">← Back to Homepage</a>
    <a class="research-nav-btn research-nav-btn-accent" href="/demos/">View Simulation Demos →</a>
  </div>

  <div class="page-footer" style="clear:both; text-align:center; padding:1rem 0;">
    <p>© 2026 Korede R. Bishi | University of Georgia</p>
  </div>
</main>
