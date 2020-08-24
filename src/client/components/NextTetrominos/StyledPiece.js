import styled from 'styled-components';

export const StyledPiece = styled.div`

    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(40vh / (${props => props.width} * ${props => props.size}))
    );
    grid-template-columns: repeat(
        ${props => props.width},
        1fr
    );
    grid-gap: 1px;
    padding: 1rem;

    // border: 8px solid;
    border-bottom-color: rgba(255, 59, 20, 0.4);
    border-right-color: rgba(255, 59, 20, 1);
    border-top-color: rgba(255, 59, 20, 1);
    border-left-color: rgba(255, 59, 20, 0.6);
    
    // width: 100%;

    max-width: calc(40vh / ${props => props.size}) ;


`