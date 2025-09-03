import React from 'react'
import Newsletter from './Newsletter'
import { InView } from 'react-intersection-observer'

export default function NewsletterWrapper() {
  return <InView>
    {({ inView, ref }) => <div ref={ref}>({inView && <Newsletter />})</div>}
  </InView>
}
