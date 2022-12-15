import FetchComponent from '../../components/FetchComponent';
import Header from './../../components/Header/index';

import { Box } from '@chakra-ui/react'

const RegisteredCars = () => {

    return (
        <>
            <Header />

            <Box
                width='100%'
                height='auto'
                background='#242424'
            >

                <FetchComponent />
            </Box>

        </>


    )
}

export default RegisteredCars;