import React from "react"
import { View } from "native-base"
import { SafeAreaView } from "react-native"
import { Routes,Route } from "react-router-native"
import Home from "./src/screens/Home"
import CategoriaProductos from "./src/screens/CategoriaProductos/CategoriaProductos"
import DatosProductos from "./src/screens/DatosProductos/DatosProductos"
import Ventas from "./src/screens/Ventas/Ventas"
import Clientes from "./src/screens/Clientes/Clientes"
import AgregarCategoriasProductos from "./src/screens/CategoriaProductos/AgregarCategoriasProductos"
import EditarCategoriasProductos from "./src/screens/CategoriaProductos/EditarCategoriasProductos"
import AgregarDatosProductos from "./src/screens/DatosProductos/AgregarDatosProductos"
import EditarDatosProductos from "./src/screens/DatosProductos/EditarDatosProductos"
import ClienteNew from './src/screens/Clientes/ClientesNew';

export default Main = ()=>{
    return (
        <SafeAreaView>
            <View px={5}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/categorias' element={<CategoriaProductos/>}/>
                    <Route path='/categorias/agregar' element={<AgregarCategoriasProductos/>}/>
                    <Route path='/categorias/editar/:id' element={<EditarCategoriasProductos/>}/>
                    <Route path='/datos-productos' element={<DatosProductos/>}/>
                    <Route path="/clientes/agregar" element={<ClienteNew />} />
                    <Route path='/datos-productos/agregar' element={<AgregarDatosProductos/>}/>
                    <Route path='/datos-productos/editar/:id' element={<EditarDatosProductos/>}/>
                    <Route path='/clientes' element={<Clientes/>}/>
                    <Route path='/ventas' element={<Ventas/>}/>
                </Routes>
            </View>
        </SafeAreaView>
    )
}