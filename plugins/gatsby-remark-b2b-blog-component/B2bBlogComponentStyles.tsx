import styled from 'styled-components'

export const B2bBlogComponentStyles = styled.div`
    .bbc-wrapper {
        background: #FE6B00;
        border-radius: 40px;
        margin-top: 40px;
        margin-bottom: 20px;
        padding-top: 30px;
        padding-bottom: 15px;
        position: relative;
        display: block;
    }

    .bbc-wrapper__tab {
        border-radius: 40px 0 0 0;
        background: #0a0a0a;
        top: -16px;
        width: 70%;
        height: 50px;
        position: absolute;

        @media (max-width: 768px) {
            width: 50%;
        }
    }

    .bbc-wrapper__tab:after {
        content: url("data:image/svg+xml,%3Csvg style='fill:%230a0a0a;fill-opacity:1' height='57' viewBox='0 0 144 76' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30.6065 0H0V76H144V61.771H118.122C105.874 61.771 94.3022 56.1602 86.7169 46.5447L62.0113 15.2262C54.426 5.61069 42.8537 0 30.6065 0Z'/%3E%3C/svg%3E ");
        position: relative;
        right: -100%;
    }

    .bbc-wrapper__inner {
        border-radius: 0 40px 40px 40px;
        background: #0a0a0a;
        position: relative;
        padding: 10px 40px 40px;
        gap: 64px;
        display: flex;
        flex-direction: column;

        @media (max-width: 768px) {
            padding: 30px 24px 30px;
        }
    }

    .bbc-content {
        font-size: 40px;
        font-weight: 900;
        color: #fff;
        max-width: 577px;
        line-height: 52px;
        font-family: 'Montserrat', sans-serif;

        @media (max-width: 768px) {
            width: 100%;
            font-size: 24px;
            line-height: 29px;
        }
    }

    .bbc-cta {
        font-family: 'Montserrat', sans-serif;
        font-weight: 900;
    }

    .bbc-cta span {
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
        background: #FE6B00;
        color: #0a0a0a;
        border-radius: 999px;
        padding: 14px 32px;

        @media (max-width: 768px) {
            font-size: 16px;
        }
        
        &:hover {
            opacity: 0.9;
        }
    }

    .bbc-cta span::after {
        content: url("data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.2502 14.4742L0.575195 12.7992L10.4502 2.92422H1.6002V0.574219H14.4752V13.4242H12.1002V4.59922L2.2502 14.4742Z'/%3E%3C/svg%3E ");
        top: 5px;
        right: -10px;
        position: relative;

        @media (max-width: 768px) {
            content: url("data:image/svg+xml,%3Csvg width='16px' height='16px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.2502 14.4742L0.575195 12.7992L10.4502 2.92422H1.6002V0.574219H14.4752V13.4242H12.1002V4.59922L2.2502 14.4742Z'/%3E%3C/svg%3E ");
        }
    }
`
