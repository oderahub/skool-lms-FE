import { useSelector, useDispatch } from "react-redux";
import MainButton from "../../components/MainButton";
import ApplicationContainer from "../../components/applicationComponents/ApplicationContainer";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import "./ApplicationPage.css";
import { RootState } from "../../store/store";
import { useState, useEffect } from "react";
import { deleteAcademicReferences } from "../../states/applicationDetails/academicReferencesSlice";
import { deleteDisability } from "../../states/applicationDetails/disabilityDetailsSlice";
import { deleteEmploymentDetails } from "../../states/applicationDetails/employmentDetailsSlice";
import { deleteEnglishQualification } from "../../states/applicationDetails/englishQualificationSlice";
import { deleteFundingInformation } from "../../states/applicationDetails/fundingInformationSlice";
import { deletePersonalStatement } from "../../states/applicationDetails/personalStatementSlice";
import { deleteQualificationDetails } from "../../states/applicationDetails/qualificationsSLice";
import { deletePassportDetails } from "../../states/applicationDetails/uploadPassportSlice";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../components/ModalComponent";
import success from "/images/Successgood.png";


interface UserCourse {
  courseSearch: string;
  courseType: string;
  entryMonth: string;
  entryYear: string;
  studyMode: string;
}

function ApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const userId = useSelector((state: RootState) => state.userDetails.userId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkApplicationStatus() {
      try {
        const res = await axiosInstance.get("/users/professional-application");

        if (res.data.hasApplied === true) {
          setHasApplied(true);
          setUserCourse(res.data.userCourse);
        }
        
        else if (res.data.hasApplied === false) {
          setHasApplied(false);
          setUserCourse(res.data.userCourse);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    checkApplicationStatus();
  }, []);

  const academicReferencesFilled = useSelector(
    (state: RootState) => state.academicReferences.academicReferences
  );
  const qualificationsFilled = useSelector(
    (state: RootState) => state.qualifications.qualificationDetails
  );
  const employmentDetailsFilled = useSelector(
    (state: RootState) => state.employmentDetails.employmentDetails
  );
  const disabilityDetailsFilled = useSelector(
    (state: RootState) => state.disabilityDetails.disabilityDetails
  );
  const personalStatementFilled = useSelector(
    (state: RootState) => state.personalStatement.personalStatement
  );
  const fundingInformationFilled = useSelector(
    (state: RootState) => state.fundingInformation.fundingInformation
  );
  const englishQualificationFilled = useSelector(
    (state: RootState) => state.englishQualification.englishQualification
  );
  const uploadPassportFilled = useSelector(
    (state: RootState) => state.uploadPassport.uploadedImage    
  );  
  
  const isAllCardsFilled =
    academicReferencesFilled != null &&
    qualificationsFilled &&
    employmentDetailsFilled != null &&
    disabilityDetailsFilled &&
    personalStatementFilled &&
    fundingInformationFilled &&
    englishQualificationFilled != null &&
    uploadPassportFilled;

  const handleSubmit = async () => {
    if (!isAllCardsFilled) {
      return; // Do not submit if all cards are not filled
    }

    setIsSubmitting(true);

    try {
      // Make a POST request to the backend endpoint
      const res = await axiosInstance.post("/users/professional-application", {
        personalStatement: personalStatementFilled,
        addQualification: qualificationsFilled,
        academicReference: academicReferencesFilled,
        employmentDetails: employmentDetailsFilled,
        fundingInformation: fundingInformationFilled,
        disability: disabilityDetailsFilled,
        passportUpload: uploadPassportFilled,
        englishLanguageQualification: englishQualificationFilled,
      });

        await axiosInstance.post(`/admin/notification/${userId}`, {
          title: "Application Submitted",
          message: `Your application for the ${userCourse?.courseType} program in ${userCourse?.courseSearch} has been successfully submitted and is under review.
      `,
        })
      

      if (res.data.successMessage) {
        dispatch(deleteAcademicReferences());
        dispatch(deleteDisability());
        dispatch(deleteEmploymentDetails());
        dispatch(deleteEnglishQualification());
        dispatch(deleteFundingInformation());
        dispatch(deletePersonalStatement());
        dispatch(deleteQualificationDetails());
        dispatch(deletePassportDetails());

        setShowSuccessModal(true);
      } else if (res.data.error) {
        setSubmitError(res.data.error);
        setTimeout(() => {
          setSubmitError(null);
        }, 5000);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
     <div className={`application-content ${showSuccessModal ? 'blur-md' : ''}`}>
    <ApplicationHeader
        linkTo="/dashboard"
        header_text="Return to Dashboard"
      />
      
      {loading || isSubmitting ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-20 h-20 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
        </div>
      ) : (
        <>
          {hasApplied ? (
            <div>
              <div className="bg-gray-100 border border-gray-300 rounded-md shadow-md p-6 w-5/12 mx-auto mt-12">
                <div className="text-center mb-4">
                  {userCourse && (
                    <h3 className="text-2xl font-semibold">
                      {userCourse.courseType === "Postgraduate degree"
                        ? "Masters"
                        : "BSc"}{" "}
                      in {userCourse.courseSearch}
                    </h3>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-base font-normal text-gray-700">
                    Your application has been submitted and is under review. You
                    can view the status of your application on the dashboard.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "-10px" }}>
              <div className="text-center w-8/12 mx-auto">
                <div className="mb-2 font-inter font-semibold text-2xl">
                  {userCourse && (
                    <h3 className="text-2xl font-semibold">
                      {userCourse.courseType === "Postgraduate degree"
                        ? "Masters"
                        : "BSc"}{" "}
                      in {userCourse.courseSearch}
                    </h3>
                  )}
                </div>
 
                <div className="font-inter font-normal text-base">
                  <p>
                    To proceed with your course application, fill out the
                    remaining sections.
                  </p>
                </div>
 
                <div className="font-inter font-normal text-base">
                  <p>
                    Upon their completion, you can send in your application.
                    Some of the data you have already entered will be pre-filled
                    for you to
                  </p>
                </div>
 
                <div className="font-inter font-normal text-base">
                  <p>save time.</p>
                </div>
              </div>
 
              <div className="flex-wrap">
                <div className="flex flex-wrap justify-center mt-5">
                  <ApplicationContainer
                    header_text="Personal Statement"
                    paragraph_text="Explain your application for this course."
                    link_to="/dashboard/application/personal-statement"
                    isFilled={personalStatementFilled}
                  />
 
                  <ApplicationContainer
                    header_text="Add qualifications"
                    paragraph_text="Please list any credentials you have not yet disclosed to us."
                    link_to="/dashboard/application/qualifications"
                    isFilled={qualificationsFilled}
                  />
                </div>
 
                <div className="flex flex-wrap justify-center mt-5">
                  <ApplicationContainer
                    header_text="Academic references"
                    paragraph_text="We require feedback regarding your suitability from prior instructors."
                    link_to="/dashboard/application/academic-references"
                    isFilled={academicReferencesFilled}
                  />
 
                  <ApplicationContainer
                    header_text="Employment details"
                    paragraph_text="Tell us about your past employment experience."
                    link_to="/dashboard/application/employment-details"
                    isFilled={employmentDetailsFilled}
                  />
                </div>
 
                <div className="flex flex-wrap justify-center mt-5">
                  <ApplicationContainer
                    header_text="Funding information"
                    paragraph_text="Describe your payment plan for the course to us."
                    link_to="/dashboard/application/funding-information"
                    isFilled={fundingInformationFilled}
                  />
 
                  <ApplicationContainer
                    header_text="Disability"
                    paragraph_text="Tell us about any disabilities you may have, if that makes you comfortable"
                    link_to="/dashboard/application/disability-details"
                    isFilled={disabilityDetailsFilled}
                  />
                </div>
 
                <div className="flex flex-wrap justify-center mt-5">
                  <ApplicationContainer
                    header_text="Passport upload"
                    paragraph_text="Upload a picture of the photo page from your passport."
                    link_to="/dashboard/application/upload-passport"
                    isFilled={uploadPassportFilled}
                  />
 
                  <ApplicationContainer
                    header_text="English language qualification"
                    paragraph_text="Tell us about any education you have received in English."
                    link_to="/dashboard/application/english-qualification"
                    isFilled={englishQualificationFilled}
                  />
                </div>
              </div>
 
              <div
                className="submit-application-button mt-5 mx-auto mb-14"
                style={{ width: "25.5%" }}
              >
                {submitError && (
                  <p className="bg-red-100 border border-red-400 text-red-700 py-1 rounded-lg my-4 relative text-center text-sm">
                    {submitError}
                  </p>
                )}
                <MainButton
                  customClassName={isAllCardsFilled ? "" : "opacity-50"}
                  button_text="Submit Application"
                  disableHover={!isAllCardsFilled || isSubmitting}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          )}
          
        </>
      )}
  </div>
  {showSuccessModal && (
    <div className="modal-overlay">
      <ModalComponent
        message="Your application has been successfully submitted."
        buttonText="OK"
        icon={success}
        onClick={() => {
          setShowSuccessModal(false);
          navigate("/dashboard");
        }}
      />
    </div>
  )}
    </>
  );
}

export default ApplicationPage;
