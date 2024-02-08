'use client'
import React from 'react'
import axios from "axios";
import "../page.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
const page = () => {
    const [titulo, setTitulo] = useState('');
    const router = useRouter()
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const {id}=useParams()
  
    const getOneProducto= async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/producto/${id}`);
        const result = response.data;
        setPrecio(result.precio);
        setDescripcion(result.descripcion);
        setTitulo(result.titulo)
        console.log(result)
      } catch (error) {
        console.log(error);
      }
    };
    const deleteOneProducto = async () => {
      try {
        const response = await axios.delete(`http://localhost:8000/api/producto/${id}`);
        const result = response.data;
        router.push("/")
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getOneProducto()
    }, [id]);

 
  return (
    <div className='detalles-producto'>
        <h2>{titulo}</h2>
        <h4>Precio: {precio}</h4>
        <h4>Descripcion: {descripcion}</h4>
        <button className='delete'onClick={(e)=>deleteOneProducto()} >Delete</button>
    </div>
    
  )
}

export default page
