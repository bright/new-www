import styled from 'styled-components';
import variables from '../../styles/variables';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: 500px;
    margin: auto;
`;

export const AuthorWrapper = styled.div`
    display: flex;
    gap: 12px;
`;

export const Photo = styled.div`
    border-radius: 50%;
    border: 1px solid #d3d3d3;
    height: 60px;
    width: 60px;
    overflow: hidden;
    flex-shrink: 0;
`;

export const Author = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 60px;
`;

export const Name = styled.div`
    color: ${variables.color.heading};
    font-weight: bold;
`;

export const PositionAndCompany = styled.div`
    color: ${variables.color.heading};
`;

export const Company = styled.span`
    font-weight: bold;
`;

export const QuoteWrapper = styled.div`
`;

export const Quote = styled.span`
    font-style: italic;
`;

export const Dash = styled.span`
    margin: 0 8px;
`;

export const LinkWrapper = styled.span`
    font-style: normal;
`;
