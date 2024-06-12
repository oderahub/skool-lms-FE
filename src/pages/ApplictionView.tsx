import { useMemo, useState } from "react";
import FormStepper from "../components/Steppers/Stepper";
import { Stepone } from "../components/OnboardingSteps/Stepone";
import { Steptwo } from "../components/OnboardingSteps/Steptwo";

function ApplicationView() {
  const [activeStep, setActiveStep] = useState(1);

  const changeActiveStep = (stepValue: number) => {
    if (stepValue <= steps.length || stepValue >= 1) {
      setActiveStep(stepValue);
    }
  };

  const steps = useMemo(
    () => [
      {
        label: "Find your course",
        value: 1,
        component: (
          <Stepone
            changeActiveStep={setActiveStep}
            courseType={[
              "Undergraduate degree",
              "Postgraduate degree",
              "Others",
            ]}
            studyMode={["Part Time", "Full Time"]}
            courseSearch={[
              "Accounting",
              "Biology",
              "Computer Science",
              "Economics",
            ]}
            entryYear={[2024, 2025, 2026]}
            entryMonth={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]}
          />
        ),
      },
      {
        label: "Start your application",
        value: 2,
        component: (
          <Steptwo
            changeActiveStep={setActiveStep}
            gender={["Male", "Female"]}
            birthCountry={["Nigeria"]}
            residenceCountry={["Nigeria"]}
            nationality={["Nigeria"]}
          />
        ),
      },
      
    ],
    []
  );

  const activeStepComponent = useMemo(() => {
    return steps.find(({ value }) => value === activeStep)?.component || null;
  }, [activeStep, steps]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-8">
        <FormStepper
          steps={steps}
          activeStep={activeStep}
          changeActiveStep={changeActiveStep}
        />

        {activeStepComponent}
      </div>
    </div>
  );
}

export default ApplicationView;
