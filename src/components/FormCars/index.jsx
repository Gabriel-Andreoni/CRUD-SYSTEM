import { Stack, FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react";

import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import theme from './../../theme';

import InputNumber from './../InputNumber/index';
import ButtonContainer from '../ButtonContainer/index';
import ResultContainer from './../ResultContainer/index';

import { CarsData } from './../../contexts/carsData';

const FormCars = () => {
    const [modelo, setModelo] = useState('');
    const [valorCarro, setValorCarro] = useState(0);
    const [valorEntrada, setValorEntrada] = useState(0);
    const [parcelasData, setParcelasData] = useState({});
    const [parcelas, setParcelas] = useState(0);
    const [valorParcelas, setValorParcelas] = useState(0);

    const [resultOpen, setResultOpen] = useState(false) // ESTADO DE INICIAL DO MODAL DO RESULTADO

    const { register, getValues } = useForm();

    const { carsContext } = useContext(CarsData);


    const handleParcelas = (quantParcelas) => {
        let novaParcela = { ...parcelasData, quantParcelas };
        setParcelasData(novaParcela);
    }

    const handleCalc = () => {
        const modeloCarro = getValues("modelo");
        const carroValor = getValues("valorCarro");
        const entradaValor = getValues("valorEntrada");

        if (modeloCarro == "" && carroValor == "" && entradaValor == "") {
            alert('Preencha todos os dados');
            return;
            
        } else {
            setResultOpen(true); // ABRE O MODAL DO RESULTADO

            const { quantParcelas } = parcelasData; // ACESSANDO A PROP DO INPUT NUMBER COMPONENT

            const valorEntradaCarro = carroValor - entradaValor;
            const valorParcelas = valorEntradaCarro / quantParcelas;

            carsContext(modeloCarro, carroValor, entradaValor, valorParcelas); // FUNÇÃO DO CONTEXT API

            const valorCarroCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carroValor);
            const valorEntradaCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(entradaValor);
            const valorParcelasCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorParcelas);

            setModelo(modeloCarro);
            setValorCarro(valorCarroCurrency);
            setValorEntrada(valorEntradaCurrency);
            setParcelas(quantParcelas);
            setValorParcelas(valorParcelasCurrency);
        }


    }

    const onCloseHandle = () => {
        setResultOpen(false); // FUNÇÃO PASSADA VIA PROP PARA FECHAR O MODAL
    }

    return (
        <Stack
            display="flex"
            flexDirection="row"
            flexWrap="wrap"

            justifyContent="center"
            alignItems="center"
            rowGap="2em"
            columnGap="11em"

            position="relative"
        >

            <FormControl
                w="30%"
                h="fit-content"
            >
                <FormLabel
                    fontFamily={theme.fonts.heading}
                    fontSize="1.5em"
                    color="#fefefe"
                >
                    Veículo
                </FormLabel>

                <Input
                    color="#fefefe"

                    _focus={{
                        borderColor: "#467aeb"
                    }}
                    type="text"
                    {...register("modelo")}
                    border="none"
                    borderBottom="4px solid #467aeb"
                />

                <FormHelperText
                    fontFamily={theme.fonts.body}
                    color="#fefefe"
                >
                    Modelo e ano do veículo
                </FormHelperText>
            </FormControl>

            <FormControl
                w="30%"
                h="fit-content"
            >
                <FormLabel
                    fontFamily={theme.fonts.heading}
                    fontSize="1.5em"
                    color="#fefefe"
                >
                    Valor
                </FormLabel>

                <Input
                    color="#fefefe"

                    _focus={{
                        borderColor: "#467aeb"
                    }}
                    type="text"
                    {...register("valorCarro")}
                    border="none"
                    borderBottom="4px solid #467aeb"
                />

                <FormHelperText
                    fontFamily={theme.fonts.body}
                    color="#fefefe"
                >
                    Valor desejado
                </FormHelperText>
            </FormControl>

            <FormControl
                w="30%"
                h="fit-content"
            >
                <FormLabel
                    fontFamily={theme.fonts.heading}
                    fontSize="1.5em"

                    color="#fefefe"
                >
                    Entrada
                </FormLabel>

                <Input
                    color="#fefefe"

                    _focus={{
                        borderColor: "#467aeb"
                    }}
                    type="text"
                    {...register("valorEntrada")}
                    border="none"
                    borderBottom="4px solid #467aeb"
                />

                <FormHelperText
                    fontFamily={theme.fonts.body}
                    color="#fefefe"
                >
                    Valor referente a entrada
                </FormHelperText>
            </FormControl>


            <FormControl
                w="30%"
            >
                <InputNumber quantParcelas={handleParcelas} />
            </FormControl>


            <ButtonContainer
                text="Calcular Parcelas"
                event={handleCalc}

                width="40%"
            
            />

            {resultOpen && (
                <ResultContainer
                    modeloDesc={modelo}
                    valorDesc={valorCarro}
                    entradaDesc={valorEntrada}
                    parcelasDesc={parcelas}
                    valorParcelas={valorParcelas}
                    handleOnClose={onCloseHandle} />
            )}
        </Stack>
    )
}

export default FormCars;