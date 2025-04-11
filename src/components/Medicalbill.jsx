import React, { useEffect, useState } from 'react';
import "./Medicalbill.css";
import Navbar from './Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

function Medicalbill() {
  const [bill, setBill] = useState([]);

  const billValue = (e) => {
    setBill({
      ...bill,
      [e.target.name]: e.target.value,
    });
  };

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

  const [selectedItems, setSelectedItems] = useState([]);
  const totalSum = selectedItems.reduce((total, item) => {
    const itemTotal = Number(item.price) * Number(item.stock);
    const gstAmount = itemTotal * (Number(item.gst || 0) / 100);
    return total + itemTotal + gstAmount;
  }, 0);

  const handleSelect = async (e) => {
    const selectedItem = avlproduct.find(item => item.productname === e.target.value);
    if (selectedItem) {
      const { value: stock } = await Swal.fire({
        title: `Enter stock for ${selectedItem.productname}`,
        input: 'number',
        inputAttributes: {
          min: 1,
          step: 1
        }, 
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value || value < 1) {
            return 'Please enter a valid quantity!';
          }
        }

        
      });

      if (stock) {
        const { value: gst } = await Swal.fire({
          title: `Enter GST % for ${selectedItem.productname}`,
          input: 'number',
          inputAttributes: {
            min: 0,
            step: 0.01
          },
          showCancelButton: true,
          inputValidator: (value) => {
            if (value === null || value === '' || value < 0) {
              return 'Please enter a valid GST percentage!';
            }
          }
        });

        if (gst !== undefined) {
          setSelectedItems([
            ...selectedItems,
            {
              ...selectedItem,
              stock,
              gst
            }
          ]);
        }
      }
    }
  };


  const handleRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  let order = () => {
    let time = new Date().toLocaleString();
    axios.post("https://medical-backend-phi.vercel.app/orders", { bill, time, selectedItems }).then((res) => {
      if (res.data.status) {
        Swal.fire({
          icon: 'success',
          title: `${res.data.msg}`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: `${res.data.msg}`,
        });
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className='bill'>
        <div className="container">
          <h2>Medical Bill</h2>
          <label htmlFor="patientName">Name:</label>
          <input type="text" id="patientName" name="patientName" required onChange={billValue} />

          <label>GSTIN NO.:</label>
          <input type="text" name="gstno" required onChange={billValue} />

          <label>D.L.N0.:</label>
          <input type="text" name="dln" required onChange={billValue} />

          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" required onChange={billValue}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" rows="3" required onChange={billValue}></textarea>

          <label htmlFor="contact">Contact Number:</label>
          <input type="tel" id="contact" name="contact" required onChange={billValue} />

          <label htmlFor="Products">Products:</label>
          <select id="Products" name="Products" required onChange={handleSelect}>
            <option value="">Select Products</option>
            {avlproduct.map((item) => (
              <option key={item.productname} value={item.productname}>{item.productname}</option>
            ))}
          </select>
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                {item.productname} (stock: {item.stock}, GST: {item.gst}%)
                <i className="fa-solid fa-xmark xmark" onClick={() => handleRemove(item)}></i>
              </li>
            ))}
          </ul>


          <label htmlFor="paymentMethod">Payment Method:</label>
          <select id="paymentMethod" name="paymentMethod" required onChange={billValue}>
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>

          <button onClick={order}>Pay ₹{totalSum}</button>
        </div>
      </div>
    </>
  );
}

export default Medicalbill;
