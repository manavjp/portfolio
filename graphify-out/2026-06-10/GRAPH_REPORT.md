# Graph Report - portfolio  (2026-06-10)

## Corpus Check
- 57 files · ~2,121,075 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 640 nodes · 769 edges · 59 communities (43 shown, 16 thin omitted)
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 125 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0d3aace7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_UI Components & Interactivity|UI Components & Interactivity]]
- [[_COMMUNITY_Portfolio Design Patterns & PDF Artifacts|Portfolio Design Patterns & PDF Artifacts]]
- [[_COMMUNITY_Astro Page Components|Astro Page Components]]
- [[_COMMUNITY_Vertical Test Stand Hardware|Vertical Test Stand Hardware]]
- [[_COMMUNITY_Horizontal Test Stand Assembly|Horizontal Test Stand Assembly]]
- [[_COMMUNITY_Chart & Motion Library Config|Chart & Motion Library Config]]
- [[_COMMUNITY_GMPR Composite Manufacturing|GMPR Composite Manufacturing]]
- [[_COMMUNITY_Submersible EVA Training Design|Submersible EVA Training Design]]
- [[_COMMUNITY_HTS Structural Analysis & Fabrication|HTS Structural Analysis & Fabrication]]
- [[_COMMUNITY_3D-Printed Rocket Build|3D-Printed Rocket Build]]
- [[_COMMUNITY_Injector Flow Modeling & Test Data|Injector Flow Modeling & Test Data]]
- [[_COMMUNITY_Submersible Scale Prototype Testing|Submersible Scale Prototype Testing]]
- [[_COMMUNITY_Portfolio Visual Identity|Portfolio Visual Identity]]
- [[_COMMUNITY_GMPR Nosecone Detail & Prototyping|GMPR Nosecone Detail & Prototyping]]
- [[_COMMUNITY_Drone Gimbal Research (MacLab)|Drone Gimbal Research (MacLab)]]
- [[_COMMUNITY_Taylor Observatory|Taylor Observatory]]
- [[_COMMUNITY_Arduino Distance Car|Arduino Distance Car]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_Submersible Frame Geometry Calcs|Submersible Frame Geometry Calcs]]
- [[_COMMUNITY_Hotfire Thrust Data|Hotfire Thrust Data]]
- [[_COMMUNITY_Dev Launch Config|Dev Launch Config]]
- [[_COMMUNITY_Claude Code Settings|Claude Code Settings]]
- [[_COMMUNITY_Local Dev Permissions|Local Dev Permissions]]
- [[_COMMUNITY_Rocket Project Team Photos|Rocket Project Team Photos]]
- [[_COMMUNITY_Rocket Review Presentations|Rocket Review Presentations]]
- [[_COMMUNITY_Reynolds Aerial Work|Reynolds Aerial Work]]
- [[_COMMUNITY_Domain Configuration|Domain Configuration]]
- [[_COMMUNITY_D-DIN Font|D-DIN Font]]
- [[_COMMUNITY_Node.js Runtime|Node.js Runtime]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]

## God Nodes (most connected - your core abstractions)
1. `File Map` - 18 edges
2. `../layouts/Layout.astro` - 17 edges
3. `Container` - 15 edges
4. `Container` - 15 edges
5. `🍎 Liquid Glass JS` - 15 edges
6. `Manav Patel — Portfolio Website Build Brief` - 13 edges
7. `File Map` - 12 edges
8. `Button` - 11 edges
9. `Button` - 11 edges
10. `../../layouts/ProjectPageLayout.astro` - 11 edges

## Surprising Connections (you probably didn't know these)
- `ScatteredReports.astro Component` --shares_data_with--> `Cold Flow Test Report 001 (26033 REV A)`  [INFERRED]
  docs/superpowers/plans/2026-05-28-milestone-4-all-projects.md → public/assets/projects/analysis/Cold_Flow_001_26033_REV_A.pdf
