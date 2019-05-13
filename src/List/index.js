import React from 'react';

function List(props) {

  return(
    <ul>
      {props.items.map((item, index) => {
        return <li key={index}><input type="checkbox" checked={props.list === 'completed' ? 'false' : 'true'} onClick={() => props.complete(item)} />{item} 
        <button onClick={() => props.delete(props.items,item)}>Delete</button>
        </li>
      })}
    </ul>
  );
}

export default List;