import { useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Grid from "@mui/material/Grid"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Home from "./Home"
import PollCreate from "./PollCreate"
import PollDisplay from "./PollDisplay"
import ShowCreate from "./ShowCreate"
import Vote from "./Vote"

function App() {
    const router = createBrowserRouter([
        {
            path: "",
            element: <Home />,
        },
        {
            path: "/show/:show_id/poll/:poll_id/vote",
            element: <Vote />,
        },
        {
            path: "show/:show_id/poll/:poll_id/display",
            element: <PollDisplay />,
        },
        {
            path: "show/:show_id/poll/create",
            element: <PollCreate />,
        },
        {
            path: "show/create",
            element: <ShowCreate />,
        },
    ])

    const lightTheme = createTheme({
        palette: {
            mode: "light",
        },
    })

    const STYLES = {
        contentWrapper: "",
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <Grid container spacing={2} display="flex" justifyContent="center" alignItems="">
                <Grid container size={12} className={STYLES.contentWrapper}>
                    <RouterProvider router={router} />
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default App
