import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { PieChart } from "@mui/x-charts/PieChart"

import type { PollDetails } from "./types"
import { apiGet } from "./utils/api"

function PollDisplay() {
    const { show_id, poll_id } = useParams()

    type PieChartData = {
        id: number
        value: number
        label: string
    }

    const [chartData, setChartData] = useState([] as PieChartData[])
    const [pollOptions, setPollOptions] = useState({} as Record<string, string>)
    const [pollVotes, setPollVotes] = useState({} as Record<number, number>)

    const CHART_UPDATE_INTERVAL = 2000

    const getPollDetails = async () => {
        const response = (await apiGet(`poll/${poll_id}`)) as PollDetails
        console.log("Poll Display RESPONSE")
        console.log(response)

        const updatedPollOptions = {} as Record<number, string>
        response.poll_options.map((pollOption) => {
            updatedPollOptions[pollOption.id] = pollOption.description
        })
        setPollOptions(updatedPollOptions)

        const updatedPollVotes = {} as Record<number, number>
        response.votes.map((pollVote) => {
            const option_id = pollVote.poll_option_id
            if (option_id in updatedPollVotes) {
                updatedPollVotes[option_id] += 1
            } else {
                updatedPollVotes[option_id] = 1
            }
        })
        setPollVotes(updatedPollVotes)
    }

    useEffect(() => {
        const updatedData = []
        let index = 0
        for (const [key, value] of Object.entries(pollVotes)) {
            updatedData.push({
                id: index,
                value: value,
                label: pollOptions[key],
            })

            index += 1
        }
        setChartData(updatedData)
    }, [pollVotes])

    useEffect(() => {
        getPollDetails()
        const interval = setInterval(() => {
            getPollDetails()
        }, CHART_UPDATE_INTERVAL)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <PieChart
                series={[
                    {
                        arcLabel: "label",
                        data: chartData,
                    },
                ]}
                width={600}
                height={600}
            />
        </>
    )
}

export default PollDisplay
