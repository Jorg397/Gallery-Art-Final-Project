--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6
-- Dumped by pg_dump version 13.6

-- Started on 2022-04-21 20:14:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 632 (class 1247 OID 69857)
-- Name: enum_orders_order_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_orders_order_status AS ENUM (
    'Created',
    'Pending',
    'Delivered'
);


ALTER TYPE public.enum_orders_order_status OWNER TO postgres;

--
-- TOC entry 635 (class 1247 OID 69864)
-- Name: enum_products_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_products_state AS ENUM (
    'Available',
    'Pending',
    'Sold'
);


ALTER TYPE public.enum_products_state OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 69871)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id_category integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 69877)
-- Name: categories_id_category_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_category_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_category_seq OWNER TO postgres;

--
-- TOC entry 3062 (class 0 OID 0)
-- Dependencies: 201
-- Name: categories_id_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_category_seq OWNED BY public.categories.id_category;


--
-- TOC entry 202 (class 1259 OID 69879)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id_customer uuid NOT NULL,
    "fullName" character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone integer,
    country character varying(255),
    default_shipping_address character varying(255),
    billing_address character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 69885)
-- Name: models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.models (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.models OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 69888)
-- Name: models_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.models_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.models_id_seq OWNER TO postgres;

--
-- TOC entry 3063 (class 0 OID 0)
-- Dependencies: 204
-- Name: models_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.models_id_seq OWNED BY public.models.id;


--
-- TOC entry 205 (class 1259 OID 69890)
-- Name: order_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_product (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "orderIdOrder" uuid NOT NULL,
    "productIdProduct" uuid NOT NULL
);


ALTER TABLE public.order_product OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 69893)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id_order uuid NOT NULL,
    amount numeric(8,2) NOT NULL,
    order_date date NOT NULL,
    order_status public.enum_orders_order_status DEFAULT 'Created'::public.enum_orders_order_status NOT NULL,
    observation character varying(255),
    shipping_address character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "customerIdCustomer" uuid
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 69900)
-- Name: product_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_category (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "productIdProduct" uuid NOT NULL,
    "categoryIdCategory" integer NOT NULL
);


ALTER TABLE public.product_category OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 69903)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id_product uuid NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    technique character varying(255) NOT NULL,
    measures character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    price integer NOT NULL,
    serie character varying(255) NOT NULL,
    sku character varying(255) NOT NULL,
    released date NOT NULL,
    state public.enum_products_state DEFAULT 'Available'::public.enum_products_state NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sellerIdSeller" uuid
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 69910)
-- Name: sellers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sellers (
    id_seller uuid NOT NULL,
    "fullName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone integer NOT NULL,
    country character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.sellers OWNER TO postgres;

--
-- TOC entry 2891 (class 2604 OID 69916)
-- Name: categories id_category; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id_category SET DEFAULT nextval('public.categories_id_category_seq'::regclass);


--
-- TOC entry 2892 (class 2604 OID 69917)
-- Name: models id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.models ALTER COLUMN id SET DEFAULT nextval('public.models_id_seq'::regclass);


--
-- TOC entry 3047 (class 0 OID 69871)
-- Dependencies: 200
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id_category, name, description) FROM stdin;
1	Minimalista\n	pintura minimalista
2	Paisajes	pintura paisajes
3	Abstracto	pintura abstracta
4	Otra Categoria	Otra Categoria
5	Retratos	retratos
\.


