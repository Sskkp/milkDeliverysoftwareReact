import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { db } from "../../../Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Addmilktype() {
    const nav = useNavigate()

    var [milkType, setmilkType] = useState('')
    var [price, setprice] = useState(0)
    var [detail, setdetail] = useState('')
    var [loading, setloading] = useState(false)

    var spinnerObj = {
        margin: " 0 auto",
        display: "block",
    }

    const handleForm = (e) => {
        e.preventDefault()
        setloading(true)
    

    try {
        let milktyperef = collection(db, '/milk type')
        addDoc(milktyperef, {
            milkType: milkType,
            price: price,
            detail: detail,
            createdAt: Timestamp.now(),
            status: true
        })
        setloading(false);
        nav("/admin/Managemilktype")
        setTimeout(() => {
            toast.success("Milk Type Is Added")

        }, 500);
    }

    catch (error) {
        setloading(false);
        toast.error("Something Went Wrong")
        console.log("error in add milk type", error)

    }

    }

return (
    <>

        {/*  Page Header Start  */}
        <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container text-center py-5">
                <h1 className="display-3 text-white mb-4 animated slideInDown">Add Milk Type</h1>
                <nav aria-label="breadcrumb animated slideInDown">
                    <ol className="breadcrumb justify-content-center mb-0">
                        <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                        <Link to='/admin/managecustomer'>  <li className="breadcrumb-item active" aria-current="page">Customers</li></Link>/
                        <Link to='/admin/Addmilktype'> <li className="breadcrumb-item active text-warning active" aria-current="page">Add Milk Type</li></Link>
                    </ol>
                </nav>
            </div>
        </div>
        {/*  Page Header End  */}

        <PacmanLoader
            color="#404A3D"
            loading={loading}
            cssOverride={spinnerObj}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        {/*  Contact Start  */}

        <div className={loading && 'display-none'} >
            <div className="container-xxl py-5">
                <div className="container">

                    <div className="row g-5">
                        <div className="col-3"></div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <h3 className="mb-4 text-center">Add Milk Type</h3>


                            <form onSubmit={handleForm}>
                                <div className="row g-3">

                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="milkType" placeholder=" Milk Type"
                                                value={milkType} onChange={(e) => { setmilkType(e.target.value) }}
                                                required />
                                            <label for="milkType"> Milk Type</label>
                                        </div>
                                    </div>





                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="price" placeholder="price"
                                                required value={price} onChange={(e) => { setprice(e.target.value) }} />
                                            <label for="price">Price</label>
                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <textarea type="text" className="form-control" id="detail" placeholder="Detail"
                                                 value={detail} onChange={(e) => { setdetail(e.target.value) }} />
                                            <label for="detail">Detail</label>
                                        </div>
                                    </div>


                                    <div className="col-12">
                                        <button className="btn btn-secondary rounded-pill py-3 px-5" type="submit">Add</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-3"></div>



                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Contact End --> */}
    </>
)
}