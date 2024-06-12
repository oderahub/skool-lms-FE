//This file contains helper functions that are used in the application, it formats the colors for the application status

export function getApplicationStatus(status: string) {
    switch (status) {
    
        case 'Rejected':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
                    {status.replace('_', ' ').toLowerCase()}
                </span>
            )
        case 'Accepted':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-200">
                    {status.replace('_', ' ').toLowerCase()}
                </span>
            )
        case 'pending':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-200">
                    {status.replace('_', ' ').toLowerCase()}
                </span>
            )

    }
}