--
-- TOC entry 3049 (class 0 OID 69879)
-- Dependencies: 202
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id_customer, "fullName", email, password, phone, country, default_shipping_address, billing_address, "createdAt", "updatedAt") FROM stdin;
34887623-9f65-4408-9bd0-4d49701a6f45	\N	test@gmail.com	$2b$10$1DpNqbOH7z3TPXMDOh9wzeAQHqNp1Hr6q2PAz.vsyKH1VVmep453a	\N	\N	\N	\N	2022-04-17 21:20:24.503+00	2022-04-17 21:20:24.503+00
3a7c9555-9523-4de6-8906-ed7b99892baa	\N	hagitorremacedo@gmail.com	$2b$10$udd.9ukV0z8IZSfFDCztJ.FqZBdG9fsUqvWV3jtpS/gY1EsdhB/Ba	\N	\N	\N	\N	2022-04-20 22:20:03.824+00	2022-04-20 22:20:03.824+00
\.


--
-- TOC entry 3050 (class 0 OID 69885)
-- Dependencies: 203
-- Data for Name: models; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.models (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3052 (class 0 OID 69890)
-- Dependencies: 205
-- Data for Name: order_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_product ("createdAt", "updatedAt", "orderIdOrder", "productIdProduct") FROM stdin;
\.


--
-- TOC entry 3053 (class 0 OID 69893)
-- Dependencies: 206
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id_order, amount, order_date, order_status, observation, shipping_address, "createdAt", "updatedAt", "customerIdCustomer") FROM stdin;
\.


--
-- TOC entry 3054 (class 0 OID 69900)
-- Dependencies: 207
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_category ("createdAt", "updatedAt", "productIdProduct", "categoryIdCategory") FROM stdin;
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc582	1
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc586	1
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc583	3
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc587	5
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc582	2
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc586	4
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc583	2
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc587	3
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc585	3
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc585	5
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc584	2
2014-06-26 08:37:31+00	2014-06-26 08:37:31+00	1d6cfbe2-6086-4568-a380-a270868bc584	4
\.


--
-- TOC entry 3055 (class 0 OID 69903)
-- Dependencies: 208
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id_product, name, description, technique, measures, image, price, serie, sku, released, state, "createdAt", "updatedAt", "sellerIdSeller") FROM stdin;
1d6cfbe2-6086-4568-a380-a270868bc582	pintura 1	desription de prueba1	oleo	1m	http://lh6.ggpht.com/HlgucZ0ylJAfZgusynnUwxNIgIp5htNhShF559x3dRXiuy_UdP3UQVLYW6c=w454-h300-n-l64	100	1	111	2022-04-14	Available	2022-04-14 09:07:31+00	2022-04-14 09:07:31+00	feb54fcc-1433-41f0-810a-4612d3bf7fdd
1d6cfbe2-6086-4568-a380-a270868bc583	pintura 2	desription de prueba2	oleo	1m	https://ichef.bbci.co.uk/news/800/cpsprodpb/787D/production/_121254803_gettyimages-534228980.jpg.webp	100	2	111	2022-04-14	Available	2022-04-14 09:07:31+00	2022-04-14 09:07:31+00	feb54fcc-1433-41f0-810a-4612d3bf7fdd
1d6cfbe2-6086-4568-a380-a270868bc584	pintura 3	desription de prueba3	oleo	1m	https://ichef.bbci.co.uk/news/800/cpsprodpb/D830/production/_121244355_gettyimages-534251738.jpg.webp	100	3	111	2022-04-14	Available	2022-04-14 09:07:31+00	2022-04-14 09:07:31+00	feb54fcc-1433-41f0-810a-4612d3bf7fdd
1d6cfbe2-6086-4568-a380-a270868bc585	pintura 4	desription de prueba4	oleo	1m	https://casaydiseno.com/wp-content/uploads/2019/09/aprender-a-pintar-flores.jpg	100	2	111	2022-04-14	Available	2022-04-14 09:07:31+00	2022-04-14 09:07:31+00	feb54fcc-1433-41f0-810a-4612d3bf7fdd
1d6cfbe2-6086-4568-a380-a270868bc587	pintura 6	desription de prueba6	oleo	1m	https://i.pinimg.com/originals/62/60/b7/6260b7ffe5df4a5e3e6951af039eaf67.jpg	100	2	111	2022-04-14	Available	2022-04-14 09:07:31+00	2022-04-14 09:07:31+00	feb54fcc-1433-41f0-810a-4612d3bf7fdd
1d6cfbe2-6086-4568-a380-a270868bc586	pintura 5	desription de prueba5	oleo	1m	https://4.bp.blogspot.com/-opX2Kwx6qvM/VhEw65Nkj0I/AAAAAAADqnI/1vw3h5rO75U/s1600/cuadros-de-calles-parisinas_6.jpg	100	1	111	2022-04-14	Available	2022-04-14 09:07:31+00	2022-04-14 09:07:31+00	feb54fcc-1433-41f0-810a-4612d3bf7fdd
\.


