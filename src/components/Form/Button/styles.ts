import styled from "styled-components/native"; // Import styled from styled-components/native
import { RectButton } from "react-native-gesture-handler"; // Import ReactButton from react-native-gesture-handler 
import { RFValue } from "react-native-responsive-fontsize"; // Import RFValue from react-native-responsive-fontsize

export const Container = styled(RectButton)`
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