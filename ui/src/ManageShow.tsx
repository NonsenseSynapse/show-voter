import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material"

import type { PollDetails, PollOption, ShowDetails } from "./types"
import { apiGet, apiPost } from "./utils/api"

function ManagePoll({ pollDetails }: { pollDetails: PollDetails }) {
    const [pollOptions, setPollOptions] = useState([] as PollOption[])

    const updatePoll = () => {}

    useEffect(() => {
        setPollOptions(pollDetails.poll_options)
    }, [])

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
            >
                <Typography component="span">{pollDetails.description}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {pollOptions.map((pollOption) => {
                    return <Grid>{pollOption.description}</Grid>
                })}
            </AccordionDetails>
            <AccordionActions>
                <Button>Cancel</Button>
                <Button>Agree</Button>
            </AccordionActions>
        </Accordion>
    )
}

function ManageShow() {
    const { show_id } = useParams()

    const [showDetails, setShowDetails] = useState({} as ShowDetails)
    const [showTitle, setShowTitle] = useState("")
    const [displayTitle, setDisplayTitle] = useState("")
    const [isEditTitle, setIsEditTitle] = useState(false)

    const getShow = async () => {
        const response = (await apiGet(`show/${show_id}`)) as ShowDetails
        setShowDetails(response)
        setShowTitle(response.title)
        setDisplayTitle(response.title)
    }

    const handleSetShowTitle = async (newTitle: string) => {
        setShowTitle(newTitle)
    }

    const updateShowTitle = async () => {
        const response = (await apiPost(`show/${show_id}`, {
            title: showTitle,
        })) as ShowDetails
        console.log(response)
        setDisplayTitle(response.title)
        setIsEditTitle(false)
    }

    useEffect(() => {
        getShow()
    }, [])

    const STYLES = {
        displayTitle: "mb-8",
    }

    return (
        <Grid container size={12}>
            <Grid className={STYLES.displayTitle}>
                <Typography variant="h4">{displayTitle}</Typography>
            </Grid>
            <Grid container size={12} spacing={2} alignItems="center">
                <Grid>
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={showTitle}
                        disabled={!isEditTitle}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleSetShowTitle(event.target.value)
                        }}
                    />
                </Grid>
                <Grid>
                    {isEditTitle ? (
                        <>
                            <Button
                                onClick={updateShowTitle}
                                variant="contained"
                                disabled={showTitle == displayTitle}
                            >
                                Update
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => setIsEditTitle(!isEditTitle)}
                                variant="contained"
                            >
                                Edit
                            </Button>
                        </>
                    )}
                </Grid>

                <Grid>
                    <Button
                        variant="contained"
                        color="error"
                        disabled={!isEditTitle}
                        onClick={() => setIsEditTitle(false)}
                    >
                        Cancel
                    </Button>
                </Grid>
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
