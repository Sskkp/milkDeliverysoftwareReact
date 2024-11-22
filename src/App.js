import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminMaster from './components/admin/layout/AdminMaster';
import Dashboard from './components/admin/pages/Dashboard';
import Master from './components/customer/layout/Master';
import Home from './components/customer/pages/Home';
import Milktype from './components/customer/pages/Milktype';
import Login from './components/auth/Login';
import Error from './Error';
import Managecustomer from './components/admin/pages/Managecustomer';
import 'react-toastify/dist/ReactToastify.css';
import Managemilktype from './components/admin/pages/Managemilktype';
import Addcustomer from './components/admin/pages/Addcustomer';
import Addmilktype from './components/admin/pages/Addmilktype';
import Updatecustomer from './components/admin/pages/Updatecustomer';
import Updatemilktype from './components/admin/pages/Updatemilktype';
import Managedailyentry from './components/admin/pages/Managedailyentry';
import Adddailyentry from './components/admin/pages/Adddailyentry';
import Updatedailyentry from './components/admin/pages/Updatedailyentry';
import Manageenquiry from './components/admin/pages/Manageenquiry';
import Managemonthlybills from './components/admin/pages/Managemonthlybills';
import Viewdailyentry from './components/customer/pages/Viewdailyentry';
import Viewmonthlybill from './components/customer/pages/Viewmonthlybill';
import AddMonthlyBill from './components/admin/pages/AddMonthlyBill';
import AddEnquiry from './components/customer/pages/AddEnquiry';


function App() {   
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/' element={<Master />}>
            <Route path='/Home' element={<Home />} />
            <Route path='/customer/Milktype' element={<Milktype />} />
            <Route path='/customer/Viewdailyentry' element={<Viewdailyentry />} />
            <Route path='/customer/Viewmonthlybill' element={<Viewmonthlybill />} />
            <Route path='/customer/Addenquiry' element={<AddEnquiry />} />


            {/* <Route /> */}
          </Route>

            <Route path='/admin' element={<AdminMaster />}>
            <Route path='/admin/Dashboard' element={<Dashboard />} />
            <Route path='/admin/Managecustomer' element={<Managecustomer />} />
            <Route path='/admin/Managemilktype' element={<Managemilktype />} />
            <Route path='/admin/Addcustomer' element={<Addcustomer />} />
            <Route path='/admin/Addmilktype' element={<Addmilktype />} />
            <Route path='/admin/Updatecustomer/:id' element={<Updatecustomer />} />
            <Route path='/admin/Updatemilktype/:id' element={<Updatemilktype />} />
            <Route path='/admin/Managedailyentry' element={<Managedailyentry />} />
            <Route path='/admin/Adddailyentry/:id' element={<Adddailyentry />} />
            <Route path='/admin/AddmonthlyBill/:id/:name' element={<AddMonthlyBill />} />    
            <Route path='/admin/Updatedailyentry/:id' element={<Updatedailyentry />} />
            <Route path='/admin/Manageenquiry' element={<Manageenquiry />} />
            <Route path='/admin/Managemonthlybills' element={<Managemonthlybills />} />
          </Route>



          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;