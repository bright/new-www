export function applyFixForSortingCaret() {
  const styleElement = document.createElement('style')
  styleElement.innerHTML = `div[role=menuitem] span { max-width: 100px; }`
  document.querySelector('head')!.appendChild(styleElement)
}
