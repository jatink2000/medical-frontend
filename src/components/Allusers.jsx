import React, { useState } from 'react'
import Navbar from './Navbar'
import "./Orders.css"




function Allusers() {

    const [searchTerm, setSearchTerm] = useState('');

    const data = [
        { name: 'John Doe', age: 25, city: 'New York' },
        { name: 'Jane Smith', age: 30, city: 'Chicago' },
        { name: 'Michael Johnson', age: 35, city: 'Los Angeles' },
        { name: 'Emily Davis', age: 28, city: 'Houston' },
    ];

    const filteredData = data.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    return (
        <>
            <Navbar />
            <div className='user-table'>
                <input style={{ width: "300px", height: "40px" }}
                    type="text"
                    placeholder="Search for name ....."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.city}</td>
                                    <td><i class="fa-solid fa-print"></i>   <i class="fa-solid fa-trash"></i>   <i class="fas fa-edit"></i></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No results found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>



        </>
    )
}

export default Allusers