- `ScatteredReports.astro Component` --shares_data_with--> `Hydrostatic Test Report 003 (26095 REV A)`  [INFERRED]
  docs/superpowers/plans/2026-05-28-milestone-4-all-projects.md → public/assets/projects/analysis/Hydrostatic_003_26095_REV_A.pdf
- `ScatteredReports.astro Component` --shares_data_with--> `Injector Waterflow Analysis Report`  [INFERRED]
  docs/superpowers/plans/2026-05-28-milestone-4-all-projects.md → public/assets/projects/analysis/_Particularity_ Injector Waterflow Analysis - Google Sheets.pdf
- `Cold Flow Test Report 001 (26033 REV A)` --shares_data_with--> `Two-Phase N2O Injector Flow Model (CoolProp)`  [INFERRED]
  public/assets/projects/analysis/Cold_Flow_001_26033_REV_A.pdf → docs/superpowers/specs/2026-05-28-milestone-3-projects.md
- `Injector Waterflow Analysis Report` --shares_data_with--> `Two-Phase N2O Injector Flow Model (CoolProp)`  [INFERRED]
  public/assets/projects/analysis/_Particularity_ Injector Waterflow Analysis - Google Sheets.pdf → docs/superpowers/specs/2026-05-28-milestone-3-projects.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Milestone 1 Design System: Tokens + Layout + Fonts** — plans_milestone1_tokens_css, plans_milestone1_layout_astro, decisions_font_geist, decisions_styling_plaincss [EXTRACTED 0.95]
- **Project Detail Page Core Components (SpecTable + MetricCallout + Ghost Title)** — plans_milestone3_spectable, plans_milestone3_metriccallout, concept_ghost_title [INFERRED 0.85]
- **Propulsion Data Analysis Artifacts (Cold Flow + Hydrostatic + Waterflow Reports)** — analysis_coldflow_001, analysis_hydrostatic_003, analysis_waterflow [INFERRED 0.85]

## Communities (59 total, 16 thin omitted)

### Community 0 - "UI Components & Interactivity"
Cohesion: 0.11
Nodes (21): ../../components/MetricCallout.astro, ../../components/PdfViewer.astro, applySlider(), keyNav(), renderPage(), snapLeft(), updateTicks(), ../../components/ScatteredReports.astro (+13 more)

### Community 1 - "Portfolio Design Patterns & PDF Artifacts"
Cohesion: 0.06
Nodes (44): Cold Flow Test Report 001 (26033 REV A), Hydrostatic Test Report 003 (26095 REV A), Injector Waterflow Analysis Report, Count-up Number Animation (IntersectionObserver), Engineering Drawing Grid Motif (CSS repeating-linear-gradient), Ghosted Oversized Title Behind Hero (Vast pattern), Project Page Template (hero → spec → metrics → the-work), Scattered Reports Component (CSS fan-stack of PDF cards) (+36 more)

### Community 2 - "Astro Page Components"
Cohesion: 0.08
Nodes (18): astro/components/ClientRouter.astro, ../components/Hero.astro, ../components/ITARTile.astro, ../components/LogoStack.astro, list, ../components/ProgressBar.astro, ../components/ProjectTile.astro, ../components/Sidebar.astro (+10 more)

### Community 3 - "Vertical Test Stand Hardware"
Cohesion: 0.11
Nodes (25): Bolt and Nut Fasteners, Cylindrical Rocket Tank, Lower Cross Bracket Assembly, Unistrut Channel Frame Assembly, Upper Cross Bracket Assembly, Vertical Test Stand CAD Version 1, Bolt Hole Pattern on Restraint, Tank Restraint Assembly Exploded Diagram (+17 more)

### Community 4 - "Horizontal Test Stand Assembly"
Cohesion: 0.10
Nodes (23): HF3 Lab Configuration Photo, Linear Rail Sled Assembly, Orange Protective Cover on Engine Mount, UCLA Lab Environment, HTS Cover CAD Render, Cross Brace Structure, Rocket Engine Tube on Linear Rails, Horizontal Cantilever Test Stand Assembly (+15 more)

