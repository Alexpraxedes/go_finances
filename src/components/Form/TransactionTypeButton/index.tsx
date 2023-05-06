import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

interface Props extends TouchableOpacityProps{
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
