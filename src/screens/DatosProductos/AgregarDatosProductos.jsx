import React, { useEffect, useState } from 'react'
import BackToMenu from '../../components/BackToMenu'
import { Heading,View,Input,VStack,FormControl,Button ,Select} from 'native-base'
import { getCategoria, saveCategoria } from '../../services/categoriasService';
import { useNavigate } from 'react-router-native';
import { saveProductos } from '../../services/productosService';

const AgregarDatosProductos = () => {
    const [nombreProducto, setNombreProducto] = useState('');
    const [codigoProducto, setCodigoProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [selectedCategoria,setSelectedCategoria] = useState('');
    const [categorias,setCategorias] = useState([]);
    const navigation = useNavigate();

    useEffect(()=>{
      (async ()=>{
        const categorias = await getCategoria();
        setCategorias(categorias)
      }
      )()
    },[])

    const submitForm = async () => {
        await saveProductos({
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
        <Heading>Nuevo Producto</Heading>
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
        <Select placeholder="Elegir Categoria" onValueChange={(categoria) => setSelectedCategoria(categoria)}>
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

export default AgregarDatosProductos