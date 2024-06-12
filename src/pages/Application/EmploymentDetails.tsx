import MainButton from "../../components/MainButton";
import { useEffect, useState } from "react";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../states/applicationDetails/employmentDetailsSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

interface validationErrors {
  employmentDetails?: string;
}

function EmploymentDetails() {
  const [employmentDetails, setEmploymentDetails] = useState<boolean | null>(
    null
  );
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedValue = useSelector(
    (state: RootState) => state.employmentDetails.employmentDetails
  );

  useEffect(() => {
    if (storedValue !== null) {
      setEmploymentDetails(storedValue);
    }
  }, [storedValue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (employmentDetails === null) {
      setValidationErrors({
        employmentDetails: "Employment details is required",
      });
      return;
    }

    if (employmentDetails !== null) {
      dispatch(updateDetails(employmentDetails));
      navigate("/dashboard/application");

      setValidationErrors({});
    }
  };

  const handleRadioChange = (value: boolean) => {
    setEmploymentDetails(value);
  };

  return (
    <>
      <ApplicationHeader
        linkTo="/dashboard/application"
        header_text="Return to Application Home"
      />

      <div className=" w-9/12 mx-auto text-center mt-12">
        <div className=" text-black w-3/12 mx-auto font-semibold text-2xl mb-4">
          <h3>Employment Details</h3>
        </div>
        <div>
          <p>
            Tell us about your past employment experience. If you don't have
            any, you can still apply.
          </p>
          <p>
            An offer on your application is more likely if it includes
            references
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className=" w-5/12 mx-auto mt-8 flex flex-col gap-3"
          >
            <div className="w-9/12 mx-auto">
              <div className=" text-left mb-3">
                Do you have any work experience ?
              </div>

              <div>
                <label
                  htmlFor="answerYes"
                  className="flex justify-start gap-2 p"
                >
                  <input
                    type="radio"
                    className=""
                    name="answer"
                    id="answerYes"
                    checked={employmentDetails === true}
                    onChange={() => handleRadioChange(true)}
                  />
                  <span className="">Yes</span>
                </label>
              </div>

              <div>
                <label htmlFor="answerNO" className="flex justify-start gap-2">
                  <input
                    type="radio"
                    className=""
                    name="answer"
                    id="answerNO"
                    checked={employmentDetails === false}
                    onChange={() => handleRadioChange(false)}
                  />
                  <span className="">No</span>
                </label>
              </div>
            </div>

            {validationErrors.employmentDetails && (
              <div className="text-red-500 text-sm mb-7">
                {validationErrors.employmentDetails}
              </div>
            )}

            <div className="mt-4 w-11/12 mx-auto">
              <MainButton button_text="Save and Continue" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmploymentDetails;
