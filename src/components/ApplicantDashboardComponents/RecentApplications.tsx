import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
import { getApplicationStatus } from "../../lib/helpers";
// import socket from '../../../socket'


// interface UserDetails{
//     id: number,
//     firstName: string,
//     lastName: string,
//     email: string,
//     phone: string,
//     country: string,
//     createdAt: string,
//     updatedAt: string

// }

interface CourseDetails {
  id: number;
  courseSearch: string;
  courseType: string;
  courseDuration: string;
  createdAt: string;
  updatedAt: string;
}

interface ApplicationDetails {
  createdAt: string;
  status: string;
}

export default function RecentApplications() {
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );
  const [applicationDetails, setApplicationDetails] =
    useState<ApplicationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  // const userId = useSelector((state: RootState) => state.userDetails.userId);

  useEffect(() => {
    const fetchUserDetails = async () => {

      try {
        const res = await axiosInstance.get("/users/dashboard");

        if (res.data.applicationDetails) {
          setApplicationDetails(res.data.applicationDetails);
          setCourseDetails(res.data.courseDetails);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

//   useEffect(() => {
//     if (userId) {
//         socket.emit("addNewUser", userId);
//     }
// }, [userId]);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
        </div>
      ) : (
        <>
          {applicationDetails ? (
            <>
              <strong className="text-gray-700 font-medium">
                Recent Application
              </strong>
              <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                  <thead>
                    <tr>
                      <th>Program</th>
                      <th>Course</th>
                      <th>Application Date</th>
                      <th>Application Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className=" text-gray-500 ">
                      <td>{courseDetails?.courseType}</td>
                      <td>{courseDetails?.courseSearch}</td>
                      <td>
                        {format(
                          new Date(applicationDetails!.createdAt),
                          "dd/MM/yyyy"
                        )}
                      </td>
                      <td>
                        {getApplicationStatus(applicationDetails!.status)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className=" text-gray-500 text-center py-6">
              No recent applications
            </div>
          )}
        </>
      )}
    </div>
  );
}
