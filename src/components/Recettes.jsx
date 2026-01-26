import { useState, useMemo } from "react";
import {
    Grid,
    Typography,
    Box,
    Alert,
    Sheet,
    Button
} from "@mui/joy";


import RecetteCard from "./RecetteCard";
import RecetteFilter from "./RecetteFilter";

const RECETTES_DATA = [
    {
        id: 1,
        titre: "Riz sauce graine",
        description: "Un plat ivoirien très populaire à base de sauce graine.",
        ingredients: [
            "Riz",
            "Graine de palme",
            "Viande",
            "Poisson fumé",
            "Oignon",
            "Piment"
        ],
        etapes: [
            "Faire bouillir la graine de palme et extraire la sauce",
            "Faire revenir la viande avec les oignons",
            "Ajouter la sauce graine et laisser mijoter",
            "Ajouter le poisson fumé et les épices",
            "Servir avec du riz chaud"
        ],
        duree: 45,
        difficulte: "moyenne",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop",
        categorie: "plats principaux",
        favori: true
    },
    {
        id: 2,
        titre: "Omelette rapide",
        description: "Une omelette simple et rapide pour le petit déjeuner.",
        ingredients: ["Œufs", "Sel", "Huile", "Poivre", "Persil"],
        etapes: [
            "Casser les œufs dans un bol",
            "Ajouter le sel, poivre et battre",
            "Faire chauffer l'huile dans une poêle",
            "Cuire l'omelette à feu moyen 3-4 minutes par côté"
        ],
        duree: 10,
        difficulte: "facile",
        image: "https://images.unsplash.com/photo-1579735775941-dc6952bcdc1a?w-800&auto=format&fit=crop",
        categorie: "petit déjeuner",
        favori: false
    },
    {
        id: 3,
        titre: "Attiéké poisson braisé",
        description: "Un classique ivoirien très apprécié.",
        ingredients: [
            "Attiéké",
            "Poisson (tilapia ou capitaine)",
            "Tomate",
            "Oignon",
            "Piment",
            "Huile",
            "Citron"
        ],
        etapes: [
            "Nettoyer et assaisonner le poisson avec citron et sel",
            "Braiser le poisson 15-20 minutes",
            "Préparer la sauce tomate-oignon-piment",
            "Servir le poisson avec l'attiéké et la sauce"
        ],
        duree: 35,
        difficulte: "facile",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
        categorie: "plats principaux",
        favori: true
    },
    {
        id: 4,
        titre: "Poulet Yassa",
        description: "Poulet mariné aux oignons et citron, originaire du Sénégal.",
        ingredients: [
            "Poulet",
            "Oignons (4-5)",
            "Citron (3-4)",
            "Moutarde",
            "Huile",
            "Poivre",
            "Ail"
        ],
        etapes: [
            "Mariner le poulet 2-4 heures avec citron, moutarde et épices",
            "Faire griller le poulet jusqu'à coloration",
            "Caraméliser les oignons émincés",
            "Ajouter le poulet et mijoter 20 minutes"
        ],
        duree: 50,
        difficulte: "moyenne",
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&auto=format&fit=crop",
        categorie: "plats principaux",
        favori: false
    },
    {
        id: 5,
        titre: "Garba",
        description: "Spécialité abidjanaise à base d'attiéké et thon frit.",
        ingredients: [
            "Attiéké",
            "Thon frais",
            "Oignon rouge",
            "Piment frais",
            "Huile",
            "Tomate",
            "Maggi"
        ],
        etapes: [
            "Découper et assaisonner le thon",
            "Frire le thon jusqu'à croustillant",
            "Émincer finement oignons et tomates",
            "Servir l'attiéké avec thon, légumes et piment"
        ],
        duree: 15,
        difficulte: "facile",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop",
        categorie: "snack",
        favori: true
    },
    {
        id: 6,
        titre: "Sauce Claire à la Viande",
        description: "Sauce traditionnelle accompagnée de riz blanc.",
        ingredients: [
            "Viande de bœuf",
            "Aubergines",
            "Carottes",
            "Piments",
            "Oignons",
            "Cube maggi",
            "Tomate concentrée"
        ],
        etapes: [
            "Faire bouillir la viande avec oignons",
            "Ajouter les légumes coupés en dés",
            "Incorporer la tomate concentrée",
            "Laisser mijoter 30 minutes"
        ],
        duree: 60,
        difficulte: "difficile",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
        categorie: "plats principaux",
        favori: false
    }
];

