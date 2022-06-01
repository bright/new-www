import React from 'react'
import { useScriptHotjar } from '../utils/use-script-hotjar'

export default function Hotjar() {
  const status: string = useScriptHotjar('https://static.hotjar.com/c/hotjar-2864857.js?sv=6')
  return <>{status === 'ready'}</>
}
