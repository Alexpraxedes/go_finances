import React, { useEffect, useState } from "react"; // Importing React and useState hook from react package
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing the AsyncStorage package
import { VictoryPie } from "victory-native"; // Importing the VictoryPie component from victory-native
import { RFValue } from "react-native-responsive-fontsize"; // Importing the RFValue function from react-native-responsive-fontsize package
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"; // Importing the useBottomTabBarHeight hook from @react-navigation/bottom-tabs package
import { addMonths, subMonths, format } from "date-fns"; // Importing the addMonths, subMonths and format functions from date-fns package
import { ptBR } from "date-fns/locale"; // Importing the ptBR object from date-fns/locale package
import { ActivityIndicator } from "react-native"; // Importing the ActivityIndicator component from react-native
import { useTheme } from "styled-components"; // Importing the useTheme hook from styled-components package
import { 
    Container,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadContainer
} from "./styles"; // Importing the styled components
import { ScreenHeader } from "../../components/ScreenHeader/intex"; // Importing the ScreenHeader component
import { HistoryCard } from "../../components/HistoryCard"; // Importing the HistoryCard component
import { categories } from "../../utils/categories"; // Importing the categories array

interface TransactionData {
    type: "positive" | "negative";
    name: string;
    amount: string;
    category: string;
    date: string;
};

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
};

export function Resume() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);

    function handleDateChange(action: "next" | "prev") {
        setIsLoading(true);
        if (action === "next") {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }
    
    async function loadData() {
        const dataKey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        const expenses = transactions
            .filter((expense: TransactionData) => 
                expense.type === "negative" &&
                new Date(expense.date).getMonth() === selectedDate.getMonth() &&
                new Date(expense.date).getFullYear() === selectedDate.getFullYear()
            );

        const totalExpenses = expenses.reduce(
            (accumulator: number, expense: TransactionData) => {
                return accumulator + Number(expense.amount);
            }, 0
        );

        const totalByCategory: CategoryData[] = [];

        categories.forEach((category) => {
            let categorySum = 0;

            expenses.forEach((expense: TransactionData) => {
                if (expense.category === category.key) {
                    categorySum += Number(expense.amount);
                }
            });

            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString(
                    "pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }
                );

                const percent = `${(categorySum / totalExpenses * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    color: category.color,
                    totalFormatted,
                    percent
                });
            }

        });

        setTotalByCategory(totalByCategory);
        setIsLoading(false);
    }

    useEffect(() => {
        loadData();
    }, [selectedDate]);

    return (
        <Container>
            <ScreenHeader title="Resumo por categoria" />  
            {
                isLoading ?
                <LoadContainer>
                    <ActivityIndicator
                        color={useTheme().colors.primary}
                        size="large"
                    />
                </LoadContainer> :
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: useBottomTabBarHeight(),
                        paddingHorizontal: 24
                    }}
                >
                    <MonthSelect>
                        <MonthSelectButton
                            onPress={() => handleDateChange("prev")}
                        >
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>

                        <Month>
                            {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
                        </Month>

                        <MonthSelectButton
                            onPress={() => handleDateChange("next")}
                        >
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelect>

                    <ChartContainer>
                        <VictoryPie
                            data={totalByCategory}
                            x="percent"
                            y="total"
                            colorScale={totalByCategory.map((category) => category.color)}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: "bold",
                                    fill: useTheme().colors.shape
                                }
                            }}
                            labelRadius={50}
                        />
                    </ChartContainer>

                    {totalByCategory.map((item) => (
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.totalFormatted}
                            color={item.color}
                        />
                    ))}
                </Content>
            }
        </Container>
    );
}