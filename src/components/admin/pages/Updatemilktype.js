import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";
import { db } from "../../../Firebase";


export default function Updatemilktype() {
    const nav = useNavigate();
    var [milkType, setmilkType] = useState([]);
    var [price, setprice] = useState([]);
    var [detail, setdetail] = useState([]);
    var [loading, setloading] = useState(false)



    var spinnerObj = {
        margin: " 0 auto",
        display: "block",
    }



    useEffect(() => {
        getSinglemilkType()
    }, [])

    const params = useParams()
    const id = params.id

    const getSinglemilkType = async () => {
        let milkTypeRef = doc(db, 'milk type', id);
        let milkTypeSnap = await getDoc(milkTypeRef);

        if (milkTypeSnap.exists()) {
            let milkTypeData = milkTypeSnap.data();
            setmilkType(milkTypeData.milkType);
            setprice(milkTypeData.price);
            setdetail(milkTypeData.detail);
        }
        else {
            console.log("Error in fetching single category");
            toast.error("Something Went Wrong")

        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        setloading(true)
        let milkTypeRef = doc(db, 'milk type', id);
        try {
            updateDoc(milkTypeRef, { milkType: milkType, price: price, detail: detail })
            setloading(false)
            nav('/admin/Managemilktype')
            setTimeout(() => {
                toast.success("milkType Updated Successfully")
            }, 700)
        }
        catch (err) {
            setloading(false)
            console.log("Error in updating milkType", err);
            toast.error("Something Went Wrong")
        }
    }

    return (
        <>

            {/*  Page Header Start  */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Update Milk Type</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                            <Link to='/admin/managecustomer'>  <li className="breadcrumb-item active" aria-current="page">Customers</li></Link>/
                            <Link to='/admin/Updatemilktype'> <li className="breadcrumb-item active text-warning active" aria-current="page">Update Milk Type</li></Link>
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



            {/* {start} */}

            <div className={loading && 'display-none'} >
                <div className="container-xxl py-5">
                    <div className="container">

                        <div className="row g-5">
                            <div className="col-3"></div>
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                                <h3 className="mb-4 text-center ">Update Milk Type</h3>


                                <form onSubmit={handleForm}>
                                    <div className="row g-3">

                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="text" placeholder=" Milk Type"
                                                    value={milkType} onChange={(e) => { setmilkType(e.target.value) }} required />
                                                <label for="text"> Milk Type</label>
                                            </div>
                                        </div>





                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" placeholder="price"
                                                    value={price} onChange={(e) => { setprice(e.target.value) }} required />
                                                <label for="name">Price</label>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <textarea  className="form-control" id="name" placeholder="Detail"
                                                    value={detail} onChange={(e) => { setdetail(e.target.value) }} required ></textarea> 
                                                <label for="name">Detail</label>
                                            </div>
                                        </div>



                                        <div className="col-12">
                                            <button className="btn btn-secondary rounded-pill py-3 px-5" type="submit">Update</button>
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