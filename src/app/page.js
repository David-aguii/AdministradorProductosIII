"use client";
import axios from "axios";
import "./page.css";
import { useState } from "react";
import { useEffect } from "react";
export default function Home() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [producto, setProducto] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        titulo,
        descripcion,
        precio,
      };

      const response = await axios.post(
        "http://localhost:8000/api/producto",
        data
      );

      if (response.status === 201) {
        window.location.reload();
        setTitulo("");
        setPrecio("");
        setDescripcion("");
        setPrecio("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProducto = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/producto");
      const result = response.data;
      console.log(result);
      setProducto(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducto();
  }, []);
  return (
    <body>
      <form onSubmit={handleSubmit} className="formulario">
        <h1>Product Manager</h1>
        <div className="campo">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Ingrese el título"
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
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Enviar
        </button>
      </form>
      <div className="listado-productos">
        <h1>All Products:</h1>
        {producto.map((item, idx) => {
          return (
            <a href={`producto/${item._id}/`} key={idx}>
              {item.titulo}
            </a>
          );
        })}
      </div>
    </body>
  );
}
