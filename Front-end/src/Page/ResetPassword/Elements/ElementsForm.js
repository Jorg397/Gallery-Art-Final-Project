import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const colors = {
    border: '#0075ff',
    error: '#bb2929',
    success: '#1ed12d'
};
 
const HeaderStyle = styled.div`
    width: 80%;
    margin: 0 auto;
    margin-top: 0.8%;
    height: 70px;
    background-color: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 50px;
    a{
        font-family: 'Play', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 2rem;
        color: #fff;  
    }
`;

const MainStyle = styled.main`
    max-width: 800px;
    width: 90%;
    margin: auto;
    padding: 40px;
    margin-top: 150px;
    background: #c9ada7;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
`;

const FormStyled = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
`;

const LabelStyled = styled.label`
    display: block;
    font-weight: 700;
    padding: 10px;
    min-height: 40px;
    cursor: pointer;

    ${props => props.valido === 'false' && css`
        color: ${colors.error};
    `}
`;

const GruopInputStyled = styled.div`
    position: relative;
    z-index: 90;
`;

const InputStyled = styled.input`
    width: 100%;
    background: #fff;
    border-radius: 3px;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 3px solid transparent;

    &:focus {
        border: 3px solid ${colors.border};
        outline: none;
        box-shadow: 3px 0 30px rgba(163, 163, 163, 0.4);
    }
    ${props => props.valido === 'true' && css`
        border: 3px solid transparent;
    `}
    ${props => props.valido === 'false' && css`
        border: 3px solid ${colors.error} !important;
    `}
`;

const LeyendaErrorStyled = styled.p`
    font-size: 12px;
    margin-bottom: 0;
    color: ${colors.error};
    display: none;

    ${props => props.valido === 'true' && css`
        display: none;
    `}

    ${props => props.valido === 'false' && css`
        display: block;
    `}
`;

const IconoValidacionStyled = styled(FontAwesomeIcon)`
    position: absolute;
    right: 10px;
    bottom: 14px;
    z-index: 100;
    font-size: 20px;
    opacity: 0;

    ${props => props.valido === 'false' && css`
        opacity: 1;
        color: ${colors.error};
    `}
    ${props => props.valido === 'true' && css`
        opacity: 1;
        color: ${colors.success};
    `}
`;



const ContainerBotonStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BotonStyled = styled.button`
    height: 45px;
    line-height: 45px;
    width: 30%;
    background: #000;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: .1s ease all;

    &:hover {
        box-shadow: 3px 0 30px rgba(163, 163, 163, 1);
    }
`;

const MessageSuccessStyled = styled.p`
    font-size: 12px;
    color: ${colors.success};
`;

const MessageErrorStyled = styled.p`
    height: 45px;
    line-height: 45px;
    background: ${colors.error};
    padding: 0 15px;
    border-radius: 3px;

    p{
        margin: 0;
    }
    b{
        margin-left: 10px;
    }
`;


export {
    HeaderStyle,
    FormStyled,
    MainStyle,
    LabelStyled,
    GruopInputStyled,
    InputStyled,
    LeyendaErrorStyled,
    IconoValidacionStyled,
    ContainerBotonStyled,
    BotonStyled,
    MessageSuccessStyled,
    MessageErrorStyled
}
