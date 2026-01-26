import {
    Card,
    Typography,
    AspectRatio,
    Chip,
    Stack
} from "@mui/joy";

export default function RecetteCard({ recette }) {
    return (
        <Card variant="outlined" sx={{ width: 300 }}>
            <AspectRatio>
                <div>
                    <img src={recette.image} />
                </div>
            </AspectRatio>
            <div>
                <Typography level="title-md">
                    {recette.titre}
                </Typography>
                <Typography level="body-sm">
                    {recette.description}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Chip size="sm" color="primary">
                        ⏱ {recette.duree} min
                    </Chip>
                    <Chip size="sm" variant="soft">
                        {recette.difficulte}
                    </Chip>
                </Stack>
            </div>
        </Card>

)

}
