import React from 'react'

import { CustomSection, Section, SectionInner } from '../../components/shared'
import { FormComponent } from '../../components/about-us/form-section/form'

const Form: React.FC = () => {
  return (
    <div className='container'>
      <CustomSection>
        <SectionInner id='contact'>
          <FormComponent
            style={{ marginTop: '1rem' }}
            title={'didn’t find a suitable position for you?'}
            description={
              <>
                Our recruitment demand is constantly changing. Drop us a line at{' '}
                <a href={'mailto:ula@bright.dev'}>ula@bright.dev</a>, or submit your CV and we will contact you when a
                position inline with your competences becomes available.
              </>
            }
            namePlaceholder={'Enter name here'}
            mailPlaceholder={'name@mail.com'}
            textPlaceholder={'Let us know what would you like to do @ bright inventions'}
            uploadLabel={'Upload '}
          />
        </SectionInner>
      </CustomSection>
    </div>
  )
}

export default Form
