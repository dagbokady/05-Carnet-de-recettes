import { Input, Select, Option, Stack } from "@mui/joy";

export default function RecetteFilter({ filters, setFilters }) {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 3 }}
        >
            <Input
                placeholder="🔍 Rechercher une recette..."
                value={filters.search}
                onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                }
                fullWidth
            />

            <Select
                value={filters.difficulte}
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setFilters({ ...filters, difficulte: newValue });
                    }
                }}
                sx={{ minWidth: 160 }}
            >
                <Option value="all">Toutes</Option>
                <Option value="facile">Facile</Option>
                <Option value="moyenne">Moyenne</Option>
                <Option value="difficile">Difficile</Option>
            </Select>
        </Stack>
    );
}