### Community 5 - "Chart & Motion Library Config"
Cohesion: 0.10
Nodes (18): ../../components/ThrustChart.astro, config, el, layout, trace, dependencies, astro, @fontsource-variable/geist (+10 more)

### Community 6 - "GMPR Composite Manufacturing"
Cohesion: 0.14
Nodes (20): Composite Body Tube Layup Process, Fiberglass/Composite Body Tube Mandrel, Workshop/Lab Environment for Layup, Composite Fiber Layup Manufacturing Process, GMPR Assembled Rocket - Pre-launch Flight Configuration, Composite Body Tube Section (visible texture in flight config), Fins - GMPR Flight Configuration, Blue Nose Cone - GMPR Flight Configuration (+12 more)

### Community 8 - "Submersible EVA Training Design"
Cohesion: 0.13
Nodes (17): Main Unit Dimensions Whiteboard Calculations, 1/20 Scale Prototype Dimension Calculations, Whiteboard Sketch of Cylindrical Submersible Body, Deployed Submersible Structure Underwater, Space Nation Branding on Submersible Interior, Divers Conducting EVA Training Inside Submersible, Civilian Astronaut EVA Training Mission, Final Configuration Assembled PVC Frame on Trailer (+9 more)

### Community 9 - "HTS Structural Analysis & Fabrication"
Cohesion: 0.12
Nodes (17): Ansys FEA Mesh of HTS Frame Structure, Ansys 2023 R2 Student (FEA Software), Steel Bracket Plates with Weld Seams and Bolt Holes (Damaged/Used), Drill Press Machining Operation on HTS Component, Base Plate (Al 6061-T6, Yield 275 MPa), Bolt (SAE Grade 5, Yield 420 MPa, Ultimate 620 MPa), Bolt Joint Analysis (12.7mm diameter, 127mm² shear area), Brace (Steel, Yield 250 MPa, Ultimate 400 MPa) (+9 more)

### Community 10 - "3D-Printed Rocket Build"
Cohesion: 0.27
Nodes (13): 3D Printer Running — Early Layer Print, 3DPR Cover Photo — Rocket on Launchpad at Night, Rocket Body Weight Measurement — 20.2 g, Rocket Fin Assembly — 3D-Printed Green Fins, 3DPR Launchpad Setup — Night Launch on Athletic Field, Orange Metal Launch Rail Frame, FDM 3D Printing — Manufacturing Method, Rocket Body Mass — 20.2 g (+5 more)

### Community 11 - "Injector Flow Modeling & Test Data"
Cohesion: 0.33
Nodes (11): Pressure Transducer & Load Cell Time-Series Plot, Test Summary Report — Cold Flow Campaign #1, Test Summary Report — Hydrostatic Pressure Test #3, Calibrated NHNE Injector Flow Model — HF2 Injector Calibration Curves, Orifice-Count Iteration Plot — Particularity Injector Design, N2O Oxidizer Cylinders at Test Site — Mojave Desert, HF2 Injector (UCLA Rocket Project), NHNE (Non-Homogeneous Non-Equilibrium) Injector Flow Model (+3 more)

### Community 12 - "Submersible Scale Prototype Testing"
Cohesion: 0.51
Nodes (10): Buoyancy Validation Test, Submersible Scale Prototype in Lab, PVC Pipe Open-Frame Cage Structure, 1/20-Scale Prototype, AdvancingX Submersible V3 Project, Scale Prototype Buoyancy Water Test (Aerial View), Scale Prototype Water Test with Team Members, Scale Prototype Water Entry at Marina (+2 more)

