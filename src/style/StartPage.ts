// 회원가입, 로그아웃 공통 스타일

import styled from "styled-components";
import "swiper/css";

export const Logo = styled.div`
  width: 40rem;
  margin: 8rem 0 5rem 0;
  & img {
    width: 100%;
  }
`;

export const FlexWrap = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const FormField = styled.section`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64.8rem;
  min-width: 64.8rem;
  padding: 0 8rem;
  @media screen and (max-width: 648px) {
    flex: 1;
    width: 100%;
    min-width: unset;
    padding: 4rem;
  }
`;

export const BgField = styled.section`
  position: relative;
  flex: 0.7;
  .mySwiper {
    width: 100%;
    max-width: 127.2rem;
    height: 100vh;
  }

  .bg_slide {
    width: 100%;
    transition-duration: 1500ms !important;
    background: url("https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
      no-repeat top left / cover;
  }
  .bg_slide2 {
    background: url("https://smashinglogo.com/v3/envision/image.jpg?id=0557c037-ef24-4b62-bb8a-20737f5bf189&format=desktop") no-repeat top left /
      cover;
  }

  .bg_slide3 {
    background: url("https://smashinglogo.com/v3/envision/image.jpg?id=50fc6d7a-bd10-4fcd-842b-39405e27eaea&format=desktop") no-repeat top left /
      cover;
  }

  .bg_slide4 {
    background: url("https://images.unsplash.com/photo-1560232216-3d0dcb7afd5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
      no-repeat top left / cover;
  }

  .bg_slide5 {
    background: url("https://images.unsplash.com/photo-1457364887197-9150188c107b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
      no-repeat top left / cover;
  }

  @media screen and (max-width: 648px) {
    display: none;
  }
`;

export const LoginTitle = styled.h1`
  margin-bottom: 3rem;
  font-size: 4.4rem;
  font-weight: bold;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const Input = styled.input`
  display: flex;
  width: 100%;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  outline: none;
  font-size: 1.8rem;
  transition: all 0.15s ease-in-out;
  &:focus {
    border: 1px solid #ff5d6a;
    box-shadow: 0 0 0 1px #ff5d6a inset;
  }

  &[type="submit"] {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    font-weight: 500;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: #ff5d6a;
      color: #fff;
      border: 1px solid #ff5d6a;
      box-shadow: none;
    }
    &.pink_btn {
      background-color: #ff5d6a;
      color: #fff;
      border: 1px solid #ff5d6a;
      box-shadow: none;
    }
  }
`;

export const ErrorMSG = styled.p`
  color: red;
  font-size: 2rem;
`;

export const NoticeMSG = styled(ErrorMSG)`
  margin-top: 2rem;
  font-size: 2rem;
  color: #ff5d6a;
  cursor: pointer;
  a {
    color: #ff5d6a;
  }
`;
