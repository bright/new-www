import { ComponentType, useMemo } from 'react'
import { StyleSheetManager } from 'styled-components'

// https://github.com/netlify/netlify-cms/issues/793#issuecomment-550013757
export function withStyledInjectedIntoPreviewFrame<P extends object>(Component: ComponentType<P>) {
  return (props: P) => {
    const iframeHeadElem = useMemo(() => {
      let iframe: HTMLIFrameElement | null = document.querySelector('#preview-pane')
      return iframe?.contentDocument?.head
    }, [document])

    return <StyleSheetManager target={iframeHeadElem}>
      <Component {...props} />
    </StyleSheetManager>
  }
}
