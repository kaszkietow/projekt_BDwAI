import {Box, Container, Flex, Heading} from "@chakra-ui/react";

const Navbar = () => {
    return (
        <Container maxW={"1200px"}>
            <Box
                px={3}
                my={3}
            >
                <Flex
                display={{base:"none", sm:"flex"}}
                justifyContent="center"
                alignItems="center"
                bg={"gray.700"}
                height={"13vh"}
                w="100%"
                borderRadius={5}
                >
                    <Heading
                        size="4xl"
                        textAlign="center"
                    >
                        WITAMY NA STRONIE Z SUPER FURAMI 🚗
                    </Heading>
                </Flex>
            </Box>
        </Container>
    );
};
export default Navbar;