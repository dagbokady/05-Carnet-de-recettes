import { Link } from "react-router";
import { noteDe } from "../utils.js";

export default function RecetteCard({ recette, onToggleFavori }) {
    return (
        <article className="group relative">
            <button
                aria-label={recette.favori ? "Retirer des favoris" : "Ajouter aux favoris"}
                onClick={onToggleFavori}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110"
            >
                <svg viewBox="0 0 32 32" className="h-6 w-6">
                    <path
                        d="M16 28c7-4.73 11-10 11-15a6 6 0 0 0-11-3.33A6 6 0 0 0 5 13c0 5 4 10.27 11 15Z"
                        fill={recette.favori ? "#ff385c" : "rgba(0,0,0,0.5)"}
                        stroke="#fff"
                        strokeWidth="2"
                    />
                </svg>
            </button>

            <Link to={`/recette/${recette.id}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-[14px] bg-surface-strong">
                    {recette.image ? (
                        <img
                            src={recette.image}
                            alt={recette.titre}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center text-[40px]">🍲</span>
                    )}

                    <div className="absolute left-3 top-3 flex gap-2">
                        {recette.favori && (
                            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink elev-1">
                                Coup de cœur
                            </span>
                        )}
                        {recette.video && (
                            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink elev-1">
                                ▶ Vidéo
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-3 space-y-0.5">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[16px] font-semibold text-ink">{recette.titre}</h3>
                        <span className="shrink-0 text-[14px] text-ink">★ {noteDe(recette)}</span>
                    </div>
                    <p className="line-clamp-2 text-[14px] text-muted">{recette.description}</p>
                    <p className="text-[14px] text-muted">
                        {recette.ingredients.length} ingrédients · {recette.difficulte}
                    </p>
                    <p className="pt-0.5 text-[14px] text-ink">
                        <span className="font-semibold">{recette.duree} min</span> de préparation
                    </p>
                </div>
            </Link>
        </article>
    );
}
