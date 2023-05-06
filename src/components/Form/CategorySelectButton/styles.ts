import styled from "styled-components/native"; // Import styled from styled-components/native
import { RectButton } from "react-native-gesture-handler"; // Import ReactButton from react-native-gesture-handler 
import { Feather } from "@expo/vector-icons"; // Import Feather from @expo/vector-icons
import { RFValue } from "react-native-responsive-fontsize"; // Import RFValue from react-native-responsive-fontsize

export const Container = styled(RectButton).attrs({
    activeOpacity: 0.3
})`
    background-color: ${({ theme }) => theme.colors.shape};
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    padding: 18px 16px;
`;

export const Category = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(20)}px;
`;
