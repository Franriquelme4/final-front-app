import React, { useEffect, useState } from 'react';
import { Heading, View, Text, Button, ScrollView } from 'native-base';
import { useNavigate } from 'react-router-native';
import BackToMenu from '../../components/BackToMenu';
import { getVentas } from '../../services/ventasService';

export default function Ventas() {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    (async () => {
      const allVentas = await getVentas();
      if (Array.isArray(allVentas)) { // Check if allVentas is an array
        setVentas(allVentas);
      }
    })();
  }, []);

  return (
    <ScrollView>
      <View>
        <BackToMenu />
        <Heading>Lista de ventas</Heading>
        <Button mt={4} colorScheme="primary" onPress={() => navigate('/ventas/agregar')}>
          Agregar venta
        </Button>

        <View>
          {ventas?.map((venta) => (
            <View key={venta.id} mt={2} borderWidth={1}
              borderRadius={10}
              borderColor='gray.300' p={2}>
              <Text>ID: {venta.id}</Text>
              <Text>RUC: {venta.ruc}</Text>
              <Text>Cantidad de productos: {venta.productos.length}</Text>
              <Text>Total: {venta.total} Gs.</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
