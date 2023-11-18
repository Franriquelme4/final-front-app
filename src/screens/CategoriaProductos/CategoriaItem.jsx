import { ArrowForwardIcon, Text, Flex, View, Button } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import { deleteById } from '../../services/categoriasService'

export default function CategoriaItem({ title, id, onDelete }) {
    const navigate = useNavigate();

    // const eliminarCategoria = ()=>{
    //     console.log(id,"id")
    //     deleteById(id);
    // }
    const eliminarCategoria = () => {
        if (onDelete) {
            console.log('deleyte');
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
            <Text fontSize="lg">{title}</Text>
            <Flex>
                <Button mb={1} size='xs' onPress={() => navigate("/categorias/editar/"+id)}>
                    Editar  
                </Button>
                <Button colorScheme='danger' size="xs" onPress={eliminarCategoria}>Eliminar</Button>
            </Flex>
            {/* <View> <Button>Hola</Button></View> */}
        </Flex>
    </View>)

}