import React from 'react';

const Description = ({ index, product }) => {
   
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

export default Description;