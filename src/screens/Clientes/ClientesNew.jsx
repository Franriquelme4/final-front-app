import React, { useState } from 'react';
import { Heading, View, FormControl, Input, Button, VStack } from 'native-base';
import BackToMenu from '../../components/BackToMenu';
import { saveCliente } from '../../services/clientesService'; // Importa la función para guardar clientes
import { useNavigate } from 'react-router-native';

export default function ClienteNew() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ruc, setRuc] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigate();

  const submitForm = async () => {
    const cliente = {
      nombre,
      apellido,
      ruc,
      email,
    };
    await saveCliente(cliente); // Usa la función saveCliente para guardar el cliente
    navigation('/clientes');
  };

  return (
    <View>
      <BackToMenu />
      <Heading>Agregar Cliente</Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Nombre</FormControl.Label>
          <Input value={nombre} onChangeText={(text) => setNombre(text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Apellido</FormControl.Label>
          <Input value={apellido} onChangeText={(text) => setApellido(text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>RUC</FormControl.Label>
          <Input value={ruc} onChangeText={(text) => setRuc(text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input value={email} onChangeText={(text) => setEmail(text)} />
        </FormControl>
        <Button mt="2" onPress={submitForm}>
          Guardar
        </Button>
      </VStack>
    </View>
  );
}