import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { WEB_BASE } from "./constants"

function QRGenerator() {
    const navigate = useNavigate()

    const [showID, setShowID] = useState("")
    const [pollId, setPollId] = useState("")
    const [qrUrl, setQRUrl] = useState("")

    const generateQRCode = async (pageType: string) => {
        if (pageType == "POLL_DISPLAY") {
            setQRUrl(`${WEB_BASE}/show/${showID}/poll/${pollId}/vote`)
        } else if (pageType == "POLL_VOTE") {
            setQRUrl(`${WEB_BASE}/show/${showID}/poll/${pollId}/display`)
        }
    }

    return (
        <>
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
            <Button onClick={() => generateQRCode("POLL_VOTE")} variant="contained">
                Poll Vote QR Code
            </Button>

            <Button onClick={() => generateQRCode("POLL_DISPLAY")} variant="contained">
                Poll Display QR Code
            </Button>
        </>
    )
}

export default QRGenerator
