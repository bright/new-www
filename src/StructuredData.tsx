import { Thing, WithContext } from 'schema-dts'
import React from 'react'

export const StructuredData: <T extends Thing>(props: WithContext<T>) => ReturnType<React.FC> = (props) => {
  return <script type='application/ld+json'
                 dangerouslySetInnerHTML={{ __html: JSON.stringify(props) }} />
}
