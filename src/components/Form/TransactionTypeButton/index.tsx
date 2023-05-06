import React from "react"; // Importing React
import { RectButtonProps } from "react-native-gesture-handler"; // Importing the RectButtonProps interface from react-native-gesture-handler
import { Container, Icon, Title } from "./styles"; // Importing the styled components

interface Props extends RectButtonProps{
    type: "up" | "down";
    isActive: boolean;
    title: string;
};

const icons = {
    down: "arrow-down-circle",
    up: "arrow-up-circle"
};

export function TransactionTypeButton(
    { title, type, isActive, ...rest }: Props) {
        
    return (
        <Container 
            isActive={isActive}
            type={type}
            { ...rest }
        >
            <Icon 
                isActive={isActive}
                name={icons[type]}
                type={type}
            />
            <Title
                isActive={isActive}
                type={type}
            >
                {title}
            </Title>
        </Container>
    );
};
