/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  User,
  Bell,
  Search, 
  Plus,
  ChevronRight,
  ShieldAlert,
  Wallet,
  Users,
  FileText,
  Info,
  Train,
  Menu,
  X,
  TrendingUp,
  Clock,
  MapPin,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Theme Colors (KAI Inspired)
const COLORS = {
  primary: '#0d2149', // Dark Blue
  secondary: '#ff6600', // Orange
  text: '#1a1a1a',
  bg: '#f8fafc'
};

const DRIVE_FOLDERS = {
  pd: "1SFmZ7Sn8C_ZRdb2ff70Xbc256SYQOx_v",
  sop: "1d9WULPpmJO6yboeO3w74e8ZKgMdNxn12",
  ik: "1FZgKb5XFgnrKCHDvOencUgVinLY9NMx_",
  pp: "1hAeS2gTqsKUrE2J2CC2GZTnCOyr8C-nk",
  pm: "1kYtWe-IWXvFPyn_BDEIifKo0_8ctr0i9",
  induction: "1mXrauDpBw2g500yuVNiLlOOLyhsH-kFh",
  simulasi: "1NFHC3To5whFHxf8yzUZpQf_3tx8h5dTl",
  pembinaan: "1_BYuC_qk5W3NvvB8gwYYRYIYrIo04QA1",
  ibpr: "1XEZBZ_xCP2kujNUBJpqLV5qHGSJY2LQi",
  wksb: "1PvszP5Vsy1UDVMJy55eq2WdYRnSvh1ln",
  ksb: "1_KSB_FOLDER_ID",
  spv: "1_SPV_FOLDER_ID",
  pendapatan_pnp: "1_PENDAPATAN_PNP_FOLDER_ID",
  pendapatan_non: "1_PENDAPATAN_NON_FOLDER_ID"
};

const CONFIG_URLS = {
  profil: "https://drive.google.com/file/d/1YcbAxJH9tKSIBGu6lKRBrkQ9VmoKnNc2/preview",
  induction: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.induction}#list`,
  simulasi: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.simulasi}#list`,
  pembinaan: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.pembinaan}#list`,
  ibpr: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.ibpr}#list`,
  nominatif: "https://docs.google.com/spreadsheets/d/1bhp13sGXacqtstyJHdvFGTdJ3RpIsStq2RXOuASfh-A/edit?usp=sharing",
  raport: "https://drive.google.com",
  dinasan: "https://drive.google.com",
  ijk: "https://drive.google.com/file/d/1FmWSrpZuKPVmO7Z0ihiddQu-I5x94pDT/preview",
  ksb: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.ksb}&hl=ID#list`,
  wksb: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.wksb}&hl=ID#list`,
  spv: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.spv}&hl=ID#list`,
  pd: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.pd}#list`,
  sop: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.sop}#list`,
  ik: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.ik}#list`,
  pp: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.pp}#list`,
  pm: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.pm}#list`,
  pendapatan_pnp: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.pendapatan_pnp}&hl=ID#list`,
  pendapatan_non: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDERS.pendapatan_non}&hl=ID#list`
};

