import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const authToken = useSelector(state => state.application.authToken)
  return (
    <div className="main">
      <nav className="my-nav">{
        !authToken && (
          <>
            <Link to="/sign_up">Create Account </Link>
            <Link to="/login">Sign In</Link>
          </>
        )
      }</nav>
      
      <Outlet />
      
    </div>
  );
}

export default App
