import MainButton from "../../components/MainButton";
import { useEffect, useState } from "react";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../states/applicationDetails/englishQualificationSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

interface validationErrors {
  englishQualification?: string;
}

function EnglishQualification() {
  const [englishQualification, setEnglishQualification] = useState<
    boolean | null
  >(null);
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedValue = useSelector(
    (state: RootState) => state.englishQualification.englishQualification
  );

  useEffect(() => {
    if (storedValue !== null) {
      setEnglishQualification(storedValue);
    }
  }, [storedValue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (englishQualification === null) {
      setValidationErrors({
        englishQualification: "English qualification is required",
      });
      return;
    }
    if (englishQualification !== null) {
      dispatch(updateDetails(englishQualification));
      navigate("/dashboard/application");
    }

    setValidationErrors({});
  };

  const handleRadioChange = (value: boolean) => {
    setEnglishQualification(value);
  };

  return (
    <>
      <ApplicationHeader
        linkTo="/dashboard/application"
        header_text="Return to Application Home"
      />

      <div className=" w-9/12 mx-auto text-center mt-12">
        <div className=" text-black w-3/12 mx-auto font-semibold text-2xl mb-4">
          <h3>English language qualification</h3>
        </div>
        <div>
          <p>
            Before you begin your course, we will need an examination of your
            English language proficiency uploading your documentation as soon as
            possible will be ideal.
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className=" w-5/12 mx-auto mt-8 flex flex-col gap-3"
          >
            <div className="w-9/12 mx-auto">
              <div className=" text-left mb-3">
                Do you have an English language qualification?
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
                    checked={englishQualification === true}
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
                    checked={englishQualification === false}
                    onChange={() => handleRadioChange(false)}
                  />
                  <span className="">No</span>
                </label>
              </div>
            </div>
            {validationErrors.englishQualification && (
              <div className="text-red-500 text-sm">
                {validationErrors.englishQualification}
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

export default EnglishQualification;
