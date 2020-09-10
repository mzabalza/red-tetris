import styled from 'styled-components';

export const StyledStage = styled.div`

    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(23vw / (${props => props.width}))
    );
    grid-template-columns: repeat(
        ${props => props.width},
        calc(23vw / (${props => props.width}))
    );
    // grid-gap: 1px;
    padding: 0.5rem;

    border: 8px solid;

    border-image: 
    linear-gradient(
      to bottom,
      rgba(144, 87, 224),
      rgba(144, 87, 224, 0.8),

      rgba(144, 87, 224, 0.3)
    ) 1;
    
    width: 100%;


    max-width: 23vw;

    // max-width: calc(40vh);

`