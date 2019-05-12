import React from 'react';

function List(props) {

  return(
    <ul>
      {props.items.map((item, index) => {
        return <li key={index}>{item} <button onClick={() => props.delete(index)}>Delete</button></li>
      })}
    </ul>
  );
}

export default List;