export function loadScript(url: string, document: Document) {
  const existingScriptElements = Array.from(document.querySelectorAll<HTMLScriptElement>('head>script'))
  const scriptAlreadyLoaded = !!existingScriptElements.find(el => el.src == 'url')
  if (scriptAlreadyLoaded) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement('script')
    scriptElement.src = url
    scriptElement.addEventListener('load', resolve)
    scriptElement.addEventListener('error', reject)
    document.head.appendChild(scriptElement)
  })
}
