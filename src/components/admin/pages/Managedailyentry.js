import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Firebase";
import { PacmanLoader } from "react-spinners";
import moment from "moment";
import { clear } from "@testing-library/user-event/dist/clear";
import { toast } from "react-toastify";

export default function Managedailyentry() {
    var [dailyentry, setdailyentry] = useState([]);
    var [filterDate, setfilterDate] = useState('');
    var [loading, setloading] = useState(true);

    var spinnerObj = {
        margin: "100px auto",
        display: "block",
    }

    useEffect(() => {
        getAlldailyentry();
    }, []);


    const getAlldailyentry = () => {
        const dailyentryref = collection(db, '/dailyentry');
        const que = query(dailyentryref, where('status', "==", true), orderBy("createdAt", 'desc'));

        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setloading(false)
            }, 700);

            setdailyentry(querySnapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            );
        });
    };


    const handleDate = (e) => {
        let today = e.target.value
        setfilterDate(today);
        let dateDetail = today.split("-")
        const dailyentryref = collection(db, '/dailyentry');
        const que = query(dailyentryref, where('status', "==", true), where("date", '==', dateDetail[2]), where("month", '==', dateDetail[1]), where("year", '==', dateDetail[0]), orderBy("createdAt", 'desc'));

        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setloading(false)
            }, 700);

            setdailyentry(querySnapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            );
        });
    }


    const changeStatus = (id, status) => {
        let confirm = window.confirm('Are you sure to delete it?')
        if (confirm) {
            setloading(true)
            let entryRef = doc(db, '/dailyentry', id);
            try {
                updateDoc(entryRef, { status: status })
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

    const clear = () => {
        setfilterDate("")
        getAlldailyentry()
    }

    const getDate = (date) => {
        let finalDate = moment(date.toDate()).format("MMM Do YYYY")
        return finalDate
    }

    return (
        <>
            {/*  Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Daily Entry</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                            <Link to='/admin/managecustomer'>  <li className="breadcrumb-item active" aria-current="page">Customers</li></Link>/
                            <Link to='/admin/Managedailyentry'> <li className="breadcrumb-item active text-warning active" aria-current="page">Daily Entry</li></Link>

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
                            <div className="col-9">
                                <h1>List of Daily Entry</h1>

                            </div>
                            <div className="col-2 text-end">
                                <div className="form-floating">
                                    <input type="date" className="form-control" id="Date" placeholder="date"
                                        required value={filterDate} onChange={handleDate} />
                                    <label for="Date">Date</label>
                                </div>
                            </div>
                            <div className="col-1 text-end">
                                <div className="form-floating">
                                    <button type="button" onClick={(e) => { clear() }} class="btn btn-danger mx-1 w-100">Clear</button>
                                </div>
                            </div>

                        </div>

                        <table class="table table-warning">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Milk Type</th>
                                    <th scope="col">Price per Kg</th>
                                    <th scope="col">Day Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Created-At</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailyentry?.map((i, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{i.userName}</td>
                                        <td>{i.milkType}</td>
                                        <td>Rs. {i.pricePerKg}</td>
                                        <td>Rs. {i.dayPrice}</td>
                                        <td>{i.quantity} Kg</td>
                                        <td>{i.date}-{i.month}-{i.year}</td>
                                        <td>{getDate(i?.createdAt)}</td>
                                        <td>
                                            <button type="button" class="btn btn-danger mx-1" onClick={() => { changeStatus(i?.id, false) }}><i class="bi bi-trash3-fill"></i></button>
                                            <Link to={'/admin/Updatedailyentry/' + i?.id}> <button type="button" class="btn btn-primary mx-1"><i class="bi bi-pencil-square"></i></button></Link>
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