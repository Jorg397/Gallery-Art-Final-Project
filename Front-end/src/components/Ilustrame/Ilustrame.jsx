import React from 'react'

export default function Ilustrame() {
    return (
        <section className="w-full pt-7 pb-7 md:pt-20 md:pb-24">
            <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">


                <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
                    <img src="https://i.ibb.co/ccCKLh4/img.png" className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "/>
                </div>


                <div className="box-border order-first w-full text-white border-solid md:w-1/2 md:pl-10 md:order-none">
                    <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                        Ilustracion perfecta
                    </h2>
                    <p className="pt-4 pb-8 m-0 leading-7 text-white-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de
                    </p>
                    <button type="button" className="py-2.5 px-5 p-1 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-gray-600 rounded-lg border border-gray-200 hover:bg-gray-500 hover:text-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Saber mas</button>

                </div>
                

            </div>
        </section>

    )
}
