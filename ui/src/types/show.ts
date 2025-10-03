import type { PollDetails } from "./poll"

export type ShowSimple = {
    id: number
    title: string
    date_created: string
    current_poll_id: number
}

export type ShowDetails = {
    id: number
    title: string
    date_created: string
    current_poll_id: number
    polls: PollDetails[]
}
