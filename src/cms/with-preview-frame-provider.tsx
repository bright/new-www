import { ComponentType } from 'react'
import { FrameContext } from 'react-frame-component'

export function withPreviewFrameProvider<P extends object & { window: Window, document: Document }>(Component: ComponentType<P>) {
  return (props: P) => {
    const { window, document } = props
    return <FrameContext.Provider value={{ document, window }}>
      <Component {...props} />
    </FrameContext.Provider>
  }
}
