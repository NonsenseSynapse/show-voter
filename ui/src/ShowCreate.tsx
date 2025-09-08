import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import { API_BASE, IS_DEV, IS_PROD } from "./constants"
import { apiGet, apiPost } from "./utils/api"

function PollCreate() {
    const navigate = useNavigate()

    const [showName, setShowName] = useState("")

    const createShow = async () => {
        console.log("DO THE THING NOW")
        console.log(`${API_BASE}/show`)
        console.log("IS_DEV? ", IS_DEV)
        console.log("IS_PROD?", IS_PROD)
        const response = await apiPost(`show`, {
            title: showName,
        })
        console.log("RESPONSE...")
        console.log(response)
        navigate(`show/${response.id}/poll/create`)
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