const MENU_URLS: Record<string, string> = {
  'profil': CONFIG_URLS.profil,
  'sdm-nominatif': CONFIG_URLS.nominatif,
  'sdm-raport': CONFIG_URLS.raport,
  'sdm-dinasan': CONFIG_URLS.dinasan,
  'sdm-ijk': CONFIG_URLS.ijk,
  'regulasi-pd': CONFIG_URLS.pd,
  'regulasi-pp': CONFIG_URLS.pp,
  'regulasi-pm': CONFIG_URLS.pm,
  'regulasi-sop': CONFIG_URLS.sop,
  'regulasi-ik': CONFIG_URLS.ik,
  'safety-induction': CONFIG_URLS.induction,
  'safety-simulasi': CONFIG_URLS.simulasi,
  'safety-pembinaan': CONFIG_URLS.pembinaan,
  'safety-ibpr': CONFIG_URLS.ibpr,
  'pendapatan-pnp': CONFIG_URLS.pendapatan_pnp,
  'pendapatan-non': CONFIG_URLS.pendapatan_non,
  'realisasi-ksb': CONFIG_URLS.ksb,
  'realisasi-wksb': CONFIG_URLS.wksb,
  'realisasi-spv': CONFIG_URLS.spv,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    sdm: false,
    regulasi: false,
    safety: false,
    pendapatan: false,
    realisasi: false
  });

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  useEffect(() => {
    // Scroll to top when tab changes
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatClock = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    };
    return date.toLocaleTimeString('id-ID', options);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-100">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-20 md:h-24 bg-white/90 backdrop-blur-xl border-b border-slate-200 z-50 flex items-center justify-between px-4 md:px-8 transition-all">
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2.5 hover:bg-slate-100 rounded-xl active:scale-95 transition-transform"
          >
            <Menu size={20} className="md:w-6 md:h-6" />
          </button>
          <div className="flex items-center gap-3">
            <img 
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqa-FEeMtKy0fcVWXUXqv4uUJ99XEsE2VAxHwiqrBZozvp84NfcyFWR1vf3KKdhLI8LkHTEniCv-Q7dboqpGS_TOPtn2-CMm_ay9BGCvhAiajtSW1AVTKu2ncDnQs2xMde-eXbBOHTQL6r4lcWsU3hpYhLgywE_1xoKH6HnvMDk79uRZ0mQGiJoH-HZeYP/s1143/desain-logo-danantara.png" 
              className="h-5 md:h-8 w-auto pointer-events-none" 
              alt="Danantara" 
              referrerPolicy="no-referrer"
            />
            <div className="w-px h-6 md:h-8 bg-slate-200 hidden sm:block" />
            <div className="hidden sm:block">
              <h1 className="font-black text-xs md:text-base tracking-tighter leading-tight text-[#0d2149] uppercase">Stasiun Besar C Banjar</h1>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest hidden md:block">Portal Digital Internal</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex flex-col items-end lg:pr-6 lg:border-r lg:border-slate-100 lg:mr-2">
            <span className="text-sm md:text-xl font-black text-[#0d2149] tabular-nums tracking-tight">
              {formatClock(currentTime)}
            </span>
            <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              {formatDate(currentTime).split(',')[0]}
            </span>
          </div>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_PT_Kereta_Api_Indonesia_%28Persero%29_2020.svg" 
            className="h-5 md:h-8 w-auto" 
            alt="PT KAI" 
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-72 bg-[#0d2149] text-white z-[70] transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}
      >
        <div className="p-6 border-b border-white/10 space-y-6 flex-shrink-0">
          <div className="flex items-center justify-end">
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
          
          <SidebarItem 
            active={activeTab === 'home'} 
            onClick={() => { setActiveTab('home'); setIsSidebarOpen(false); }} 
            icon={LayoutDashboard} 
            label="Dashboard Utama" 
          />
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
          <div className="h-2" />
          <p className="px-4 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Internal Data</p>
          <SidebarItem 
            active={activeTab === 'profil'} 
            onClick={() => { setActiveTab('profil'); setIsSidebarOpen(false); }} 
            icon={Info} 
            label="Profil Stasiun" 
          />
          <SidebarItem 
            active={activeTab.startsWith('sdm')} 
            onClick={() => { setActiveTab('sdm-nominatif'); toggleMenu('sdm'); }} 
            icon={Users} 
            label="Managemen SDM" 
            isExpanded={expandedMenus.sdm}
            hasSubmenu
          />
          <AnimatePresence>
            {expandedMenus.sdm && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-9 space-y-1 overflow-hidden"
              >
                <SubmenuItem 
                  active={activeTab === 'sdm-nominatif'} 
                  onClick={() => { setActiveTab('sdm-nominatif'); setIsSidebarOpen(false); }} 
                  label="Nominatif Pegawai" 
                />
                <SubmenuItem 
                  active={activeTab === 'sdm-raport'} 
                  onClick={() => { setActiveTab('sdm-raport'); setIsSidebarOpen(false); }} 
                  label="Raport Pegawai" 
                />
                <SubmenuItem 
                  active={activeTab === 'sdm-dinasan'} 
                  onClick={() => { setActiveTab('sdm-dinasan'); setIsSidebarOpen(false); }} 
                  label="Daftar Dinasan" 
                />
                <SubmenuItem 
                  active={activeTab === 'sdm-ijk'} 
                  onClick={() => { setActiveTab('sdm-ijk'); setIsSidebarOpen(false); }} 
                  label="IJK" 
                />
              </motion.div>
            )}
          </AnimatePresence>

          <SidebarItem 
            active={activeTab.startsWith('realisasi')} 
            onClick={() => { setActiveTab('realisasi-ksb'); toggleMenu('realisasi'); }} 
            icon={TrendingUp} 
            label="Realisasi Kerja" 
            isExpanded={expandedMenus.realisasi}
            hasSubmenu
          />
          <AnimatePresence>
            {expandedMenus.realisasi && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-9 space-y-1 overflow-hidden"
              >
                <SubmenuItem 
                  active={activeTab === 'realisasi-ksb'} 
                  onClick={() => { setActiveTab('realisasi-ksb'); setIsSidebarOpen(false); }} 
                  label="KSB" 
                />
                <SubmenuItem 
                  active={activeTab === 'realisasi-wksb'} 
                  onClick={() => { setActiveTab('realisasi-wksb'); setIsSidebarOpen(false); }} 
                  label="WKSB" 
                />
                <SubmenuItem 
                  active={activeTab === 'realisasi-spv'} 
                  onClick={() => { setActiveTab('realisasi-spv'); setIsSidebarOpen(false); }} 
                  label="SPV" 
                />
              </motion.div>
            )}
          </AnimatePresence>

          <SidebarItem 
            active={activeTab.startsWith('regulasi')} 
            onClick={() => { setActiveTab('regulasi-pd'); toggleMenu('regulasi'); }} 
            icon={FileText} 
            label="Regulasi" 
            isExpanded={expandedMenus.regulasi}
            hasSubmenu
          />
          <AnimatePresence>
            {expandedMenus.regulasi && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-9 space-y-1 overflow-hidden"
              >
                <SubmenuItem active={activeTab === 'regulasi-pd'} onClick={() => { setActiveTab('regulasi-pd'); setIsSidebarOpen(false); }} label="Peraturan Dinas (PD)" />
                <SubmenuItem active={activeTab === 'regulasi-pp'} onClick={() => { setActiveTab('regulasi-pp'); setIsSidebarOpen(false); }} label="Peraturan Pemerintah" />
                <SubmenuItem active={activeTab === 'regulasi-pm'} onClick={() => { setActiveTab('regulasi-pm'); setIsSidebarOpen(false); }} label="Peraturan Menteri" />
                <SubmenuItem active={activeTab === 'regulasi-sop'} onClick={() => { setActiveTab('regulasi-sop'); setIsSidebarOpen(false); }} label="SOP" />
                <SubmenuItem active={activeTab === 'regulasi-ik'} onClick={() => { setActiveTab('regulasi-ik'); setIsSidebarOpen(false); }} label="Instruksi Kerja" />
              </motion.div>
            )}
          </AnimatePresence>

          <SidebarItem 
            active={activeTab.startsWith('safety')} 
            onClick={() => { setActiveTab('safety-induction'); toggleMenu('safety'); }} 
            icon={ShieldAlert} 
            label="Safety" 
            isExpanded={expandedMenus.safety}
            hasSubmenu
          />
          <AnimatePresence>
            {expandedMenus.safety && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-9 space-y-1 overflow-hidden"
              >
                <SubmenuItem active={activeTab === 'safety-induction'} onClick={() => { setActiveTab('safety-induction'); setIsSidebarOpen(false); }} label="Induction" />
                <SubmenuItem active={activeTab === 'safety-simulasi'} onClick={() => { setActiveTab('safety-simulasi'); setIsSidebarOpen(false); }} label="Simulasi" />
                <SubmenuItem active={activeTab === 'safety-pembinaan'} onClick={() => { setActiveTab('safety-pembinaan'); setIsSidebarOpen(false); }} label="Pembinaan" />
                <SubmenuItem active={activeTab === 'safety-ibpr'} onClick={() => { setActiveTab('safety-ibpr'); setIsSidebarOpen(false); }} label="IBPR" />
              </motion.div>
            )}
          </AnimatePresence>

          <SidebarItem 
            active={activeTab.startsWith('pendapatan')} 
            onClick={() => { setActiveTab('pendapatan-pnp'); toggleMenu('pendapatan'); }} 
            icon={Wallet} 
            label="Pendapatan" 
            isExpanded={expandedMenus.pendapatan}
            hasSubmenu
          />
          <AnimatePresence>
            {expandedMenus.pendapatan && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-9 space-y-1 overflow-hidden"
              >
                <SubmenuItem active={activeTab === 'pendapatan-pnp'} onClick={() => { setActiveTab('pendapatan-pnp'); setIsSidebarOpen(false); }} label="Angkutan Penumpang" />
                <SubmenuItem active={activeTab === 'pendapatan-non'} onClick={() => { setActiveTab('pendapatan-non'); setIsSidebarOpen(false); }} label="Angkutan Barang" />
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
        
        <div className="p-6 border-t border-white/10 flex-shrink-0 bg-[#0d2149]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.div 
                animate={{ 
                  boxShadow: ["0 0 0 0px rgba(249, 115, 22, 0.4)", "0 0 0 10px rgba(249, 115, 22, 0)"],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20"
              >
                <PhoneCall size={18} className="animate-pulse" />
              </motion.div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#0d2149] rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full relative" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Call Center</span>
              <span className="text-xs font-bold text-white tracking-tight">0822 1997 3238</span>
              <span className="text-[10px] text-white/40 font-medium">stasiunbanjar32@gmail.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="pt-20 md:pt-32 min-h-screen pb-24 md:pb-8">
        <div className="p-4 md:p-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'home' && <DashboardSection onNavigate={setActiveTab} />}
              {activeTab === 'profil' && <ProfilSection />}
              {activeTab.startsWith('sdm') && <SDMSection subTab={activeTab} onNavigate={setActiveTab} />}
              {activeTab.startsWith('realisasi') && <RealisasiSection subTab={activeTab} onNavigate={setActiveTab} />}
              {activeTab.startsWith('regulasi') && <RegulasiSection subTab={activeTab} onNavigate={setActiveTab} />}
              {activeTab.startsWith('safety') && <SafetySection subTab={activeTab} onNavigate={setActiveTab} />}
              {activeTab.startsWith('pendapatan') && <PendapatanSection subTab={activeTab} onNavigate={setActiveTab} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer (Mobile only bottom nav for quick access) */}
      <nav className="fixed bottom-4 left-4 right-4 bg-[#0d2149] border border-white/10 rounded-2xl md:hidden z-50 flex justify-between p-2 shadow-2xl backdrop-blur-lg">
        <MobileNavItem active={activeTab === 'home'} icon={LayoutDashboard} label="Home" onClick={() => setActiveTab('home')} />
        <MobileNavItem active={activeTab.startsWith('sdm')} icon={Users} label="SDM" onClick={() => setActiveTab('sdm-nominatif')} />
        <MobileNavItem active={activeTab.startsWith('safety')} icon={ShieldAlert} label="Safety" onClick={() => setActiveTab('safety-induction')} />
        <MobileNavItem active={activeTab.startsWith('pendapatan')} icon={Wallet} label="Finance" onClick={() => setActiveTab('pendapatan-pnp')} />
      </nav>
    </div>
  );
}

// Reusable Components
function SidebarItem({ active, onClick, icon: Icon, label, hasSubmenu, isExpanded }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20' : 'hover:bg-white/5 text-white/70 hover:text-white'}`}
    >
      <Icon size={20} />
      <span className="text-sm font-semibold">{label}</span>
      {hasSubmenu && (
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          className="ml-auto"
        >
          <ChevronRight size={16} className={active ? 'text-white' : 'text-white/30'} />
        </motion.div>
      )}
      {!hasSubmenu && active && <motion.div layoutId="sidebar-active" className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
    </button>
  );
}

function SubmenuItem({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${active ? 'text-orange-500 bg-white/5' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
    >
      {label}
    </button>
  );
}

function MobileNavItem({ active, icon: Icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex-1 flex flex-col items-center justify-center py-2 transition-all active:scale-90">
      <div className={`p-2 rounded-xl transition-all ${active ? 'text-orange-500 bg-white shadow-lg' : 'text-white/40'}`}>
        <Icon size={20} />
      </div>
      <span className={`text-[8px] font-bold uppercase mt-1 tracking-widest ${active ? 'text-white' : 'text-white/20'}`}>{label}</span>
      {active && <motion.div layoutId="mobile-nav-indicator" className="w-1 h-1 bg-orange-500 rounded-full mt-1" />}
    </button>
  );
}

// Section: Dashboard
function DashboardSection({ onNavigate }: any) {
  return (
    <div className="space-y-6 md:space-y-12">
      <header className="bg-[#0d2149] p-8 md:p-20 rounded-[2rem] md:rounded-[4rem] text-white overflow-hidden relative shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-1 w-12 bg-orange-500 rounded-full" />
            <h2 className="text-[10px] md:text-sm font-black text-orange-500 uppercase tracking-[0.4em] leading-none">Internal System</h2>
          </motion.div>
          
          <h3 className="text-3xl md:text-7xl font-black tracking-tight uppercase leading-[0.9] mb-8">
            Portal Digital<br />
            <span className="text-white/40 italic font-medium">Stasiun</span> Banjar
          </h3>
          
          <p className="text-white/60 text-sm md:text-xl font-medium max-w-xl leading-relaxed mb-10">
            Sistem integrasi data operasional stasiun secara real-time.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('profil')}
            className="px-8 py-4 bg-orange-500 text-white rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-orange-950/20 w-fit"
          >
            Cek Profil Stasiun <ChevronRight size={16} />
          </motion.button>
        </div>
        
        {/* Background Graphic */}
        <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none translate-x-1/4 translate-y-1/4">
          <Train size={600} strokeWidth={1} />
        </div>
        <div className="absolute top-0 right-0 p-8 text-white/5 italic font-black text-9xl pointer-events-none uppercase tracking-tighter">
          BJR
        </div>
      </header>

      {/* Menu Grid Panel */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-8 bg-orange-500 rounded-full" />
            <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-[#0d2149]">Navigasi Utama</h3>
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-4 py-2 rounded-full">
            6 Departemen Aktif
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <MenuCard 
            onClick={() => onNavigate('profil')}
            icon={Info}
            title="Profil Stasiun"
            description="Informasi umum dan profil digital Stasiun Banjar."
            color="bg-blue-50 text-blue-600"
          />
          <MenuCard 
            onClick={() => onNavigate('sdm-nominatif')}
            icon={Users}
            title="Managemen SDM"
            description="Data nominatif, raport, dan dinasan pegawai."
            color="bg-emerald-50 text-emerald-600"
          />
          <MenuCard 
            onClick={() => onNavigate('realisasi-ksb')}
            icon={TrendingUp}
            title="Realisasi Kerja"
            description="Capaian target kinerja KSB, WKSB, dan SPV."
            color="bg-purple-50 text-purple-600"
          />
          <MenuCard 
            onClick={() => onNavigate('regulasi-pd')}
            icon={FileText}
            title="Arsip Regulasi"
            description="Kumpulan PD, PP, PM, SOP, dan Instruksi Kerja."
            color="bg-red-50 text-red-600"
          />
          <MenuCard 
            onClick={() => onNavigate('safety-induction')}
            icon={ShieldAlert}
            title="Safety & Security"
            description="Laporan keselamatan, induksi, dan mitigasi risiko."
            color="bg-amber-50 text-amber-600"
          />
          <MenuCard 
            onClick={() => onNavigate('pendapatan-pnp')}
            icon={Wallet}
            title="Pendapatan"
            description="Monitoring data pendapatan harian stasiun."
            color="bg-indigo-50 text-indigo-600"
          />
        </div>
      </section>
    </div>
  );
}

function MenuCard({ onClick, icon: Icon, title, description, color }: any) {
  return (
    <motion.button
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all text-left flex flex-col gap-4 relative overflow-hidden"
    >
      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center ${color} mb-2 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
        <Icon size={24} className="md:w-8 md:h-8" />
      </div>
      <div>
        <h4 className="text-base md:text-xl font-black text-slate-800 uppercase tracking-tight group-hover:text-orange-600 transition-colors leading-tight">{title}</h4>
        <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed mt-2 line-clamp-2 md:line-clamp-none">{description}</p>
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#0d2149] group-hover:text-orange-500 transition-colors">Akses Data</span>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all transform group-hover:translate-x-1">
          <ChevronRight size={14} />
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -right-6 -bottom-6 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
        <Icon size={140} />
      </div>
    </motion.button>
  );
}

// Section: Profil
function ProfilSection() {
  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-2 text-orange-600 mb-2">
          <Info size={18} />
          <span className="text-sm font-bold uppercase tracking-[0.2em]">Profil Stasiun</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Stasiun Banjar (BJR)</h2>
      </header>
      
      <IframeViewer url={MENU_URLS['profil']} title="Profil Stasiun" />
    </div>
  );
}

function IframeViewer({ url, title }: { url: string; title: string }) {
  const isFolder = url.includes('embeddedfolderview');
  
  // Clean URL to direct link for easy copy/access
  const getDirectLink = (embedUrl: string) => {
    if (embedUrl.includes('embeddedfolderview')) {
      const match = embedUrl.match(/id=([^&#]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/drive/folders/${match[1]}?usp=sharing`;
      }
      return embedUrl;
    }
    return embedUrl.replace('/preview', '/view?usp=sharing').replace('/view?usp=drive_link', '/view?usp=sharing');
  };

  const directLink = getDirectLink(url);

  return (
    <div className="flex flex-col gap-6">
      {/* Iframe Frame Container */}
      <div className="w-full h-[60vh] md:h-[80vh] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border border-slate-200 shadow-2xl bg-white relative group">
        <iframe 
          src={url} 
          className="w-full h-full border-none translate-z-0"
          title={title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 md:top-8 md:right-8 lg:opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 lg:group-hover:translate-y-0 z-10">
          <a 
            href={directLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 bg-orange-600 text-white shadow-2xl rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0d2149] transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <ExternalLink size={16} /> <span className="hidden sm:inline">Buka di</span> Google Drive
          </a>
        </div>
        
        {/* Loading Hint behind iframe */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-slate-50 text-slate-400 gap-3">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-widest">Sinkronisasi Data Cloud...</p>
        </div>
      </div>
      
      {/* Viewer Metadata and Direct Access Row */}
      <div className="flex flex-col gap-4">
        {/* Connection status tag */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-3 px-6 bg-white border border-slate-100 shadow-sm rounded-2xl w-full md:w-fit mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
            <p className="text-[9px] md:text-[10px] text-[#0d2149] font-black uppercase tracking-tighter">
              Terhubung
            </p>
          </div>
          <div className="w-px h-3 bg-slate-200" />
          <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            {isFolder ? 'G-Drive Directory' : 'Portable Document / Spreadsheets'}
          </p>
        </div>

        {/* Troubleshooting & Direct Link Helper Card */}
        <div className="max-w-4xl mx-auto w-full bg-amber-50/50 border border-amber-200/80 rounded-2xl p-5 md:p-6 text-slate-700 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-amber-700">
                <Info size={18} className="flex-shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Keterangan Akses Google Drive</h4>
              </div>
              <p className="text-[11px] md:text-[12px] text-slate-600 leading-relaxed">
                Jika di atas muncul keterangan <strong className="text-amber-800">"No preview available"</strong>, 
                mohon pastikan bahwa dokumen ini sudah diatur ke <strong className="text-amber-800">"Anyone with the link can view / Siapa saja yang memiliki link dapat melihat"</strong> 
                pada pengaturan berbagi Google Drive Anda.
              </p>
            </div>
            
            <a 
              href={directLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-700/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap"
            >
              <ExternalLink size={14} /> Buka Langsung di Drive
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Section: SDM
function SDMSection({ subTab, onNavigate }: any) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Managemen SDM</h2>
          <p className="text-slate-500 font-medium">Portal kepegawaian Stasiun Banjar.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <TabButton active={subTab === 'sdm-nominatif'} onClick={() => onNavigate('sdm-nominatif')} label="Nominatif" />
          <TabButton active={subTab === 'sdm-raport'} onClick={() => onNavigate('sdm-raport')} label="Raport" />
          <TabButton active={subTab === 'sdm-dinasan'} onClick={() => onNavigate('sdm-dinasan')} label="Dinasan" />
          <TabButton active={subTab === 'sdm-ijk'} onClick={() => onNavigate('sdm-ijk')} label="IJK" />
        </div>
      </header>

      {MENU_URLS[subTab] && <IframeViewer url={MENU_URLS[subTab]} title={subTab} />}
    </div>
  );
}

function TabButton({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${active ? 'bg-[#0d2149] text-white' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
    >
      {label}
    </button>
  );
}

function DataPlaceholder({ title, description, icon: Icon = Users }: any) {
  return (
    <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
        <Icon size={40} />
      </div>
      <div>
        <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{title}</h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">{description}</p>
      </div>
      <button className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest">Buka Dataset Lengkap</button>
    </div>
  );
}

// Section: Regulasi
function RegulasiSection({ subTab, onNavigate }: any) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Arsip Regulasi</h2>
          <p className="text-slate-500 font-medium">Dokumen hukum dan prosedur operasional.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <TabButton active={subTab === 'regulasi-pd'} onClick={() => onNavigate('regulasi-pd')} label="PD" />
          <TabButton active={subTab === 'regulasi-pp'} onClick={() => onNavigate('regulasi-pp')} label="PP" />
          <TabButton active={subTab === 'regulasi-pm'} onClick={() => onNavigate('regulasi-pm')} label="PM" />
          <TabButton active={subTab === 'regulasi-sop'} onClick={() => onNavigate('regulasi-sop')} label="SOP" />
          <TabButton active={subTab === 'regulasi-ik'} onClick={() => onNavigate('regulasi-ik')} label="IK" />
        </div>
      </header>

      {MENU_URLS[subTab] && <IframeViewer url={MENU_URLS[subTab]} title={subTab} />}
    </div>
  );
}

// Section: Safety
function SafetySection({ subTab, onNavigate }: any) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Safety & Security</h2>
          <p className="text-slate-500 font-medium">Laporan harian keselamatan perjalanan KA.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <TabButton active={subTab === 'safety-induction'} onClick={() => onNavigate('safety-induction')} label="Induction" />
          <TabButton active={subTab === 'safety-simulasi'} onClick={() => onNavigate('safety-simulasi')} label="Simulasi" />
          <TabButton active={subTab === 'safety-pembinaan'} onClick={() => onNavigate('safety-pembinaan')} label="Pembinaan" />
          <TabButton active={subTab === 'safety-ibpr'} onClick={() => onNavigate('safety-ibpr')} label="IBPR" />
        </div>
      </header>

      {MENU_URLS[subTab] && <IframeViewer url={MENU_URLS[subTab]} title={subTab} />}
    </div>
  );
}

// Section: Pendapatan
function PendapatanSection({ subTab, onNavigate }: any) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Laporan Pendapatan</h2>
          <p className="text-slate-500 font-medium">Monitoring real-time pendapatan stasiun.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <TabButton active={subTab === 'pendapatan-pnp'} onClick={() => onNavigate('pendapatan-pnp')} label="Penumpang" />
          <TabButton active={subTab === 'pendapatan-non'} onClick={() => onNavigate('pendapatan-non')} label="Angkutan Barang" />
        </div>
      </header>

      {MENU_URLS[subTab] && <IframeViewer url={MENU_URLS[subTab]} title={subTab} />}
    </div>
  );
}

// Section: Realisasi Kerja
function RealisasiSection({ subTab, onNavigate }: any) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Realisasi Kerja</h2>
          <p className="text-slate-500 font-medium">Monitoring capaian target dan laporan kerja.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <TabButton active={subTab === 'realisasi-ksb'} onClick={() => onNavigate('realisasi-ksb')} label="KSB" />
          <TabButton active={subTab === 'realisasi-wksb'} onClick={() => onNavigate('realisasi-wksb')} label="WKSB" />
          <TabButton active={subTab === 'realisasi-spv'} onClick={() => onNavigate('realisasi-spv')} label="SPV" />
        </div>
      </header>

      {MENU_URLS[subTab] && <IframeViewer url={MENU_URLS[subTab]} title={subTab} />}
    </div>
  );
}


