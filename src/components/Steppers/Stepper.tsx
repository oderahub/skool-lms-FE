import { HiOutlineCheck } from 'react-icons/hi2';

interface FormStepperProps {
  activeStep: number;
  steps: Array<{ label: string, value: number }>;
  changeActiveStep: (step: number) => void;
}

const FormStepper: React.FC<FormStepperProps> = ({ activeStep, steps, changeActiveStep }) => {

  const isStepComplete = (currentStep: number) => activeStep > currentStep;

  const handleStepClick = (step: number) => {
    if (step !== activeStep) {
      changeActiveStep(step);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-center'>
        <div className="border-b-2 pb-3">
          <ol className='grid grid-cols-3 text-sm font-medium text-gray-500'>
            {steps.map(({ value, label }) => {
              return (
                <li key={value} className='relative flex justify-center text-blue-600'>
                  <div className='justify-center p-4 text-white flex gap-3 items-center'>
                    <div
                      className={` cursor-pointer flex align-center justify-center items-center rounded-full w-8 h-8 ${activeStep === value ? 'bg-green-400' : "bg-gray-400"}
                      ${isStepComplete(value) ? "bg-green" : "bg-gray-400"}`}
                      onClick={() => handleStepClick(value)} // Handle step click
                    >
                      <span>{isStepComplete(value) ? <HiOutlineCheck /> : value}</span>
                    </div>
                    <div className={`${activeStep === value ? "text-gray-500" : "text-gray-300"}`}>{label}</div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default FormStepper;
