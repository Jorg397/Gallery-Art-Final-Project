import React, { useEffect } from 'react'
import "./modal.scss"
import background from "../../../assets/background-cart-modal.png";
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerById } from '../../../redux/actions';
export default function ModalClient({client, setOpenModal, modalState}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCustomerById(client));
    }, [dispatch]);
    const customer = useSelector((state) => state.customer);
    console.log(customer)

  return (
    <div
    className={`flex fixed w-full h-screen z-10 backdrop-blur top-0 left-0 bg-black bg-opacity-50 justify-center items-center ${
      !modalState ? `visible` : `invisible`
    }`}
  >
      <div
        className="cartContainer grid grid-cols-1 grid-rows-5 p-6 bg-white relative h-64 rounded-3xl justify-end text-white bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
          <button className="closeBtn flex items-center justify-center rounded-2xl cursor-pointer" onClick={() => setOpenModal(false)}>
            X 
          </button >
          <form className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mt-24">
                <label className="">
                    Nombre:
                </label>
                <input className=" text-black" type="text" placeholder={customer.name}/>
                <label className="">
                    Apellido:
                </label>
                <input className=" text-black" type="text" placeholder={customer.lastName}/>
                <label className="">
                    E-Mail:
                </label>
                <input className=" text-black" type="text" placeholder={customer.email}/>
                <label className="">
                    Telefono:
                </label>
                <input className=" text-black" type="text" placeholder={customer.phone}/>
                <label className="">
                    DNI:
                </label>
                <input className=" text-black" type="text" placeholder={customer.dni}/>
                <label className="">
                    Rol:
                </label>
                <input className=" text-black" type="text" placeholder={customer.role}/>
                <label className="">
                    Pais:
                </label>
                <input className=" text-black" type="text" placeholder={customer.country}/>
                <label className="">
                    Direccion de facturacion:
                </label>
                <input className=" text-black" type="text" placeholder={customer.default_shipping_address}/>
                <label className="">
                    Direccion de envio:
                </label>
                <input className=" text-black" type="text" placeholder={customer.billing_address}/>
                </div>
                </form>
           </div>
           </div>
  )
}
