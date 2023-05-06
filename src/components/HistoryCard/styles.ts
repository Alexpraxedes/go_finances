import styled from "styled-components/native"; // Import styled from styled-components/native
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"; // Import RFPercentage and RFValue from react-native-responsive-fontsize

interface ContainerProps {
    color: string;
}

export const Container = styled.View<ContainerProps>`
    background-color: ${({ theme }) => theme.colors.shape};
    border-left-color: ${({ color }) => color};
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    border-left-width: 5px;
    border-radius: 5px;
    padding: 13px 24px;
    margin-bottom: 8px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;

`;

export const Amount = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
`;