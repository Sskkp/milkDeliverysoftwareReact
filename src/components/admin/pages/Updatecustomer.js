import { collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../../Firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Updatecustomer() {

    const nav = useNavigate()
    var [milktypes, setmilktypes] = useState([]);
    var [name, setname] = useState('')
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
        getCustomerData()
    }, []);
    const params = useParams()
    const id = params.id

    const getCustomerData = async ()=>{
        let userRef = doc(db, "/users", id);
        let userSnap = await getDoc(userRef);
        if(userSnap.exists()){
            let data = userSnap.data()
            setname(data.name);
            setcontact(data.contact);
            setmilkType(data.milkType)   
            setmilkTypeName(data.setmilkTypeName)   
            setmilkTypeName(data.setmilkTypeName)   
            setaddress(data.address)
            setdailyQuantity(data.dailyQuantity)
        }
    }
   

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

    

    const handleForm = (e) => {
        e.preventDefault()
        setloading(true)
        try {
            let customerref = doc(db, '/users', id)
            updateDoc(customerref, {
                name: name,
                contact: contact,
                milkType: milkType,
                milkTypeName: milkTypeName,
                dailyQuantity: dailyQuantity,
                address: address
            })
            setloading(false);
            nav("/admin/Managecustomer")
            setTimeout(() => {
                toast.success("Customer Updated")
            }, 500);
        }

        catch (error) {
            setloading(false);
            toast.error("Something Went Wrong")
            console.log("error in update customer ", error)
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

            {/*  Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Upate Customers</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                            <Link to='/admin/managecustomer'>  <li className="breadcrumb-item active" aria-current="page">Customers</li></Link>/
                            <Link to='/admin/Updatecustomer'> <li className="breadcrumb-item active text-warning active" aria-current="page">Update Customer</li></Link>
                        </ol>
                    </nav>
                </div>
            </div>
            {/*  Page Header End  */}



            {/*  Contact Start  */}
            <div className="container-xxl py-5">
                <div className="container">

                    <div className="row g-5">
                        <div className="col-3"></div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <h3 className="mb-4 text-center">Update Customer</h3>


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
                                                {milktypes?.map((i, index) => (
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
                                        <button className="btn btn-secondary rounded-pill py-3 px-5" type="submit">Update</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="col-3"></div>

                    </div>
                </div>
            </div>

            {/*  Contact End  */}
        </>
    )
}