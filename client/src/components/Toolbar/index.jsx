import { Link } from "react-router-dom";

const Toolbar = () => {
  return (
    <div className="flex-row">
      <h2>ToolBar Component</h2>
      <Link className="mx-1" to="/">
        Home
      </Link>
      <Link className="mx-1" to="/login">
        Login
      </Link>
      <Link className="mx-1" to="/signup">
        Signup
      </Link>
      <Link className="mx-1" to="/dashboard">
        Dashboard
      </Link>
    </div>
  );
};

export default Toolbar;
