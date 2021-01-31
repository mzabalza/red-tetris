import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Rooms = ({ modalIsOpen }) => {

    const [rooms, setRooms] = useState([]);
    const [flag, setFlag] = useState(false);

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
    }, [modalIsOpen, flag])

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

    // TODO: Add createdAt

    const rows = rooms.map(room => (
        <tr key={room._id}>
            <td>{room.roomName}</td>
            <td>{room.masterUser}</td>
            <td>{room.users.length}/{room.nbPlayers}</td>
            <td>{room.level}</td>
            <td>
                <Link
                    name={room.roomName}
                    onClick={e => setFlag(!flag)}
                    className={(room.users.length != room.nbPlayers) ? "btn-conf btn-conf--green-blue" : "btn-conf btn-conf--green-blue--disabled"}
                    to={ (room.users.length != room.nbPlayers) ? {
                        pathname: "/tetris", state: {
                            formData: {
                                name: null,
                                roomName: room.roomName,
                                nbPlayers: room.nbPlayers,
                                level: room.level
                            }
                        }
                    } : '#'}
                >
                    {(room.users.length != room.nbPlayers) ? 'Join' : 'Full'}
                </Link>
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
                <tbody>{rows}</tbody>
            </table>
        </Fragment>

    )

};

export default Rooms;