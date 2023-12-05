import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, ErrorMSG, FlexWrap, FormField, Input, LoginTitle, Logo, NoticeMSG } from "../style/StartPage";
import BackgroundField from "../components/BackgroundField";
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
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      } catch (err) {
        if (err instanceof FirebaseError) {
          setError(`${err}`);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <FlexWrap>
        <FormField>
          <Logo>
            <img src="/img/logo.png" alt="로고" />
          </Logo>
          <LoginTitle>회원가입</LoginTitle>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("name", { required: true })} type="text" placeholder="이름을 작성해 주세요." />
            <Input {...register("email", { required: true })} type="email" placeholder="이메일을 작성해 주세요." />
            <Input {...register("password", { required: true })} type="password" placeholder="비밀번호를 작성해 주세요." />
            <Input type="submit" value={isLoading ? "회원가입중..." : "회원가입"} />
          </Form>
          <NoticeMSG>
            <Link to={"/login"}>이미 계정이 있으시다면?</Link>
          </NoticeMSG>
          {error !== "" ? <ErrorMSG>{error}</ErrorMSG> : null}
        </FormField>

        <BackgroundField />
      </FlexWrap>
    </>
  );
};

export default CreateAccount;
