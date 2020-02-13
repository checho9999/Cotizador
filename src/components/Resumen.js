import React from 'react';
import styled from '@emotion/styled';

const Resumen = ( { datos }) => {

    const { marca, year, plan } = datos;
    console.log(marca + " " + year + " " + plan);

    return (  
        <h2>Resumen de Cotizacion</h2>        
    );
}
 
export default Resumen;