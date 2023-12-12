import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, ErrorMSG, FlexWrap, FormField, Input, LoginTitle, Logo, NoticeMSG } from "../style/StartPage";
import BackgroundField from "../components/BackgroundField";
import { ErrorFilter } from "../util/firebaseErrors";
import { doc, setDoc } from "firebase/firestore";
import "aos/dist/aos.css";
import AOS from "aos";

interface IInput {
  name: string;
  email: string;
  password: string;
}

const CreateAccount = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<IInput>();

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    if (isLoading || data.name === "" || data.email === "" || data.password === "") return;
    // firebase 회원가입
    if (window.confirm("정말로 가입하시겠습니까?")) {
      try {
        setIsLoading(true);
        const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        await updateProfile(credential.user, {
          displayName: data.name,
        });
        await setDoc(doc(db, `userInfo`, `${credential.user.uid}`), {
          userName: credential.user.displayName,
          email: credential.user.email,
          avatar: credential.user.photoURL,
          userId: credential.user.uid,
          createdAt: Date.now(),
        });
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      } catch (err) {
        if (err instanceof FirebaseError) {
          console.log(err);
          setError(ErrorFilter(err));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <FlexWrap>
        <FormField data-aos="fade-right" data-aos-duration="500">
          <Logo>
            <img src="/img/logo.png" alt="로고" />
          </Logo>
          <LoginTitle>회원가입</LoginTitle>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("name", { required: true })} type="text" placeholder="이름을 작성해 주세요." />
            <Input {...register("email", { required: true })} type="email" placeholder="이메일을 작성해 주세요." />
            <Input {...register("password", { required: true })} type="password" placeholder="비밀번호를 작성해 주세요." />
            {error !== "" ? <ErrorMSG>{error}</ErrorMSG> : null}
            <Input type="submit" value={isLoading ? "회원가입중..." : "회원가입"} className="pink_btn" />
          </Form>
          <NoticeMSG>
            <Link to={"/login"}>이미 계정이 있으시다면?</Link>
          </NoticeMSG>
        </FormField>

        <BackgroundField bgType={"create"} />
      </FlexWrap>
    </>
  );
};

export default CreateAccount;
