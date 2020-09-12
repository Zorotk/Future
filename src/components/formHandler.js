import React, { useState, useEffect } from "react";

const arrNames = [
  "id",
  "firstName",
  "lastName",
  "email",
  "phone",
  "streetAddress",
  "city",
  "state",
  "zip",
  "description"
];
const FormHandler = ({ onAdd }) => {
  const [form, setform] = useState({});
  const [validForm, setvalidForm] = useState(false);
  const handleClick = () => {
      onAdd(form);
      setform({})
  };
  useEffect(() => {
    setvalidForm(
      arrNames.every((name) => form[name]) && Number.isInteger(form.id)
    );
  }, [form]);
  return (
    <div>
      {arrNames.map((name) => (
        <input className='inputForm' key={name}
          value={form[name] || ""}
          placeholder={name}
          onChange={(e) =>
            setform({
              ...form,
              [name]: name === "id" ? Number(e.target.value) : e.target.value,
            })
          }
        />
      ))}
      {validForm && <button onClick={handleClick}>Добавить в таблицу </button>}
    </div>
  );
};

export default FormHandler;
