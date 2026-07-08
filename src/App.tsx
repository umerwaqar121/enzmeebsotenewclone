import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Phone, Mail, MapPin, CheckCircle, Star, ArrowRight, 
  Play, Pause, Volume2, VolumeX, Menu, X, Check, Award, 
  Users, Shield, Clock, ArrowUpRight, Sliders, Map, MessageSquare, Info,
  Instagram, Facebook, Twitter
} from 'lucide-react';
import { IrishRailLogo, MisericordiaLogo, MaynoothLogo, RteLogo, UcdLogo } from './components/PartnerLogos';
import ImageGallery from './components/ImageGallery';
import PavementCoreSample from './components/PavementCoreSample';

// Compact high-quality types & interfaces
interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  specs: string;
  material: string;
  timeline: string;
  image: string;
}

interface Testimonial {
  id: string;
  quote: string;
  client: string;
  role: string;
  rating: number;
  avatar: string;
  projectSpecs: string;
}

export default function App() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  
  // Custom cursor position
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  // Before/After comparison slider position (percentage 0 to 100)
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Interactive Quote Calculator States
  const [projectType, setProjectType] = useState<'commercial' | 'residential' | 'sports' | 'markings' | 'civil'>('residential');
  const [areaSize, setAreaSize] = useState<number>(120);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('tarmac');
  const [accessibility, setAccessibility] = useState<'easy' | 'restricted'>('easy');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', county: 'Dublin' });

  // Watch Us Work Simulator States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(30);

  // Ireland county search and filter states
  const [countySearch, setCountySearch] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<'All' | 'Leinster' | 'Munster' | 'Connacht' | 'Ulster'>('All');

  // WhatsApp Mini Chat window toggle
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');

  // Animated counters trigger state
  const [countersActive, setCountersActive] = useState(false);
  const [counts, setCounts] = useState({ years: 0, teams: 0, projects: 0, counties: 0 });

  // Track mouse coordinates for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Trust strip ref — counters only fire when strip is actually visible
  const trustRef = useRef<HTMLElement>(null);
  const trustInView = useInView(trustRef, { once: true, margin: '-80px' });

  // Scroll progress + hero parallax
  const { scrollYProgress, scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 800], [0, 180]);

  // Set up counter increments upon viewport entrance
  useEffect(() => {
    if (trustInView) setCountersActive(true);
  }, [trustInView]);

  useEffect(() => {
    if (!countersActive) return;
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setCounts({
        years: Math.min(68, Math.floor((68 / steps) * stepCount)),
        teams: Math.min(100, Math.floor((100 / steps) * stepCount)),
        projects: Math.min(500, Math.floor((500 / steps) * stepCount)),
        counties: Math.min(26, Math.floor((26 / steps) * stepCount))
      });

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [countersActive]);

  // Before/After slider drag handlers
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    setSliderPos(percentage);
  };

  const onSliderTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const onSliderMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleSliderMove(e.clientX);
    }
  };

  // Video progress simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress(prev => (prev >= 100 ? 0 : prev + 1.5));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Static Data lists
  const services = [
    {
      id: 'commercial',
      num: '01 / COMMERCIAL',
      title: 'Commercial Premises',
      desc: 'We undertake all types of surfacing and repair works for commercial enterprises including retail, office, industrial and public sector locations across Ireland.',
      longDesc: 'Our commercial division delivers state-of-the-art tarmacadam and stone mastic asphalt surfaces engineered to withstand constant HGV tracking and heavy-duty static loads. We handle complete ground preparation, drainage infrastructure, grading, and final wear-course laying with minimum disruption to your operational hours.',
      bg: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80',
      timeline: 'Typically 3-5 days',
      materials: 'SMA Asphalt, Heavy Duty Bitumen, Granite Aggregates'
    },
    {
      id: 'playgrounds',
      num: '02 / SAFETY',
      title: 'Playgrounds',
      desc: 'We have worked closely with many schools, creches, local authorities and councils in the construction and renovation of new and existing school playgrounds.',
      longDesc: 'E. Nuzum is a trusted partner in playground design and installation, adhering strictly to EN 1177 safety standards. We specify and install premium shock-absorbing wetpour rubber surfaces, sports surfacing, and recreational play zones that prevent injury while offering vibrant, weather-resistant durability.',
      bg: 'https://images.unsplash.com/photo-1597893104482-07b5eb55d53c?auto=format&fit=crop&w=1200&q=80',
      timeline: 'Typically 2-4 days',
      materials: 'EPDM Rubber Granules, Polyurethane Binders'
    },
    {
      id: 'carparks',
      num: '03 / PARKING',
      title: 'Car Parks',
      desc: 'The highly skilled staff at E Nuzum will manage your project with the efficiency and professionalism needed, ensuring an outcome exactly to your specifications.',
      longDesc: 'From minor private business park upgrades to major multi-acre municipal car parking facilities. We cover structural sub-base compaction, surface water drainage planning, kerbing, SMA asphalt overlays, and professional lane layouts to maximize space efficiency and traffic flow.',
      bg: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
      timeline: 'Typically 3-7 days',
      materials: 'Stone Mastic Asphalt (SMA), Concrete Kerbs, Drainage Channels'
    },
    {
      id: 'schools',
      num: '04 / INSTITUTIONAL',
      title: 'Schools & Colleges',
      desc: 'We undertake all types of new and renovation surfacing works which schools or colleges may require including car parks, sports surfaces and line marking.',
      longDesc: 'We coordinate surfacing programs around school calendars and summer breaks to eliminate student disruption. E. Nuzum has built active learning pathways, sports courts, accessible ramps, drop-off lanes, and administrative staff parking lots for institutions throughout the country.',
      bg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
      timeline: 'Depends on site volume',
      materials: 'Coloured Acrylics, Non-Slip Macadam, Thermoplastics'
    },
    {
      id: 'sealcoating',
      num: '05 / PROTECTION',
      title: 'Sealcoating & Rejuvenation',
      desc: 'We deliver various types of surface maintenance applications to combat environmental factors which may cause deterioration of asphalt surfaces.',
      longDesc: 'Irish rain and frost freeze-thaw cycles can quickly degrade binder asphalt. Our specialized coal-tar emulsion sealcoating forms an impermeable shield against oxidation, water seepage, oil drips, and chemical corrosion, maintaining a dark slate-black finish.',
      bg: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
      timeline: 'Typically 1-2 days',
      materials: 'Bituminous Emulsion Sealants, Rejuvenation Oils'
    },
    {
      id: 'driveways',
      num: '06 / RESIDENTIAL',
      title: 'Driveways',
      desc: 'A tarmacadam driveway by E Nuzum is still one of the most popular finishes for driveways today due to its longevity, flexibility and cost effectiveness.',
      longDesc: 'Enhance your property curb appeal with our hand-finished residential driveways. Lighter and more flexible than standard concrete, our tarmacadam, red tar & chip gravel, or seamless water-permeable resin-bound finishes are engineered with stone borders to ensure pristine aesthetics and reliable water drainage.',
      bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      timeline: 'Typically 1-2 days',
      materials: 'Fine-graded Wearing Macadam, Gold Chip Gravel, Permeable Resin'
    }
  ];

  const projects: Project[] = [
    { id: '1', title: 'Villa Blanchard Residency', category: 'Residential', location: 'Co. Dublin', specs: '2.4km estate road restoration', material: 'SMA Asphalt (40mm)', timeline: '14 Days', image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80' },
    { id: '2', title: 'Dublin Logistics Depot', category: 'Commercial', location: 'Co. Dublin', specs: '8,500m² heavy duty freight yard', material: 'Stone Mastic Asphalt', timeline: '8 Days', image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80' },
    { id: '3', title: 'St. Jude Primary CFH Playground', category: 'Sports & Play', location: 'Co. Kildare', specs: 'Safety wetpour EPDM playground', material: 'EPDM Rubber Wetpour', timeline: '3 Days', image: 'https://images.unsplash.com/photo-1597893104482-07b5eb55d53c?auto=format&fit=crop&w=800&q=80' },
    { id: '4', title: 'M50 Orbital Layout System', category: 'Line Markings', location: 'Dublin Ring', specs: 'Retroreflective highway markings', material: 'Thermoplastic Compound', timeline: '4 Nights', image: 'https://images.unsplash.com/photo-1531843781708-b603e8960b5a?auto=format&fit=crop&w=800&q=80' },
    { id: '5', title: 'Limerick Express Cargo Terminal', category: 'Civil', location: 'Co. Limerick', specs: 'Drainage network & ground consolidation', material: 'Sub-base Gravel & Drainage', timeline: '12 Days', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
    { id: '6', title: 'Howth Waterfront Promenade', category: 'Commercial', location: 'Co. Dublin', specs: 'Permeable pedestrian walkway overlay', material: 'Gold Resin Bound Gravel', timeline: '5 Days', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80' },
    { id: '7', title: 'Killiney Manor Carriage Drive', category: 'Residential', location: 'Co. Dublin', specs: 'Heritage estate private driveway', material: 'Amber Tar & Chip (3-coat)', timeline: '2 Days', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { id: '8', title: 'Dundalk Athletics MUGA', category: 'Sports & Play', location: 'Co. Louth', specs: 'Triple layer acrylic running lanes', material: 'Sports Acrylic Paint', timeline: '6 Days', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote: "Superb road restoration work. Core sampling and final lines were done to world-class precision. Best tarmac contractors in Ireland.",
      client: "Arthur Pendelton",
      role: "Chairman, Villa Blanchard",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
      projectSpecs: "2.4km Asphalt & Markings"
    },
    {
      id: '2',
      quote: "Absolute professionals. Paved our 8,500m² freight yard terminal over a single bank holiday weekend. Exceptional flat tolerances.",
      client: "Marcus Byrne",
      role: "Operations Director, Dublin Port",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
      projectSpecs: "Heavy Duty SMA Paving"
    },
    {
      id: '3',
      quote: "Fitted our playground with safety EPDM wetpour. Passed critical safety drop-tests with flying colors. Highly recommended.",
      client: "Sister Helen Mary",
      role: "Principal, St. Jude's School",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
      projectSpecs: "EPDM Safety Wetpour"
    },
    {
      id: '4',
      quote: "Stunning residential tarmac driveway overlay. Impeccable granite bordering and perfect rainwater drainage alignment.",
      client: "David O'Connor",
      role: "Homeowner, Dalkey",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
      projectSpecs: "Residential Driveway"
    },
    {
      id: '5',
      quote: "Flawless rapid-cure parking line marking. Restructured our school parking layouts to maximize space efficiency.",
      client: "Sarah Jenkins",
      role: "Facilities Head, Maynooth",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
      projectSpecs: "Line Markings"
    },
    {
      id: '6',
      quote: "Professional coal-tar emulsion sealcoating. Resurfaced and sealed our asphalt to withstand freeze-thaw cracking.",
      client: "Tomás O'Shea",
      role: "Estate Manager, Co. Kerry",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
      projectSpecs: "Sealcoating Rejuvenation"
    }
  ];

  const counties: { name: string; province: string; status: string; dispatch: string }[] = [
    { name: 'Dublin', province: 'Leinster', status: 'Depot Hub', dispatch: 'Immediate (<30 mins)' },
    { name: 'Wicklow', province: 'Leinster', status: 'Active Crew', dispatch: 'Scheduled (<1 hour)' },
    { name: 'Kildare', province: 'Leinster', status: 'Active Crew', dispatch: 'Scheduled (<1 hour)' },
    { name: 'Meath', province: 'Leinster', status: 'Active Crew', dispatch: 'Scheduled (<1 hour)' },
    { name: 'Louth', province: 'Leinster', status: 'Scheduled', dispatch: '1.5 Hours' },
    { name: 'Wexford', province: 'Leinster', status: 'Active Crew', dispatch: '1.5 Hours' },
    { name: 'Kilkenny', province: 'Leinster', status: 'Scheduled', dispatch: '1.5 Hours' },
    { name: 'Carlow', province: 'Leinster', status: 'Scheduled', dispatch: '1 Hour' },
    { name: 'Westmeath', province: 'Leinster', status: 'Scheduled', dispatch: '1.5 Hours' },
    { name: 'Laois', province: 'Leinster', status: 'Scheduled', dispatch: '1.2 Hours' },
    { name: 'Offaly', province: 'Leinster', status: 'Scheduled', dispatch: '1.5 Hours' },
    { name: 'Longford', province: 'Leinster', status: 'Scheduled', dispatch: '2 Hours' },
    { name: 'Cork', province: 'Munster', status: 'Depot Hub', dispatch: 'Immediate (<45 mins)' },
    { name: 'Limerick', province: 'Munster', status: 'Active Crew', dispatch: 'Scheduled (<1 hour)' },
    { name: 'Kerry', province: 'Munster', status: 'Scheduled', dispatch: '1.5 Hours' },
    { name: 'Waterford', province: 'Munster', status: 'Active Crew', dispatch: '1 Hour' },
    { name: 'Tipperary', province: 'Munster', status: 'Scheduled', dispatch: '1.2 Hours' },
    { name: 'Clare', province: 'Munster', status: 'Scheduled', dispatch: '1.5 Hours' },
    { name: 'Galway', province: 'Connacht', status: 'Depot Hub', dispatch: 'Immediate (<45 mins)' },
    { name: 'Mayo', province: 'Connacht', status: 'Active Crew', dispatch: 'Scheduled (<1 hour)' },
    { name: 'Roscommon', province: 'Connacht', status: 'Scheduled', dispatch: '1 Hour' },
    { name: 'Sligo', province: 'Connacht', status: 'Scheduled', dispatch: '1.5 Hours' },
    { name: 'Leitrim', province: 'Connacht', status: 'Scheduled', dispatch: '1.5 Hours' },
    { name: 'Donegal', province: 'Ulster', status: 'Active Crew', dispatch: 'Scheduled (<2 hours)' },
    { name: 'Cavan', province: 'Ulster', status: 'Scheduled', dispatch: '1.5 Hours' },
    { name: 'Monaghan', province: 'Ulster', status: 'Scheduled', dispatch: '1.8 Hours' }
  ];

  // Dynamic cost estimates calculator logic
  const calculateEstimate = () => {
    let baseRate = 50; // default Driveway rate
    if (projectType === 'commercial') baseRate = 60;
    if (projectType === 'sports') baseRate = 80;
    if (projectType === 'markings') baseRate = 22;
    if (projectType === 'civil') baseRate = 75;

    let materialFactor = 1.0;
    if (selectedMaterial === 'sma') materialFactor = 1.25;
    if (selectedMaterial === 'tar_chip') materialFactor = 0.85;
    if (selectedMaterial === 'resin') materialFactor = 1.45;
    if (selectedMaterial === 'wetpour') materialFactor = 1.55;
    if (selectedMaterial === 'thermoplastic') materialFactor = 0.50;

    let accessMultiplier = accessibility === 'restricted' ? 1.15 : 1.0;

    const ratePerSqMeter = baseRate * materialFactor * accessMultiplier;
    const rawCost = ratePerSqMeter * areaSize;
    
    // Provide nice low-high range
    const lowEstimate = Math.round(rawCost * 0.92);
    const highEstimate = Math.round(rawCost * 1.08);

    // Estimate materials needed (typically ~100kg asphalt per sq meter at 40-50mm compacted depth)
    const tonnage = Math.round((areaSize * 0.1) * 10) / 10;

    // Estimate timeline
    let days = '1-2 Days';
    if (areaSize > 1500) days = '10-14 Days';
    else if (areaSize > 600) days = '5-9 Days';
    else if (areaSize > 250) days = '3-4 Days';

    return {
      low: lowEstimate.toLocaleString('en-IE'),
      high: highEstimate.toLocaleString('en-IE'),
      tonnage,
      days
    };
  };

  const currentEstimate = calculateEstimate();

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setQuoteSubmitted(true);
  };

  // Filter project lists
  const filteredProjects = projects.filter(proj => {
    if (activeTab === 'All') return true;
    return proj.category.toLowerCase().includes(activeTab.toLowerCase()) || 
           proj.material.toLowerCase().includes(activeTab.toLowerCase()) ||
           (activeTab === 'Sports & Play' && proj.category === 'Sports & Play');
  });

  // Filter county lists
  const filteredCounties = counties.filter(co => {
    const matchesSearch = co.name.toLowerCase().includes(countySearch.toLowerCase());
    const matchesProvince = selectedProvince === 'All' || co.province === selectedProvince;
    return matchesSearch && matchesProvince;
  });

  // Send fake WhatsApp prompt
  const triggerWhatsAppSend = () => {
    if (!chatInput.trim()) return;
    window.open(`https://wa.me/35316523544?text=${encodeURIComponent(chatInput)}`, '_blank');
    setChatInput('');
  };

  return (
    <div className="relative min-h-screen text-concrete bg-asphalt selection:bg-amber-primary selection:text-asphalt overflow-x-hidden">

      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-amber-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* ── AMBIENT GLASS BACKGROUND GRID ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-pulse"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-primary/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-charcoal/20 rounded-full blur-[100px]"></div>
        <div className="noise-overlay absolute inset-0"></div>
      </div>

      {/* ── HIGH-END MOUSE FOLLOW PLUG ── */}
      <div 
        className={`cursor hidden lg:block ${cursorHovered ? 'w-[56px] h-[56px] bg-amber-primary border border-asphalt text-asphalt scale-125' : 'w-3 h-3 bg-concrete'} fixed pointer-events-none rounded-full z-50 mix-blend-difference transition-transform duration-100 ease-out`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%)`,
        }}
      />

      {/* ═══ NAVIGATION BAR ═══ */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-7xl z-40">
        <nav className="glass-morphism rounded-full px-6 md:px-8 py-3 flex items-center justify-between border border-border">
          
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-none"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <defs>
                <radialGradient id="rg2" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#7f1d1d" stopOpacity="1"/>
                </radialGradient>
              </defs>
              <circle cx="20" cy="20" r="20" fill="url(#rg2)"/>
              {/* main swoosh: lower-left to upper-right */}
              <path d="M11 31 L29 11" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              {/* secondary shorter slash */}
              <path d="M11 21 L21 11" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="font-sans font-black tracking-widest text-base text-white group-hover:text-red-400 transition-colors uppercase">
              E <span className="text-red-500">NUZUM</span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {['Services', 'Projects', 'Process', 'Testimonials', 'Calculator'].map((link) => (
              <li key={link}>
                <a 
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium tracking-tight text-white hover:text-amber-primary transition-colors cursor-none"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a 
              href="tel:016523544" 
              className="hidden lg:flex items-center gap-2 text-sm font-bold text-amber-primary cursor-none hover:brightness-125"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <Phone className="w-4 h-4" />
              <span>(01) 652 3544</span>
            </a>
            <a 
              href="#calculator" 
              className="bg-concrete hover:bg-amber-primary text-asphalt text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg hover:shadow-amber-primary/20 transition-all cursor-none inline-flex items-center gap-1.5"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              Get Pricing →
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-concrete focus:outline-none p-1 cursor-none"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full glass-morphism rounded-3xl p-6 border border-border flex flex-col gap-4 shadow-2xl md:hidden"
            >
              {['Services', 'Projects', 'Process', 'Testimonials', 'Calculator'].map((link) => (
                <a 
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-white hover:text-amber-primary py-2 border-b border-white/20"
                >
                  {link}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <a href="tel:016523544" className="flex items-center gap-2 text-amber-primary font-bold">
                  <Phone className="w-4 h-4" />
                  <span>(01) 652 3544</span>
                </a>
                <a href="mailto:quotes@enuzum.ie" className="flex items-center gap-2 text-white text-sm">
                  <Mail className="w-4 h-4" />
                  <span>quotes@enuzum.ie</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══ PARALLAX HERO SECTION ═══ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-asphalt/20 via-asphalt/65 to-asphalt z-10"></div>
          <motion.img
            src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1920&q=80"
            alt="Asphalt laying steam roller"
            className="w-full h-full object-cover scale-110 filter brightness-50 contrast-110 saturate-[0.85]"
            style={{ y: heroImageY }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 z-20 text-center flex flex-col items-center gap-6 mt-12 md:mt-20">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass border border-border backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-amber-primary animate-pulse shadow-[0_0_10px_#FF6B00]"></span>
            <span className="font-mono text-xs text-white tracking-widest uppercase">
              Engineering Excellence Since 1956
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter leading-[0.9] text-concrete select-none"
            >
              Surfacing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-primary via-orange-500 to-amber-primary bg-300% animate-pulse">
                Redefined.
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-sm sm:text-lg text-white font-light leading-relaxed tracking-wide px-2"
          >
            Ireland's premier surfacing specialists. Precision-engineered tarmacadam, asphalt &amp; civil solutions built to last.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-row flex-wrap items-center justify-center gap-3 mt-2 w-full"
          >
            <a
              href="#calculator"
              className="flex-1 min-w-[140px] bg-white text-asphalt hover:bg-amber-primary font-bold px-5 py-3 sm:px-8 sm:py-4 rounded-full shadow-[0_12px_30px_-6px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2 cursor-none text-sm sm:text-base"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              Get A Price <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#projects"
              className="flex-1 min-w-[140px] glass-morphism border border-border hover:border-concrete/50 text-concrete font-semibold px-5 py-3 sm:px-8 sm:py-4 rounded-full transition-all flex items-center justify-center gap-2 cursor-none text-sm sm:text-base"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              Our Portfolio
            </a>
          </motion.div>

          <div className="absolute bottom-[-90px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="font-mono text-[9px] tracking-widest uppercase">Scroll Down</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-concrete via-transparent to-transparent animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP / COUNTERS SECTION ═══ */}
      <section ref={trustRef} className="relative bg-white border-y border-gray-200 py-6 md:py-12 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 text-center">

          {[
            { value: counts.years, suffix: '', label: 'Years of Legacy', color: 'text-black', labelColor: 'text-black', delay: 0 },
            { value: counts.teams, suffix: '%', label: 'In-House Crew', color: 'text-zinc-700', labelColor: 'text-zinc-600', delay: 0.08 },
            { value: counts.projects, suffix: '+', label: 'Bespoke Projects', color: 'text-zinc-700', labelColor: 'text-zinc-600', delay: 0.16 },
            { value: counts.counties, suffix: '', label: 'Counties Covered', color: 'text-black', labelColor: 'text-black', delay: 0.24 },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="pt-2 md:pt-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: stat.delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className={`font-mono text-3xl md:text-5xl lg:text-6xl font-black tracking-tight ${stat.color}`}>
                {stat.value}{stat.suffix}
              </h3>
              <p className={`text-xs font-mono uppercase tracking-widest mt-2 ${stat.labelColor}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ═══ ANIMATED BACKGROUND WRAPPER (partners → footer) ═══ */}
      <div className="relative bg-[#080808]">

        {/* Animated gradient orbs — always behind content */}
        <div className="sticky top-0 h-0 overflow-visible pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-screen -z-10 overflow-hidden">
            {/* Orb 1 — large amber top-right */}
            <motion.div
              className="absolute top-[-30%] right-[-15%] w-[900px] h-[900px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.28) 0%, transparent 70%)', filter: 'blur(80px)' }}
              animate={{ y: [0, 120, -40, 0], x: [0, -60, 20, 0] }}
              transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Orb 2 — mid amber bottom-left */}
            <motion.div
              className="absolute bottom-[-30%] left-[-20%] w-[750px] h-[750px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,80,0,0.22) 0%, transparent 70%)', filter: 'blur(90px)' }}
              animate={{ y: [0, -80, 40, 0], x: [0, 70, -20, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
            />
            {/* Orb 3 — subtle center drift */}
            <motion.div
              className="absolute top-[30%] left-[35%] w-[550px] h-[550px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,130,0,0.12) 0%, transparent 70%)', filter: 'blur(110px)' }}
              animate={{ y: [0, 100, -60, 0], x: [0, -90, 40, 0] }}
              transition={{ duration: 45, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
            />
            {/* Orb 4 — deep red top-left accent */}
            <motion.div
              className="absolute top-[10%] left-[-10%] w-[480px] h-[480px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(180,40,0,0.18) 0%, transparent 70%)', filter: 'blur(100px)' }}
              animate={{ y: [0, 150, -30, 0], x: [0, 50, -30, 0] }}
              transition={{ duration: 33, repeat: Infinity, ease: 'easeInOut', delay: 18 }}
            />
          </div>
        </div>

      {/* ═══ COMBINED PARTNERS & GOOGLE REVIEWS SECTION ═══ */}
      <section className="relative bg-black/60 border-b border-border py-5 md:py-10 overflow-hidden z-10 select-none">
        {/* Centers subtitle */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center mb-6">
          <p className="text-xs md:text-sm font-mono uppercase tracking-widest text-amber-primary/90 font-medium">
            Our partners combine the 68 years of legacy
          </p>
        </div>

        {/* Scrolling Marquee */}
        <div className="flex overflow-hidden mb-8 md:mb-10">
          <div className="flex gap-16 animate-marquee whitespace-nowrap flex-nowrap min-w-full shrink-0">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                {[
                  { component: <IrishRailLogo /> },
                  { component: <MisericordiaLogo /> },
                  { component: <MaynoothLogo /> },
                  { component: <RteLogo /> },
                  { component: <UcdLogo /> }
                ].map((partner, index) => (
                  <div key={index} className="inline-flex items-center gap-16">
                    <div className="flex items-center">
                      {partner.component}
                    </div>
                    <div className="h-8 w-[1px] bg-white/10 self-center"></div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Google Reviews Strip Divider & Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-primary text-amber-primary" />
              ))}
            </div>
            <div className="text-sm font-medium tracking-tight text-white/90">
              <span className="font-bold text-amber-primary">4.9 / 5.0 Rating</span> based on 142+ verified Google Business reviews.
            </div>
          </div>
          <button 
            onClick={() => setReviewsOpen(true)}
            className="text-xs font-mono uppercase tracking-wider text-amber-primary hover:text-white border-b border-amber-primary/45 pb-0.5 transition-colors cursor-none"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            Read Customer Testimonials →
          </button>
        </div>
      </section>

      {/* Testimonials Sidebar Drawer */}
      <AnimatePresence>
        {reviewsOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex justify-end"
            onClick={() => setReviewsOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg h-full bg-charcoal border-l border-border p-6 md:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <h3 className="font-sans font-bold text-xl text-concrete">Verified Google Reviews</h3>
                  <button 
                    onClick={() => setReviewsOpen(false)}
                    className="p-1 hover:bg-white/5 rounded-full text-concrete/60 hover:text-concrete"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {testimonials.map((test) => (
                    <div key={test.id} className="bg-white p-4 rounded-xl shadow-lg border border-zinc-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-0.5 text-amber-primary">
                          {[...Array(test.rating)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-amber-primary text-amber-primary" />
                          ))}
                        </div>
                        <span className="text-[8px] font-mono font-bold bg-amber-primary/10 text-amber-primary px-1.5 py-0.5 rounded uppercase tracking-wider">{test.projectSpecs}</span>
                      </div>
                      <p className="text-xs text-zinc-800 italic leading-relaxed mb-3">
                        "{test.quote}"
                      </p>
                      <div className="flex items-center gap-2">
                        <img src={test.avatar} alt={test.client} className="w-7 h-7 rounded-full object-cover border border-zinc-100" />
                        <div>
                          <h4 className="text-[10px] font-bold text-zinc-900 leading-tight">{test.client}</h4>
                          <p className="text-[8px] text-zinc-500">{test.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 mt-6 text-center">
                <a 
                  href="#calculator" 
                  onClick={() => setReviewsOpen(false)}
                  className="inline-flex items-center gap-2 bg-amber-primary text-asphalt font-bold px-6 py-3 rounded-full text-xs w-full justify-center hover:brightness-115"
                >
                  Schedule Your Free Core Survey <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ SERVICES SECTION REMOVED ═══ */}
      {false && <section className="relative py-20 px-6 md:px-8 max-w-7xl mx-auto" id="services">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-amber-primary block mb-3">
              01 — Our Speciality
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-white">
              Engineered for every surface.
            </h2>
          </motion.div>
          <motion.p
            className="max-w-md text-white/70 font-light text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            From safety wetpour playgrounds to heavy-duty industrial tarmac, we engineer durability from the gravel base upwards.
          </motion.p>
        </div>

        <ImageGallery 
          services={services} 
          onSelect={(id) => setActiveService(id)} 
          setCursorHovered={setCursorHovered} 
        />

        {/* Dynamic Service Details Modal overlay */}
        <AnimatePresence>
          {activeService && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
              onClick={() => setActiveService(null)}
            >
              {(() => {
                const s = services.find(x => x.id === activeService);
                if (!s) return null;
                return (
                  <motion.div 
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-charcoal border border-border rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
                  >
                    <div className="h-48 md:h-60 relative">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.bg})` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent"></div>
                      <button 
                        onClick={() => setActiveService(null)}
                        className="absolute top-4 right-4 bg-black/55 backdrop-blur-md hover:bg-amber-primary hover:text-asphalt text-concrete p-2 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6 md:p-8">
                      <span className="font-mono text-xs text-amber-primary uppercase tracking-widest block mb-2">
                        {s.num}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-sans font-black tracking-tight mb-4">
                        {s.title}
                      </h3>
                      <p className="text-sm text-white font-light leading-relaxed mb-6">
                        {s.longDesc}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-5 text-xs font-mono">
                        <div>
                          <span className="text-white/80 block">TYPICAL TIMELINE</span>
                          <span className="text-white font-bold">{s.timeline}</span>
                        </div>
                        <div>
                          <span className="text-white/80 block">PRIMARY AGGREGATES</span>
                          <span className="text-white font-bold">{s.materials}</span>
                        </div>
                      </div>

                      <div className="mt-8 flex gap-3">
                        <a 
                          href="#calculator" 
                          onClick={() => {
                            setProjectType(s.id as any);
                            setActiveService(null);
                          }}
                          className="flex-1 bg-amber-primary text-asphalt font-bold text-center py-3.5 rounded-full text-xs hover:brightness-110 tracking-wider uppercase transition-all"
                        >
                          Configure Live Estimate
                        </a>
                        <button 
                          onClick={() => setActiveService(null)}
                          className="px-6 py-3.5 rounded-full text-xs font-bold border border-border text-white hover:text-white hover:border-white/55 transition-colors"
                        >
                          Close Detail
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </section>}

      {/* Before/After rendered after calculator — placeholder removed */}
      {false && <section className="relative py-24 bg-black/45 border-y border-border" id="projects">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono tracking-widest text-amber-primary uppercase block">
              02 — Featured Transformation
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight">
              Villa Blanchard <br />Residents Association.
            </h2>
            <p className="text-sm sm:text-base text-white font-light leading-relaxed">
              We completed a total structural restoration of over 2.4 kilometers of private estate lanes, upgrading compromised foundation aggregates, laying premium stone mastic asphalt, and painting reflective markings.
            </p>

            <div className="grid grid-cols-3 gap-4 bg-charcoal/40 p-5 rounded-2xl border border-border text-center">
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-amber-primary block">2.4km</span>
                <span className="text-[10px] text-white font-mono tracking-wider uppercase block mt-1">Lanes Restored</span>
              </div>
              <div className="border-x border-white/20">
                <span className="font-mono text-xl sm:text-2xl font-bold text-concrete block">14 Days</span>
                <span className="text-[10px] text-white font-mono tracking-wider uppercase block mt-1">Turnaround</span>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-concrete block">100%</span>
                <span className="text-[10px] text-white font-mono tracking-wider uppercase block mt-1">Satisfaction</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href="#calculator" 
                className="bg-concrete hover:bg-amber-primary text-asphalt text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-all cursor-none"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                Discuss Your Estate Road <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Interactive Drag Before/After viewport */}
          <div className="relative flex flex-col gap-2">
            <div 
              ref={sliderRef}
              className="relative h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden border border-border select-none touch-none cursor-ew-resize"
              onMouseDown={() => { isDragging.current = true; }}
              onMouseUp={() => { isDragging.current = false; }}
              onMouseLeave={() => { isDragging.current = false; }}
              onMouseMove={onSliderMouseMove}
              onTouchStart={() => { isDragging.current = true; }}
              onTouchEnd={() => { isDragging.current = false; }}
              onTouchMove={onSliderTouchMove}
            >
              {/* Before image background */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565043589221-1a6fd9ae1d80?auto=format&fit=crop&w=1200&q=80)' }}
              >
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-concrete border border-white/10">
                  Before E. Nuzum
                </span>
              </div>

              {/* After image overlay (dynamic clip) */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80)',
                  clipPath: `inset(0 0 0 ${sliderPos}%)`
                }}
              >
                <span className="absolute top-4 right-4 bg-amber-primary/95 text-asphalt font-mono px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-black/10">
                  After Paving
                </span>
              </div>

              {/* Slider boundary handle bar */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-amber-primary pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-amber-primary text-asphalt flex items-center justify-center font-bold text-sm shadow-[0_0_20px_rgba(255,107,0,0.6)]">
                  ↔
                </div>
              </div>
            </div>
            <span className="text-center font-mono text-[10px] text-white/70 uppercase tracking-widest mt-1">
              Drag Center Handle To Compare Road Surface Quality
            </span>
          </div>

        </div>
      </section>}

      {/* ═══ PROJECT GALLERY / SHOWCASE ═══ */}
      <section className="relative py-10 md:py-20 px-4 md:px-8 max-w-7xl mx-auto" id="projects">

        <motion.div
          className="text-center max-w-2xl mx-auto mb-5 md:mb-10"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-mono tracking-widest text-amber-primary uppercase block mb-2">
            01 — Project Showcase
          </span>
          <h2 className="text-2xl sm:text-5xl font-sans font-black tracking-tight mb-2 md:mb-4">
            Legacy in tarmacadam.
          </h2>
          <p className="text-sm text-white font-light">
            Explore E. Nuzum's premium surfacing projects across the republic. Filter by sector specialization.
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5 md:mb-8">
          {['All', 'Commercial', 'Residential', 'Sports & Play', 'Line Markings', 'Civil'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-mono transition-all uppercase tracking-wider cursor-none ${
                activeTab === tab 
                  ? 'bg-amber-primary text-asphalt font-bold shadow-[0_4px_12px_rgba(255,107,0,0.25)]' 
                  : 'bg-glass text-white/90 hover:text-white border border-border'
              }`}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                key={proj.id}
                className="group relative rounded-xl overflow-hidden border border-border bg-charcoal min-h-[170px] sm:min-h-[280px] flex flex-col justify-end p-3 sm:p-5 cursor-none"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${proj.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/35 to-transparent"></div>
                
                <div className="relative z-10 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-wider text-amber-primary uppercase px-2 py-0.5 rounded bg-black/40 border border-amber-primary/10 w-fit">
                      {proj.category}
                    </span>
                    <span className="text-[10px] text-white/80 font-mono inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-primary" /> {proj.location}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-concrete group-hover:text-amber-primary transition-colors mt-1">
                    {proj.title}
                  </h4>
                  <div className="border-t border-white/20 pt-2 mt-1 grid grid-cols-2 gap-2 text-[9px] font-mono text-white/80 uppercase">
                    <div>
                      <span>Aggregates:</span>
                      <span className="block text-white font-bold">{proj.material}</span>
                    </div>
                    <div>
                      <span>Duration:</span>
                      <span className="block text-white font-bold">{proj.timeline}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* ═══ LEADS CAPTURE + PRICE ESTIMATE ═══ */}
      <section className="relative py-10 md:py-16 bg-gradient-to-b from-asphalt via-charcoal/20 to-asphalt border-y border-border" id="calculator">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          <motion.div
            className="text-center max-w-xl mx-auto mb-6 md:mb-10"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-mono tracking-widest text-amber-primary uppercase block mb-3">
              02 — Get A Price
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-black tracking-tight mb-2">
              Get your instant estimate.
            </h2>
            <p className="text-sm text-white/60 font-light">
              Tell us about your project and we'll call you back within 2 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

            {/* LEFT — Lead capture form */}
            <motion.div
              className="lg:col-span-3 bg-black/40 border border-border rounded-2xl p-4 md:p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {!quoteSubmitted ? (
                <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-5">

                  {/* Project type */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60 block mb-2">Project Type</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {[
                        { id: 'residential', label: 'Driveway' },
                        { id: 'commercial', label: 'Commercial' },
                        { id: 'sports', label: 'Sports' },
                        { id: 'markings', label: 'Markings' },
                        { id: 'civil', label: 'Civil' }
                      ].map((type) => (
                        <button
                          type="button"
                          key={type.id}
                          onClick={() => {
                            setProjectType(type.id as any);
                            if (type.id === 'residential') setSelectedMaterial('tarmac');
                            if (type.id === 'commercial') setSelectedMaterial('sma');
                            if (type.id === 'sports') setSelectedMaterial('wetpour');
                            if (type.id === 'markings') setSelectedMaterial('thermoplastic');
                            if (type.id === 'civil') setSelectedMaterial('tarmac');
                          }}
                          className={`py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-wide border cursor-none transition-all ${
                            projectType === type.id
                              ? 'bg-amber-primary text-asphalt border-amber-primary'
                              : 'bg-glass border-border text-white hover:border-white/40'
                          }`}
                          onMouseEnter={() => setCursorHovered(true)}
                          onMouseLeave={() => setCursorHovered(false)}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Area size */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-white/60">Area Size</label>
                      <span className="text-xs font-bold text-amber-primary font-mono">{areaSize} m²</span>
                    </div>
                    <input
                      type="range"
                      min="20" max="2500" step="10"
                      value={areaSize}
                      onChange={(e) => setAreaSize(parseInt(e.target.value))}
                      className="w-full h-1 bg-charcoal rounded-lg appearance-none cursor-ew-resize accent-amber-primary focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                      <span>20m²</span><span>2,500m²+</span>
                    </div>
                  </div>

                  {/* Contact fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" required placeholder="Your Name" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-charcoal/60 border border-border rounded-xl px-4 py-3 text-sm focus:border-amber-primary focus:outline-none transition-all text-white placeholder:text-white/40"
                    />
                    <input type="tel" required placeholder="Mobile Number" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-charcoal/60 border border-border rounded-xl px-4 py-3 text-sm focus:border-amber-primary focus:outline-none transition-all text-white placeholder:text-white/40"
                    />
                    <input type="email" required placeholder="Email Address" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-charcoal/60 border border-border rounded-xl px-4 py-3 text-sm focus:border-amber-primary focus:outline-none transition-all text-white placeholder:text-white/40"
                    />
                    <select value={formData.county} onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                      className="bg-charcoal/60 border border-border rounded-xl px-4 py-3 text-sm focus:border-amber-primary focus:outline-none transition-all text-white"
                    >
                      {counties.map((co) => <option key={co.name} value={co.name}>{co.name}</option>)}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-primary text-asphalt font-bold tracking-wider uppercase py-3.5 rounded-xl hover:brightness-110 transition-all cursor-none"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    Get My Free Quote →
                  </button>

                  <p className="text-[10px] text-white/40 text-center font-mono">
                    We call back within 2 business hours. No obligation.
                  </p>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-amber-primary/10 border border-amber-primary flex items-center justify-center text-amber-primary text-2xl">✓</div>
                  <h3 className="text-xl font-bold">We'll be in touch soon!</h3>
                  <p className="text-sm text-white/70 max-w-sm">
                    Thanks <span className="text-white font-bold">{formData.name}</span>. An engineer will call <span className="text-amber-primary">{formData.phone}</span> within 2 hours.
                  </p>
                  <button onClick={() => { setQuoteSubmitted(false); setFormData({ name: '', email: '', phone: '', county: 'Dublin' }); }}
                    className="text-xs font-mono uppercase tracking-wider text-amber-primary border-b border-amber-primary/40 pb-0.5 mt-2">
                    Submit Another
                  </button>
                </div>
              )}
            </motion.div>

            {/* RIGHT — Compact live price estimate */}
            <motion.div
              className="lg:col-span-2 bg-gradient-to-br from-charcoal to-asphalt border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col gap-4 lg:sticky lg:top-28"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-amber-primary uppercase">Live Estimate</span>
                <span className="w-2 h-2 rounded-full bg-amber-primary animate-pulse" />
              </div>

              <div>
                <span className="text-[10px] text-white/50 font-mono uppercase block mb-1">Estimated Range</span>
                <div className="text-3xl font-black text-amber-primary tracking-tight">
                  €{currentEstimate.low}
                </div>
                <div className="text-sm text-white/60 font-mono">to €{currentEstimate.high}</div>
                <p className="text-[9px] text-white/30 font-mono mt-1">Excl. VAT. Subject to site survey.</p>
              </div>

              <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-3 text-[10px] font-mono">
                <div>
                  <span className="text-white/50 block uppercase">Timeline</span>
                  <span className="text-white font-bold">{currentEstimate.days}</span>
                </div>
                <div>
                  <span className="text-white/50 block uppercase">Materials</span>
                  <span className="text-white font-bold">{currentEstimate.tonnage}T</span>
                </div>
                <div>
                  <span className="text-white/50 block uppercase">Project</span>
                  <span className="text-amber-primary font-bold capitalize">{projectType}</span>
                </div>
                <div>
                  <span className="text-white/50 block uppercase">Area</span>
                  <span className="text-white font-bold">{areaSize}m²</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-2 text-[10px] text-white/60">
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-amber-primary shrink-0" /><span>100% Price Lock on confirmed quote</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-amber-primary shrink-0" /><span>CIRI Registered & Safe-T-Cert teams</span></div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══ 02 — FEATURED TRANSFORMATION (compact) ═══ */}
      <section className="relative py-8 md:py-14 bg-black/45 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-mono tracking-widest text-amber-primary uppercase">03 — Featured Transformation</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-black tracking-tight">
              Villa Blanchard <br />Residents Association.
            </h2>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              2.4km of private estate lanes fully restored — new sub-base, premium SMA asphalt, and reflective line markings.
            </p>
            <div className="flex gap-6 text-center">
              {[['2.4km', 'Restored'], ['14 Days', 'Turnaround'], ['100%', 'Satisfaction']].map(([val, lbl]) => (
                <div key={lbl}>
                  <span className="font-mono font-black text-amber-primary text-lg block">{val}</span>
                  <span className="text-[9px] text-white/60 font-mono uppercase">{lbl}</span>
                </div>
              ))}
            </div>
            <a href="#calculator"
              className="self-start bg-white text-asphalt text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-full inline-flex items-center gap-2 hover:bg-amber-primary transition-all cursor-none"
              onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)}>
              Discuss Your Project <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Compact before/after slider */}
          <motion.div
            className="relative flex flex-col gap-2"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={sliderRef}
              className="relative h-[220px] sm:h-[300px] w-full rounded-2xl overflow-hidden border border-border select-none touch-none cursor-ew-resize"
              onMouseDown={() => { isDragging.current = true; }}
              onMouseUp={() => { isDragging.current = false; }}
              onMouseLeave={() => { isDragging.current = false; }}
              onMouseMove={onSliderMouseMove}
              onTouchStart={() => { isDragging.current = true; }}
              onTouchEnd={() => { isDragging.current = false; }}
              onTouchMove={onSliderTouchMove}
            >
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565043589221-1a6fd9ae1d80?auto=format&fit=crop&w=1200&q=80)' }}>
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase text-concrete border border-white/10">Before</span>
              </div>
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80)', clipPath: `inset(0 0 0 ${sliderPos}%)` }}>
                <span className="absolute top-3 right-3 bg-amber-primary/95 text-asphalt font-mono px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase">After</span>
              </div>
              <div className="absolute top-0 bottom-0 w-0.5 bg-amber-primary pointer-events-none" style={{ left: `${sliderPos}%` }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-primary text-asphalt flex items-center justify-center text-xs font-bold shadow-lg">↔</div>
              </div>
            </div>
            <span className="text-center font-mono text-[9px] text-white/50 uppercase tracking-widest">Drag to compare</span>
          </motion.div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS SECTION (LEFT TO RIGHT SCROLLING MARQUEE) ═══ */}
      <section className="relative py-10 md:py-20 overflow-hidden" id="testimonials">

        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10 px-6 md:px-8">
          <span className="text-xs font-mono tracking-widest text-amber-primary uppercase block mb-3">
            05 — Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight mb-4 text-white">
            Trusted by communities.
          </h2>
          <p className="text-sm text-white/70 font-light leading-relaxed">
            We deliver the highest customer retention metrics in the Irish paving industry. Our clients speak for themselves.
          </p>
        </div>

        {/* Scrolling marquee track */}
        <div className="relative w-full overflow-hidden py-4 select-none">
          <div className="flex gap-6 animate-marquee-reverse hover:[animation-play-state:paused] w-max">
            {/* First sequence of cards */}
            <div className="flex gap-6 shrink-0">
              {testimonials.map((test) => (
                <div 
                  key={`track1-${test.id}`}
                  className="w-[280px] sm:w-[320px] shrink-0 bg-white text-asphalt p-5 rounded-2xl flex flex-col justify-between gap-4 text-left shadow-xl border border-white"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-0.5 text-amber-primary">
                      {[...Array(test.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-primary text-amber-primary" />
                      ))}
                    </div>
                    <p className="text-xs text-zinc-800 font-medium leading-relaxed italic">
                      "{test.quote}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
                    <div className="flex items-center gap-2.5">
                      <img src={test.avatar} alt={test.client} className="w-8 h-8 rounded-full object-cover border border-zinc-100" />
                      <div>
                        <h4 className="text-[11px] font-bold text-zinc-900 leading-tight">{test.client}</h4>
                        <p className="text-[9px] text-zinc-500 leading-none mt-0.5">{test.role}</p>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono text-amber-primary/90 uppercase tracking-wider font-bold bg-amber-primary/5 px-2 py-0.5 rounded">
                      {test.projectSpecs}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Second identical sequence of cards for seamless wrap-around */}
            <div className="flex gap-6 shrink-0">
              {testimonials.map((test) => (
                <div 
                  key={`track2-${test.id}`}
                  className="w-[280px] sm:w-[320px] shrink-0 bg-white text-asphalt p-5 rounded-2xl flex flex-col justify-between gap-4 text-left shadow-xl border border-white"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-0.5 text-amber-primary">
                      {[...Array(test.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-primary text-amber-primary" />
                      ))}
                    </div>
                    <p className="text-xs text-zinc-800 font-medium leading-relaxed italic">
                      "{test.quote}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
                    <div className="flex items-center gap-2.5">
                      <img src={test.avatar} alt={test.client} className="w-8 h-8 rounded-full object-cover border border-zinc-100" />
                      <div>
                        <h4 className="text-[11px] font-bold text-zinc-900 leading-tight">{test.client}</h4>
                        <p className="text-[9px] text-zinc-500 leading-none mt-0.5">{test.role}</p>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono text-amber-primary/90 uppercase tracking-wider font-bold bg-amber-primary/5 px-2 py-0.5 rounded">
                      {test.projectSpecs}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ═══ ENGINEERING METHODOLOGY — spinning cards ═══ */}
      <section className="relative py-10 md:py-20 px-4 md:px-8 max-w-7xl mx-auto" id="process">

        <motion.div
          className="text-center max-w-xl mx-auto mb-6 md:mb-10"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-mono tracking-widest text-amber-primary uppercase block mb-3">
            05 — Engineering Methodology
          </span>
          <h2 className="text-2xl sm:text-5xl font-sans font-black tracking-tight mb-2">
            End-to-end precision.
          </h2>
          <p className="text-sm text-white/60 font-light">
            In-house control across all four phases. No subcontractors, no compromises.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {[
            { step: '01', title: 'Site Core Survey', desc: 'Engineers drill core samples to assess substructure stability and drainage catchments.', icon: '🔩' },
            { step: '02', title: 'Technical Design', desc: 'CAD cross-sections with precise base gravel depths and surface course grades.', icon: '📐' },
            { step: '03', title: 'Plant Deployment', desc: 'Heavy fleet dispatched from local depots carrying hot asphalt material.', icon: '🚛' },
            { step: '04', title: 'Quality Sign-Off', desc: 'Laser drainage checks, compaction audits, and warranty certificates issued.', icon: '✅' }
          ].map((proc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, rotateY: -30, x: -40 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
              style={{ transformPerspective: 900 }}
              className="bg-charcoal border border-border rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col gap-3 md:gap-4 relative overflow-hidden group hover:border-amber-primary/50 transition-colors duration-300 cursor-none"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <span className="absolute top-4 right-5 text-6xl font-black text-white/[0.04] select-none leading-none">{proc.step}</span>
              <div className="text-2xl">{proc.icon}</div>
              <div>
                <span className="text-[9px] font-mono text-amber-primary tracking-widest uppercase block mb-1.5">Step {proc.step}</span>
                <h3 className="text-base font-bold tracking-tight text-concrete group-hover:text-amber-primary transition-colors mb-2">{proc.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">{proc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ VIDEO SECTION / IMMERSIVE PLAYER ═══ */}
      <section className="relative py-10 md:py-20 bg-black/60 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto mb-6 md:mb-10">
            <span className="text-xs font-mono tracking-widest text-amber-primary uppercase block">
              07 — Watch Our Work
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight">
              Real projects. Real precision.
            </h2>
            <p className="text-sm text-white font-light leading-relaxed">
              Experience the steam-rolling, bitumen spraying, and grading operations live from our municipal roadwork sites.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl bg-charcoal">
            
            {/* Visual elements of custom video viewport */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80" 
                alt="Municipal roadwork site steam roller"
                className={`w-full h-full object-cover transition-all duration-1000 ${isPlaying ? 'brightness-75 scale-100 saturate-[0.9]' : 'brightness-50 scale-105 filter grayscale-[30%]'}`}
              />
            </div>

            {/* Simulated Live Broadcast flashing overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full border border-white/20 text-[9px] font-mono uppercase text-white tracking-widest">
              <span className={`w-2 h-2 rounded-full bg-red-500 ${isPlaying ? 'animate-ping' : ''}`}></span>
              <span>LIVE TRANSMISSION — Dublin depot crew #4</span>
            </div>

            {/* Play/Pause control center overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-amber-primary text-asphalt flex items-center justify-center shadow-[0_0_30px_rgba(255,107,0,0.45)] hover:scale-105 transition-all cursor-none"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-asphalt" /> : <Play className="w-8 h-8 fill-asphalt ml-1" />}
              </button>
            </div>

            {/* Bottom player controls bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-asphalt to-transparent z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs font-mono">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <span className="text-[10px] text-white/80">00:44 / 02:30</span>
              </div>

              {/* Progress track */}
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-primary transition-all duration-300"
                  style={{ width: `${videoProgress}%` }}
                ></div>
              </div>

              <div className="text-[10px] font-mono text-white/90">
                1080p HD
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══ HIGH-CONVERSION CTA BANNER ═══ */}
      <section className="relative py-10 md:py-20 px-4 md:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-6xl font-sans font-black tracking-tighter text-white leading-none">
            Let's build <br />
            <span className="italic font-light text-amber-primary">something lasting.</span>
          </h2>
          <p className="text-sm text-white font-light max-w-xl leading-relaxed">
            From estate driveways to municipal roads. 10-year warranty guaranteed.
          </p>

          <div className="flex flex-row flex-wrap items-center justify-center gap-3 mt-2 w-full">
            <a
              href="tel:016523544"
              className="flex-1 min-w-[130px] bg-amber-primary text-asphalt hover:brightness-110 font-bold px-5 py-3 sm:px-8 sm:py-4 rounded-full shadow-[0_12px_30px_-6px_rgba(255,107,0,0.35)] transition-all flex items-center justify-center gap-2 cursor-none text-sm sm:text-base"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <Phone className="w-5 h-5" /> Call (01) 652 3544
            </a>
            <a
              href="mailto:quotes@enuzum.ie"
              className="flex-1 min-w-[130px] glass-morphism border border-border hover:border-white text-white font-semibold px-5 py-3 sm:px-8 sm:py-4 rounded-full transition-all flex items-center justify-center gap-2 cursor-none text-sm sm:text-base"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <Mail className="w-5 h-5" /> Email quotes@enuzum.ie
            </a>
          </div>
        </div>
      </section>

      {/* ═══ LATEST INSIGHTS (BLOG) ═══ */}
      <section className="relative py-10 md:py-20 bg-black/30 border-t border-border" id="insights">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-3 mb-6 md:mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-primary block mb-3">
                09 — Educational Resources
              </span>
              <h2 className="text-2xl md:text-5xl font-sans font-black tracking-tight">
                Latest Insights
              </h2>
            </div>
            <p className="max-w-md text-white font-light text-sm md:text-base">
              Industry updates, material science reports, and professional guides to planning and protecting your civil investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Card 1 */}
            <div className="group bg-charcoal/30 border border-border rounded-3xl overflow-hidden hover:border-amber-primary/30 transition-all duration-300 flex flex-col h-full">
              <div className="h-32 md:h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80" 
                  alt="Asphalt paving weather factors"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <span className="absolute top-4 left-4 bg-amber-primary/15 text-amber-primary border border-amber-primary/30 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full backdrop-blur-md font-bold">
                  Surfacing Guides
                </span>
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow gap-2 md:gap-3 justify-between">
                <div>
                  <span className="text-[10px] font-mono text-white/80">JUNE 12, 2026 · 5 MIN READ</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-primary transition-colors mt-1 leading-snug">
                    Tarmacadam vs. Asphalt: Choosing the Right Surface for Irish Weather
                  </h3>
                  <p className="text-xs text-white font-light mt-2 leading-relaxed">
                    Understand the fundamental material differences, drainage requirements, and durability factors when selecting between tarmacadam and SMA asphalt.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-primary group-hover:translate-x-1.5 transition-transform mt-4">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-charcoal/30 border border-border rounded-3xl overflow-hidden hover:border-amber-primary/30 transition-all duration-300 flex flex-col h-full">
              <div className="h-32 md:h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80" 
                  alt="Driveway sealant protection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <span className="absolute top-4 left-4 bg-amber-primary/15 text-amber-primary border border-amber-primary/30 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full backdrop-blur-md font-bold">
                  Maintenance
                </span>
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow gap-2 md:gap-3 justify-between">
                <div>
                  <span className="text-[10px] font-mono text-white/80">MAY 28, 2026 · 4 MIN READ</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-primary transition-colors mt-1 leading-snug">
                    Extending the Lifespan of Your Driveway: Key Maintenance Tips
                  </h3>
                  <p className="text-xs text-white font-light mt-2 leading-relaxed">
                    From professional sealcoating and joint patch repairs to protecting against fuel spills, learn how to prevent premature pavement failure.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-primary group-hover:translate-x-1.5 transition-transform mt-4">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-charcoal/30 border border-border rounded-3xl overflow-hidden hover:border-amber-primary/30 transition-all duration-300 flex flex-col h-full">
              <div className="h-32 md:h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80" 
                  alt="Groundworks drainage planning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <span className="absolute top-4 left-4 bg-amber-primary/15 text-amber-primary border border-amber-primary/30 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full backdrop-blur-md font-bold">
                  Civil Engineering
                </span>
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow gap-2 md:gap-3 justify-between">
                <div>
                  <span className="text-[10px] font-mono text-white/80">APRIL 14, 2026 · 6 MIN READ</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-primary transition-colors mt-1 leading-snug">
                    The Importance of Proper Groundworks & Drainage in Civil Projects
                  </h3>
                  <p className="text-xs text-white font-light mt-2 leading-relaxed">
                    Discover how correct grading, aggregate sub-bases, and catch-pit planning prevent flooding and surface shifting under heavy commercial loads.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-primary group-hover:translate-x-1.5 transition-transform mt-4">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ SOCIAL MEDIA ROW ═══ */}
      <section className="relative py-6 md:py-12 border-t border-border bg-black/20 text-center z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center gap-4">
          <h3 className="font-mono text-xs text-white/80 tracking-widest uppercase">
            Follow Our Work
          </h3>
          <div className="flex items-center gap-6 mt-1">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-11 h-11 rounded-full bg-glass border border-border flex items-center justify-center text-white hover:text-amber-primary hover:border-amber-primary/40 transition-all hover:scale-105 cursor-none"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-11 h-11 rounded-full bg-glass border border-border flex items-center justify-center text-white hover:text-amber-primary hover:border-amber-primary/40 transition-all hover:scale-105 cursor-none"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-11 h-11 rounded-full bg-glass border border-border flex items-center justify-center text-white hover:text-amber-primary hover:border-amber-primary/40 transition-all hover:scale-105 cursor-none"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative bg-asphalt border-t border-border pt-10 pb-6 md:pt-16 md:pb-8 px-4 md:px-8 z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-primary flex items-center justify-center text-asphalt font-black text-base shadow-[0_0_15px_rgba(255,107,0,0.4)]">
                  E
                </div>
                <span className="font-sans font-black tracking-tight text-lg text-white">
                  Nuzum<span className="text-amber-primary">.</span>
                </span>
              </div>
              <p className="text-xs text-white leading-relaxed font-light">
                Republic of Ireland's premium tarmacadam, asphalt, and civil engineering specialists. Precision paving since 1956.
              </p>
              <div className="flex flex-col gap-1 text-[10px] text-white/80 font-mono uppercase mt-2">
                <span>ESTABLISHED IN DUBLIN · 1956</span>
                <span>CIRI REGISTRATION NO: 160455</span>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs text-amber-primary uppercase tracking-widest mb-4">Core Services</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-white font-light">
                <li><a href="#services" className="hover:text-white">Commercial Paving</a></li>
                <li><a href="#services" className="hover:text-white">Residential Driveways</a></li>
                <li><a href="#services" className="hover:text-white">Safety EPDM Playgrounds</a></li>
                <li><a href="#services" className="hover:text-white">Thermoplastic Markings</a></li>
                <li><a href="#services" className="hover:text-white">Civil Substructures</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-amber-primary uppercase tracking-widest mb-4">Accreditation</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-white font-light">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-primary" /> CIRI Registered</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-primary" /> Safe-T-Cert accredited</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-primary" /> Fully Insured (€13M Public liability)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-primary" /> Bonded & VAT compliant</li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-amber-primary uppercase tracking-widest mb-4">Inquiries Desk</h4>
              <ul className="flex flex-col gap-2 text-xs text-white font-mono">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-primary" /> (01) 652 3544</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-primary" /> quotes@enuzum.ie</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-primary" /> Dublin Depot, Co. Dublin, Ireland</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/80 uppercase tracking-widest">
            <div>© 2026 E. Nuzum Ltd. All Rights Reserved.</div>
            <div>Engineered & Laid in Ireland</div>
          </div>

          {/* Large elegant subtle watermark */}
          <div className="text-center mt-6 overflow-hidden">
            <span className="text-[5vw] font-sans font-extralight tracking-[2.5em] text-concrete/[0.04] leading-none uppercase select-none inline-block pl-[2.5em]">
              E·NUZUM
            </span>
          </div>

        </div>
      </footer>

      </div>{/* end animated bg wrapper */}

      {/* ═══ FLOATING WHATSAPP CHAT PANEL ═══ */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
        
        {/* WhatsApp Mini chat overlay */}
        <AnimatePresence>
          {whatsAppOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-charcoal border border-border rounded-2xl w-[300px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-[#075E54] p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white"></span>
                    <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white text-base font-bold">
                      A
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">Allen — Quotes Team</h4>
                    <p className="text-[9px] text-white/70">Online now</p>
                  </div>
                </div>
                <button 
                  onClick={() => setWhatsAppOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-asphalt/55 flex flex-col gap-3 h-48 overflow-y-auto text-xs">
                <div className="bg-charcoal p-3 rounded-xl rounded-tl-none border border-border text-white max-w-[85%] self-start leading-normal">
                  Hi there! 👋 I can instantly check E. Nuzum crew availability in your county. Where is your project located?
                </div>
                
                {/* Fast-click chip guides */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    'Dublin Driveway',
                    'Commercial SMA Quote',
                    'Line Markings'
                  ].map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => setChatInput(`Hi Allen, I would like to get a quote for a ${phrase} in Ireland.`)}
                      className="text-[9px] font-mono uppercase bg-glass border border-white/20 hover:border-amber-primary/45 text-white/90 hover:text-white px-2 py-1 rounded animate-none"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-charcoal border-t border-white/20 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && triggerWhatsAppSend()}
                  className="flex-1 bg-asphalt border border-border rounded-lg px-3 py-1.5 text-xs focus:border-amber-primary focus:outline-none text-white"
                />
                <button 
                  onClick={triggerWhatsAppSend}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Bubble with "Chat to us" pop up */}
        <div className="relative flex flex-col items-end">
          {!whatsAppOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute bottom-16 right-0 bg-emerald-600 text-white text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-xl border border-emerald-500 whitespace-nowrap flex items-center gap-2 mb-1"
            >
              <span className="w-1.5 h-1.5 bg-emerald-200 rounded-full animate-ping"></span>
              Chat to us
              <div className="absolute bottom-[-4px] right-6 w-2 h-2 bg-emerald-600 rotate-45 border-r border-b border-emerald-500/20"></div>
            </motion.div>
          )}
          <button 
            onClick={() => setWhatsAppOpen(!whatsAppOpen)}
            className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all scale-100 hover:scale-105 cursor-none"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <MessageSquare className="w-6 h-6 fill-white text-emerald-600" />
          </button>
        </div>
      </div>

    </div>
  );
}
