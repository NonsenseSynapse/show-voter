import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Grid, Typography } from "@mui/material"

import type { PollDetails, ShowDetails } from "./types"
import { apiGet } from "./utils/api"

function ManagePoll({ pollDetails }: { pollDetails: PollDetails }) {
    return <Grid size={12}>{pollDetails.description}</Grid>
}

function ManageShow() {
    const { show_id } = useParams()

    const [showDetails, setShowDetails] = useState({} as ShowDetails)

    const getShow = async () => {
        const response = (await apiGet(`show/${show_id}`)) as ShowDetails
        setShowDetails(response)
    }

    useEffect(() => {
        getShow()
    }, [])

    return (
        <Grid container size={12}>
            <Grid size={12}>
                <Typography variant="h2" gutterBottom>
                    {showDetails.title}
                </Typography>
            </Grid>

            <Grid size={12}>
                {showDetails.polls?.map((poll) => {
                    return <ManagePoll pollDetails={poll} />
                })}
            </Grid>
        </Grid>
    )
}

export default ManageShow
