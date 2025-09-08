import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { apiGet } from "./utils/api"

function PollVote() {
    const { show_id, poll_id } = useParams()
    const {pollDetails, setPollDetails} = useState({})

    const getPollDetails = async () => {
        const response = await apiGet(`poll/${poll_id}`)
        console.log("RESPONSE...")
        console.log(response)
        setPollDetails(response)
    }

    useEffect(() => {
        getPollDetails()
    }, [])

    return <>Poll Display</>
}

export default PollVote
