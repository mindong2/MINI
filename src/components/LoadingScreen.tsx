import styled from "styled-components";

const LoadingScreenWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 36px;
`;

const Wrapper = styled.div`
  .spinner {
    animation: rotator 1.4s linear infinite;
  }

  @keyframes rotator {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }
  .path {
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
  }

  @keyframes colors {
    0% {
      stroke: #ff5d6a;
    }
    25% {
      stroke: #ff5d6a;
    }
    50% {
      stroke: #ff5d6a;
    }
    75% {
      stroke: #ff5d6a;
    }
    100% {
      stroke: #ff5d6a;
    }
  }
  @keyframes dash {
    0% {
      stroke-dashoffset: 187;
    }
    50% {
      stroke-dashoffset: 46.75;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 187;
      transform: rotate(450deg);
    }
  }
`;

const LoadingScreen = () => {
  return (
    <LoadingScreenWrap>
      <Wrapper>
        <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
      </Wrapper>
    </LoadingScreenWrap>
  );
};

export default LoadingScreen;
