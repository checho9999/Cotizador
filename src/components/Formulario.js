import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan, primerMayuscula } from '../helper'

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;    
`
const Label = styled.label`
    flex: 0 0 100px;
`

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`
const InputRadio = styled.input`
    margin: 0 1rem;
`

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color 1s ease;
    margin-top: 2rem;

    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center; 
    margin-bottom: 2rem;   
`

const Formulario = ( { guardarResumen } ) => {

    const [datos, gudarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [ error, guardarError ] = useState(false)

    //extraer los valores del useState
    const { marca, year, plan } = datos;        

    //leer los datos desde el formulario para colocarlos en el useState
    const obtenerInformacion = e => {
        gudarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = e => {
        // para que no se envie el query string en la parte superior, ni se recarge la pagina
        e.preventDefault();

        //validar que el gasto sea valido
            if ( marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
                guardarError(true);
                return;
            }
        
        //Pasos a seguir si la validacion fue correcta
        guardarError(false);

        //Ponemos un valor base por defecto
        let resultado = 2000;

        //Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);    
        //console.log(diferencia);

        //Cada año mas antiguo resta 3% al valor
        resultado -= ( ( diferencia * 3) * resultado ) / 100;
        //console.log(resultado);

        //America 15% - Asiatico 5% - Europeo 30%
        resultado = calcularMarca(marca) * resultado;
        //console.log(resultado);

        //Basico Aumenta 20% - Completo Aumneto 50%
        const incremetoPlan = obtenerPlan(plan);
        //console.log(incremetoPlan);
        resultado = parseFloat( incremetoPlan * resultado ).toFixed(2);
        //console.log(resultado);

        guardarResumen({
            cotizacion: resultado,
            datos
        })
                
    }

    return (  
        <form
            onSubmit={cotizarSeguro} // {handleSubmit} en la documentacion oficial
        >
            { error ? <Error>Todos los campos son Obligatorios</Error> : null }    

            <Campo>       
                <Label>Marca</Label> 
                <Select
                    name='marca'
                    value={marca}
                    onChange={obtenerInformacion}
                >                    
                    <option value=''>--Seleccione --</option>
                    <option value='americano'>Americano</option>
                    <option value='europeo'>Europeo</option>
                    <option value='asiatico'>Asiatico</option>
                </Select>
            </Campo>
            <Campo>       
                <Label>Año</Label> 
                <Select
                    name='year'
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>       
                <Label>Plan</Label> 
                <InputRadio 
                    type='radio'
                    name='plan'
                    value='basico'
                    checked={plan === 'basico'}
                    onChange={obtenerInformacion}
                /> Basico
                <InputRadio 
                    type='radio'
                    name='plan'
                    value='completo'
                    checked={plan === 'completo'}
                    onChange={obtenerInformacion}
                /> Completo               
            </Campo>

            <Boton type='submit'>Cotizar</Boton>
        </form>
    );
}
 
export default Formulario;
