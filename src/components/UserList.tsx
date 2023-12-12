import styled from "styled-components";
import { Avatar } from "./ThreadList";
import { Link } from "react-router-dom";
import { ProfileCard } from "./SideUserList";
import { IUserData } from "../routes/RecommendUser";

// export const ProfileBox = styled(Aside)``;
const Wrapper = styled.div`
  width: 64.8rem;
  margin: 0 auto;
  padding: 1rem;
  transition: background-color 0.15s ease-in-out;
  border-radius: 0.4rem;
  &:hover {
    background-color: rgba(255, 93, 106, 0.1);
  }
  @media screen and (max-width: 1275px) {
    width: 48rem;
  }

  @media screen and (max-width: 768px) {
    width: 46rem;
  }

  @media screen and (max-width: 648px) {
    max-width: 64.8rem;
    width: 100%;
    padding: 0 4.17%;
  }
  a {
    color: #474747;
  }
`;
const UserList = ({ userId, avatar, userName, email }: IUserData) => {
  return (
    <Wrapper>
      <Link to={`/profile/${userId}`}>
        <ProfileCard>
          <div className="userInfo">
            <Avatar src={avatar ? avatar : "/img/user.png"} />
            <div className="infoTitle">
              <div className="userName">{userName}</div>
              <div className="userId">{`${email}`}</div>
            </div>
          </div>
        </ProfileCard>
      </Link>
    </Wrapper>
  );
};

export default UserList;