function Recettes() {
    const [recettes, setRecettes] = useState(RECETTES_DATA);
    const [filters, setFilters] = useState({
        search: "",
        difficulte: "all",
        categorie: "all",
        dureeMax: 120,
        ingredientsMin: 0
    });

    // Statistiques
    const stats = useMemo(() => {
        const totalRecettes = recettes.length;
        const totalIngredients = recettes.reduce((acc, recette) =>
            acc + recette.ingredients.length, 0
        );
        const totalTemps = recettes.reduce((acc, recette) =>
            acc + recette.duree, 0
        );
        const favorites = recettes.filter(r => r.favori).length;

        return { totalRecettes, totalIngredients, totalTemps, favorites };
    }, [recettes]);

    // Fonction de filtrage améliorée
    const recettesFiltrees = useMemo(() => {
        return recettes.filter((recette) => {
            const matchSearch =
                filters.search === "" ||
                recette.titre.toLowerCase().includes(filters.search.toLowerCase()) ||
                recette.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                recette.ingredients.some(ing =>
                    ing.toLowerCase().includes(filters.search.toLowerCase())
                );

            const matchDifficulte =
                filters.difficulte === "all" ||
                recette.difficulte === filters.difficulte;

            const matchCategorie =
                filters.categorie === "all" ||
                recette.categorie === filters.categorie;

            const matchDuree = recette.duree <= filters.dureeMax;
            const matchIngredients = recette.ingredients.length >= filters.ingredientsMin;

            return matchSearch && matchDifficulte && matchCategorie && matchDuree && matchIngredients;
        });
    }, [recettes, filters]);

    // Gestion des favoris
    const toggleFavori = (id) => {
        setRecettes(prev => prev.map(recette =>
            recette.id === id
                ? { ...recette, favori: !recette.favori }
                : recette
        ));
    };

    // Réinitialiser les filtres
    const resetFilters = () => {
        setFilters({
            search: "",
            difficulte: "all",
            categorie: "all",
            dureeMax: 120,
            ingredientsMin: 0
        });
    };

    return (
        <Box sx={{ maxWidth: '1400px', margin: '0 auto', p: { xs: 1, md: 3 } }}>
            {/* En-tête avec statistiques */}
            <Sheet
                variant="soft"
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 'md',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>

                    <Typography level="h2" sx={{ color: 'white' }}>
                        Recettes Africaines
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{ mb: 2 }}>
                    <Grid size={{ xs: 6, sm: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography level="h4" sx={{ color: 'white' }}>
                                {stats.totalRecettes}
                            </Typography>
                            <Typography level="body-sm" sx={{ color: 'white', opacity: 0.9 }}>
                                Recettes
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography level="h4" sx={{ color: 'white' }}>
                                {stats.favorites}
                            </Typography>
                            <Typography level="body-sm" sx={{ color: 'white', opacity: 0.9 }}>
                                Favorites
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography level="h4" sx={{ color: 'white' }}>
                                {stats.totalIngredients}
                            </Typography>
                            <Typography level="body-sm" sx={{ color: 'white', opacity: 0.9 }}>
                                Ingrédients
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>

                            <Typography level="h4" component="span" sx={{ color: 'white' }}>
                                {stats.totalTemps} min
                            </Typography>
                            <Typography level="body-sm" sx={{ color: 'white', opacity: 0.9 }}>
                                Temps total
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Sheet>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 3 }}>
                    <RecetteFilter
                        filters={filters}
                        setFilters={setFilters}
                        recettes={recettes}
                    />

                    {filters.search || filters.difficulte !== "all" || filters.categorie !== "all" ? (
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={resetFilters}
                            fullWidth
                            sx={{ mt: 2 }}

                        >
                            Réinitialiser filtres
                        </Button>
                    ) : null}
                </Grid>

                {/* Liste des recettes */}
                <Grid size={{ xs: 12, md: 9 }}>
                    {recettesFiltrees.length === 0 ? (
                        <Alert
                            color="warning"
                            variant="soft"
                            sx={{ mt: 2 }}
                        >
                            Aucune recette ne correspond à vos critères de recherche.
                            <Button
                                variant="plain"
                                onClick={resetFilters}
                                sx={{ ml: 1 }}
                            >
                                Réinitialiser les filtres
                            </Button>
                        </Alert>
                    ) : (
                        <>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography level="h4">
                                    {recettesFiltrees.length} recette{recettesFiltrees.length > 1 ? 's' : ''} trouvée{recettesFiltrees.length > 1 ? 's' : ''}
                                </Typography>
                                <Typography level="body-sm" color="neutral">
                                    {recettesFiltrees.length} sur {recettes.length}
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                {recettesFiltrees.map((recette) => (
                                    <Grid
                                        size={{
                                            xs: 12,
                                            sm: 6,
                                            lg: recettesFiltrees.length === 1 ? 12 : 4
                                        }}
                                        key={recette.id}
                                    >
                                        <RecetteCard
                                            recette={recette}
                                            onToggleFavori={() => toggleFavori(recette.id)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Recettes;