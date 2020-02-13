import React, { useState } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Resumen from './components/Resumen'

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

  const { datos } = resumen; // no necesito la cotizacion...sino no deberia incializar resumen

  return (
    <Contenedor>

      <Header
        titulo='Cotizador de Seguros'
      />

      <ContenedorFormulario>

        <Formulario 
          guardarResumen={guardarResumen}
        />

        <Resumen 
          datos={datos}
        />  

      </ContenedorFormulario>
      
    </Contenedor>  
  );
}

export default App;
