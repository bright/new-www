import React from "react"
import { Link } from "gatsby"

import { Page } from "../../layout/Page"
import HelmetWrapper from "../../components/subcomponents/HelmetWrapper"
import { routeLinks } from "../../config/routing"
import { Tabs } from "../../components/about-us/about-us.styled"
import { Section } from '../../components/shared'

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
    <Section>
      <div data-tabs-content=".tab-content" className="container">
        <Tabs>
          {tabs.map(tab => (
            <Link
              activeClassName="is-active"
              to={`${routeLinks.aboutUs}/${tab.path}`}
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
    </Section>
  </Page>
)

export default AboutUsPage
