import styled from "styled-components";

const FloatBtn = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 3rem;
  right: 3rem;
  background-color: #ff5d6a;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
  a {
    padding: 1.6rem;
  }
  svg {
    color: #fff;
    width: 3rem;
  }
`;

const FloatingBtn = () => {
  return (
    <FloatBtn>
      <a href="#">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </a>
    </FloatBtn>
  );
};

export default FloatingBtn;
