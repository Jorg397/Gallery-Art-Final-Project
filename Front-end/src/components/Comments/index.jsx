import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../../redux/actions";

import s from "./style.css";

const Comments = () => {
  const comments = useSelector((state) => state.comments);
    const comment = [
        {
            id: 1,
            urlImage: "https://p1.pxfuel.com/preview/704/587/724/portrait-girl-studio-female-woman-profile.jpg",
            description: "Una pintura de muy buen gusto, me encanta la pintura de esta manera y la calidad de la pintura es muy buena",
        },
        {
            id: 2,
            urlImage: "https://www.rutanmedellin.org/images/1pruebas/foto-persona.jpg",
            description: "Una pintura de muy buen gusto, me encanta la pintura de esta manera y la calidad de la pintura es muy buena",
        },
        {
            id: 3,
            urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStbT5_R8vIKH2xgitYYQd5pgMnQUwW-h4ulkVl7oPm3GnQv0ZYcIHMxt0PsjK-aWbstCM&usqp=CAU",
            description: "Una pintura de muy buen gusto, me encanta la pintura de esta manera y la calidad de la pintura es muy buena",
        }
    ]
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getComments());
  }, []);
  return (
    <div style={{ paddingTop: "50px", marginBottom:"100px", position:"relative" }}>
      <div
        id="comments"
        className={`box-border flex flex-col mb-30 items-center justify-center px-10 content-center mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-1 ${s.container}`}
      >
        {
          comment.map((item, index) => {
            return (
              <div key = {index} style={{width: "300px"}} className=" h-120 flex mx-10 flex-wrap content-center items-center">
                <div style={{width: "300px", height:"300px"}} className="border-8 border-blue-600  flex flex-wrap content-center items-center rounded-full overflow-hidden bg-white">
                  <img
                    src={item.urlImage}
                    alt="user"
                    style={{ height: "300px", width: "auto" }}
                  />
                </div>
                <p className="text-base my-10 w-60 font-mulish text-center text-white">{item.description}</p>
              </div>
            );
          })}
      </div>
      <Link
        to="/comentarios"
        style={{width:"180px", height:"35px", bottom:"-10%",left:"10%"}}
        className=" absolute  bg-white h-8 p-2 rounded-lg mt-5"
      >
        Ver Mas Comentarios
      </Link>
    </div>
  );
};

export default Comments;
