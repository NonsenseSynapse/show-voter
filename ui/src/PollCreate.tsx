import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Button, TextField } from "@mui/material"

import { apiPost } from "./utils/api"

function PollCreate() {
    const { show_id } = useParams()

    const navigate = useNavigate()

    const [pollQuestion, setPollQuestion] = useState("")
    const [optionOne, setOptionOne] = useState("")
    const [optionTwo, setOPtionTwo] = useState("")

    const creatPoll = async () => {
        const response = await apiPost(`show/${show_id}/poll/create`, {
            show_id: show_id,
            description: pollQuestion,
            order: 0,
            poll_options: [{ description: optionOne }, { description: optionTwo }],
        })
        console.log("Poll Create RESPONSE...")
        console.log(response)
        navigate(`/show/${show_id}/poll/${response.id}/display`)
    }

    return (
        <>
            <TextField
                label="Poll Question"
                variant="outlined"
                onChange={(e) => setPollQuestion(e.target.value)}
            />

            <TextField
                label="Option 1"
                variant="outlined"
                onChange={(e) => setOptionOne(e.target.value)}
            />

            <TextField
                label="Option 2"
                variant="outlined"
                onChange={(e) => setOPtionTwo(e.target.value)}
            />
            <Button onClick={creatPoll} variant="contained">
                Create Poll
            </Button>
        </>
    )
}

export default PollCreate
