import React, { useState } from 'react';
import { Heading, Text, View, FormControl, Stack, Input, Button, VStack } from "native-base"
import BackToMenu from "../../components/BackToMenu"
import { getCategoria, getData, saveCategoria } from '../../services/categoriasService';
import { useNavigate } from 'react-router-native';



const AgregarCategoriasProductos = () => {
    const [categoryName, setCategoryName] = useState('');
    const navigation = useNavigate();
    const submitForm = async () => {
      if (categoryName != "") {
        await saveCategoria(categoryName);
        navigation("/categorias");
      }
    }
  return (
    <View>
        <BackToMenu></BackToMenu>
        <Heading>Nueva Categoria</Heading>
        <View>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Nombre de la Categoria </FormControl.Label>
          <Input value={categoryName}
            onChangeText={(text) => setCategoryName(text)} />
        </FormControl>
        <Button mt="2" onPress={submitForm} >
          Guardar
        </Button>
      </VStack>
    </View>
    </View>
  )
}

export default AgregarCategoriasProductos