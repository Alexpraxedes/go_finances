import styled from "styled-components/native"; // Import styled from styled-components/native
import { RFValue } from "react-native-responsive-fontsize"; // Import RFPercentage and RFValue from react-native-responsive-fontsize
import { Feather } from "@expo/vector-icons"; // Import Feather from @expo/vector-icons
import { BorderlessButton } from "react-native-gesture-handler"; // Import BorderlessButton from react-native-gesture-handler
import { ActivityIndicator } from "react-native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
    align-items: center;
    width: 100%;
`;

export const MonthSelect = styled.View`
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-top: 24px;
    width: 100%;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;