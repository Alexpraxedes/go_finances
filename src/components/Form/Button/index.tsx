import React from "react"; // Importing React
import { RectButtonProps } from "react-native-gesture-handler"; // Importing the RectButtonProps interface from react-native-gesture-handler
import { Container, Title } from "./styles"; // Importing the styled components

interface Props extends RectButtonProps{
    title: string;
    onPress: () => void;
}

export function Button({ title, onPress, ...rest }: Props) {
    return (
        <Container onPress={onPress} {...rest}>
            <Title>{title}</Title>
        </Container>
    );
};