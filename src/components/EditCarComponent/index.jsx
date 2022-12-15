import { useState } from 'react'
import { useForm } from 'react-hook-form';

import { Container, Box, FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react';

import { IconButton } from '@chakra-ui/react'

import theme from '../../theme';

import { CloseIcon } from '@chakra-ui/icons';
import InputNumber from './../InputNumber/index';
import ButtonContainer from './../ButtonContainer/index';
import axios from 'axios';
import NotificationComponent from '../NotificationComponent';

const baseURL = 'http://localhost:3000/cars'

const EditCarComponent = ({ handleCloseEditComponent }) => {
    const [newParcela, setNewParcela] = useState({})
    const [editComplet, setEditComplete] = useState(false) 
    const { register, getValues } = useForm();

    const handleParcelasEdit = (quantParcelas) => {
        let novaParcelaEdit = { ...newParcela, quantParcelas };
        setNewParcela(novaParcelaEdit);
    }

    const handleEditCars = () => {
        const ID = getValues("ID");
        const newNameCar = getValues("newModel");
        const newValorCar = getValues("valorCarro");
        const newnEntrada = getValues("valorEntrada");
        const { quantParcelas } = newParcela;

        const newValorEntradaCarro = newValorCar - newnEntrada;
        const newValorParcelas = newValorEntradaCarro / quantParcelas;

        axios.put(`${baseURL}/${ID}`, {
            vehicle: newNameCar,
            carPrice: newValorCar,
            entrance: newnEntrada,
            installments: newValorParcelas.toFixed(2)
        })
        .then(() => setEditComplete(true))
    }


    const handleCloseEditNotification = () => {
        setEditComplete(false)
    }

    return (
        <Container
            maxWidth='100%'
            height='70vh'

            display='flex'
            justifyContent='space-between'
            alignItems='center'

            background='#4e4e4e'

            position='absolute'
            top='5%'

            borderRadius='2xl'
        >
            <Box
                width='100%'

                padding="1em"

                display="flex"
                flexDirection="row"
                flexWrap="wrap"

                justifyContent="space-between"
                alignItems="center"
                rowGap="2em"
                columnGap='2em'
            >

                <FormControl
                    w="40%"
                    h="fit-content"
                >
                    <FormLabel
                        fontFamily={theme.fonts.heading}
                        fontSize="1.5em"
                        color="#fefefe"
                    >
                        ID do veículo
                    </FormLabel>

                    <Input
                        color="#fefefe"

                        _focus={{
                            borderColor: "#467aeb"
                        }}
                        type="text"
                        {...register("ID")}
                        border="none"
                        borderBottom="4px solid #467aeb"
                    />

                    <FormHelperText
                        fontFamily={theme.fonts.body}
                        color="#fefefe"
                    >
                        ID do veículo desejado
                    </FormHelperText>
                </FormControl>
                <FormControl
                    w="40%"
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
                        {...register("newModel")}
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
                    w="40%"
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
                    w="40%"
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
                    width="40%"
                >
                    <InputNumber quantParcelas={handleParcelasEdit} />
                </FormControl>

                <IconButton
                    icon={<CloseIcon />}

                    position='absolute'
                    top='5%'
                    right='3%'

                    background="#467aeb"

                    onClick={handleCloseEditComponent}
                />

                <Box
                    width='40%'

                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                >
                    <ButtonContainer
                        text='Alterar dados'
                        event={handleEditCars}

                        width="100%"
                    />
                </Box>
            </Box>

            {editComplet && <NotificationComponent
                text="Dados alterados com sucesso"
                handleCloseNotification={handleCloseEditNotification}
                
                top="-3%"
                left="-15%"
            />}
        </Container>
    )
}

export default EditCarComponent;