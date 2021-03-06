import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: 'Bebas Neue', Arial, Helvetica;
    padding: 0 1em 1em 1em;
    margin-top: 1rem;
    border-radius: 10px;
    border: 1px solid #326AC0;
`;

const Info = styled.p`
    font-size: 18px;

    span {
        font-weight: bold;

    }
`;

const Precio = styled.p`
    font-size: 30px;

    span {
        font-weight: bold;
    }
`;

const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;
    console.log(resultado);
    return (
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio más alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última Actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
    );
}

Cotizacion.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Cotizacion;