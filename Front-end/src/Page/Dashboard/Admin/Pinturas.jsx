import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaints, filterState, searchAllThatContains } from '../../../redux/actions';
import ModalCat from './ModalCat';
import ModalDesc from './ModalDesc';
import ModalImage from './ModalImage';
import NavAdmin from './NavAdmin'



export default function Pinturas() {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPaints());
  }, [dispatch]);

  const pinturas = useSelector((state) => state.filteredPaints);
  const [name, setName] = useState('');
  let data = pinturas

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(searchAllThatContains(e.target.value));
  }

  function handleSearch(e) {
    e.preventDefault();
    dispatch(searchAllThatContains(name));
    setName("");
  }
  function handleState(e) {
    dispatch(filterState(e));

  }

  function handleModalImage(e) {
    const idP = e.target.id;
    let imageUrl = data.find(p => p.id_product === idP).image;
    console.log(imageUrl);
  }

  return (
    <div>

      <NavAdmin></NavAdmin>
      <div 
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "50px"
        }}

      >


      <div className="" style={{ backgroundColor: "#9A8C98", paddingBottom: "80px", width:"1310px", borderRadius:"10px"}}>
        <span
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >Pinturas</span>
        <input type="text" placeholder="🔍" onChange={(e) => handleChange(e)}
          style={{
            width: "300px",
            height: "40px",
            borderRadius: "10px",
            border: "1px solid #9A8C98",
            marginLeft: "300px",
            marginTop: "20px",
            marginBottom: "20px",
            paddingLeft: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#9A8C98",
          }}
        />
        {/* <button className="bg-white border-2" onClick={(e) => handleSearch(e)}>🔍</button> */}
        <button className="bg-white border-2"
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "20px",
            padding: "5px",
            borderRadius: "10px",
            width: "180px",
            color: "#fff",
            backgroundColor: "#4A4E69",
            border: "1px solid #fff",
          }}
        >Registrar pintura</button>
        <select onChange={(e) => handleState(e.target.value)}
          style={{
            width: "300px",
            height: "40px",
            borderRadius: "10px",
            border: "1px solid #9A8C98",
            marginLeft: "10px",
            marginTop: "20px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#9A8C98",
          }}
        >
          <option value="All">Estado</option>
          <option value="Pending">Pendiente</option>
          <option value="Available">Disponible</option>
          <option value="Sold">Vendido</option>
        </select>

        



        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          {/* Returns a table with all the orders */}
          <table style={{ width: "100%", borderRadius: "10px" }} >
            <thead>
              <tr style={{ backgroundColor: "#4A4E69", color: "white", textAlign:"left"}}>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Técnica</th>
                <th>Medidas</th>
                <th>Descripcion</th>
                <th>Año</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e) => (
                <tr key={e.id_product} className="" style={{ backgroundColor: "#C9ADA7", fontWeight: "bold", borderTop:"10px solid #9A8C98" }} >
                  <td>{e.sku}</td>
                  <td>{e.name}</td>
                  <td>{e.technique}</td>
                  <td>{e.measures}</td>
                  <td><button onClick={() => {
                    setModalOpen(true);
                  }}>Ver</button>
                    {modalOpen && <ModalDesc desc={e.description} setOpenModal={setModalOpen} />}</td>
                  <td>{e.released[0] + e.released[1] + e.released[2] + e.released[3]}</td>
                  <td>
                    <button onClick={() => {
                      setModalOpen(true);
                    }}>Ver</button>
                    {modalOpen && <ModalCat cat={e.categories.map((e) => e.name + " " || e)} setOpenModal={setModalOpen} />}
                  </td>
                  <td>${e.price}</td>
                  <td><button id={e.id_product} onClick={(e) => {
                    const idP = e.target.id
                    handleModalImage(e)
                    setModalOpen(true);
                    
                  }}>Ver</button>
                    {modalOpen && <ModalImage img={e.image} setOpenModal={setModalOpen} />}</td>
                  <td>
                    <button><img src="https://i.ibb.co/g762MvW/update-arrow-svgrepo-com-1.png" alt="" style={{ width: "30px" }} /></button>
                  </td>
                  <td>
                    <button ><img src="https://i.ibb.co/9bXyDbb/delete-svgrepo-com-1.png" alt="" style={{ width: "30px" }} /></button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        </div>
      </div>
    </div>
  )
}
