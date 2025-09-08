import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import {  apiPost } from "./utils/api"

function PollCreate() {
    const navigate = useNavigate()

    const [showName, setShowName] = useState("")

    const createShow = async () => {
        const response = await apiPost(`show`, {
            title: showName,
        })
        console.log("RESPONSE...")
        console.log(response)
        navigate(`/show/${response.id}/poll/create`)
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
