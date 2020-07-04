import styled from 'styled-components';

export const StyledStartButton = styled.button.attrs(props => ({
    // disabled: props.disabled ? 'true' : false,
    disabled: props.disabled,
}))`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    border: none;
    color: white;
    background: ${props => (props.disabled ? '#333' : '#999')};
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    :disabled {
        opacity: 0.4;
    }
`