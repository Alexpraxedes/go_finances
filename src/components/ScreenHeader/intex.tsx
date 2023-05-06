import React from "react"; // Importing React
import { 
    Container,
    Header,
    Title
} from "./styles"; // Importing the styled components

interface Props {
    title: string;
};

export function ScreenHeader({ title }: Props) {
    return (
        <Container>
            <Header>
                <Title>{title}</Title>
            </Header>
        </Container>
    );
};