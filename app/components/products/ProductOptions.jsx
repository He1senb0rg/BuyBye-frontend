import React from "react";
import { useState } from "react";

const ProductOptions = ({ options, type }) => {
  const [optionType, setOptionType] = useState(null);

  return (
    <div>
      {type == "color" ? (
        <>
          <p className="h5">
            Cor: <span>{optionType}</span>
          </p>

          <div className="d-flex gap-2" data-toggle="buttons">
            {options?.map((color, index) => (
              <div key={"color" + index}>
                <input
                  className="btn-check"
                  type="radio"
                  name="colors" 
                id={"color" + index}
                  autoComplete="off"
                  onChange={() => setOptionType(color.name)}
                />
                <label
                  className="btn btn-primary border-0 p-3"
                  style={{ backgroundColor: color.hex, width: "50px" }}
                  htmlFor={"color" + index}
                ></label>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="h5">
            Tamanho: <span>{optionType}</span>
          </p>
          <div className="d-flex gap-2" data-toggle="buttons">
            {options?.map((option, index) => (
              <div key={"size" + index}>
                <input
                  className="btn-check"
                  type="radio"
                  name="sizes"
                  
                    id={"size" + index}
                  autoComplete="off"
                  onChange={() => setOptionType(option.name)}
                />
                <label
                  className="btn btn-outline-primary text-light"
                  style={{ width: "50px" }}
                  htmlFor={"size" + index}
                >
                  {option.size}
                </label>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default ProductOptions;
