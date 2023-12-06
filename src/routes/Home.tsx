import { useState } from "react";
import styled from "styled-components";
import WriteModal from "../components/WriteModal";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 64.8rem;
  margin: 0 auto;
`;

const Thread = styled.ul`
  padding: 5rem 0;
`;

const ThreadList = styled.li``;
const Home = () => {
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        <Thread>
          <ThreadList>
            <button onClick={() => setIsModal(true)}>글쓰기</button>
            <button
              onClick={() => {
                signOut(auth);
                navigate("/login");
              }}
            >
              로그아웃
            </button>
          </ThreadList>
        </Thread>
      </Wrapper>

      {isModal ? <WriteModal setIsModal={setIsModal} /> : null}
    </>
  );
};

export default Home;
