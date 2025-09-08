import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Button from "@mui/material/Button"

import type { PollDetails } from "./types"
import { apiGet, apiPost } from "./utils/api"

function PollVote() {
    const { show_id, poll_id } = useParams()
    const [pollDetails, setPollDetails] = useState({} as PollDetails)

    const getPollDetails = async () => {
        const response = await apiGet(`poll/${poll_id}`)
        console.log("BRENDO PLEASE DONT BEEF IT...")
        console.log(response)
        setPollDetails(response)
    }

    const voteForOption = async (optionId: number) => {
        const response = await apiPost(`poll/${poll_id}/option/${optionId}/vote`, {})
        console.log("VOTE FOR OPTION RESPONSE...")
        console.log(response)
    }

    useEffect(() => {
        getPollDetails()
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
