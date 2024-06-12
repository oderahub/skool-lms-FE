import MainButton from "../../components/MainButton";
import { useState, useEffect } from "react";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../states/applicationDetails/disabilityDetailsSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";


interface validationErrors {
  disability?: string;
}

export default function DisabilityDetails() {
 
  const [disabilityDetails, setDisabilityDetails] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedValue = useSelector(
    (state: RootState) => state.disabilityDetails.disabilityDetails
  );

  useEffect(() => {
    if (storedValue !== "" && storedValue !== null) {
      setDisabilityDetails(storedValue);
    }
  }, [storedValue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!disabilityDetails) {
      setValidationErrors({
        disability: "Disability Information is required",
      });
      return;
    }
    if (disabilityDetails !== "" && disabilityDetails !== null) {
      dispatch(updateDetails(disabilityDetails));
      navigate("/dashboard/application");
    }

    setValidationErrors({});
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setDisabilityDetails(selectedOption);
  };

  return (
    <>
      <ApplicationHeader
        linkTo="/dashboard/application"
        header_text="Return to Application Home"
      />

      <div className=" w-8/12 mx-auto text-center mt-12">
        <div className=" text-black w-3/12 mx-auto font-semibold text-2xl mb-4">
          <h3>Disability</h3>
        </div>
        <div>
          <p>
            Learning may be impacted by certain disabilities, so we want to help
            you from application to study. Learn more about our definition of a
            disability and the ways that our team can assist you. Nothing you
            are uncomfortable sharing has to be disclosed, and doing so won't
            have an impact on your application. If you would like, you can
            provide us with this information in the future.
          </p>
          <p>
            There are some courses that have competency requirements that we are
            unable to modify.Please use the button on the left to get in touch
            with us if you have any concerns about these might affect you.
          </p>
          <p>
            We can talk to you about reasonable adjustments, competency
            standards, and support arrangements as soon as you disclose your
            disability
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className=" w-5/12 mx-auto mt-8 flex flex-col gap-3"
          >
            <div className="w-9/12 mx-auto">
              <div className=" text-left mb-3">Please select an option</div>
            </div>

            <div className=" w-11/12 mx-auto">
              <select
                className="h-full rounded-md border border-gray-400 bg-transparent py-3 pl-2 pr-20 text-gray-600 sm:text-md w-full mb-4 placeholder:text-gray-950"
                onChange={handleRadioChange}
                value={disabilityDetails}
              >
                <option value="">Select an option</option>
                <option value="Physical Disabilities">
                  Physical Disabilities
                </option>
                <option value="Sensory Disabilities">
                  Sensory Disabilities
                </option>
                <option value="Cognitive/Neurological Disabilities">
                  Cognitive/Neurological Disabilities
                </option>
                <option value="Psychiatric/Mental Health Disabilities">
                  Psychiatric/Mental Health Disabilities
                </option>
                <option value="Chronic Health Disabilities">
                  Chronic Health Disabilities
                </option>
                <option value="Invisible Disabilities">
                  Invisible Disabilities
                </option>
                <option value="Temporary Disabilities">
                  Temporary Disabilities
                </option>
                <option value="Developmental Disabilities">
                  Developmental Disabilities
                </option>
                <option value="Others/Prefer Not to say">
                  Others/Prefer Not to say
                </option>
                <option value="No Disability">No Disability</option>
              </select>
              {validationErrors.disability && (
                <div className="text-red-500 text-sm mb-7 ml-1">
                  {validationErrors.disability}
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
