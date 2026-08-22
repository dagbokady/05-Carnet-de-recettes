import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const TABS = [
    { id: "plats principaux", label: "Plats", icon: "🍲" },
    { id: "petit déjeuner", label: "Petit déjeuner", icon: "🍳", tag: "NEW" },
    { id: "snack", label: "Snacks", icon: "🥙", tag: "NEW" },
];

export function Navbar({ user, onLogin, onLogout, onPublish, filters, setFilters }) {
    const [menu, setMenu] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const onClick = (e) => ref.current && !ref.current.contains(e.target) && setMenu(false);
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    const setCategorie = (id) => {
        setFilters((f) => ({ ...f, categorie: f.categorie === id ? "all" : id }));
        navigate("/");
    };

    const item =
        "block w-full px-4 py-3 text-left text-[14px] text-ink transition-colors hover:bg-surface-soft";

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-hairline">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
                <div className="flex h-20 items-center justify-between gap-6">

                    <Link to="/" className="flex shrink-0 items-center gap-2 text-rausch">
                        <span className="text-2xl">🍳</span>
                        <span className="hidden text-[20px] font-semibold tracking-[-0.18px] sm:block">
                            carnet
                        </span>
                    </Link>

                    <nav className="hidden items-end gap-8 md:flex">
                        {TABS.map((tab) => {
                            const active = filters.categorie === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setCategorie(tab.id)}
                                    className={`relative flex flex-col items-center gap-1 pb-3 text-[16px] font-semibold transition-colors ${
                                        active ? "text-ink" : "text-muted hover:text-ink"
                                    }`}
                                >
                                    <span className="relative text-[26px] leading-none">
                                        {tab.icon}
                                        {tab.tag && (
                                            <span className="absolute -right-5 -top-1 rounded-full bg-white px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.32px] text-ink elev-1">
                                                {tab.tag}
                                            </span>
                                        )}
                                    </span>
                                    {tab.label}
                                    <span
                                        className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-ink transition-opacity ${
                                            active ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </nav>

                    <div className="relative flex shrink-0 items-center gap-2" ref={ref}>
                        <button
                            onClick={onPublish}
                            className="hidden rounded-full px-4 py-3 text-[14px] font-medium text-ink transition-colors hover:bg-surface-soft sm:block"
                        >
                            Publier une recette
                        </button>

                        <button
                            onClick={() => setMenu((m) => !m)}
                            aria-label="Menu du compte"
                            aria-expanded={menu}
                            className="flex h-12 items-center gap-3 rounded-full border border-hairline px-4 transition-shadow hover:elev-1"
                        >
                            <svg viewBox="0 0 32 32" className="h-4 w-4 stroke-ink" strokeWidth="3">
                                <path d="M2 9h28M2 16h28M2 23h28" strokeLinecap="round" />
                            </svg>
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-white">
                                {user ? user.initiales : "🍽"}
                            </span>
                        </button>

                        {menu && (
                            <div className="absolute right-0 top-16 w-60 overflow-hidden rounded-[14px] bg-white py-2 elev-1">
                                {user ? (
                                    <>
                                        <div className="border-b border-hairline px-4 pb-3 pt-2">
                                            <p className="text-[14px] font-semibold text-ink">{user.nom}</p>
                                            <p className="truncate text-[13px] text-muted">{user.email}</p>
                                        </div>
                                        <button className={item} onClick={() => { setMenu(false); onPublish(); }}>
                                            Publier une recette
                                        </button>
                                        <button className={item} onClick={() => { setMenu(false); onLogout(); }}>
                                            Se déconnecter
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className={`${item} font-semibold`} onClick={() => { setMenu(false); onLogin("signup"); }}>
                                            Inscription
                                        </button>
                                        <button className={item} onClick={() => { setMenu(false); onLogin("login"); }}>
                                            Connexion
                                        </button>
                                        <div className="my-2 border-t border-hairline" />
                                        <button className={item} onClick={() => { setMenu(false); onPublish(); }}>
                                            Publier une recette
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export function Footer() {
    const cols = [
        {
            title: "Assistance",
            links: ["Centre d'aide", "Comment ça marche", "Signaler un problème"],
        },
        {
            title: "Cuisiner",
            links: ["Publier une recette", "Ressources pour les cuisiniers", "Forum communauté"],
        },
        {
            title: "Carnet",
            links: ["À propos", "Nouveautés", "Contact"],
        },
    ];

    return (
        <footer className="border-t border-hairline bg-white">
            <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    {cols.map((col) => (
                        <div key={col.title}>
                            <h3 className="mb-4 text-[16px] font-medium text-ink">{col.title}</h3>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-[14px] text-ink hover:underline">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Carnet de Recette, Inc. · Confidentialité · Conditions</p>
                    <div className="flex items-center gap-5">
                        <span>🌐 Français (CI)</span>
                        <span>FCFA</span>
                        <span className="flex gap-4">
                            <a href="#" aria-label="X">𝕏</a>
                            <a href="#" aria-label="Instagram">Instagram</a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
