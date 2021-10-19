import { memo, useMemo } from "react";

import "./styles.css";

const Registration = memo(({ name, onChangeName, onRegistration }) => {

  const isNameEmpty = name.length === 0;

  return (
    <div className="page">
      <div className="registration">
        <h1>MACHI-CORE</h1>
        <h3>Пожалуйста, представьтесь, чтобы начать</h3>
        { isNameEmpty && "введите"} <input type="text" value={name} onChange={onChangeName} placeholder="ваше имя" /> { isNameEmpty && "сюда и нажмите"}  
        <button onClick={onRegistration}>Зарегистрироваться</button>
      </div>
    </div>
  )
});

export { Registration };