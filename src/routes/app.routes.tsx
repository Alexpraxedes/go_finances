import React from "react"; // Importing React
import { Platform } from "react-native"; // Importing Platform from react-native
import { MaterialIcons } from "@expo/vector-icons"; // Importing the MaterialIcons component from @expo/vector-icons
import { useTheme } from "styled-components"; // Importing the useTheme hook from styled-components
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Importing the createBottomTabNavigator function from @react-navigation/bottom-tabs
import { Dashboard } from "../screens/Dashboard"; // Importing the Dashboard component
import { Register } from "../screens/Register"; // Importing the Register component

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88
                }
            }}
        >
            <Screen 
                name="Home" 
                component={Dashboard} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    ))                       
                }}
            />
            <Screen 
                name="Lançamentos" 
                component={Register} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="attach-money"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name="Resumo" 
                component={Register} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="pie-chart"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </Navigator>
    );
}