import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../Firebase";

export default function AdminHeader() {
    const nav = useNavigate()

    const logout = () => {
        sessionStorage.clear()
        auth.signOut()
        nav('/')
        setTimeout(() => {
            toast.success('Logout Successful')
        }, 500)

    }
    return (
        <>

            {/*  Topbar Start  */}
            <div class="container-fluid bg-dark px-0">
                <div class="row g-0 d-none d-lg-flex">
                    <div class="col-lg-6 ps-5 text-start">
                        <div class="h-100 d-inline-flex align-items-center text-light">
                            <span>Follow Us:</span>
                            <a class="btn btn-link text-light" href=""><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-link text-light" href=""><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-link text-light" href=""><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-link text-light" href=""><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-6 text-end">
                        <div class="h-100 bg-secondary d-inline-flex align-items-center text-dark py-2 px-4">
                            <span class="me-2 fw-semi-bold"><i class="fa fa-phone-alt me-2"></i>Call Us:</span>
                            <span>+012 345 6789</span>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Topbar End  */}


            {/*  Navbar Start  */}
            <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5">
                <a href="index.html" class="navbar-brand d-flex align-items-center">
                    <h1 class="m-0">Milky Mornings</h1>
                </a>
                <button type="button" class="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto p-4 p-lg-0">
                        <Link to="/admin/dashboard" class="nav-item nav-link active">Dashboard</Link>
                        <Link to="/admin/Managecustomer" class="nav-item nav-link">Customers</Link>
                        <Link to="/admin/Managemilktype" class="nav-item nav-link">Milk Type</Link>
                        <Link to="/admin/Managedailyentry" class="nav-item nav-link">Daily Entry</Link>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Manage</a>
                            <div class="dropdown-menu bg-light m-0">
                                <Link to="/admin/Manageenquiry" class="dropdown-item">Enquiry</Link>
                                <Link to="/admin/Managemonthlybills" class="dropdown-item">Monthly Bills</Link>

                            </div>
                        </div>

                        <a onClick={logout} className="nav-item nav-link">Logout</a>

                    </div>

                </div>
            </nav>
            {/*  Navbar End  */}

        </>
    )
}