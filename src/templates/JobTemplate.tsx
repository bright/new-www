import React, { MutableRefObject } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ReactMarkdown from 'react-markdown'
import { BlackButton } from '../components/about-us/about-us.styled'
import { Page } from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import { routeLinks } from '../config/routing'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import RecruitingProcess from '../pages/career/_RecruitingProcess'
import styled from 'styled-components'
import {
  CustomPageTitle,
  SectionInner,
  CustomSectionInner,
  TextRegular,
  FlexWrapper,
  CustomSectionTitle,
  Button,
} from '../components/shared/index'
import { FormComponent } from '../components/about-us/form-section/form'
import variables from '../styles/variables'
import { CustomSection } from './../components/shared/index'
import { LinkedIn } from './../components/icons/LinkedIn.icon'
import useOnScreen from '../components/utils/use-onscreen'
import { clampBuilder } from './../helpers/clampBuilder'
import { JobImage } from './job/JobImage'
import { useWindowSize } from './../components/utils/use-windowsize'

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
    color: ${variables.color.text2};
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
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-size: 1.375rem;
  line-height: 1.75rem;
  padding-top: 0.75rem;
  padding-bottom: 4.3rem;

  > h4 {
    position: relative;
    color: ${variables.color.heading};
    font-family: inherit;
    line-height: inherit;
    font-weight: 700;
  }
  > div {
    margin-top: 0.5em;
  }

  @media ${variables.device.mobile} {
    font-size: 1.125rem;
  }
`
const RecruitingProcessWrappers = styled.div`
  padding: 0 5rem;
  @media ${variables.device.laptop} {
    padding: 0;
  }
  @media ${variables.device.mobile} {
    padding: 0 0.5rem;
  }
