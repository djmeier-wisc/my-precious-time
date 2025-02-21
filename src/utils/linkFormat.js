export function formatLink(url) {
    return url.trim().replaceAll(' ', "_").replaceAll("(", "-2-").replaceAll(")", "-3-")
}

export function deformatLink(url) {
    return url.trim().replaceAll("_", " ").replaceAll("-2-", "(").replaceAll("-3-", ")")
}