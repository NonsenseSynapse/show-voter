import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"

import type { ShowSimple } from "./types"
import { apiGet, apiPost } from "./utils/api"

function AdminShow({ show }: { show: ShowSimple }) {
    const navigate = useNavigate()

    const goToShow = () => {
        navigate(`/admin/show/${show.id}`)
    }

    return (
        <Card sx={{ minWidth: 275, backgroundColor: blue[200] }}>
            <CardActionArea onClick={goToShow}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                        {show.date_created}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {show.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

function Admin() {
    const [shows, setShows] = useState([] as ShowSimple[])

    const getShows = async () => {
        const response = (await apiGet(`show`)) as ShowSimple[]
        setShows(response)
    }

    const createShow = async () => {
        const response = (await apiPost(`show`, { title: "New Show" })) as ShowSimple
        const updatedShows = [...shows]
        updatedShows.push(response)
        setShows(updatedShows)
    }

    useEffect(() => {
        getShows()
    }, [])

    const STYLES = {
        newShowLink: "cursor-pointer",
    }

    return (
        <Grid container size={12} spacing={2}>
            <Grid size={12} container alignItems="center">
                <Typography variant="h2" gutterBottom>
                    Shows
                </Typography>
                <AddCircleIcon
                    color="primary"
                    fontSize="large"
                    className={STYLES.newShowLink}
                    onClick={createShow}
                />
            </Grid>
            {shows.map((show) => {
                return (
                    <>
                        <Grid size={4}>
                            <AdminShow show={show} />
                        </Grid>
                    </>
                )
            })}
        </Grid>
    )
}

export default Admin
