import React from 'react'
import { CustomSection, CustomSectionTitle, CustomTextTitle, FlexWrapper, TextRegular } from '../shared'
import { ContactEbook } from './ebook/ContactEbook'

import { useEbookForm } from '../utils/ebook-form/use-ebook-form'
import { HomeEbookThankYouPage } from './ebook/HomeEbookThankYouPage'
import EbookCover from '../../assets/ebook-sign-in-cover.svg'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { ebookNames } from '../../ebook-names'

const EbbokSection = styled(CustomSection)`
  @media ${variables.device.mobile} {
    & svg {
      width: 100%;
      height: auto;
    }
  }
`

const Ebook = () => {
  const { value, setPolicy, handleSubmit, setEmail, setName } = useEbookForm(ebookNames[2])

  return (
    <EbbokSection
      paddingProps='128px 240px 0 '
      paddingLaptop='96px 96px 0'
      paddingTablet='192px 36px 0'
      paddingMobileProps='48px 18px 0'
    >
      <CustomSectionTitle margin='0 0 48px' laptopMargin='0 0 96px' tabletMargin='0 0 48px' mobileMargin='0 0 48px'>
        bright ebook
      </CustomSectionTitle>
      <FlexWrapper desktopGap='64px' desktopItems='center' tabletXLGap='32px' tabletDirection='column' tabletGap='64px'>
        <EbookCover />

        {!value.ebookResponse.ebook.url ? (
          <FlexWrapper desktopDirection='column' desktopBasis='63%' laptopBasis='57%' tabletXLBasis='46%'>
            <CustomTextTitle
              margin='0 0 48px'
              tabletXLMargin='0 0 16px'
              tabletMargin='0 0 48px'
              style={{ textAlign: 'left' }}
            >
              From MVP to a Final Product
            </CustomTextTitle>
            <TextRegular>
              Unsure about the next steps for your app idea? Want to save time and money while developing your product?<br/>
              Based on our 12 years of experience in MVP development we prepared an ultimate guide to MVP.<br/>
              Download it for free now!<br/>
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
    </EbbokSection>
  )
}

export default Ebook
