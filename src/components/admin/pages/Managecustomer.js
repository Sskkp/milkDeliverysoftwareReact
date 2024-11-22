import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { db } from "../../../Firebase";
import { collection, doc, onSnapshot, orderBy, query, querySnapshot, updateDoc, where } from "firebase/firestore";
import moment from "moment";
import { toast } from "react-toastify";

export default function Managecustomer() {
    var [customers, setcustomers] = useState([]);
    var [loading, setloading] = useState(true);

    var spinnerObj = {
        margin: " 100px auto",
        display: "block",
    }

    useEffect(() => {
        getAllCustomers();
    }, []);


    const getAllCustomers = () => {
        const customerref = collection(db, '/users');
        const que = query(customerref, orderBy('createdAt', 'desc'), where('userType', "==", 2));

        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setloading(false)
            }, 700);

            setcustomers(querySnapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            );
        });
    };

    const getDate = (date) => {
        if (date) {
            let finalDate = moment(date.toDate()).format("MMM Do YY")
            return finalDate
        }
    }

    const changeStatus = (id, status) => {

        setloading(true)
        let userRef = doc(db, '/users', id);
        try {
            updateDoc(userRef, { status: status })
            setloading(false)
            setTimeout(() => {
                toast.success("User Status Updated Successfully")
            }, 700)
        }
        catch (err) {
            setloading(false)
            console.log("Error in updating status", err);
            toast.error("Something Went Wrong")
        }
    }
    return (
        <>
            {/*  Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Customers</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">

                            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                            <Link to='/admin/Managecustomer'> <li className="breadcrumb-item active text-warning active" aria-current="page"> Customer</li></Link>

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
                                <h1>List Of Customers</h1>

                            </div>
                            <div className="col-2 text-end">
                                <Link to="/admin/addcustomer"> <button className="btn btn-warning">
                                    Add Customer
                                </button></Link>

                            </div>

                        </div>

                        <table class="table table-warning">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Daily Quantity</th>
                                    <th scope="col">Milk Type</th>
                                    <th scope="col">Joined At</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Daily Entry</th>
                                    <th scope="col">Monthly Bill</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers?.map((i, index) => (
                                    <tr key={index}>

                                        <th scope="row">{index + 1}</th>
                                        <td>{i?.name}</td>
                                        <td>{i?.email}<br/>{i?.contact}</td>
                                        <td>{i?.address}</td>
                                        <td>{i?.dailyQuantity}</td>
                                        <td>{i?.milkTypeName}</td>
                                        <td>{getDate(i?.createdAt)}</td>
                                        <td>{i?.status ? "Active" : "In-active"}</td>
                                        <td>
                                            <Link to={'/admin/Updatecustomer/'+i?.id}><button type="button" class="btn btn-primary mx-1"><i class="bi bi-pencil-square"></i></button></Link>
                                            {
                                                i?.status ?
                                                    <button type="button" class="btn btn-danger mx-1" onClick={() => { changeStatus(i?.id, false) }}><i class="bi bi-person-x-fill"></i></button>
                                                    :
                                                    <button type="button" class="btn btn-primary mx-1" onClick={() => { changeStatus(i?.id, true) }}><i class="bi bi-person-check"></i></button>
                                            }


                                        </td>
                                        <td>
                                            <Link to={'/admin/Adddailyentry/'+i?.id}><button type="button" class="btn btn-primary mx-1"><i class="bi bi-plus-square-fill"></i></button></Link>
                                        </td>
                                        <td>
                                            <Link to={'/admin/Addmonthlybill/'+i?.id+'/'+i?.name}><button type="button" class="btn btn-primary mx-1"><i class="bi bi-plus-square-fill"></i></button></Link>
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