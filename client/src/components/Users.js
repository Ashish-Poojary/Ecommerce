import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    const filteredUsers = users.filter(user => 
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h1>User Information</h1>

            <input 
                type="text" 
                className="form-control mb-3"
                placeholder="Search by Email..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="table table-bordered table-striped text-center">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id || index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.contact}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
