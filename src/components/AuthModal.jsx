import { useState } from "react";
import { useAuth } from "../auth-context.js";
import Modal, { fieldCls } from "./Modal.jsx";

export default function AuthModal({ open, initialMode = "login", onClose }) {
    const { signup, login } = useAuth();
    const [mode, setMode] = useState(initialMode);
    const [form, setForm] = useState({ nom: "", email: "", password: "" });
    const [erreur, setErreur] = useState("");
    const [busy, setBusy] = useState(false);

    const inscription = mode === "signup";
    const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setErreur("");
        setBusy(true);
        try {
            await (inscription ? signup(form) : login(form));
            setForm({ nom: "", email: "", password: "" });
            onClose();
        } catch (err) {
            setErreur(err.message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            titre={inscription ? "Créer un compte" : "Connexion"}
            width="max-w-[568px]"
        >
            <form onSubmit={submit} className="space-y-5 px-6 py-6">
                <h2 className="text-[22px] font-medium tracking-[-0.44px] text-ink">
                    Bienvenue dans le Carnet
                </h2>

                {inscription && (
                    <label className="block">
                        <span className="mb-1.5 block text-[14px] font-medium text-muted">Nom</span>
                        <input required className={fieldCls} placeholder="Awa Koné"
                            value={form.nom} onChange={set("nom")} />
                    </label>
                )}

                <label className="block">
                    <span className="mb-1.5 block text-[14px] font-medium text-muted">E-mail</span>
                    <input required type="email" autoComplete="email" className={fieldCls}
                        placeholder="vous@exemple.ci" value={form.email} onChange={set("email")} />
                </label>

                <label className="block">
                    <span className="mb-1.5 block text-[14px] font-medium text-muted">Mot de passe</span>
                    <input required type="password" minLength={8}
                        autoComplete={inscription ? "new-password" : "current-password"}
                        className={fieldCls} placeholder="8 caractères minimum"
                        value={form.password} onChange={set("password")} />
                </label>

                {erreur && <p className="text-[14px] text-danger">{erreur}</p>}

                <button
                    type="submit"
                    disabled={busy}
                    className="h-12 w-full rounded-lg bg-rausch text-[16px] font-medium text-white transition-colors hover:bg-rausch-active disabled:bg-rausch-disabled"
                >
                    {inscription ? "Créer mon compte" : "Se connecter"}
                </button>

                <p className="text-[14px] text-muted">
                    {inscription ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"}{" "}
                    <button
                        type="button"
                        onClick={() => {
                            setMode(inscription ? "login" : "signup");
                            setErreur("");
                        }}
                        className="font-medium text-ink underline"
                    >
                        {inscription ? "Se connecter" : "S'inscrire"}
                    </button>
                </p>

                <p className="border-t border-hairline pt-4 text-[13px] text-muted-soft">
                    Comptes et recettes sont enregistrés dans ce navigateur uniquement — aucune donnée
                    n'est envoyée sur un serveur.
                </p>
            </form>
        </Modal>
    );
}
