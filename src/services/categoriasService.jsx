// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveCategoria = async(value)=>{
    const newCategoria = {
        id: new Date().getTime(),
        nombre:value
    }
    let categorias = await getData();
    if (!categorias) {
        categorias = [newCategoria]
    }else{
        categorias.push(newCategoria);
    }
    // console.log(categorias,"Categorias");
   await storeData(categorias);
}

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('categoria', jsonValue);
    } catch (e) {
        console.log(e);
      // saving error
    }
  };

  export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('categoria');
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e);
    }
  };

  export const getCategoria = async () => {
    return await getData();
  }

  export const deleteById = async (id) => {
    try {
      let categorias = await getData();
      if (categorias) {
        categorias = categorias.filter((categoria) => categoria.id !== id);
        await storeData(categorias);
      }
    } catch (e) {
      console.log(e);
    }
  };


  export const getCategoriaById = async (id) => {
    try {
      const categorias = await getData();
      const categoria = categorias.find((categoria) =>{
        if (categoria.id == id) {
          return categoria
        }
       
      });
      return categoria || {};
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  export const editCategoria = async (editedCategoria) => {
    try {
      let categorias = await getData();
      if (categorias) {
        const index = categorias.findIndex(
          (categoria) => categoria.id == editedCategoria.id
        );
  
        if (index !== -1) {
          categorias[index] = editedCategoria;
          await storeData(categorias);
        }
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  };