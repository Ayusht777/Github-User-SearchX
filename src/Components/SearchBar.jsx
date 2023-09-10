import { useRef } from "react";
import s from "./Styles/SearchBar.module.css";
import { FiSearch ,FiInfo} from "react-icons/fi";
import PropTypes from "prop-types";

export const SearchBar = ({ setName ,toactive}) => {
  const InputRef = useRef(null);

  return (
    <div className={`${s.SearchBox} ${toactive ? s.active : ""}`}>
      <FiSearch></FiSearch>
    
      <input
        type="text"
        placeholder="Search for Github User"
        ref={InputRef}
        onKeyUp={(e) => {
          if (e.key == "Enter") {
            setName(InputRef.current.value);
          }
        }}
      />
      <button
        onClick={() => {
          setName(InputRef.current.value);
        }}
      >
        Search Github
      </button>
      {toactive && 
      <div className={s.errorMsg }><FiInfo></FiInfo> <p> Please Enter The Correct User Name </p></div>
      }
    </div>
  );
};

SearchBar.propTypes = {
  setName: PropTypes.func.isRequired,
  toactive: PropTypes.bool.isRequired
};
