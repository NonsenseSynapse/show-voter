import { useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"

function Home() {
    const navigate = useNavigate()

    const STYLES = {
        linkButtonWrapper: "mb-4",
    }

    return (
        <>
            <Grid size={12}>
                <Grid size={12} className={STYLES.linkButtonWrapper}>
                    <Button onClick={() => navigate("show/create")} variant="contained">
                        Create Show
                    </Button>
                </Grid>

                <Grid size={12} className={STYLES.linkButtonWrapper}>
                    <Button onClick={() => navigate("")} variant="contained">
                        Create Poll
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Home
