import { useMemo } from "react";
import RecetteCard from "../components/RecetteCard.jsx";
import RecetteFilter from "../components/RecetteFilter.jsx";
import { moyenneDes } from "../utils.js";

const CATEGORIES = [
    { id: "all", label: "Tout", icon: "✨" },
    { id: "plats principaux", label: "Plats principaux", icon: "🍲" },
    { id: "petit déjeuner", label: "Petit déjeuner", icon: "🍳" },
    { id: "snack", label: "Snacks", icon: "🥙" },
];

export default function Home({ recettes, filters, setFilters, toggleFavori, onAdd }) {
    const stats = useMemo(() => ({
        totalRecettes: recettes.length,
        totalIngredients: recettes.reduce((a, r) => a + r.ingredients.length, 0),
        totalTemps: recettes.reduce((a, r) => a + r.duree, 0),
        favorites: recettes.filter((r) => r.favori).length,
        note: moyenneDes(recettes),
    }), [recettes]);

    const recettesFiltrees = useMemo(() => {
        const q = filters.search.toLowerCase();
        return recettes.filter((r) =>
            (q === "" ||
                r.titre.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q) ||
                r.ingredients.some((i) => i.toLowerCase().includes(q))) &&
            (filters.difficulte === "all" || r.difficulte === filters.difficulte) &&
            (filters.categorie === "all" || r.categorie === filters.categorie) &&
            r.duree <= filters.dureeMax
        );
    }, [recettes, filters]);

    const resetFilters = () =>
        setFilters({ search: "", difficulte: "all", categorie: "all", dureeMax: 120 });

    const filtresActifs =
        filters.search || filters.difficulte !== "all" || filters.categorie !== "all" || filters.dureeMax < 120;

    return (
        <main className="mx-auto max-w-[1280px] px-6 lg:px-10">

            {/* Hero */}
            <section className="flex flex-col items-center gap-8 py-14 text-center">
                <div className="space-y-3">
                    <h1 className="text-[28px] font-bold leading-[1.2] text-ink">
                        Des recettes africaines à cuisiner ce soir
                    </h1>
                    <p className="text-[16px] text-muted">
                        {stats.totalRecettes} recettes · {stats.totalIngredients} ingrédients · {stats.totalTemps} min de cuisine
                    </p>
                </div>
                <RecetteFilter filters={filters} setFilters={setFilters} />
            </section>

            {/* Note globale — le moment typographique fort du système */}
            <section className="flex flex-col items-center gap-2 border-y border-hairline py-10">
                <div className="flex items-center gap-4">
                    <span className="text-[28px]">🌿</span>
                    <span className="text-[64px] font-bold leading-[1.1] tracking-[-1px] text-ink">
                        {stats.note}
                    </span>
                    <span className="text-[28px] -scale-x-100">🌿</span>
                </div>
                <p className="text-[16px] font-semibold text-ink">Carnet coup de cœur</p>
                <p className="max-w-[420px] text-[14px] text-muted">
                    {stats.favorites} recettes favorites, plébiscitées par la maison pour leur simplicité et leur goût.
                </p>
            </section>

            {/* Bande de catégories */}
            <nav className="no-scrollbar -mx-6 flex gap-8 overflow-x-auto border-b border-hairline px-6 lg:mx-0 lg:px-0">
                {CATEGORIES.map((cat) => {
                    const active = filters.categorie === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setFilters({ ...filters, categorie: cat.id })}
                            className={`relative flex shrink-0 flex-col items-center gap-2 py-4 text-[14px] font-medium transition-colors ${
                                active ? "text-ink" : "text-muted hover:text-ink"
                            }`}
                        >
                            <span className="text-[22px] leading-none">{cat.icon}</span>
                            {cat.label}
                            <span
                                className={`absolute inset-x-0 bottom-0 h-0.5 bg-ink transition-opacity ${
                                    active ? "opacity-100" : "opacity-0"
                                }`}
                            />
                        </button>
                    );
                })}
            </nav>

            {/* Grille */}
            <section className="py-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-[22px] font-medium tracking-[-0.44px] text-ink">
                        {recettesFiltrees.length} recette{recettesFiltrees.length > 1 ? "s" : ""} disponible{recettesFiltrees.length > 1 ? "s" : ""}
                    </h2>
                    {filtresActifs && (
                        <button
                            onClick={resetFilters}
                            className="h-12 rounded-lg border border-ink bg-white px-6 text-[16px] font-medium text-ink transition-colors hover:bg-surface-soft"
                        >
                            Effacer les filtres
                        </button>
                    )}
                </div>

                {recettesFiltrees.length === 0 ? (
                    <div className="flex flex-col items-start gap-4 border-t border-hairline py-16">
                        <h3 className="text-[21px] font-bold text-ink">Aucune recette trouvée</h3>
                        <p className="text-[16px] text-body">
                            Essayez de modifier votre recherche ou d'élargir la durée de préparation.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="h-12 rounded-lg bg-rausch px-6 text-[16px] font-medium text-white transition-colors hover:bg-rausch-active"
                        >
                            Effacer les filtres
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {recettesFiltrees.map((recette) => (
                            <RecetteCard
                                key={recette.id}
                                recette={recette}
                                onToggleFavori={() => toggleFavori(recette.id)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Bande d'invitation */}
            <section className="flex flex-col items-start gap-4 border-t border-hairline py-14 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-[20px] font-semibold tracking-[-0.18px] text-ink">
                        Vous avez une recette de famille ?
                    </h2>
                    <p className="mt-1 text-[14px] text-muted">
                        Ajoutez-la au carnet en moins de deux minutes.
                    </p>
                </div>
                <button
                    onClick={onAdd}
                    className="rounded-full bg-rausch px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-rausch-active"
                >
                    Publier une recette
                </button>
            </section>
        </main>
    );
}
