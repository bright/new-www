import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { BlackButton } from '../components/about-us/about-us.styled'
import { Page } from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import { routeLinks } from '../config/routing'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import RecruitingProcess from '../pages/career/_RecruitingProcess'
import styled from 'styled-components'
import { CustomPageTitle, CustomConstrainedWidthContainer, SectionInner } from '../components/shared/index'
import { FormComponent } from '../components/about-us/form-section/form'
import variables from '../styles/variables'

const SalaryHeading = styled.h5`
  margin: 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
  text-align: center;
  @media ${variables.device.mobile} {
    margin: 1rem 0;
  }
`
const SalaryWrapper = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    font-family: 'Lato', sans-serif;
    font-size: 1.5rem;
    line-height: 1.75rem;
    opacity: 0.75;
    color: #000;
    flex-basis: 50%;
    &:last-of-type {
      padding-left: 1rem;
    }
    &:first-of-type {
      position: relative;
      text-align: end;

      &:after {
        font-size: inherit;
        content: '|';
        margin-left: 1rem;
      }
    }
  }
  @media ${variables.device.mobile} {
    display: block;
    margin: 0 auto;
    & > div {
      font-size: 1.125rem;
      text-align: center;
      &:first-of-type {
        text-align: center;
        &:after {
          content: '';
        }
      }
      &:last-of-type {
        padding-left: 0;
      }
    }
  }
`
const HoursWraper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-family: 'Lato', sans-serif;
  font-size: 1.375rem;
  line-height: 1.75rem;
  padding-top: 0.75rem;
  padding-bottom: 4.3rem;

  > h4 {
    position: relative;
    flex-basis: 50%;
    color: #000;
    opacity: 0.75;
    text-align: end;
    font-family: inherit;
    line-height: inherit;
    font-weight: 700;
    margin-right: 1rem;
    &:after {
      position: absolute;
      top: 50%;
      right: -1.3rem;
      transform: translateY(-55%);
      font-size: 1rem;
      content: '•';
    }
  }
  > span {
    margin-left: 1rem;
    flex-basis: 50%;
  }
  @media ${variables.device.mobile} {
    font-size: 1.125rem;
  }
`
const RecruitingProcessWrappers = styled.div`
  padding: 0 5rem;
  @media ${variables.device.mobile} {
    padding: 0 2.8rem;
  }
`
const JobBlackButton = styled(BlackButton)`
  display: block;
  margin: 0 auto;
  @media ${variables.device.mobile} {
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0.8125rem 0;
  }
`
const JobBackButton = styled(BackButton)`
  display: block;
  margin: auto;
  display: flex;
  align-items: center;
  font-weight: 900;
  color: #000;

  & > span {
    margin-left: 1.125rem;
    font-size: 1.125rem;
    line-height: 1.375rem;
  }
`
const JobSectionInner = styled(SectionInner)`
  & > .content {
    h2 {
      margin-bottom: 4rem;
      margin-top: 6.5rem;
      font-size: 2rem;
      line-height: 2.5rem;
      color: #000;
      text-align: center;
    }
    p {
      font-size: 1.375rem;
      line-height: 2.5rem;
    }
    ul > li {
      position: relative;
      margin-bottom: 3rem;
      list-style: none;
      font-size: 1.375rem;
      line-height: 2rem;
      color: #000;
      opacity: 0.75;
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: -47.5px;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background-image: url('/images/ok.svg');
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    @media ${variables.device.mobile} {
      p {
        font-size: 1rem;
        line-height: 1.75rem;
      }
      h2 {
        margin-bottom: 2.25rem;
        margin-top: 4rem;
        font-size: 1.375rem;
        line-height: 1.7rem;
      }
      ul > li {
        margin-bottom: 2.875rem;
        font-size: 1rem;
        line-height: 1.75rem;
        &:before {
          left: calc(-47.5px + 18px);
        }
      }
    }
  }
`
const TechnologyWrapper = styled.div`
  padding-bottom: 4rem;
  & > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.625rem;

    & > li {
      margin-bottom: 0.5625rem;
      font-size: 1.375rem;
      font-weight: 600;
      line-height: 1.687;
      color: #131214;
      padding: 1rem 1.125rem;
      border: 1px solid rgba(211, 211, 211, 0.47);
      @media ${variables.device.mobile} {
        font-size: 1.125rem;
        line-height: 1.375rem;
      }
    }
  }
`
const JobFormComponent = styled(FormComponent)`
  overflow-x: hidden;
  @media ${variables.device.mobile} {
    & > h2 {
      text-align: center;
      margin-top: 0;
      margin-bottom: 1.875rem;
    }
    & button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      text-align: center;
      font-weight: 700;
    }
  }
`
const ImageWrapper = styled.div`
  @media ${variables.device.mobile} {
    width: auto;
    overflow-x: scroll;
    & > .about-img {
      width: 1000px;
    }
  }
`
const ButtonWrapper = styled.div`
  display: block;
  margin: 0 auto;
  @media ${variables.device.mobile} {
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0.8125rem 0;
  }
`

