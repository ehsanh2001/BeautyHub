import Header from "../components/Header";
import SingupForm from "../components/SignupForm";
import Auth from "../utils/auth";

const Signup = () => {
  return (
    <main className="flex-row justify-center mb-4">
      <Header />
      <SingupForm />
    </main>
  );
};

export default Signup;
