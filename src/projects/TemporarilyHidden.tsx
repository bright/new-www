import React from 'react'

import {Page} from '../layout/Page'
import { routeLinks } from '../config/routing'
import { Link } from 'gatsby'
import StatusPanel from '../components/shared'

const TemporarilyHidden = () => (
  <Page>
    <StatusPanel title={<>
      Work in <span>progress</span>
    </>}>
      We're currently fine-tuning this page for a better experience.
      In the meantime check our other <Link to={routeLinks.projects}>case studies</Link>.
    </StatusPanel>
  </Page>
)

export default TemporarilyHidden
