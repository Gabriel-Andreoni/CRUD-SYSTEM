import {
    FormControl,
    FormLabel,
    FormHelperText,
} from '@chakra-ui/react';

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';

import theme from './../../theme'

import { useState } from 'react'

const InputNumber = ({ quantParcelas }) => {
    const [parcelas, setParcelas] = useState('');

    const handleChange = (e) => {
        setParcelas(e);
        quantParcelas(+parcelas + 1); // TRANSFORMANDO O VALOR DO INPUT EM NUMBER E SOMANDO MAIS UM PARA DAR A CONTAGEM CORRETA.
    }

    return (
        <FormControl
            w="100%"
        >
            <FormLabel
                fontFamily={theme.fonts.heading}
                fontSize="1.5em"
                color="#fefefe"
            >
                Parcelas
            </FormLabel>

            <NumberInput
                color="#fefefe"
                onChange={handleChange}
                defaultValue={0}
                min={3}
                max={24}

            >
                <NumberInputField
                    border="none"
                    borderBottom="4px solid #467aeb"

                />

                <NumberInputStepper>
                    <NumberIncrementStepper
                        color="#fefefe"

                        border="none"
                        borderBottom="4px solid #467aeb"

                    />
                    <NumberDecrementStepper
                        color="#fefefe"

                        border="none"

                    />
                </NumberInputStepper>
            </NumberInput>

            <FormHelperText
                color="#fefefe"
            >
                Quantidade de parcelas desejadas
            </FormHelperText>
        </FormControl>
    )
}

export default InputNumber;