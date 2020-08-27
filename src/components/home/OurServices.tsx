import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import BlockchainIcon from "../../assets/blockchain.svg"
import MobileAppDevelopmentIcon from "../../assets/mobileAppDevelopment.svg"
import ProductDesignIcon from "../../assets/productDesign.svg"
import WebDevelopmentIcon from "../../assets/webDevelopment.svg"
import { Button, ButtonContainer, Section, SectionTitle } from "../shared"
import ServiceBox from "./ServiceBox"

const SectionTitleNarrow = styled(SectionTitle)`
  margin-top: 0;
  margin-bottom: 0;
`

const OurServices: React.FC = () => {
  return (
    <Section>
      <SectionTitleNarrow className="is-size-3">
        our services
      </SectionTitleNarrow>
      <div className="columns is-multiline">
        <div className="column is-half">
          <ServiceBox
            icon={<WebDevelopmentIcon />}
            title="web development"
            description="We provide a wide range of custom full stack web development services. We rely on a rich technology stack, including JavaScript, CSS, HTML, Java, Node.js, AWS, MySQL, PostgreSQL, and more."
          />
        </div>
        <div className="column is-half">
          <ServiceBox
            icon={<MobileAppDevelopmentIcon />}
            title="mobile development"
            description="We offer native mobile app development for iOS and Android. Our app development team has broad experience in building applications in Swift, Java, and Kotlin."
          />
        </div>
        <div className="column is-half">
          <ServiceBox
            icon={<ProductDesignIcon />}
            title="product design"
            description="You can count on our expertise in interface analysis, animation design, UX and UI design, root cause analysis, and more. We have worked on design projects of all sizes."
          />
        </div>
        <div className="column is-half">
          <ServiceBox
            icon={<BlockchainIcon />}
            title="blockchain"
            description="Our team has a vast experience in blockchain projects, including the development of a solution for a global humanitarian organization. Blockchain technology is what we’re really good at!"
          />
        </div>
        <ButtonContainer className="column is-full has-text-centered">
          <Link to="/what-we-offer">
            <Button>learn more</Button>
          </Link>
        </ButtonContainer>
      </div>
    </Section>
  )
}

export default OurServices
