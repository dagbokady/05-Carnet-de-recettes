import { useState } from "react";
import {
    Button,
    DialogTitle,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalDialog,
    Stack,
    Textarea,
    Select,
    Option
} from "@mui/joy";

export default function RecetteForm({ active, setActive, onSubmit }) {
    const [formData, setFormData] = useState({
        titre: "",
        description: "",
        ingredients: "",
        etapes: "",
        duree: "",
        difficulte: "facile",
        image: ""
    });

    const handleChange = (field) => (event, value) => {
        setFormData({
            ...formData,
            [field]: event?.target ? event.target.value : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData); // envoie les données au parent
        setActive(false);
    };

    return (
        <Modal open={active} onClose={() => setActive(false)} >
            <ModalDialog sx={{ width: 400 }} >
                <DialogTitle>🍲 Ajouter une nouvelle recette</DialogTitle>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <FormControl required>
                            <FormLabel>Titre</FormLabel>
                            <Input
                                placeholder="Ex : Riz sauce graine"
                                value={formData.titre}
                                onChange={handleChange("titre")}
                            />
                        </FormControl>

                        <FormControl required>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                minRows={2}
                                placeholder="Brève description de la recette"
                                value={formData.description}
                                onChange={handleChange("description")}
                            />
                        </FormControl>

                        <FormControl required>
                            <FormLabel>Ingrédients</FormLabel>
                            <Textarea
                                minRows={3}
                                placeholder="Ex : riz, huile, tomate..."
                                value={formData.ingredients}
                                onChange={handleChange("ingredients")}
                            />
                        </FormControl>

                        <FormControl required>
                            <FormLabel>Étapes de préparation</FormLabel>
                            <Textarea
                                minRows={4}
                                placeholder="Étape 1, Étape 2..."
                                value={formData.etapes}
                                onChange={handleChange("etapes")}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Durée (minutes)</FormLabel>
                            <Input
                                type="number"
                                placeholder="Ex : 30"
                                value={formData.duree}
                                onChange={handleChange("duree")}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Difficulté</FormLabel>
                            <Select
                                value={formData.difficulte}
                                onChange={handleChange("difficulte")}
                            >
                                <Option value="facile">Facile</Option>
                                <Option value="moyenne">Moyenne</Option>
                                <Option value="difficile">Difficile</Option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Image (URL)</FormLabel>
                            <Input
                                placeholder="https://image-recette.jpg"
                                value={formData.image}
                                onChange={handleChange("image")}
                            />
                        </FormControl>

                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="outlined" onClick={() => setActive(false)}>
                                Annuler
                            </Button>
                            <Button type="submit">
                                Enregistrer
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}
