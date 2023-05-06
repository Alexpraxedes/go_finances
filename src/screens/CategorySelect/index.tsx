import React from "react";
import { 
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer
} from "./styles";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import { FlatList } from "react-native";

interface Category {
    key: string;
    name: string;
}

interface CategorySelectProps {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
} : CategorySelectProps) {
    function handleCategorySelect(category: Category) {
        setCategory(category);
    }

    return(
        <Container>
            <Header>
                <Title>Categorias</Title>
            </Header>

            <FlatList 
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button 
                    title="Selecionar" 
                    onPress={closeSelectCategory}
                />                   
            </Footer>
        </Container>
    );
};