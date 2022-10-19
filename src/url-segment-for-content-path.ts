export function urlSegmentForContentPath(contentFilePath: string) {
  return contentFilePath
    .split('/')
    .pop()!
    .replace('.md', '')
    .replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})-/, '')
}
