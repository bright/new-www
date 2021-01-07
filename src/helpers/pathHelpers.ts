export const getUrlForAbsolutePath = (path: string) => {
  return path.split("pages").pop().replace(".md", "")
}

export const getJobPath = (path: string) => {
  return path.split('jobs').pop().replace('.md', '')
}

export const getFileNameOnly = (path: string) => {
  return path.split("/").pop().replace(".md", "")
}

export const deleteTimestampFromUrl = (path: string) => {
  return path.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})-/, "")
}
