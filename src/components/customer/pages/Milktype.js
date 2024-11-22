import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../Firebase";

export default function Milktype() {

    var [milktype, setmilktype] = useState([]);
    var [loading, setloading] = useState(true);

    var spinnerObj = {
        margin: "100px auto",
        display: "block",
    }

    useEffect(() => {
        getAllmilktype();
    }, []);


    const getAllmilktype = () => {
        const milktyperef = collection(db, '/milk type');
        const que = query(milktyperef, where('status', '==', true));

        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setloading(false)
            }, 700);

            setmilktype(querySnapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            );
        });
    };


    return (
        <>


            {/*  Page Header Start  */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">About Us</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Pages</a></li>
                            <li className="breadcrumb-item active" aria-current="page">About</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/*  Page Header End  */}


            {/*  About Start  */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-end">
                        <div className="col-lg-6">
                            <div className="row g-2">
                                <div className="col-6 position-relative wow fadeIn" data-wow-delay="0.7s">
                                    <div className="about-experience bg-secondary rounded">
                                        <h1 className="display-1 mb-0">25</h1>
                                        <small className="fs-5 fw-bold">Years Experience</small>
                                    </div>
                                </div>
                                <div className="col-6 wow fadeIn" data-wow-delay="0.1s">
                                    <img className="img-fluid rounded" src="/assets/img/service-1.jpg" />
                                </div>
                                <div className="col-6 wow fadeIn" data-wow-delay="0.3s">
                                    <img className="img-fluid rounded" src="/assets/img/service-2.jpg" />
                                </div>
                                <div className="col-6 wow fadeIn" data-wow-delay="0.5s">
                                    <img className="img-fluid rounded" src="/assets/img/service-3.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <p className="section-title bg-white text-start text-primary pe-3">About Us</p>
                            <h1 className="mb-4">Know About Our Dairy Farm & Our History</h1>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <div className="row g-5 pt-2 mb-5">
                                <div className="col-sm-6">
                                    <img className="img-fluid mb-4" src="assets/img/service.png" alt="" />
                                    <h5 className="mb-3">Dedicated Services</h5>
                                    <span>Clita erat ipsum et lorem et sit, sed stet lorem sit clita</span>
                                </div>
                                <div className="col-sm-6">
                                    <img className="img-fluid mb-4" src="/assets/img/product.png" alt="" />
                                    <h5 className="mb-3">Organic Products</h5>
                                    <span>Clita erat ipsum et lorem et sit, sed stet lorem sit clita</span>
                                </div>
                            </div>
                            <a className="btn btn-secondary rounded-pill py-3 px-5" href="">Explore More</a>
                        </div>
                    </div>
                </div>
            </div>
            {/*  About End  */}


            {/*  Banner Start  */}
            {/* <div class="container-fluid banner my-5 py-5" data-parallax="scroll" data-image-src="assets/img/banner.jpg">
                <div class="container py-5">
                    <div class="row g-5">
                        <div class="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
                            <div class="row g-4 align-items-center">
                                <div class="col-sm-4">
                                    <img class="img-fluid rounded" src="assets/img/banner-1.jpg" alt="" />
                                </div>
                                <div class="col-sm-8">
                                    <h2 class="text-white mb-3">We Sell Best Dairy Products</h2>
                                    <p class="text-white mb-4">Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                                    <a class="btn btn-secondary rounded-pill py-2 px-4" href="">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <div class="row g-4 align-items-center">
                                <div class="col-sm-4">
                                    <img class="img-fluid rounded" src="assets/img/banner-2.jpg" alt="" />
                                </div>
                                <div class="col-sm-8">
                                    <h2 class="text-white mb-3">We Deliver Fresh Mild Worldwide</h2>
                                    <p class="text-white mb-4">Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                                    <a class="btn btn-secondary rounded-pill py-2 px-4" href="">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/*  Banner End  */}


            {/*  Team Start  */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px" }}>
                        <p className="section-title bg-white text-center text-primary px-3">Milk Types</p>
                        <h1 className="mb-5">Milk We Provide</h1>
                    </div>
                    <div className="row g-4">
                        {milktype?.map((i, index) => (
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="team-item rounded p-4">
                                    <h3>Rs. {i?.price}</h3>
                                    <h5>{i?.milkType}</h5>
                                    <p className="text-primary">{i?.detail}</p>
                                    {/* <div className="d-flex justify-content-center">
                                        <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href=""><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href=""><i className="fab fa-instagram"></i></a>
                                    </div> */}
                                </div>
                            </div>
                        ))}



                    </div>
                </div>
            </div>
            {/*  Team End  */}


            {/*  Back to Top  */}
            <a href="#" classNameName="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i classNameName="bi bi-arrow-up"></i></a>



        </>
    )
}