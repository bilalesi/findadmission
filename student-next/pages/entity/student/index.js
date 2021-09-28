import React from 'react'
import { useSession } from 'next-auth/client';
import StudentLayout from '../../../layouts/StudentLayout';
import { Dashboard } from '../../../domains/student/pages';


export default function StudentDashboardIndex() {
    return (
        <StudentLayout>
            <Dashboard/>
        </StudentLayout>
    )
}
