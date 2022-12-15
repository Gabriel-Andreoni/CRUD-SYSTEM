import Header from "../../components/Header";

import { FormControl, Stack } from "@chakra-ui/react";

import FormCars from "../../components/FormCars";


const RegisterCars = () => {

    return (
        <>
            <Header />
            <Stack
                w="100%"
                h="80vh"

                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="4em"

                background="#242424"
                
            >

                <FormControl>
                    <FormCars />
                </FormControl>
            </Stack>
        </>
    )
}

export default RegisterCars;