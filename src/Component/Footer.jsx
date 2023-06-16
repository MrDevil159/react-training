const Footer = ({items}) => {

    return (
        <footer>
            <p> {items.length} List { items.length < 2 ? "item" : "items"}</p>
        </footer>
    )
}

export default Footer