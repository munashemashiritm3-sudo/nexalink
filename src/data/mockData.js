export const COMPANY_INFO = {
  name: "Nexalink Solutions Pvt Ltd",
  slogan: "Smart Solutions. Seamless Service.",
  tagline: "Connecting businesses, technology and everyday services through reliable, innovative and integrated solutions.",
  phone: "+263 788 172 075",
  altPhone: "+263 784 559 107",
  whatsapp: "+263 713 123 055",
  email: "info@nexalink.co.zw",
  website: "nexalink",
  address: "Shop 33, Island Mall, Cnr Innez Terrace & Jason Moyo, Harare, Zimbabwe",
  hours: "Mon - Sat: 8:00 AM – 5:00 PM",
  year: 2026
};

export const LEADERSHIP_TEAM = [
  {
    name: "Moses Tadiwa Chikwature",
    role: "Managing Director",
    bio: "Visionary entrepreneur and tech strategist leading Nexalink's mission to bridge technology, logistics, and everyday business services across Zimbabwe.",
    email: "m.chikwature@nexalink.co.zw",
    phone: "+263 788 172 075",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Ashley Maria Machiridza",
    role: "Marketing Director",
    bio: "Dynamic marketing leader driving brand strategy, customer relationships, and strategic B2B expansion across Southern Africa.",
    email: "a.machiridza@nexalink.co.zw",
    phone: "+263 784 559 107",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  }
];

export const STARLINK_PACKAGES = [
  { id: "std", name: "Standard", data: "25 GB", price: 40, priorityData: "US$0.26 / GB", speed: "High-Speed Satellite", bestFor: "Small office & remote workers" },
  { id: "pro", name: "Pro", data: "55 GB", price: 46, priorityData: "US$0.26 / GB", speed: "High-Speed Priority", bestFor: "Growing teams & retail outlets", popular: true },
  { id: "elite", name: "Elite", data: "120 GB", price: 70, priorityData: "US$0.26 / GB", speed: "Ultra High-Speed", bestFor: "Medium enterprise operations" },
  { id: "adv", name: "Advanced", data: "320 GB", price: 106, priorityData: "US$0.26 / GB", speed: "Enterprise Grade", bestFor: "Multi-branch commercial setups" },
  { id: "ultra", name: "Ultra", data: "450 GB", price: 130, priorityData: "US$0.26 / GB", speed: "Low Latency Priority", bestFor: "Heavy data & video streaming" },
  { id: "mega", name: "Mega", data: "650 GB", price: 186, priorityData: "US$0.26 / GB", speed: "Maximum Priority", bestFor: "Data centers & institutional use" },
  { id: "unlimited", name: "Infinity Connect Unlimited", data: "Unlimited Data", price: 77, priorityData: "Included", speed: "High-Speed Unlimited", bestFor: "Flat-rate business connectivity", highlighted: true }
];

export const SOLUTIONS_CATEGORIES = [
  {
    id: "connectivity-it",
    title: "Connectivity & IT Solutions",
    tagline: "High-speed internet, Starlink installations, IT management, and CCTV security.",
    icon: "Wifi",
    color: "from-blue-600 to-cyan-500",
    features: [
      "Authorised Starlink Satellite Internet Reseller & Installation",
      "Infinity Connect Priority Data Bundles (25GB to 650GB & Unlimited $77/mo)",
      "Commercial & Residential Wi-Fi Mesh Systems",
      "Managed IT Infrastructure & Remote Support",
      "HD CCTV Security & AI Video Surveillance"
    ],
    flyerImage: "/assets/starlink-infinity-flyer.png"
  },
  {
    id: "vehicle-services",
    title: "Vehicle Services & Licensing",
    tagline: "Hassle-free vehicle importing, ZINARA licensing, ZBC radio, and insurance renewals.",
    icon: "Car",
    color: "from-red-600 to-amber-500",
    features: [
      "Car Importation from Japan (Direct sourcing, clearing, delivery)",
      "New Car Registration & Number Plate Applications",
      "ZINARA Road License Renewal (Same-day processing)",
      "ZBC Radio License Renewals",
      "Third Party & Comprehensive Vehicle Insurance"
    ],
    flyerImage: "/assets/vehicle-licensing-flyer.png",
    secondaryFlyer: "/assets/japan-car-import-flyer.jpg"
  },
  {
    id: "logistics-mobility",
    title: "Logistics, Tracking & Mobility",
    tagline: "GPS vehicle trackers, fleet management, local courier, and bike delivery.",
    icon: "ShieldCheck",
    color: "from-indigo-600 to-purple-600",
    features: [
      "Motor Vehicle Tracker Full Package – Only US$60 (No Subscription!)",
      "+US$1 Airtime/month for real-time tracking updates",
      "Anti-Theft Engine Immobilizer & Remote Engine Kill",
      "Route Monitoring, Geo-fencing & Speed Alerts",
      "Local Express Courier & Bike Delivery Services in Harare"
    ],
    flyerImage: "/assets/vehicle-tracker-flyer.jpg"
  },
  {
    id: "business-solutions",
    title: "Business Solutions & Consulting",
    tagline: "Strategic consultancy, digital transformation, custom CRM, and analytics.",
    icon: "BarChart3",
    color: "from-emerald-600 to-teal-500",
    features: [
      "B2B Digital Transformation Strategy",
      "Custom CRM Setup & Business Process Automation",
      "Digital Marketing & Brand Positioning",
      "Enterprise Analytics & Reporting Dashboards",
      "Company Registration & Compliance Advisory"
    ]
  },
  {
    id: "digital-services",
    title: "Digital Utility & Bill Payments",
    tagline: "Instant ZESA tokens, DStv renewals, School fees, and City of Harare bills.",
    icon: "CreditCard",
    color: "from-amber-600 to-orange-500",
    features: [
      "Instant ZESA Prepaid Electricity Tokens",
      "DStv Subscription Renewals",
      "Primary, High School & Tertiary School Fees Payments",
      "City of Harare Municipal Bill Payments",
      "Accepting EcoCash, InnBucks, OMARI, OneMoney, Visa & Mastercard"
    ]
  }
];

