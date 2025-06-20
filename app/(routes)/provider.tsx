"use client"
import React, { useEffect } from 'react'
import { useAuthContext } from '../provider';
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppHeader from '../_components/AppHeader';
import { AppSidebar } from '../_components/AppSidebar';

function DashboardProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user, loading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (loading) return; // wait for auth state
        if (!user) {
            router.replace('/');
            return;
        }
        // Only call checkUser if we have a valid user
        if (user && user.email) {
            checkUser();
        }
    }, [user, loading])


    // Check and register user in backend
    const checkUser = async () => {
        if (!user || !user.email) return; // ensure user and email exist
        
        try {
            console.log('Checking user:', user.email);
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: user.displayName || 'Anonymous',
                    userEmail: user.email,
                }),
            });
            
            if (res.ok) {
                const data = await res.json();
                console.log('User registered/found:', data);
            } else {
                console.error(`User API returned status ${res.status}`);
            }
        } catch (error) {
            console.error('Error checking user:', error);
        }
    }


    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full'>
                <AppHeader />
                {/* <SidebarTrigger /> */}
                <div className='p-10'>{children}</div>
            </main>
        </SidebarProvider>

    )
}

export default DashboardProvider