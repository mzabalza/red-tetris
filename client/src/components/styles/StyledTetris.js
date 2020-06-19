import styled from 'styled-components';

import bgImage from '../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
    outline: 0;

    width: 100vw;
    height: 100vh;
    
    // background: url(${bgImage}) #000;
    // background-image: linear-gradient(to right bottom, var(--color-grey-dark-1), var(--color-grey-dark-3));
    // background-size: cover;
    overflow: hidden;
`;

export const StyledTetris = styled.div`
    flex: 2;
    display: flex;
    align-items: flex-start;
    padding: 40px;
    margin: 0 auto;
    // max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }
`;
