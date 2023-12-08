import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "../style/StartPage";
import { Form, useNavigate } from "react-router-dom";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60rem;
  padding: 3rem;
  background-color: #fff;
  border-radius: 1rem;
  transform: translate(-50%, -50%);
  z-index: 9;

  @media screen and (max-width: 648px) {
    width: 90%;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  svg {
    width: 2.5rem;
  }
`;

const FileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10rem;
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    border: 1px solid #ff5d6a;
    box-shadow: 0 0 0 1px #ff5d6a inset;
  }

  svg {
    width: 3.2rem;
    transition: all 0.15s ease-in-out;
  }
  &:hover svg {
    color: #ff5d6a;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 2rem;
  margin-top: 2rem;
  outline: none;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  font-size: 1.8rem;
  transition: all 0.15s ease-in-out;
  &:focus {
    border: 1px solid #ff5d6a;
    box-shadow: 0 0 0 1px #ff5d6a inset;
  }
`;

const ModalFade = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const FileUpload = styled(Input)`
  margin-top: 2rem;
`;

const UploadImg = styled.img`
  max-width: 100%;
  max-height: 40rem;
  border-radius: 0.6rem;
  object-fit: contain;
`;

const WriteModal = ({ setIsModal }: { setIsModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [thread, setThread] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState("");
  const FILE_MAX_SIZE = 2 * 1024 * 1024;

  const onThreadChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setThread(value);
  };

  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (user && files && files.length === 1) {
      if (files[0].size > FILE_MAX_SIZE) {
        alert("사진첨부는 최대 2MB까지 가능합니다.");
      } else {
        setFile(files[0]);
      }
    }
  };

  const onSubmit = async () => {
    if (!user) return;
    if (window.confirm("정말로 게시하겠어요?")) {
      setIsLoading(true);
      try {
        // 쓰레드 insert
        const doc = await addDoc(collection(db, "threads"), {
          userName: user.displayName,
          userId: user.uid,
          thread,
          createdAt: Date.now(),
        });

        // 사진 insert

        if (file) {
          // 스토리지, 폴더구조/파일명
          const locationRef = await ref(storage, `threads/${user.uid}/${doc.id}`);
          // 파일저장
          const result = await uploadBytes(locationRef, file);
          // 파일 url 저장
          const url = await getDownloadURL(result.ref);
          // 쓰레드 update -> fileUrl 추가
          await updateDoc(doc, {
            fileUrl: url,
          });

          // storage에서 uploaded File 제거
          const deleteRef = await ref(storage, `uploads/${user.uid}/${user.uid}${user.displayName}`);
          // 파일저장
          await deleteObject(deleteRef);
        }

        setThread("");
        setFile(null);
        navigate("/");
        setIsModal(false);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // 유저 이미지 변경시 업로드 이미지 노출
    const uploadFileFn = async () => {
      if (file && user) {
        const locationRef = await ref(storage, `uploads/${user.uid}/${user.uid}${user.displayName}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        setUploadedFile(url);
      }
    };
    uploadFileFn();
  }, [file, user]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <Modal>
        <CloseBtn onClick={() => setIsModal(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </CloseBtn>
        <Form name="writeForm" onSubmit={onSubmit} style={{ textAlign: "center" }}>
          {uploadedFile === "" ? (
            <FileLabel htmlFor={"my_file"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </FileLabel>
          ) : (
            <label htmlFor="my_file" style={{ cursor: "pointer" }}>
              <UploadImg src={uploadedFile} alt="" />
            </label>
          )}
          <Input
            type="file"
            id="my_file"
            name="my_file"
            accept="image/gif, image/jpeg, image/png"
            onChange={fileChange}
            style={{ display: "none" }}
          />
          <TextArea placeholder="오늘은 어떤 하루였나요?" value={thread} rows={6} onChange={onThreadChange} />
          <FileUpload type="submit" value={isLoading ? "게시중..." : "게시하기"} className="pink_btn" />
        </Form>
      </Modal>
      <ModalFade />
    </>
  );
};

export default WriteModal;
