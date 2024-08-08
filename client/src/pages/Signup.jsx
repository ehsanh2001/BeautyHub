import Header from "../components/Header";
import SingupForm from "../components/SignupForm";
import Auth from "../utils/auth";

const Signup = () => {
  return (
    <main className="flex-row justify-center mb-4">
      <h1>Signup page</h1>
      <Header />
      <SingupForm />
    </main>
  );
};

export default Signup;
