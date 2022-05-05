import React from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/index";
import { useLocalStorage } from "../../utils/customerHooks/useLocalStorage";
import { deleteComments } from "../../services/delete/comments";
import { coments } from "../../services/post/coments";
import { getComments, getOrders } from "../../redux/actions/index";
import "./style.scss";

const Comments = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const comments = useSelector((state) => state.comments);
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonDesabled, setButtonDesabled] = React.useState(false);
  const [name, setName] = useLocalStorage("name", "");
  const [getData, setGetData] = React.useState({
    customerIdCustomer: localStorage.getItem("id_customer"),
    description: "",
    images: [],
  });
  const [previewSrc, setPreviewSrc] = React.useState([]);
  const handleclickImg = () => {
    document.getElementById("files").click();
  };
  const onchangeFiles = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setGetData(() => {
        return {
          ...getData,
          images: [],
        };
      });
      return;
    }
    setGetData(() => {
      return {
        ...getData,
        images: [...getData.images, e.target.files[0]],
      };
    });
  };

  const handleRemoveImage = (index) => {
    const newSelectedImage = getData.images.filter((item, i) => i !== index);
    setGetData((prevState) => {
      return {
        ...prevState,
        images: newSelectedImage,
      };
    });
  };

  const handleClickDeleteComment = async (id_comment) => {
    deleteComments(id_comment);
    window.location.reload();
  };

  const handleChange = (e) => {
    setGetData(() => {
      return {
        ...getData,
        [e.target.name]: e.target.value,
      };
    });
  };

  React.useEffect(() => {
    console.log("use efect", getData.images);
    if (getData.images.length === 0) {
      setPreviewSrc([]);
      return;
    }

    const ArrayImg = getData.images.map((file) => {
      return URL.createObjectURL(file);
    });

    setPreviewSrc(ArrayImg);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(ArrayImg);
  }, [getData.images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatImages = getData.images.map((file) => {
      const formImage = new FormData();
      formImage.append("file", file);
      formImage.append("upload_preset", "stucxna3");
      return formImage;
    });
    getData.images = [];
    setIsLoading(true);
    await coments(getData, formatImages);
    getData.images = [];
    getData.description = "";
    setIsLoading(false);
    dispatch(getComments());
  };

  React.useEffect(() => {
    if (getData.description !== "" || getData.images.length > 0) {
      setButtonDesabled(true);
    } else {
      setButtonDesabled(false);
    }
  }, [getData]);

  React.useEffect(() => {
    dispatch(getComments());
    if(localStorage.getItem("id_customer")){
      dispatch(getOrders(localStorage.getItem("id_customer")));
    }
  }, []);

  return (
    <div className="comments">
      <NavBar />
      <div className="comments__container">
        <h1>Comentarios y recomendaciones</h1>
        <div className="comments__container__comment">
          {comments.map((item, index) => {
            return (
              <div
                className={`comment__card ${
                  item.images && item.images.length > 0 && "img"
                }`}
              >
                <div className="comment__card__header">
                  {console.log("comenet", comments)}
                  <h3>{item.customer.name}</h3>
                  <div className="comment__card__header__actions">
                    {/* <button className="comment__card__header__actions-1">
                      <span>
                        <svg
                          className="edit"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.5805 7.39282L24.1676 6.81594L24.3157 6.673L24.3871 6.60152C24.4178 6.57089 24.4688 6.51984 24.5096 6.47389C24.6781 6.285 24.8364 6.01953 24.9181 5.75407C24.964 5.60602 24.9895 5.44265 24.9946 5.2895L24.9997 5.0955C24.9997 5.04445 24.9895 4.9985 24.9691 4.94745C24.913 4.82493 24.8364 4.64625 24.7445 4.47267C24.6526 4.29399 24.5403 4.12552 24.4586 4.04384C24.4331 4.01321 24.4075 3.98768 24.382 3.97236C24.3616 3.95705 24.3412 3.95194 24.3259 3.94684C24.2901 3.93663 24.2595 3.94173 24.234 3.95194C24.1829 3.98257 24.1472 4.03363 24.1421 4.16126C24.1165 4.38588 24.0859 4.71772 24.0859 5.08529C24.0859 5.11082 24.0859 5.13634 24.0859 5.16187V5.1925C24.04 5.35076 23.9685 5.50391 23.8664 5.62133C23.7643 5.74386 23.6367 5.82554 23.5039 5.91743C23.2385 6.10122 22.973 6.29521 22.7075 6.49942C22.1715 6.90273 21.6303 7.33156 21.0892 7.78592C20.0018 8.68954 18.9042 9.68504 17.8321 10.7163C16.5201 11.9722 15.2131 13.2229 13.9011 14.4788L11.9152 16.3779L11.4251 16.8527L11.3128 16.9599C11.3128 16.9599 11.3026 16.965 11.2975 16.965L11.2668 16.9701L9.97012 17.2203C9.07672 17.3989 8.18842 17.5725 7.29501 17.7512L6.86618 17.838C7.03975 16.9956 7.21844 16.1482 7.39201 15.3058L7.65748 13.9632L7.72385 13.6262L7.75448 13.4578L7.75958 13.4373V13.4271V13.422C7.76469 13.4016 7.75448 13.4475 7.75448 13.4373C7.75448 13.4271 7.76469 13.3965 7.75958 13.4169C7.74937 13.4475 7.75448 13.4322 7.75448 13.4373C7.74937 13.4373 7.76469 13.4118 7.76469 13.4067L7.78 13.3914L7.84127 13.3301L7.95868 13.2076C8.60704 12.5797 9.2605 11.9568 9.90886 11.3289C11.956 9.33279 14.0032 7.32646 16.0197 5.29971C17.0255 4.28378 18.0261 3.26275 19.0165 2.23661L19.3892 1.84862C19.4504 1.78225 19.4862 1.74651 19.5066 1.72609H19.5219C19.6955 1.74141 19.8384 1.75672 19.9507 1.78225C20.0069 1.79246 20.0528 1.80267 20.0886 1.81799H20.0937C20.0835 1.81288 20.1141 1.8282 20.0784 1.81288H20.0835L20.0937 1.81799L20.1243 1.8282L20.1856 1.85372L20.3081 1.90477C20.4612 1.97114 20.5685 2.01709 20.7114 2.08856C20.982 2.2264 21.2372 2.38466 21.4823 2.56844C22.585 3.38017 23.2129 4.4982 23.6111 4.2072C23.7796 4.07447 23.8307 3.70179 23.6673 3.16575C23.5039 2.63481 23.1108 1.9303 22.3961 1.32278C22.0796 1.05221 21.7324 0.812268 21.37 0.608061C21.2781 0.55701 21.176 0.505958 21.0841 0.454907C20.982 0.39875 20.9105 0.373224 20.8186 0.327277L20.7573 0.296646L20.7063 0.271121L20.6604 0.2507C20.5991 0.225174 20.5378 0.204754 20.4766 0.184333C20.354 0.148597 20.2417 0.117966 20.1294 0.0975451C20.0222 0.0771244 19.915 0.0567038 19.818 0.0413883L19.6751 0.0209676L19.5934 0.0107573C19.5474 0.00565214 19.5015 0.000546982 19.4555 0.000546982C19.2717 -0.00455818 19.0675 0.0260728 18.8889 0.0924399C18.7102 0.158807 18.557 0.2507 18.4396 0.347698C18.409 0.368119 18.3783 0.39875 18.3426 0.429381L18.2711 0.495748L18.169 0.592746L17.9648 0.786742L17.5564 1.17473C16.4741 2.21108 15.3969 3.26275 14.3401 4.32462C12.6401 6.03996 10.9605 7.7604 9.28092 9.49615L6.76918 12.0947L6.60581 12.2631C6.51392 12.3601 6.43734 12.4623 6.37098 12.5695C6.30972 12.6767 6.25356 12.789 6.21272 12.9217C6.16167 13.0953 6.16677 13.131 6.14635 13.2127L5.97277 14.101L5.62052 15.8725C5.47757 16.3932 5.32952 16.914 5.18658 17.4398L5.07937 17.8329L5.02832 18.032L5.00279 18.129C4.99258 18.18 4.97216 18.2668 4.96706 18.3383C4.93642 18.6395 5.01811 19.0275 5.27337 19.3185C5.39589 19.4614 5.55926 19.5788 5.72773 19.6503C5.8962 19.7218 6.06977 19.7575 6.24335 19.7626C6.2944 19.7626 6.34545 19.7626 6.3965 19.7575L6.47819 19.7473L6.50371 19.7422L6.57518 19.732L6.62624 19.7218L6.82534 19.6861L7.22865 19.6197L8.03016 19.4818C8.5662 19.3849 9.10224 19.2879 9.63829 19.1909C10.1743 19.0888 10.7104 18.9866 11.2464 18.8845L11.6497 18.808C11.8846 18.762 12.1602 18.6548 12.39 18.4966C12.4461 18.4557 12.5023 18.4149 12.5482 18.374L12.6299 18.3026L12.6759 18.2566L12.8239 18.1137L13.1149 17.8278C13.8909 17.0569 14.672 16.2911 15.448 15.5202C16.9948 13.9683 18.5417 12.4112 20.0886 10.8592C20.8646 10.0832 21.6405 9.30726 22.4114 8.53638L23.5805 7.39282ZM19.43 1.72099C19.4147 1.72099 19.3994 1.72099 19.3943 1.71588L19.43 1.72099ZM6.17698 17.9809C6.15146 17.986 6.18209 17.9809 6.1974 17.9758C6.20251 17.9758 6.20251 17.9758 6.20761 17.9758L6.17698 17.9809Z"
                            fill="#4A4E69"
                          />
                          <path
                            d="M20.4666 14.3616C20.2165 13.9685 20.0071 14.479 19.8489 15.2448C19.5834 16.5057 19.3945 17.8994 19.2669 19.3697C19.2005 20.1049 19.1495 20.8604 19.1137 21.6211C19.1035 21.81 19.0984 22.004 19.0882 22.198L19.078 22.489V22.5247V22.5451C19.078 22.5298 19.078 22.5809 19.078 22.5145V22.5196V22.5298L19.0729 22.6013C19.0678 22.6677 19.0627 22.6524 19.0576 22.6677C19.0167 22.8361 18.884 22.9995 18.7258 23.0812C18.6236 23.1322 18.5318 23.1527 18.399 23.1476L17.6945 23.1322L16.2906 23.1016L13.4776 23.0403C11.604 23.0046 9.72534 22.974 7.85175 22.9382C5.97305 22.9127 4.09434 22.8923 2.21564 22.8923H2.19522H2.1748L2.08801 22.8872C2.08291 22.877 2.11354 22.8872 2.08801 22.8821C2.05738 22.877 2.03186 22.8617 2.00123 22.8515C1.95017 22.8208 1.89402 22.7749 1.86339 22.7238C1.82765 22.6728 1.81233 22.6115 1.80723 22.5451L1.79702 21.8406C1.78681 20.9013 1.77149 19.9568 1.75107 19.0124C1.77149 18.0781 1.78681 17.149 1.80723 16.2147C1.84807 13.2537 1.8787 10.2979 1.86849 7.34197L1.86339 6.2852C1.86339 6.18309 1.89912 6.11673 1.96549 6.05036C1.99612 6.01973 2.03696 5.99931 2.0778 5.98399C2.09822 5.97889 2.11864 5.97378 2.14417 5.96868C2.14928 5.96868 2.15438 5.96868 2.15949 5.96868C2.15949 5.96868 2.20033 5.96868 2.21564 5.96868H2.35348L3.4613 5.95336C4.9367 5.92784 6.41209 5.8921 7.88238 5.83594C9.55687 5.77468 10.9455 5.53984 10.823 5.08038C10.7106 4.65665 9.52114 4.34523 7.8058 4.29929C6.26404 4.25845 4.71207 4.21761 3.1601 4.17676L2.57811 4.16655L2.28711 4.16145C2.23096 4.16145 2.20033 4.15634 2.12885 4.16145C2.05228 4.16655 1.97059 4.16655 1.89402 4.17676C1.26608 4.24824 0.678987 4.6107 0.336941 5.14164C0.250153 5.27437 0.178681 5.41732 0.127629 5.56537C0.0714723 5.71852 0.0357362 5.85636 0.0102103 6.06057L0.00510517 6.12694V6.16267L0 6.23414V6.31072V6.34646V6.41793V6.70893V7.8729C0.0102103 10.3642 0.0408413 12.8555 0.0765775 15.3469L0.132734 19.0838L0.163365 20.9523L0.178681 21.8866L0.183786 22.3511V22.4686C0.183786 22.5094 0.183786 22.5349 0.188891 22.6013C0.193996 22.7187 0.209312 22.831 0.229732 22.9485C0.2961 23.362 0.500306 23.7602 0.806616 24.0563C0.959771 24.2043 1.13845 24.3371 1.33245 24.4289C1.53155 24.5208 1.72044 24.5872 1.99612 24.6229L2.09822 24.6332L2.12375 24.6383H2.19012L2.24117 24.6434L2.45048 24.6536L2.8691 24.674L3.71146 24.7097C4.83459 24.7557 5.95773 24.7914 7.08087 24.8169C9.33224 24.868 11.5938 24.8884 13.8554 24.8884C14.9888 24.8884 16.1221 24.8833 17.2504 24.8833L18.0978 24.8782H18.3122H18.4297L18.6134 24.868C18.8636 24.8425 19.1086 24.7812 19.3384 24.6842C19.7978 24.48 20.1858 24.1328 20.4309 23.6989C20.5534 23.4794 20.6402 23.2497 20.6912 22.9995C20.7066 22.9229 20.7168 22.8515 20.7219 22.7749C20.727 22.7289 20.727 22.7187 20.727 22.6983V22.6472L20.7321 22.5451V22.4941V22.3869C20.727 20.1202 20.727 17.8586 20.7576 15.6021C20.7729 15.1937 20.5942 14.5607 20.4666 14.3616Z"
                            fill="#4A4E69"
                          />
                        </svg>
                      </span>
                    </button> */}
                    {localStorage.getItem("id_customer") ===
                      item.customer.id_customer && (
                      <button
                        className="comment__card__header__actions-2 hover:text-blue-700 transition duration-150 ease-in-out"
                        data-bs-toggle="tooltip"
                        title="Eliminar"
                        onClick={() => {
                          handleClickDeleteComment(item.id_comment);
                        }}
                      >
                        <span>
                          <svg
                            className="stop"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.5 0C5.60762 0 0 5.60724 0 12.5C0 19.3928 5.60724 25 12.5 25C19.3928 25 25 19.3928 25 12.5C25 5.60724 19.3924 0 12.5 0ZM2.28945 12.5C2.28945 6.86987 6.86987 2.28945 12.5 2.28945C15.0367 2.28945 17.359 3.22163 19.1466 4.759L4.759 19.1466C3.22163 17.359 2.28945 15.0367 2.28945 12.5ZM12.5 22.7106C10.2304 22.7106 8.13212 21.9653 6.43487 20.7081L20.7077 6.43525C21.965 8.1325 22.7102 10.2308 22.7102 12.5004C22.7106 18.1301 18.1301 22.7106 12.5 22.7106Z"
                              fill="#4A4E69"
                            />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="comment__card__body">
                  <p>{item.description}</p>
                  {item.images && item.images.length > 0 && (
                    <div className="comment__card__body__img">
                      {item.images.map((item, index) => {
                        return (
                          <img key={index} src={item.urlImage} alt="imagen" />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="comments__container__add">
          <h2>Agregar comentario</h2>
          {orders.length > 0 ? (
            <div className="comments__container__add__form">
              <form onSubmit={handleSubmit}>
                {isLoading && (
                  <>
                    <svg
                      className="animate-spin z-10 h-5 w-5 mr-3 ..."
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
                )}
                <textarea
                  type="text"
                  value={getData.description}
                  name="description"
                  onChange={handleChange}
                  className="comments__container__add__form-input"
                />
                <div
                  className="comments__container__add__form-img"
                  style={
                    previewSrc.length !== 0
                      ? { height: "200px" }
                      : { height: "auto" }
                  }
                >
                  {previewSrc.length !== 0 &&
                    previewSrc.map((item, index) => {
                      return (
                        <div
                          className="comments__container__add__form-img__item"
                          key={index}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              handleRemoveImage(index);
                            }}
                          >
                            x
                          </button>
                          <img src={item} />
                        </div>
                      );
                    })}
                </div>
                <div className="comments__container__add__form-actions">
                  <input
                    id="files"
                    type="file"
                    style={{ display: "none" }}
                    onChange={onchangeFiles}
                  />
                  <button
                    type="button"
                    className="comments__container__add__form-actions-img"
                    onClick={handleclickImg}
                  >
                    <span>
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="35" height="35" fill="#22223B" />
                        <path
                          d="M33.6916 3.70703H1.3084C0.585518 3.70703 0 4.29327 0 5.01555V29.9846C0 30.7069 0.585518 31.293 1.3084 31.293H33.6916C34.4139 31.293 35 30.7069 35 29.9846V5.01555C35 4.29327 34.4139 3.70703 33.6916 3.70703ZM32.0568 26.4407C32.0568 27.163 31.4707 27.7491 30.7484 27.7491H6.97835C6.25547 27.7491 5.66995 27.163 5.66995 26.4407V8.55933C5.66995 7.83705 6.25547 7.25093 6.97835 7.25093H30.7483C31.4705 7.25093 32.0567 7.83705 32.0567 8.55933V26.4407H32.0568Z"
                          fill="white"
                        />
                        <path
                          d="M8.83217 26.0334H28.5676C29.2898 26.0334 29.7242 25.4682 29.5351 24.7695L26.3995 13.1221C26.2112 12.4241 25.9004 11.9929 25.7048 12.1584C25.5092 12.3239 25.1552 13.0102 24.9146 13.6918L22.3527 20.9306C22.1119 21.6123 21.5768 21.6869 21.1581 21.098L18.9129 17.9402C18.4936 17.3515 17.8027 17.3423 17.3683 17.9199L14.9615 21.1189C14.527 21.6966 13.74 21.7725 13.203 21.289L12.4219 20.5851C11.8849 20.1017 11.1403 20.207 10.7595 20.8207L8.21405 24.9219C7.83325 25.5356 8.10929 26.0334 8.83217 26.0334Z"
                          fill="white"
                        />
                        <path
                          d="M13.7381 16.0017C14.7617 16.0017 15.5915 15.1719 15.5915 14.1483C15.5915 13.1247 14.7617 12.2949 13.7381 12.2949C12.7146 12.2949 11.8848 13.1247 11.8848 14.1483C11.8848 15.1719 12.7146 16.0017 13.7381 16.0017Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </button>
                  <Button
                    version="v1"
                    disabled={buttonDesabled ? "" : "disabled"}
                    name={`publicar por ${name}`}
                    width="180px"
                    height="35px"
                  />
                </div>
              </form>
            </div>
          ) : (
            <p>
              Podras Comentar o sugerencia Cuando realizas tu primera compra
            </p>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Comments;
