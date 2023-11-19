import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveProductos = async (producto) => {
  const newProducto = {
    id: new Date().getTime().toString(),
    ...producto,
  };

  let productos = await getData();
  if (!productos) {
    productos = [newProducto];
  } else {
    productos.push(newProducto);
  }
  await storeData(productos);
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('productos', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getProductos= async () => await getData();

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('productos');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const deleteProductoById = async (id) => {
  try {
    let productos = await getData();
    if (productos) {
      productos = productos.filter((producto) => producto.id !== id);
      await storeData(productos);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getProductoById = async (id)=>{
  try {
    const productos = await getData();
    const producto = productos.find((producto) =>{
      if (producto.id == id) {
        return producto
      }
    });
    return producto || {};
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const editProducto = async (editedProducto) => {
  try {
    let productos = await getData();
    if (productos) {
      const index = productos.findIndex(
        (producto) => producto.id == editedProducto.id
      );

      console.log(index,"index");

      if (index !== -1) {
        productos[index] = editedProducto;
        await storeData(productos);
      }
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};