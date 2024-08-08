import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Auth from "../utils/auth";

const Login = () => {
  return (
    <main className="flex-row justify-center mb-4">
      <h1>Login page</h1>
      <Header />
      <LoginForm />
    </main>
  );
};

export default Login;
