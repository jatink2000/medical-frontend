import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import "./Orders.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';

function Orders() {

  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setdata] = useState([]);

  useEffect(() => {
    orders()
  }, [])

  let orders = () => {
    axios.get("https://medical-backend-phi.vercel.app/allorders").then((res) => {
      if (res.data.status) {
        setdata(res.data.orderdata)
      }
    })
  }

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  // reverse ----------------------
  let finallist = filteredData.reverse()


  // removeorder -------------------------
  let removeorder = (item) => {
    axios.post("https://medical-backend-phi.vercel.app/removeorder", { item }).then((res) => {
      if (res.data.status) {
        Swal.fire({
          icon: 'success',
          title: `${res.data.msg}`,
        })

        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
      else {
        Swal.fire({
          icon: 'error',
          title: `${res.data.msg}`,
        });
      }
    })
  }

  // editdata ------------------
  let go = useNavigate()
  let editdata = (item) => {
    go("/editdata", { state: item })
  }



  // orderdetails ------------------
  let goorder = useNavigate()
  let orderdetails = (item) => {
    goorder("/orderdetails", { state: item })
  }


  return (
    <>
      <Navbar />
      <div className='user-table'>
        <div className='orders'>
          <div className='filename'><h2>All Orders</h2></div>
          <input style={{ width: "300px", height: "40px" }}
            type="text"
            placeholder="Search for name ....."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              finallist.map((item, index) => (
                <tr key={index} >
                  <td>{item.patientName}</td>
                  <td>{item.contact}</td>
                  <td>{item.address}</td>
                  <td>success</td>
                  <td><i class="fas fa-edit" onClick={() => editdata(item)}></i> <i class="fa-solid fa-print" onClick={() => orderdetails(item)}></i>   <i class="fa-solid fa-trash" onClick={() => removeorder(item)}></i></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default Orders