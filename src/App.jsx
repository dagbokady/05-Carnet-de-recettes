import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { Footer, Navbar } from "./components/Global.jsx";
import AuthModal from "./components/AuthModal.jsx";
import RecetteForm from "./components/RecetteForm.jsx";
import Home from "./pages/Home.jsx";
import RecetteDetail from "./pages/RecetteDetail.jsx";
import { loadRecettes, saveRecettes } from "./store.js";
import { useAuth } from "./auth-context.js";

function App() {
    const { user, logout } = useAuth();
    const [recettes, setRecettes] = useState(loadRecettes);
    const [formOuvert, setFormOuvert] = useState(false);
    const [authMode, setAuthMode] = useState(null); // "login" | "signup" | null
    const [filters, setFilters] = useState({
        search: "",
        difficulte: "all",
        categorie: "all",
        dureeMax: 120,
    });

    useEffect(() => saveRecettes(recettes), [recettes]);

    const toggleFavori = (id) =>
        setRecettes((prev) => prev.map((r) => (r.id === id ? { ...r, favori: !r.favori } : r)));

    // Publier demande un compte : sinon on ouvre l'inscription.
    const publier = () => (user ? setFormOuvert(true) : setAuthMode("signup"));

    const addRecette = (data) => {
        const lignes = (txt) =>
            txt.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);

        setRecettes((prev) => [
            {
                ...data,
                id: Date.now(),
                duree: Number(data.duree) || 0,
                ingredients: lignes(data.ingredients),
                etapes: data.etapes.split("\n").map((s) => s.trim()).filter(Boolean),
                auteur: user?.nom ?? "le Carnet",
                favori: false,
            },
            ...prev,
        ]);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar
                user={user}
                onLogin={setAuthMode}
                onLogout={logout}
                onPublish={publier}
                filters={filters}
                setFilters={setFilters}
            />

            <RecetteForm active={formOuvert} setActive={setFormOuvert} onSubmit={addRecette} />
            <AuthModal
                key={authMode}
                open={authMode !== null}
                initialMode={authMode ?? "login"}
                onClose={() => setAuthMode(null)}
            />

            <div className="flex-1">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                recettes={recettes}
                                filters={filters}
                                setFilters={setFilters}
                                toggleFavori={toggleFavori}
                                onAdd={publier}
                            />
                        }
                    />
                    <Route
                        path="/recette/:id"
                        element={<RecetteDetail recettes={recettes} toggleFavori={toggleFavori} />}
                    />
                </Routes>
            </div>

            <Footer />
        </div>
    );
}

export default App;
