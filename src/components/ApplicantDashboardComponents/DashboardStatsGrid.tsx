import React from 'react'
import { IoBagHandle, IoPieChart, IoCart } from 'react-icons/io5'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'

interface ApplicationDetails{
    createdAt: string,
    status: string
}

export default function DashboardStatsGrid() {

    const [ applicationDetails, setApplicationDetails] = useState<ApplicationDetails | null>(null)


    useEffect(() => {

        const fetchUserDetails = async () => {

        try {
            const res = await axiosInstance.get("/users/dashboard")

            if(res.data.userDetails || res.data.applicationDetails || res.data.courseDetails){
                setApplicationDetails(res.data.applicationDetails)
            }
            
        } catch (error) {
            
        }
    }

    fetchUserDetails()


    }, [])


    return (
        <div className="flex gap-4">
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Applications</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-emerald-700 font-semibold">{applicationDetails ? 1 : 0}</strong>
                    </div>
                </div>
            </BoxWrapper>
            
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Applications accepted</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-emerald-700 font-semibold">{applicationDetails?.status === "Accepted" ? 1 : 0}</strong>
                    </div>
                </div>
            </BoxWrapper>

            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-700">
                    <HiOutlineDocumentText className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light"> Applications Pending </span>
                    <div className="flex items-center">
                        <strong className="text-xl text-emerald-700 font-semibold">{applicationDetails?.status === "pending" ? 1 : 0}</strong>
                    </div>
                </div>
            </BoxWrapper>


            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                    <IoCart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light"> Applications Rejected </span>
                    <div className="flex items-center">
                        <strong className="text-xl text-emerald-700 font-semibold">{applicationDetails?.status === "Rejected" ? 1 : 0}</strong>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    )
}

function BoxWrapper({ children }: { children: React.ReactNode }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}
