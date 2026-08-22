import { Link, useParams } from "react-router";
import { noteDe } from "../utils.js";

function Stat({ valeur, label }) {
    return (
        <div className="flex-1 px-4 text-center">
            <p className="text-[16px] font-semibold text-ink">{valeur}</p>
            <p className="mt-1 text-[13px] text-muted">{label}</p>
        </div>
    );
}

export default function RecetteDetail({ recettes, toggleFavori }) {
    const { id } = useParams();
    const recette = recettes.find((r) => String(r.id) === id);

    if (!recette) {
        return (
            <main className="mx-auto max-w-[1080px] px-6 py-24 text-center">
                <h1 className="text-[22px] font-medium tracking-[-0.44px] text-ink">
                    Cette recette n'existe pas
                </h1>
                <p className="mt-2 text-[16px] text-muted">Elle a peut-être été retirée du carnet.</p>
                <Link to="/" className="mt-6 inline-block rounded-lg bg-rausch px-6 py-3.5 text-[16px] font-medium text-white hover:bg-rausch-active">
                    Retour aux recettes
                </Link>
            </main>
        );
    }

    return (
        <main className="print-sheet mx-auto max-w-[1080px] px-6 pb-16 lg:px-10">
            <div className="no-print flex items-center gap-3 py-6">
                <Link to="/" aria-label="Retour"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-strong text-ink">
                    ‹
                </Link>
                <span className="text-[14px] text-muted">
                    {recette.categorie} · {recette.difficulte}
                </span>
            </div>

            <h1 className="text-[22px] font-medium leading-[1.18] tracking-[-0.44px] text-ink">
                {recette.titre}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-ink">
                <span>★ {noteDe(recette)}</span>
                <span className="text-muted">·</span>
                <span className="underline">{recette.ingredients.length} ingrédients</span>
                <span className="text-muted">·</span>
                <span className="underline">{recette.duree} min</span>
                <button onClick={() => toggleFavori(recette.id)}
                    className="no-print ml-auto flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-medium underline hover:bg-surface-soft">
                    <svg viewBox="0 0 32 32" className="h-4 w-4">
                        <path d="M16 28c7-4.73 11-10 11-15a6 6 0 0 0-11-3.33A6 6 0 0 0 5 13c0 5 4 10.27 11 15Z"
                            fill={recette.favori ? "#ff385c" : "none"} stroke="#222" strokeWidth="2" />
                    </svg>
                    {recette.favori ? "Enregistrée" : "Enregistrer"}
                </button>
            </div>

            <div className="print-only mt-3 border-y border-hairline py-3 text-[14px] text-ink">
                {recette.duree} min · {recette.difficulte} · {recette.ingredients.length} ingrédients ·
                {" "}{recette.etapes.length} étapes · proposée par {recette.auteur ?? "le Carnet"}
            </div>

            <div className="print-photo mt-4 overflow-hidden rounded-[14px] bg-surface-strong">
                {recette.image ? (
                    <img src={recette.image} alt={recette.titre} className="aspect-[16/9] w-full object-cover" />
                ) : (
                    <div className="flex aspect-[16/9] w-full items-center justify-center text-[64px]">🍲</div>
                )}
            </div>

            <div className="print-body mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
                <div className="min-w-0">
                    <section className="border-b border-hairline pb-8">
                        <h2 className="text-[21px] font-bold text-ink">
                            Recette proposée par {recette.auteur ?? "le Carnet"}
                        </h2>
                        <p className="mt-1 text-[14px] text-muted">
                            {recette.categorie} · {recette.etapes.length} étapes · {recette.duree} min
                        </p>
                        <p className="mt-4 text-[16px] leading-[1.5] text-body">{recette.description}</p>
                    </section>

                    {recette.video && (
                        <section className="no-print border-b border-hairline py-8">
                            <h2 className="text-[21px] font-bold text-ink">La vidéo de préparation</h2>
                            <div className="mt-4 overflow-hidden rounded-[14px] bg-ink">
                                <video src={recette.video} controls playsInline className="aspect-video w-full" />
                            </div>
                        </section>
                    )}

                    <section className="border-b border-hairline py-8">
                        <h2 className="text-[21px] font-bold text-ink">Ce qu'il vous faut</h2>
                        <ul className="mt-2 grid sm:grid-cols-2">
                            {recette.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-center gap-3 py-3 text-[16px] text-ink">
                                    <span className="text-muted">•</span>
                                    {ing}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="py-8">
                        <h2 className="text-[21px] font-bold text-ink">La préparation, étape par étape</h2>
                        <ol className="mt-4 space-y-5">
                            {recette.etapes.map((etape, i) => (
                                <li key={i} className="flex gap-4">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[14px] font-semibold text-white">
                                        {i + 1}
                                    </span>
                                    <p className="pt-1 text-[16px] leading-[1.5] text-body">{etape}</p>
                                </li>
                            ))}
                        </ol>
                    </section>
                </div>

                <aside className="no-print lg:sticky lg:top-28 lg:self-start">
                    <div className="rounded-[14px] border border-hairline bg-white p-6 elev-1">
                        <p className="text-[21px] font-bold text-ink">
                            {recette.duree} min <span className="text-[16px] font-normal text-muted">au total</span>
                        </p>

                        <div className="mt-5 overflow-hidden rounded-lg border border-hairline">
                            <div className="grid grid-cols-2 divide-x divide-hairline">
                                <div className="p-3">
                                    <p className="text-[12px] font-bold uppercase text-ink">Difficulté</p>
                                    <p className="text-[14px] text-muted">{recette.difficulte}</p>
                                </div>
                                <div className="p-3">
                                    <p className="text-[12px] font-bold uppercase text-ink">Catégorie</p>
                                    <p className="truncate text-[14px] text-muted">{recette.categorie}</p>
                                </div>
                            </div>
                            <div className="border-t border-hairline p-3">
                                <p className="text-[12px] font-bold uppercase text-ink">Ingrédients</p>
                                <p className="text-[14px] text-muted">{recette.ingredients.length} à réunir</p>
                            </div>
                        </div>

                        <button onClick={() => window.print()}
                            className="mt-4 h-12 w-full rounded-lg bg-rausch text-[16px] font-medium text-white transition-colors hover:bg-rausch-active">
                            Télécharger en PDF
                        </button>
                        <button onClick={() => window.print()}
                            className="mt-3 h-12 w-full rounded-lg border border-ink bg-white text-[16px] font-medium text-ink transition-colors hover:bg-surface-soft">
                            Imprimer la recette
                        </button>
                        <p className="mt-3 text-center text-[14px] text-muted">
                            Dans la fenêtre d'impression, choisissez « Enregistrer au format PDF ».
                        </p>
                    </div>

                    <div className="mt-6 flex items-stretch divide-x divide-hairline rounded-[14px] border border-hairline bg-white py-4">
                        <Stat valeur={`★ ${noteDe(recette)}`} label="Note" />
                        <Stat valeur={recette.etapes.length} label="Étapes" />
                        <Stat valeur={`${recette.duree}′`} label="Durée" />
                    </div>
                </aside>
            </div>
        </main>
    );
}
