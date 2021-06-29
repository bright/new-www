import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { CloudFrontLogEntry } from './cloud-front-log-entry'

const NotFoundEntriesEmailContent = function ({ notFoundEntries }: { notFoundEntries: CloudFrontLogEntry[] }) {
  return (
    <div>
      <h2>Not found urls reported in brightinventions.pl</h2>
      <p>Someone tried to access URLs from the list below in the last 24 hours</p>
      <table>
        <thead>
          <th>Path</th>
          <th>Details</th>
        </thead>
        <tbody>
          {notFoundEntries.map((entry, ix) => {
            const fullUrl = `${entry['cs-protocol']}://${entry['x-host-header']}${entry['cs-uri-stem']}`
            return (
              <tr key={ix}>
                <td>
                  <a href={fullUrl}>{entry['cs-uri-stem']}</a>
                </td>
                <td>
                  <pre>{JSON.stringify(entry, null, 2)}</pre>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export const renderNotFoundEntries = ({ notFoundEntries }: { notFoundEntries: CloudFrontLogEntry[] }) => {
  return ReactDOMServer.renderToString(<NotFoundEntriesEmailContent notFoundEntries={notFoundEntries} />)
}
