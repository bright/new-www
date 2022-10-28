export function applyFixForJumpingCursorIssue() {
  const fixForJumpingCursor = document.createElement('style')
  /* https://github.com/netlify/netlify-cms/issues/5092#issuecomment-1246525269 */
  fixForJumpingCursor.innerHTML = `[data-slate-editor] { -webkit-user-modify: read-write !important; }`
  document.querySelector('head')!.appendChild(fixForJumpingCursor)
}
