import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Grid from "@mui/material/Grid"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Admin from "./Admin"
import Home from "./Home"
import ManageShow from "./ManageShow"
import PollCreate from "./PollCreate"
import PollDisplay from "./PollDisplay"
import PollVote from "./PollVote"
import QRGenerator from "./QRGenerator"
import ShowCreate from "./ShowCreate"

function App() {
    const router = createBrowserRouter([
        {
            path: "",
            element: <Home />,
        },
        {
            path: "/show/:show_id/vote",
            element: <PollVote />,
        },
        {
            path: "show/:show_id/display",
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
        {
            path: "qr/create",
            element: <QRGenerator />,
        },
        {
            path: "admin",
            element: <Admin />,
        },
        {
            path: "admin/show/:show_id",
            element: <ManageShow />,
        },
    ])

    const lightTheme = createTheme({
        palette: {
            mode: "light",
        },
    })

    const STYLES = {
        contentWrapper: "p-8",
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
