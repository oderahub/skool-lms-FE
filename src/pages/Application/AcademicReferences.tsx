import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import MainButton from "../../components/MainButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../states/applicationDetails/academicReferencesSlice";
// import { academicReferencesState } from "../../states/applicationDetails/academicReferencesSlice";
import { RootState } from "../../store/store";

interface validationErrors {
  academicReferences?: string;
}

const AcademicReferences = () => {
  const [academicReferences, setAcademicReferences] = useState<boolean | null>(
    null
  );
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedValue = useSelector(
    (state: RootState) => state.academicReferences.academicReferences
  );

  useEffect(() => {
    if (storedValue !== null) {
      setAcademicReferences(storedValue);
    }
  }, [storedValue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (academicReferences === null) {
      setValidationErrors({
        academicReferences: "Academic references is required",
      });
      return;
    }

    if (academicReferences !== null) {
      dispatch(updateDetails(academicReferences));
      navigate("/dashboard/application");
    }

    setValidationErrors({});
  };

  const handleRadioChange = (value: boolean) => {
    setAcademicReferences(value);
  };

  return (
    <>
      <ApplicationHeader
        linkTo="/dashboard/application"
        header_text="Return to Application Home"
      />
      <div className=" w-9/12 mx-auto text-center mt-12">
        <div className=" text-black w-3/12 mx-auto font-semibold text-2xl mb-4">
          <h3>Academic References</h3>
        </div>
        <div>
          <p>
            We would like to know from past lecturers whether you are a good fit
            for the course
          </p>
          <p>
            If you don't have any, you can still apply. For instance, if you are
            an experienced student
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className=" w-5/12 mx-auto mt-8 flex flex-col gap-3"
          >
            <div className="w-9/12 mx-auto">
              <div className=" text-left mb-3">
                Do you have any academic references ?
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
                    checked={academicReferences === true}
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
                    checked={academicReferences === false}
                    onChange={() => handleRadioChange(false)}
                  />
                  <span className="">No</span>
                </label>
              </div>
            </div>

            {validationErrors.academicReferences && (
              <div className="text-red-500 text-sm mb-7">
                {validationErrors.academicReferences}
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
};

export default AcademicReferences;
