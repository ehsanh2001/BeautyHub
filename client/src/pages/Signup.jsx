import Header from "../components/Header";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <main>
      <Header />
      <div className="flex-row justify-center ">
        <SignupForm />
      </div>
    </main>
  );
};

export default Signup;
