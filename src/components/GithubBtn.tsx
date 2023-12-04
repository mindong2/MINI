import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const GithubBtn = () => {
  const navigate = useNavigate();
  const provider = new GithubAuthProvider();
  const gitHubLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button type="button" onClick={gitHubLogin}>
      깃허브로 로그인하기
    </button>
  );
};

export default GithubBtn;
