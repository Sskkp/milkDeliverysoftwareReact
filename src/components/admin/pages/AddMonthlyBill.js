import { addDoc, collection, doc, onSnapshot, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../../Firebase";
import { PacmanLoader } from "react-spinners";
import moment from "moment";
import { clear } from "@testing-library/user-event/dist/clear";
import { toast } from "react-toastify";

export default function AddMonthlyBill() {

    const nav = useNavigate()
    var [dailyentry, setdailyentry] = useState([]);
    var [bill, setbill] = useState(0);
    var [filterMonth, setfilterMonth] = useState('');
    var [loading, setloading] = useState(true);

    var spinnerObj = {
        margin: "100px auto",
        display: "block",
    }

    const params = useParams()
    const id = params.id   
    const name = params.name   

    useEffect(() => {
        getAlldailyentry(id);
    }, []);


    const getAlldailyentry = (id) => {
        let d = new Date()
        let m = d.getMonth()+1
        m<10? m= '0'+ m: m=m.toString()

        setfilterMonth(m)
        const dailyentryref = collection(db, '/dailyentry');
        const que = query(dailyentryref, where('status', "==", true),  where("userId",'==',id), where("month", "==", m) ,orderBy("createdAt", 'desc'));

        onSnapshot(que, (querySnapshot) => {
            setTimeout(() => {
                setloading(false)
            }, 700);

            setdailyentry(querySnapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            })));

            
        });
    };

    useEffect(()=>{
        if(!!dailyentry){
            let b=0
            for(let x of dailyentry){
                b += x?.dayPrice
            }
            setbill(b)
        }
    },[dailyentry])

    const handleMonth = (e) => {
        let month = e.target.value;

        setfilterMonth(month);
        const dailyentryref = collection(db, '/dailyentry');
        const que = query(dailyentryref, where('status', "==", true),  where("userId",'==',id), where("month", "==", month) ,orderBy("createdAt", 'desc'));

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

    const generate = () => {    
        setloading(true);
        try{
            let billRef = collection(db, '/monthlybill')
            addDoc(billRef, {
                userId:id,
                userName:name,
                totalAmount:bill,
                month:filterMonth,
                year:new Date().getFullYear(),
                status:true,
                createdAt:Timestamp.now(),
                isPaid:false
            })
            setloading(false);
            nav("/admin/Managemonthlybills")
            setTimeout(() => {
                toast.success("Monthly Bill Generated")
            }, 500);
        }catch(error){   
            setloading(false);
            toast.error("Something Went Wrong")
            console.log("error in add monthly bill", error)
        }
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
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Generate Monthly Bill</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <Link to='/admin/dashboard'><li className="breadcrumb-item active" aria-current="page">Dashboard</li></Link>/
                            <Link to='/admin/Managemonthlybills'>  <li className="breadcrumb-item active" aria-current="page">Monthly Bill</li></Link>/
                            <Link to='/admin/Managedailyentry'> <li className="breadcrumb-item active text-warning active" aria-current="page">Generate Monthly Bill</li></Link>

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
                            <div className="col-6">
                                <h1>Monthly Bill Detail</h1>
                            </div>
                            <div className="col-3 text-end">
                                <h1>Bill - Rs. {bill}</h1>
                            </div>
                            <div className="col-2 text-end">
                                <div className="form-floating">
                                    <select className="form-select" id="Month" placeholder="month"
                                        required value={filterMonth} onChange={handleMonth} >
                                            <option value="01">January</option>
                                            <option value="02">February</option>
                                            <option value="03">March</option>
                                            <option value="04">April</option>
                                            <option value="05">May</option>
                                            <option value="06">June</option>
                                            <option value="07">July</option>
                                            <option value="08">August</option>
                                            <option value="09">September</option>
                                            <option value="10">October</option>
                                            <option value="11">Novenber</option>
                                            <option value="12">December</option>
                                        </select>
                                    <label for="Month">Month</label>
                                </div>
                            </div>
                            <div className="col-1 text-end">
                                <div className="form-floating">
                                    <button type="button" onClick={(e) => { generate() }} class="btn btn-danger mx-1 w-100">Generate</button>
                                </div>
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
                                    <th scope="col">Status</th>
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