import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveVentas = async (venta) => {
  const newVenta = {
    id: new Date().getTime().toString(),
    ...venta,
  };

  let ventas = await getData();
  if (!ventas) {
    ventas = [newVenta];
  } else {
    ventas.push(newVenta);
  }
  await storeData(ventas);
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('ventas', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getVentas = async () => await getData();

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('ventas');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};