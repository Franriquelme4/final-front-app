import { View,Flex ,Text,Button} from 'native-base'
import React from 'react'

const DatosProductosItem = ({id,nombre,codigo,precio,onDelete}) => {
    const eliminarProducto = () => {
        if (onDelete) {
            onDelete(id);
        }
    }
    return (<View mt={1}>
        <Flex
            p={2}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            borderWidth={1}
            borderRadius={10}
            borderColor='gray.300'
        >
            <View>
            <Text fontSize="lg">{nombre}</Text>
            <Text >Codigo : {codigo}</Text>
            <Text >Precio: {precio} Gs.</Text>
            </View>
            <Flex>
                <Button mb={1} size='xs' onPress={() => navigate("/datos-productos/editar/"+id)}>
                    Editar  
                </Button>
                <Button colorScheme='danger' size="xs" onPress={eliminarProducto}>Eliminar</Button>
            </Flex>
            {/* <View> <Button>Hola</Button></View> */}
        </Flex>
    </View>)
}

export default DatosProductosItem