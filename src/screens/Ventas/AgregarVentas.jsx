import React, { useEffect, useState } from 'react'
import BackToMenu from '../../components/BackToMenu'
import { Heading,View,Input,VStack,FormControl,Button ,Select, Text} from 'native-base'
import { useNavigate } from 'react-router-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getClientes } from '../../services/clientesService';
import { getProductoById, getProductos } from '../../services/productosService';
import { saveVentas } from '../../services/ventasService';

const AgregarVentas = () => {
    const [fecha, setFecha] = useState(new Date());
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState();
    const [selectedProducts, setSelectedProducts] = useState([{
        id: '',
        cantidad: 0
    }]);

    const [total, setTotal] = useState(0);

    const navigation = useNavigate();

    useEffect(() => {
        (async () => {
            const allClients = await getClientes();
            setClientes(allClients);
            const allProducts = await getProductos();
            setProductos(allProducts);
        })();
    }, []);

    const handleSubmit = async () => {
        await saveVentas({
            ruc: selectedCliente,
            fecha: fecha,
            productos: selectedProducts,
            total: total
        });

        navigation('/ventas');
    };

    const handleChangeProduct = (i, product) => {
        const newSelectedProducts = [...selectedProducts];
        
        newSelectedProducts[i] = {
            id: product,
            cantidad: newSelectedProducts[i].cantidad
        };

        setSelectedProducts(newSelectedProducts);
    }

    const handleChangeQuantity = async (i, cantidad) => {
        
        const newSelectedProducts = [...selectedProducts];
        
        newSelectedProducts[i] = {
            id: newSelectedProducts[i].id,
            cantidad: +cantidad
        };
        
        setSelectedProducts(newSelectedProducts);

        if(+cantidad < 1) return;
        
        let totalPrice = 0;

        for (selectedProduct of newSelectedProducts){
            const product = await getProductoById(selectedProduct.id);
            if(product.precio){
                totalPrice += ((+product.precio) * selectedProduct.cantidad);
            }
        }

        setTotal(totalPrice);
    }

  return (
    <View>
        <BackToMenu></BackToMenu>
        <Heading>Registrar venta</Heading>
        <VStack space={3} mt="5">

        <FormControl>
            <FormControl.Label>Cliente</FormControl.Label>
            <Select placeholder="Elegir cliente" onValueChange={(cliente) => setSelectedCliente(cliente)}>
                {clientes.map(cliente => <Select.Item label={cliente.nombre} value={cliente.ruc} />)}
            </Select>
        </FormControl>

        <FormControl>
            <FormControl.Label>Fecha</FormControl.Label>
            <DateTimePicker value={fecha} onChange={(e,selectedDate) => setFecha(selectedDate)}/>
        </FormControl>

        {selectedProducts.map((product, i) => {
            return <FormControl key={i}>
                <FormControl.Label>Producto {i+1}</FormControl.Label>
                <Select placeholder="Elegir producto" onValueChange={(product) => handleChangeProduct(i, product)} selectedValue={product.id}>
                    {productos.map(producto => <Select.Item label={producto.nombre} value={producto.id} />)}
                </Select>
                <Input placeholder='Cantidad' value={product.cantidad}
                    onChangeText={(text) => handleChangeQuantity(i, text)} mt={3} />
            </FormControl>
        })}



        <Button variant='outline' onPress={() => setSelectedProducts([...selectedProducts, {id: '', cantidad: 0}])}>Agregar producto</Button>

        <Text>Total: {total} Gs.</Text>

        <Button mt="5" onPress={handleSubmit}>
          Guardar
        </Button>
      </VStack>
    </View>
  )
}

export default AgregarVentas