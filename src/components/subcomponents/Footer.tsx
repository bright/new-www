import React from "react"
import styled from "styled-components"
import EmailIcon from "../../assets/email_white.svg"
import LocationIcon from "../../assets/location_white.svg"
import LogoWhite from "../../assets/logo_white_2.svg"
import { SocialIcons } from "./SocialIcons"

const FooterContainer = styled.footer`
  padding: 0;
`

const TopFooter = styled.div`
  /* margin-bottom: 5em; */
  padding: 3em 5em 4em;
  font-size: 16px;
  @media (max-width: 480px) {
    padding: 3em 1.5em 4em;
  }
`

const BottomFooter = styled.div`
  width: calc(100%);
  background: white;
  color: black;
  /* margin: 0 -1.5rem -6rem; */
  min-height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em 3em;
  a {
    display: block;
    color: #000;
    text-decoration: underline;
    font-weight: bold;
  }
`

const LinkContainer = styled.div`
  .content {
    margin-left: 1em;
    a,
    p {
      color: #fff;
      opacity: 75%;
      font-size: 14px;
    }
  }
  h6 {
    margin-left: 1em;
  }
`

const IconHolder = styled.div`
  display: flex;
  margin-bottom: 2em;
  padding: 0 0.75em;
  align-items: center;
  .right {
    margin-left: 1em;
    color: #fff;
    opacity: 75%;
    font-size: 14px;
    a {
      color: #fff;
    }
  }
`

const LogoContainer = styled.figure`
  padding: 0 0.75em;
`

export const Footer = () => {
  return (
    <FooterContainer className="footer">
      <TopFooter>
        <div className="columns">
          <div className="column">
            <LogoContainer className="content image">
              <a href="/">
                <LogoWhite style={{ width: "180px" }} />
              </a>
            </LogoContainer>
            <SocialIcons className="padded-right" />
            {/* 
            <div
              className="clutch-widget content"
              data-url="https://widget.clutch.co"
              data-widget-type="1"
              data-height="50"
              data-clutchcompany-id="32656"
            ></div> */}
          </div>

          {/* <div className="column has-text-centered">
            <a href="/projects">
              <h4 className="subtitle is-size-4 has-text-weight-bold">
                our latest project
              </h4>
              <figure className="image">
                <img src="/images/Asset-7.svg" width="245" />
              </figure>
            </a>
          </div> */}

          <LinkContainer className="column is-hidden-mobile">
            <h6 className="subtitle is-size-6 has-text-weight-bold">
              explore more
            </h6>
            <p className="content">
              <a className="" href="/about-us">
                about us
              </a>
            </p>
            <p className="content">
              <a className="" href="/what-we-offer">
                what we offer
              </a>
            </p>
            <p className="content">
              <a className="" href="/projects">
                projects
              </a>
            </p>
            <p className="content">
              <a className="" href="/career">
                career
              </a>
            </p>
            <p className="content">
              <a className="" href="/blog">
                blog
              </a>
            </p>
          </LinkContainer>

          <LinkContainer className="column is-hidden-mobile">
            <h6 className="subtitle is-size-6 has-text-weight-bold">
              services
            </h6>
            <p className="content">
              <a className="" href="/what-we-offer">
                web development
              </a>
            </p>
            <p className="content">
              <a className="" href="/what-we-offer">
                mobile development
              </a>
            </p>
            <p className="content">
              <a className="" href="/what-we-offer">
                consulting services
              </a>
            </p>
            <p className="content">
              <a className="" href="/what-we-offer">
                UX/UI design
              </a>
            </p>
          </LinkContainer>

          <LinkContainer className="column">
            <h6 className="subtitle is-size-6 has-text-weight-bold is-hidden-mobile">
              contact
            </h6>
            <IconHolder>
              <div className="left">
                <LocationIcon />
              </div>
              <div className="right">
                ul. Jana Matejki 12, <br />
                80-232 Gdańsk
              </div>
            </IconHolder>
            <IconHolder>
              <div className="left">
                <EmailIcon />
              </div>
              <div className="right">
                <a href="mailto:info@brightinventions.pl?subject=bright%20mail">
                  info@brightinventions.pl
                </a>
              </div>
            </IconHolder>
          </LinkContainer>
        </div>
      </TopFooter>

      <BottomFooter>
        <div>
          © {new Date().getFullYear()} Bright Inventions. All rights reserved.{" "}
          <br />
          We use cookies to ensure that we give you the best experience on our
          website. If you continue to use this site we will assume that you are
          happy with it.
          <a href="/privacy-policy" className="has-text-black-bis">
            Privacy Policy
          </a>
        </div>
      </BottomFooter>
    </FooterContainer>
  )
}
