import Navbar from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        {user ? <div> Welcome {user.displayName} </div> : <div>Homepage </div>}
      </div>
    </div>
  );
}
