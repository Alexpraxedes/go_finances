import React, { useState } from "react"; // Importing React and useState
import { 
    Modal, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from "react-native"; // Importing Modal from react-native
import * as Yup from "yup"; // Importing Yup
import { yupResolver } from "@hookform/resolvers/yup"; // Importing yupResolver from @hookform/resolvers/yup
import { useForm } from "react-hook-form"; // Importing useForm from react-hook-form

import { 
    Container,
    Header,
    Title,
    Form, 
    Fields,
    TransactionsTypes
} from "./styles"; // Importing the styled components
import { InputForm } from "../../components/Form/InputForm"; // Importing the Input component
import { Button } from "../../components/Form/Button"; // Importing the Button component
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton"; // Importing the TransactionTypeButton component
import { CategorySelectButton } from "../../components/Form/CategorySelectButton"; // Importing the CategorySelect component
import { CategorySelect } from '../CategorySelect'; // Importing the CategorySelect component

interface FormData {
    name: string;
    amount: string;
};

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('Preço é obrigatório')
});

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });
    const [transactionType, setTransactionType] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm(
        { resolver: yupResolver(schema) }
    );

    function handleTransactionsTypeSelect(type: "up" | "down") {
        setTransactionType(type);
    };

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    };

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    };

    function handleRegister(form: any) {
        if (!transactionType)
            return Alert.alert('Selecione o tipo da transação');

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria');

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        };

        console.log(data);
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm 
                            name="name"
                            control={control}
                            placeholder="Nome" 
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message as string}
                        />
                        <InputForm 
                            name="amount"
                            control={control}
                            placeholder="Preço" 
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message as string}
                        />

                        <TransactionsTypes>
                            <TransactionTypeButton 
                                type="up"
                                title="Income"
                                onPress={() => handleTransactionsTypeSelect('up')}
                                isActive={transactionType === 'up'}
                            />
                            <TransactionTypeButton 
                                type="down"
                                title="Outcome"
                                onPress={() => handleTransactionsTypeSelect('down')}
                                isActive={transactionType === 'down'}
                            />
                        </TransactionsTypes>

                        <CategorySelectButton 
                            title={category.name} 
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>

                    <Button 
                        title="Enviar" 
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect 
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
};
