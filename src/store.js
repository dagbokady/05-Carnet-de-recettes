import { RECETTES_DATA } from "./data.js";

const K_RECETTES = "carnet.recettes";
const K_USERS = "carnet.users";
const K_SESSION = "carnet.session";

const read = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};
const write = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        /* quota dépassé : on garde l'état en mémoire */
    }
};

/* ---------- Recettes ---------- */

export const loadRecettes = () => read(K_RECETTES, null) ?? RECETTES_DATA;

// Les blob: URL (fichiers uploadés) ne survivent pas au rechargement : on ne les persiste pas.
export const saveRecettes = (recettes) =>
    write(
        K_RECETTES,
        recettes.map((r) => ({
            ...r,
            image: r.image?.startsWith("blob:") ? "" : r.image,
            video: r.video?.startsWith("blob:") ? "" : r.video,
        }))
    );

/* ---------- Comptes ---------- */

export async function hashPassword(password) {
    const bytes = new TextEncoder().encode(`carnet::${password}`);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const loadUsers = () => read(K_USERS, []);
export const saveUsers = (users) => write(K_USERS, users);
export const loadSession = () => read(K_SESSION, null);
export const saveSession = (email) =>
    email ? write(K_SESSION, email) : localStorage.removeItem(K_SESSION);
