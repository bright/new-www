import React, { ReactElement, RefObject, useCallback, useMemo, useState } from 'react'
import { Wrapper } from './timeline.styled'
interface timeline extends React.FC {
  Logo?: React.FC<any> | void | any
  Image?: React.FC<any> | void | any
  Element?: React.FC<any> | void | any
  Heading?: React.FC<any> | void | any
  Subheading?: React.FC<any> | void | any
  Content?: React.FC<any> | void | any
}
export const Timeline: timeline = function Timeline({ children }) {
  const [height, setHeight] = useState(0)
  const getRef = useCallback((ref: RefObject<any>) => {
    const rect = ref.current?.getBoundingClientRect()
    setHeight(rect?.height || 0)
  }, [])
  const elements = useMemo(
    () =>
      React.Children.map(children, (child: any, index) => {
        if (index === 0) {
          return React.cloneElement(child, { ...child.props, getRef })
        }
        // @ts-ignore
        const lastIndex = children?.length - 1
        if (index === lastIndex) {
          return React.cloneElement(child, { ...child.props, last: true })
        }

        return child
      }),
    [children]
  )
  return <Wrapper height={height / 2}>{elements}</Wrapper>
}
