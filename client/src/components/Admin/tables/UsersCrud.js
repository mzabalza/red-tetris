import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';


const UsersCrud = () => {

    const [userFormData, setUserFormData] = useState({
        name: '',
        password: ''
    });

    const [users, setUsers] = useState([]);
    const [flag, setFlag] = useState(false);


    useEffect(() => {

        console.log('Rooms useEffect')

        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
                setUsers(res.data);

            } catch (err) {
                setUsers([]);
            }
        }
        fetchUsers();

        // Get current users profile

    }, [flag])

    const onUserChange = e => {
        setUserFormData({
            ...userFormData,
            [e.target.name]: e.target.value
        });
    };

    const removeUser = async e => {
        // preventdefault?

        console.log(`Attempting to remove User: ${e.target.name}`);

        const payload = {
            name: e.target.name
        }
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/user`, { data: payload });
            console.log(`Response: ${res}`)
            setFlag(!flag)
        } catch (err) {
            console.log(`Error: ${err}`)

        };
    }

    const addUser = async e => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const body = JSON.stringify({ name: userFormData.name, password: userFormData.password, });
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/user`, body, config);
            console.log(`Response: ${res}`)
            setFlag(!flag)
        } catch (err) {
            console.log(`Error: ${err}`)

        };
    }



    const rows = users.map(user => (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td />
            <td>
                <button name={user.name} onClick={e => removeUser(e)} className="btn-conf btn-conf--red">X</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th />
                        <th />
                    </tr>
                </thead>

                <tbody>
                    {rows}
                    <tr className="form">
                        <td>
                            <div className="form-group">
                                <input className="input" type="text" name="name" placeholder="name" autoComplete="off"
                                    onChange={e => onUserChange(e)}
                                />
                            </div>
                        </td>
                        <td>
                            <input className="input" type="password" name="password" placeholder="password" autoComplete="off"
                                onChange={e => onUserChange(e)}
                            />
                        </td>
                        <td>
                            <button name={userFormData.name} onClick={e => addUser(e)} className="btn-conf btn-conf--green-blue">O</button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </Fragment>
    )

};

export default UsersCrud;