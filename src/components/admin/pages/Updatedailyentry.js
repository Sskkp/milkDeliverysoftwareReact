import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../../Firebase";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";


export default function Updatedailyentry() {

    const nav = useNavigate()

    var [userName, setuserName] = useState('')
    var [milkType, setmilkType] = useState('')
    var [pricePerKg, setpricePerKg] = useState(0)
    var [dayPrice, setdayPrice] = useState(0)
    var [quantity, setquantity] = useState(0)
    var newdate = new Date()
    var d = newdate.getDate()
    var m = newdate.getMonth()+1
    var y = newdate.getFullYear()
    
    d<10 ? d = '0' + d : d=d.toString()
    m<10 ? m = '0' + m : m=m.toString()
    y=y.toString()
    var [TodayDate, setTodayDate] = useState(newdate.toISOString().split('T')[0])

    
  
    var [date, setdate] = useState(d)
    var [month, setmonth] = useState(m)
    var [year, setyear] = useState(y)  
    var [loading, setloading] = useState(false)

    var spinnerObj = {
        margin: " 0 auto",   
        display: "block",   
    }


    useEffect(()=>{
        getEntry()
    },[])

    const params = useParams()
    const id = params.id

    const getEntry = async ()=>{
        let entryRef = doc(db, "/dailyentry", id);
        let entrySnap = await getDoc(entryRef);
        if(entrySnap.exists()){
            let data = entrySnap.data()
            setpricePerKg(data.pricePerKg);
            setdayPrice(data.dayPrice);
            setquantity(data.quantity);
        }
    }




    const handleForm = (e) => {
        e.preventDefault()
        setloading(true)


        try {
            let dailyentryref = doc(db, '/dailyentry',id)
            updateDoc(dailyentryref, {
                
                
                dayPrice: dayPrice,
                quantity: quantity,
               
            })
            setloading(false);
            nav("/admin/Managedailyentry")
            setTimeout(() => {
                toast.success("Daily Entry Is Updated")

            }, 500);
        }

        catch (error) {
            setloading(false);
            toast.error("Something Went Wrong")
            console.log("error in update daily entry", error)

        }

    }


     const handleQuantity = (e) => { 
        let qty = e.target.value
        setquantity(qty) 
        setdayPrice(pricePerKg * qty);
    }
    return (     
        <>

            {/*  Page Header Start  */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Update Daily Entry</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                            <Link to='/admin/Managedailyentry'>  <li className="breadcrumb-item active" aria-current="page">Daily Entry</li></Link>/
                            <Link to='/admin/Updatedailyentry'> <li className="breadcrumb-item active text-warning active" aria-current="page">Update Daily Entry</li></Link>
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
                                <h3 className="mb-4 text-center">Update Daily Entry !</h3>

   
                                <form onSubmit={handleForm}>
                                    <div className="row g-3">


                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="price" placeholder="Price"
                                                    value={pricePerKg} onChange={(e) => { setpricePerKg(e.target.value) }} readOnly
                                                    required />
                                                <label for="price">Price per Kg</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="number" className="form-control" id="qty" placeholder="Quantity"
                                                    value={quantity} onChange={handleQuantity} 
                                                    required  min="0" />
                                                <label for="qty">Price per Kg</label>
                                            </div>
                                        </div>
   
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="dayPrice" placeholder="Day Price"
                                                    value={dayPrice} onChange={(e) => { setdayPrice(e.target.value) }} readOnly
                                                    required />
                                                <label for="dayPrice">Day Price</label>
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