### Community 13 - "Portfolio Visual Identity"
Cohesion: 0.31
Nodes (10): AIAA Logo (American Institute of Aeronautics and Astronautics), Matte Near-Black Dark Theme, Engineering Portfolio Label, Portfolio Homepage Screenshot, Page Load Progress Bar (Accent Red), Open To Opportunities Status Pill, UCLA Samueli School of Engineering Logo, Favicon Background Color #010101 (--bg token) (+2 more)

### Community 14 - "GMPR Nosecone Detail & Prototyping"
Cohesion: 0.53
Nodes (6): Composite Layup Workspace, Nosecone Cap CAD Model (Closeup/Detail View), Nosecone Cap CAD Model (Context View), Nosecone Cap 3D-Printed Prototype, GMPR Composite Rocket Project, GMPR Nosecone Assembly

### Community 15 - "Drone Gimbal Research (MacLab)"
Cohesion: 0.47
Nodes (6): UAV Arm Configuration with Passive Hinge Structure, DfAM Gimbal Joint — Orange 3D-Printed Hub, Over-Actuated UAV System (MacLab Cover), UAV Arm Articulation / Singularity Demonstration, Red-Box Annotations Highlighting Gimbal Joint in 4 Poses, UAV Motion Sequence — 4-Frame Figure (figure1)

### Community 16 - "Taylor Observatory"
Cohesion: 0.40
Nodes (5): Night Sky with Stars — Observatory Setting, Observatory Dome at Night with Red Safety Light, Observatory Dome Building with Telescope Dome Visible, Taylor Observatory Facility at Sunset — Cover Photo, SkyWatcher Telescopes on Concrete Observing Pad

### Community 17 - "Arduino Distance Car"
Cohesion: 0.83
Nodes (4): Arduino Obstacle-Avoidance Robot Car — Profile View, Arduino Robot Car — Front View with Ultrasonic Sensors, Arduino Microcontroller Unit, Ultrasonic Distance Sensor (HC-SR04 style)

### Community 18 - "TypeScript Configuration"
Cohesion: 0.50
Nodes (3): exclude, extends, include

### Community 19 - "Submersible Frame Geometry Calcs"
Cohesion: 0.67
Nodes (3): Circumference and Curved Piece Radius Calculations, Frame Parts Count and Length Calculations, Segment Circumference and Connector Allowance Calculations

### Community 24 - "Rocket Project Team Photos"
Cohesion: 0.67
Nodes (3): Mojave Desert Launch Site with Rocket on Pad in Background, UCLA Rocket Project Team Carrying Rocket in Desert, UCLA Rocket Project Cover — Team Carrying Rocket (Duplicate)

### Community 32 - "Community 32"
Cohesion: 0.05
Nodes (37): 🙏 Acknowledgments, 🔧 Advanced Usage, 📚 API Reference, 🏗️ Architecture, Basic Usage, 🌐 Browser Support, Building, Button Class (+29 more)

### Community 33 - "Community 33"
Cohesion: 0.08
Nodes (23): 0. How to use this file, 10. Quality bar & conventions, 11. Build milestones (review after each), 1. Goal, 2. North star: the portfolio is NOT the resume, 3. Audience and tone, 4.1 Aesthetic concept, 4.2 Reference sites — principles to extract (+15 more)

### Community 34 - "Community 34"
Cohesion: 0.10
Nodes (19): File Map, Milestone 4: All Project Detail Pages, Task 10: Vertical Test Stand & Tank Mount detail page, Task 11: Propulsion Data Analysis detail page, Task 12: Injector Water Flows detail page, Task 13: Submersible V3 detail page, Task 14: UAV Gimbal Joint Design detail page, Task 15: Obstacle Avoidance Embedded System detail page (+11 more)

### Community 37 - "Community 37"
Cohesion: 0.14
Nodes (13): File Map, Milestone 1: Foundation Implementation Plan, Task 10: DECISIONS.md, Task 11: Full build verification + commit, Task 1: Project scaffold files, Task 2: Install dependencies + verify build, Task 3: CSS design tokens, Task 4: Global base styles (+5 more)