export const WHY_NEXALINK_PILLARS = [
  {
    title: "Reliable",
    description: "Consistent execution, guaranteed uptime, and trusted turnaround times for all business services.",
    icon: "CheckCircle2"
  },
  {
    title: "Innovative",
    description: "Bringing cutting-edge satellite connectivity, IoT vehicle tracking, and automated digital payments to Zimbabwe.",
    icon: "Zap"
  },
  {
    title: "Integrated",
    description: "One unified partner for IT, logistics, vehicle admin, and utility payments. Simplify your vendor footprint.",
    icon: "Layers"
  },
  {
    title: "Customer-Focused",
    description: "Dedicated account management, same-day delivery, and transparent local pricing in US$.",
    icon: "Users"
  }
];

export const HOW_IT_WORKS_STEPS = [
  { step: "01", title: "Tell Us", desc: "Share your business requirement or vehicle needs via our online form or WhatsApp." },
  { step: "02", title: "Understand", desc: "Our specialists evaluate your precise specs, budget, and operational goals." },
  { step: "03", title: "Design", desc: "We craft a tailored solution proposal with transparent pricing and timeline." },
  { step: "04", title: "Implement", desc: "Seamless deployment of hardware, software, licenses, or imported vehicles." },
  { step: "05", title: "Support", desc: "Ongoing SLA support, automated renewal reminders, and dedicated care." }
];

export const INDUSTRIES_SERVED = [
  { name: "SMEs & Startups", icon: "Building2", problem: "High overheads & fragmented vendors", solution: "Bundled IT, Wi-Fi & utility automation" },
  { name: "Retail & E-commerce", icon: "ShoppingBag", problem: "Slow checkout & delivery delays", solution: "Starlink connection & fast bike courier" },
  { name: "Transport & Logistics", icon: "Truck", problem: "Vehicle theft & license compliance gaps", solution: "$60 GPS Tracker + ZINARA fleet automation" },
  { name: "Education Institutions", icon: "GraduationCap", problem: "Tuition collection & campus Wi-Fi", solution: "Fee processing portal & Infinity Connect" },
  { name: "Agriculture & Mining", icon: "Tractor", problem: "Remote area connectivity & asset tracking", solution: "Starlink Satellite + IoT fleet monitoring" },
  { name: "Construction & Engineering", icon: "HardHat", problem: "Site Wi-Fi & heavy machinery admin", solution: "Rugged Starlink rigs & vehicle licensing" },
  { name: "NGOs & Development", icon: "HeartHandshake", problem: "Field team connectivity & audit compliance", solution: "Enterprise IT support & fleet tracking" },
  { name: "Professional Services", icon: "Briefcase", problem: "Data security & client management", solution: "CRM automation & managed IT security" }
];

