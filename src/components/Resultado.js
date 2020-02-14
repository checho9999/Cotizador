import React from 'react';
import styled from '@emotion/styled';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Mensaje = styled.p`
    background-color: rgb(127, 224, 237);
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
`;

const ResultadoCotizacion = styled.div`
    text-align: center;
    padding: .5rem;
    border: 1px solid #26C6DA;
    background-color:  rgb(127, 224, 237);
    margin-top: 1rem;
    position: relative;
`;

const TextoCotizacion = styled.p`
    color: #00838F;
    padding: 1rem;
    text-transform: uppercase;
    font-weight:bold;
    margin: 0;
`;

const Resultado = ( { cotizacion } ) => {
    return (  
        (cotizacion === 0) 
            ? <Mensaje>Elige marca, año y tipo de seguro</Mensaje> 
            :  
                (
                    <ResultadoCotizacion>
                        <TransitionGroup
                            component='span' //era 'p' pero tira error...el <span> tambien se agrego en TextoCotizacion...esto descontrola la animacion creo???
                            className='resultado'
                        >
                            <CSSTransition
                                classNames='resultado'
                                key={cotizacion}
                                timeout={ { enter: 1000, exit: 1000} } // orignalmente 500 y 500
                            >                                
                                <TextoCotizacion>El total es: $ <span>{cotizacion}</span></TextoCotizacion>
                            </CSSTransition>
                        </TransitionGroup>
                    </ResultadoCotizacion>
                )
    );
}

Resultado.propTypes = {
    cotizacion: PropTypes.number.isRequired
}

export default Resultado;