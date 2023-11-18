import React, { useEffect, useState } from 'react';
import { Heading, View, FormControl, Input, Button, VStack } from "native-base"
import BackToMenu from "../../components/BackToMenu"
import { editCategoria, getCategoria, getCategoriaById, getData, saveCategoria } from '../../services/categoriasService';
import { useNavigate, useParams } from 'react-router-native';

const EditarCategoriasProductos = () => {
    const [categoryName, setCategoryName] = useState('');
    const { id } = useParams();
    const navigation = useNavigate(); 

    useEffect(() => {
        // Cargar la categoría actual utilizando el ID cuando el componente se monta
        loadCategoria();
    }, [id]);

    const loadCategoria = async () => {
        try {
            // Obtener la categoría por ID
            const categoria = await getCategoriaById(id);
            // Establecer el nombre de la categoría en el estado
            setCategoryName(categoria.nombre);
        } catch (error) {
            console.error('Error al cargar la categoría:', error);
        }
    };
    const submitForm = async () => {
        await editCategoria({id,nombre:categoryName})
       navigation("/categorias");
    }
    return <View>
        <BackToMenu></BackToMenu>
        <Heading>Editar Categoria</Heading>
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
}

export default EditarCategoriasProductos