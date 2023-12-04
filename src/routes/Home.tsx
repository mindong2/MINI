import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const Home = () => {
  return (
    <>
      <button onClick={() => signOut(auth)}>asdad</button>
    </>
  );
};

export default Home;
