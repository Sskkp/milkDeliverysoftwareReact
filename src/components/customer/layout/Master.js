import Header from './Header';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
export default function Master() {


    const nav = useNavigate()
    let authenticate = sessionStorage.getItem('isLogin')
    useEffect(() => {
        if (!authenticate) {
            nav('/')
            setTimeout(() => {
                toast.error("Please Login First")
            }, 500)
        }
    }, [authenticate])

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ToastContainer />
        </>
    )
}