import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import {Grid, Button } from "@mui/material"

import type { PollDetails } from "./types"
import { apiGet, apiPost } from "./utils/api"
import type { PollOption } from "./types"
const POLL_INTERVAL = 3

type VoteButtonType = {
    pollOption: PollOption
}

function VoteButton({pollOption} : VoteButtonType) {
    
    const voteForOption = async () => {
        const response = await apiPost(`poll/${pollOption.poll_id}/option/${pollOption.id}/vote`, {})
        console.log("VOTE FOR OPTION RESPONSE...")
        console.log(response)
    }

    return (
        <Grid container size={12} justifyContent="center">
            <Button fullWidth onClick={voteForOption} variant="contained" size="large"
                sx={{padding: 6}}
            >
                {pollOption.description}
            </Button>
        </Grid>

    )
}

function PollVote() {
    const { show_id } = useParams()
    const [pollDetails, setPollDetails] = useState({} as PollDetails)

    const getPollDetails = async () => {
        const response = await apiGet(`show/${show_id}/poll/display`)
        console.log(response)
        setPollDetails(response)
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
                <VoteButton pollOption={poll_option}/>
            ))}
        </>
    )
}

export default PollVote
