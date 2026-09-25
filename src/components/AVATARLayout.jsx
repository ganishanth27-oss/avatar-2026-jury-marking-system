function AVATARLayout({ children }) {
  return (
    <div className="min-h-screen overflow-y-auto bg-[#020617] relative">

      {/* Left Green Glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Right Green Glow */}
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Center Blue Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}

export default AVATARLayout;