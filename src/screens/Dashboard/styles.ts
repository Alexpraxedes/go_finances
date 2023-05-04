import styled from "styled-components/native"; // Import styled from styled-components/native
import { FlatList } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"; // Import RFPercentage from react-native-responsive-fontsize
import { Feather } from "@expo/vector-icons"; // Importing the Feather icon pack from expo/vector-icons
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper"; // Import getStatusBarHeight from react-native-iphone-x-helper
import { DataListProps } from "."; // Import DataListProps from .

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    height: ${RFPercentage(42)}px;
    width: 100%;
`;

export const UserWrapper = styled.View `
    width: 100%;
    padding: 0 24px;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const UserInfo = styled.View `
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image `
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: ${RFPercentage(10)};
`;

export const User = styled.View `
    margin-left: 17px;
`;

export const UserGreeting = styled.Text `
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text `
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Icon = styled(Feather) `
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
    contentContainerStyle: { paddingHorizontal: 24 },
    showsHorizontalScrollIndicator: false,
    horizontal: true
})`
    margin-top: ${RFPercentage(20)}px;
    position: absolute;
    width: 100%;
`;

export const Transactions = styled.View `
    flex: 1%;
    padding: 0 24px;
    margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text `
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-bottom: 16px;
`;

export const TransactionList = styled(
    FlatList as new () => FlatList<DataListProps>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
    }
})``;