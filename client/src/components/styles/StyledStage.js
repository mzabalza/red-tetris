import styled from 'styled-components';

export const StyledStage = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(50vh / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    // border: 1px solid var(--color-salmon);
    padding: 1rem;
    // border-top: 10px solid var(--color-salmon-2);
    // border-bottom: 10px solid var(--color-salmon);
    // border-right: 10px solid var(--color-salmon);
    // border-left: 10px solid rgba(150, 29, 5, 0.2);
    border: 8px solid;
    border-bottom-color: rgba(255, 59, 20, 0.4);
    border-right-color: rgba(255, 59, 20, 1);
    border-top-color: rgba(255, 59, 20, 1);
    border-left-color: rgba(255, 59, 20, 0.6);
    




    width: 100%;
    max-width: 50vh;
    // max-width: 30rem;

    // background: var(--color-grey-dark-2);
    background: rgba(150, 29, 5, 0.1);
`