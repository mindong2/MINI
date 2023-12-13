import styled from "styled-components";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
export const Aside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 30rem;
  padding: 3rem;
  border-right: 0.1rem solid #ccc;
  background-color: #fff;
  z-index: 11;
  @media screen and (max-width: 1275px) {
    width: 10rem;

    .tab_text {
      display: none;
    }
  }

  @media screen and (max-width: 648px) {
    top: initial;
    width: 100%;
    height: 8rem;
    padding: 2rem 3rem;
    border-right: none;
    border-top: 0.1rem solid #ccc;
  }
`;

const MenuLogo = styled.h1`
  margin-left: -1.2rem;
  text-align: center;
  a {
    display: flex;
    width: 13rem;
    height: 6rem;
    background: url("/img/logo_mini.png") no-repeat center center / 13rem;
  }

  @media screen and (max-width: 1275px) {
    a {
      width: 5rem;
      height: 5rem;
      background: url("/img/logo_icon.png") no-repeat center left / 5rem;
    }
  }

  @media screen and (max-width: 648px) {
    display: none;
  }
`;

const Menu = styled.ul`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem 0;

  @media screen and (max-width: 648px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
    margin-top: 0;
  }
`;

const MenuTab = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1rem;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    background-color: #ff5d6a;
    transform-origin: center left;
    transition: all 0.2s ease-in-out;
  }

  &:hover,
  &.on {
    color: #ff5d6a;

    &::after {
      transform: scaleX(1);
      transition: all 0.2s ease-in-out;
    }
  }

  svg,
  img {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    border-radius: 50%;
  }

  @media screen and (max-width: 648px) {
    &::after {
      display: none;
    }
    &.menu_home {
      order: 0;
    }

    &.menu_recommend {
      order: 1;
    }

    &.menu_write {
      order: 2;
    }

    &.menu_profile {
      order: 3;
    }

    &.menu_logout {
      order: 4;
    }

    svg,
    img {
      width: 3rem;
      height: 3rem;
      margin-right: none;
    }
  }
`;
const Sidebar = ({ setIsModal }: { setIsModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const Logout = () => {
    if (window.confirm("로그아웃 하시겠어요?")) {
      signOut(auth);
    }
    navigate("/login");
  };

  return (
    <Aside>
      <MenuLogo>
        <Link to={"/"}></Link>
      </MenuLogo>
      <Menu>
        <MenuTab onClick={() => navigate("/")} className={`menu_home ${pathname === "/" ? "on" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          <span className="tab_text">홈</span>
        </MenuTab>

        <MenuTab onClick={() => setIsModal(true)} className="menu_write">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
          <span className="tab_text">글쓰기</span>
        </MenuTab>

        <MenuTab onClick={() => navigate("/recommend-user")} className={`menu_recommend ${pathname === "/recommend-user" ? "on" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>

          <span className="tab_text">추천친구</span>
        </MenuTab>

        <MenuTab onClick={() => navigate(`/profile/${user?.uid}`)} className={`menu_profile ${id === `${user?.uid}` ? "on" : ""}`}>
          {user?.photoURL !== null ? <img src={user?.photoURL} alt="" /> : <img src="/img/user.png" alt="" />}

          <span className="tab_text">프로필</span>
        </MenuTab>

        <MenuTab onClick={Logout} className="menu_logout">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="tab_text">로그아웃</span>
        </MenuTab>
      </Menu>
    </Aside>
  );
};

export default Sidebar;
