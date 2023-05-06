import styled from "styled-components/native"; // Import styled from styled-components/native
import { RFValue } from "react-native-responsive-fontsize"; // Import RFValue from react-native-responsive-fontsize

export const Container = styled.View`
    width: 100%;
`;

export const Error = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.attention};
    font-size: ${RFValue(12)}px;
    margin-bottom: 12px;
`;