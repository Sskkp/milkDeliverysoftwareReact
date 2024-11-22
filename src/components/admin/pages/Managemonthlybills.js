import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../Firebase";

export default function Managemonthlybills() {

    var [monthlybills, setmonthlybills] = useState([])
    var [loading, setloading] = useState(true);

    var spinnerObj = {
        margin: "100px auto",     
        display: "block",
    }

    useEffect(() => {
        getAllmonthlybill();
    }, []);


    const getAllmonthlybill = () => {
        const monthlybillref = collection(db, '/monthlybill');
        const que = query(monthlybillref, where('status', "==", true), orderBy("createdAt", 'desc'));

        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setloading(false)
            }, 700);

            setmonthlybills(querySnapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            );
        });
    };

    const getDate = (date) => {
        let finalDate = moment(date.toDate()).format("MMM Do YYYY")
        return finalDate
    }

    const getMonth = (month)=>{
        let arr = [
            {month:"January", count:"01"}, 
            {month:"February", count:"02"},
            {month:"March", count:"03"},
            {month:"April", count:"04"},
            {month:"May", count:"05"},
            {month:"June", count:"06"},
            {month:"July", count:"07"},
            {month:"August", count:"08"},
            {month:"September", count:"09"},
            {month:"October", count:"10"},
            {month:"November", count:"11"},
            {month:"December", count:"12"}
        ]

        let monthName =  arr.filter((x)=>{return x.count == month })[0].month
        return monthName
    }

    const changePaymentStatus = (id, status) => {
        
            setloading(true)
            let billRef = doc(db, '/monthlybill', id);
            try {
                updateDoc(billRef, { isPaid: status })
                setloading(false)
                setTimeout(() => {
                    toast.success("Payment Status Updated")
                }, 700)
            }
            catch (err) {
                setloading(false)
                console.log("Error in updating payment status", err);
                toast.error("Something Went Wrong")
            }
       
    }

    const changeDeleteStatus = (id, status) => {
        let confirm = window.confirm('Are you sure to delete it?')
        if (confirm) {
            setloading(true)
            let billRef = doc(db, '/monthlybill', id);
            try {
                updateDoc(billRef, { status: status })
                setloading(false)
                setTimeout(() => {
                    toast.success("Deleted Successfully")
                }, 700)
            }
            catch (err) {
                setloading(false)
                console.log("Error in updating status", err);
                toast.error("Something Went Wrong")
            }
        }
    }

    
    
    return (
        <>
            {/*  Page Header Start  */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Monthly Bills</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                            <Link to='/admin/Managecustomer'>  <li className="breadcrumb-item active" aria-current="page">Customers</li></Link>/
                            <Link to='/admin/Managemonthlybills'> <li className="breadcrumb-item active text-warning active" aria-current="page">Monthly Bills</li></Link>
                        </ol>
                    </nav>
                </div>
            </div>
            {/*  Page Header End  */}

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <h1>Monthly Bills</h1>

                        </div>


                    </div>

                    <table class="table table-warning">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Month</th>
                                <th scope="col">Year</th>
                                <th scope="col">Created-At</th>
                                <th scope="col">Payment Status</th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {monthlybills?.map((i, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{i?.userName}</td>
                                    <td>Rs. {i?.totalAmount}</td>
                                    <td>{getMonth(i?.month)}</td>
                                    <td>{i?.year}</td>
                                    <td>{getDate(i?.createdAt)}</td>
                                    <td>
                                        {i?.isPaid ? "Paid" :
                                        
                                        <button type="button" class="btn btn-danger mx-1" onClick={() => { changePaymentStatus(i?.id, true) }}>Change To Paid</button>
                                    }
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger mx-1" onClick={() => { changeDeleteStatus(i?.id, false) }}><i class="bi bi-trash3-fill"></i></button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}