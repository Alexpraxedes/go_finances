import React from "react"; // Importing React and useState hook from react package

import { 
    Container,
    Title,
    Amount
} from "./styles"; // Importing the styled components

interface Props {
    title: string;
    amount: string;
    color: string;
};

export function HistoryCard({ title, amount, color }: Props) {
    return (
        <Container color={color}>
            <Title>{title}</Title>
            <Amount>{amount}</Amount>
        </Container>
    );
};