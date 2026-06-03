export function getInitials(name) {
    if (!name) return "";

    return name
        .trim()
        .split(/\s+/)             // split by one or more spaces
        .map(word => word[0].toUpperCase()) // take first letter of each word
        .join('');                // join them together
}