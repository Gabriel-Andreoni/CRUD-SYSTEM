import { Button } from '@chakra-ui/react';
import theme from './../../theme';

const ButtonContainer = ({ text, event, width}) => {
    return (
        <>
            <Button
                w={width}
                h="20%"

                p="1.5em 1em"


                variant="outline"

                border="4px solid"
                borderColor="#467aeb"
                borderRadius="1em"

                color="#fefefe"

                fontFamily={theme.fonts.heading}
                fontSize="2em"
                fontWeight="normal"

                _hover={{
                    background: "#467aeb68",
                    borderColor: "transparent",
                    transform: 'translateY(-5%)'
                }}

                onClick={event}

            >
                {text}
            </Button>

        </>
    )
}

export default ButtonContainer;