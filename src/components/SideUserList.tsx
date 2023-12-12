import styled from "styled-components";
import { Avatar, Threadtitle } from "./ThreadList";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IUserData } from "../routes/RecommendUser";
import UserList from "./UserList";

export const UserSide = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 30rem;
  padding: 3rem;
  background-color: #fff;
  z-index: 11;

  @media screen and (max-width: 1100px) {
    display: none;
  }

  .userInfo {
    display: flex;
    align-items: center;
  }

  .userName {
    font-size: 1.8rem;
    font-weight: bold;
  }
  .userId {
    margin-top: 0.5rem;
    color: #888;
    font-size: 1.2rem;
  }
`;

const RecommendBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.4rem;
  font-size: 1.6rem;
  span {
    color: #a7a7a7;
  }

  a {
    color: #ff5d6a;
  }
`;

export const RecommendWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  margin-top: 2rem;
`;

export const ProfileCard = styled(Threadtitle)``;

const SideUserList = () => {
  const user = auth.currentUser;
  const [userData, setUserData] = useState<IUserData[]>([]);

  const getUserData = async () => {
    try {
      const fetchQuery = query(collection(db, "userInfo"), where("userId", "!=", user?.uid), limit(5));
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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserSide>
      {/* 내 정보 */}
      <ProfileCard>
        <div className="userInfo">
          <Link to={`/profile/${user?.uid}`}>
            <Avatar src={user?.photoURL ? user?.photoURL : "/img/user.png"} />
          </Link>
          <div className="infoTitle">
            <div className="userName">{user?.displayName}</div>
            <div className="userId">{`${user?.email}`}</div>
          </div>
        </div>
      </ProfileCard>

      <RecommendBox>
        <span>회원님을 위한 추천</span>
        <Link to={`/recommend-user`}>모두보기</Link>
      </RecommendBox>

      <RecommendWrap>
        <>
          {userData.map((data, idx) => (
            <UserList key={idx} {...data} />
          ))}
        </>
      </RecommendWrap>
    </UserSide>
  );
};

export default SideUserList;
