export const getUrlForAbsolutePath = (path: string) => {
  return path.split("pages").pop().replace(".md", "")
}

export const getFileNameOnly = (path: string) => {
  return path.split("/").pop().replace(".md", "")
}
