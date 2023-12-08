import { useState } from "react";
import styled from "styled-components";
import { IThread } from "../components/Timeline";
import { timeToDate } from "../util/util";
import { TextArea } from "./WriteModal";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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
  position: relative;
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

  .util {
    text-align: right;
    svg {
      width: 2.5rem;
      cursor: pointer;
    }
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

const Utils = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem 0;
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const UtilItem = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #ff5d6a;
  }
  svg {
    width: 2rem;
  }
  .util_text {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.4rem;
  }
`;

const UpdateBtns = styled.div`
  display: flex;
  gap: 0 1rem;
  margin-top: 1.5rem;
`;
const UpdateBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  color: #474747;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 1px solid #ff5d6a;
    background-color: #ff5d6a;
    color: #fff;
  }
`;

const ThreadList = ({ userName, userId, fileUrl, thread, createdAt, avatar, id }: IThread) => {
  const user = auth.currentUser;
  const [text, setText] = useState(thread);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUtil, setIsUtil] = useState(false);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const onUpdate = async () => {
    if (!user) return;
    if (text === "") {
      alert("쓰레드를 작성해주세요!");
      return;
    }

    if (window.confirm("정말로 수정하시겠어요?")) {
      const locationRef = doc(db, "threads", id);
      try {
        await updateDoc(locationRef, {
          thread: text,
        });
        alert("수정이 완료되었어요!");
      } catch (err) {
        alert("수정중 문제가 발생했습니다. 다시 시도해주세요!");
        console.error(err);
      } finally {
        setIsUpdate(false);
      }
    }
  };

  const onDelete = async () => {
    if (window.confirm("정말로 삭제하시겠어요?")) {
      try {
        await deleteDoc(doc(db, "threads", id));
        alert("삭제가 완료되었습니다!");
      } catch (error) {
        alert("삭제중 문제가 발생했습니다. 다시 시도해주세요.");
        console.error(error);
      }
    }
  };

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
        <div className="createdAt">
          {/* 수정, 삭제 등 유틸 / 본인 게시물만 보임 */}
          {userId === user?.uid ? (
            <div className="util" onClick={() => setIsUtil((prev) => !prev)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : null}
          {timeToDate(createdAt)}
        </div>

        {isUtil ? (
          <Utils>
            <UtilItem
              onClick={() => {
                setIsUpdate((prev) => !prev);
                setIsUtil((prev) => !prev);
              }}
            >
              <div className="util_text">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                수정하기
              </div>
            </UtilItem>
            <UtilItem
              onClick={() => {
                setIsUtil((prev) => !prev);
                onDelete();
              }}
            >
              <div className="util_text">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
                삭제하기
              </div>
            </UtilItem>
          </Utils>
        ) : null}
      </Threadtitle>
      {fileUrl ? <ThreadImg src={fileUrl} alt="" /> : null}

      {isUpdate ? (
        <>
          <TextArea defaultValue={text} onChange={onTextChange} name="textarea" rows={6} />
          <UpdateBtns>
            <UpdateBtn onClick={onUpdate}>수정완료</UpdateBtn>
            <UpdateBtn onClick={() => setIsUpdate(false)}>수정취소</UpdateBtn>
          </UpdateBtns>
        </>
      ) : (
        <ThreadText>{thread}</ThreadText>
      )}
    </Wrapper>
  );
};

export default ThreadList;
