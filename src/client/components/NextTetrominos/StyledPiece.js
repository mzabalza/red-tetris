import styled from 'styled-components';

export const StyledPiece = styled.div`

    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(25vw / (${props => props.width} * ${props => props.size}))
    );
    grid-template-columns: repeat(
        ${props => props.width},
        1fr
    );
    // grid-gap: 1px;
    padding: 1rem;
    
    width: 100%;

    max-width: calc(25vw / ${props => props.size}) ;


`