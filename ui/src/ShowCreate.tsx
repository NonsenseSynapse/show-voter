import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import { apiGet, apiPost } from "./utils/api"

function PollCreate() {
    const navigate = useNavigate()

    const [showName, setShowName] = useState("")

    const createShow = async () => {
        const response = await apiPost("", {})
        console.log("RESPONSE...")
        console.log(response)
        navigate("")
    }

    return (
        <>
            <TextField
                label="Show Name"
                variant="outlined"
                onChange={(e) => setShowName(e.target.value)}
            />
            <Button onClick={createShow} variant="contained">
                Create Show
            </Button>
        </>
    )
}

export default PollCreate