const Salary: React.FC<{ salary: string }> = ({ salary }) => {
  const salaryParts = salary.split(/or|\|/i).map(sal => sal.trim())
  if (salaryParts.length > 1) {
    return salaryParts.map((sal, ix) => {
      const salaryType = sal.match(/(UoP)|(B2B)/)
      if (salaryType !== null) {
        const salaryValue = salaryType.index && sal.slice(0, salaryType.index - 1)
        return (
          <div>
            {salaryValue} (<span className='has-text-weight-bold'>{salaryType[0]}</span>)
          </div>
        )
      } else {
        return <div>{sal}</div>
      }
    })
  }

  return <SalaryHeading className='has-text-weight-normal'>{salaryParts[0]!}</SalaryHeading>
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: any) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter: page, html } = markdownRemark

  const technologies = page.technology

  const listTechnologies = technologies?.map(technology => <li key={technology}>{technology}</li>)

  const image = getImage(page.imagejob)!
  return (
    <Page>
      <HelmetTitleDescription title={page.title} description={page.description} />
      <CustomConstrainedWidthContainer>
        <CustomPageTitle>{page.title}</CustomPageTitle>
        <SalaryHeading className='has-text-primary'>{page.subtitle}</SalaryHeading>
        <SalaryWrapper>
          <Salary salary={page.salary} />
        </SalaryWrapper>
        <HoursWraper>
          {page.working_time && <h4>{page.working_time}</h4>}
          <span>Gdańsk</span>
        </HoursWraper>
        <TechnologyWrapper>
          <ul>{listTechnologies ? listTechnologies : <li></li>}</ul>
        </TechnologyWrapper>
        <ButtonWrapper>
          <a href='#jobform'>
            <JobBlackButton>{page.button}</JobBlackButton>
          </a>
        </ButtonWrapper>
        <ImageWrapper>
          <GatsbyImage image={image} alt={page.image_alt_job} className='about-img' quality='100' />
        </ImageWrapper>
        <JobSectionInner>
          <div className='content' dangerouslySetInnerHTML={{ __html: html }} />
        </JobSectionInner>
        <RecruitingProcessWrappers>
          <RecruitingProcess />
        </RecruitingProcessWrappers>
        <SectionInner id='jobform'>
          <JobFormComponent
            style={{ marginTop: '0', marginBottom: '5rem' }}
            title={'submit your application'}
            description={
              <>
                You can either use our form below or send your application directly via email{' '}
                <a href={'mailto:ula@bright.dev'}>ula@bright.dev</a>. Feel free to ask any questions on the position and
                the project.
              </>
            }
            namePlaceholder={'Enter name here'}
            mailPlaceholder={'name@mail.com'}
            textPlaceholder={'Let us know what would you like to do @ bright inventions'}
            uploadLabel={'Upload '}
          />
        </SectionInner>
        <JobBackButton label='back to career' url={`${routeLinks.career}`} arrowColor='orange' />
      </CustomConstrainedWidthContainer>

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
        subtitle
        working_time
        technology
        button
        image_alt_job
        imagejob {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
