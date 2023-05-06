import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.secondary};
    width: 100%;
    border-radius: 5px;
    align-items: center;
    padding: 18px 16px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(14)}px;
`;