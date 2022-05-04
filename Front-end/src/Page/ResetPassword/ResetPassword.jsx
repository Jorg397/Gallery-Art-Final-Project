import { useState } from 'react';
import {useSearchParams, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import {
    HeaderStyle,
    FormStyled,
    MainStyle,
    ContainerBotonStyled,
    BotonStyled,
    MessageSuccessStyled,
    MessageErrorStyled
} from './Elements/ElementsForm';
import Input from './Components/Input';
import { ResetPasswordActions } from '../../redux/actions';

const ResetPassword = () => {
    const [ contraseña, setContraseña ] = useState({campo: '', valido: null});
    const [ contraseña2, setContraseña2 ] = useState({campo: '', valido: null});
    const [ formValido, setFormValido ] = useState(null);

    const regularExpressionPassword = /^.{5,12}$/;

    const validarPassword2 = () => {
        if(contraseña.campo.length > 0 ){
            if(contraseña.campo !== contraseña2.campo){
                setContraseña2((prevState)=>{
                    return  {...prevState, valido: 'false'}
                  });
            }else{
                setContraseña2((prevState)=>{
                    return  {...prevState, valido: 'true'}
                  });
            }
        }
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = (e) => {
        e.preventDefault();

        if(contraseña.valido === 'true' && contraseña2.valido === 'true'){
            setFormValido(true);
            setContraseña({campo:'', valido: null});
            setContraseña2({campo:'', valido: null});
            if(token){
                let data = {
                    token,
                    newPassword: contraseña.campo
                }
                ResetPasswordActions(data);
                setTimeout(() => {
                    window.location.href = "/login";
                  },3000) 
            }
        }else{
            setFormValido(false);
        }
    }

    
 

    return (
        <> 
            <HeaderStyle>
                <Link to="/home">Gallery</Link>
            </HeaderStyle>

            <MainStyle>
                <FormStyled action="" onSubmit={onSubmit}>
                    <Input
                        state={contraseña}
                        setState={setContraseña}
                        type="password"
                        label="Contraseña"
                        placeholder="Contraseña..."
                        name="contraseña"
                        leyendaError="La contraseña debe tener al menos 5 caracteres"
                        regularExpression={regularExpressionPassword}
                    />
                    <Input 
                        state={contraseña2}
                        setState={setContraseña2}
                        type="password"
                        label="Confirmar contraseña"
                        placeholder="Repite tu Contraseña..."
                        name="contraseña"
                        leyendaError="No coinciden las contraseñas"
                        funcion={validarPassword2}
                    />
                    
                    {formValido === false && <MessageErrorStyled>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <b>Error: </b>Por favor llenar el formulario correctamente
                    </MessageErrorStyled>}
                    <ContainerBotonStyled>
                        <BotonStyled type="submit">Enviar</BotonStyled>
                        {formValido && <MessageSuccessStyled>
                            Ya tienes una nueva contraseña!
                        </MessageSuccessStyled>}
                    </ContainerBotonStyled>
                </FormStyled>
            </MainStyle>
        </>
    );
}

export default ResetPassword;
