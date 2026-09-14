import {
  PackageCheck,
  Layers,
  Microscope,
  ShieldCheck,
  Clock,
  ShieldAlert,
  Award,
  TrendingUp,
  Thermometer,
  Cpu,
  Activity,
  Scissors,
  Flame,
  CheckCircle2,
  Zap,
  DollarSign,
  Wifi,
  Boxes,
  Radio,
  Sparkles,
  Maximize2,
  RadioTower,
  Lock,
  Factory,
  BatteryCharging,
  Server,
  FileCode,
  Settings,
  Truck,
  Eye,
  Wrench,
  Gauge,
  CheckSquare,
  Target
} from 'lucide-react';

export const servicesData = [
  // SMT SERVICES
  {
    id: "smt-pcb-assembly",
    category: "SMT",
    num: "SMT — 01",
    title: "SMT PCB Assembly",
    titleSpan: "Services",
    desc: "High-speed automated Surface Mount Technology (SMT) assembly for complex, high-density printed circuit boards with micro-inch accuracy.",
    img: "/assets/service_smt_pcb_assembly.jpg",
    link: "/smt-pcb-assembly.html",
    highlights: ["01005 Micro Component SMT", "Fine-Pitch BGA & QFN", "High-Speed SMT Lines"],
    story: [
      "Aeroscan Technologies delivers high-precision Surface Mount Technology (SMT) assembly for prototype and high-volume production runs. Our automated high-speed SMT placement lines handle micro-passives down to 01005, ultra-fine pitch QFNs, BGAs, and complex CSP devices with outstanding accuracy.",
      "Every SMT assembly process is supported by high-precision stencil printing, multi-zone convection reflow ovens operating under inert nitrogen atmospheres, and automated 3D optical inspection to guarantee robust solder joints and zero defects.",
      "From rapid 24-hour turnaround NPI prototypes to high-volume commercial production, our SMT facility adheres strictly to IPC-A-610 Class 2 and Class 3 quality standards."
    ],
    features: [
      { title: "High-Speed Pick & Place", text: "Automated dual-gantry placement machines placing up to 60,000 components per hour.", icon: Cpu },
      { title: "Micro-Pitch BGA & QFN", text: "Ultra-fine pitch placement for complex multi-ball BGAs and leadless QFN packages.", icon: Layers },
      { title: "Nitrogen Reflow Convection", text: "10-zone reflow convection ovens under nitrogen to prevent solder oxidation.", icon: Flame },
      { title: "3D AOI Solder Inspection", text: "Integrated 3D optical scanning ensuring perfect solder fillet formation and alignment.", icon: Microscope }
    ],
    benefits: [
      { num: "01", title: "Rapid Prototype Turnaround", text: "Accelerated 24–48 hour prototype assembly to meet tight product launch windows.", icon: Clock },
      { num: "02", title: "Zero Defect Guarantee", text: "Multi-stage automated optical and physical inspection ensuring 99.8% first-pass yield.", icon: CheckCircle2 },
      { num: "03", title: "IPC Class 3 Compliance", text: "Rigorous standards suitable for medical, industrial, and high-reliability electronics.", icon: Award },
      { num: "04", title: "Scalable Capacity", text: "Smooth transition from prototype batches to millions of units per year.", icon: TrendingUp }
    ]
  },
  {
    id: "pick-place-assembly",
    category: "SMT",
    num: "SMT — 02",
    title: "Pick & Place Assembly",
    titleSpan: "Process",
    desc: "Ultra-precise robotic pick and place component mounting with dual-vision camera alignment for flawless surface mount positioning.",
    img: "/assets/service_pick_place_assembly.jpg",
    link: "/pick-place-assembly.html",
    highlights: ["Dual-Vision Camera System", "Micro-Nozzle Precision", "Smart Feeder Tracking"],
    story: [
      "Our Pick & Place assembly capability forms the backbone of modern high-density PCB production. Using state-of-the-art pick and place robotics equipped with dual-vision optical recognition systems, we position components down to 01005 size with 15-micron precision.",
      "Smart feeder inventory systems continuously monitor component feeding, preventing part orientation errors or reel shortages during continuous high-speed assembly runs.",
      "Whether mounting fine-pitch microcontrollers, RF modules, or dense passive arrays, our pick and place technology ensures rapid cycle times and error-free component placement."
    ],
    features: [
      { title: "Dual Vision Alignment", text: "Real-time camera inspection of component leads prior to placement.", icon: Eye },
      { title: "Micro-Nozzle Technology", text: "Precision vacuum nozzles designed for ultra-small 01005 and 0201 chips.", icon: Cpu },
      { title: "Smart Tape & Reel Feeders", text: "Barcode-tracked feeder slots ensuring exact BOM part verification.", icon: PackageCheck },
      { title: "High placement Speed", text: "Multi-head gantry architecture capable of placement speeds up to 60k CPH.", icon: Zap }
    ],
    benefits: [
      { num: "01", title: "Sub-Micron Accuracy", text: "Precise component alignment eliminates short circuits and misaligned pads.", icon: Target },
      { num: "02", title: "Full Component Versatility", text: "Handles passives, ICs, connectors, odd-form SMDs, and shield cans effortlessly.", icon: Layers },
      { num: "03", title: "Low Setup Downtime", text: "Quick feeder changeovers enable rapid prototype switching.", icon: Clock },
      { num: "04", title: "Traceable Assembly", text: "Full component reel tracking linked to serial numbers for ISO compliance.", icon: ShieldCheck }
    ]
  },
  {
    id: "solder-paste-printing",
    category: "SMT",
    num: "SMT — 03",
    title: "Solder Paste Printing",
    titleSpan: "Precision",
    desc: "Laser-cut stencil solder paste printing with automated 2D/3D solder paste inspection (SPI) for consistent volume deposition.",
    img: "/assets/service_solder_paste_printing.jpg",
    link: "/solder-paste-printing.html",
    highlights: ["3D Solder Paste Inspection", "Laser-Cut Stainless Stencils", "Auto Squeegee Control"],
    story: [
      "Solder paste printing is the critical first step in SMT assembly. At Aeroscan Technologies, we utilize high-precision automatic stencil printers with controlled squeegee pressure, snap-off speed, and fiducial vision alignment.",
      "Every printed PCB passes through inline 3D Solder Paste Inspection (SPI) to measure solder paste height, volume, area coverage, and bridge prevention before component placement begins.",
      "We strictly store solder paste in temperature-controlled environments and employ electro-polished laser-cut stainless steel stencils for micro-BGA and fine-pitch pads."
    ],
    features: [
      { title: "Inline 3D SPI Inspection", text: "Volumetric 3D laser measurement of every printed solder deposit.", icon: Microscope },
      { title: "Precision Stencil Alignment", text: "Optical vision alignment aligning stencil openings to PCB pads under 10 microns.", icon: Target },
      { title: "Closed-Loop Squeegee System", text: "Digital pressure feedback maintaining exact paste rolling bead height.", icon: Gauge },
      { title: "Cleanroom Paste Management", text: "Refrigerated paste storage and automatic jar conditioning.", icon: Thermometer }
    ],
    benefits: [
      { num: "01", title: "Eliminates Solder Bridging", text: "Controlling paste volume prevents solder shorts under fine-pitch BGAs.", icon: ShieldAlert },
      { num: "02", title: "Consistent Joint Strength", text: "Exact paste volume guarantees optimal mechanical and electrical bonding.", icon: CheckCircle2 },
      { num: "03", title: "Zero Solder Tombstoning", text: "Uniform deposit heights eliminate thermal imbalance during reflow.", icon: Flame },
      { num: "04", title: "Optimized Stencil Life", text: "Automated stencil cleaning cycles maintain clean apertures throughout production.", icon: Sparkles }
    ]
  },
  {
    id: "reflow-soldering",
    category: "SMT",
    num: "SMT — 04",
    title: "Reflow Soldering",
    titleSpan: "Technology",
    desc: "Multi-zone forced convection thermal reflow soldering under nitrogen (N2) atmosphere for lead-free & leaded PCB assemblies.",
    img: "/assets/service_reflow_soldering.jpg",
    link: "/reflow-soldering.html",
    highlights: ["10+ Convection Zones", "Nitrogen Inerting (N2)", "Precise Thermal Profiles"],
    story: [
      "Our reflow soldering process utilizes multi-zone forced convection ovens capable of precise thermal profiling tailored to board mass, layer count, and component temperature limits.",
      "Operating under an inert nitrogen (N2) atmosphere lowers oxygen concentrations to sub-100 PPM, preventing pad oxidation, improving solder wetting, and producing shiny, void-free solder joints.",
      "Real-time thermal profiling sensors track preheat, soak, liquidus time (TAL), and peak reflow temperatures to comply with SAC305 lead-free and SnPb leaded specifications."
    ],
    features: [
      { title: "10+ Independent Temp Zones", text: "Top and bottom heating zones for pinpoint thermal ramp and cooling curves.", icon: Thermometer },
      { title: "Inert Nitrogen Environment", text: "High-purity N2 purging minimizes oxidation and enhances flux wetting.", icon: ShieldCheck },
      { title: "Real-Time Profiling System", text: "Multi-channel K-type thermocouple profiling on actual production boards.", icon: Activity },
      { title: "Dual Lead-Free & Leaded Lines", text: "Dedicated reflow chambers configured for RoHS SAC305 and Sn63/Pb37 solders.", icon: Flame }
    ],
    benefits: [
      { num: "01", title: "Void-Free BGA Joints", text: "Low voiding percentages (<10%) meeting stringent IPC Class 3 standards.", icon: Award },
      { num: "02", title: "Thermal Stress Protection", text: "Gradual ramp rates protect sensitive ICs and ceramic capacitors from thermal shock.", icon: ShieldAlert },
      { num: "03", title: "Shiny Solder Fillets", text: "Nitrogen atmosphere creates pristine, easily inspectable solder joints.", icon: Sparkles },
      { num: "04", title: "Energy Efficient Conveyors", text: "Mesh belt and pin-chain conveyors support thin flex and heavy copper boards.", icon: Layers }
    ]
  },
  {
    id: "pcb-rework-repair",
    category: "SMT",
    num: "SMT — 05",
    title: "PCB Rework & Repair",
    titleSpan: "Services",
    desc: "Expert hot-air & BGA reballing, de-soldering, trace restoration, and SMD component rework services performed under high-magnification microscopes.",
    img: "/assets/service_pcb_rework_repair.jpg",
    link: "/pcb-rework-repair.html",
    highlights: ["BGA Reballing & Replacement", "Trace & Pad Restoration", "Microscopic Hot-Air Rework"],
    story: [
      "When valuable circuit boards require component replacement, design revisions, or defect correction, Aeroscan Technologies provides professional PCB rework and repair services.",
      "Equipped with advanced optical BGA rework stations, micro hot-air pencils, and stereo inspection microscopes, our IPC-certified technicians safely remove, reball, and replace fine-pitch BGAs, QFNs, and passive chips without damaging surrounding circuitry.",
      "We also perform PCB trace repair, lifted pad restoration, jumper wire installation, and engineering modification wiring while preserving board structural integrity."
    ],
    features: [
      { title: "BGA Rework & Reballing", text: "Split-vision optical alignment BGA removal, reballing, and precise refitting.", icon: Wrench },
      { title: "Stereo Microscope Rework", text: "High-magnification optical inspection for sub-millimeter component repair.", icon: Microscope },
      { title: "PCB Trace & Pad Repair", text: "Restoration of damaged copper traces, pads, and plated through-holes.", icon: ShieldCheck },
      { title: "Controlled Thermal Rework", text: "Bottom-side infrared preheating preventing PCB warpage during rework.", icon: Thermometer }
    ],
    benefits: [
      { num: "01", title: "Saves Expensive Boards", text: "Salvage high-cost multi-layer assemblies and prototypes rather than scrapping them.", icon: DollarSign },
      { num: "02", title: "Zero Secondary Damage", text: "Precise localized heating protects neighboring sensitive electronic parts.", icon: ShieldAlert },
      { num: "03", title: "Fast Turnaround Rework", text: "Dedicated rework station for urgent prototype component swaps and engineering changes.", icon: Clock },
      { num: "04", title: "Fully Tested Repairs", text: "Reworked boards undergo 100% optical and electrical continuity verification.", icon: CheckCircle2 }
    ]
  },
  {
    id: "functional-inspection-quality-control",
    category: "SMT",
    num: "SMT — 06",
    title: "Functional Inspection & Quality Control",
    titleSpan: "Assurance",
    desc: "Comprehensive 3D Automated Optical Inspection (AOI), 3D X-ray solder verification (AXI), and custom functional bench testing.",
    img: "/assets/service_functional_inspection_qc.jpg",
    link: "/functional-inspection-quality-control.html",
    highlights: ["3D AOI & AXI Scans", "In-Circuit & Bed-of-Nails Testing", "100% Quality Assurance"],
    story: [
      "Quality assurance is integrated into every phase of our manufacturing process. We employ multi-stage inspection technologies, including 3D Automated Optical Inspection (AOI) to verify component placement, polarity, solder fillet shape, and bridge detection.",
      "For hidden solder joints under BGAs, QFNs, and flip chips, our 3D X-Ray Inspection (AXI) system verifies solder ball alignment, voiding percentages, and bridging with high resolution.",
      "Finally, custom functional test fixtures, flying probe ICT testers, and firmware programming stations validate circuit operational performance under real-world electrical loads."
    ],
    features: [
      { title: "3D Automated Optical Inspection", text: "Multi-angle HD camera scanning checking part presence, values, and solder joints.", icon: Microscope },
      { title: "3D X-Ray Inspection (AXI)", text: "Non-destructive X-ray tomographic analysis of hidden BGA solder balls.", icon: ShieldCheck },
      { title: "In-Circuit Testing (ICT)", text: "Bed-of-nails continuity, resistance, and capacitance testing across all test points.", icon: CheckSquare },
      { title: "Custom Functional Bench Test", text: "Real-time voltage, current, frequency, and communication protocol validation.", icon: Activity }
    ],
    benefits: [
      { num: "01", title: "100% Fault Detection", text: "Identifies solder bridges, missing parts, reversed polarity, and cold joints.", icon: ShieldAlert },
      { num: "02", title: "Detailed Test Reports", text: "Complete inspection logs and X-ray images archived for full unit traceability.", icon: FileCode },
      { num: "03", title: "Field Reliability Guaranteed", text: "Rigorous testing ensures zero field returns and maximum operational longevity.", icon: Award },
      { num: "04", title: "Compliance Ready", text: "Meets military, aerospace, automotive, and medical device quality standards.", icon: CheckCircle2 }
    ]
  },

  // DIP SERVICES
  {
    id: "through-hole-pcb-assembly",
    category: "DIP",
    num: "DIP — 01",
    title: "Through-Hole PCB Assembly",
    titleSpan: "DIP Services",
    desc: "Heavy-duty Through-Hole (DIP) component assembly for power electronics, industrial control boards, and high-reliability devices.",
    img: "/assets/service_manual_component_insertion.png",
    link: "/through-hole-pcb-assembly.html",
    highlights: ["Axial & Radial Component Prep", "Heavy Power Circuit Soldering", "High Mechanical Bond Strength"],
    story: [
      "Through-Hole Technology (THT / DIP) remains essential for power supplies, high-voltage equipment, industrial controls, and products requiring exceptional mechanical connection strength.",
      "Aeroscan Technologies offers comprehensive through-hole assembly lines featuring automated lead forming, manual insertion stations, wave soldering, and hand touch-up by skilled technicians.",
      "We handle leaded connectors, large electrolytic capacitors, power transformers, relays, heat sinks, and power switches with strong, reliable solder joints engineered to endure vibration and high current."
    ],
    features: [
      { title: "Automated Lead Forming", text: "Precision trimming and bending of axial and radial component leads prior to board insertion.", icon: Scissors },
      { title: "High-Current Joint Soldering", text: "Deep solder barrel fill (>75%) providing superior electrical conductivity.", icon: Flame },
      { title: "Heavy Copper PCB Support", text: "Capable of soldering 2oz, 3oz, and 4oz heavy copper through-hole power boards.", icon: Layers },
      { title: "Conformal Coating Options", text: "Protective silicone or acrylic coatings applied to assembled DIP components.", icon: ShieldCheck }
    ],
    benefits: [
      { num: "01", title: "Maximum Mechanical Strength", text: "Through-hole leads anchored in plated barrels resist severe physical shock and vibration.", icon: ShieldAlert },
      { num: "02", title: "High Thermal & Power Capacity", text: "Ideal for power transformers, heavy relays, and high-wattage power electronics.", icon: Zap },
      { num: "03", title: "Flexible Batch Production", text: "Cost-effective for both small prototype batches and large industrial production runs.", icon: Clock },
      { num: "04", title: "Complete Quality Verification", text: "Visual and electrical inspection ensuring 100% pin solder joint penetration.", icon: CheckCircle2 }
    ]
  },
  {
    id: "manual-component-insertion",
    category: "DIP",
    num: "DIP — 02",
    title: "Manual Component Insertion",
    titleSpan: "Precision",
    desc: "Skilled manual insertion of odd-form connectors, transformers, relays, heat sinks, and bulky DIP parts on ergonomic assembly lines.",
    img: "/assets/service_through_hole_pcb_assembly.jpg",
    link: "/manual-component-insertion.html",
    highlights: ["Odd-Form Component Handling", "Polarity & Part Verification", "Custom Insertion Pallets"],
    story: [
      "While automation handles standard parts, specialized odd-form through-hole components require human dexterity and precision. Our manual component insertion lines are staffed by experienced assembly technicians.",
      "Using custom ESD-safe insertion jigs, component bending fixtures, and color-guided workstation displays, technicians insert power connectors, chokes, bulky inductors, switches, and heat sinks with accurate orientation.",
      "Every insertion station operates under strict anti-static (ESD) controls and multi-check inspection procedures to eliminate missing parts or reversed electrolytic capacitor polarity."
    ],
    features: [
      { title: "Ergonomic Conveyor Lines", text: "Speed-adjustable assembly conveyors equipped with ESD grounding and LED lighting.", icon: Factory },
      { title: "Custom Insertion Jigs", text: "Precision holding fixtures holding components securely flush against the PCB surface.", icon: Wrench },
      { title: "BOM Guided Assembly", text: "Visual digital displays at each operator station confirming component part numbers.", icon: PackageCheck },
      { title: "Odd-Form Component Handling", text: "Seamless insertion of non-standard connectors, heavy transformers, and relays.", icon: Layers }
    ],
    benefits: [
      { num: "01", title: "Flawless Component Flushness", text: "Jigs ensure components sit flat and straight on the board before soldering.", icon: Target },
      { num: "02", title: "Zero Reversed Polarity", text: "Multi-operator visual verification checks electrolytic capacitors and diodes.", icon: CheckCircle2 },
      { num: "03", title: "Versatile Assembly Line", text: "Handles complex mixed boards with dozens of varied DIP component types.", icon: Sparkles },
      { num: "04", title: "High Throughput Capacity", text: "Synchronized conveyor flow maintains steady, continuous volume production.", icon: TrendingUp }
    ]
  },
  {
    id: "wave-selective-soldering",
    category: "DIP",
    num: "DIP — 03",
    title: "Wave / Selective Soldering",
    titleSpan: "Automation",
    desc: "Automated dual-wave and robotic selective soldering for zero-defect leaded solder joint formation under nitrogen protection.",
    img: "/assets/service_wave_selective_soldering.jpg",
    link: "/wave-selective-soldering.html",
    highlights: ["Dual-Wave Nitrogen Tunnel", "Robotic Selective Soldering", "Zero Solder Bridging Guarantee"],
    story: [
      "For volume through-hole board soldering, Aeroscan Technologies utilizes state-of-the-art dual-wave soldering machines and robotic selective soldering systems.",
      "Our wave soldering machines feature spray fluxers, multi-zone infrared preheaters, and dual laminar tin waves operating under inert nitrogen gas to create pristine solder fillets with complete hole fill.",
      "For double-sided mixed technology boards with SMD parts on the bottom side, our selective soldering robots solder individual through-hole pins with pinpoint accuracy without damaging adjacent SMD components."
    ],
    features: [
      { title: "Dual-Wave Soldering Line", text: "Turbulent and laminar solder waves ensuring 100% pin wetting without bridging.", icon: Flame },
      { title: "Robotic Selective Soldering", text: "Programmable solder nozzles soldering specific DIP pins on complex SMD boards.", icon: Cpu },
      { title: "Automatic Spray Fluxer", text: "Ultrasonic spray fluxing providing uniform flux coating with minimal residue.", icon: Gauge },
      { title: "Titanium Solder Pots", text: "Lead-free RoHS compliant titanium pots preventing solder pot alloy contamination.", icon: ShieldCheck }
    ],
    benefits: [
      { num: "01", title: "100% Hole Barrel Fill", text: "Achieves full 360-degree solder wetting and top-side land fillet formation.", icon: CheckCircle2 },
      { num: "02", title: "Protects Bottom SMD Parts", text: "Selective soldering eliminates the need for expensive hand soldering on mixed boards.", icon: ShieldAlert },
      { num: "03", title: "Clean No-Clean Flux", text: "Leaves minimal non-conductive residue, eliminating mandatory board washing steps.", icon: Sparkles },
      { num: "04", title: "High Speed Throughput", text: "Processes hundreds of through-hole panels per hour continuously.", icon: Zap }
    ]
  },
  {
    id: "hand-soldering-rework",
    category: "DIP",
    num: "DIP — 04",
    title: "Hand Soldering & Rework",
    titleSpan: "Craftsmanship",
    desc: "Precision hand soldering, joint touch-ups, terminal wiring, and post-assembly DIP rework performed by IPC-A-610 certified technicians.",
    img: "/assets/service_hand_soldering_rework.jpg",
    link: "/hand-soldering-rework.html",
    highlights: ["IPC-A-610 Certified Technicians", "Terminal & Wire Harness Soldering", "Custom Cable Rework"],
    story: [
      "Certain delicate through-hole components, wire harnesses, sensors, and heavy heat sinks require precision hand soldering crafted by master assembly technicians.",
      "Our hand soldering specialists utilize temperature-controlled ESD-safe soldering stations, high-grade silver/tin solder wires, and active smoke extraction systems to perform clean, shiny solder joints.",
      "We perform post-wave touch-up, lead trimming, wire terminal soldering, connector pin insertion, and thorough cleaning, ensuring every joint meets IPC-A-610 Class 3 standards."
    ],
    features: [
      { title: "IPC Certified Technicians", text: "Soldering performed exclusively by trained IPC-A-610 certified assembly staff.", icon: Award },
      { title: "Digital Temp Soldering Irons", text: "Precision thermal recovery soldering stations preventing cold joints.", icon: Thermometer },
      { title: "Wire & Cable Harness Soldering", text: "Hand soldering custom wire leads, coaxial connectors, and terminal blocks.", icon: Wrench },
      { title: "Post-Solder Joint Touch-Up", text: "Meticulous visual touch-up under magnifying lamps following wave soldering.", icon: Eye }
    ],
    benefits: [
      { num: "01", title: "Pristine Joint Workmanship", text: "Concave, shiny solder fillets with optimal wetting and zero solder spikes.", icon: Sparkles },
      { num: "02", title: "Custom Wire & Header Assembly", text: "Expert hand soldering for non-standard wires, jumpers, and header pins.", icon: CheckCircle2 },
      { num: "03", title: "Safe for Heat-Sensitive Parts", text: "Controlled tip contact duration protects sensitive switches and sensors.", icon: ShieldAlert },
      { num: "04", title: "Meticulous Final Touch", text: "Every hand-soldered board receives thorough flux residue cleaning.", icon: CheckSquare }
    ]
  },
  {
    id: "mixed-technology-assembly",
    category: "DIP",
    num: "DIP — 05",
    title: "Mixed Technology Assembly",
    titleSpan: "(SMT + DIP)",
    desc: "Combined Surface Mount (SMT) and Through-Hole (DIP) assembly seamlessly integrated into single multi-layer circuit boards.",
    img: "/assets/service_mixed_technology_assembly.jpg",
    link: "/mixed-technology-assembly.html",
    highlights: ["Hybrid SMT + DIP Production", "Double-Sided Complex PCBs", "Turnkey End-to-End Line"],
    story: [
      "Modern electronic products frequently combine high-density SMT microchips with heavy DIP transformers, connectors, and power components on the same printed circuit board.",
      "Aeroscan Technologies excels in Mixed Technology Assembly. We seamlessly bridge automated SMT pick-and-place lines, reflow ovens, manual DIP insertion, selective soldering, and hand assembly into a unified production workflow.",
      "We utilize double-sided SMT reflow, specialized solder mask carriers, selective soldering pallets, and multi-stage testing to manufacture complex hybrid boards without thermal degradation or component stress."
    ],
    features: [
      { title: "Double-Sided SMT & DIP Line", text: "Capable of bottom-side SMT glue placement followed by top-side DIP wave soldering.", icon: Layers },
      { title: "Selective Wave Pallets", text: "Custom CNC-machined titanium pallets shielding SMD parts during wave soldering.", icon: ShieldCheck },
      { title: "Integrated Production Line", text: "Continuous flow from SMT stencil printing to final DIP box build assembly.", icon: Factory },
      { title: "Unified Quality Control", text: "Combined AOI optical scanning, 3D X-ray inspection, and functional testing.", icon: Microscope }
    ],
    benefits: [
      { num: "01", title: "Single-Source Solution", text: "No need to split SMT and DIP manufacturing between multiple vendors.", icon: CheckCircle2 },
      { num: "02", title: "Handles Complex Board Designs", text: "Ideal for power supplies, motor drives, telecom, and consumer appliances.", icon: Cpu },
      { num: "03", title: "Optimized Unit Manufacturing Cost", text: "Efficient automated workflow reduces labor hours and accelerates throughput.", icon: DollarSign },
      { num: "04", title: "End-to-End Quality Guarantee", text: "Rigorous inspection across both SMT and DIP assembly stages.", icon: Award }
    ]
  },
  {
    id: "final-inspection-packaging",
    category: "DIP",
    num: "DIP — 06",
    title: "Final Inspection & Packaging",
    titleSpan: "Delivery",
    desc: "Meticulous final visual inspection, functional validation, ESD protective packaging, and secure box shipment preparation.",
    img: "/assets/service_final_inspection_packaging.jpg",
    link: "/final-inspection-packaging.html",
    highlights: ["100% Final Visual QC Check", "ESD Shield Bagging & Sealing", "Custom Protective Box Packaging"],
    story: [
      "Before any assembled PCB leaves Aeroscan Technologies, it undergoes a comprehensive Final Quality Inspection and ESD-safe packaging process.",
      "Our Quality Control team conducts 100% visual inspection verifying cleanliness, component labeling, mechanical mounting, flux removal, and overall workmanship according to IPC standards.",
      "Boards are then sealed in static-shielding ESD bags with moisture desiccant packs, packed into custom anti-static foam compartments, and boxed in heavy-duty corrugated cartons to ensure 100% safe transit to your doorstep."
    ],
    features: [
      { title: "100% Visual QC Audit", text: "Final optical check under magnification for cleanliness, labeling, and joints.", icon: Eye },
      { title: "ESD Anti-Static Shielding", text: "Vacuum sealing in metalized ESD shielding bags with humidity indicators.", icon: ShieldCheck },
      { title: "Custom Foam & Box Packing", text: "High-density ESD foam inserts preventing movement and mechanical damage.", icon: Boxes },
      { title: "Barcode Lot Traceability", text: "Serial number stickers and batch tracking barcodes printed on every carton.", icon: PackageCheck }
    ],
    benefits: [
      { num: "01", title: "Zero Shipping Damage", text: "Engineered shock-absorbing packaging protects fragile leads and boards.", icon: Truck },
      { num: "02", title: "Electrostatic Discharge Safe", text: "Full ESD protection prevents latent static damage during shipping.", icon: Zap },
      { num: "03", title: "Ready for Immediate Integration", text: "Clean, fully tested boards arrive ready for instant installation or retail sale.", icon: CheckCircle2 },
      { num: "04", title: "Complete Documentation", text: "Inspection certificate of conformance (CoC) and test logs included.", icon: FileCode }
    ]
  }
];
