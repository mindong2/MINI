import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { ErrorMSG, Input } from "./CreateAccount";
import { FirebaseError } from "firebase/app";
import GithubBtn from "../components/GithubBtn";
import GoogleBtn from "../components/GoogleBtn";

interface IInput {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInput>();
  console.log(auth.currentUser);

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    if (isLoading || data.email === "" || data.password === "") return;
    // firebase 로그인
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(`${err}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("email", { required: true })} type="email" placeholder="이메일을 작성해 주세요." />
        {errors.email && <ErrorMSG>{errors.email?.message}</ErrorMSG>}
        <Input {...register("password", { required: true })} type="password" placeholder="비밀번호를 작성해 주세요." />
        {errors.password && <ErrorMSG>{errors.password?.message}</ErrorMSG>}
        <Input type="submit" value={isLoading ? "로그인중..." : "로그인"} />
      </Form>
      <GithubBtn />
      <GoogleBtn />
      {error !== "" ? <ErrorMSG>{error}</ErrorMSG> : null}
    </>
  );
};

export default Login;
