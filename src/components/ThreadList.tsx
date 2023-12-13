import { useEffect, useState } from "react";
import styled from "styled-components";
import { ILikeUser, IThread } from "../components/Timeline";
import { timeToDate } from "../util/util";
import { TextArea } from "./WriteModal";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import AOS from "aos";
import { ProfileCard, RecommendWrap } from "./SideUserList";

const Wrapper = styled.li`
  padding: 3rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.6rem;
  background-color: #fff;

  @media screen and (max-width: 648px) {
    padding: 2rem;
  }
`;

export const Threadtitle = styled.div`
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
  max-width: 100%;
  margin-top: 2rem;
  border-radius: 0.5rem;
`;

const ThreadText = styled.p`
  margin-top: 2rem;
  font-size: 1.6rem;
  line-height: 1.3;
`;

export const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  margin-right: 1rem;
  border-radius: 50%;
`;

const ThreadIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 0 1rem;
  margin-top: 1.4rem;
`;
const ThreadIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  cursor: pointer;
  transition: color 0.15s ease-in-out;
  &.on {
    color: #ff5d6a;
  }
  svg {
    margin-right: 0.2rem;
    width: 2rem;
  }
`;

export const CommentAvatar = styled(Avatar)`
  width: 4rem;
  height: 4rem;
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
  border: 0.1rem solid #ccc;
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
  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 0.1rem solid #ff5d6a;
    background-color: #ff5d6a;
    color: #fff;
  }
`;

const CommentBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  span {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 1.6rem;
    color: #ff5d6a;
    cursor: pointer;
  }
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  padding: 1rem 0.5rem;
  border: none;
  border-bottom: 0.1rem solid #ccc;
  color: #474747;
  font-size: 1.6rem;
  padding-right: 3.2rem;
  resize: none;
  outline: none;
  border-radius: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommentText = styled.p`
  display: -webkit-box;
  margin-top: 1rem;
  padding-left: 5rem;
  font-size: 1.4rem;
  line-height: 1.3;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ThreadList = ({ email, userName, userId, fileUrl, thread, createdAt, id, likeUser, commentList, avatar }: IThread) => {
  const user = auth.currentUser;
  const isMyLike = Boolean(likeUser.filter((v) => v.userId === user?.uid).length !== 0);
  const [text, setText] = useState(thread);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUtil, setIsUtil] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLike, setIsLike] = useState(isMyLike);
  const [likeLoading, setLikeLoading] = useState(false);
  const [threadLikeUser, setThreadLikeUser] = useState<ILikeUser[]>(likeUser);
  const [threadLike, setThreadLike] = useState(likeUser.length);
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const noLikeUsers = likeUser.filter((v) => v.userId !== user?.uid);
  const onLike = async () => {
    setLikeLoading(true);
    setThreadLikeUser(noLikeUsers);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setComment(value);
  };

  const commentSubmit = async () => {
    if (comment === "") {
      alert("댓글을 작성해주세요!");
      return;
    }
    if (window.confirm("댓글을 작성하시겠어요?")) {
      try {
        await updateDoc(doc(db, `threads/${id}`), {
          commentList: [
            ...commentList,
            {
              docId: id,
              userId: user?.uid,
              userName: user?.displayName,
              userEmail: user?.email,
              avatar: user?.photoURL,
              comment,
              createdAt: Date.now(),
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    }
    setComment("");
    setIsCommenting(true);
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

  useEffect(() => {
    const onLikeFn = async () => {
      try {
        // state수정이 먼저 이루어진 후 아래 쿼리 실행 되게끔
        if (!isLike) {
          await updateDoc(doc(db, `threads/${id}`), {
            likeUser: [
              ...likeUser,
              {
                docId: id,
                userId: user?.uid,
                userName: user?.displayName,
                userEmail: user?.email,
              },
            ],
          });
          setThreadLike((prev) => prev + 1);
          setIsLike(true);
        } else {
          if (threadLikeUser.length !== 1) {
            await updateDoc(doc(db, `threads/${id}`), {
              likeUser: threadLikeUser,
            });
          } else {
            await updateDoc(doc(db, `threads/${id}`), {
              likeUser: noLikeUsers,
            });
          }
          console.log(threadLikeUser);
          setThreadLike((prev) => prev - 1);
          setIsLike(false);
        }
      } catch (err) {
        console.log(err);
      }
      setLikeLoading(false);
    };

    if (likeLoading) {
      onLikeFn();
    }
  }, [likeLoading, threadLikeUser]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Wrapper data-aos="fade-up" data-aos-duration="500">
      <Threadtitle>
        <div className="userInfo">
          <Link to={`/profile/${userId}`}>
            <Avatar src={avatar ? avatar : "/img/user.png"} />
          </Link>
          <div className="infoTitle">
            <div className="userName">{userName}</div>
            <div className="userId">{`${email}`}</div>
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
      {fileUrl ? (
        <div style={{ textAlign: "center" }}>
          {" "}
          <ThreadImg src={fileUrl} alt="" />
        </div>
      ) : null}

      {isUpdate ? (
        <>
          <TextArea defaultValue={text} onChange={onTextChange} name="textarea" rows={4} />
          <UpdateBtns>
            <UpdateBtn onClick={onUpdate}>수정완료</UpdateBtn>
            <UpdateBtn onClick={() => setIsUpdate(false)}>수정취소</UpdateBtn>
          </UpdateBtns>
        </>
      ) : (
        <ThreadText>{thread}</ThreadText>
      )}

      <ThreadIcons>
        {/* 좋아요 */}
        <ThreadIcon onClick={onLike} className={isLike ? "on" : ""}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          {`${threadLike}`}
        </ThreadIcon>
        <ThreadIcon onClick={() => setIsCommenting((prev) => !prev)} className={isCommenting ? "on" : ""}>
          {/* 댓글 */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
          {commentList.length}개
        </ThreadIcon>
      </ThreadIcons>

      <CommentBox>
        <CommentTextArea placeholder="댓글을 작성해보세요!" onChange={onCommentChange} value={comment} rows={1} />
        <span onClick={commentSubmit}>게시</span>
      </CommentBox>

      {isCommenting ? (
        <RecommendWrap>
          {commentList.map((data, idx) => (
            <div key={idx} style={{ paddingBottom: "1.6rem", borderBottom: "0.1rem solid #ccc" }}>
              <ProfileCard>
                <div className="userInfo">
                  <Link to={`/profile/${data.userId}`}>
                    <CommentAvatar src={data.avatar ? data.avatar : "/img/user.png"} />
                  </Link>
                  <div className="infoTitle">
                    <div className="userName">{data.userName}</div>
                    <div className="userId">{`${data.userEmail}`}</div>
                  </div>
                </div>
              </ProfileCard>
              <CommentText>{data.comment}</CommentText>
            </div>
          ))}
        </RecommendWrap>
      ) : null}
    </Wrapper>
  );
};

export default ThreadList;
