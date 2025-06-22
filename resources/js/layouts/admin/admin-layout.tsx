import DashboardLayoutBasic from '@/components/admin/sidebar';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AdminLayoutProps) => (
    <div className='font-[inter]'>
        <DashboardLayoutBasic    children={children} />
  
        
    </div>
);
