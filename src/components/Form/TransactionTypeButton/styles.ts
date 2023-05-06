import styled, { css } from "styled-components/native"; // Import styled from styled-components/native
import { Feather } from "@expo/vector-icons"; // Import Feather from @expo/vector-icons
import { TouchableOpacity } from "react-native"; // Import TouchableOpacity from react-native
import { RFValue } from "react-native-responsive-fontsize"; // Import RFValue from react-native-responsive-fontsize

interface TransactionButtonProps {
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<TransactionButtonProps>`
    justify-content: space-between;
    width: 48%;
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    padding: 18px 16px;
    margin-bottom: 8px;

    border: 1.5px solid ${({ theme }) => theme.colors.text};
    
    ${({ isActive, type }) => isActive && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.success_light};
        border: 1.5px solid ${({ theme }) => theme.colors.success};
    `};

    ${({ isActive, type }) => isActive && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
        border: 1.5px solid ${({ theme }) => theme.colors.attention};
    `};
`;

export const Icon = styled(Feather)<TransactionButtonProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${({ theme, type }) =>
        type === "up" ? theme.colors.success_light : theme.colors.attention_light
    };

    ${({ isActive, type }) => isActive && type === 'up' && css`
        color: ${({ theme }) => theme.colors.success};
    `};

    ${({ isActive, type }) => isActive && type === 'down' && css`
        color: ${({ theme }) => theme.colors.attention};
    `};
`;

export const Title = styled.Text<TransactionButtonProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;

    ${({ isActive, type }) => isActive && type === 'up' && css`
        color: ${({ theme }) => theme.colors.success};
        font-family: ${({ theme }) => theme.fonts.medium};
    `};

    ${({ isActive, type }) => isActive && type === 'down' && css`
        color: ${({ theme }) => theme.colors.attention};
    font-family: ${({ theme }) => theme.fonts.medium};
    `};
`;