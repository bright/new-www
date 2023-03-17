import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { CustomSection, CustomSectionTitle, CustomTextTitle, FlexWrapper, TextRegular } from '../shared'
import { ContactEbook } from './ebook/ContactEbook'
import { useWindowSize } from '../utils/use-windowsize'
import { useEbookForm } from '../utils/ebook-form/use-ebook-form'
import { HomeEbookThankYouPage } from './ebook/HomeEbookThankYouPage'

const Ebook = () => {
  const { value, setPolicy, handleSubmit, setEmail, setName } = useEbookForm('ebook-eda-visuals.pdf')
  const { width } = useWindowSize()
  const breakpoint = 992
  return (
    <CustomSection
      paddingProps='128px 240px 0 '
      paddingLaptop='96px 96px 0'
      paddingTablet='192px 36px 0'
      paddingMobileProps='48px 18px 0'
    >
      <CustomSectionTitle margin='0 0 48px' laptopMargin='0 0 96px' tabletMargin='0 0 48px' mobileMargin='0 0 48px'>
        bright ebook
      </CustomSectionTitle>
      <FlexWrapper desktopGap='64px' desktopItems='center' tabletXLGap='32px' tabletDirection='column' tabletGap='64px'>
        <div>
          {width > breakpoint && (
          <StaticImage
            alt={'Bright Inventions '}
            src='../../../static/images/ebook_cover.png'
            backgroundColor='#ffffff'
            placeholder='none'
          />
        )}
        </div>
        <div>
          {width <= breakpoint && (
          <StaticImage
            alt={'Bright Inventions '}
            src='../../../static/images/ebook_cover_tablet.png'
            backgroundColor='#ffffff'
            placeholder='none'
          />
        )}
        </div>

        {!value.ebookResponse.ebook.url ? (
          <FlexWrapper desktopDirection='column' desktopBasis='63%' laptopBasis='57%' tabletXLBasis='46%'>
            <CustomTextTitle
              margin='0 0 48px'
              tabletXLMargin='0 0 16px'
              tabletMargin='0 0 48px'
              style={{ textAlign: 'left' }}
            >
              18 tools and tacticts for app security
            </CustomTextTitle>
            <TextRegular>
              Best practices and tools to ensure your web and mobile app is secure. All listed tools are open-source or
              offer free plans. Must have ebook for devs and app owners written by Rafał Hofman, a software developer
              and security expert at bright inventions. Get it for free!
            </TextRegular>

            <ContactEbook
              setEmail={setEmail}
              setName={setName}
              setPolicy={setPolicy}
              handleSubmit={handleSubmit}
              value={value}
            />
          </FlexWrapper>
        ) : (
            <HomeEbookThankYouPage url={value.ebookResponse.ebook.url} />
        )}
      </FlexWrapper>
    </CustomSection>
  )
}

export default Ebook
