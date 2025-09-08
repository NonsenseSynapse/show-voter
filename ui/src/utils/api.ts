import { API_BASE } from "../constants"

export const apiGet = async (path: string) => {
    return fetch(`${API_BASE}/${path}`)
        .then((response) => {
            if (!response.ok) {
                const err = new Error("HTTP status code: " + response.statusText)
                throw err
            } else {
                return response.json()
            }
        })
        .then((data) => {
            return data
        })
}

export const apiPost = async (path: string, payload: object) => {
    return fetch(`${API_BASE}/${path}`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "COntent-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => {
            if (!response.ok) {
                const err = new Error("HTTP status code: " + response.statusText)
                throw err
            } else {
                return response.json()
            }
        })
        .then((data) => {
            return data
        })
}
