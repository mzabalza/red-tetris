import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';


const RoomsCrud = () => {



    const [formData, setFormData] = useState({
        masterUser: null, // TODO: no name here, take it from redux or from token
        roomName: null,
        nbPlayers: 0,
        level: 0
    });

    const { masterUser, roomName, nbPlayers, level } = formData;

    const [rooms, setRooms] = useState([]);
    const [flag, setFlag] = useState(false);

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {

        console.log('Rooms useEffect')

        const fetchRooms = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/room`);
                setRooms(res.data);

            } catch (err) {
                setRooms([]);
            }
        }
        fetchRooms();

        // Get current users profile

    }, [flag])

    const removeRoom = async e => {
        // preventdefault?

        console.log(`Attempting to remove room: ${e.target.name}`);

        const payload = {
            roomName: e.target.name
        }
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/room`, { data: payload });
            console.log(`Response: ${res}`)
            setFlag(!flag)
        } catch (err) {
            console.log(`Error: ${err}`)

        };
    }

    const createRoom = async (e) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = { masterUser, roomName, nbPlayers, level };

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/room`, body, config);
        setFlag(!flag)
    }



    const rows = rooms.map(room => (
        <tr key={room._id}>
            <td>{room.roomName}</td>
            <td>{room.masterUser}</td>
            <td>{room.users.length}/{room.nbPlayers}</td>
            <td>{room.level}</td>
            <td>
                <button name={room.roomName} onClick={e => removeRoom(e)} className="btn-conf btn-conf--red">X</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Roon Name</th>
                        <th>Master User</th>
                        <th>nb of players</th>
                        <th>starting level</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {rows}
                    <tr className="form">
                        <td>
                            <div className="form-group">
                                <input className="input" type="text" name="roomName" placeholder="roomName" autoComplete="off"
                                    onChange={e => onChange(e)}
                                />
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <input className="input" type="text" name="masterUser" placeholder="masterUser" autoComplete="off"
                                    onChange={e => onChange(e)}
                                />
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <input className="input" type="text" name="nbPlayers" placeholder="nbPlayers" autoComplete="off"
                                    onChange={e => onChange(e)}
                                />
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <input className="input" type="text" name="level" placeholder="level" autoComplete="off"
                                    onChange={e => onChange(e)}
                                />
                            </div>
                        </td>

                        <td>
                            <button onClick={e => createRoom(e)} className="btn-conf btn-conf--green-blue">O</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )

};

export default RoomsCrud;