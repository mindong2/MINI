import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Unsubscribe, collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import styled from "styled-components";
import ThreadList from "../components/ThreadList";
import { TextArea } from "./WriteModal";

export const Thread = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem 0;
  padding: 5rem 0;
`;

const WriteText = styled.div``;

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
  const [threadData, setThreadData] = useState<IThread[]>([]);
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
          return { email, userId, userName, thread, fileUrl, createdAt, avatar, commentList, likeUser, id: doc.id };
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
      <WriteText>
        <TextArea />
      </WriteText>
      <Thread>
        {threadData.map((thread) => (
          <ThreadList key={thread.id} {...thread} />
        ))}
      </Thread>
    </>
  );
};

export default Timeline;
