import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import variables, { font } from '../../styles/variables';
import questionArrow from '../../../static/images/arrowFaqs.svg'
import { CustomTextRegular } from './index.styled';
import { MoreButton } from '.';


const FaqWrapper = styled.div`
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
`
const Question = styled.h3<{ shown: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  text-align: left;
  font: normal normal 700 ${variables.pxToRem(26)} / ${variables.pxToRem(40)} ${font.montserrat};
  letter-spacing: 0px;
  color: #000000;
  padding: ${variables.pxToRem(35)} 0;
  cursor: pointer;

  p {
    flex-basis: 90%;
  }

  & span {
    position: relative;
    width: 18px;
    height: 11px;
    min-width: 18px;
    ${({ shown }) => (shown ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)')};

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background: url(${questionArrow}) no-repeat, center;
      width: 18px;
      height: 11px;
    }
  }
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(24)};
    line-height: ${variables.pxToRem(40)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(20)};
    line-height: ${variables.pxToRem(40)};
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(18)};
    line-height: ${variables.pxToRem(30)};
    padding: ${variables.pxToRem(28)} 0;

    & span {
      width: 12px;
      height: 8px;
      min-width: 12px;
      &::before {
        background-size: 12px 8px;
      }
    }
  }
`
const FaqsTextRegural = styled(CustomTextRegular)`
  font-size: ${variables.pxToRem(22)};
  padding-bottom: ${variables.pxToRem(36)};
  color: #0a0a0a;
  opacity: 1;

  & strong {
    color: ${variables.color.text};
  }

  & li {
    margin-bottom: 1em;
    font-size: ${variables.pxToRem(22)};
  }

  && p {
    font-size: ${variables.pxToRem(22)};
  }
  @media ${variables.device.laptop} {
    & li {
      margin-bottom: 1em;
      font-size: ${variables.pxToRem(20)};
      line-height: ${variables.pxToRem(40)};
    }

    && p {
      font-size: ${variables.pxToRem(20)};
      line-height: ${variables.pxToRem(40)};
    }
  }

  @media ${variables.device.mobile} {
    padding-bottom: ${variables.pxToRem(28)};
    padding-top: ${variables.pxToRem(0)};
    & li {
      margin-bottom: 1em;
      font-size: ${variables.pxToRem(16)};
      line-height: ${variables.pxToRem(40)};
    }

    && p {
      font-size: ${variables.pxToRem(16)};
      line-height: ${variables.pxToRem(40)};
    }
  }
`

interface FaqItem {
    frontmatter: {
        slug: string;
        question: string;
        answer: string;
    };
}
const CareerMoreButtonWrapper = styled.div`
& .see-more {
  border: none;
  font-size: ${variables.pxToRem(22)};
    &:hover {
      color: ${variables.color.primary};
      background: ${variables.color.white};
      border: none;
    }
}
`


interface FaqsDropdownProps {
    faqs: FaqItem[];
    faqSlug?: string;
    slug?: string;
    ref: React.RefObject<HTMLDivElement>;
  generateLink: (args: { basePath: string; faqSlug?: string | undefined }) => string;
    offset?: number;
  shortList?: boolean;

}

const FaqsDropdown = React.forwardRef<HTMLDivElement, FaqsDropdownProps>(({ faqs, faqSlug, slug, generateLink, offset, shortList = false }, ref) => {
  const [show, setShow] = useState<any>({})
  const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (faqSlug) {
            const index = faqs.map(({ frontmatter: faq }: { frontmatter: { slug: string } }) => faq.slug).indexOf(faqSlug)

            if (index >= 0 && typeof ref !== "function" && ref?.current) {
                handleShow(index)
                let yOffset = 0
                if (offset !== undefined) {
                    yOffset = offset
                }
                const y = ref?.current?.getBoundingClientRect().top + window.pageYOffset + yOffset


                setTimeout(() => {
                    window.scrollTo({
                        top: y,
                    })
                }, 100)
            }
        }
    }, [])

    const handleShow = (i: number) => {
        const currentFaqSlug = faqs[i]?.frontmatter?.slug;
        if (!currentFaqSlug) return;
        if (!show[i]) {
            const OurFaqLink = generateLink({
                basePath: slug || "default-value",
                faqSlug: faqs[i].frontmatter?.slug,
            })
            window.history.pushState({ path: OurFaqLink }, '', OurFaqLink)
        } else {
            const showArray = Object.keys(show).map(function (k) {
                return { value: show[k], index: k }
            })
            const nearestOpenedFaq = showArray.findIndex(item => item.value && item.index != i.toString())

            const openedFaqSlug =
                nearestOpenedFaq !== -1
                    && faqs[nearestOpenedFaq]?.frontmatter?.slug
                    ? faqs[nearestOpenedFaq].frontmatter.slug
                    : '';

            const ourFaqLink = generateLink({
                basePath: slug || "default-value",
                faqSlug: openedFaqSlug,
            })
            window.history.pushState({ path: ourFaqLink }, '', ourFaqLink)
        }

        setShow((prevshow: any) => ({
            ...prevshow,
            [i]: !prevshow[i],
        }))
    }

  const faqsToRender = (!shortList || showAll) ? faqs : faqs.slice(0, 6);

    return (


        <>
            {faqs &&
          faqsToRender.map(({ frontmatter: faq }: { frontmatter: Pick<Queries.FaqsFrontmatter, 'question' | 'answer' | 'slug'> }, i: number) => {

                    const { question, answer, slug } = faq
                    const answerAsHtml = (answer as unknown as Queries.SimpleMdx).html!

                    return (
                        <FaqWrapper ref={slug == faqSlug ? ref : null} key={slug}>
                            {answer ? (
                                <Question onClick={() => handleShow(i)} shown={show[i]}>
                                    {question}

                                    <span></span>
                                </Question>
                            ) : null}

                            {show[i] && answer ? (
                                <FaqsTextRegural className='content' dangerouslySetInnerHTML={{ __html: answerAsHtml }} />
                            ) : null}
                        </FaqWrapper>
                    )
                })}
        {shortList && !showAll && faqs.length > 6 && (
          <CareerMoreButtonWrapper>
            <MoreButton onClick={() => setShowAll(true)} className='see-more'>see more</MoreButton>
          </CareerMoreButtonWrapper>
        )}
        </>
    )
})

export default FaqsDropdown;