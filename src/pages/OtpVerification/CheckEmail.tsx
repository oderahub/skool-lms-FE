import MainButton from "../../components/MainButton";
import { useNavigate } from "react-router-dom";
import backgroundImage from "/images/signup-background-image.jpeg";
import { ChangeEvent, FormEvent, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function CheckEmail() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const HandleVerifyEmail = async (e: FormEvent) => {
    e.preventDefault();

    if (!otp) {
      setError("All fields are required, please fill out all fields");
      return;
    }

    const res = await axiosInstance.post("/users/verify-otp", {
      otp,
    });

    if (res.data.verifySuccessful) {

        setSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 5000); 
 
    } else if (res.data.invalidOtp) {
      setOtp("");
      setError(res.data.invalidOtp);
    } else if (res.data.expiredOtp) {
      setOtp("");
      setError(res.data.invalidOtp);
    }
  };

  return (
    <>
      <div
        className="bg-[image-url] bg-cover bg-center h-screen pt-16"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(16, 24, 40, 0.5), rgba(16, 24, 40, 0.5)), url(${backgroundImage})`,
        }}
      >
        <div className="w-5/12 mx-auto bg-white text-center py-10 px-4 rounded-lg">
          <div>
            <h3 className=" text-2xl mb-10 font-medium">
              Verify your Applicant Portal email address.
            </h3>
          </div>
          <div className="flex flex-col gap-6">
            <h5 className="text-xl font-medium">Good morning {name},</h5>
            <p>
              Please check your email, an OTP has been sent to you to verify
              your email. Confirm this email address to finish your registration
              so we know it's really you.
            </p>

            <form
              onSubmit={HandleVerifyEmail}
              className=" bg-gray-100 flex flex-col gap-10 text-left mx-auto w-8/12 p-5 rounded-lg"
            >
              <div>
                {error && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-2 relative text-center"
                    role="alert"
                  >
                    <span className=" text-xs">{error}</span>
                  </div>
                )}

                {success && (
                    <div>
                        <div
                            className="bg-green-100 border border-green-400 text-green-700 py-1 rounded my-2 relative text-center"
                            role="alert"
                        >
                            <span className=" text-xs">Email verified successfully...redirecting to login in 5 seconds</span>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="">Enter otp</label>
                  <input
                    value={otp}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setOtp(e.target.value)
                    }
                    className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm"
                    type="text"
                    placeholder="Enter otp"
                  />
                </div>

              </div>

              <div>
                <MainButton button_text={"Verify Email"} />
              </div>
            </form>

            <p className="text-xl">We are glad to assist!</p>
            <p>
              Use our live chat feature or call 024 7765 2222 to get in touch
              with our team with any questions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckEmail;
