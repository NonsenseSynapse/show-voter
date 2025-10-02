import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { apiGet } from "./utils/api"

function PollDisplay() {
    const { poll_id } = useParams()

    const getPollDetails = async () => {
        const response = await apiGet(`poll/${poll_id}`)
        console.log("Poll Display RESPONSE")
        console.log(response)
    }

    useEffect(() => {
        getPollDetails()
    }, [])

    return <>Poll Display</>
}

export default PollDisplay
