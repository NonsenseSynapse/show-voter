import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import DeleteIcon from "@mui/icons-material/Delete"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material"

import type { PollDetails, PollOption, ShowDetails } from "./types"
import { apiGet, apiPost } from "./utils/api"

type ManagePollType = {
    pollDetails: PollDetails
    onActivatePoll: (pollId: number) => void
    isDisplay: boolean
}

function ManagePoll({ pollDetails, onActivatePoll, isDisplay }: ManagePollType) {
    const [pollTitle, setPollTitle] = useState("")
    const [pollOptions, setPollOptions] = useState([] as PollOption[])
    const [newOptionIndex, setNewOptionIndex] = useState(-1)
    const [isEdit, setIsEdit] = useState(false)

    const updatePoll = async () => {
        setIsEdit(false)

        const payload = {
            description: pollTitle,
            poll_options: pollOptions.map((pollOption) => {
                if (pollOption.id && pollOption.id < 0) {
                    return {
                        id: undefined,
                        description: pollOption.description,
                        is_active: pollOption.is_active,
                        is_deleted: pollOption.is_deleted || false,
                    }
                } else {
                    return {
                        id: pollOption.id,
                        description: pollOption.description,
                        is_active: pollOption.is_active,
                        is_deleted: pollOption.is_deleted || false,
                    }
                }
            }),
        }
        console.log("PAYLOAD IS...", payload)
        const response = (await apiPost(`poll/${pollDetails.id}`, payload)) as PollDetails
        console.log(response)
    }

    const handleToggleEdit = () => {
        setIsEdit(!isEdit)
    }

    const handleDisplayPoll = async () => {
        const response = (await apiPost(`poll/${pollDetails.id}/display`, {})) as PollDetails
        onActivatePoll(pollDetails.id)
    }

    const handleToggleVisibility = async (optionId: number) => {
        const newPollOptions = pollOptions.map((pollOption) => {
            if (pollOption.id === optionId) {
                pollOption.is_active = !pollOption.is_active
            }
            return pollOption
        })
        setPollOptions(newPollOptions)
    }

    const addPollOption = () => {
        const newPollOptions = [...pollOptions]
        newPollOptions.push({
            id: newOptionIndex,
            description: "",
            is_active: true,
        })
        setNewOptionIndex(newOptionIndex - 1)
        setPollOptions(newPollOptions)
    }

    const handleSetPollOption = (optionId: number, newDescription: string) => {
        const newPollOptions = pollOptions.map((pollOption) => {
            if (pollOption.id === optionId) {
                pollOption.description = newDescription
            }
            return pollOption
        })
        setPollOptions(newPollOptions)
    }

    const deletePollOption = (optionId: number) => {
        console.log("DELETE CENTER USA")
        const newPollOptions = pollOptions.map((pollOption) => {
            if (pollOption.id === optionId) {
                pollOption.is_deleted = true
            }
            return pollOption
        })
        setPollOptions(newPollOptions)
    }

    useEffect(() => {
        setPollOptions(pollDetails.poll_options)
        setPollTitle(pollDetails.description)
    }, [])

    const STYLES = {
        pollTitleWrapper: "mb-4",
        pollOptionWrapper: "mb-2",
        pollOptionButton: "cursor-pointer",
        disableDisplayWrapper: "mb-4",
        activePollSx: "var(--color-sky-200)",
        inactivePollSx: "var(--color-slate-200)",
    }

    return (
        <Accordion
            // sx={{backgroundColor: pollDetails.is_display ? STYLES.activePollSx : STYLES.inactivePollSx}}>
            sx={{ backgroundColor: isDisplay ? STYLES.activePollSx : STYLES.inactivePollSx }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
            >
                <Typography component="span">
                    {/* {pollTitle} ({pollDetails.is_display ? "DISPLAY" : "HIDDEN"}) */}
                    {pollTitle} ({isDisplay ? "DISPLAY" : "HIDDEN"})
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container className={STYLES.disableDisplayWrapper} spacing={4}>
                    <Button variant="contained" color="primary" onClick={handleDisplayPoll}>
                        Display
                    </Button>
                </Grid>
                <Grid className={STYLES.pollTitleWrapper}>
                    <TextField
                        fullWidth
                        label="Poll Title"
                        variant="outlined"
                        value={pollTitle}
                        disabled={!isEdit}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPollTitle(event.target.value)
                        }}
                    />
                </Grid>

                {pollOptions.map((pollOption) => {
                    return (
                        <Grid container size={12} spacing={2} alignItems="center">
                            <Grid className={STYLES.pollOptionWrapper} size={9}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={pollOption.description}
                                    disabled={!isEdit}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        handleSetPollOption(
                                            pollOption.id || newOptionIndex,
                                            event.target.value,
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid size={3}>
                                {pollOption.is_active ? (
                                    <>
                                        <VisibilityIcon
                                            color="success"
                                            className={STYLES.pollOptionButton}
                                            onClick={() =>
                                                handleToggleVisibility(
                                                    pollOption.id || newOptionIndex,
                                                )
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <VisibilityOffIcon
                                            color="error"
                                            className={STYLES.pollOptionButton}
                                            onClick={() =>
                                                handleToggleVisibility(
                                                    pollOption.id || newOptionIndex,
                                                )
                                            }
                                        />
                                    </>
                                )}
                                <DeleteIcon
                                    color="error"
                                    className={STYLES.pollOptionButton}
                                    onClick={() => {
                                        deletePollOption(pollOption.id || newOptionIndex)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    )
                })}
            </AccordionDetails>
            <Button disabled={!isEdit} onClick={addPollOption}>
                Add Option
            </Button>
            <AccordionActions>
                <Button
                    variant="contained"
                    color={isEdit ? "error" : "primary"}
                    onClick={handleToggleEdit}
                >
                    {isEdit ? "Cancel" : "Edit"}
                </Button>
                <Button disabled={!isEdit} variant="contained" color="primary" onClick={updatePoll}>
                    Update
                </Button>
            </AccordionActions>
        </Accordion>
    )
}

function ManageShow() {
    const { show_id } = useParams()

    // const [showDetails, setShowDetails] = useState({} as ShowDetails)
    const [polls, setPolls] = useState([] as PollDetails[])
    const [activePollId, setActivePollId] = useState(0)
    const [showTitle, setShowTitle] = useState("")
    const [displayTitle, setDisplayTitle] = useState("")
    const [isEditTitle, setIsEditTitle] = useState(false)

    const getShow = async () => {
        const response = (await apiGet(`show/${show_id}`)) as ShowDetails
        setPolls(response.polls)
        setShowTitle(response.title)
        setDisplayTitle(response.title)

        response.polls.map((poll) => {
            if (poll.is_display) {
                setActivePollId(poll.id)
            }
        })
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

    const handleDisplayPoll = async (pollId: number) => {
        setActivePollId(pollId)
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
                {polls.map((poll) => {
                    return (
                        <ManagePoll
                            key={poll.id}
                            pollDetails={poll}
                            isDisplay={activePollId === poll.id}
                            onActivatePoll={handleDisplayPoll}
                        />
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default ManageShow
