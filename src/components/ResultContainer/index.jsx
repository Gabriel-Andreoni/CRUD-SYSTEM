import axios from 'axios';
import { Stack, Box, Heading, Text, IconButton, keyframes } from '@chakra-ui/react';

import { useContext, useState } from 'react'

import theme from '../../theme';

import ButtonContainer from './../ButtonContainer/index';
import NotificationComponent from '../NotificationComponent';
import { CarsData } from './../../contexts/carsData';

import { CloseIcon } from '@chakra-ui/icons';


const animationKeyFrames = keyframes`
    0% {
        transform: translateY(5%);
        opacity: 0;
    }

    100% {
        transform: translateY(0%);
        opacity: 1;
    }
`;

const ResultContainer = ({ modeloDesc, valorDesc, entradaDesc, parcelasDesc, valorParcelas, handleOnClose }) => {
    const [IsOpen, setIsOpen] = useState(false)

    const animation = `${animationKeyFrames} .3s ease`;

    const { cars } = useContext(CarsData);

    const handleAPI = () => {
        axios.post('http://localhost:3000/cars', {
            vehicle: cars.vehicle,
            carPrice: cars.price,
            entrance: cars.entrancePrice,
            installments: cars.installments
        })
            .then((response) => console.log(response), setIsOpen(true))
            .catch((error) => console.log(error));
    }

    const closeNotification = () => { // FUNÇÃO PASSADA POR PROP PARA FECHAR O MODAL DE NOTIFICAÇÃO
        setIsOpen(false)
    }

    return (
        <Stack
            position="absolute"
            top="-5%"

            w="100%"
            h="70vh"

            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="2em"

            animation={animation}
        >
            <Box
                width="70%"
                height="70vh"

                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2em"

                background="#353535"

                borderRadius="2xl"
                zIndex="1"
            >
                <IconButton
                    position="absolute"
                    top="5%"
                    right="17%"
                    background="#467aeb"
                    _hover={{
                        background: "#467aebd3"
                    }}
                    _active={{
                        background: "#467aebac"
                    }}
                    aria-label="close Modal"
                    icon={<CloseIcon />}
                    onClick={handleOnClose} // EVENTO PARA FECHAR O MODAL
                />
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1.5em"
                    color="#fefefe"
                    padding="2em"
                >
                    <Heading
                        fontFamily={theme.fonts.heading}
                        fontWeight="normal"
                        fontSize="3em"
                    >
                        {modeloDesc}
                    </Heading>
                    <Text fontFamily={theme.fonts.body} fontSize="1.6em">{valorDesc}</Text>
                    <Box
                        display="flex"
                        gap="2em">
                        <Text fontFamily={theme.fonts.body} fontSize="1.3em">Parcelas de {valorParcelas} em {parcelasDesc}X</Text>
                        <Text fontFamily={theme.fonts.body} fontSize="1.3em">Entrada de {entradaDesc}</Text>
                    </Box>
                </Box>
                <ButtonContainer text="Cadastrar Carro" event={handleAPI} />
            </Box>

            {IsOpen && <NotificationComponent text='Carro cadastrado com sucesso' handleCloseNotification={closeNotification}
                top="-5%"
                left="2%"
            />}
        </Stack>

    )
}

export default ResultContainer;