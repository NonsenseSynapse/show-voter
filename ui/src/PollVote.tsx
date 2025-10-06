import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Button from "@mui/material/Button"

import type { PollDetails } from "./types"
import { apiGet, apiPost } from "./utils/api"

const POLL_INTERVAL = 3

function PollVote() {
    const { show_id } = useParams()
    const [pollDetails, setPollDetails] = useState({} as PollDetails)

    const getPollDetails = async () => {
        const response = await apiGet(`show/${show_id}/poll/display`)
        console.log(response)
        setPollDetails(response)
    }

    const voteForOption = async (optionId: number) => {
        const response = await apiPost(`poll/${pollDetails.id}/option/${optionId}/vote`, {})
        console.log("VOTE FOR OPTION RESPONSE...")
        console.log(response)
    }

    useEffect(() => {
        getPollDetails()
        const pollTimer = setInterval(() => getPollDetails(), POLL_INTERVAL * 1000)

        // this will clear the interval when component unmounts
        return () => {
            clearInterval(pollTimer)
        }
    }, [])

    return (
        <>
            {pollDetails.poll_options?.map((poll_option, _) => (
                <Button onClick={() => voteForOption(poll_option.id)} variant="contained">
                    {poll_option.description}
                </Button>
            ))}
        </>
    )
}

export default PollVote
