import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'

function Editdata() {
  let loc = useLocation()

  console.log(loc)
  let [data, setdata] = useState(loc.state || {})

  let billValue = (e) => {
    setdata(
      { ...data, [e.target.name]: e.target.value }
    )
  }

  //    updatedata----------
  let updatedata = () => {
    axios.post("https://medical-backend-phi.vercel.app/updatedata", { data })
  }




  let [avlproduct, setavlproduct] = useState([]);

  useEffect(() => {
    allproduct();
  }, []);

  let allproduct = () => {
    axios.get("https://medical-backend-phi.vercel.app/allproduct").then((res) => {
      if (res.data.status) {
        setavlproduct(res.data.productdata);
      }
    });
  };


  // const handleSelect = async (e) => {
  //   const selectedItem = avlproduct.find(item => item.productname === e.target.value);
  //   if (selectedItem) {
  //     const { value: quantity } = await Swal.fire({
  //       title: `Enter quantity for ${selectedItem.productname}`,
  //       input: 'number',
  //       inputAttributes: {
  //         min: 1,
  //         step: 1
  //       },
  //       showCancelButton: true,
  //       inputValidator: (value) => {
  //         if (!value || value < 1) {
  //           return 'Please enter a quantity!';
  //         }
  //       }
  //     });

  //     if (quantity) {
  //       setSelectedItems([...selectedItems, { ...selectedItem, quantity }]);
  //     }
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className='bill'>
        <div className="container">
          <h2>Medical Bill</h2>
          <label htmlFor="patientName">Patient Name:</label>
          <input type="text" id="patientName" name="patientName" value={data.patientName} required onChange={billValue} />

          <label>GSTIN NO.:</label>
          <input type="text" name="gstno" value={data.gstno} required onChange={billValue} />

          <label>D.L.N0.:</label>
          <input type="text" name="dln" value={data.dln} required onChange={billValue} />

          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" required value={data.gender} onChange={billValue}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" rows="3" value={data.address} required onChange={billValue}></textarea>

          <label htmlFor="contact">Contact Number:</label>
          <input type="tel" id="contact" name="contact" value={data.contact} required onChange={billValue} />


          <label htmlFor="Products">Products:</label>
          {/* <select id="Products" name="Products" required onChange={handleSelect}> */}
          <option value="">Select Products</option>
          {avlproduct.map((item) => (
            <option key={item.productname} value={item.productname}>{item.productname}</option>
          ))}
          {/* </select> */}
          <button onClick={updatedata}>Update</button>
        </div>
      </div>
    </>
  )
}

export default Editdata