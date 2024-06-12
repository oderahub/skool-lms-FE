import { useState } from "react";
import MainButton from "../../components/MainButton";
import axiosInstance from "../../utils/axiosInstance";
import { LuEyeOff, LuEye } from "react-icons/lu";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // State to track password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password does not match");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    try {
      const res = await axiosInstance.post("/users/change-password", {
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      if (res.data.successMessage) {
        setSuccessMessage(res.data.successMessage);
      } else if (res.data.noTokenError) {
        setErrorMessage(res.data.noTokenError);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (res.data.userNotFoundError) {
        setErrorMessage(res.data.userNotFoundError);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (res.data.incorrectPasswordError) {
        setErrorMessage(res.data.incorrectPasswordError);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
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
    <div className="p-10">
      <div className="w-10/12 bg-white border rounded-xl py-8 px-8">
        <h2 className="text-[1.5rem] mb-8">Change Password</h2>

        <form className="w-full py-2 mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 text-left">
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 py-2 rounded-lg my-1 relative text-center"
                role="alert"
              >
                <span className=" text-xs">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div>
                <div
                  className="bg-green-100 border border-green-400 text-green-700 py-2 rounded-lg my-1 relative text-center"
                  role="alert"
                >
                  <span className=" text-xs">{successMessage}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="currentPassword">Current Password</label>

              <div className=" relative">
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded-lg border border-gray-200 py-2 px-4 text-sm focus:outline-none focus:border-green-600 w-full "
                type={showCurrentPassword ? "text" : "password"} 
                name="currentPassword"
                id="currentPassword"
                value={currentPassword}
              />
              <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 py-3 flex items-center focus:outline-none"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)} 
                >
                  {showCurrentPassword ? (
                    <LuEye className="h-4 w-4 text-gray-400" />
                  ) : (
                    <LuEyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword">New Password</label>
              <div className=" relative">

              
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-lg border border-gray-200 py-2 px-4 text-sm focus:outline-none focus:border-green-600 w-full"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
              />
              <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 py-3 flex items-center focus:outline-none"
                  onClick={() => setShowNewPassword(!showNewPassword)} 
                >
                  {showNewPassword ? (
                    <LuEye className="h-4 w-4 text-gray-400" />
                  ) : (
                    <LuEyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className=" relative">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-lg border border-gray-200 py-2 px-4 text-sm focus:outline-none focus:border-green-600 w-full"
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword"
                id="confirmPassword"
              />
              <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 py-3 flex items-center focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                >
                  {showConfirmPassword ? (
                    <LuEye className="h-4 w-4 text-gray-400" />
                  ) : (
                    <LuEyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              
              
            </div>

            <div className="mt-4">
              <MainButton button_text={"Change password"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
