import React from "react"
import { View } from "native-base"
import { SafeAreaView } from "react-native"
import { Routes,Route } from "react-router-native"
import Home from "./src/screens/Home"
import CategoriaProductos from "./src/screens/CategoriaProductos/CategoriaProductos"
import DatosProductos from "./src/screens/DatosProductos/DatosProductos"
import Ventas from "./src/screens/Ventas/Ventas"
import Clientes from "./src/screens/Clientes/Clientes"

export default Main = ()=>{
    return (
        <SafeAreaView>
            <View px={5}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/categorias' element={<CategoriaProductos/>}/>
                    <Route path='/datos-productos' element={<DatosProductos/>}/>
                    <Route path='/clientes' element={<Clientes/>}/>
                    <Route path='/ventas' element={<Ventas/>}/>
                </Routes>
            </View>
        </SafeAreaView>
    )
}