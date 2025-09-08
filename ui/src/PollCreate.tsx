import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Button, TextField } from "@mui/material"

import { apiPost } from "./utils/api"

function PollCreate() {
    const { show_id } = useParams()

    const navigate = useNavigate()

    const [showName, setShowName] = useState("")

    const createShow = async () => {
        const response = await apiPost(`poll`, {
            show_id: showName,
        })
        console.log("RESPONSE...")
        console.log(response)
        navigate(`show/${show_id}/poll/${response.id}/display`)
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
