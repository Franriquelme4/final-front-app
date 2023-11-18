import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackToMenu from '../../components/BackToMenu'
import { Button, Heading, ScrollView } from 'native-base'
import { useNavigate } from 'react-router-native'
import { deleteProductoById, getProductos } from '../../services/productosService'
import DatosProductosItem from './DatosProductosItem'

const DatosProductos = () => {
  const [productos, setProductos] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const prod = await getProductos;
  //     setProductos(prod);
  //     console.log(productos);
  //   })()
  // }, []);

  useEffect(() => {
    console.log('se monto')
    async function fetchProductos() {
        const data = await getProductos();
        if (data) {
            setProductos(data);
        }
    }
    fetchProductos();
}, []); // Se ejecutará solo una vez al montar el componente

  const navigate = useNavigate();

  const handleDeleteProducto = async (id) => {
    await deleteProductoById(id);
    const updatedProductos = await getProductos();
    setProductos(updatedProductos);
}
  return (
    <View>
      <BackToMenu></BackToMenu>
      <Heading>Productos</Heading>
      <View p={2}>
        <Button rounded borderRadius={2} onPress={() => navigate('/datos-productos/agregar')}>
          Agregar Producto
        </Button>
      </View>
      <View>
        <ScrollView>
          {productos.length > 0 && (
            <View space={2} mt="5">
              {productos.map((producto)=>(
                <View>
                  <DatosProductosItem nombre={producto.nombre} id={producto.id} codigo={producto.codigo} precio={producto.precio} onDelete={() => handleDeleteProducto(producto.id)}></DatosProductosItem>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

export default DatosProductos