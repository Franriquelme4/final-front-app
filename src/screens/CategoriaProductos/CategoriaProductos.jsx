import { Button, View, Heading, Text, ScrollView, VStack } from "native-base";
import React, { useEffect, useState } from 'react'
import BackToMenu from '../../components/BackToMenu'
import { useNavigate } from "react-router-native";
import { getCategoria } from "../../services/categoriasService";
import CategoriaItem from "./CategoriaItem";

const CategoriaProductos = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      console.log('se monto')
      async function fetchCategorias() {
          const categoriasData = await getCategoria();
          if (categoriasData) {
              setCategorias(categoriasData);
          }
      }
      fetchCategorias();
  }, []); // Se ejecutará solo una vez al montar el componente


  const handleDeleteCategoria = async (id) => {
      await deleteById(id);
      const updatedCategorias = await getCategoria();
      setCategorias(updatedCategorias);
  }

  return (
    <View>
      <BackToMenu></BackToMenu>
      <Heading>Categorias de productos</Heading>
      <View p={2}>
            <Button rounded borderRadius={2} onPress={() => navigate('/categorias/agregar')}>
                Agregar Categoria
            </Button>
        </View>
        <View>
            <ScrollView>
                {categorias.length > 0 && (
                    <View space={2} mt="5">
                        {categorias.map((categoria) => (
                            <View>
                                   <CategoriaItem title={categoria.nombre} id={categoria.id} onDelete={() => handleDeleteCategoria(categoria.id)}></CategoriaItem>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    </View>
  )
}

export default CategoriaProductos