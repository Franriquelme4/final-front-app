import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCliente = async (cliente) => {
  const newCliente = {
    id: new Date().getTime().toString(),
    ...cliente,
  };

  let clientes = await getData('clientes');
  if (!clientes) {
    clientes = [newCliente];
  } else {
    clientes.push(newCliente);
  }
  await storeData('clientes', clientes);
};

export const getClientes = async () => {
  return await getData('clientes');
};

export const editarCliente = async (cliente) => {
  let clientes = await getClientes();
  if (!clientes) {
    return; // No hay clientes para editar
  }

  const index = clientes.findIndex((c) => c.id === cliente.id);
  if (index !== -1) {
    clientes[index] = cliente;
    await storeData('clientes', clientes);
  }
};

export const getCliente = async (id) => {
  let clientes = await getClientes();
  if (!clientes) {
    return; // No hay clientes
  }

  const index = clientes.findIndex((c) => c.id === id);
  return clientes[index];
};

export const getClienteRuc = async (ruc) => {
  let clientes = await getClientes();
  if (!clientes) {
    return; // No hay clientes
  }

  const index = clientes.findIndex((c) => c.ruc === ruc);
  return clientes[index];
};



export const eliminarCliente = async (id) => {
  let clientes = await getClientes();
  if (!clientes) {
    return;
  }

  clientes = clientes.filter((c) => c.id !== id);
  await storeData('clientes', clientes);
};

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};