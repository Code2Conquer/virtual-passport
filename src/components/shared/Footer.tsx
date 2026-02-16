export default function Footer() {
  return (
    <footer className="w-full py-8 text-center border-t border-white/5">
      <p className="text-xs text-white/30 font-sans">
        Built with love at{" "}
        <span className="text-passport-gold/60 font-semibold">ixigo</span>
      </p>
      <p className="text-[10px] text-white/15 mt-1 font-sans">
        Virtual Passport &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
