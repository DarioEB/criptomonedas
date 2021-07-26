import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Error from './Error';
import PropTypes from 'prop-types';

// Importo mi custom Hook
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    color: #FFF;
    transition: background-color: .3s ease;
    border-radius: 10px;
    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    // State del listado de criptomonedas
    const [ listaCripto, guardarCriptomonedas ] = useState([]);
    // State para la validación
    const [ error, guardarError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'},
        { codigo: 'ARS', nombre: 'Peso Argentino'},
        { codigo: 'BRL', nombre: 'Real'}
    ]

    // Utilizamos el Hook creado
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    // Utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto);

    // Ejecutar llamado a la API
    useEffect( () => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            
            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);

        }
        consultarAPI();
    }, []);

    // Cuando el usuario hace submit en el formulario
    const cotizarMoneda = e => {
        e.preventDefault();

        // Validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // Pasar los datos al componente principal
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
             {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SelectMonedas 

            />

            <SelectCripto 
            
            />

            <Boton 
                type="submit"
                value="Calcular" 
            />
        </form>
    );
}

Formulario.propTypes = {
    guardarCriptomoneda: PropTypes.func.isRequired,
    guardarMoneda: PropTypes.func.isRequired
}

export default Formulario;
