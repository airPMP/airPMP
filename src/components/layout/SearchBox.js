import React from "react";

const SearchBox = (props) => {
  return (
    <div className=" basic-1/4 flex flex-row  items-center w-[432px] h-[46px] bg-[#FFFFFF] rounded-[0.625rem] ">
      <div>
        <svg
          width="11"
          height="12"
          viewBox="0 0 11 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="5" cy="5" r="4.3" stroke="#1B2559" strokeWidth="1.4" />
          <line
            x1="10.0101"
            y1="11"
            x2="8"
            y2="8.98995"
            stroke="#1B2559"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="bg-[#FFFFFF] pl-[7px]">
        <input
          type="text"
          placeholder={props.placeHolderName}
          className="outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBox;
