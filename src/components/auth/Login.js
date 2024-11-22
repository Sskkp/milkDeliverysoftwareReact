import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { ClipLoader, PacmanLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { auth, db } from "../../Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function Login() {

    const nav = useNavigate()
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('')
    var [loading, setloading] = useState(false)

    var spinnerObj = {
        margin: " 0 auto",
        display: "block",
    }

    const loginSubmit = async (e) => {
        e.preventDefault();

        setloading(true)

        try {
            let res = await signInWithEmailAndPassword(auth, email, password)
            setloading(false)
            checkUser(res.user.uid)
            // console.log(res);
            
        } catch (err) {
            setloading(false)
            toast.error(err.message)
            console.log(err);

        }

    }


    const checkUser = (uid) => {
        setloading(true)
        let customerRef = collection(db, "/users")
        let que = query(customerRef, where("uid", "==", uid))
        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setloading(false)
            }, 700)

            let uData = querySnapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            // console.log(uData);
            

            if (uData[0]?.userType == 1) {
                sessionStorage.setItem("userType", uData[0].userType)
                sessionStorage.setItem("name", uData[0].name)
                sessionStorage.setItem("id", uData[0].id)
                sessionStorage.setItem("isLogin", true)

                nav('/admin/Dashboard')

            }
            else if (uData[0]?.userType == 2) {
                if (uData[0].status) {
                    sessionStorage.setItem("userType", uData[0].userType)
                    sessionStorage.setItem("name", uData[0].name)
                    sessionStorage.setItem("id", uData[0].id)
                    sessionStorage.setItem("data", JSON.stringify(uData))
                    sessionStorage.setItem("isLogin", true)
                    nav('/Home')

                }
                else {
                    toast.error("Account Inactive, Contact Admin")
                 

                }
            } else {
                toast.error("Invalid Credentials")
                

            }

        })

    }

    return (

        <>
            <ToastContainer />


            {/* <!-- Page Header Start --> */}
            <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="container text-center py-5">
                    <h1 class="display-3 text-white mb-4 animated slideInDown">Milky Mornings</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol class="breadcrumb justify-content-center mb-0">

                            <li class="breadcrumb-item active" aria-current="page">Login</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* <!-- Page Header End --> */}

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
                        <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px" }}>
                            <p className="section-title bg-white text-center text-primary px-3">Login Now</p>

                        </div>
                        <div className="row g-5">
                            <div className="col-3"></div>
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                                {/* <h3 className="mb-4 text-center">Don't have an account?</h3> */}


                                <form onSubmit={loginSubmit}>
                                    <div className="row g-3">

                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder="Your Email"
                                                    value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                                                <label for="email">Your Email</label>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input type="password" className="form-control" id="password" placeholder="Password"
                                                    value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                                                <label for="password">Password</label>
                                            </div>
                                        </div>


                                        <div className="col-12">
                                            <button className="btn btn-secondary rounded-pill py-3 px-5" type="submit">Login</button>
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