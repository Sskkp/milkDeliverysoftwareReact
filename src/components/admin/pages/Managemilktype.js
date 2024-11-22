import { collection, doc, onSnapshot, query, querySnapshot, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { db } from "../../../Firebase";
import moment from "moment";
import { toast } from "react-toastify";

export default function Managemilktype() {
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
        const que = query(milktyperef, where('status','==',true));

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

    const getDate = (date) => {
        let finalDate = moment(date.toDate()).format("MMM Do YYYY")
        return finalDate
   
    }

    const deletemilktype = (id) => {
        let confirm = window.confirm("Are you sure you wnat to delete it?")
        if (confirm) {
            setloading(true)
            try {
                let milktypeRef = doc(db, '/milk type', id);
                updateDoc(milktypeRef, { status: false })

                setloading(false);
                toast.success("Milk Type Deleted Succesfully");

            }
            catch (err) {
                console.log("Error in deleting Milk Type", err);
                setloading(false);
                toast.error("Something Went Wrong")
            }
        }
    }


    return (
        <>
            {/*  Page Header Start  */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Milk Type</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                            <Link to='/admin/managecustomer'>  <li className="breadcrumb-item active" aria-current="page">Customers</li></Link>/
                            <Link to='/admin/managemilktype'> <li className="breadcrumb-item active text-warning active" aria-current="page"> Milk Type</li></Link>
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





            <div className={loading && 'display-none'} >

                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <h1>Milk Types</h1>

                            </div>

                            <div className="col-2 text-end">
                                <Link to='/admin/addmilktype'>
                                    <button className="btn btn-warning">
                                        Add Milk Type

                                    </button></Link>

                            </div>
                        </div>

                        <table class="table table-warning">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Milk Type</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Detail</th>
                                    <th scope="col">Created-At</th>
                                    <th scope="col">Status</th>


                                </tr>
                            </thead>
                            <tbody>
                                {milktype?.map((i, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{i?.milkType}</td>
                                        <td>{i?.price}</td>
                                        <td width="500px">{i?.detail}</td>
                                        <td>{getDate(i?.createdAt)}</td>
                                        <td>
                                            <Link to={'/admin/updatemilktype/' + i?.id}>
                                                <button type="button" class="btn btn-primary mx-1"><i class="bi bi-pencil-square"></i></button></Link>
                                            <button type="button" class="btn btn-danger mx-1"
                                                onClick={() => { deletemilktype(i?.id) }}> <i class="bi bi-trash3-fill"></i></button>
                                        </td>
                                    </tr>
                                ))}



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}