import React from "react";
import styled from "styled-components";
import variables from "./styles/variables";

const SectionThankYouPage = styled.div`
	&& p:first-of-type {
	font-size: ${variables.pxToRem(28)};
	line-height: ${variables.pxToRem(34)};
	font-weight: 900;
	padding-bottom: ${variables.pxToRem(48)};
	text-align: center;
	}
	`
const SectionDescription = styled.p`
	font-family: ${variables.font.lato};
	font-size: ${variables.pxToRem(20)};
	line-height: ${variables.pxToRem(40)};
	text-align: center;
`;

export const EbookThankYouPage = () => {
	return (
		<SectionThankYouPage>
			<p>enjoy reading</p>
			<SectionDescription>
				You’ll find the guide in your inbox. Or simply click the link below to download it.
			</SectionDescription>
		</SectionThankYouPage>
	);
};
