import React from "react"
import { Link } from "gatsby"

import { Page } from "../../layout/Page"
import { routeLinks } from "../../config/routing"
import { Tabs } from "../../components/about-us/about-us.styled"
import { Section } from '../../components/shared'
import { HelmetTitleDescription } from '../../meta/HelmetTitleDescription'

const tabs = [
  { label: "our story", path: "story" },
  { label: "core values", path: "values" },
  { label: "team", path: "team" },
] as const

const AboutUsPage: React.FC = ({ children }) => (
  <Page>
    <HelmetTitleDescription
      title="About us - our values, team and approach"
      description="All you need to know about our software development team."
    />
    <Section>
      <div data-tabs-content=".tab-content" className="container">
        <Tabs>
          {tabs.map(tab => (
            <Link
              activeClassName="is-active"
              to={routeLinks.aboutUs({page: tab.path})}
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
