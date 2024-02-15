import React, { ReactNode } from 'react'
import { CustomPageTitle, CustomSection, CustomSectionInner, CustomTextRegular } from '.';

interface StatusPanelProps {
  title: ReactNode
  children: ReactNode
}
export const StatusPanel = ({ title, children }: StatusPanelProps) => (
  <>
    <CustomSection
      paddingProps='3rem 2rem 1rem 2rem'
      paddingLaptop='3rem 2rem 1rem 2rem'
      paddingTabletXL='3rem 2rem 1rem 2rem'
      paddingTablet='3rem 2rem 1rem 2rem'
      paddingMobileProps='3rem 1.125rem 1rem 1.125rem'
    >
      <CustomPageTitle>
        {title}
      </CustomPageTitle>
    </CustomSection>

    <CustomSection
      paddingProps='0 2rem 4rem 2rem'
      paddingLaptop='0 2rem 4rem 2rem'
      paddingTabletXL='0 2rem 4rem 2rem'
      paddingTablet='0 2rem 4rem 2rem'
      paddingMobileProps='0 1.125rem 4rem 1.125rem'
    >
      <CustomSectionInner>
        <CustomTextRegular centered>
          {children}
        </CustomTextRegular>
      </CustomSectionInner>
    </CustomSection>
  </>
)
