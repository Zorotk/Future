import React from 'react';

const Description = ({  description, firstName,address }) => {
   
        return (
            <div>
                <div>
                    Выбран пользователь <b>{firstName}</b>
                </div>
                <div>
                    Описание:
          <textarea>{description}</textarea>
                </div>
                <div>
                    Адрес проживания: <b>{address.streetAddress}</b>
                </div>
                <div>
                    Город: <b>{address.city}</b>
                </div>
                <div>
                    Провинция/штат: <b>{address.state}</b>
                </div>
                <div>
                    Индекс: <b>{address.zip}</b>
                </div>
            </div>
        );
    
};

export default Description;