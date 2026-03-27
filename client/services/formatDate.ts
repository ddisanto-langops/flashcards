export function formatDate(isoString: Date| null, timezone = 'America/Toronto') {
    if (!isoString) return null
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: timezone
    }).format(new Date(isoString.toLocaleString()))
}