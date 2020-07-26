import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    const [name, setName] = useState('');

    return (
        <div>
            <h1>TETRIS.IO</h1>
            <input type="text" name="option" placeholder="name"
                onChange={(e) => setName(e.target.value)}
            />
            <Link onClick={(e) => (!name) ? e.preventDefault() : null} to={`/4385347150/${name}`}>
                <button>Join</button>
            </Link>
        </div>
    )
};

export default Landing;