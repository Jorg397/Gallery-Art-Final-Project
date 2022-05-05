import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaints,
  filterState,
  searchAllThatContains,
} from "../../../redux/actions";
import ModalPaint from "./ModalPaint";
import NavAdmin from "./NavAdmin";
import {
  getCategories,
  createdCategories,
  deleteCategories,
  updateCategories,
} from "../../../redux/actions/index";
import ProductModal from "../../../components/ProductModal/ProductModal";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (editing) {
      setLoading(true);
      try {
        data.id_category = categoryEdit.id_category;

        const result = await dispatch(updateCategories(data));

        if (result.success) {
          dispatch(getCategories());
          setEditing(false);
          setInputCategory("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoading(true);
      try {
        const result = await dispatch(createdCategories(data));

        if (result === "Category Created!") {
          dispatch(getCategories());
          reset();
          setInputCategory("");
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState(false);

  function openModalProduct() {
    setmodalProduct(!modalProduct);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.filterCategories);
  const [name, setName] = useState("");
  const [inputCategory, setInputCategory] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(searchAllThatContains(e.target.value));
  }

  function handleInput(e) {
    e.preventDefault();

    setInputCategory(e.target.value);
  }

  function handleState(e) {
    dispatch(filterState(e));
  }
  const handleDelete = async (id_category) => {
    const result = await dispatch(deleteCategories(id_category));
    if (result.success) dispatch(getCategories());
  };

  const handleEdit = (category) => {
    setEditing(true);
    setCategoryEdit(category);
    setInputCategory(category.name);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const registerOptions = {
    role: { required: true },
  };

  return (
    <div>
      <NavAdmin></NavAdmin>
      <ProductModal
        modalProduct={modalProduct}
        openModalProduct={openModalProduct}
      />
      <div className="grid grid-cols-2 justify-center items-center mt-5">
        <div className="col-span-1 box-border relative w-full px-4 mt-10 mb-4 text-white bg-no-repeat bg-contain border-solid ">
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
        <div
          className="grid grid-rows-2 col-start-2 m-4 p-2"
          style={{
            backgroundColor: "#9A8C98",
            paddingBottom: "80px",
            borderRadius: "10px",
          }}
        >
          <div className="flex justify-between">
            <span
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Categorias
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
                marginTop: "20px",
                marginBottom: "20px",
                paddingLeft: "10px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#9A8C98",
              }}
            />
          </div>
          <div className="flex justify-between">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-between w-full"
            >
              <input
                type="text"
                placeholder="Categoria"
                value={inputCategory}
                style={{
                  border: "1px solid #9A8C98",
                  width: "300px",
                  height: "40px",
                  borderRadius: "10px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  paddingLeft: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#9A8C98",
                }}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Ingrese el nombre de la categoria",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]{1,20}$/,
                    message: "Solo debe tener letras y maximo 20 caracteres",
                  },
                })}
                onChange={(e) => handleInput(e)}
              />

              <button
                className="bg-white border-2"
                style={{
                  marginLeft: "20px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  padding: "5px",
                  borderRadius: "10px",
                  width: "180px",
                  color: "#fff",
                  backgroundColor: "#4A4E69",
                  border: "1px solid #fff",
                }}
                type="submit"
              >
                {editing ? "Actualizar Categoria" : "Agregar Categoria"}
              </button>
              {editing ? (
                <button
                  onClick={handleCancelEdit}
                  className="bg-white border-2"
                  style={{
                    marginLeft: "20px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    padding: "5px",
                    borderRadius: "10px",
                    width: "110px",
                    color: "#fff",
                    backgroundColor: "#4A4E69",
                    border: "1px solid #fff",
                  }}
                  type="submit"
                >
                  Cancelar
                </button>
              ) : undefined}
            </form>
          </div>
          {errors.name && (
            <p className="text-red-800 font-bold">{errors.name.message}</p>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {/* Returns a table with all the orders */}
            <table
              className="w-full text-center"
              style={{ borderRadius: "10px" }}
            >
              <thead className="text-center">
                <tr
                  style={{
                    backgroundColor: "#4A4E69",
                    color: "white",
                  }}
                >
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr
                    key={category.id_category}
                    className=""
                    style={{
                      backgroundColor: "#C9ADA7",
                      fontWeight: "bold",
                      borderTop: "10px solid #9A8C98",
                    }}
                  >
                    <td>{category.id_category}</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={category.name}
                        disabled
                      />
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          handleEdit(category);
                        }}
                      >
                        Editar
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() => handleDelete(category.id_category)}
                      >
                        <img
                          src="https://i.ibb.co/9bXyDbb/delete-svgrepo-com-1.png"
                          alt=""
                          style={{ width: "30px" }}
                        />
                      </button>
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
