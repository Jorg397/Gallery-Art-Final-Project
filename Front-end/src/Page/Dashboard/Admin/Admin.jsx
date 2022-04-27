import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, getOrders } from '../../../redux/actions/index.js';
import NavAdmin from './NavAdmin.jsx'
import Table from './Table.jsx';
import ModalOrder from './ModalOrder.jsx';

export default function Admin() {
    const orders = useSelector((state) => state.orders);
    const customers = useSelector((state) => state.customers);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getCustomers());
    }, [dispatch]);


    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    const yyyy = today.getFullYear();
    // console.log(mm)

    //function to get the customer name from the customerIdCustomer in the order
    const getCustomerName = (customerIdCustomer) => {
        let customer = customers?.find((customer) => customer.id_customer === customerIdCustomer);
        return(customer?.name + " " + customer?.lastName) ;
    }
    
      
    return (
        <div>
            <NavAdmin></NavAdmin>

            <div style={{ margin: "20px", }} />
            <div className="box-border flex flex-col mb-48 items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-1">
                <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-white bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
                    <h1 style={{ marginBottom: "30px", marginLeft: "30px", fontSize: "20px" }}>Hola USER es bueno verte</h1>
                    <img src="https://i.ibb.co/Fn4SJrj/Group-60-1.png" alt="" />
                </div>

                <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-white bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2" >
                    <h1 style={{ marginBottom: "8px", marginLeft: "0px", fontSize: "20px" }}>Revisa tus pedidos pendientes de envio</h1>

                    <div style={{ backgroundColor: "#9A8C98", paddingBottom: "30px", borderRadius: "10px" }}>
                        <h1 style={{ color: "black", fontWeight: "bolder", fontSize: "20px", marginTop: "1px", marginLeft: "15px", padding: "5px" }}>Pedidos pendientes</h1>
                        <table className="table-auto" >
                            <thead style={{ color: "white", backgroundColor: "#4A4E69" }}>
                                <tr>
                                    <th className="">Boleta</th>
                                    <th className="">Cliente</th>
                                    <th className="">Fecha de compra</th>
                                    <th className="">Estado</th>
                                </tr>
                            </thead>



                            <tbody >
                                {orders.filter(order => order.order_status === "Pending").map((order) => (
                                    <tr key={order.id_order}>
                                        {/* <td className="" style={{fontSize:"12px"}}>{order.id_order}</td> */}
                                        <td> <a href="#">Ver</a></td>
                                        <td className="">{getCustomerName(order.customerIdCustomer)}</td>                                     
                                        <td className="">{order.order_date}</td>                                        
                                        <td className="">{order.order_status}</td>
                                        <td><button onClick={() => {
                    setModalOpen(true);
                  }}>Ver</button>
                    {modalOpen && <ModalOrder order={order} setOpenModal={setModalOpen} />}</td>
                  
                                    </tr>
                                ))} 

                            </tbody>
                        </table>



                    </div>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <div style={{ backgroundColor: "#9A8C98", paddingBottom: "30px", borderRadius: "10px", marginBottom: "20px" }}>
                            <h1 style={{ color: "black", fontWeight: "bolder", fontSize: "20px", marginTop: "1px", marginLeft: "15px", padding: "5px" }}>Ventas al dia </h1>
                            <table className="table-auto" >
                                <thead style={{ color: "white", backgroundColor: "#4A4E69" }}>
                                    <tr>
                                        <th className="">Fecha</th>
                                        <th className="">Numero de ventas</th>
                                        <th className="">Importe vendido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {/* returna una suma de todas las ventas hechas el dia de hoy */}
                                    <tr>
                                        <td className="">{yyyy + "-" + mm + "-" + dd}</td>
                                        <td className="">{orders.filter(order => order.order_date === yyyy + "-" + mm + "-" + dd).length}</td>
                                        <td className="">{orders.filter(order => order.order_date === yyyy + "-" + mm + "-" + dd).reduce((total, order) => total + parseInt(order.amount), 0)}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div style={{ backgroundColor: "#9A8C98", paddingBottom: "30px", borderRadius: "10px" }}>
                            <h1 style={{ color: "black", fontWeight: "bolder", fontSize: "20px", marginTop: "1px", marginLeft: "15px", padding: "5px" }}>Ventas del mes</h1>
                            <table className="table-auto" >
                                <thead style={{ color: "white", backgroundColor: "#4A4E69" }}>
                                    <tr>
                                        <th className="">Mes</th>
                                        <th className="">Numero de ventas</th>
                                        <th className="">Importe vendido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* returna una suma de todas las ventas hechas el mes de hoy */}
                                    <tr>
                                        <td className="">{mm}</td>
                                        <td className="">{orders.filter(order => order.order_date.slice(5, 7) === mm).length}</td>
                                        <td className="">{orders.filter(order => order.order_date.slice(5, 7) === mm).reduce((total, order) => total + parseInt(order.amount), 0)}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

