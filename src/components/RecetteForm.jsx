import {Button, DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog, Stack} from "@mui/joy";

export default function RecetteForm({active,setActive}) {

    return   <Modal open={active} onClose={() => setActive(false)}>
        <ModalDialog>
            <DialogTitle>Ajouter une nouvelle recette </DialogTitle>
            <DialogContent>Entrez des informations pour ajouter une nouvelle recette</DialogContent>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    setOpen(false);
                }}
            >
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input autoFocus required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input required />
                    </FormControl>
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </ModalDialog>
    </Modal>
}