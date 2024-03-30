import { useState } from "react";
import {
    Button,
    Grid,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import AuthorizedForm from "../../components/onu/onu-offline-form";

export default function Addonu() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <Stack
                direction="column"
                sx={{ mt: { md: -13, xs: -1 }, p: { md: 15, xs: 3 } }}
            >
                <Grid container spacing={2}>
                    <AuthorizedForm />
                </Grid>
            </Stack>
        </>
    );
}
