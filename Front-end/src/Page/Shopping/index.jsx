import React from "react";
import { Navigate,Link } from "react-router-dom";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { toast } from "react-toastify";

import NavBar from "../../components/NavBar/NavBar";
import tableIcons from "../../assets/icons/tableIcons";
import imgShopping from "../../assets/imgShopping.png";
import { filterData } from "../../utils/filter/filter";
import { getOrders } from "../../redux/actions";
import "./style.scss";

const Shopping = () => {
  const defaultMaterialTheme = createTheme();
  const Copy = tableIcons.Copy;
  const dispatch = useDispatch();
  const orders= useSelector(state => state.orders);
  const [data, setData] = React.useState([]);
  const [filterState, setFilterState] = React.useState("all");
  const ordersFilter = filterData(orders, filterState);
  if (localStorage.getItem("token") === null && localStorage.getItem("id_customer") === null) {
    return <Navigate to="/login" />;
  }

  const dataProducts = [
    {
      id_product: "1d6cfbe2-6086-4568-a380-a270868bc582",
      name: "pintura 1",
      price: "100",
    },
    {
      id_product: "1d6cfbe2-6086-4568-a380-a270868bc583",
      name: "pintura 1",
      price: "200",
    },
  ];
  const rowData = [
    {
      companySend: "Serpots",
      order_date: "2022-12-23",
      order_status: "created",
      id_order: 5615145155,
      codeSend: "123456789",
      amount: "300",
    },
    {
      companySend: "DHL",
      order_date: "2022-12-23",
      order_status: "created",
      id_order: 5615145156,
      codeSend: "123456790",
      amount: "300",
    },
    {
      companySend: "DHL",
      order_date: "2022-12-23",
      order_status: "created",
      id_order: 5615145157,
      codeSend: "123456791",
      amount: "300",
    },
    {
      companySend: "DHL",
      order_date: "2022-12-23",
      order_status: "complete",
      id_order: 5615145158,
      codeSend: "123456792",
      amount: "300",
    },
    {
      companySend: "DHL",
      order_date: "2022-12-23",
      order_status: "created",
      id_order: 5615145159,
      codeSend: "123456793",
      amount: "300",
    },
    {
      companySend: "Olva C.",
      order_date: "2022-12-23",
      order_status: "complete",
      id_order: 5615145160,
      codeSend: "123456794",
      amount: "300",
    },
  ];
  const columns = [
    { title: "Boleta", field: "id_order", align: "left",
    render: (rowData) => {
      let code = rowData.id_order.slice(0, 8);
      return (
        <p>{code}</p>
      )
    } },
    {
      title: "N° envio",
      field: "companySend",
      render: (rowData) => (
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            width: "165px",
          }}
        >
          <p>
            {rowData.codeSend} {rowData.companySend}
            {
              rowData.codeSend !== null && <span onClick={()=>{
                navigator.clipboard.writeText(rowData.codeSend);
                return toast.success("Copiado numero de envio");
              }}>
              <Copy />
            </span>
            }
          </p>
        </div>
      ),
    },
    { title: "Fecha p.", field: "order_date", align: "left" },
    {
      title: "Estado",
      field: "order_status",
      lookup: { Created: "creado", Delivered: "entregado",Pending: "pendiente"},
      align: "left",
    },
  ];
  React.useEffect(() => {
    dispatch(getOrders(localStorage.getItem("id_customer")));
  },[]);
  return (
    <div className="shopping">
      <NavBar />
      <div className="shopping__container">
        {/* <h1 className="shopping__container__title">Mis compras</h1> */}
        <div className="shopping__container__body">
          <div className="shopping__container__body-img">
            <img src={imgShopping} />
          </div>
          <div className="shopping__container__body-data">
            <div className="shopping__table">
              <div className="shopping__table-header">
                <h1>Mis Compras</h1>
                <select
                  onChange={(e) => {
                    console.log("valor filter ", e.target);
                    setFilterState(() => e.target.value);
                  }}
                >
                  <option key={1} value="all">todo</option>
                  <option key={2} value="Created">creado</option>
                  <option key={3} value="Delivered">entregado</option>
                  <option key={4} value="Pending">pendiente</option>
                </select>
              </div>
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  icons={tableIcons}
                  data={ordersFilter}
                  columns={columns}
                  title="Mis compras"
                  style={{
                    backgroundColor: "#9A8C98",
                    width: "100%",
                    color: "#fff",
                    padding: "1rem",
                    borderRadius: "10px",
                  }}
                  options={{
                    toolbar: false,
                    pageSize: 4,
                    pageSizeOptions: [4, 10, 20],
                    headerStyle: {
                      position: "sticky",
                      textAlign: "left",
                      top: "0",
                      color: "#fff",
                      fontWeight: "bold",
                      fontFamily: "mulish",
                      fontSize: "1rem",
                      border: "0px",
                      background: "#4A4E69",
                      fontWeight: "700",
                      zIndex: "9",
                    },
                    rowStyle: {
                      fontFamily: "mulish",
                      fontSize: "0.875rem",
                      fontWeight: "700",
                      border: "0px",
                      color: "#22223B",
                      background: "#C9ADA7",
                      height: "30px",
                    },
                  }}
                  // other props
                  detailPanel={[
                    {
                      icon: tableIcons.Add,
                      openIcon: tableIcons.Less,
                      tooltip: "Ver mas detalle",
                      render: (rowData) => {
                        return (
                          <div
                            style={{
                              fontSize: "15px",
                              padding: "10px 5px",
                              fontFamily: "mulish",
                              fontWeight: "400",
                              textAlign: "left",
                              display: "flex",
                              justifyContent: "left",
                              color: "#22223b",
                              background: "#fff",
                            }}
                          >
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <p styles={{ color: "#fff" }}>
                                      Productos comprados
                                    </p>
                                  </td>
                                </tr>
                                {rowData.products.map((product,index) => {
                                  let idproduct = product.id_product.slice(-3);
                                  return (
                                    <tr key={index}>
                                      <td>codigo: {idproduct}</td>
                                      <td>nombre: <Link className="product-order underline text-indigo-300" to={`/details/${product.id_product}`}>{product.name}</Link>-----</td>
                                      <td>
                                        <strong>
                                          precio: S/. {product.price}
                                        </strong>
                                      </td>
                                    </tr>
                                  );
                                })}
                                <tr>
                                  <td>
                                    <p styles={{ color: "#fff" }}>
                                      Importe pagado: S/. {rowData.amount}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        );
                      },
                    },
                  ]}
                />
              </ThemeProvider>
            </div>
            {console.log("ordersFilter", ordersFilter)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