--
-- TOC entry 3056 (class 0 OID 69910)
-- Dependencies: 209
-- Data for Name: sellers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sellers (id_seller, "fullName", email, password, phone, country, address, "createdAt", "updatedAt") FROM stdin;
feb54fcc-1433-41f0-810a-4612d3bf7fdd	victor rodriguez	test@gmail.com	123	999999999	peru	direccion de prueba 12, calle 857	2022-04-14 09:07:31+00	2022-04-14 09:07:31+00
\.


--
-- TOC entry 3064 (class 0 OID 0)
-- Dependencies: 201
-- Name: categories_id_category_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_category_seq', 1, false);


--
-- TOC entry 3065 (class 0 OID 0)
-- Dependencies: 204
-- Name: models_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.models_id_seq', 1, false);


--
-- TOC entry 2896 (class 2606 OID 69919)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id_category);


--
-- TOC entry 2898 (class 2606 OID 69921)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id_customer);


--
-- TOC entry 2900 (class 2606 OID 69923)
-- Name: models models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.models
    ADD CONSTRAINT models_pkey PRIMARY KEY (id);


--
-- TOC entry 2902 (class 2606 OID 69925)
-- Name: order_product order_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT order_product_pkey PRIMARY KEY ("orderIdOrder", "productIdProduct");


--
-- TOC entry 2904 (class 2606 OID 69927)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id_order);


--
-- TOC entry 2906 (class 2606 OID 69929)
-- Name: product_category product_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pkey PRIMARY KEY ("productIdProduct", "categoryIdCategory");


--
-- TOC entry 2908 (class 2606 OID 69931)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id_product);


--
-- TOC entry 2910 (class 2606 OID 69933)
-- Name: sellers sellers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_pkey PRIMARY KEY (id_seller);


--
-- TOC entry 2911 (class 2606 OID 69934)
-- Name: order_product order_product_orderIdOrder_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT "order_product_orderIdOrder_fkey" FOREIGN KEY ("orderIdOrder") REFERENCES public.orders(id_order) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2912 (class 2606 OID 69939)
-- Name: order_product order_product_productIdProduct_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT "order_product_productIdProduct_fkey" FOREIGN KEY ("productIdProduct") REFERENCES public.products(id_product) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2913 (class 2606 OID 69944)
-- Name: orders orders_customerIdCustomer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_customerIdCustomer_fkey" FOREIGN KEY ("customerIdCustomer") REFERENCES public.customers(id_customer) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2914 (class 2606 OID 69949)
-- Name: product_category product_category_categoryIdCategory_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT "product_category_categoryIdCategory_fkey" FOREIGN KEY ("categoryIdCategory") REFERENCES public.categories(id_category) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2915 (class 2606 OID 69954)
-- Name: product_category product_category_productIdProduct_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT "product_category_productIdProduct_fkey" FOREIGN KEY ("productIdProduct") REFERENCES public.products(id_product) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2916 (class 2606 OID 69959)
-- Name: products products_sellerIdSeller_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_sellerIdSeller_fkey" FOREIGN KEY ("sellerIdSeller") REFERENCES public.sellers(id_seller) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2022-04-21 20:14:01

--
-- PostgreSQL database dump complete
--

