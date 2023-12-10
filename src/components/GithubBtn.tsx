import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";

export const OauthBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  background-color: #fff;
  outline: none;
  font-size: 1.8rem;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  img,
  svg {
    width: 3.2rem;
    margin-right: 1rem;
  }

  &:hover {
    background-color: #ff5d6a;
    color: #fff;
    border: 1px solid #ff5d6a;
    box-shadow: none;
  }
`;

const GithubBtn = () => {
  const navigate = useNavigate();
  const provider = new GithubAuthProvider();
  const gitHubLogin = async () => {
    try {
      const userInfo = await signInWithPopup(auth, provider);
      const user = userInfo.user;
      await setDoc(doc(db, `userInfo`, `${user.uid}`), {
        userName: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        userId: user.uid,
        createdAt: Date.now(),
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <OauthBtn type="button" onClick={gitHubLogin}>
      <img src="/img/github-logo.svg" alt="" />
      깃허브로 로그인하기
    </OauthBtn>
  );
};

export default GithubBtn;
