import React, { useEffect, useState } from 'react';
import { Heading, View, Text, Button, ScrollView } from 'native-base';
import { Link, useNavigate } from 'react-router-native';
import BackToMenu from '../../components/BackToMenu';
import { getClientes, eliminarCliente } from '../../services/clientesService'; 

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      const data = await getClientes();
      setClientes(data || []);
    };

    fetchClientes();
  }, []);

  const handleEliminar = async (id) => {
    await eliminarCliente(id);
    const data = await getClientes();
    setClientes(data || []);
    navigate('/clientes');
  };

  return (
    <ScrollView>
      <View>
        <BackToMenu />
        <Heading>Lista de Clientes</Heading>
        <Button mt={4} colorScheme="primary" onPress={() => navigate('/clientes/agregar')}>
          Agregar Cliente
        </Button>

        <View p={2}>
          {clientes.map((cliente) => (
            <View key={cliente.id} mt={2} border={1} p={2} borderRadius={4}>
              <Text>Nombre: {cliente.nombre}</Text>
              <Text>Apellido: {cliente.apellido}</Text>
              <Text>RUC: {cliente.ruc}</Text>
              <Text>Email: {cliente.email}</Text>
              <Button colorScheme="primary" onPress={() => handleEliminar(cliente.id)} color="red">
                Eliminar
              </Button>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
