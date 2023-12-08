import styled from "styled-components";
import Timeline from "../components/Timeline";

const Wrapper = styled.div`
  width: 64.8rem;
  margin: 0 auto;
  @media screen and (max-width: 1275px) {
    width: 48rem;
  }

  @media screen and (max-width: 768px) {
    width: 46rem;
  }

  @media screen and (max-width: 648px) {
    max-width: 64.8rem;
    width: 100%;
    padding: 0 4.17%;
  }
`;

const Home = () => {
  return (
    <>
      <Wrapper>
        <Timeline />
      </Wrapper>
    </>
  );
};

export default Home;
