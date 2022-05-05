import { useState } from 'react';
import { Link} from 'react-router-dom';
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
} from '../ResetPassword/Elements/ElementsForm';
import Input from '../ResetPassword/Components/Input';
import { ResetPasswordEmailActions } from '../../redux/actions';


const ResetPasswordEmail = () => {
    const [ email, setEmail ] = useState({campo: '', valido: null});
    const [ formValido, setFormValido ] = useState(null);

    const regularExpressionEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
 

    const onSubmit = (e) => {
        e.preventDefault();

        if(email.valido === 'true'){
            setFormValido(true);
            setEmail({campo:'', valido: null});
            ResetPasswordEmailActions(email.campo);
        }else{
            setFormValido(false);
        }
    }
    return(
        <>
            <HeaderStyle>
                <Link to="/home">Gallery</Link>
            </HeaderStyle>
            <MainStyle>
                <FormStyled action="" onSubmit={onSubmit}>
                    <Input
                        state={email}
                        setState={setEmail}
                        type="text"
                        label="Enviar Email"
                        placeholder="pepito@gmail.com..."
                        name="gmail"
                        leyendaError="Debe ser un Email valido"
                        regularExpression={regularExpressionEmail}
                    />
                    {formValido === false && <MessageErrorStyled>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <b>Error: </b>Por favor llenar el formulario correctamente
                    </MessageErrorStyled>}
                    <ContainerBotonStyled>
                        <BotonStyled type="submit">Enviar</BotonStyled>
                        {formValido && <MessageSuccessStyled>
                            Revisa tu correo para restablecer tu contraseña 😎
                        </MessageSuccessStyled>}
                    </ContainerBotonStyled>
                </FormStyled>
            </MainStyle>
        </>
    );
}

export default ResetPasswordEmail;