export const MOCK_CLIENT_DATA = {
  clientName: "Tafadzwa Moyo",
  companyName: "Harare Logistics Co.",
  accountNumber: "NX-884920",
  activeServices: 4,
  openRequests: 1,
  balance: 77.00,
  renewalsDue: 2,
  fleetVehicles: [
    { reg: "AEG-4902", model: "Toyota Fortuner", trackerStatus: "Active", zinaraExpiry: "2026-09-15", insuranceExpiry: "2026-09-15", status: "Renewal Warning" },
    { reg: "AFB-1194", model: "Lexus IS250 (Japan Import)", trackerStatus: "Active", zinaraExpiry: "2026-12-01", insuranceExpiry: "2026-12-01", status: "Compliant" },
    { reg: "AEC-8831", model: "Isuzu NPR Truck", trackerStatus: "Active", zinaraExpiry: "2026-10-30", insuranceExpiry: "2026-10-30", status: "Compliant" }
  ],
  itServices: [
    { service: "Starlink Infinity Connect (Unlimited)", package: "$77 / mo", status: "Online", ip: "197.221.42.10", location: "Msasa Depot" },
    { service: "HD CCTV System", package: "8-Camera AI Stream", status: "Active", ip: "197.221.42.12", location: "Harare HQ" }
  ],
  invoices: [
    { id: "INV-2026-081", date: "2026-08-25", description: "Starlink Infinity Connect Monthly", amount: 77.00, status: "Unpaid" },
    { id: "INV-2026-042", date: "2026-07-10", description: "3x Vehicle Tracker Installation ($60 x 3)", amount: 180.00, status: "Paid" },
    { id: "INV-2026-019", date: "2026-05-04", description: "ZINARA & ZBC Annual Renewal Fee", amount: 140.00, status: "Paid" }
  ],
  tickets: [
    { id: "TCK-402", subject: "Upgrade Starlink data package to Mega 650GB", date: "2026-08-30", status: "In Progress", priority: "High" },
    { id: "TCK-389", subject: "Request additional vehicle tracker unit", date: "2026-08-12", status: "Resolved", priority: "Medium" }
  ]
};

export const INSIGHTS_ARTICLES = [
  {
    id: 1,
    title: "How Starlink Satellite Internet is Transforming Zimbabwean Businesses in 2026",
    category: "Connectivity",
    date: "August 28, 2026",
    readTime: "4 min read",
    author: "Moses Tadiwa Chikwature",
    summary: "Reliable internet is no longer a luxury for Harare SMEs and mining firms. Learn how Infinity Connect Starlink packages deliver enterprise speeds anywhere.",
    content: "From remote farming operations in Mazowe to commercial hubs in Harare, satellite internet has rewritten the rules of business connectivity..."
  },
  {
    id: 2,
    title: "The $60 Vehicle Tracker Revolution: No Monthly Subscriptions Required",
    category: "Vehicle Tech",
    date: "August 15, 2026",
    readTime: "5 min read",
    author: "Ashley Maria Machiridza",
    summary: "Why pay expensive monthly tracking subscriptions? Discover how Nexalink's $60 GPS tracking package with $1/mo airtime keeps fleets safe.",
    content: "Vehicle theft and unauthorized driver routes cost Zimbabwean logistics firms thousands of dollars annually..."
  },
  {
    id: 3,
    title: "Step-by-Step Guide to Importing Vehicles Direct from Japan to Zimbabwe",
    category: "Vehicle Admin",
    date: "July 22, 2026",
    readTime: "6 min read",
    author: "Moses Tadiwa Chikwature",
    summary: "Importing a Japanese vehicle can feel complex. Here is how Nexalink handles sourcing, shipping, customs clearing, registration, and ZINARA licensing.",
    content: "From Tokyo auctions to your driveway in Harare or Bulawayo, importing a quality vehicle requires navigating multiple government agencies..."
  }
];

export const FAQS = [
  {
    category: "Connectivity & Starlink",
    q: "How does the Starlink Infinity Connect service work in Zimbabwe?",
    a: "Nexalink is an authorised reseller offering complete Starlink satellite hardware supply, professional rooftop mounting, alignment, and local priority data plans starting from $40/mo up to $186/mo or $77/mo unlimited options."
  },
  {
    category: "Vehicle Tracking",
    q: "Are there any hidden monthly subscription fees for the $60 vehicle tracker?",
    a: "No! The full package hardware and installation is US$60. Operating cost is only +$1 airtime per month to keep the SIM live for real-time tracking, speed alerts, and remote engine stop."
  },
  {
    category: "Vehicle Services",
    q: "Can Nexalink renew my ZINARA and ZBC vehicle licenses on the same day?",
    a: "Yes! We offer same-day ZINARA road license and ZBC radio license renewals. You can pay via EcoCash, InnBucks, OMARI, or Visa and we deliver your physical disc to your office or home in Harare."
  },
  {
    category: "Bill Payments",
    q: "Which payment methods are accepted for ZESA, DStv, and School Fees?",
    a: "We accept EcoCash, InnBucks, OMARI, OneMoney, Visa, Mastercard, and cash at our Shop 33 Island Mall, Harare branch."
  }
];
