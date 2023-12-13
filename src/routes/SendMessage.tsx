import { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, ErrorMSG, FlexWrap, FormField, Input, LoginTitle, Logo, NoticeMSG } from "../style/StartPage";
import BackgroundField from "../components/BackgroundField";
import { ErrorFilter } from "../util/firebaseErrors";
import AOS from "aos";

interface IInput {
  email: string;
}

const SendMessage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<IInput>();

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    if (isLoading || data.email === "") return;
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, data.email);
      alert("이메일발송이 완료되었습니다! 메일을 확인해 주세요!");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err);
        setError(ErrorFilter(err));
      }
    } finally {
      setIsLoading(false);
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
          <LoginTitle>비밀번호 찾기</LoginTitle>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("email", { required: true })}
              type="email"
              placeholder="비밀번호 재설정 메일을 받을 이메일을 작성해주세요."
              autoComplete="off"
            />
            <Input type="submit" value={isLoading ? "전송중..." : "전송"} className="pink_btn" />
          </Form>
          <NoticeMSG>
            <span onClick={() => navigate(-1)}>뒤로가기</span>
          </NoticeMSG>
          {error !== "" ? <ErrorMSG>{error}</ErrorMSG> : null}
        </FormField>
        <BackgroundField bgType={"send"} />
      </FlexWrap>
    </>
  );
};

export default SendMessage;
