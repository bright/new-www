import React from "react";
import styled from "styled-components";
import variables from "../../../styles/variables";
import EbookArrow from "../../../assets/ebook_arrow.svg";

const SectionTitle = styled.p`
	font-size: ${variables.pxToRem(28)};
	line-height: ${variables.pxToRem(34)};
	font-weight: 900;
	padding-bottom: ${variables.pxToRem(48)};
	text-align: center;
`;

const SectionDescription = styled.p`
	font-family: ${variables.font.lato};
	font-size: ${variables.pxToRem(20)};
	line-height: ${variables.pxToRem(40)};
	text-align: center;
`;
const SectionEbook = styled.section`
display: flex;
flex-direction: column;
justify-content: center;

`;

const LinkWrapper = styled.div`
width: fit-content;
margin: ${variables.pxToRem(48)} auto 0;
  	& a {
		border-bottom: 1px solid ${variables.color.text};
		padding: 0 ${variables.pxToRem(14)} ${variables.pxToRem(5)} ${variables.pxToRem(8)};
		color: inherit;
		font-size: ${variables.pxToRem(20)};
		line-height: ${variables.pxToRem(40)};
    
		

		& span {
			padding-left: ${variables.pxToRem(17)};
		}

		@media ${variables.device.mobile} {
    		& svg {
      			width: 16px;
      			height: auto;
    		}
		}
	}
`

export const HomeEbookThankYouPage = ({ url }: { url: string }) => {
	return (
		<SectionEbook>
			<SectionTitle>enjoy reading</SectionTitle>
			<SectionDescription>
				You’ll find the guide in your inbox. Or simply click the link below to download it.
			</SectionDescription>
      <LinkWrapper>
				<a href={url} target="_blank">
				click to open the guide
				<span>
					<EbookArrow />
				</span>
			</a>
      </LinkWrapper>
			
		</SectionEbook>
	);
};
