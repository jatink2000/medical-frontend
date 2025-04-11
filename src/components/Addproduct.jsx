import React, { useState } from 'react'
import "./Addproduct.css"
import Navbar from './Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

function Addproduct() {
    const [formData, setFormData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    let addproduct = () => {
        axios.post("https://medical-backend-phi.vercel.app/addproduct", { formData }).then((res) => {
            if (res.data.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Add Successful!',
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    text: 'Failed To Add Product',
                });
            }
        })
    }
    return (
        <>
            <Navbar />
            <div className="product-form" >
                <h2>Add Product</h2>
                <label>Product Name:</label>
                <input type="text" name="productname" value={formData.productname} onChange={handleChange} required />
                
                <label>Stock:</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />

                <label>MRP:</label>
                <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} required />

                <label>Rate:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />

                <label>Product Batch:</label>
                <input type="text" name="batch" value={formData.batch} onChange={handleChange} required />

                <label>Product HSN:</label>
                <input type="number" name="hsn" value={formData.hsn} onChange={handleChange} required />

                <label>Product EXP:</label>
                <input type="text" name="exp" value={formData.exp} onChange={handleChange} required />

                <button onClick={addproduct}>Addproduct</button>
            </div>
        </>
    )
}

export default Addproduct