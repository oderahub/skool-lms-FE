import { ChangeEvent, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function AddCourse() {

  const [course, setCourse] = useState('');
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e:ChangeEvent<HTMLInputElement> ) => {
    setCourse(e.target.value);
  };

  const handleSubmit = async() => {

    try {

        const res = await axiosInstance.post("/users/addCourses", {
            courseTitle: course,
          });

          if(res.data.noTokenError || res.data.error){
            setError(res.data.noTokenError || res.data.error)
            setTimeout(() => {
                setError('')
            }
            , 3000);
          }
          else if(res.data.successMessage){
            setSuccess(res.data.successMessage)
            setTimeout(() => {
                setSuccess('')
            }
            , 3000);
          }
        
    } catch (error) {
        console.log(error);
    }
    
    console.log('Submitted:', course);
    // Reset the input field after submission
    setCourse('');
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-4/12 bg-slate-50 shadow-lg border rounded-lg flex flex-col justify-between items-center px-4 py-4 gap-6 text-center">
        <h1 className="font-inter font-bold text-xl leading-33.6 text-left"> Create Course</h1>
        <p className="text-slate-400">Enter a course below to create a new course</p>
        {
            error && <p className="text-red-500">{error}</p>
            }
            {
            success && <p className="text-green-500 rounded-lg">{success}</p>
        }
        <input
          type="text"
          value={course}
          onChange={handleInputChange}
          className="w-3/5 h-1/6 px-3 py-3 border border-[#D0D5DD] rounded-lg"
          placeholder="Enter course name"
        />
        <button
          onClick={handleSubmit}
          className="bg-[#34A853] w-3/5 py-3 text-white border rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddCourse;