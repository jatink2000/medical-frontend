import React from 'react'
import { useLocation } from 'react-router-dom'
import "../components/Orderdetails.css"
import Navbar from './Navbar'
import { usePDF } from 'react-to-pdf'

function Orderdetails() {
  let loc = useLocation()
  let pdfname = loc.state.patientName
  const { toPDF, targetRef } = usePDF({ filename: `${pdfname}.pdf` });
  let allitem = loc.state.selectedItems

  const grandTotal = allitem.reduce((total, item) => {
    return total + (item.price * item.stock);
  }, 0);

  return (
    <>
      <Navbar />
      <div class="invoice-container" ref={targetRef}>
        <div class="invoice-header">
          <img src="logo.png" alt="Logo" class="logo" />
          <i class="fa-solid fa-download" onClick={() => toPDF()}></i>
        </div>

        <div className='main-invoive'>
          <div class="invoice-meta">
            <h3>ARAIN PHARMA - INVOICE</h3>
            <p>BASPADAMKA, NEAR BUS STAND</p>
            <p><strong>Phone No.:</strong> 9876543213</p>
            <p><strong>GSTIN:</strong> A009979</p>
            <p><strong>D.L NO.</strong> A009979</p>
            <p><strong>phone no.:</strong>764878338</p>
          </div>

          <div class="invoice-meta">
            <h3>To {loc.state.patientName}</h3>
            <p>{loc.state.address}</p>
            <p><strong>Phone No.:</strong> {loc.state.contact}</p>
            <p><strong>GSTIN:</strong> {loc.state.gstno}</p>
            <p><strong>D.L NO.</strong> {loc.state.dln}</p>
            <p><strong>Date:</strong> {loc.state.billtime}</p>
          </div>
        </div>

        <table class="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Stock</th>
              <th>HSN</th>
              <th>Batch</th>
              <th>EXP</th>
              <th>MRP</th>
              <th>Rate</th>
              <th>GST%</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {allitem.map((user) => {
              return (
                <>
                  <tr>
                    <td>{user.productname}</td>
                    <td>{user.stock}</td>
                    <td>{user.hsn}</td>
                    <td>{user.batch}</td>
                    <td>{user.exp}</td>
                    <td>{user.mrp}</td>
                    <td>{user.price}</td>
                    <td>{user.gst}</td>
                    <td>₹{loc.state.totalSum}</td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
        <div class="invoice-total">
          <strong>Grand Total: ₹{eval(grandTotal)}</strong>
        </div>
      </div>
    </>
  )
}

export default Orderdetails