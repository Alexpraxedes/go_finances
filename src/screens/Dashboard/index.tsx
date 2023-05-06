import React, { useCallback, useEffect, useState } from "react"; // Importing React, useEffect and useState
import { useFocusEffect } from "@react-navigation/native"; // Importing the useFocusEffect hook from @react-navigation/native
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing the AsyncStorage library
import { HighlightCard } from "../../components/HighlightCard"; // Importing the HighlightCard component
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard"; // Importing the TransactionCard component
import {
  Container, 
  Header, 
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from "./styles"; // Importing the styled components

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      }
    );

    setData(transactionsFormatted);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/Alexpraxedes.png'}}/>
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Alex Praxedes</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power"/>
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard 
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard 
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard 
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item: { id: string; }) => item.id}
          renderItem={
            ( {item} : { item: DataListProps }) => <TransactionCard data={item} />
          }
        />
      </Transactions>
    </Container>
  )
}