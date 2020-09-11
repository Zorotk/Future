import React, { useEffect, useState } from "react";
import Description from "./description";
const Table = () => {
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [sortfild, setsortfild] = useState();
  const [sortorder, setsortorder] = useState(false);
//   const [page, setpage] = useState([1, 2, 3, 4, 5, 6,7]);
  const [activePage, setactivePage] = useState(1);
  const [description, setdescription] = useState(1);
    const page = new Array(Math.ceil(product.length/5)).fill(0)
    
  useEffect(() => {
    fetch(
      "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setproduct(data);
        setloading(false);
      })
      .catch(() => seterror(true));
  }, []);

  function sortProduct(name) {
    let order = sortorder;
    if (sortfild !== name) {
      order = true;
      setsortorder(true);
    } else {
      order = !order;
      setsortorder(order);
    }
    let sort = [...product].sort((a, b) => {
      if (typeof a[name] === "number") {
        return order ? a[name] - b[name] : b[name] - a[name];
      }
      return order
        ? a[name].localeCompare(b[name])
        : b[name].localeCompare(a[name]);
    });
    setproduct(sort);
    setsortfild(name);
  }
  const renderDiscription = (index) => {
    return (
      <div>
        <div>
          {" "}
          Выбран пользователь <b>{product[index].firstName}</b>
        </div>
        <div>
          Описание:
          <textarea>{product[index].description}</textarea>
        </div>
        <div>
          Адрес проживания: <b>{product[index].address.streetAddress}</b>
        </div>
        <div>
          Город: <b>{product[index].address.city}</b>
        </div>
        <div>
          Провинция/штат: <b>{product[index].address.state}</b>
        </div>
        <div>
          Индекс: <b>{product[index].address.zip}</b>
        </div>
      </div>
    );
  };

  if (error) {
    return <div>error</div>;
  }

  return loading ? (
    <div>loading</div>
  ) : (
    <div>
      <table>
        <thead>
          <tr>
            <td onClick={() => sortProduct("id")}>
              id {sortorder && sortfild === "id" ? "▼" : "▲"}
            </td>
            <td onClick={() => sortProduct("firstName")}>
              firstName {sortorder && sortfild === "firstName" ? "▼" : "▲"}
            </td>
            <td onClick={() => sortProduct("lastName")}>
              lastName {sortorder && sortfild === "lastName" ? "▼" : "▲"}
            </td>
            <td onClick={() => sortProduct("email")}>
              email {sortorder && sortfild === "email" ? "▼" : "▲"}
            </td>
            <td onClick={() => sortProduct("phone")}>
              phone {sortorder && sortfild === "phone" ? "▼" : "▲"}
            </td>
          </tr>
        </thead>
        <tbody>
                      {product.map((el, i) => {
            
            let before = activePage * 5 -5;
            let after = before + 5;

            if (i >= before && i <= after) {
              return (
                <tr key={i}>
                  <td onClick={() => setdescription(i)}>{el.id}</td>
                  <td>{el.firstName}</td>
                  <td>{el.lastName}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td>{i}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <div>
        {page.map((_,page) => (
          <button
            key={page}
            onClick={() => setactivePage(page+1)}
            className="page"
          >
            {page+1}
          </button>
        ))}
                  <Description index={description} product={product}/>
      </div>
    </div>
  );
};

export default Table;
