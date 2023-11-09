import React, { useEffect, useState } from 'react'
import Newsletter from './Newsletter'
import { InView } from 'react-intersection-observer'

export default function NewsletterWrapper() {
  return <InView><Newsletter /></InView>
}
