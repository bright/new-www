import { createGlobalStyle } from 'styled-components'
require('prismjs/themes/prism-solarizedlight.css')
import '../../static/fonts/fonts.scss'

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
    font-family: 'Montserrat', sans-serif;
    color: var(--black-new);
    h1, h2, h3, h4, h5, h6 {
        color: var(--black-new);
    }
}
`
