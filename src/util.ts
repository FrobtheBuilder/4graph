export function chanPagetoAPI(pageURI: string) {
    return pageURI.replace("http://boards.4chan.org", "http://localhost:5050") + ".json"
}
