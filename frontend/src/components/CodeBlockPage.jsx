/* CodeBlockPage.jsx */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCodeBlock } from '../api';
import './CodeBlockPage.css';
import socket from '../socket';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const CodeBlockPage = () => {
  const { id } = useParams();
  const [codeBlock, setCodeBlock] = useState(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    const fetchCodeBlock = async () => {
      const data = await getCodeBlock(id);
      setCodeBlock(data);
      setCode(data.code);
    };

    fetchCodeBlock();

    socket.emit('join', id);

    socket.on('initialCode', (data) => {
      setCode(data.code);
      setIsMentor(data.isMentor);
    });

    socket.on('codeUpdate', (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.emit('leave', id);
    };
  }, [id]);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);
    socket.emit('codeChange', { id, code: newCode });
  };

  const checkSolution = () => {
    if (code === codeBlock.solution) {
      setResult('Correct Solution! 😊');
    } else {
      setResult('Incorrect Solution, try again.');
    }
  };

  if (!codeBlock) {
    return <div>Loading...</div>;
  }

  return (
  
    <div className="container">
      <h1>{codeBlock.title}</h1>
      {isMentor ? (
        <pre>
          <code className="javascript">{hljs.highlightAuto(code).value}</code>
        </pre>
      ) : (
        <textarea
          value={code}
          onChange={handleCodeChange}
          style={{ width: '100%', height: '400px' }}
        />
      )}
      {!isMentor && <button onClick={checkSolution}>Check Solution</button>}
      {result && (
        <p className={`result ${result.includes('Correct') ? 'correct' : 'incorrect'}`}>
          {result}
        </p>
      )}
    </div>
  );
};

export default CodeBlockPage;
