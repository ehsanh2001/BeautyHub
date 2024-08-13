import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Auth from "../utils/auth";

const Login = () => {
  return (
    <main>
      <Header />
      
      <div className="container d-flex justify-center">
      <div className="col-12 col-lg-12">
        <div className="card hero shadow p-3 mb-5 bg-body rounded">
        <h4 className="p-2 ">Login</h4>
      <LoginForm />
      </div>
    </div>
      </div>
    </main>
  );
};

export default Login;
