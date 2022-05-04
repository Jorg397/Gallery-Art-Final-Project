import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterUserState,
  getCustomers,
  searchUserThatContains,
  switchUserState,
} from "../../../redux/actions";
import ModalClient from "./ModalClient";
import NavAdmin from "./NavAdmin";

export default function Clientes() {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const reloadCustomers = () => {
    dispatch(getCustomers());
  };

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const customers = useSelector((state) => state.customers);
  const [name, setName] = useState("");
  let data = customers;

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(searchUserThatContains(e.target.value));
  }

  function handleUserState(e) {
    dispatch(filterUserState(e));
  }

  return (
    <div>
      <NavAdmin></NavAdmin>

      {/* <PostPaint></PostPaint> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "50px",
        }}
      >
        <div
          className=""
          style={{
            backgroundColor: "#9A8C98",
            paddingBottom: "80px",
            width: "1310px",
            borderRadius: "10px",
          }}
        >
          <span
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginLeft: "20px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Clientes
          </span>
          <input
            type="text"
            placeholder="🔍"
            onChange={(e) => handleChange(e)}
            style={{
              width: "300px",
              height: "40px",
              borderRadius: "10px",
              border: "1px solid #9A8C98",
              marginLeft: "500px",
              marginTop: "20px",
              marginBottom: "20px",
              paddingLeft: "10px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#9A8C98",
            }}
          />
          {/* <button className="bg-white border-2" onClick={(e) => handleSearch(e)}>🔍</button> */}
          <select
            onChange={(e) => handleUserState(e.target.value)}
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
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>

          {/* Search bar that filtrates the table */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px ",
              padding: "10px",
            }}
          >
            {/* Returns a table with all the orders */}
            <table style={{ width: "100%", borderRadius: "10px" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#4A4E69",
                    color: "white",
                    textAlign: "left",
                  }}
                >
                  <th>Dni</th>
                  <th>Nombre</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>Direccion</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((e, index) => (
                  <tr
                    key={e.id_customer}
                    className=""
                    style={{
                      backgroundColor: "#C9ADA7",
                      fontWeight: "bold",
                      borderTop: "10px solid #9A8C98",
                    }}
                  >
                    <td>{e.dni}</td>
                    <td>{e.name + " " + e.lastName}</td>
                    <td>{e.phone}</td>
                    <td>{e.email}</td>
                    <td>{e.country + " " + e.billing_address}</td>
                    <td>{e.role}</td>
                    <td>{e.status || "No status model"}</td>
                    <td>
                      <button
                        id={e.id_customer}
                        onClick={(e) => {
                          setModalOpen({
                            [index]: true,
                          });
                        }}
                      >
                        Ver
                      </button>
                      {modalOpen[index] && (
                        <ModalClient
                          customer={e}
                          setOpenModal={setModalOpen}
                          reloadCustomers={reloadCustomers}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
