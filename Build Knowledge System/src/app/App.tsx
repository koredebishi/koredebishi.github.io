import { motion } from "motion/react";
import { 
  Radio, 
  Map, 
  Database, 
  Network, 
  Brain, 
  FileCode, 
  ShieldCheck, 
  Settings, 
  CheckCircle2, 
  BarChart3,
  RefreshCw
} from "lucide-react";
import { SystemNode } from "./components/SystemNode";
import { ConnectionPath } from "./components/ConnectionPath";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl tracking-tight text-gray-900 mb-2">
            AutoTrafficSim: An Agentic Framework for Autonomous Traffic Scenario Synthesis
          </h1>
          <p className="text-sm text-gray-600 font-mono">
            GraphRAG-Enhanced LLM Agent System for Microscopic Traffic Simulation
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-3">
            <span>NeurIPS 2026</span>
            <span>•</span>
            <span>Safety-Critical AI Systems Track</span>
          </div>
        </motion.div>

        {/* Main Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl border border-gray-200 p-8"
        >
          <div className="mb-6">
            <h2 className="text-base text-gray-900 mb-1 tracking-tight">
              System Architecture: Continuous Experimentation Loop
            </h2>
            <p className="text-xs text-gray-600 max-w-3xl">
              Closed-loop autonomous system with integrated knowledge retrieval, agentic reasoning, formal verification, and adaptive feedback.
            </p>
          </div>

          {/* SVG Architecture Diagram */}
          <div className="w-full overflow-x-auto">
            <svg 
              viewBox="0 0 1200 700" 
              className="w-full h-auto"
              style={{ minHeight: '600px' }}
            >
              {/* Definitions for arrows and effects */}
              <defs>
                <marker
                  id="arrowhead-data"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
                </marker>
                <marker
                  id="arrowhead-feedback"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#DC2626" />
                </marker>
                <marker
                  id="arrowhead-control"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#8B5CF6" />
                </marker>
                <marker
                  id="arrowhead-gradient"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#3B82F6" />
                </marker>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Knowledge Foundation (Left Side) */}
              <SystemNode
                x={30}
                y={50}
                width={180}
                height={90}
                title="PeMS Traffic Data"
                subtitle="Real-time Sensor Network"
                icon={Radio}
                specs={["5-min flows", "40K+ detectors", "Speed/volume/occ"]}
                delay={0.3}
                color="#EFF6FF"
              />

              <SystemNode
                x={30}
                y={160}
                width={180}
                height={90}
                title="OpenStreetMap"
                subtitle="Road Network Topology"
                icon={Map}
                specs={["Graph structure", "Lane geometry", "Constraints"]}
                delay={0.35}
                color="#EFF6FF"
              />

              <SystemNode
                x={30}
                y={270}
                width={180}
                height={90}
                title="Neo4j Knowledge Graph"
                subtitle="Domain Ontology"
                icon={Database}
                specs={["1M+ nodes", "5M+ edges", "Rich semantics"]}
                delay={0.4}
                color="#EFF6FF"
              />

              {/* GraphRAG Module (Left-Center) */}
              <SystemNode
                x={250}
                y={140}
                width={200}
                height={130}
                title="GraphRAG Retrieval"
                subtitle="Hybrid Retrieval System"
                icon={Network}
                specs={[
                  "text-embedding-3-large",
                  "BFS + PageRank",
                  "Cross-encoder rerank",
                  "Top-k=15 contexts"
                ]}
                delay={0.5}
                color="#DBEAFE"
                glowColor="#3B82F6"
              />

              {/* Central Agent (Center) */}
              <SystemNode
                x={490}
                y={100}
                width={220}
                height={170}
                title="LLM Agent (Junior Researcher)"
                subtitle="GPT-4-Turbo with CoT"
                icon={Brain}
                specs={[
                  "Scenario synthesis",
                  "Hypothesis generation",
                  "Temperature: 0.7/0.2",
                  "128K context window",
                  "Tool use: DSL, sampler"
                ]}
                delay={0.6}
                color="#FAF5FF"
                glowColor="#8B5CF6"
              />

              {/* Simulation Pipeline (Right-Center) */}
              <SystemNode
                x={750}
                y={50}
                width={180}
                height={85}
                title="Scenario DSL"
                subtitle="YAML Configuration"
                icon={FileCode}
                specs={["Traffic patterns", "Event triggers", "Constraints"]}
                delay={0.7}
                color="#FFF7ED"
              />

              <SystemNode
                x={750}
                y={155}
                width={180}
                height={85}
                title="Formal Validator"
                subtitle="Pre-sim Verification"
                icon={ShieldCheck}
                specs={["Schema check", "Physical bounds", "Safety props"]}
                delay={0.75}
                color="#FFF7ED"
              />

              <SystemNode
                x={750}
                y={260}
                width={180}
                height={100}
                title="ScalaTion Engine"
                subtitle="Microscopic Simulator"
                icon={Settings}
                specs={["IDM car-following", "MOBIL lane-change", "Δt=0.1s, T=1hr"]}
                delay={0.8}
                color="#FFF7ED"
              />

              {/* Evaluation Layer (Right Side) */}
              <SystemNode
                x={970}
                y={100}
                width={200}
                height={95}
                title="Runtime Invariant Monitor"
                subtitle="Safety & Liveness"
                icon={CheckCircle2}
                specs={[
                  "LTL specifications",
                  "Collision detection",
                  "Throughput bounds"
                ]}
                delay={0.85}
                color="#F0FDF4"
              />

              <SystemNode
                x={970}
                y={215}
                width={200}
                height={95}
                title="Metrics Computation"
                subtitle="Multi-Objective Eval"
                icon={BarChart3}
                specs={[
                  "Travel time, TTC, PET",
                  "KL-div vs PeMS",
                  "Pareto efficiency"
                ]}
                delay={0.9}
                color="#F0FDF4"
              />

              {/* Feedback Loop Indicator */}
              <g>
                <motion.rect
                  x={480}
                  y={420}
                  width={240}
                  height={70}
                  rx="35"
                  fill="#FEF2F2"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                />
                <foreignObject x={480} y={420} width={240} height={70}>
                  <div className="h-full flex items-center justify-center gap-2 px-4">
                    <RefreshCw className="size-5 text-red-600 animate-spin" style={{ animationDuration: '3s' }} />
                    <div className="text-center">
                      <div className="text-sm font-medium text-red-700">Adaptive Feedback Loop</div>
                      <div className="text-[10px] text-red-600 font-mono">Continuous Refinement</div>
                    </div>
                  </div>
                </foreignObject>
              </g>

              {/* Connections */}
              
              {/* Knowledge sources to GraphRAG */}
              <ConnectionPath
                d="M 210 95 Q 230 95 250 140"
                delay={0.45}
                type="data"
              />
              <ConnectionPath
                d="M 210 205 L 250 205"
                delay={0.47}
                type="data"
              />
              <ConnectionPath
                d="M 210 315 Q 230 315 250 270"
                delay={0.49}
                type="data"
              />

              {/* GraphRAG to Agent */}
              <ConnectionPath
                d="M 450 205 Q 470 205 490 185"
                delay={0.55}
                type="gradient"
              />

              {/* Agent to DSL - routed to avoid overlap */}
              <ConnectionPath
                d="M 710 115 Q 730 115 750 105"
                delay={0.65}
                type="control"
              />

              {/* Agent to Validator - second output */}
              <ConnectionPath
                d="M 710 165 Q 730 165 750 175"
                delay={0.67}
                type="control"
              />

              {/* DSL to Validator */}
              <ConnectionPath
                d="M 840 135 L 840 155"
                delay={0.73}
                type="data"
              />

              {/* Validator to Simulator */}
              <ConnectionPath
                d="M 840 240 L 840 260"
                delay={0.78}
                type="data"
              />

              {/* Simulator to Invariant Monitor */}
              <ConnectionPath
                d="M 930 295 Q 950 295 970 195"
                delay={0.83}
                type="data"
              />

              {/* Simulator to Metrics */}
              <ConnectionPath
                d="M 930 325 Q 950 325 970 280"
                delay={0.85}
                type="data"
              />

              {/* Metrics to Agent (Feedback) - routed below everything */}
              <ConnectionPath
                d="M 970 310 L 970 380 Q 970 400 950 400 L 280 400 Q 260 400 260 380 L 260 340 Q 260 320 280 320 L 460 320 Q 480 320 480 300 L 480 270"
                delay={0.95}
                type="feedback"
              />

              {/* Invariant Monitor to Agent (Feedback) - routed around metrics path */}
              <ConnectionPath
                d="M 1170 147 L 1190 147 Q 1210 147 1210 167 L 1210 500 Q 1210 520 1190 520 L 240 520 Q 220 520 220 500 L 220 340 Q 220 320 240 320 L 420 320 Q 440 320 440 300 L 440 270"
                delay={1.0}
                type="feedback"
              />

              {/* Agent self-loop for reasoning - cleaner arc */}
              <ConnectionPath
                d="M 680 100 Q 680 70 600 70 Q 520 70 520 100"
                delay={1.1}
                type="control"
              />

            </svg>
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="#6B7280" strokeWidth="2"/></svg>
                <span className="text-gray-600">Data Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="#3B82F6" strokeWidth="2"/></svg>
                <span className="text-gray-600">Gradient Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="#DC2626" strokeWidth="2.5"/></svg>
                <span className="text-gray-600">Feedback Loop</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5"/></svg>
                <span className="text-gray-600">Control Signal</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 font-mono">
              Figure 1: Closed-loop autonomous experimentation architecture
            </div>
          </motion.div>
        </motion.div>

        {/* Key Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-6 bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
        >
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-4 font-medium">
            Key Contributions
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div className="flex gap-3">
              <span className="text-blue-600 font-mono text-base">1.</span>
              <span>First end-to-end agentic framework integrating GraphRAG with microscopic traffic simulation for autonomous scenario synthesis</span>
            </div>
            <div className="flex gap-3">
              <span className="text-blue-600 font-mono text-base">2.</span>
              <span>Novel closed-loop architecture combining formal verification, runtime monitoring, and LLM-based adaptive experimentation</span>
            </div>
            <div className="flex gap-3">
              <span className="text-blue-600 font-mono text-base">3.</span>
              <span>Demonstrated 10× improvement in scenario diversity and 3× reduction in safety violations through continuous self-refinement</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
