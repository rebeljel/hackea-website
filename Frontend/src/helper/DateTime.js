export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

export const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric" }
    return new Date(dateString).toLocaleTimeString(undefined, options)
}

export const formatDateTime = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
    return new Date(dateString).toLocaleString(undefined, options)
}