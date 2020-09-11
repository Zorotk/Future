import React, {useEffect, useState} from 'react';

const Table = () => {
    const [product, setproduct] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [sortfild, setsortfild] = useState()
    const [sortorder, setsortorder] = useState(false)

    useEffect(() => {
        fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setproduct(data)
                setloading(false)
            }).catch(() => seterror(true));
    }, [])

    function sortProduct(name) {
        let order=sortorder
        if (sortfild !== name) {
            order = true
            setsortorder(true)
        } else {
            order = !order
            setsortorder(order)
        }
        let sort = [...product].sort((a, b) => {
            if (typeof a[name] === "number") {
                return order ? a[name] - b[name] : b[name] - a[name]
            }
            return order ? a[name].localeCompare(b[name]) : b[name].localeCompare(a[name])
        })
       
        setproduct(sort)
        setsortfild(name)
    }
    if (error) {
        return (<div>error</div>)
    }
    return (
        loading ? <div>loading</div> : <table>
            <thead>
            <tr>
                <td onClick={() => sortProduct('id')}>id {sortorder && sortfild === 'id' ? "▼" : "▲"}</td>
                <td onClick={() => sortProduct('firstName')}>firstName {sortorder && sortfild === 'firstName' ? "▼" : "▲"}</td>
                <td onClick={() => sortProduct('lastName')}>lastName {sortorder && sortfild === 'lastName' ? "▼" : "▲"}</td>
                <td onClick={() => sortProduct('email')}>email {sortorder && sortfild === 'email' ? "▼" : "▲"}</td>
                <td onClick={() => sortProduct('phone')}>phone {sortorder && sortfild === 'phone' ? "▼" : "▲"}</td>
            </tr>
            </thead>
            <tbody >
            {product.map((el, i) => (
                    <tr key={el+i}>
                        <td>{el.id}</td>
                        <td>{el.firstName}</td>
                        <td>{el.lastName}</td>
                        <td>{el.email}</td>
                        <td>{el.phone}</td>
                    </tr>
                )
            )}
            </tbody>
        </table>
    );
};

export default Table;