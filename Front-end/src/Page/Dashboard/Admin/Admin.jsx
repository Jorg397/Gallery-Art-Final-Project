import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomers,
  getOrdersForAdmin,
} from "../../../redux/actions/index.js";
import NavAdmin from "./NavAdmin.jsx";
import ModalOrder from "./ModalOrder.jsx";
//JS IMPORTADO DE REPUESTO
/* import orders from "./orders"; */
import axios from "axios";

export default function Admin() {
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const orders = await dispatch(getOrdersForAdmin());

    setOrders(orders);
  };
                                        
  if(localStorage.getItem("role") !== "admin"){
       return <Navigate to="/login" />;
   } 

  /*const getCustomerName = (customerIdCustomer) => {
        let customer = customers?.find((customer) => customer.id_customer === customerIdCustomer);
        return(customer?.name + " " + customer?.lastName) ;
    }*/
  
  useEffect(async () => {
    const orders = await dispatch(getOrdersForAdmin());

    setOrders(orders);

    dispatch(getCustomers());
  }, [dispatch]);

  //Function to get today's date seccionated
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const yyyy = today.getFullYear();

  //function to get the customer name from the customeridCustomer in the order
  const getCustomerName = (customerIdCustomer) => {
    let customer = customers?.find(
      (customer) => customer.id_customer === customerIdCustomer
    );
    return customer?.name + " " + customer?.lastName;
  };

   

  return (
    <div>
      <NavAdmin></NavAdmin>
      <div style={{ margin: "20px" }} />
      <div className="box-border flex flex-col mb-48 items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-1">
        <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-white bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
          <h1
            style={{
              marginBottom: "30px",
              marginLeft: "30px",
              fontSize: "20px",
            }}
          >
            Hola USER es bueno verte
          </h1>
          <img src="https://i.ibb.co/tZPQrXZ/Group-75.png" alt="" />
        </div>
        <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4  bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
          <h1
            style={{
              marginBottom: "8px",
              marginLeft: "0px",
              fontSize: "20px",
              color: "white",
            }}
          >
            Revisa tus pedidos pendientes de envio
          </h1>
          <div
            style={{
              backgroundColor: "#9A8C98",
              paddingBottom: "30px",
              borderRadius: "10px",
            }}
          >
            <h1
              style={{
                color: "black",
                fontWeight: "bolder",
                fontSize: "20px",
                marginTop: "1px",
                marginLeft: "15px",
                padding: "5px",
              }}
            >
              Pedidos pendientes
            </h1>
            <table
              className="table-auto text-center"
              style={{ width: "644px" }}
            >
              <thead
                style={{
                  color: "white",
                  backgroundColor: "#4A4E69",
                }}
              >
                <tr>
                  <th>Boleta</th>
                  <th>Cliente</th>
                  <th>Fecha de compra</th>
                  <th>Estado</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  /* .filter((order) => order.order_status === "Pending") */
                  .map((order, index) => (
                    <tr
                      style={{
                        backgroundColor: "#C9ADA7",
                        fontWeight: "bold",
                        borderTop: "10px solid #9A8C98",
                      }}
                      key={order.id_order}
                    >
                      <td>{order.id_order.slice(0, 8)}</td>
                      <td>{getCustomerName(order.customerIdCustomer)}</td>
                      <td>{order.order_date}</td>
                      <td>{order.order_status}</td>
                      <td>
                        <button
                          onClick={() => {
                            setModalOpen({
                              [index]: true,
                            });
                          }}
                        >
                          Ver y Editar
                        </button>
                        {modalOpen[index] && (
                          <ModalOrder
                            order={order}
                            setOpenModal={setModalOpen}
                            getOrders={getOrders}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <div
              style={{
                backgroundColor: "#9A8C98",
                paddingBottom: "30px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <h1
                style={{
                  color: "black",
                  fontWeight: "bolder",
                  fontSize: "20px",
                  marginTop: "1px",
                  marginLeft: "15px",
                  padding: "5px",
                }}
              >
                Ventas al dia{" "}
              </h1>
              <table
                className="table-auto text-center"
                style={{ width: "644px" }}
              >
                <thead
                  style={{
                    color: "white",
                    backgroundColor: "#4A4E69",
                  }}
                >
                  <tr>
                    <th>Fecha</th>
                    <th>Numero de ventas</th>
                    <th>Importe total vendido</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      backgroundColor: "#C9ADA7",
                      fontWeight: "bold",
                      borderTop: "10px solid #9A8C98",
                    }}
                  >
                    <td>{yyyy + "-" + mm + "-" + dd}</td>
                    <td>
                      {
                        orders.filter(
                          (order) =>
                            order.order_date === yyyy + "-" + mm + "-" + dd
                        ).length
                      }{" "}
                      Ventas.
                    </td>
                    <td>
                      $
                      {orders
                        .filter(
                          (order) =>
                            order.order_date === yyyy + "-" + mm + "-" + dd
                        )
                        .reduce(
                          (total, order) => total + parseInt(order.amount),
                          0
                        )}
                      .00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              style={{
                backgroundColor: "#9A8C98",
                paddingBottom: "30px",
                borderRadius: "10px",
              }}
            >
              <h1
                style={{
                  color: "black",
                  fontWeight: "bolder",
                  fontSize: "20px",
                  marginTop: "1px",
                  marginLeft: "15px",
                  padding: "5px",
                }}
              >
                Ventas del mes
              </h1>
              <table
                className="table-auto text-center"
                style={{ width: "644px" }}
              >
                <thead
                  style={{
                    color: "white",
                    backgroundColor: "#4A4E69",
                    width: "1000px",
                  }}
                >
                  <tr>
                    <th>Mes</th>
                    <th>Numero de ventas</th>
                    <th>Importe total vendido</th>
                  </tr>
                </thead>
                <tbody>
                  {/* returna una suma de todas las ventas hechas el mes de hoy */}
                  <tr
                    style={{
                      backgroundColor: "#C9ADA7",
                      fontWeight: "bold",
                      borderTop: "10px solid #9A8C98",
                    }}
                  >
                    <td>
                      {mm == 5
                        ? "Mayo"
                        : mm == 6
                        ? "Junio"
                        : mm == 7
                        ? "Julio"
                        : mm == 8
                        ? "Agosto"
                        : mm == 9
                        ? "Septiembre"
                        : mm == 10
                        ? "Octubre"
                        : mm == 11
                        ? "Noviembre"
                        : mm == 12
                        ? "Diciembre"
                        : mm == 1
                        ? "Enero"
                        : mm == 2
                        ? "Febrero"
                        : mm == 3
                        ? "Marzo"
                        : "Abril"}
                    </td>
                    <td>
                      {
                        orders.filter(
                          (order) => order.order_date.slice(5, 7) === mm
                        ).length
                      }{" "}
                      Ventas.
                    </td>
                    <td>
                      $
                      {orders
                        .filter((order) => order.order_date.slice(5, 7) === mm)
                        .reduce(
                          (total, order) => total + parseInt(order.amount),
                          0
                        )}
                      .00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
