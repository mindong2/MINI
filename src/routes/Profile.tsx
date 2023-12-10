import { DocumentData, collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { IThread, Thread } from "../components/Timeline";
import ThreadList from "../components/ThreadList";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
const Wrapper = styled.div`
  width: 64.8rem;
  margin: 0 auto;
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
`;
export const NoticeBar = styled.div`
  padding: 1rem;
  background-color: #ff5d6a;
  color: #fff;
  border-radius: 4px;
  margin-top: 3rem;
  margin-bottom: -2rem;
  font-size: 24px;
  font-weight: bold;
`;
const ProfileTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  text-align: center;
`;

const NameWrap = styled.div`
  display: inline-block;
  position: relative;
`;

const ProfileImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
`;

const ProfileName = styled.div`
  margin-top: 1rem;
  font-size: 3.2rem;
`;
const ProfileIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: -3rem;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ff5d6a;
  }

  &.check {
    bottom: 1rem;
    right: 2.5rem;
  }

  &.cancel {
    bottom: 1rem;
    right: 0;
  }

  svg {
    width: 2.5rem;
  }
`;

const ProfileNameInput = styled.input`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  max-width: 30rem;
  padding: 0 0 0.5rem 0;
  font-size: 3rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  text-align: center;
`;

interface IUserInfo {
  avatar: string;
  createdAt: number;
  email: string;
  userId: string;
  userName: string;
}

const Profile = () => {
  const user = auth.currentUser;
  const FILE_MAX_SIZE = 2 * 1024 * 1024;
  const { id: urlUserId } = useParams();

  const [userInfo, setUserInfo] = useState<DocumentData | undefined | IUserInfo>(undefined);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [threads, setThreads] = useState<IThread[]>([]);
  const [avatar, setAvatar] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [userName, setUserName] = useState(userInfo?.userName);

  const getUserInfo = async () => {
    const docRef = doc(db, "userInfo", `${urlUserId}`);
    const snapshot = await getDoc(docRef);
    const snapData = snapshot.data();
    setUserInfo(snapData);
    if (snapData?.avatar === null) {
      setAvatar("/img/user.png");
    } else {
      setAvatar(snapData?.avatar);
    }
  };

  const userNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserName(value);
  };

  const userNameSubmit = async () => {
    if (window.confirm("이름을 수정하시겠어요?")) {
      try {
        await updateDoc(doc(db, `userInfo`, `${userInfo?.userId}`), {
          userName,
        });

        // threads에서 userId에 대한 모든 게시글들 이름을 바꿈
        alert("이름이 수정되었습니다!");
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getThreads = async () => {
    const fetchQuery = query(collection(db, "threads"), where("userId", "==", urlUserId), orderBy("createdAt", "desc"), limit(25));
    const snapshot = await getDocs(fetchQuery);
    const threadsList = snapshot.docs.map((doc) => {
      const { email, userId, userName, thread, fileUrl, createdAt } = doc.data();
      return { email, userId, userName, thread, fileUrl, createdAt, id: doc.id };
    });
    setThreads(threadsList);
  };

  const avatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (user && files && files.length === 1) {
      if (files[0].size > FILE_MAX_SIZE) {
        alert("사진첨부는 최대 2MB까지 가능합니다.");
        return;
      } else {
        setAvatarFile(files[0]);
      }
    }
  };

  const avatarURLChange = async () => {
    if (avatarFile && user) {
      // 스토리지, 폴더구조/파일명
      const locationRef = await ref(storage, `avatars/${user.uid}`);
      // 파일저장
      const result = await uploadBytes(locationRef, avatarFile);
      // 파일 url 저장
      const url = await getDownloadURL(result.ref);
      setAvatar(url);
      // 쓰레드 update -> fileUrl 추가
      await updateProfile(user, { photoURL: url });
      await updateDoc(doc(db, "userInfo", `${urlUserId}`), {
        avatar: url,
      });
      window.location.reload();
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getThreads();
  }, [urlUserId]);

  useEffect(() => {
    avatarURLChange();
  }, [user, avatarFile]);

  return (
    <>
      <Wrapper>
        <ProfileTitle>
          {user?.uid === urlUserId ? (
            <>
              <label htmlFor="profile_file" style={{ display: "block", cursor: "pointer" }}>
                <ProfileImg src={`${avatar}`} alt="" />
              </label>
              <input
                type="file"
                id="profile_file"
                name="profile_file"
                onChange={avatarChange}
                accept="image/gif, image/jpeg, image/png"
                style={{ display: "none" }}
              />
            </>
          ) : (
            <ProfileImg src={avatar !== "" ? `${avatar}` : "/img/user.png"} alt="" />
          )}
          {isUpdate ? (
            <NameWrap>
              <ProfileNameInput type="text" defaultValue={userInfo?.userName} onChange={userNameChange} maxLength={8} />
              {/* 완료 */}
              <ProfileIcon className="check" onClick={userNameSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </ProfileIcon>
              {/* 취소 */}
              <ProfileIcon className="cancel" onClick={() => setIsUpdate(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </ProfileIcon>
            </NameWrap>
          ) : (
            <NameWrap>
              <ProfileName>{userInfo?.userName}</ProfileName>
              <ProfileIcon onClick={() => setIsUpdate(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </ProfileIcon>
            </NameWrap>
          )}
        </ProfileTitle>
        <NoticeBar>{userInfo?.userName}님이 작성한 글</NoticeBar>
        <Thread>
          {threads.map((thread) => (
            <ThreadList key={thread.id} {...thread} avatar={userInfo?.avatar} />
          ))}
        </Thread>
      </Wrapper>
    </>
  );
};

export default Profile;
