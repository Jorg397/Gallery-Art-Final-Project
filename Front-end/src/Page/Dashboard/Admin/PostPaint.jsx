import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPaint, getCategories } from '../../../redux/actions';


export default function PostPaint() {
    const dispatch = useDispatch();
    const [input , setInput] = useState({
        name: '',
        description: '',
        technique: '',
        measures: '',
        image: '',
        price: 0,
        sku: '',
        serie: '',
        released: ''
    });
    const [cates, setCates] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    const categories = useSelector((state) => state.categories);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: input.name,
            description: input.description,
            technique: input.technique,
            measures: input.measures,
            image: input.image,
            price: input.price,
            sku: input.sku,
            serie: input.serie,
            released: input.released,
            categories: cates,
        }
        // dispatch(createPaint(data));
        console.log(data)
    }
    
    
    function handleSelect(e) {
        if (!cates.includes(e.target.value)) {
          if (cates.length > 0) {
            setCates([...cates, parseInt(e.target.value)]);
          } else {
            setCates([...cates, {"id_category":parseInt(e.target.value)}]); 
          }
        };
        console.log
      }



  return (
    <div> 
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Nombre"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Descripción"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="technique">Técnica</label>
                <input
                    type="text"
                    className="form-control"
                    id="technique"
                    name="technique"
                    placeholder="Técnica"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="measures">Medidas</label>
                <input
                    type="text"
                    className="form-control"
                    id="measures"
                    name="measures"
                    placeholder="Medidas"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="image">Imagen(URL)</label>
                <input

                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    placeholder="Imagen"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Precio</label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Precio"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="sku">SKU</label>
                <input
                    type="text"
                    className="form-control"
                    id="sku"
                    name="sku"
                    placeholder="SKU"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="serie">Serie</label>
                <input

                    type="text"
                    className="form-control"
                    id="serie"
                    name="serie"
                    placeholder="Serie"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="released">Fecha de lanzamiento</label>
                <input
                    type="date"
                    className="form-control"
                    id="released"
                    name="released"
                    placeholder="Fecha de lanzamiento"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="categories">Categoría</label>
                <select
                    className="form-control"
                    id="categories"
                    name="categories"
                    onChange={handleSelect}
                >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id_category} value={category.id_category}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                Enviar
            </button>
        </form>
  </div>
  )
}
