import { useDispatch, useSelector } from "react-redux";
import "./ProductModal.scss";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import InputField from "../InputField/InputField";
import Select from "react-select";
import { createProduct } from "../../redux/actions/index";

function ProductModal({ openModalProduct, modalProduct }) {
  const inputClass = "rounded-lg p-1 border-2 border-purple-900";
  const divClass = "grid px-3";
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const options = categories.map((category) => {
    return { idCategory: category.id_category, name: category.name };
  });

  const registerOptions = {
    role: { required: "Selecione 1 categoria" },
  };

  const customStyles = {
    control: () => ({
      border: "2px solid #44337a;",
      borderRadius: "0.5rem",
      backgroundColor: loading ? "#a9a9a9" : "#fff",
    }),
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formImage = new FormData();
    formImage.append("file", data.image[0]);
    formImage.append("upload_preset", "ucacqwtj");

    setLoading(true);
    const result = await dispatch(createProduct(formImage, data));
    setLoading(false);
    reset();
  };

  return (
    <div
      className={`flex fixed w-full h-screen z-10 backdrop-blur top-0 left-0 bg-black bg-opacity-50 justify-center items-center ${
        modalProduct ? `visible` : `invisible`
      }`}
    >
      <div className="productContainer grid grid-cols-1 grid-rows-7 p-1 pb-5 relative h-64 rounded-3xl justify-end text-white">
        <div className="flex col-span-7 justify-between row-span-1 h-10">
          <span></span>
          <span className="text-2xl font-bold h-10">Registrar Pintura</span>
          <span
            className="closeBtn flex items-center justify-center rounded-2xl cursor-pointer z-10"
            onClick={openModalProduct}
          >
            X
          </span>
        </div>

        <div className="pt-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="detailContainer grid grid-cols-7 col-span-7 gap-2 row-span-6 h-full mx-20 rounded-3xl items-center p-5 text-black"
          >
            <div className="grid grid-cols-2 col-span-5 row-span-6 items-center justify-between w-full h-full">
              <InputField
                className={divClass}
                inputClass={inputClass}
                spanText="Nombre"
                type="text"
                placeholder="Nombre"
                name="name"
                register={register}
                registerMessage="El nombre es requerido"
                patternValue="^[a-zA-Z\s]{1,20}$"
                patternMessage="Solo debe tener letras maximo 20 caracteres"
                errors={errors}
                disabled={loading}
              />
              <InputField
                className={divClass}
                inputClass={inputClass}
                spanText="Medida"
                type="text"
                placeholder="ANCHO x ALTO"
                name="measures"
                register={register}
                registerMessage="Las medidas son requeridas"
                patternValue="^([1-9]{1})([0-9]{0,2})[x]([0-9]{1})([0-9]{0,2})$"
                patternMessage="Formato invalido. Ejemplo: 50x70"
                errors={errors}
                disabled={loading}
              />

              <InputField
                className={divClass}
                inputClass={inputClass}
                spanText="Tecnica"
                type="text"
                placeholder="Tecnica"
                name="technique"
                register={register}
                registerMessage="La tecnica es requerida"
                patternValue="^[a-zA-Z\s]{1,20}$"
                patternMessage="Solo debe tener letras maximo 20 caracteres"
                errors={errors}
                disabled={loading}
              />

              <InputField
                className={divClass}
                inputClass={inputClass}
                spanText="Serie"
                type="text"
                placeholder="Serie"
                name="serie"
                register={register}
                registerMessage="La seria es requerida"
                patternValue="^[a-zA-Z0-9\s]{1,20}$"
                patternMessage="Solo debe tener letras y numeros maximo 20 caracteres"
                errors={errors}
                disabled={loading}
              />

              <InputField
                className={divClass}
                inputClass={inputClass}
                spanText="Año"
                type="date"
                placeholder="Año"
                name="released"
                register={register}
                registerMessage="El año es requerido"
                errors={errors}
                disabled={loading}
              />

              <InputField
                className={divClass}
                inputClass={inputClass}
                spanText="Precio"
                type="number"
                placeholder="Precio"
                name="price"
                register={register}
                registerMessage="El precio es requerido"
                patternValue="^[0-9]{1,6}$"
                patternMessage="Solo debe tener numeros"
                errors={errors}
                disabled={loading}
              />

              <InputField
                className={divClass}
                inputClass={`h-32 ${inputClass}`}
                spanText="Descripcion"
                type="textarea"
                placeholder="Descripcion"
                name="description"
                register={register}
                registerMessage="La descripcion es requerido"
                errors={errors}
                disabled={loading}
              />

              <div className="grid px-3" key="descripcion">
                <span className="text-base font-semibold">Categorias</span>

                <Controller
                  name="categories"
                  control={control}
                  defaultValue=""
                  rules={registerOptions.role}
                  render={({ field }) => {
                    return (
                      <Select
                        styles={customStyles}
                        options={options}
                        getOptionValue={(option) => option.idCategory}
                        getOptionLabel={(option) => option.name}
                        {...field}
                        placeholder="Selecione las categorias"
                        isMulti
                        isDisabled={loading}
                      />
                    );
                  }}
                />

                {errors.role && (
                  <p className="text-red-800 font-bold">
                    {errors.role.message}
                  </p>
                )}

                <InputField
                  className="grid"
                  inputClass={inputClass}
                  spanText="SKU"
                  type="text"
                  placeholder="SKU"
                  name="sku"
                  register={register}
                  registerMessage="El SKU es requerido"
                  patternValue="^[a-zA-Z0-9\s]{1,15}$"
                  patternMessage="Solo debe tener letras y numeros maximo 15 caracteres"
                  errors={errors}
                  disabled={loading}
                />
              </div>

              <div className="grid col-span-2 justify-center">
                {/* <input
                  className="flex justify-center items-center btn-primary rounded-lg text-white h-8 cursor-pointer border-2 px-16"
                  type="submit"
                  value={"Guardar"}
                /> */}
                <button
                  className="flex justify-center items-center btn-primary rounded-lg text-white h-8 cursor-pointer border-2 px-16"
                  type="submit"
                >
                  <span className="flex">
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3 ..."
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Guardando...
                      </>
                    ) : (
                      "Guardar"
                    )}
                  </span>
                </button>
              </div>
            </div>

            <div className="grid col-span-2 row-span-3 h-full">
              <img
                className="rounded-lg mt-6 aspect-auto"
                src={
                  preview
                    ? preview
                    : "https://wellnessinmind.ca/wp-content/themes/wellness/img/default_new_image.jpg"
                }
                alt="preview"
                style={{ aspectRatio: 1 / 1, width: 500, height: 250 }}
              />

              <label
                htmlFor="imageUpload"
                className={`flex justify-center items-center btn-primary rounded-lg text-white h-8 border-2 ${
                  loading ? "cursor-none" : "cursor-pointer"
                }`}
              >
                Seleccionar imagen
              </label>
              <input
                className="hidden"
                type="file"
                id="imageUpload"
                accept="image/*"
                name="image"
                onInput={onSelectFile}
                {...register("image", {
                  required: {
                    value: true,
                    message: "La imagen es requerido",
                  },
                })}
              ></input>

              {errors.image && (
                <p className="text-red-800 font-bold">{errors.image.message}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ProductModal;
