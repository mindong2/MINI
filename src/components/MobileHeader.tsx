import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  width: 100%;
  height: 8rem;
  background-color: #fff;
  border-bottom: 0.1rem solid #ccc;
  z-index: 101;

  @media screen and (max-width: 648px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const HeaderLogo = styled.img`
  width: 10rem;
  vertical-align: top;
`;

const MobileHeader = () => {
  return (
    <Header>
      <Link to={"/"}>
        <HeaderLogo src="/img/logo_mini.png" alt="헤더로고" />
      </Link>
    </Header>
  );
};

export default MobileHeader;
