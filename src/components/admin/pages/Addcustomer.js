import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../Firebase";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";
import { addDoc, collection, onSnapshot, query, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Addcustomer() {
    const nav = useNavigate()
    var [milktypes, setmilktypes] = useState([]);
    var [name, setname] = useState('')
    var [email, setemail] = useState('')
    var [password, setpassword] = useState('')
    
    var [contact, setcontact] = useState('')
    var [milkType, setmilkType] = useState('')
    var [milkTypeName, setmilkTypeName] = useState('')
    var [dailyQuantity, setdailyQuantity] = useState('')
    var [address, setaddress] = useState('')
    var [loading, setloading] = useState(true)


    var spinnerObj = {
        margin: " 0 auto",
        display: "block",
    }

    useEffect(() => {
        getAllmilktype();
    }, []);


    const getAllmilktype = () => {
        const milktyperef = collection(db, '/milk type');
        const que = query(milktyperef);

        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setloading(false)
            }, 700);

            setmilktypes(querySnapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            );
        });
    };

    const signUp = async () => {
        try {
            let res = await createUserWithEmailAndPassword(auth, email, password)
            setloading(false);
          
            addCustomer(res.user.uid)
        } catch (err) {
            console.log("Error in signup", err);

            setloading(false);
            toast.error(err.message);
        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        setloading(true)
        signUp()
    }

    const addCustomer = (uid) => {
        try {
            let customerref = collection(db, '/users')
            addDoc(customerref, {
                name: name,
                email: email,
                contact: contact,
                milkType: milkType,
                milkTypeName: milkTypeName,
                dailyQuantity: dailyQuantity,
                address: address,
                uid: uid,
                userType:2,
                createdAt: Timestamp.now(),
                status: true
            })
            setloading(false);
            nav("/admin/Managecustomer")
            setTimeout(() => {
                toast.success("New Customer Added")
            }, 500);
        }

        catch (error) {
            setloading(false);
            toast.error("Something Went Wrong")
            console.log("error in add customer ", error)
        }
    }

    const handleMilkType = (e) => { 
        let id = e.target.value
        setmilkType(id) 
        let name = milktypes.filter((x)=>{return x.id == id })[0]?.milkType
        setTimeout(()=>{
            setmilkTypeName(name)
        },200)
        
    }
    return (
        <>

            {/*  Page Header Start  */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Add Customer</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                            <Link to='/admin/Managecustomer'>  <li className="breadcrumb-item active" aria-current="page">Customers</li></Link>/
                            <Link to='/admin/Addcustomer'> <li className="breadcrumb-item active text-warning active" aria-current="page">Add Customer</li></Link>
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
                                <h3 className="mb-4 text-center">Add New Customer !</h3>


                                <form onSubmit={handleForm}>
                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="name" className="form-control" id="name" placeholder=" Name"
                                                    required value={name} onChange={(e) => { setname(e.target.value) }} />
                                                <label for="name"> Name</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder=" Email"
                                                    required value={email} onChange={(e) => { setemail(e.target.value) }} />
                                                <label for="email_id"> Email</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="password" className="form-control" id="password" placeholder="Password"
                                                    required value={password} onChange={(e) => { setpassword(e.target.value) }} />
                                                <label for="password_id"> Password</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="tel" className="form-control" id="tel_id" placeholder="contact"
                                                    maxLength={10}
                                                    required value={contact} onChange={(e) => { setcontact(e.target.value) }} />
                                                <label for="tel_id"> Contact</label>
                                            </div>
                                        </div>


                                        <div className="col-md-6 ">
                                            <div className="form-floating">
                                                <select className="form-control" name="milktype_input" id="milktype_id"
                                                    value={milkType} onChange={handleMilkType}  >
                                                    
                                                    <option value="" disabled selected> Choose Milk Type</option>
                                                    {milktypes?.map((i, index)=>(
                                                        <option key={index} value={i?.id}>{i?.milkType}</option>
                                                    ))}
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="number" className="form-control" id="quantity_id" placeholder="quantity "
                                                    min={0} max={50}
                                                    required value={dailyQuantity} onChange={(e) => { setdailyQuantity(e.target.value) }} />
                                                <label for="quantity_id">Quantity</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" placeholder="Address"
                                                    required value={address} onChange={(e) => { setaddress(e.target.value) }} />
                                                <label for="name">Address</label>
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