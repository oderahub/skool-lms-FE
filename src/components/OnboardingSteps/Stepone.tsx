import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateFormOneData } from "../../states/onboardingViews/stepOneDataSlice";
import { useState } from "react";

interface validationErrors {
  courseType?: string;
  studyMode?: string;
  courseSearch?: string;
  entryYear?: string;
  entryMonth?: string;
}
interface IStepProps {
  changeActiveStep: (step: number) => void;
  courseType: string[];
  studyMode: string[];
  courseSearch: string[];
  entryYear: number[];
  entryMonth: string[];
  // Define courseType as a prop
}

// interface IFormData {
//   name: string;
//   email: string;
//   password: string;
//   courseType: string;
//   studyMode: string;
//   courseSearch: string;
//   entryYear: number;
//   entryMonth: string;
// }

export const Stepone: React.FC<IStepProps> = ({
  changeActiveStep,
  courseType,
  studyMode,
  courseSearch,
  entryYear,
  entryMonth,
}) => {
  const dispatch = useDispatch();

  // const [formData, setFormData] = useState<IFormData>({
  //   name: " ",
  //   email: " ",
  //   password: " ",
  //   courseType: "",
  //   studyMode: " ",
  //   courseSearch: " ",
  //   entryYear: 0,
  //   entryMonth: " ",
  // });
  
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const validationErrors: validationErrors = {};

    if (!formData.courseType) {
      validationErrors["courseType"] = "Course type is required";
    }

    if (!formData.studyMode) {
      validationErrors["studyMode"] = "Study mode is required";
    }

    if (!formData.courseSearch) {
      validationErrors["courseSearch"] = "Course is required";
    }

    if (!formData.entryYear) {
      validationErrors["entryYear"] = "Entry year is required";
    }

    if (!formData.entryMonth) {
      validationErrors["entryMonth"] = "Entry month is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors as validationErrors);
      return;
    }
    changeActiveStep(2);
  };

  // const YourComponent = () => {
  // const history = useHistory();

  // const handlePreviousStep = () => {
  //   history.push('/users/login');
  // };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    dispatch(updateFormOneData({ [name]: value }));
  };

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const formData = useSelector((state: RootState) => state.stepOneData);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   const { name, value } = e.target;
  //   dispatch(updateFormData({ [name]: value }));
  // };

  return (
    <div className="w-full">
      <div className="flex flex-row fixed top-10 left-[120px] ">
        <button className="pr-2 ">
          <FaArrowLeftLong />
        </button>
        <Link
          to="/"
          className="transition-transform transform hover:scale-105 hidden md:block text-slate-900"
        >
          Return to log in
        </Link>
      </div>

      <div className="flex items-center justify-center py-6 w-3/4 mx-auto pt-9">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="font-inter text-2xl font-semibold leading-10 tracking-tighter text-center">
              Find your course
            </div>

            <p className="text-base font-normal leading-6 tracking-tighter text-center py-5 ">
              Enter your chosen course. We'll help you find the one that's right
              for you
            </p>

            <div className="w-[500px] h-[597px] px-6 rounded-[16px] gap-[10px] shadow-lg flex flex-col justify-center">

          
              
              <div>
                <label htmlFor="courseType">Course type</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="courseType"
                  id="courseType"
                  value={formData.courseType}
                  onChange={handleSelectChange}
                >
                  <option value="">Enter your course type</option>
                  {courseType.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {validationErrors.courseType && (
                  <span className="text-red-500 text-sm  ml-1">
                    {validationErrors.courseType}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="studyMode">Study mode</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="studyMode"
                  id="studyMode"
                  value={formData.studyMode}
                  onChange={handleSelectChange}
                >
                  <option value="">Enter study mode</option>
                  {studyMode.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {validationErrors.studyMode && (
                  <span className="text-red-500 text-sm  ml-1">
                    {validationErrors.studyMode}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="courseSearch">Course search</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="courseSearch"
                  id="courseSearch"
                  value={formData.courseSearch}
                  onChange={handleSelectChange}
                >
                  <option value="">Enter course</option>
                  {courseSearch.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {validationErrors.courseSearch && (
                  <span className="text-red-500 text-sm  ml-1">
                    {validationErrors.courseSearch}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="courseSearch">Entry year</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="entryYear"
                  id="entryYear"
                  value={formData.entryYear}
                  onChange={handleSelectChange}
                >
                  <option value="">Enter study year</option>
                  {entryYear.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {validationErrors.entryYear && (
                  <span className="text-red-500 text-sm  ml-1">
                    {validationErrors.entryYear}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="entryMonth">Entry month</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="entryMonth"
                  id="entryMonth"
                  value={formData.entryMonth}
                  onChange={handleSelectChange}
                >
                  <option value="">Enter month</option>
                  {entryMonth.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {validationErrors.entryMonth && (
                  <span className="text-red-500 text-sm  ml-1">
                    {validationErrors.entryMonth}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center py-7">
                <button
                  type="submit"
                  className="w-full bg-green-700 rounded-lg border p-3 text-white font-semibold text-center transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                >
                  Save and continue
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
