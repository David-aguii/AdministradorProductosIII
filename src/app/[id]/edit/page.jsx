'use client'
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import '../../page.css'
import React from 'react'
import axios from 'axios';
const page = () => {
  const { id } = useParams();
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [precio, setPrecio] = useState();
  const getOneProducto = async()=>{
    axios.get('http://localhost:8000/api/producto/' + id)
          .then(res => {
              setTitulo(res.data.titulo);
              setDescripcion(res.data.descripcion);
              setPrecio(res.data.precio);
          })
  }
  useEffect(() => {
      getOneProducto();
  }, [])
  const updateProduct =  async (e) => {
      e.preventDefault();
      axios.put('http://localhost:8000/api/producto/' + id, {
          titulo,
          descripcion,
          precio
      })
          .then(res => console.log(res));
  }

  return (
    <div>
        <form onSubmit={updateProduct} className="formulario">
        <h1>Edit Product</h1>
        <div className="campo">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder={"Ingrese el título"}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Ingrese la descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="precio">Precio:</label>
          <input
            id="precio"
            name="precio"
            placeholder="Ingrese el precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Enviar
        </button>
      </form>
    </div>
  )
}

export default page
