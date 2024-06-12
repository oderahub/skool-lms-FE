import MainButton from "../../components/MainButton";
import { useState, useEffect } from "react";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateFundingInformation } from "../../states/applicationDetails/fundingInformationSlice";

import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

interface validationErrors {
  fundingInformation?: string;
}

export default function FundingInformation() {
  const [fundingInformation, setFundingInformation] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedValue = useSelector(
    (state: RootState) => state.fundingInformation.fundingInformation
  );

  useEffect(() => {
    if (storedValue !== null && storedValue !== "") {
      setFundingInformation(storedValue);
    }
  }, [storedValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fundingInformation) {
      setValidationErrors({
        fundingInformation: "Funding Information is required",
      });
      return;
    }

    if (fundingInformation) {
      dispatch(updateFundingInformation(fundingInformation));
      navigate("/dashboard/application");
    }

    setValidationErrors({});
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFundingInformation(value);
  };

  return (
    <>
      <ApplicationHeader
        linkTo="/dashboard/application"
        header_text="Return to Application Home"
      />

      <div className="w-10/12 mx-auto text-center mt-12">
        <div className="text-black w-3/12 mx-auto font-semibold text-2xl mb-4">
          <h3>Funding Information</h3>
        </div>
        <div>
          <p>
            Describe your payment plan for the course to us. In the event that
            you are a sponsored student, documentation of this will be required.
            However, it's not necessary for the application. If you are unsure,
            you can choose "Not Sure".
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className="w-5/12 mx-auto mt-8 flex flex-col gap-3"
          >
            <div className="w-10/12 mx-auto">
              <div className="text-left mb-3">Please select an option</div>
            </div>

            <div className="w-11/12 mx-auto">
              <select
                className="h-full rounded-md border border-gray-400 bg-transparent py-3 pl-2 pr-20 text-gray-600 sm:text-md w-full mb-4 placeholder:text-gray-950"
                onChange={handleRadioChange}
                value={fundingInformation}
              >
                <option value="">Select an option</option>
                <option value="Personal Savings">Personal Savings</option>
                <option value="Family Support">Family Support</option>
                <option value="Scholarships">Scholarships</option>
                <option value="Employer Sponsorship">
                  Employer Sponsorship
                </option>
                <option value="Government Funding">Government Funding</option>
                <option value="Loans">Loans</option>
                <option value="Grants">Grants</option>
                <option value="Not Sure">Not Sure</option>
              </select>
              {validationErrors.fundingInformation && (
                <div className="text-red-500 text-sm mb-7 ml-1">
                  {validationErrors.fundingInformation}
                </div>
              )}
              <MainButton button_text="Save and Continue" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
