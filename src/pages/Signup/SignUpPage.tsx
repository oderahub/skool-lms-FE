import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogo from "/images/decagon-logo.png";
import MainButton from "../../components/MainButton";
import "./SignUpPage.css";
import { ChangeEvent, FormEvent, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { LuEyeOff, LuEye } from "react-icons/lu";

interface validationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  countryOfResidence?: string;
}

function SignUpPage() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [genericError, setGenericError] = useState("");
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors: validationErrors = {};

    if (!firstName.trim()) {
      validationErrors["firstName"] = "First Name is required";
    }

    if (!lastName.trim()) {
      validationErrors["lastName"] = "Last Name is required";
    }

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

    if (!phoneNumber.trim()) {
      validationErrors["phoneNumber"] = "Phone Number is required";
    }

    if (!countryOfResidence.trim()) {
      validationErrors["countryOfResidence"] =
        "Country of Residence is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors as validationErrors);
      return;
    }

    try {
      const res = await axiosInstance.post("/users/register", {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        countryOfResidence,
      });

      console.log("response", res);

      if (res.data.successfulSignup) {
        localStorage.setItem("name", firstName);
        navigate("/check-email");
      } else if (res.data.existingUserError) {
        setGenericError(res.data.existingUserError);
      }
    } catch (error) {
      setGenericError(`${error}`);
    } finally {
      setValidationErrors({});
    }
  };

  return (
    <>
      <div className="bg-[image-url] bg-cover bg-center h-full w-full min-h-screen">
        <section
          className="bg-[image-url] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(16, 24, 40, 0.5), rgba(16, 24, 40, 0.5)), url(${backgroundImage})`,
          }}
        >
          <div className="mx-auto w-10/12 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-center text-2xl w-12/12 font-bold mx-auto md:w-10/12 xl:w-6/12 text-white sm:text-4xl lg:text-5xl lg:w-8/12  leading-tight tracking-wider inknut-antiqua-regular">
              Register to the Applicant Portal
            </h1>

            <div className="  bg-white mx-auto max-w-lg rounded-2xl w-10/12 sm:w-6/12  lg:w-6/12 xl:w-4/12 mt-8">
              <img
                className="mx-auto mt-4 pt-4 max-w-md"
                src={decagonLogo}
                alt="decagon logo"
              />

              <form
                onSubmit={handleSignup}
                className="mb-0  space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
              >
                <p className="text-center text-lg font-medium">
                  Create a new account
                </p>

                {genericError && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-2 relative text-center"
                    role="alert"
                  >
                    <span className=" text-xs">{genericError}</span>
                  </div>
                )}

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex flex-col gap-1">
                    {genericError && (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-2 relative text-center"
                        role="alert"
                      >
                        <span className=" text-xs">{genericError}</span>
                      </div>
                    )}
                    <div>
                      <label htmlFor="firstName" className="">
                        First Name
                      </label>

                      <div className="relative mt-1">
                        <input
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setfirstName(e.target.value)
                          }
                          value={firstName}
                          className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                          id="firstName"
                          type="text"
                          placeholder="Enter your full names"
                        />
                        {validationErrors?.firstName && (
                          <span className="text-red-500 text-sm ml-1">
                            {validationErrors.firstName}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="">
                        Last Name
                      </label>

                      <div className="relative mt-1">
                        <input
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setlastName(e.target.value)
                          }
                          value={lastName}
                          className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                          id="lastName"
                          type="text"
                          placeholder="Enter your full names"
                        />
                        {validationErrors?.lastName && (
                          <span className="text-red-500 text-sm ml-1">
                            {validationErrors.lastName}
                          </span>
                        )}
                      </div>
                    </div>
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
                          className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                          id="email"
                          type="text"
                          placeholder="Enter your email"
                        />
                        {validationErrors?.email && (
                          <span className="text-red-500 text-sm  ml-1">
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
                        {validationErrors?.password && (
                          <span className="text-red-500 text-sm  ml-1">
                            {validationErrors.password}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="">
                        Phone Number
                      </label>
                      <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setPhoneNumber(e.target.value)
                        }
                        value={phoneNumber}
                        className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                        id="phoneNumber"
                        type="text"
                        placeholder="Enter your phone number"
                      />
                      {validationErrors?.phoneNumber && (
                        <span className="text-red-500 text-sm ml-1">
                          {validationErrors.phoneNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative mt-1">
                    <label htmlFor="country">
                      Country of permanent residence
                    </label>

                    <input
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCountryOfResidence(e.target.value)
                      }
                      value={countryOfResidence}
                      className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                      id="country"
                      type="text"
                      placeholder="Nigeria"
                    />
                    {validationErrors?.countryOfResidence && (
                      <span className="text-red-500 text-sm ml-1">
                        {validationErrors.countryOfResidence}
                      </span>
                    )}
                  </div>
                </div>

                <MainButton button_text={"Sign Up"} />

                <p className="text-center text-sm text-gray-500">
                  Already have an account ?{" "}
                  <Link className="text-green-400 hover:underline" to="/login">
                    Sign in here
                  </Link>
                </p>
              </form>
            </div>

            <footer className="w-full text-white mt-12 leading-8 tracking-wider flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
              <h5>Website Terms and Conditions</h5>
              <h5>Privacy Notice</h5>
            </footer>
          </div>
        </section>
      </div>
    </>
  );
}

export default SignUpPage;
