import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export const Form = styled.form``;

export const Input = styled.input`
  display: flex;
  padding: 5px 10px;
  border: 1px solid #ccc;
  outline: none;
  transition: all 0.15s ease-in-out;
  &:focus {
    border: 1px solid #ca2cc2f4;
  }
`;

export const ErrorMSG = styled.p`
  margin-top: 10px;
  color: red;
  font-size: 20px;
`;

interface IInput {
  name: string;
  email: string;
  password: string;
}

const CreateAccount = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInput>();

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
        console.log(credential.user);
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name", { required: true })} type="text" placeholder="이름을 작성해 주세요." />
        <Input {...register("email", { required: true })} type="email" placeholder="이메일을 작성해 주세요." />
        {errors.email && <ErrorMSG>{errors.email?.message}</ErrorMSG>}
        <Input {...register("password", { required: true })} type="password" placeholder="비밀번호를 작성해 주세요." />
        {errors.password && <ErrorMSG>{errors.password?.message}</ErrorMSG>}
        <Input type="submit" value={isLoading ? "회원가입중..." : "회원가입"} />
      </Form>
      {error !== "" ? <ErrorMSG>{error}</ErrorMSG> : null}
    </>
  );
};

export default CreateAccount;
