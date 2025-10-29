import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button, Grid, Typography } from "@mui/material"

import type { PollDetails } from "./types"
import type { PollOption } from "./types"
import { apiGet, apiPost } from "./utils/api"

const POLL_INTERVAL = 3

type VoteButtonType = {
    pollOption: PollOption
    color: string
}

function VoteButton({ pollOption, color }: VoteButtonType) {
    const voteForOption = async () => {
        const response = await apiPost(
            `poll/${pollOption.poll_id}/option/${pollOption.id}/vote`,
            {},
        )
        console.log("VOTE FOR OPTION RESPONSE...")
        console.log(response)
    }

    return (
        <Grid container size={12} justifyContent="center">
            <Button
                fullWidth
                onClick={voteForOption}
                variant="contained"
                size="large"
                sx={{ padding: 6, bgcolor: color }}
            >
                {pollOption.description}
            </Button>
        </Grid>
    )
}

function PollVote() {
    const { show_id } = useParams()
    const [pollDetails, setPollDetails] = useState({} as PollDetails)
    const [pollOptionDetails, setPollOptionDetails] = useState({} as Record<any, PollOption>)

    const getPollDetails = async () => {
        const response = await apiGet(`show/${show_id}/poll/display`)
        console.log(response)

        const optionDetailsMap = {} as Record<any, PollOption>
        for (let option of response.poll_options) {
            if (option.id) {
                optionDetailsMap[option.id] = option
            }
        }

        setPollDetails(response)
        setPollOptionDetails(optionDetailsMap)
    }

    useEffect(() => {
        getPollDetails()
        const pollTimer = setInterval(() => getPollDetails(), POLL_INTERVAL * 1000)

        // this will clear the interval when component unmounts
        return () => {
            clearInterval(pollTimer)
        }
    }, [])

    const STYLES = {
        pollDescription: "mb-4",
    }

    return (
        <>
            <Grid className={STYLES.pollDescription} size={12} textAlign={"center"}>
                <Typography variant="h4">{pollDetails.description}</Typography>
            </Grid>
            {pollDetails.poll_options?.map((poll_option, _) => {
                let color = ""
                if (poll_option?.id) {
                    color = pollOptionDetails[poll_option.id].color
                }

                return <VoteButton pollOption={poll_option} color={color} />
            })}
        </>
    )
}

export default PollVote
