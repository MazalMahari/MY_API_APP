/* LobbyPage.jsx */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCodeBlocks } from '../api';
import './LobbyPage.css'; 

const LobbyPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      const data = await getCodeBlocks();
      setCodeBlocks(data);
    };

    fetchCodeBlocks();
  }, []);

  return (
    <div className="container">
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map((block) => (
          <li key={block._id}>
            <Link to={`/codeblock/${block._id}`}>{block.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LobbyPage;
