import MainButton from "../../components/MainButton";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { login } from "../../states/userDetails/userDetailsSlice";

function Profile() {
  const user = useSelector((state: RootState) => state.userDetails);

  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [country, setCountry] = useState(user.country);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      setPhoneNumber(user.phone);
      setCountry(user.country);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.put("/users/edit-profile", {
        phoneNumber: phoneNumber,
        countryOfResidence: country,
      });

      if (res.data.noTokenError) {
        setErrorMessage(res.data.noTokenError);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (res.data.userNotFoundError) {
        setErrorMessage(res.data.userNotFoundError);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (res.data.successMessage) {
        const updatedUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: phoneNumber,
          country: country,
        };

        dispatch(login(updatedUser));

        setSuccessMessage(res.data.successMessage);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <div className=" w-10/12  py-6 px-12 bg-white rounded-xl mt-6">
        <h1 className="text-left text-[1.5rem] mb-4">My Profile</h1>

        <div>
          <form
            onSubmit={handleSubmit}
            className=" w-full flex flex-col justify-start gap-6 py-6  rounded-lg"
            action=""
          >
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 py-2 rounded-lg my-1 relative text-center text-base"
                role="alert"
              >
                <span className=" text-xs">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div>
                <div
                  className="bg-green-100 border border-green-400 text-green-700 py-2 rounded-lg my-1 relative text-center text-base"
                  role="alert"
                >
                  <span className=" text-xs">{successMessage}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="firstName">
                First Name
              </label>
              <input
                className=" border rounded-lg py-3 px-4 bg-gray-100 focus:outline-none focus:border-gray-200"
                type="text"
                id="firstName"
                value={user.firstName}
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName">
                Last Name
              </label>
              <input
                className=" border rounded-lg py-3 px-4 bg-gray-100 focus:outline-none focus:border-gray-200"
                type="text"
                id="lastName"
                value={user.lastName}
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">
                Email
              </label>
              <input
                className=" border rounded-lg py-3 px-4 bg-gray-100 focus:outline-none focus:border-gray-200"
                type="email"
                id="email"
                value={user.email}
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <label  htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                className=" border rounded-lg py-3 px-4 focus:outline-none focus:border-green-600"
                type="text"
                id="phoneNumber"
                value={phoneNumber}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="countryofResidence">
                Country
              </label>
              <input
                onChange={(e) => setCountry(e.target.value)}
                className=" border rounded-lg py-3 px-4 focus:outline-none focus:border-green-600"
                type="text"
                id="countryofResidence"
                value={country}
              />
            </div>

            <div>
              <MainButton button_text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
