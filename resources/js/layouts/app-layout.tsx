import CopyrightFooter from '@/components/homeComponents/copyright';
import NavbarFooter from '@/components/homeComponents/navbarFooter';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { useEffect, type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <div>
        {children}
         <footer>
                <NavbarFooter />
                <CopyrightFooter />
            </footer>
            
    </div>
);
