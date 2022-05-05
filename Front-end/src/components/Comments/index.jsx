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
      urlImage:
        "https://ca.slack-edge.com/TPRS7H4PN-U028LNBKYFP-7529d7a2abaa-512",
      description:
        "Una pintura de muy buen gusto, me encanta la pintura de esta manera y la calidad de la pintura es muy buena",
    },
    {
      id: 2,
      urlImage:
        "https://ca.slack-edge.com/TPRS7H4PN-U02TW5D3X0A-23a80e1eb599-512",
      description:
        "Una pintura de muy buen gusto, me encanta la pintura de esta manera y la calidad de la pintura es muy buena",
    },
    {
      id: 3,
      urlImage:
        "https://ca.slack-edge.com/TPRS7H4PN-U02KSNPV9B5-3a086a358c7a-512",
      description:
        "Una pintura de muy buen gusto, me encanta la pintura de esta manera y la calidad de la pintura es muy buena",
    },
    {
      id: 4,
      urlImage:
        "https://ca.slack-edge.com/TPRS7H4PN-U02SV8W6TNH-94641d94cbbd-512",
      description:
        "Una pintura de muy buen gusto, me encanta la pintura de esta manera y la calidad de la pintura es muy buena",
    },
    {
      id: 5,
      urlImage:
        "https://ca.slack-edge.com/TPRS7H4PN-U025V0ZBUBA-57f96b66c75d-512",
      description:
        "Una pintura de muy buen gusto, me encanta la pintura de esta manera y la calidad de la pintura es muy buena",
    },
    {
      id: 6,
      urlImage:
        "https://ca.slack-edge.com/TPRS7H4PN-U02SY7RC7RR-9df6ad237ddb-512",
      description:
        "Una pintura de muy buen gusto, me encanta la pintura de esta manera y la calidad de la pintura es muy buena",
    },
  ];
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getComments());
  }, []);
  return (
    <div
      style={{
        paddingTop: "50px",
        marginBottom: "100px",
        position: "relative",
      }}
    >
      <div
        id="comments"
        className={`box-border grid grid-cols-3 mb-30 items-center justify-center px-10 content-center mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-1 ${s.container}`}
      >
        {comment.map((item, index) => {
          return (
            <div
              key={index}
              style={{ width: "300px" }}
              className=" h-120 flex mx-10 flex-wrap content-center items-center"
            >
              <div
                style={{ width: "300px", height: "300px" }}
                className="border-8 border-blue-600  flex flex-wrap content-center items-center rounded-full overflow-hidden bg-white"
              >
                <img
                  src={item.urlImage}
                  alt="user"
                  style={{ height: "300px", width: "auto" }}
                />
              </div>
              <p className="text-base my-10 w-60 font-mulish text-center text-white">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
      <Link
        to="/comentarios"
        style={{ width: "180px", height: "35px", bottom: "-10%", left: "10%" }}
        className=" absolute  bg-white h-8 p-2 rounded-lg mt-5"
      >
        Ver Mas Comentarios
      </Link>
    </div>
  );
};

export default Comments;
