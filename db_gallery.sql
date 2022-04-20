PGDMP     ,    :                z            gallery    14.2    14.2 ,    0           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            1           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            2           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            3           1262    32768    gallery    DATABASE     b   CREATE DATABASE gallery WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Peru.1252';
    DROP DATABASE gallery;
                postgres    false            H           1247    33094    enum_orders_order_status    TYPE     g   CREATE TYPE public.enum_orders_order_status AS ENUM (
    'Created',
    'Pending',
    'Delivered'
);
 +   DROP TYPE public.enum_orders_order_status;
       public          postgres    false            Q           1247    33122    enum_products_state    TYPE     _   CREATE TYPE public.enum_products_state AS ENUM (
    'Available',
    'Pending',
    'Sold'
);
 &   DROP TYPE public.enum_products_state;
       public          postgres    false            �            1259    33078 
   categories    TABLE     �   CREATE TABLE public.categories (
    id_category integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255)
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    33077    categories_id_category_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_category_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.categories_id_category_seq;
       public          postgres    false    212            4           0    0    categories_id_category_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categories_id_category_seq OWNED BY public.categories.id_category;
          public          postgres    false    211            �            1259    33086 	   customers    TABLE     �  CREATE TABLE public.customers (
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
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    32791    models    TABLE     �   CREATE TABLE public.models (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.models;
       public         heap    postgres    false            �            1259    32790    models_id_seq    SEQUENCE     �   CREATE SEQUENCE public.models_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.models_id_seq;
       public          postgres    false    210            5           0    0    models_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.models_id_seq OWNED BY public.models.id;
          public          postgres    false    209            �            1259    33142    order_product    TABLE     �   CREATE TABLE public.order_product (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "orderIdOrder" uuid NOT NULL,
    "productIdProduct" uuid NOT NULL
);
 !   DROP TABLE public.order_product;
       public         heap    postgres    false            �            1259    33101    orders    TABLE     �  CREATE TABLE public.orders (
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
    DROP TABLE public.orders;
       public         heap    postgres    false    840    840            �            1259    33157    product_category    TABLE     �   CREATE TABLE public.product_category (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "productIdProduct" uuid NOT NULL,
    "categoryIdCategory" integer NOT NULL
);
 $   DROP TABLE public.product_category;
       public         heap    postgres    false            �            1259    33129    products    TABLE     �  CREATE TABLE public.products (
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
    DROP TABLE public.products;
       public         heap    postgres    false    849    849            �            1259    33114    sellers    TABLE     �  CREATE TABLE public.sellers (
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
    DROP TABLE public.sellers;
       public         heap    postgres    false            �           2604    33081    categories id_category    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN id_category SET DEFAULT nextval('public.categories_id_category_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN id_category DROP DEFAULT;
       public          postgres    false    211    212    212                       2604    32794 	   models id    DEFAULT     f   ALTER TABLE ONLY public.models ALTER COLUMN id SET DEFAULT nextval('public.models_id_seq'::regclass);
 8   ALTER TABLE public.models ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            '          0    33078 
   categories 
   TABLE DATA           D   COPY public.categories (id_category, name, description) FROM stdin;
    public          postgres    false    212   5<       (          0    33086 	   customers 
   TABLE DATA           �   COPY public.customers (id_customer, "fullName", email, password, phone, country, default_shipping_address, billing_address, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   R<       %          0    32791    models 
   TABLE DATA           D   COPY public.models (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   �<       ,          0    33142    order_product 
   TABLE DATA           e   COPY public.order_product ("createdAt", "updatedAt", "orderIdOrder", "productIdProduct") FROM stdin;
    public          postgres    false    217   =       )          0    33101    orders 
   TABLE DATA           �   COPY public.orders (id_order, amount, order_date, order_status, observation, shipping_address, "createdAt", "updatedAt", "customerIdCustomer") FROM stdin;
    public          postgres    false    214   9=       -          0    33157    product_category 
   TABLE DATA           n   COPY public.product_category ("createdAt", "updatedAt", "productIdProduct", "categoryIdCategory") FROM stdin;
    public          postgres    false    218   V=       +          0    33129    products 
   TABLE DATA           �   COPY public.products (id_product, name, description, technique, measures, image, price, serie, sku, released, state, "createdAt", "updatedAt", "sellerIdSeller") FROM stdin;
    public          postgres    false    216   s=       *          0    33114    sellers 
   TABLE DATA           |   COPY public.sellers (id_seller, "fullName", email, password, phone, country, address, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �?       6           0    0    categories_id_category_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.categories_id_category_seq', 1, false);
          public          postgres    false    211            7           0    0    models_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.models_id_seq', 1, false);
          public          postgres    false    209            �           2606    33085    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id_category);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    212            �           2606    33092    customers customers_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id_customer);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    213            �           2606    32796    models models_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.models
    ADD CONSTRAINT models_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.models DROP CONSTRAINT models_pkey;
       public            postgres    false    210            �           2606    33146     order_product order_product_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT order_product_pkey PRIMARY KEY ("orderIdOrder", "productIdProduct");
 J   ALTER TABLE ONLY public.order_product DROP CONSTRAINT order_product_pkey;
       public            postgres    false    217    217            �           2606    33108    orders orders_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id_order);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    214            �           2606    33161 &   product_category product_category_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pkey PRIMARY KEY ("productIdProduct", "categoryIdCategory");
 P   ALTER TABLE ONLY public.product_category DROP CONSTRAINT product_category_pkey;
       public            postgres    false    218    218            �           2606    33136    products products_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id_product);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    216            �           2606    33120    sellers sellers_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_pkey PRIMARY KEY (id_seller);
 >   ALTER TABLE ONLY public.sellers DROP CONSTRAINT sellers_pkey;
       public            postgres    false    215            �           2606    33147 -   order_product order_product_orderIdOrder_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT "order_product_orderIdOrder_fkey" FOREIGN KEY ("orderIdOrder") REFERENCES public.orders(id_order) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.order_product DROP CONSTRAINT "order_product_orderIdOrder_fkey";
       public          postgres    false    214    217    3210            �           2606    33152 1   order_product order_product_productIdProduct_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT "order_product_productIdProduct_fkey" FOREIGN KEY ("productIdProduct") REFERENCES public.products(id_product) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.order_product DROP CONSTRAINT "order_product_productIdProduct_fkey";
       public          postgres    false    3214    216    217            �           2606    33109 %   orders orders_customerIdCustomer_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_customerIdCustomer_fkey" FOREIGN KEY ("customerIdCustomer") REFERENCES public.customers(id_customer) ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_customerIdCustomer_fkey";
       public          postgres    false    214    3208    213            �           2606    33167 9   product_category product_category_categoryIdCategory_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT "product_category_categoryIdCategory_fkey" FOREIGN KEY ("categoryIdCategory") REFERENCES public.categories(id_category) ON UPDATE CASCADE ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.product_category DROP CONSTRAINT "product_category_categoryIdCategory_fkey";
       public          postgres    false    218    212    3206            �           2606    33162 7   product_category product_category_productIdProduct_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT "product_category_productIdProduct_fkey" FOREIGN KEY ("productIdProduct") REFERENCES public.products(id_product) ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.product_category DROP CONSTRAINT "product_category_productIdProduct_fkey";
       public          postgres    false    216    3214    218            �           2606    33137 %   products products_sellerIdSeller_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_sellerIdSeller_fkey" FOREIGN KEY ("sellerIdSeller") REFERENCES public.sellers(id_seller) ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_sellerIdSeller_fkey";
       public          postgres    false    216    3212    215            '      x������ � �      (   �   x�}�1�@�����w|��ww�S��A�!-�ZA���룥1x�^EQd*�:�9D��pj�Y���H�,��i^���z�{�X�B��X��.j_�i~q��Mv~��f�"Y�szo�,˾H�����ȁ��+ib�IhP�bG�� x�/      %      x������ � �      ,      x������ � �      )      x������ � �      -      x������ � �      +   '  x���[k�0�g�S�Ⱥ�Ja�n,�t7�uet��:�j�u���V�1�È��?�9�
�#@ ) �BE%�S ��d�n��Ss�Y��:�uh���c78�p2�ɪ��g6���2V}n��m��ܠm���ߔCڶ�j|�\��ȫ���V��|�H���zخW�3]}����0�F��(B��`F(��8#���,;Pu�t�~爝��b���b�4gޘ)�0��)�&�j_xkg��>t�C���>i�M�|���'�|����AS삍����z0���L8���K���z�J� ����(��e>:��ȩ!�==�D�	�BRt���� ��ʗH�Ԑ��EbHF%��urmx�1�޵=b�M� ��hU�\k]���:��й�39͞)��(�8�|�Qo�'���eݪ&AA�@PS!�.�w�z���N,8VхS^�k!���?�`���nB�bx�� �k�~|��U�z���-���o�?���ݧ��`�b7n��]H�:`T�L�UW��6��^�����l6��:�R      *   �   x�u�1�0@��9�@*;I)t� ,��T�ZR���������N}�"���6p&{a�6��%?�!��"{m�jje>��>�ۼƲtRW`���6m��T��&ŭ:EdwB�ˢx�p䜥�#���ѳ���{g�� D�.f     