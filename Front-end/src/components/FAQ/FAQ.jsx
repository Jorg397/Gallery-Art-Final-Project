import React from 'react'
import NavBar from '../NavBar/NavBar'

export default function FAQ() {
    return (    
        <div>

        <NavBar></NavBar>

        <section style={{paddingTop:"150px"}} class="relative py-16 min-w-screen animation-fade animation-delay">
            <div class="container px-0 px-8 mx-auto sm:px-12 xl:px-5">
                <p class="text-xs font-bold text-left text-white uppercase sm:mx-6 sm:text-center sm:text-normal sm:font-bold">
                    Tienes una pregunta? Tenemos respuestas.
                </p>
                <h3 class="mt-1 text-2xl font-bold text-left text-white sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
                    Preguntas Altamente Frecuentes
                </h3>
                <div class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
                    <h3 class="text-lg font-bold text-gray-700 sm:text-xl md:text-2xl">Cómo funciona la compra?</h3>
                    <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                        Decides en cualquier parte de la pagina la obra que te guste, la añades al carrito y luego la puedes comprar con tu tarjeta de credito o debito, seleccionas una direccion de envio y una forma del mismo y listo. Un email llegara a tu cuenta con los datos de la compra y una factura.
                    </p>
                </div>
                <div class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
                    <h3 class="text-lg font-bold text-gray-700 sm:text-xl md:text-2xl">Cómo se si un producto esta disponible?</h3>
                    <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                        Nuestros productos se encuentran actualizados a tiempo real, si un producto no esta disponible en el momento que lo solicitas, te avisaremos.
                    </p>
                </div>
                <div class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
                    <h3 class="text-lg font-bold text-gray-700 sm:text-xl md:text-2xl">Cómo cambio mis datos de usuario o envio?</h3>
                    <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                        Puedes cambiar tus datos facilmente en la seccion de mi cuenta, en la seccion de mis pedidos y en la seccion de mis direcciones. Cuanquiel consulta contacta con nosotros.
                    </p>
                </div>
                <div class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
                    <h3 class="text-lg font-bold text-gray-700 sm:text-xl md:text-2xl">Cómo hago si olvide mi usuario y contraseña?</h3>
                    <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                        Si olvidaste tu usuario o contraseña, puedes recuperarla en la seccion de recuperar contraseña que se encuentra en el formulario de inicio de sesion.
                        Tambien podras logearte con tu cuenta de Google.
                    </p>
                </div>
            </div>
        </section>
        </div>

    )
}