### Community 38 - "Community 38"
Cohesion: 0.15
Nodes (12): button1, button2, buttonContainer, containerRow, controlsRow, helloButton, helloRow, nextButton (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.15
Nodes (12): A. Projects Index — Mosaic Layout, B. Horizontal Propulsion Test Stand — Detail Page, Files, Milestone 3: Projects Index + Test Stand Detail Page Design, New Components, Projects Inventory, Rocket Project cluster (hub + 5 sub-projects), Section 1 — Hero Band (+4 more)

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (8): Access Gate, Deploy, Fonts, Framework, Next Project button (liquid-glass-js), Node.js, Root CNAME, Styling

### Community 43 - "Community 43"
Cohesion: 0.20
Nodes (9): File Map, Milestone 3: Projects Index + Test Stand Detail Page, Task 1: ProjectTile component, Task 2: SpecTable component, Task 3: MetricCallout component, Task 4: Projects index — full mosaic, Task 5: Stub pages for all unbuilt project routes, Task 6: Horizontal Propulsion Test Stand — detail page (+1 more)

### Community 44 - "Community 44"
Cohesion: 0.39
Nodes (6): initializeControls(), initializeControlsContainer(), randomizeGlassEffects(), setupControlSliders(), setupMobileToggle(), updateAllGlassInstances()

### Community 45 - "Community 45"
Cohesion: 0.25
Nodes (7): Files, Hub tile fix, Milestone 4: All Project Detail Pages Design, New components, Page content, `ScatteredReports.astro`, `ThrustChart.astro`

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (6): File Map, Milestone 2: Hero Page Implementation Plan, Task 1: Remove main-content padding + add .page-padded utility, Task 2: Wrap stub pages in .page-padded, Task 3: Create Hero.astro, Task 4: Update index.astro + build verification

### Community 47 - "Community 47"
Cohesion: 0.29
Nodes (6): Animation, Background Motif, Content (top → bottom), Files, Layout, Milestone 2: Hero Page Design

### Community 48 - "Community 48"
Cohesion: 0.40
Nodes (5): dA(), FA(), hA(), lA(), UA()

### Community 49 - "Community 49"
Cohesion: 0.40
Nodes (5): E(), H(), I(), p(), wA()

### Community 50 - "Community 50"
Cohesion: 0.40
Nodes (5): ee(), He(), ie(), te(), ye()

### Community 51 - "Community 51"
Cohesion: 0.50
Nodes (4): an(), fn(), Pt(), sn()

### Community 52 - "Community 52"
Cohesion: 0.50
Nodes (4): fe(), KB(), oe(), xB()

### Community 53 - "Community 53"
Cohesion: 0.50
Nodes (4): gr(), Lr(), pr(), SUPPORT_FOREIGNOBJECT_DRAWING()

### Community 54 - "Community 54"
Cohesion: 0.50
Nodes (4): gs(), ns(), rs(), ts()

### Community 55 - "Community 55"
Cohesion: 0.67
Nodes (3): cn(), on(), Qn()

## Knowledge Gaps
- **231 isolated node(s):** `version`, `configurations`, `superpowers@superpowers-marketplace`, `allow`, `helloRow` (+226 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `../layouts/Layout.astro` connect `Astro Page Components` to `UI Components & Interactivity`, `Chart & Motion Library Config`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `../../layouts/ProjectPageLayout.astro` connect `UI Components & Interactivity` to `Astro Page Components`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `version`, `configurations`, `superpowers@superpowers-marketplace` to the rest of the system?**
  _239 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Components & Interactivity` be split into smaller, more focused modules?**
  _Cohesion score 0.11397849462365592 - nodes in this community are weakly interconnected._
- **Should `Portfolio Design Patterns & PDF Artifacts` be split into smaller, more focused modules?**
  _Cohesion score 0.05813953488372093 - nodes in this community are weakly interconnected._
- **Should `Astro Page Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Vertical Test Stand Hardware` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._