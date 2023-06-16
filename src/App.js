import Header from './Component/Header';
import Content from './Component/Content';
import Footer from './Component/Footer';
import { useEffect, useState } from 'react';
import AddItems from './Component/AddItems';
import apiRequest from './Component/apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL);
        const listItems = await response.json();
        console.log(listItems)
        setItems(listItems);
      } catch(err) {
        console.log(err.stack);
      }
    }
    (async () => await fetchItem())();
  },[]);
  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }
  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setAndSaveItems(listItems);

    const myItem = listItems.filter(item => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) console.log("check error")
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);

    const deleteOption = {
      method: 'DELETE'
    }
    const delUrl = `${API_URL}/${id}`;
    const result = await apiRequest(delUrl, deleteOption);
  }
  const [editID, setEditID] = useState(0);
  const [editBool, setEditBool] = useState(false);
  const handleEdit = (id) => {
    const listItems = items.filter((item) => {
      if(item.id === id)  {
      return item;
      }
    });
    setNewItem(listItems[0].item);
    setEditID(listItems[0].id);
    setEditBool(true)
  }

  const [newItem, setNewItem] = useState('');

  const addItem = async (item) => {
    if(editBool == false) {
      const it = JSON.parse(localStorage.getItem('shoppinglist'));
      var id = 0; 
      for (let i = 0; i < it.length; i++) {
        if (it[i].id > id) {
          id = it[i].id;
        }
      }
      id = id+1;
      const myNewItem = {
        id, checked: false, item
      }
      const listItems = [...items, myNewItem];
      setAndSaveItems(listItems);
      console.log(JSON.stringify(myNewItem));
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            id,
            checked: false,
            item
          }
        )
      }
      console.log(postOptions)
      const result = await apiRequest(API_URL, postOptions);
      if(result) console.log(result);
    } else {
      console.log("EDIT");
      items.forEach(function(item) {
        if (item.id === editID) {
          item.item = newItem;
        }
      });
      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({item: newItem})
      }
      const reqUrl = `${API_URL}/${editID}`;
      const result = await apiRequest(reqUrl, updateOptions);
      if (result) console.log("update error")
      setAndSaveItems(items);
      setNewItem("");
      setEditID(0);
      setEditBool(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Groceries"/>
      <AddItems 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        handleEdit={handleEdit} />
        <main>
      <Content 
        items={items}
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete} 
        handleEdit={handleEdit} />
        </main>
      <Footer 
        items={items}/>
    </div>
  );
}

export default App;



// import React, { useEffect, useState } from 'react';
// import Header from './Component/Header';
// import Content from './Component/Content';
// import Footer from './Component/Footer';
// import AddItems from './Component/AddItems';
// import apiRequest from './Component/apiRequest';

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/items', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const itemSchema = new mongoose.Schema({
//   id: Number,
//   checked: Boolean,
//   item: String,
// });

// const Item = mongoose.model('items', itemSchema);

// function App() {
//   const API_URL = 'http://localhost:3500/items';
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const listItems = await Item.find();
//         setItems(listItems);
//       } catch (err) {
//         console.log(err.stack);
//       }
//     };
//     (async () => await fetchItem())();
//   }, []);

//   const setAndSaveItems = (newItems) => {
//     setItems(newItems);
//     localStorage.setItem('shoppinglist', JSON.stringify(newItems));
//   };

//   const handleCheck = async (id) => {
//     const listItems = items.map((item) =>
//       item.id === id ? { ...item, checked: !item.checked } : item
//     );
//     setAndSaveItems(listItems);

//     try {
//       const myItem = listItems.find((item) => item.id === id);
//       await Item.updateOne({ id }, { checked: myItem.checked });
//     } catch (err) {
//       console.log('check error:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const listItems = items.filter((item) => item.id !== id);
//     setAndSaveItems(listItems);

//     try {
//       await Item.deleteOne({ id });
//     } catch (err) {
//       console.log('delete error:', err);
//     }
//   };

//   const [editID, setEditID] = useState(0);
//   const [editBool, setEditBool] = useState(false);

//   const handleEdit = (id) => {
//     const listItems = items.filter((item) => {
//       if (item.id === id) {
//         return item;
//       }
//     });
//     setNewItem(listItems[0].item);
//     setEditID(listItems[0].id);
//     setEditBool(true);
//   };

//   const [newItem, setNewItem] = useState('');

//   const addItem = async (item) => {
//     if (!editBool) {
//       try {
//         const it = await Item.find().sort({ id: -1 }).limit(1);
//         const id = it.length > 0 ? it[0].id + 1 : 1;

//         const myNewItem = new Item({ id, checked: false, item });
//         const savedItem = await myNewItem.save();

//         const listItems = [...items, savedItem];
//         setAndSaveItems(listItems);
//       } catch (err) {
//         console.log('add error:', err);
//       }
//     } else {
//       try {
//         await Item.updateOne({ id: editID }, { item: newItem });
//         const updatedItems = items.map((item) =>
//           item.id === editID ? { ...item, item: newItem } : item
//         );
//         setAndSaveItems(updatedItems);
//         setNewItem('');
//         setEditID(0);
//         setEditBool(false);
//       } catch (err) {
//         console.log('update error:', err);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newItem) return;
//     addItem(newItem);
//     setNewItem('');
//   };

//   return (
//     <div className="App">
//       <Header title="Groceries" />
//       <AddItems
//         newItem={newItem}
//         setNewItem={setNewItem}
//         handleSubmit={handleSubmit}
//         handleEdit={handleEdit}
//       />
//       <main>
//         <Content
//           items={items}
//           setItems={setItems}
//           handleCheck={handleCheck}
//           handleDelete={handleDelete}
//           handleEdit={handleEdit}
//         />
//       </main>
//       <Footer items={items} />
//     </div>
//   );
// }

// export default App;
