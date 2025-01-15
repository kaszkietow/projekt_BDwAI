import { Button, Card, Input, Stack, Flex, Text, HStack } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useNavigate } from "react-router-dom";
import { Radio, RadioGroup } from "./ui/radio.jsx";
import { PasswordInput } from "./ui/password-input"

const RegisterPage = () => {
    const navigate = useNavigate();

    return (
        <Flex
            height="95vh"
            justifyContent="center"
            alignItems="center"
        >
            <Card.Root width={{ base: "80vw", md: "70vw" }}> {/* Ustawienie szerokości na 50% widoku */}
                <Card.Header>
                    <Text
                        textStyle={{ base: "2xl", md: "4xl" }}
                        color={"teal.500"}
                        fontWeight={"bold"}
                    >
                        Sign Up
                    </Text>
                    <Card.Description>
                        Uzupełnij formularz teraz, aby utworzyć konto.
                    </Card.Description>
                </Card.Header>
                    <Card.Body>
                        <Stack gap="4" w="full">
                            <Field
                                label="Username"
                            >
                                <Input/>
                            </Field>

                            <Field
                                label="Password"
                            >
                                <PasswordInput/>
                            </Field>

                            <Field label="Płeć">
                                <RadioGroup>
                                    <HStack gap="4">
                                        <Radio value="female" variant={"outline"} colorPalette={"teal"}>Kobieta</Radio>
                                        <Radio value="male" variant={"outline"} colorPalette={"teal"}>Mężczyzna</Radio>
                                    </HStack>
                                </RadioGroup>
                            </Field>
                        </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button colorScheme={"gray"} onClick={() => navigate("/")}>CANCEL</Button>
                        <Button  variant="surface" colorPalette={"teal"}>SIGN UP</Button>
                    </Card.Footer>
            </Card.Root>
        </Flex>
    );
};
export default RegisterPage;
