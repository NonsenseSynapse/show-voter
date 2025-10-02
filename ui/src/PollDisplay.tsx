import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Grid, Typography } from "@mui/material"
import { PieChart } from "@mui/x-charts/PieChart"

import type { PollDetails } from "./types"
import { apiGet } from "./utils/api"

type PieChartData = {
    id: string
    value: number
    label: string
}

function PollDisplay() {
    const { poll_id } = useParams()

    const POLL_INTERVAL = 3

    const [pollDetails, setPollDetails] = useState<PollDetails>({} as PollDetails)
    const [voteOptions, setVoteOptions] = useState({} as Record<any, string>)
    const [chartData, setChartData] = useState([] as PieChartData[])

    const getPollDetails = async () => {
        const response = (await apiGet(`poll/${poll_id}`)) as PollDetails
        console.log("Poll Display RESPONSE")
        console.log(response)
        setPollDetails(response)

        const optionsMap = {} as Record<number, string>
        for (let option of response.poll_options) {
            optionsMap[option.id] = option.description
        }

        setVoteOptions(optionsMap)
    }

    const processChartData = async (apiResponse: PollDetails) => {
        const votes = apiResponse.votes
        const aggregatedVotes = {} as Record<any, number>
        for (let vote of votes) {
            if (vote.poll_option_id in aggregatedVotes) {
                aggregatedVotes[vote.poll_option_id] += 1
            } else {
                aggregatedVotes[vote.poll_option_id] = 1
            }
        }

        const pollChartData = []
        for (let vote_option_id of Object.keys(aggregatedVotes)) {
            pollChartData.push({
                id: vote_option_id,
                value: aggregatedVotes[vote_option_id],
                label: voteOptions[vote_option_id],
            })
        }
        setChartData(pollChartData)
    }

    const pollVoteUpdates = useCallback(async () => {
        const response = (await apiGet(`poll/${poll_id}`)) as PollDetails
        processChartData(response)
    }, [voteOptions])

    useEffect(() => {
        getPollDetails()
    }, [])

    useEffect(() => {
        const pollTimer = setInterval(() => pollVoteUpdates(), POLL_INTERVAL * 1000)

        // this will clear the interval when component unmounts
        return () => {
            clearInterval(pollTimer)
        }
    }, [pollVoteUpdates])

    return (
        <Grid>
            <Typography>Poll Display ({pollDetails.id})</Typography>
            <PieChart
                series={[
                    {
                        data: chartData,
                    },
                ]}
                width={400}
                height={400}
            />
        </Grid>
    )
}

export default PollDisplay
