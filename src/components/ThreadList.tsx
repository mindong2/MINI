import { useState } from "react";
import styled from "styled-components";
import { IThread } from "../components/Timeline";
import { timeToDate } from "../util/util";

const Wrapper = styled.li`
  padding: 3rem;
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  background-color: #fff;

  @media screen and (max-width: 648px) {
    padding: 2rem;
  }
`;

const Threadtitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem 0;

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

  .createdAt {
    color: #888;
    font-size: 1.2rem;
  }
`;

const ThreadImg = styled.img`
  width: 100%;
  margin-top: 2rem;
`;

const ThreadText = styled.p`
  margin-top: 2rem;
  font-size: 1.4rem;
  line-height: 1.3;
`;

const Avatar = styled.img`
  width: 5rem;
  margin-right: 1rem;
  border-radius: 50%;
`;

const ThreadList = ({ userName, userId, fileUrl, thread, createdAt, avatar, id }: IThread) => {
  const [text, setText] = useState(thread);
  return (
    <Wrapper>
      <Threadtitle>
        <div className="userInfo">
          <Avatar src={avatar ? avatar : "/img/user.png"} />
          <div className="infoTitle">
            <div className="userName">{userName}</div>
            <div className="userId">{`#${userId.slice(0, 6)}`}</div>
          </div>
        </div>
        <div className="createdAt">{timeToDate(createdAt)}</div>
      </Threadtitle>
      {fileUrl ? <ThreadImg src={fileUrl} alt="" /> : null}
      <ThreadText>{text}</ThreadText>
    </Wrapper>
  );
};

export default ThreadList;
