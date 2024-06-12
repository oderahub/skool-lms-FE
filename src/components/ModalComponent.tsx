import React from "react";
import MainButton from "../components/MainButton";

interface ModalProps {
  message: string;
  icon: string;
  buttonText: string;
  onClick: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({
  message,
  buttonText,
  icon,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-3/12">
      <div className="success-container bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="success-icon flex flex-col items-center justify-center">
          <img src={icon} alt="Success" className="justify-center" />
        </div>
        <div className="success-message text-center mt-4">
          <h2 className="text-xl font-semibold">{message}</h2>
          <div className="mt-5">
            <div className="flex flex-col gap-3 mx-auto bg-gray-200">
              <MainButton button_text={buttonText} onClick={onClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
