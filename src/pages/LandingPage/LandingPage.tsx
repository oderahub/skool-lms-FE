import React from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogo from "/images/decagon-logo.png";
import MainButton from "../../components/MainButton";
import "./LandingPage.css";
import { ChangeEvent, FormEvent, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { LuEyeOff, LuEye } from "react-icons/lu";

interface validationErrors {
  email?: string;
  password?: string;
}

function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [genericError, setGenericError] = useState("");
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors: validationErrors = {};

    if (!email.trim()) {
      validationErrors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors["email"] = "Email is invalid";
    }

    if (!password.trim()) {
      validationErrors["password"] = "Password is required";
    } else if (password.trim().length < 6) {
      validationErrors["password"] = "Password must be at least 6 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors as validationErrors);
      return;
    }

    try {
      const res = await axiosInstance.post("/users/login", {
        email: email,
        password: password,
      });

      if (res.data.userNotOnboarded) {
        localStorage.setItem("token", res.data.token);
        navigate(`/dashboard/onboarding`);
      } else if (res.data.userOnboarded) {
        localStorage.setItem("token", res.data.token);
        navigate(`/dashboard`);
      } else if (res.data.adminSuccessMessage) {
        localStorage.setItem("token", res.data.token);
        navigate(`/admin/applications-section`);
      } else if (res.data.error) {
        setGenericError(res.data.error);
        return;
      }
    } catch (error) {
      setGenericError(`${error}`);
    } finally {
      setValidationErrors({});
    }
  };

  return (
    <section
      className="bg-[image-url] bg-cover bg-center min-h-screen "
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(16, 24, 40, 0.5), rgba(16, 24, 40, 0.5)), url(${backgroundImage})`,
      }}
    >
      <div className="mx-auto w-10/12 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl w-12/12 font-bold mx-auto md:w-10/12 xl:w-6/12 text-white sm:text-4xl lg:text-5xl lg:w-8/12  leading-tight tracking-wider inknut-antiqua-regular">
          Welcome to the Applicant Portal
        </h1>
        <div className="  bg-white mx-auto max-w-lg rounded-2xl w-10/12 sm:w-6/12  lg:w-6/12 xl:w-4/12 mt-8">
          <Link to={`/`}>
            <img
              className="mx-auto mt-4 pt-4 max-w-md"
              src={decagonLogo}
              alt="decagon logo"
            />
          </Link>

          <form
            onSubmit={handleLogin}
            className="mb-0  space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Login to the Applicant Portal
            </p>
            {genericError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-2 relative text-center"
                role="alert"
              >
                <span className=" text-xs">{genericError}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="">
                Email Address
              </label>

              <div className="relative mt-1">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  value={email}
                  type="text"
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                  placeholder="Enter your email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
                {validationErrors?.email && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.email}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="">
                Password
              </label>

              <div className="relative mt-1">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  value={password}
                  type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                  placeholder="Enter your password"
                />

                {validationErrors?.password && (
                  <span className="text-red-500 text-sm  ml-1">
                    {validationErrors.password}
                  </span>
                )}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 py-3 flex items-center focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state on button click
                >
                  {showPassword ? (
                    <LuEye className="h-4 w-4 text-gray-400" />
                  ) : (
                    <LuEyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <p className="text-right text-sm font-medium underline text-blue-600">
              <Link to="/reset-password">Forgot password</Link>
            </p>

            <MainButton button_text={"Login"} />

            <p className="text-center text-sm text-gray-500">
              No account ?
              <Link className="text-green-400 hover:underline" to="/register">
                {" "}
                Create One
              </Link>
            </p>
          </form>
        </div>
        <footer className="w-full text-white mt-12 leading-8 tracking-wider flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
          <h5>Website Terms and Conditions</h5>
          <h5>Privacy Notice </h5>
        </footer>
      </div>
    </section>
  );
}

export default LandingPage;
