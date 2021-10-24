import { memo, useState } from "react";
import { useDispatch  } from "react-redux";

import { setName as setPlayerName } from "../../redux-toolkit/slices";
import { useWebsocketSend } from "../WebsocketController";
import "./styles.css";

const Registration = memo(() => {
  const dispatch = useDispatch();
  const sendWebsocketMessage = useWebsocketSend();
  const [name, setName] = useState("");
  const isNameEmpty = name.length === 0;

  const onRegister = () => {
    dispatch(setPlayerName(name));
    sendWebsocketMessage("REGISTER",  { name });
  }

  return (
    <div className="page">
      <div className="registration">
        <h1>MACHI-CORE</h1>
        <h3>Пожалуйста, представьтесь, чтобы начать</h3>
        {isNameEmpty && "введите"}
        <input
          type="text"
          value={name}
          onChange={(event => setName(event.target.value))}
          placeholder="ваше имя"
        />
        {isNameEmpty && "сюда и нажмите"}
        <button onClick={onRegister}>Зарегистрироваться</button>
      </div>
    </div>
  )
});

export { Registration };