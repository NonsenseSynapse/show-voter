import { useState } from "react"
import QRCode from "react-qr-code";

import { Grid } from "@mui/material"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { WEB_BASE } from "./constants"

function QRGenerator() {
    const [showID, setShowID] = useState("")
    const [pollId, setPollId] = useState("")
    const [qrUrl, setQRUrl] = useState("")

    const generateQRCode = async (pageType: string) => {
        if (pageType == "POLL_DISPLAY") {
            setQRUrl(`${WEB_BASE}/show/${showID}/poll/${pollId}/display`)
        } else if (pageType == "POLL_VOTE") {
            setQRUrl(`${WEB_BASE}/show/${showID}/poll/${pollId}/vote`)
        }
    }

    return (
        <>
            <Grid spacing={2} container>
                <Typography variant="h2" gutterBottom>
                    Generate a QR Code
                </Typography>
                <TextField
                    label="Show ID"
                    variant="outlined"
                    onChange={(e) => setShowID(e.target.value)}
                />
                <TextField
                    label="Poll ID"
                    variant="outlined"
                    onChange={(e) => setPollId(e.target.value)}
                />
            </Grid>
            <Grid spacing={2} container>
                <Button onClick={() => generateQRCode("POLL_VOTE")} variant="contained">
                    Poll Vote QR Code
                </Button>

                <Button onClick={() => generateQRCode("POLL_DISPLAY")} variant="contained">
                    Poll Display QR Code
                </Button>
            </Grid>
            <Grid>
                <Typography variant="h5" gutterBottom>
                    {qrUrl}
                </Typography>
            </Grid>
            <Grid>
                <QRCode value={qrUrl}></QRCode>
            </Grid>
        </>
    )
}

export default QRGenerator
