import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setEmail, setPassword, setSession }) => {
  let navigate = useNavigate();

  setEmail(null);
  setPassword(null);
  setSession(false);

  useEffect(() => {
    let path = "/";
    navigate(path);
  }, []);
};

export default Logout;
