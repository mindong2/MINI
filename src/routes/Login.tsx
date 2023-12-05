import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import GithubBtn from "../components/GithubBtn";
import GoogleBtn from "../components/GoogleBtn";
import { Form, ErrorMSG, FlexWrap, FormField, Input, LoginTitle, Logo, NoticeMSG } from "../style/StartPage";
import BackgroundField from "../components/BackgroundField";
import { ErrorFilter } from "../util/firebaseErrors";

interface IInput {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<IInput>();

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    if (isLoading || data.email === "" || data.password === "") return;
    // firebase 로그인
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err);
        setError(ErrorFilter(err));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <FlexWrap>
        <FormField>
          <Logo>
            <img src="/img/logo.png" alt="로고" />
          </Logo>
          <LoginTitle>로그인</LoginTitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("email", { required: true })} type="email" placeholder="이메일을 작성해 주세요." />
            <Input {...register("password", { required: true })} type="password" placeholder="비밀번호를 작성해 주세요." />
            {error !== "" ? <ErrorMSG>{error}</ErrorMSG> : null}

            <Input type="submit" value={isLoading ? "로그인중..." : "로그인"} className="pink_btn" />
          </Form>
          <GithubBtn />
          <GoogleBtn />
          <NoticeMSG>
            <Link to={"/create-account"}>아직 계정이 없으시다면?</Link>
          </NoticeMSG>

          <NoticeMSG>
            <Link to={"/send-message"}>비밀번호를 잊어버렸어요</Link>
          </NoticeMSG>
        </FormField>

        <BackgroundField bgType={"login"} />
      </FlexWrap>
    </>
  );
};

export default Login;
