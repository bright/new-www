import React from 'react'
import { useScript } from './../utils/use-script'

export default function Hotjar() {
  const status: string = useScript('https://static.hotjar.com/c/hotjar-2864857.js?sv=6')
  return <>{status === 'ready'}</>
}
