<p align='left'>
    
</p>

# Gallery Project Art Final - Henry

<p align="right">
  
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Horarios y Fechas

El proyecto tendrá una duración máxima de tres semanas. En el caso de que completan todas las tareas antes de dicho lapso podrán avisar a su Instructor para coordinar una fecha de presentación del trabajo (DEMO).

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos articulos de arte disponibles junto con información relevante de los mismos:

- Buscar productos
- Filtrarlos

**Ruta principal**: debe contener

- [ ] Input de búsqueda para encontrar productos por nombre
- [ ] Área donde se verá el listado de productos. Deberá mostrar su:

  - Nombre
  - Serie
  - measures
  - categories
  - price

- [ ] Botones/Opciones para filtrar por categoria
- [ ] Scroll infinito para ir mostrando los siguientes productos, 20 productos por pagina, mostrando los primeros 15 en la primer pagina.

**Ruta de detalle de producto**: debe contener

- sku: "111";
- name:"titulo",
- serie: "test",
- measures: "medidas",
- categories: "",
- price: 100,
- description: "description",
- technique: "tech",
- released:"",
- image:"",

#### Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

**IMPORTANTE**: No está permitido utilizar los filtrados, ordenamientos y paginados brindados por la API externa, todas estas funcionalidades tienen que implementarlas ustedes.

- [ ] **GET /products**:
      Obtener listado de productos
      Debe devolver solo los datos necesarios para la ruta principal
      [{
      name:"titulo",
      serie: "test",
      measures: "medidas",
      categories: "",
      price: 100
      }]
- [ ] **GET /products?name=""**:
      Obtener un listado de los primeros 20 productos que contengan la palabra ingresada
      si no existe ningun producto mostrar un mensaje adecuado

  [{
  idProduct:,
  name:"titulo",
  serie: "test",
  measures: "medidas",
  categories: "",
  price: 100
  }]

  - Si no existe ningún videojuego mostrar un mensaje adecuado

- [ ] **GET /product/{idProduct}**:
      Obtener el detalle de un producto
      Debe traer solo los datos pedidos en la ruta detalle del producto

  {
  idProduct:,
  sku: "111";
  name:"titulo",
  serie: "test",
  measures: "medidas",
  categories: "",
  price: 100,
  description: "description",
  technique: "tech",
  released:"",
  image:"",
  }

- [ ] **GET /categories**:
      Obtener todas las categorias
      [{
      idCategor:,
      name:"titulo",
      }]
- [ ] **POST /product**:
      Recibe los datos recoelctados desde el formulario controlado de la ruta de creacion de productos por body
      Crear un producto en la base de datos

**Json Server**:

Para ejecutar el servidor usan el comando:
npm run server

Las peticiones las pueden hacer a estas rutas:

- **http://localhost:3010/products**
  Devuelve productos con datos necesarios para el home
- **http://localhost:3010/products?q=titulo**
  Devuelve productos que contengan la palabra "titulo" en su nombre
- **http://localhost:3010/products/1**
  Devuelve los detalles del producto
- **http://localhost:3010/categories/**
  Devuelve las categorias
