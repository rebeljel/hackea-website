import '../../layout/login/css/style.css';
import React, { Component } from "react";

import Button from 'react-bootstrap/Button';

const UserTableBody = props => {
    const {userData, userDelete, userEdit} = props

    const rows = userData.map((row, index) => {
        return (
            <tr key = {index}>
                <td>{row.id}</td>
                <td>{row.userID}</td>
                <td>{row.userName}</td>
                <td>{row.email}</td>
                <td>*****</td>
                <td>
                    <Button 
                    className="btn btn-dark btn-lg text-dark btn-lg btn-reg rounded-pill"
                    style={{marginLeft: 'auto'}}
                    onClick={() => {
                        userEdit(row)
                    }}>Edit</Button>
                </td>
                <td>
                    <Button 
                    className="btn btn-dark btn-lg text-dark btn-lg btn-reg rounded-pill"
                    style={{marginLeft: 'auto'}}
                    onClick={() => {
                        userDelete(row.userID)
                    }}>Delete</Button>
                </td>
                
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

export default UserTableBody