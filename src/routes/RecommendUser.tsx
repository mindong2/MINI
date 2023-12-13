import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserList from "../components/UserList";
import { NoticeBar } from "./Profile";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  width: 64.8rem;
  margin: 0 auto;
  @media screen and (max-width: 1275px) {
    width: 48rem;
  }

  @media screen and (max-width: 768px) {
    width: 46rem;
  }

  @media screen and (max-width: 648px) {
    gap: 1.6rem 0;

    max-width: 64.8rem;
    width: 100%;
    padding: 7rem 4.17% 12rem;
  }
`;

export interface IUserData {
  userName: string;
  userId: string;
  email: string;
  avatar?: string;
}

const RecommendUser = () => {
  const getUserData = async () => {
    try {
      const fetchQuery = query(collection(db, "userInfo"), where("userId", "!=", user?.uid));
      const snapshot = await getDocs(fetchQuery);

      const userDataList = snapshot.docs.map((doc) => {
        const { email, userId, userName, avatar } = doc.data();
        return { email, userId, userName, avatar, id: doc.id };
      });
      setUserData(userDataList);
    } catch (err) {
      console.error(err);
    }
  };

  const user = auth.currentUser;
  const [userData, setUserData] = useState<IUserData[]>([]);

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Wrapper>
      <NoticeBar style={{ marginTop: "5rem", marginBottom: "0" }}>다른 친구들은 어떻게 지낼까요?</NoticeBar>
      {userData.map((data, idx) => (
        <UserList key={idx} {...data} />
      ))}
    </Wrapper>
  );
};

export default RecommendUser;
