import { useCallback, useEffect, useState } from "react"
import { QRCode } from "react-qrcode-logo"
import { useParams } from "react-router-dom"

import { Grid, Typography } from "@mui/material"
import { PieChart } from "@mui/x-charts/PieChart"

import { ROUTER_ENCRYPTION, ROUTER_NETWORK, ROUTER_PASSWORD, WEB_BASE } from "./constants"
import type { PollDetails } from "./types"
import { apiGet } from "./utils/api"

type PieChartData = {
    id: string
    value: number
    label: string
}

function PollDisplay() {
    const { show_id } = useParams()

    const POLL_INTERVAL = 3

    const [pollDescription, setPollDescription] = useState("")
    const [voteOptions, setVoteOptions] = useState({} as Record<any, string>)
    const [chartData, setChartData] = useState([] as PieChartData[])
    const voteUrl = `${WEB_BASE}/show/${show_id}/vote`

    const wifiUrl = `WIFI:T:${ROUTER_ENCRYPTION};S:${ROUTER_NETWORK};P:${ROUTER_PASSWORD};`

    const getPollDetails = async () => {
        const response = (await apiGet(`show/${show_id}/poll/display`)) as PollDetails
        console.log("Poll Display RESPONSE")
        console.log(response)

        setPollDescription(response.description)

        const optionsMap = {} as Record<number, string>
        for (let option of response.poll_options) {
            if (option.id) {
                optionsMap[option.id] = option.description
            }
        }

        setVoteOptions(optionsMap)
        processChartData(response, optionsMap)
    }

    const processChartData = useCallback(
        async (apiResponse: PollDetails, optionsOverride: Record<any, string> = {}) => {
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
                    label: optionsOverride[vote_option_id] || voteOptions[vote_option_id],
                })
            }
            setChartData(pollChartData)
        },
        [voteOptions],
    )

    const pollVoteUpdates = useCallback(async () => {
        const response = (await apiGet(`show/${show_id}/poll/display`)) as PollDetails
        const optionsMap = {} as Record<number, string>
        for (let option of response.poll_options) {
            if (option.id) {
                optionsMap[option.id] = option.description
            }
        }

        setVoteOptions(optionsMap)
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

    const STYLES = {
        pollDescription: "mb-8",
    }

    return (
        <Grid container size={12} display="flex" alignItems="center" justifyContent="center">
            <Grid className={STYLES.pollDescription} size={12} textAlign={"center"}>
                <Typography variant="h4">{pollDescription}</Typography>
            </Grid>
            <Grid size={4}>
                <Typography variant="h3">Vote</Typography>
                <QRCode value={voteUrl} size={300} />
            </Grid>
            <Grid size={4}>
                <PieChart
                    hideLegend
                    series={[
                        {
                            data: chartData,
                            arcLabel: "label",
                        },
                    ]}
                    width={400}
                    height={400}
                />
            </Grid>
            <Grid size={4}>
                <Typography variant="h3">WiFi</Typography>
                <QRCode value={wifiUrl} size={300} />
            </Grid>
        </Grid>
    )
}

export default PollDisplay
