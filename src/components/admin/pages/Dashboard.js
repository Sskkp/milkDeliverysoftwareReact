import { Link } from "react-router-dom";

export default function Dashbaord() {
    return (
        <>


            {/*  Page Header Start  */}
            <div className="container-fluid page-header py-5  wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Dashbaord</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">


                            <Link to='/admin/managecustomer'><li className="breadcrumb-item active" aria-current="page">Customer</li></Link> /
                            <Link to='/admin/dashboard'> <li className="breadcrumb-item active text-warning active" aria-current="page"> Dashbaord</li></Link>

                        </ol>
                    </nav>
                </div>
            </div>
            {/*  Page Header End  */}

            {/*  Features Start  */}
            <div className="container-xxl py-2">
                <div className="container">
                    <div className="row g-5 py-5 align-items-center" data-aos="zoom-in" data-aos-delay="100">
                            <h1 className="text-center">Welcome Admin</h1>
                        {/* <div className="col-lg-12">
                            <div className="rounded overflow-hidden">
                                <div className="row g-0">
                                    <div className="col-sm-3 wow fadeIn" data-wow-delay="0.1s">
                                        <div className="text-center bg-primary py-5 px-4">
                                            <img className="img-fluid mb-4" src="assets/img/experience.png" alt="" />
                                            <h1 className="display-6 text-white" data-toggle="counter-up">25</h1>
                                            <span className="fs-5 fw-semi-bold text-secondary">Years Experience</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 wow fadeIn" data-wow-delay="0.3s">
                                        <div className="text-center bg-secondary py-5 px-4">
                                            <img className="img-fluid mb-4" src="assets/img/award.png" alt="" />
                                            <h1 className="display-6" data-toggle="counter-up">183</h1>
                                            <span className="fs-5 fw-semi-bold text-primary">Award Winning</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 wow fadeIn" data-wow-delay="0.5s">
                                        <div className="text-center bg-primary py-5 px-4">
                                            <img className="img-fluid mb-4" src="assets/img/animal.png" alt="" />
                                            <h1 className="display-6" data-toggle="counter-up">2619</h1>
                                            <span className="fs-5 fw-semi-bold text-secondary">Total Animals</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 wow fadeIn" data-wow-delay="0.7s">
                                        <div className="text-center bg-secondary py-5 px-4">
                                            <img className="img-fluid mb-4" src="assets/img/client.png" alt="" />
                                            <h1 className="display-6 text-white" data-toggle="counter-up">51940</h1>
                                            <span className="fs-5 fw-semi-bold text-primary">Happy Clients</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            {/*  Features End  */}
        </>
    )
}