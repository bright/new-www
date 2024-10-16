import React from 'react'
import { CustomSection, CustomSectionInner, CustomSectionTitle } from '../components/shared'
import FaqsDropdown from '../components/shared/FaqsDropdown'
import { routeLinks } from '../config/routing'


const CareerFaqs = ({ faqSlug, faqs }: { faqSlug: string, faqs: [] }) => {

  const myRef = React.useRef(null)

  return (

    faqs.length > 0 && <CustomSection paddingProps='0rem 15rem 2rem 15rem' paddingMobileProps='0 1.125rem 0'>

      <CustomSectionInner >
        <a href='#career-faqs' style={{
        display: 'block',
        }} id='career-faqs'>
          <CustomSectionTitle margin='11.625rem 0 6.5625rem ' mobileMargin='5.125rem 0 2.75rem '  >
          recruitment FAQs
        </CustomSectionTitle>
        </a>
        <FaqsDropdown faqs={faqs} faqSlug={faqSlug} slug={routeLinks.career()} generateLink={(args) => routeLinks.career({ faqSlug: args.faqSlug })} ref={myRef} offset={-150} shortList={true} />
      </CustomSectionInner>

    </CustomSection>
  )
}

export default CareerFaqs

