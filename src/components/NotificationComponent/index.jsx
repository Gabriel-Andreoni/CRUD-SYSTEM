import { Text, Box, IconButton, keyframes} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'

const animationNotification = keyframes`
    0% {
        transform: translateX(-50%);
        opacity: 0;
    }

    50% {
        opacity: .5;

    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
    
    `;

const NotificationComponent = ({ text, handleCloseNotification, top, left }) => {

    const animation = `${animationNotification} .3s ease`
    
    return (
        <Box
            w="30%"
            h="20%"

            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"

            position="absolute"
            top={top}
            left={left}

            borderRadius="2xl"

            background="#436ECB"

            animation={animation}

            zIndex="1"
        >
            <IconButton
                position="absolute"
                top="10%"
                right="5%"
                size="sm"
                icon={<CloseIcon
                    color="#000"
                />}
                onClick={handleCloseNotification}
            />
            <Text color="white" fontSize="1.2em">{text}</Text>
        </Box>
    )
}

export default NotificationComponent;