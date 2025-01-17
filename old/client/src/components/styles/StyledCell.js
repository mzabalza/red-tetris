import styled from 'styled-components';

export const StyledCell = styled.div`
    // width: auto;
    // height: auto;
    // mind-with: 20rem;
    background: rgba(${props => props.color}, 0.2);
    border: ${props => props.type === 0 ? '0px' : '4px solid'};
    border-bottom-color: rgba(${props => props.color}, 0.4);
    border-right-color: rgba(${props => props.color}, 1);
    border-top-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 0.6);
`