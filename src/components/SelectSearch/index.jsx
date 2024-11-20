import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectSearch from "react-select-search";
import axios from "axios";

const SelectSearchInput = ({
  token,
  setToken,
  selectedOutlet,
  setSelectedOutlet,
}) => {
  let navigate = useNavigate();
  let url = process.env.REACT_APP_BASE_URL;
  const [listOutlet, setListOutlet] = useState([]);

  useEffect(() => {
    let tokenCheck = localStorage.getItem("token");
    if (!tokenCheck) {
      navigate("/");
    } else {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .post(`${url}/outlets`, {
          token: token,
        })
        .then((response) => {
          setListOutlet(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  useEffect(() => {
    if (listOutlet) {
      setSelectedOutlet(listOutlet[0]?.value);
    }
  }, [listOutlet]);

  return (
    <div className="select-search">
      <SelectSearch
        defaultValue={selectedOutlet}
        search
        placeholder={"Select Outlet Name"}
        onChange={(event) => setSelectedOutlet(event)}
        options={listOutlet}
      />
    </div>
  );
};

export default SelectSearchInput;
