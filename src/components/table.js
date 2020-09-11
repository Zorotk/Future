import React, { useEffect, useState } from "react";
import Description from "./description";
const Table = () => {
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [sortfild, setsortfild] = useState();
  const [sortorder, setsortorder] = useState(false);
  const [activePage, setactivePage] = useState(1);
  const [description, setdescription] = useState();

  const [input, setinput] = useState("");
  const [searchText, setsearchText] = useState("");
  const data = product.filter((item, index) =>
    Object.values(item).some((value) =>
      typeof value !== "string"
        ? value == searchText
        : value.includes(searchText)
    )
  );
  const page = new Array(Math.ceil(data.length / 50)).fill(0);
  useEffect(() => {
    fetch(
        "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
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
  const findProduct = (e) => {
    e.preventDefault();
    setsearchText(input);
    setactivePage(1);
  };

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

  if (error) {
    return <div>error</div>;
  }

  return loading ? (
    <div>loading</div>
  ) : (
    <div>
      <form>
        <input
          value={input}
          onChange={(e) => {
            setinput(e.target.value);
          }}
        />
        <button onClick={findProduct}>Найти</button>
      </form>
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
          {data.map((el, i) => {
            let before = activePage * 50 - 50;
            let after = before + 50;

            if (i >= before && i <= after) {
              return (
                <tr key={i}>
                  <td onClick={() => setdescription(i)}>{el.id}</td>
                  <td>{el.firstName}</td>
                  <td>{el.lastName}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <div>
        {page.map((_, page) => (
          <button
            key={page}
            onClick={() => setactivePage(page + 1)}
                className={`page ${activePage===page+1 ?'active':''} `}
          >
            {page + 1}
          </button>
        ))}
                  {description&&<Description  {...product[description]} />}
      </div>
    </div>
  );
};

export default Table;
