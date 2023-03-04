import { createContext } from 'react'

export const PartytownContext = createContext({ enabled: process.env.PARTYTOWN_ENABLED == 'true' })
