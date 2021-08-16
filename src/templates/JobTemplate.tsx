import React from 'react'
import {graphql} from 'gatsby'

import {Page} from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import { routeLinks } from "../config/routing"
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import { ConstrainedWidthContainer } from '../ConstrainedWidthContainer'
import styled from 'styled-components'

const SalaryHeading = styled.h5`
  &:last-child {
    margin-bottom: 0;  
  } 
`

const Salary: React.FC<{salary: string}> = ({salary}) => {
  const salaryParts = salary.split(/or|\|/i).map(sal => sal.trim())
  if(salaryParts.length > 1){
    return salaryParts.map((sal, ix) => {
      return <SalaryHeading className="has-text-weight-normal" key={ix}>{sal}</SalaryHeading>
    })
  }

  return <SalaryHeading className="has-text-weight-normal">{salaryParts[0]!}</SalaryHeading>
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter: page, html } = markdownRemark
  return (
    <Page>
      <HelmetTitleDescription
        title={page.title}
        description={page.description}
      />
      <ConstrainedWidthContainer className="container">
        <article className="section">
          <h1 className="title has-text-dark has-text-weight-bold">
            {page.title}
          </h1>
          <div className="content columns">
            <div className="column">
              {page.hours && <h4 className="has-text-grey">{page.hours}</h4>}
              <SalaryHeading className="has-text-primary">
                Salary
              </SalaryHeading>
            </div>
            <div className="column is-full">
              <Salary salary={page.salary} />
            </div>
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="content">
            <a href="/apply-for-job" className="button is-primary">
              Apply
            </a>
          </div>
          <BackButton label="Open positions" url={`${routeLinks.career}#open-positions`} />
        </article>
      </ConstrainedWidthContainer>

      {/* <script type="application/ld+json">
    {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": "{{ page.title }}",
        "datePosted": "{{ site.time }}",
        "validThrough": "2021-12-31",
        "description": "{{ page.content | strip_html | smartify }}",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Bright Inventions",
            "sameAs": "https://brightinventions.pl/"
        },
        "industry": "Software",
        "employmentType": "{{ page.employment_type | default: 'OTHER' }}",
    {% if page.salary_min %}
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "PLN",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": {{ page.salary_min }},
            "maxValue": {{ page.salary_max }},
            "unitText": "MONTH"
          }
        },
    {% endif %}
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Matejki 12",
                "addressLocality": "Gdańsk",
                "postalCode": "80-232",
                "addressCountry": "PL",
"addressRegion": "pomorskie"
            }
        }
    }
</script>
  */}
    </Page>
  )
}
export const pageQuery = graphql`
  query($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      frontmatter {
        slug
        title
        salary
        description
      }
    }
  }
`
