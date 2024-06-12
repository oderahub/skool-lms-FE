// import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateFormTwoData } from "../../states/onboardingViews/stepTwoDataSlice";
import { clearFormOneData } from "../../states/onboardingViews/stepOneDataSlice";
import { clearFormTwoData } from "../../states/onboardingViews/stepTwoDataSlice";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IStepProps {
  changeActiveStep: (step: number) => void;
  nationality: string[];
  gender: string[];
  birthCountry: string[];
  residenceCountry: string[];
}

interface validationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  birthCountry?: string;
  residenceCountry?: string;
  nationality?: string;
}

export const Steptwo: React.FC<IStepProps> = ({
  changeActiveStep,
  nationality,
  gender,
  birthCountry,
  residenceCountry,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selector hook to access Redux state
  const stepOneFormData = useSelector((state: RootState) => state.stepOneData);
  const stepTwoFormData = useSelector((state: RootState) => state.stepTwoData);
  const userDetails = useSelector((state: RootState) => state.userDetails);

  const [genericError, setGenericError] = useState("");
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const validationErrors: validationErrors = {};

    if (!stepTwoFormData.firstName.trim()) {
      validationErrors["firstName"] = "First Name is required";
    }

    if (!stepTwoFormData.lastName.trim()) {
      validationErrors["lastName"] = "Last Name is required";
    }

    if (!stepTwoFormData.email.trim()) {
      validationErrors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(stepTwoFormData.email)) {
      validationErrors["email"] = "Email is invalid";
    }

    if (!stepTwoFormData.phone.trim()) {
      validationErrors["phone"] = "Phone number is required";
    }

    if (!stepTwoFormData.gender.trim()) {
      validationErrors["gender"] = "gender is required";
    }

    if (!stepTwoFormData.birthCountry.trim()) {
      validationErrors["birthCountry"] = "Country of birth is required";
    }

    if (!stepTwoFormData.residenceCountry.trim()) {
      validationErrors["residenceCountry"] = "Country of residence is required";
    }

    if (!stepTwoFormData.nationality.trim()) {
      validationErrors["nationality"] = "National is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors as validationErrors);
      return;
    }

    changeActiveStep(2);

    try {
      const res = await axiosInstance.post("/users/onboarding", {
        course: stepOneFormData,
        applicationType: stepTwoFormData,
      });

      if (res.data.successMessage) {
        dispatch(clearFormOneData());
        dispatch(clearFormTwoData());
        navigate("/dashboard");
      }
    } catch (error) {
      setGenericError(`${error}`);
      console.log(error);
    } finally {
      setValidationErrors({});
      setGenericError("");
    }
  };

  const handlePreviousStep = () => {
    changeActiveStep(1);
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    dispatch(updateFormTwoData({ [name]: value }));
  };

  const formData = useSelector((state: RootState) => state.stepTwoData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    dispatch(updateFormTwoData({ [name]: value }));
  };

  useEffect(() => {
    dispatch(
      updateFormTwoData({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phone: userDetails.phone,
        residenceCountry: userDetails.country,
      })
    );
  }, []);

  return (
    <div>
      <div
        onClick={handlePreviousStep}
        className="flex flex-row fixed top-10 left-[120px]"
      >
        <button className="pr-2 ">
          <FaArrowLeftLong />
        </button>
        <button className="transition-transform transform hover:scale-105 hidden md:block">
          Return to find your course
        </button>
      </div>
      <div className="flex items-center justify-center py-6 w-3/4 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 items-center">
            <div className="font-inter text-2xl font-semibold leading-10 tracking-tighter text-center">
              Start your application
            </div>
            <p className="text-base font-normal leading-6 tracking-tighter text-center py-5">
              We need more information about you before we can begin processing
              your application. Some of them have been completed for you by us.
              Verify that the information on your passport or other travel
              document matches exactly.
            </p>
            <div className="w-[500px] h-[866px] p-8 rounded-lg gap-[10px] shadow-lg flex flex-col justify-center">
              {genericError && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-2 relative text-center"
                  role="alert"
                >
                  <span className=" text-xs">{genericError}</span>
                </div>
              )}
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-600 p-4 pe-12 text-sm shadow-sm"
                />

                {validationErrors.firstName && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.firstName}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="lastname">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-600 p-4 pe-12 text-sm shadow-sm"
                />

                {validationErrors.lastName && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.lastName}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-600 p-4 pe-12 text-sm shadow-sm"
                />

                {validationErrors.email && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.email}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="email">Phone Number</label>
                <input
                  name="phone"
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-600 p-4 pe-12 text-sm shadow-sm"
                />

                {validationErrors.phone && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.phone}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="gender">Gender</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                >
                  <option value="">Select..</option>
                  {gender.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {validationErrors.gender && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.gender}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="birthCountry">Country of birth</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="birthCountry"
                  id="birthCountry"
                  value={formData.birthCountry}
                  onChange={handleSelectChange}
                >
                  <option value="">Select..</option>
                  {birthCountry.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {validationErrors.birthCountry && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.birthCountry}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="birthCountry">
                  Country of permanent residence
                </label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="residenceCountry"
                  id="residenceCountry"
                  value={formData.residenceCountry}
                  onChange={handleSelectChange}
                >
                  <option value="">Select..</option>
                  {residenceCountry.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {validationErrors.residenceCountry && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.residenceCountry}
                  </span>
                )}
              </div>

              {/* Other input fields */}
              <div>
                <label htmlFor="nationality">Nationality</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4 text-sm shadow-sm"
                  name="nationality"
                  id="nationality"
                  value={formData.nationality}
                  onChange={handleSelectChange}
                >
                  <option value="">Select..</option>
                  {nationality.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {validationErrors.nationality && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.nationality}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center py-7">
                <button
                  type="submit"
                  className="w-full bg-green-700 rounded-lg border p-3 text-white font-semibold text-center transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
