import React from "react"

import { Page } from "../../layout/Page"
import HelmetWrapper from "../../components/subcomponents/HelmetWrapper"
import { Link } from "gatsby"
import { Tabs } from "../../components/about-us/about-us.styled"
const tabs = [
  { label: "our story", path: "story" },
  { label: "core values", path: "values" },
  { label: "team", path: "team" },
] as const

const AboutUsPage: React.FC = ({ children }) => (
  <Page>
    <HelmetWrapper
      title="About us - our values, team and approach"
      description="Information about our team, core values, business process"
    />
    <section>
      <div data-tabs-content=".tab-content" className="container">
        <Tabs>
          {tabs.map(tab => (
            <Link
              activeClassName="is-active"
              to={`/about-us/${tab.path}`}
              partiallyActive
              key={tab.label}
            >
              <li className="is-active">
                <span>{tab.label}</span>
              </li>
            </Link>
          ))}
        </Tabs>
      </div>
      {children}
    </section>
  </Page>
)

export default AboutUsPage
