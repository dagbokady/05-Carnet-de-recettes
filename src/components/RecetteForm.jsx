import { useState } from "react";
import Modal, { fieldCls } from "./Modal.jsx";
import { compressImage, MAX_VIDEO_MB } from "../media.js";

const EMPTY = {
    titre: "",
    description: "",
    ingredients: "",
    etapes: "",
    duree: "",
    difficulte: "facile",
    categorie: "plats principaux",
    image: "",
    video: "",
};

function Field({ label, aide, children }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-[14px] font-medium text-muted">{label}</span>
            {children}
            {aide && <span className="mt-1.5 block text-[13px] text-muted-soft">{aide}</span>}
        </label>
    );
}

const dropCls =
    "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border-strong bg-surface-soft px-4 py-6 text-center transition-colors hover:border-ink";

export default function RecetteForm({ active, setActive, onSubmit }) {
    const [form, setForm] = useState(EMPTY);
    const [erreur, setErreur] = useState("");
    const [busy, setBusy] = useState(false);

    const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

    const onImage = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setErreur("");
        setBusy(true);
        try {
            const dataUrl = await compressImage(file);
            setForm((f) => ({ ...f, image: dataUrl }));
        } catch (err) {
            setErreur(err.message);
        } finally {
            setBusy(false);
        }
    };

    const onVideo = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
            setErreur(`Vidéo trop lourde (max ${MAX_VIDEO_MB} Mo).`);
            return;
        }
        setErreur("");
        setForm((f) => ({ ...f, video: URL.createObjectURL(file) }));
    };

    const close = () => {
        setErreur("");
        setActive(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm(EMPTY);
        close();
    };

    return (
        <Modal open={active} onClose={close} titre="Publier une recette" width="max-w-[640px]">
            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
                <h2 className="text-[22px] font-medium tracking-[-0.44px] text-ink">
                    Racontez votre recette
                </h2>

                <Field label="Titre">
                    <input required className={fieldCls} placeholder="Ex : Riz sauce graine"
                        value={form.titre} onChange={set("titre")} />
                </Field>

                <Field label="Description">
                    <textarea required rows={2} className={fieldCls}
                        placeholder="Brève description de la recette"
                        value={form.description} onChange={set("description")} />
                </Field>

                <Field label="Ingrédients" aide="Un par ligne, ou séparés par des virgules.">
                    <textarea required rows={4} className={fieldCls}
                        placeholder={"Riz\nHuile de palme\nTomate"}
                        value={form.ingredients} onChange={set("ingredients")} />
                </Field>

                <Field label="Étapes de préparation" aide="Une étape par ligne.">
                    <textarea required rows={5} className={fieldCls}
                        placeholder={"Faire revenir les oignons\nAjouter la sauce et mijoter"}
                        value={form.etapes} onChange={set("etapes")} />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Durée (minutes)">
                        <input required type="number" min="1" className={fieldCls} placeholder="30"
                            value={form.duree} onChange={set("duree")} />
                    </Field>
                    <Field label="Difficulté">
                        <select className={fieldCls} value={form.difficulte} onChange={set("difficulte")}>
                            <option value="facile">Facile</option>
                            <option value="moyenne">Moyenne</option>
                            <option value="difficile">Difficile</option>
                        </select>
                    </Field>
                </div>

                <Field label="Catégorie">
                    <select className={fieldCls} value={form.categorie} onChange={set("categorie")}>
                        <option value="plats principaux">Plats principaux</option>
                        <option value="petit déjeuner">Petit déjeuner</option>
                        <option value="snack">Snack</option>
                    </select>
                </Field>

                {/* Photo */}
                <div className="space-y-3">
                    <span className="block text-[14px] font-medium text-muted">Photo du plat</span>
                    {form.image ? (
                        <div className="relative overflow-hidden rounded-[14px]">
                            <img src={form.image} alt="" className="aspect-video w-full object-cover" />
                            <button type="button" onClick={() => setForm({ ...form, image: "" })}
                                className="absolute right-3 top-3 rounded-full bg-white px-3 py-1.5 text-[14px] font-medium text-ink elev-1">
                                Retirer
                            </button>
                        </div>
                    ) : (
                        <label className={dropCls}>
                            <span className="text-[22px]">🖼</span>
                            <span className="text-[16px] font-medium text-ink">Choisir une photo</span>
                            <span className="text-[13px] text-muted">JPG ou PNG, redimensionnée automatiquement</span>
                            <input type="file" accept="image/*" className="hidden" onChange={onImage} />
                        </label>
                    )}
                    <input className={fieldCls} placeholder="…ou collez une URL d'image"
                        value={form.image.startsWith("data:") ? "" : form.image}
                        onChange={set("image")} disabled={form.image.startsWith("data:")} />
                </div>

                {/* Vidéo */}
                <div className="space-y-3">
                    <span className="block text-[14px] font-medium text-muted">Vidéo de préparation</span>
                    {form.video ? (
                        <div className="relative overflow-hidden rounded-[14px] bg-ink">
                            <video src={form.video} controls className="aspect-video w-full" />
                            <button type="button" onClick={() => setForm({ ...form, video: "" })}
                                className="absolute right-3 top-3 rounded-full bg-white px-3 py-1.5 text-[14px] font-medium text-ink elev-1">
                                Retirer
                            </button>
                        </div>
                    ) : (
                        <label className={dropCls}>
                            <span className="text-[22px]">🎬</span>
                            <span className="text-[16px] font-medium text-ink">Ajouter une vidéo</span>
                            <span className="text-[13px] text-muted">MP4 ou WebM, {MAX_VIDEO_MB} Mo max</span>
                            <input type="file" accept="video/*" className="hidden" onChange={onVideo} />
                        </label>
                    )}
                    <input className={fieldCls} placeholder="…ou collez un lien vidéo (MP4, WebM)"
                        value={form.video.startsWith("blob:") ? "" : form.video}
                        onChange={set("video")} disabled={form.video.startsWith("blob:")} />
                    <p className="text-[13px] text-muted-soft">
                        Les vidéos importées depuis votre appareil restent disponibles le temps de la
                        session ; collez un lien pour les conserver après rechargement.
                    </p>
                </div>

                {erreur && <p className="text-[14px] text-danger">{erreur}</p>}

                <div className="flex items-center justify-between border-t border-hairline pt-5">
                    <button type="button" onClick={close}
                        className="text-[16px] font-medium text-ink underline">
                        Annuler
                    </button>
                    <button type="submit" disabled={busy}
                        className="h-12 rounded-lg bg-rausch px-6 text-[16px] font-medium text-white transition-colors hover:bg-rausch-active disabled:bg-rausch-disabled">
                        {busy ? "Traitement…" : "Publier"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
