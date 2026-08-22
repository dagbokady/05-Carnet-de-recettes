const DIFFICULTES = [
    { value: "all", label: "Toutes" },
    { value: "facile", label: "Facile" },
    { value: "moyenne", label: "Moyenne" },
    { value: "difficile", label: "Difficile" },
];

export default function RecetteFilter({ filters, setFilters }) {
    return (
        <div className="flex w-full max-w-[850px] items-center rounded-full border border-hairline bg-white elev-1">
            {/* Segment : quoi */}
            <label className="flex-[1.2] cursor-text px-6 py-3.5">
                <span className="block text-[12px] font-semibold text-ink">Quoi</span>
                <input
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder="Rechercher une recette"
                    className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
                />
            </label>

            <span className="h-8 w-px bg-hairline" />

            {/* Segment : difficulté */}
            <label className="flex-1 px-6 py-3.5">
                <span className="block text-[12px] font-semibold text-ink">Difficulté</span>
                <select
                    value={filters.difficulte}
                    onChange={(e) => setFilters({ ...filters, difficulte: e.target.value })}
                    className="w-full cursor-pointer appearance-none bg-transparent text-[14px] text-muted outline-none"
                >
                    {DIFFICULTES.map((d) => (
                        <option key={d.value} value={d.value}>
                            {d.label}
                        </option>
                    ))}
                </select>
            </label>

            <span className="hidden h-8 w-px bg-hairline sm:block" />

            {/* Segment : durée */}
            <label className="hidden flex-1 px-6 py-3.5 sm:block">
                <span className="block text-[12px] font-semibold text-ink">Durée max</span>
                <span className="flex items-center gap-2">
                    <input
                        type="range"
                        min="10"
                        max="120"
                        step="5"
                        value={filters.dureeMax}
                        onChange={(e) =>
                            setFilters({ ...filters, dureeMax: Number(e.target.value) })
                        }
                        className="w-full accent-rausch"
                    />
                    <span className="shrink-0 text-[14px] text-muted">{filters.dureeMax} min</span>
                </span>
            </label>

            {/* Orbe de recherche */}
            <div className="p-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rausch text-white">
                    <svg viewBox="0 0 32 32" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="4">
                        <circle cx="13" cy="13" r="9" />
                        <path d="M20 20l9 9" strokeLinecap="round" />
                    </svg>
                </span>
            </div>
        </div>
    );
}
