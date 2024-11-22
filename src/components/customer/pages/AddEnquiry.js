import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { db } from "../../../Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function AddEnquiry() {
    const nav = useNavigate()
    const uData = JSON.parse(sessionStorage.getItem('data'))[0]
    var [userId, setuserId] = useState(uData.id)
    var [name, setname] = useState(uData.name)
    var [email, setemail] = useState(uData.email)
    var [contact, setcontact] = useState(uData.contact)
    var [subject, setsubject] = useState('')
    var [message, setmessage] = useState('')
    var [loading, setloading] = useState(false)

    var spinnerObj = {       
        margin: " 0 auto",
        display: "block",
    }



    const handleForm = (e) => {
        e.preventDefault()
        setloading(true)
    

    try {
        let enquiryref = collection(db, '/enquiry')
        addDoc(enquiryref, {
            userId: userId,
            name: name,
            email: email,
            subject: subject,
            contact: contact,
            message: message,
            createdAt: Timestamp.now(),
            status: true
        })
        setloading(false);
        setsubject('')
        setmessage('')
        setTimeout(() => {
            toast.success("Message Sent")

        }, 500);
    }

    catch (error) {
        setloading(false);
        toast.error("Something Went Wrong")
        console.log("error in add enquiry", error)

    }

    }

return (
    <>

        {/*  Page Header Start  */}
        <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container text-center py-5">
                <h1 className="display-3 text-white mb-4 animated slideInDown">Message Us</h1>
                <nav aria-label="breadcrumb animated slideInDown">
                    <ol className="breadcrumb justify-content-center mb-0">
                        <Link to='/Home'><li className="breadcrumb-item active" aria-current="page">Home</li></Link>/
                        <Link to='/customer/Addenquiry'> <li className="breadcrumb-item active text-warning active" aria-current="page">Add Enquiry</li></Link>
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
                            <h3 className="mb-4 text-center">Message/Complaint/Suggestion</h3>

                            <form onSubmit={handleForm}>
                                <div className="row g-3">

                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="name" placeholder="Name"
                                                value={name} onChange={(e) => { setname(e.target.value) }}
                                                required />
                                            <label for="name">Name</label>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="email" placeholder="email"
                                                required value={email} onChange={(e) => { setemail(e.target.value) }} />
                                            <label for="email">Email</label>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="contact" placeholder="contact"
                                                required value={contact} onChange={(e) => { setcontact(e.target.value) }} />
                                            <label for="contact">Contact</label>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="subject" placeholder="subject"
                                                required value={subject} onChange={(e) => { setsubject(e.target.value) }} />
                                            <label for="subject">Subject</label>
                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <textarea type="text" className="form-control" id="message" placeholder="Message"
                                                 value={message} onChange={(e) => { setmessage(e.target.value) }} />
                                            <label for="message">Message</label>
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