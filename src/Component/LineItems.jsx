import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai'

const LineItems = ({item, handleCheck, handleDelete, handleEdit}) => {
  return (
    <li className="item" key={item.id}>
            <input
                type="checkbox"
                onChange={() => handleCheck(item.id)}
                checked={item.checked}
            />
            <label
                style={(item.checked) ? { textDecoration: 'line-through' } : null}
                onDoubleClick={() => handleCheck(item.id)}
            >{item.item}</label>
            <FaTrashAlt
                onClick={() => handleDelete(item.id)}
                role="button"
                tabIndex="0"
                aria-label={`Delete ${item.item}`}
            />
            <AiFillEdit
                onClick={() => handleEdit(item.id)}
                role="button"
                tabIndex="0"
                aria-label={`Editing ${item.item}`}
            />
    </li>
  );
}

export default LineItems;
