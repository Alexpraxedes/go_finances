import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native";
import styled from "styled-components/native";

export const Container = styled(TextInput).attrs({
    placeholderTextColor: '#969CB2'
    })`
    background-color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${RFValue(14)}px;
    padding: 16px 18px;
    border-radius: 5px;
    margin-bottom: 8px;
    width: 100%;
`;