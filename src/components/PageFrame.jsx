import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { shellClass } from "../styles";

function NavItem({ to, label, onNavigate }) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className="rounded-brand px-3 py-2 transition hover:bg-[rgba(204,76,47,0.1)]"
    >
      {label}
    </Link>
  );
}

export default function PageFrame({
  subtitle,
  navLinks,
  footerLeft,
  footerRight,
  children
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <header
        className={`${shellClass} sticky top-4 z-50 mt-4 flex flex-wrap items-center justify-between gap-4 rounded-brand border border-line bg-[rgba(255,252,245,0.82)] px-4 py-3 shadow-soft backdrop-blur-xl`}
      >
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-brand bg-ink font-bold text-white">
            DM
          </span>
          <span>
            <strong className="block">DriveMate</strong>
            <small className="block text-muted">{subtitle}</small>
          </span>
        </Link>

        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex min-h-11 items-center justify-center rounded-brand border border-line bg-white px-4 py-2.5 font-bold text-ink md:hidden"
        >
          Menu
        </button>

        <nav className={`${open ? "grid" : "hidden"} w-full gap-2 md:flex md:w-auto md:flex-wrap md:items-center md:gap-2`}>
          {navLinks.map((item) => (
            <NavItem key={item.to} {...item} onNavigate={() => setOpen(false)} />
          ))}
        </nav>
      </header>

      <main className={`${shellClass} py-6 pb-11`}>{children}</main>

      <footer
        className={`${shellClass} flex flex-col justify-between gap-4 pb-9 pt-1 text-muted sm:flex-row`}
      >
        <span>{footerLeft}</span>
        <div className="flex items-center gap-4">{footerRight}</div>
      </footer>
    </div>
  );
}
