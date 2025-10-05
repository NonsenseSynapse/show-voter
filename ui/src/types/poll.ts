export type PollOption = {
    id: number | undefined
    description: string
    is_active: boolean
    is_deleted?: boolean
    poll_id?: number
    date_created?: string
    date_updated?: string
}

export type PollVote = {
    poll_option_id: number
    date_created: string
}

export type PollDetails = {
    id: number
    description: string
    order: number
    show_id: number
    is_display: boolean
    date_created: string
    poll_options: PollOption[]
    votes: PollVote[]
}
