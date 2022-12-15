import { useState } from 'react';
import axios from 'axios';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import { Container, Box } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import ButtonContainer from './../ButtonContainer/index';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import EditCarComponent from './../EditCarComponent/index';
import NotificationComponent from './../NotificationComponent/index';

const URLbase = `http://localhost:3000/cars`;

const FetchComponent = () => {
    const [data, setData] = useState([]);

    const [isFetching, setIsFetching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [deletNotifications, setDeletNotifications] = useState(false);

    const handleAPI = () => {
        const baseURL = `http://localhost:3000/cars`;

        axios.get(baseURL)
            .then((response) => {
                setData(response.data)
                setIsFetching(true);
            })
            .catch((error) => console.log(error.message));

        setIsFetching(false);
    }


    const handleEditCar = () => {
        setIsEditing(true);
    }


    const handleCloseEditComponent = () => {
        setIsEditing(false); // FUNÇÃO PASSADA POR PROP PARA FECHAR O MODAL DO EDIT COMPONENT
    }

    const handleCloseNotification = () => {
        setDeletNotifications(false); // FUNÇÃO PASSADA POR PROP PARA FECHAR O MODAL DO COMPONENTE DE NOTIFICAÇÃO
    }

    return (
        <Container
            maxWidth='70%'

            display="flex"
            justifyContent='center'
            alignItems='center'
            flexDirection='column'

            position='relative'
        >

            <Box
                width='80%'

                display='flex'
                justifyContent='center'
                alignItems='center'
                gap='1em'


                padding='2em'
            >
                <ButtonContainer
                    event={handleAPI}
                    text="Listar carros"

                    width="100%"
                />
            </Box>

            {isFetching && (
                <TableContainer
                    width='100%'
                    height='auto'

                    marginBottom='2em'
                    padding='4em'

                    background='#fefefe20'
                    color='#fefefe'
                >
                    <Table size='xl' variant='unstyled'>
                        <Thead>
                            <Tr>
                                <Th color='#fefefe'>ID</Th>
                                <Th color='#fefefe'>Veículo</Th>
                                <Th color='#fefefe'>Valor</Th>
                                <Th color='#fefefe'>Entrada</Th>
                                <Th color='#fefefe'>Parcelas</Th>
                                <Th textAlign='center'>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((cars) => {
                                let carPriceNumber = Number(cars.carPrice).toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                });

                                let carEntranceNumber = Number(cars.entrance).toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                });

                                let carInstallmentsNumber = Number(cars.installments).toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                });

                                return (
                                    <Tr key={cars.id}>
                                        <Td>{cars.id}</Td>
                                        <Td>{cars.vehicle}</Td>
                                        <Td>{carPriceNumber}</Td>
                                        <Td>{carEntranceNumber}</Td>
                                        <Td>{carInstallmentsNumber}</Td>

                                        <Td padding='.5em' display='flex' justifyContent='center' alignItems='center' gap='1em'>
                                            <IconButton
                                                background='#467aebd3'
                                                icon={<EditIcon
                                                    onClick={handleEditCar}
                                                />} />

                                            <IconButton
                                                background='#da2c2cd2'
                                                icon={<DeleteIcon
                                                    onClick={() => {
                                                        setDeletNotifications(true);

                                                        axios.delete(`${URLbase}/${cars.id}`)
                                                            .then(() => setDeletNotifications(true));
                                                    }}
                                                />}
                                            />
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>

                    {deletNotifications && <NotificationComponent
                        text="Dado excluído com sucesso"
                        handleCloseNotification={handleCloseNotification}
                        
                        top="2%"
                        left="-20%"
                    />}
                </TableContainer>
            )}

            {isEditing && <EditCarComponent handleCloseEditComponent={handleCloseEditComponent} />}
        </Container>
    )
}

export default FetchComponent;