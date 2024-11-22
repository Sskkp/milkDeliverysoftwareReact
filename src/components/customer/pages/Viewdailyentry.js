import { collection, doc, onSnapshot, orderBy, query, querySnapshot, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { db } from "../../../Firebase";
import moment from "moment";
import { toast } from "react-toastify";

export default function Viewdailyentry() {
    var [dailyentry, setdailyentry] = useState([]);
    var [loading, setloading] = useState(true);
    const userId = sessionStorage.getItem('id')
    var spinnerObj = {
        margin: "100px auto",
        display: "block",
    }

    useEffect(() => {
        getAlldailyentry();
    }, []);


    const getAlldailyentry = () => {
        const dailyentryref = collection(db, '/dailyentry');
        const que = query(dailyentryref, where('status','==',true), where("userId", '==', userId), orderBy('createdAt','desc'));

        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setloading(false)
            }, 700);

            setdailyentry(querySnapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            })));    
        });

    };

    
    const getDate = (date) => {
        let finalDate = moment(date.toDate()).format("MMM Do YYYY")
        return finalDate
    }
     

    return (
        <>
            {/*  Page Header Start  */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Daily Entry</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            
                            <Link to='/Home'>  <li className="breadcrumb-item active" aria-current="page">Home</li></Link>/
                            <Link to='/customer/Viewdailyentry'> <li className="breadcrumb-item active text-warning active" aria-current="page">Daily Entry</li></Link>
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
                                <h1>Daily Entry</h1>

                            </div>

                            <div className="col-2 text-end">
                                {/* <Link to='/admin/adddailyentry'>
                                    <button className="btn btn-warning">
                                        Add Milk Type

                                    </button></Link> */}

                            </div>
                        </div>

                        <table class="table table-warning">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Milk Type</th>
                                    <th scope="col">Price per Kg</th>
                                    <th scope="col">Day Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Created-At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailyentry?.map((i, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{i.milkType}</td>
                                        <td>Rs. {i.pricePerKg}</td>
                                        <td>Rs. {i.dayPrice}</td>
                                        <td>{i.quantity} Kg</td>
                                        <td>{i.date}-{i.month}-{i.year}</td>
                                        <td>{getDate(i?.createdAt)}</td>
                                        

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