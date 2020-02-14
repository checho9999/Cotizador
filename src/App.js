import React, { useState } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Resumen from './components/Resumen'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 600px;
  margin: auto;
`

const ContenedorFormulario = styled.div`
  background-color: #FFF;
  padding: 3em;
`

function App() {

  const [resumen, guardarResumen] = useState({
    cotizacion: 0,
    datos: { 
      marca: '',
      year: '',
      plan: ''
    }
  });

  const [ cargando, guardarCargando ] = useState(false)

  //const { datos } = resumen; // no necesito la cotizacion...sino no deberia incializar resumen
  const { cotizacion, datos } = resumen; //cotizacion para Resultado, datos para Resumen

  return (
    <Contenedor>

      <Header
        titulo='Cotizador de Seguros'
      />

      <ContenedorFormulario>

        <Formulario 
          guardarResumen={guardarResumen}
          guardarCargando={guardarCargando}
        />
          
        { cargando ? <Spinner /> : null } 

        <Resumen 
          datos={datos}
        />

        { !cargando  ?
            <Resultado 
              cotizacion={cotizacion}
            /> : null
        } 
      
      </ContenedorFormulario>
      
    </Contenedor>  
  );
}

export default App;
