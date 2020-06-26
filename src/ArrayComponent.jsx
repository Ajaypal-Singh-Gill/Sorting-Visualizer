import React from 'react';
import './SV.css';
export default function Array(props){
    return <div style={{display: 'inline-block',
    width: '22px',
    height: '20px',
    background: 'white',
    border: '2px solid black',
    color: 'red',
    fontSize: '.6em',
    margin: '0 1px'}}>
            <text>{props.text}</text>
  </div>
  }