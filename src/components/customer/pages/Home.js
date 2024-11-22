export default function Home() {
    return (
        <>
            {/*  Carousel Start  */}
            <div class="container-fluid px-0 mb-5">
                <div id="header-carousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="w-100" src="assets/img/carousel-1.jpg" alt="Image" />
                            <div class="carousel-caption">
                                <div class="container">
                                    <div class="row justify-content-start">
                                        <div class="col-lg-8 text-start">
                                            <p class="fs-4 text-white">Welcome to our dairy farm</p>
                                            <h1 class="display-1 text-white mb-5 animated slideInRight">The Farm of Dairy products</h1>
                                            <a href="" class="btn btn-secondary rounded-pill py-3 px-5 animated slideInRight">Explore More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img class="w-100" src="assets/img/carousel-2.jpg" alt="Image" />
                            <div class="carousel-caption">
                                <div class="container">
                                    <div class="row justify-content-end">
                                        <div class="col-lg-8 text-end">
                                            <p class="fs-4 text-white">Welcome to our dairy farm</p>
                                            <h1 class="display-1 text-white mb-5 animated slideInRight">Best Organic Dairy Products</h1>
                                            <a href="" class="btn btn-secondary rounded-pill py-3 px-5 animated slideInLeft">Explore More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#header-carousel"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            {/*  Carousel End  */}


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

            {/*  Back to Top  */}
            <a href="#" class="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i class="bi bi-arrow-up"></i></a>
        </>
    )
}