import React, { useCallback, useEffect, useState } from "react"; // Importing React, useEffect and useState
import { useFocusEffect } from "@react-navigation/native"; // Importing the useFocusEffect hook from @react-navigation/native
import { ActivityIndicator } from "react-native"; // Importing the ActivityIndicator component from react-native
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing the AsyncStorage library

import { useTheme } from "styled-components"; // Importing the useTheme hook from styled-components
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
  LogoutButton,
  LoadContainer
} from "./styles"; // Importing the styled components

function getLastTransactionDate(
  collection: DataListProps[],
  type: 'positive' | 'negative'
) {
  const lastTransaction = new Date(
    Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())
    )
  );

  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
}

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;
    
    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
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
    }); 
    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
    const totalInterval = lastTransactionExpensives === 'Não há transações' ? 'Não há transações' : `01 a ${lastTransactionExpensives}`;
    
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`
      },
      total: {
        amount: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    });

    setIsLoading(false);
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
      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator
            color={useTheme().colors.primary}
            size="large"
          />
        </LoadContainer> :
  
        <>
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
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard 
              type="down"
              title="Saídas"
              amount={highlightData.expensive.amount}
              lastTransaction={highlightData.expensive.lastTransaction}
            />
            <HighlightCard 
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>
    
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item: { id: string; }) => item.id}
              renderItem={
                ( {item} : { item: DataListProps }) => <TransactionCard data={item} />
              }
            />
          </Transactions>
        </>
      }
    </Container>
  )
}