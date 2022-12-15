import { HStack, Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import theme from './../../theme'

const Header = () => {
    return (
        <HStack
            h="20vh"

            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            gap="4em"

            background="#353535"
        >
            <Box>
            <Heading fontFamily={theme.fonts.heading} fontSize="2em" fontWeight="normal" cursor="pointer"><Link to="/registerCars">Cadastrar Veículo</Link></Heading>
            </Box>

            <Box>
            <Heading fontFamily={theme.fonts.heading} fontSize="2em" fontWeight="normal" cursor="pointer"><Link to="/registeredCars">Veículos Cadastrados</Link></Heading>
            </Box>


        </HStack>
    )
}

export default Header;