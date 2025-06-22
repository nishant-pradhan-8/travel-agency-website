import AdminLayout from '@/layouts/admin/admin-layout';
import { ReactNode } from "react"

export default function AdminDashboard(){
    return(
        <div className="font-[inter]">
         <h1>Test</h1>
        </div>
    )
}

AdminDashboard.layout = (page:ReactNode)=> <AdminLayout>{page}</AdminLayout>