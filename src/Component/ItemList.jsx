import React from 'react';
import LineItems from './LineItems';

const ItemList = ({items, handleCheck, handleDelete, handleEdit}) => {
  return (
    <ul>
    {items.map((item) => (
        <LineItems 
        key={item.id}
        item={item}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        handleEdit={handleEdit} />
    ))}
    </ul>
  );
}

export default ItemList;
