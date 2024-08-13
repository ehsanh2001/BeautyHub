import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const SignupForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token, data.addUser.user);
      window.location.assign("/");
    } catch (e) {
      console.error("Error : ");
    }
  };

  return (
    <main className="mb-4">
      <div className="container d-flex justify-center">
        <div className="col-12 col-lg-12">
          <div className="card hero shadow p-3 mb-5 bg-body rounded">
            <h4 className="text-dark p-2">Sign Up</h4>
            <div className="card-body">
              {data ? (
                <p>
                  Success! You may now head{" "}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input rounded"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />

                  <input
                    className="form-input rounded"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <select
                    className="form-input rounded"
                    name="role"
                    value={formState.role}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="customer">Customer</option>
                    <option value="business-owner">Business Owner</option>
                  </select>
                  <button
                    className="btn btn-block bg-dark btn-primary"
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>
              )}
              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
