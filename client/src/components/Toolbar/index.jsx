import { Link } from "react-router-dom";

const Toolbar = () => {
  return (
    <div className="flex-row">
      <h2>ToolBar Component</h2>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default Toolbar;
