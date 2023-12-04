import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const GoogleBtn = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button type="button" onClick={GoogleLogin}>
      구글로 로그인하기
    </button>
  );
};

export default GoogleBtn;
