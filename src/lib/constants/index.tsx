import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineBell,
    HiOutlineUser,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'

import { RiMessage2Line } from "react-icons/ri";

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'Applications',
        label: 'Applications',
        path: '/dashboard/application',
        icon: <HiOutlineCube />
    },
    {
        key: 'Notifications',
        label: 'Notifications',
        path: '/dashboard/notifications',
        icon: <HiOutlineBell />
    },
    {
        key: 'Messages',
        label: 'Messages',
        path: '/dashboard/messages/chats?id=dc93ecd9-ecac-4fa0-ae6e-fa34379b010f',
        icon: <RiMessage2Line />
    },
    {
        key: 'Profile',
        label: 'Profile',
        path: '/dashboard/profile',
        icon: <HiOutlineUser />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/dashboard/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '#',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
