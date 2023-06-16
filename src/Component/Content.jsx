import ItemList from './ItemList';
const Content = ({items, handleCheck, handleDelete, handleEdit}) => {


    return (
        <>
            {items.length ? (
                <ItemList items={items}
                handleCheck={handleCheck}
                handleDelete={handleDelete} 
                handleEdit={handleEdit} />
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
        </>
    )
}

export default Content