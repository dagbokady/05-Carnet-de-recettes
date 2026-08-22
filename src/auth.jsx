import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context.js";
import { hashPassword, loadSession, loadUsers, saveSession, saveUsers } from "./store.js";

export function AuthProvider({ children }) {
    const [users, setUsers] = useState(loadUsers);
    const [email, setEmail] = useState(loadSession);

    useEffect(() => saveUsers(users), [users]);
    useEffect(() => saveSession(email), [email]);

    const value = useMemo(() => {
        const user = users.find((u) => u.email === email) ?? null;

        return {
            user,
            async signup({ nom, email: mail, password }) {
                const clean = mail.trim().toLowerCase();
                if (users.some((u) => u.email === clean)) {
                    throw new Error("Un compte existe déjà avec cette adresse.");
                }
                if (password.length < 8) {
                    throw new Error("Le mot de passe doit faire au moins 8 caractères.");
                }
                const nouveau = {
                    nom: nom.trim(),
                    email: clean,
                    hash: await hashPassword(password),
                    initiales: nom.trim().slice(0, 1).toUpperCase() || "?",
                    depuis: new Date().getFullYear(),
                };
                setUsers((prev) => [...prev, nouveau]);
                setEmail(clean);
            },
            async login({ email: mail, password }) {
                const clean = mail.trim().toLowerCase();
                const found = users.find((u) => u.email === clean);
                if (!found || found.hash !== (await hashPassword(password))) {
                    throw new Error("Adresse e-mail ou mot de passe incorrect.");
                }
                setEmail(clean);
            },
            logout: () => setEmail(null),
        };
    }, [users, email]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
