import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { Unsubscribe, collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import styled from "styled-components";
import ThreadList from "../components/ThreadList";
import WriteModal from "./WriteModal";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  @media screen and (max-width: 648px) {
    padding: 10rem 0;
  }
`;

export const Thread = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem 0;
  padding: 5rem 0;
`;

const WriteTextWrap = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  img {
    width: 6rem;
    border: 0.1rem solid #ccc;
    border-radius: 50%;
  }
`;

const WriteText = styled.div`
  width: 100%;
  padding: 2rem 1rem;
  font-size: 1.8rem;
  border-bottom: 0.1rem solid #ccc;

  &:focus {
    border: 0;
    box-shadow: none;
    border-bottom: 0.1rem solid #ff5d6a;
  }
`;

interface ICommentList {
  docId: string;
  userId: string;
  userName: string;
  userEmail: string;
  comment: string;
  avatar: string;
}

export interface ILikeUser {
  docId: string;
  userId: string;
  userName: string;
  userEmail: string;
}

export interface IThread {
  id: string;
  userName: string;
  email: string;
  userId: string;
  thread: string;
  fileUrl?: string;
  avatar?: string;
  createdAt: number;
  commentList: ICommentList[];
  likeUser: ILikeUser[];
}

const Timeline = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [threadData, setThreadData] = useState<IThread[]>([]);
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const getData = async () => {
      const fetchQuery = query(collection(db, "threads"), orderBy("createdAt", "desc"), limit(25));

      /* onSnapshot은 문서를 한번만 가져오는것 대신 realtime으로 이벤트 리스너를 연결 (생성, 삭제, 수정 등)
          onSnapshot을 사용할 때는 비용을 지불해야한다.
          따라서 유저가 다른 화면을 보고있으면 작동하지 않게해주는것이 좋다.
          onSnapshot은 실행되면서 해당 이벤트리스닝의 구독을 해제하는 함수를 반환한다.
          변수선언 및 할당을 해주고, useEffect의 return으로 unmount시 해당 함수를 실행되고, 구독해제 된다.
        */

      unsubscribe = await onSnapshot(fetchQuery, (snapshot) => {
        const threadArr = snapshot.docs.map((doc) => {
          const { email, userId, userName, thread, fileUrl, avatar, createdAt, commentList, likeUser } = doc.data();
          return { email, userId, userName, thread, fileUrl, avatar, createdAt, commentList, likeUser, id: doc.id };
        });
        setThreadData(threadArr);
      });
    };

    getData();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [threadData]);
  return (
    <>
      <Wrapper>
        <WriteTextWrap>
          <img src={user?.photoURL ? `${user?.photoURL}` : "/img/user.png"} alt="" onClick={() => navigate(`/profile/${user?.uid}`)} />
          <WriteText onClick={() => setIsModal(true)}>오늘은 어떤 하루였나요?</WriteText>
        </WriteTextWrap>
        <Thread>
          {threadData.map((thread) => (
            <ThreadList key={thread.id} {...thread} />
          ))}
        </Thread>
        {isModal ? <WriteModal setIsModal={setIsModal} /> : null}
      </Wrapper>
    </>
  );
};

export default Timeline;
