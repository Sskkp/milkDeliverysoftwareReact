import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Firebase";

export default function Manageenquiry() {
    var [enquiry, setenquiry] = useState([]);
    var [loading, setloading] = useState(true);

    var spinnerObj = {
        margin: "100px auto",
        display: "block",
    }

    useEffect(() => {
        getAllenquiry();
    }, []);


    const getAllenquiry = () => {
        const enquiryref = collection(db, '/enquiry');
        const que = query(enquiryref, orderBy("createdAt", 'desc'));

        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setloading(false)
            }, 700);
    
            setenquiry(querySnapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            );
        });
    };


    // const changeStatus = (id, status) => {
    //     let confirm = window.confirm('Are you sure to Change Status it?')
    //     if (confirm) {
    //         setloading(true)
    //         let entryRef = doc(db, '/enquiry', id);
    //         try {
    //             updateDoc(entryRef, { status: status })
    //             setloading(false)
    //             setTimeout(() => {
    //                 toast.success("Deleted Successfully")
    //             }, 700)
    //         }
    //         catch (err) {
    //             setloading(false)
    //             console.log("Error in updating status", err);
    //             toast.error("Something Went Wrong")
    //         }
    //     }
    // }

    const getDate = (date) => {
        let finalDate = moment(date.toDate()).format("MMM Do YYYY")
        return finalDate
    }

    return (
        <>
            {/*  Page Header Start  */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Enquiry</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                            <Link to='/admin/managecustomer'>  <li className="breadcrumb-item active" aria-current="page">Customers</li></Link>/
                            <Link to='/admin/Manageenquiry'> <li className="breadcrumb-item active text-warning active" aria-current="page">Enquiry</li></Link>
                        </ol>
                    </nav>
                </div>
            </div>
            {/*  Page Header End  */}

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <h1>Enquiry</h1>

                        </div>


                    </div>

                    <table class="table table-warning">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Message</th>
                                <th scope="col">Created-At</th>
                                {/* <th scope="col">Status</th> */}



                            </tr>
                        </thead>
                        <tbody>
                            {enquiry?.map((i, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{i?.name}</td>
                                    <td>{i?.email}</td>
                                    <td>{i?.contact}</td>
                                    <td>{i?.subject}</td>
                                    <td width="400px">{i?.message}</td>
                                    <td>{getDate(i?.createdAt)}</td>
                                    {/* <td>
                                        <div >
                                            <button className="btn btn-success fs-7 m-2"><input type="radio" id="active-id" name="active_input" value="active" />
                                                <label for="active_id">Read</label></button>
                                        </div>
                                        <div>
                                            <button className="btn btn-danger ">  <input type="radio" id="unactive_id" name="active_input" value="unactive" />
                                                <label for="unactive_id">Unread</label></button>

                                        </div>
                                    </td> */}

                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}