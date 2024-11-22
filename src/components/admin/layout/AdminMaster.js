import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';


export default function AdminMaster() {

    const nav = useNavigate()
    let authenticate = sessionStorage.getItem('isLogin')
    useEffect(() => {
        if (!authenticate) {
            nav('/')
            setTimeout(() => {
                toast.error("Please Login First")
            }, 500)
        }
    }, [])

    return (
        <>
            <AdminHeader />
            <Outlet />
            <AdminFooter />
            <ToastContainer />
        </>
    )
}