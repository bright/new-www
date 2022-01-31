import { createGlobalStyle } from 'styled-components'
require('prismjs/themes/prism-solarizedlight.css')

export const GlobalStyle = createGlobalStyle` 
:root {
--black-100: #131214;
--black-200: #000000bf;
--black: #000000;
--orange-100: #FBAF1F;
--orange-200: #F7931E;
--black-new: #0A0A0A;
}
&& body {
    color: var(--black-new);
}
`
