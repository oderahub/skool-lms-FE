import { Link } from "react-router-dom";
import { QualificationDetailsState } from "../../states/applicationDetails/qualificationsSLice";
import isStateEmpty from "../../utils/isEmpty";

interface Props {
  header_text: string;
  paragraph_text: string;
  link_to: string;
  isFilled: boolean | null | string | Partial<QualificationDetailsState['qualificationDetails']>;
}

function ApplicationContainer({ header_text, paragraph_text, link_to, isFilled }: Props) {
  const isEmpty = isStateEmpty(isFilled);

  return (
    <div className={`application-container h-32 w-4/12 flex px-5 rounded-xl border border-green-500 ${isEmpty ? "bg-white" : "bg-green-600"} shadow-card justify-between items-center`}>
      <div className="w-56 flex-shrink-0">
        <div className={`font-inter font-semibold text-lg mb-2 ${isEmpty ? "text-black" : "text-white"}`}>
          <h3>{header_text}</h3>
        </div>

        <div className={`font-inter font-normal text-sm ${isEmpty ? "text-black" : "text-white"}`}>
          <p>{paragraph_text}</p>
        </div>
      </div>

      <div className="flex-shrink-0 ml-auto">
        <Link to={link_to}>
          <button className={`py-2 px-3 rounded-md  text-white text-xs`} style={{ backgroundColor: isEmpty ? "#34A853" : "#667085" }}>
            {isEmpty ? "Start Now" : "Edit Details"}
          </button>
        </Link>
      </div>

    </div>
  );
}

export default ApplicationContainer;
