import React from 'react';

function List(props) {

  let items = props.items;

  return(
    <ul>
      {items.map((item, index) => {
        return <li key={index}><input type="checkbox" value="false" />{item} <button onClick={() => props.delete(item)}>Delete</button></li>
      })}
    </ul>
  );
}

export default List;