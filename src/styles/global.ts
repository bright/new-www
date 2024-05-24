import { createGlobalStyle } from 'styled-components'
require('prismjs/themes/prism-solarizedlight.css')
import '../../static/fonts/fonts.scss'
import variables, { font } from './variables'

export const GlobalStyle = createGlobalStyle` 
:root {
--black-100: #131214;
--black-200: #000000bf;
--black: #000000;
--orange-100: #FBAF1F;
--orange-200: #fe6b00;
--black-new: #0A0A0A;
}
&& body {
    font-family: ${font.montserrat};
    color: var(--black-new);
    h1, h2, h3, h4, h5, h6 {
        color: var(--black-new);
    }
}
`
