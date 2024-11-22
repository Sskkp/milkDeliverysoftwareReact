import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../Firebase";

export default function Header() {
    const nav = useNavigate()
    var islogin = sessionStorage.getItem('isLogin')

    const logout = () => {
        sessionStorage.clear();
        auth.signOut();
        nav('/')
        setTimeout(() => {
            toast.success('Logout Successful')
        }, 500)
    }
    return (
        <>
            {/*  Topbar Start  */}
            <div className="container-fluid bg-dark px-0">
                <div className="row g-0 d-none d-lg-flex">
                    <div className="col-lg-6 ps-5 text-start">
                        <div className="h-100 d-inline-flex align-items-center text-light">
                            <span>Follow Us:</span>
                            <a className="btn btn-link text-light" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-link text-light" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-link text-light" href=""><i className="fab fa-linkedin-in"></i></a>
                            <a className="btn btn-link text-light" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-6 text-end">
                        <div className="h-100 bg-secondary d-inline-flex align-items-center text-dark py-2 px-4">
                            <span className="me-2 fw-semi-bold"><i className="fa fa-phone-alt me-2"></i>Call Us:</span>
                            <span>+012 345 6789</span>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Topbar End  */}

            {/*  Navbar Start  */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5">
                <a href="index.html" className="navbar-brand d-flex align-items-center">
                    <h1 className="m-0">Milky Mornings</h1>
                </a>
                <button type="button" className="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        <Link to="/Home" className="nav-item nav-link active">Home</Link>
                        <Link to="/customer/milktype" className="nav-item nav-link">Milk Type</Link>
                        <Link to="/customer/Viewdailyentry" className="nav-item nav-link">Daily Entry</Link>
                        <Link to="/customer/Viewmonthlybill" className="nav-item nav-link">Bill</Link>
                        <Link to="/customer/AddEnquiry" className="nav-item nav-link">Message Us</Link>
                        {/* <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu bg-light m-0">
                                <a href="gallery.html" className="dropdown-item">Gallery</a>
                                <a href="feature.html" className="dropdown-item">Features</a>
                                <a href="team.html" className="dropdown-item">Our Team</a>
                                <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                <a href="404.html" className="dropdown-item">404 Page</a>
                            </div>
                        </div> */}
                        {islogin ?
                          <a  onClick={logout}  className="nav-item nav-link">Logout</a>
                        :
                        <Link to="/" className="nav-item nav-link ">Login</Link>
                         }

                    </div>

                    <div className="border-start ps-4 d-none d-lg-block">
                         
                    </div>


                </div>
            </nav>
            {/*  Navbar End  */}
        </>
    )
}