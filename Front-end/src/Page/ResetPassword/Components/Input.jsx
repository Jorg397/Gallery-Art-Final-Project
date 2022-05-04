import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {
    LabelStyled,
    GruopInputStyled,
    InputStyled,
    LeyendaErrorStyled,
    IconoValidacionStyled,
} from '../Elements/ElementsForm';
const Input = ({ state, setState, label, placeholder, type, name, leyendaError, regularExpression, funcion }) => {
    const onChange = (e) => {
        setState({ ...state, campo: e.target.value });
    };

    const validate = () => {
        if(regularExpression){
            if(regularExpression.test(state.campo)){
                setState({ ...state, valido: 'true' });
            }else{
                setState({ ...state, valido: 'false' });
            }
        }
        if(funcion){
            funcion();
        }
    };

    return (
        <div>
            <LabelStyled htmlFor={name} valido={state.valido}>{label}</LabelStyled>
            <GruopInputStyled>
                <InputStyled 
                    type={type} 
                    placeholder={placeholder} 
                    id={name}
                    value= {state.campo}
                    onChange={onChange}
                    onKeyUp={validate}
                    onBlur={validate}
                    valido={state.valido}
                />
                <IconoValidacionStyled 
                    icon={state.valido === 'true' ? faCheckCircle : faTimesCircle} 
                    valido={state.valido}
                />
            </GruopInputStyled>  
            <LeyendaErrorStyled valido={state.valido}>{leyendaError}</LeyendaErrorStyled>
        </div>
    );
}

export default Input;