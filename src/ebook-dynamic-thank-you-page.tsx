import React from "react";
import styled from "styled-components";
import variables from "./styles/variables";

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

export const EbookThankYouPage = () => {
	return (
		<div>
			<SectionTitle>enjoy reading</SectionTitle>
			<SectionDescription>
				You’ll find the ebook in your inbox. Or simply click the link below to
				download it.
			</SectionDescription>
		</div>
	);
};