`
const JobBlackButton = styled(Button)`
  border: 1px solid black;
  background: #000000;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0;
  color: #ffffff;
  opacity: 1;
  padding: 1rem 4rem;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
  width: fit-content;
  display: block;
  margin: 0 auto;
  &:hover {
    background: ${variables.color.primary};
    border: 1px solid ${variables.color.primary};
  }

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
  && .content {
    h2 {
      margin-bottom: ${variables.pxToRem(64)};
      margin-top: ${variables.pxToRem(105)};
      font-size: 2rem;
      line-height: 2.5rem;
      color: ${variables.color.heading};
      font-weight: 900;
      text-align: center;
    }
    p {
      font-size: ${variables.pxToRem(20)};
      line-height: 2.5rem;
      color: ${variables.color.text2};
    }
    ul > li {
      position: relative;
      margin-bottom: ${variables.pxToRem(37)};
      margin-top: 0;
      list-style: none;
      font-size: ${variables.pxToRem(20)};
      line-height: 2rem;
      color: ${variables.color.text2};
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
    @media ${variables.device.laptop} {
      h2 {
        margin-top: ${variables.pxToRem(82)};
      }
    }
    @media ${variables.device.tablet} {
      h2 {
        margin-top: ${variables.pxToRem(64)};
      }
    }
    @media ${variables.device.mobile} {
      p {
        font-size: 1rem;
        line-height: 1.75rem;
      }
      h2 {
        margin-bottom: ${variables.pxToRem(36)};
        margin-top: ${variables.pxToRem(64)};
        font-size: 1.375rem;
        line-height: 1.7rem;
      }
      ul {
        &:last-of-type {
          margin-bottom: ${variables.pxToRem(64)};
        }
      }
      ul > li {
        margin-bottom: ${variables.pxToRem(30)};
        font-size: 1rem;
        line-height: 1.75rem;
        &:before {
          left: calc(-47.5px + 18px);
          background-image: url('/images/okmobile.svg');
          width: 13px;
          height: 13px;
        }
        &:last-of-type {
          margin-bottom: ${variables.pxToRem(0)};
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
      color: ${variables.color.text2};
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

const ButtonWrapper = styled.div`
  display: block;
  margin: 0 auto;
  text-align: center;

  @media ${variables.device.tablet} {
    opacity: 1;
  }

  @media ${variables.device.mobile} {
    width: 100%;
    margin: 0;
    padding: 0;
    position: fixed;
    z-index: 5;
    left: 0;
    right: 0;
    width: 100%;
    bottom: 0;
  }
`

const WrapperJobBackButton = styled.div`
  display: flex;
  margin: 0 auto;
  padding-bottom: ${variables.pxToRem(186)};
  & span {
    font-size: ${variables.pxToRem(18)};
  }
  @media ${variables.device.laptop} {
    padding-bottom: ${variables.pxToRem(117)};
    & span {
      font-size: ${variables.pxToRem(16)};
    }
  }
  @media ${variables.device.tabletXL} {
    padding-bottom: ${variables.pxToRem(116)};
  }
  @media ${variables.device.mobile} {
    padding-bottom: ${variables.pxToRem(80)};
    & span {
      font-size: ${variables.pxToRem(18)};
    }
  }
`
const WrapperRecruiterImage = styled.div`
  position: absolute;
  bottom: 0;
  left: ${clampBuilder(993, 1920, 94, 482)};

  @media ${variables.device.laptop} {
    & .recruiter-img {
      max-height: 420px;
      & img {
        height: 420px;
        width: auto;
      }
    }
  }

  @media ${variables.device.tablet} {
    left: ${variables.pxToRem(52)};
  }
  @media ${variables.device.mobile} {
    position: relative;
    bottom: ${variables.pxToRem(-176)};
    left: 0;

    & .recruiter-img {
      max-height: ${variables.pxToRem(319)};
      & img {
        max-height: ${variables.pxToRem(319)};
      }
    }
  }
`
const WrapperLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${variables.pxToRem(40)};
  padding-top: ${variables.pxToRem(64)};
  & p a {
    font-size: ${variables.pxToRem(26)};
    line-height: ${variables.pxToRem(40)};
    font-weight: 700;
  }
  @media ${variables.device.laptop} {
    padding-top: ${variables.pxToRem(83)};
    & p a {
      font-size: ${variables.pxToRem(22)};
    }
  }
  @media ${variables.device.tablet} {
    padding-top: ${variables.pxToRem(64)};
  }
  @media ${variables.device.tablet} {
    padding-top: ${variables.pxToRem(32)};
    & p a {
      font-size: ${variables.pxToRem(18)};
    }
  }
`
const WrapperRecruiterDescription = styled(FlexWrapper)`
  margin-left: ${clampBuilder(992, 1920, 551, 883)};
  padding: ${variables.pxToRem(72)} 0;
  @media ${variables.device.laptop} {
    padding: ${variables.pxToRem(33)} 0;
  }
  @media ${variables.device.laptop} {
    margin-right: ${variables.pxToRem(100)};
  }
  @media ${variables.device.tablet} {
    padding: ${variables.pxToRem(32)} 0;
    margin-left: ${clampBuilder(541, 992, 367, 367)};
    margin-right: ${variables.pxToRem(50)};
  }
  @media ${variables.device.mobile} {
    margin-left: ${variables.pxToRem(18)};
    margin-right: ${variables.pxToRem(18)};
    padding: ${variables.pxToRem(183)} 0 ${variables.pxToRem(64)};
  }
`
const TitleRecruiter = styled.p`
  text-align: left;
  font-size: ${variables.pxToRem(22)};
  line-height: ${variables.pxToRem(40)};
  font-weight: 400;
  font-family: ${variables.font.customtitle.lato};
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(20)};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(16)};
    text-align: center;
  }
`
const NameRecruiter = styled.p`
  text-align: left;
  font-size: ${variables.pxToRem(28)};
  line-height: ${variables.pxToRem(34)};
  font-weight: 800;
  @media ${variables.device.mobile} {
    text-align: center;
  }
`
const WarkplaceRecruiter = styled.p`
  text-align: left;
  font-size: ${variables.pxToRem(17)};
  line-height: ${variables.pxToRem(20)};
  font-weight: 400;
  @media ${variables.device.mobile} {
    text-align: center;
  }
`
const LinkLinkedin = styled.a`
  background-color: ${variables.color.black};
  display: flex;
  align-items: center;
  gap: ${variables.pxToRem(16)};
  justify-content: center;
  padding: ${variables.pxToRem(11)} 0;
  max-width: ${variables.pxToRem(230)};
  & span {
    color: #f9f9f9;
    font-size: ${variables.pxToRem(18)};
    font-weight: 700;
  }
  @media ${variables.device.laptop} {
    max-width: ${variables.pxToRem(194)};
    & span {
      font-size: ${variables.pxToRem(16)};
    }
  }
  @media ${variables.device.mobile} {
    max-width: 100%;
    & span {
      font-size: ${variables.pxToRem(18)};
    }
  }
`
const RecruiterSection = styled(CustomSection)`
  @media ${variables.device.mobile} {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    max-height: ${variables.pxToRem(472)};
  }
`
const TabletButtonWrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  position: fixed;
  z-index: 5;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 0;
  background-color: ${variables.color.black};
`
const ScrollSection = styled.section``
const Salary: React.FC<{ salary: string }> = ({ salary }) => {
  const salaryParts = salary.split(/or|\|/i).map(sal => sal.trim())
  if (salaryParts.length > 1) {
    return salaryParts.map((sal, ix) => {
      const salaryType = sal.match(/(UoP)|(B2B)/)
      if (salaryType !== null) {
        const salaryValue = salaryType.index && sal.slice(0, salaryType.index - 1)
        return (
          <div>
            {salaryValue} (<span>{salaryType[0]}</span>)
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
  const recruiterImage = getImage(page.image_recruiter_info)!
  const { width } = useWindowSize()
  const breakpoint = 580
  const breakpoint2 = 991

  const ref: any = React.useRef<HTMLDivElement>(null)
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '0px')

  return (
    <Page>
      <HelmetTitleDescription title={page.title} description={page.description} />

      <CustomSection
        paddingMobileProps='64px 18px 0'
        paddingTablet='83px 36px 0'
        paddingTabletXL='59px 144px 0'
        paddingLaptop='55px 96px 0'
        paddingProps='67px 240px 0'
      >
        <CustomPageTitle>{page.title}</CustomPageTitle>
        <SalaryHeading className='has-text-primary'>{page.subtitle}</SalaryHeading>
        <SalaryWrapper>
          <Salary salary={page.salary} />
        </SalaryWrapper>
        <HoursWraper>
          {page.working_time && <h4>{page.working_time}</h4>}
          <div>Gdańsk or remote</div>
        </HoursWraper>
        <TechnologyWrapper>
          <ul>{listTechnologies ? listTechnologies : <li></li>}</ul>
        </TechnologyWrapper>
      </CustomSection>
      <ScrollSection ref={ref}>
        {width <= breakpoint2 &&
          typeof window !== 'undefined' &&
          onScreen &&
          (width >= breakpoint && width < breakpoint2 && typeof window !== 'undefined' && onScreen ? (
            <TabletButtonWrapper>
              <ButtonWrapper>
                <Link to='#jobform'>
                  <JobBlackButton>{page.button}</JobBlackButton>
                </Link>
              </ButtonWrapper>
            </TabletButtonWrapper>
          ) : (
            <ButtonWrapper>
              <Link to='#jobform'>
                <JobBlackButton>{page.button}</JobBlackButton>
              </Link>
            </ButtonWrapper>
          ))}

        {width > breakpoint2 && typeof window !== 'undefined' && (
          <ButtonWrapper>
            <Link to='#jobform'>
              <JobBlackButton>{page.button}</JobBlackButton>
            </Link>
          </ButtonWrapper>
        )}

        <JobImage image={image} alt={page.image_alt_job} className='about-img' />

        <CustomSection>
          <CustomSectionInner tabletXLMaxWidth='754px' laptopMaxWidth='754px' maxWidth='754px'>
            <JobSectionInner>
              <div className='content' dangerouslySetInnerHTML={{ __html: html }} />
            </JobSectionInner>
          </CustomSectionInner>
        </CustomSection>

        <RecruitingProcessWrappers>
          <RecruitingProcess
            recruting_image2_title={page.recruting_image2_title}
            recruting_image3_title={page.recruting_image3_title}
          />
        </RecruitingProcessWrappers>
      </ScrollSection>
      <CustomSection
        paddingProps='0 0 260px'
        paddingLaptop='0 0 233px'
        paddingTabletXL='0 144px 164px'
        paddingTablet='0 36px 205px '
        paddingMobileProps='0 18px 192px'
      >
        <CustomSectionInner maxWidth='866px' laptopMaxWidth='736px'>
          {page.show_new_title_more_about_us ? (
            <CustomSectionTitle margin='0' laptopMargin='0' tabletXLMargin='0' tabletMargin='0' mobileMargin='0'>
              {page.title_more_about_us}{' '}
            </CustomSectionTitle>
          ) : (
            <CustomSectionTitle margin='0' laptopMargin='0' tabletXLMargin='0' tabletMargin='0' mobileMargin='0'>
              if you want to know a bit more about us, take a look below 🙋🏻‍♀️🙋🏻‍♂️
            </CustomSectionTitle>
          )}

          <TextRegular>
            <WrapperLinks>
              <ReactMarkdown children={page.links_more_about_us} />
            </WrapperLinks>
          </TextRegular>
        </CustomSectionInner>
      </CustomSection>

      {page.show_recruiter_info && (
        <>
          <RecruiterSection
            paddingLaptop='0'
            paddingProps='0'
            paddingTabletXL='0 '
            paddingTablet='0'
            paddingMobileProps='0'
            style={{ backgroundColor: '#F7931E', position: 'relative' }}
          >
            <WrapperRecruiterDescription
              desktopDirection='column'
              desktopGap='44px'
              laptopGap='21px'
              tabletXLGap='42px'
              mobileGap='24px'
            >
              <TitleRecruiter>{page.title_recruiter_info}</TitleRecruiter>
              <FlexWrapper desktopGap='11px' desktopDirection='column'>
                <NameRecruiter>{page.name_recruiter}</NameRecruiter>
                <WarkplaceRecruiter>{page.workplace_recruiter}</WarkplaceRecruiter>
              </FlexWrapper>

              <LinkLinkedin target='_blank' href={`${page.button_linkedin}`}>
                <LinkedIn />
                <span>contact</span>
              </LinkLinkedin>
            </WrapperRecruiterDescription>

            <WrapperRecruiterImage>
              <GatsbyImage image={recruiterImage} alt={page.image_alt_recruiter_info} className='recruiter-img' />
            </WrapperRecruiterImage>
          </RecruiterSection>
        </>
      )}

      <CustomSection id='jobform'>
        <CustomSectionInner tabletXLMaxWidth='754px' laptopMaxWidth='754px' maxWidth='754px'>
          <JobFormComponent
            style={{ marginTop: '0', marginBottom: '5rem' }}
            title={'submit your application'}
            description={
              <>
                If you have no questions, simply apply using our form below or send your application directly via email{' '}
                <a href='mailto:jobs@bright.dev'>jobs@bright.dev</a>.
              </>
            }
            namePlaceholder={'Enter name here'}
            mailPlaceholder={'name@mail.com'}
            textPlaceholder={'Let us know what would you like to do @ bright inventions'}
            uploadLabel={'Upload '}
          />
        </CustomSectionInner>
      </CustomSection>
      <WrapperJobBackButton>
        <JobBackButton label='back to career' url={`${routeLinks.career}`} arrowColor='orange' />
      </WrapperJobBackButton>

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
        recruting_image2_title
        recruting_image3_title
        title_more_about_us
        show_new_title_more_about_us
        show_recruiter_info
        links_more_about_us
        title_recruiter_info
        name_recruiter
        workplace_recruiter
        image_alt_recruiter_info
        button_linkedin
        imagejob {
          childImageSharp {
            gatsbyImageData(quality: 100)
          }
        }
        image_recruiter_info {
          childImageSharp {
            gatsbyImageData(placeholder: DOMINANT_COLOR, layout: CONSTRAINED, height: 600)
          }
        }
      }
    }
  }
`
