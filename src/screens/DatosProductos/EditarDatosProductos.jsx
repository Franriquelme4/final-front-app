
import React, { useEffect, useState } from 'react'
import BackToMenu from '../../components/BackToMenu'
import { Heading,View,FormControl,Button,VStack ,Input,Select} from 'native-base'
import { useNavigate, useParams } from 'react-router-native'
import { editProducto, getProductoById } from '../../services/productosService'
import { editCategoria, getCategoria } from '../../services/categoriasService'

const EditarDatosProductos = () => {
  const { id } = useParams();
  const [nombreProducto, setNombreProducto] = useState('');
  const [codigoProducto, setCodigoProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const navigation = useNavigate();
  useEffect(() => {
    loadProducto();
  }, [])

  const loadProducto = async () => {
    const categorias = await getCategoria();
    const producto = await getProductoById(id);
    console.log(producto)
    setCategorias(categorias);
    setNombreProducto(producto.nombre);
    setCodigoProducto(producto.codigo);
    setPrecioProducto(producto.precio);
    setSelectedCategoria(producto.categoria);
  }

  const submitForm = async () => {
    await editProducto({
      id:id,
      nombre:nombreProducto,
      codigo:codigoProducto,
      precio:precioProducto,
      categoria:selectedCategoria
    });
    navigation("/datos-productos");
  
}



  return (
    <View>
      <BackToMenu></BackToMenu>
      <Heading>Editar Productos</Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Nombre </FormControl.Label>
          <Input value={nombreProducto}
            onChangeText={(text) => setNombreProducto(text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Codigo </FormControl.Label>
          <Input value={codigoProducto}
            onChangeText={(text) => setCodigoProducto(text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Precio </FormControl.Label>
          <Input value={precioProducto}
            onChangeText={(text) => setPrecioProducto(text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Categoria</FormControl.Label>
          <Select placeholder="Elegir Categoria" onValueChange={(categoria) => setSelectedCategoria(categoria)} selectedValue={selectedCategoria}>
            {categorias.map(categoria => <Select.Item label={categoria.nombre} value={categoria.id} />)}
          </Select>
        </FormControl>

        <Button mt="2" onPress={submitForm} >
          Guardar
        </Button>
      </VStack>

    </View>
  )
}

export default EditarDatosProductos