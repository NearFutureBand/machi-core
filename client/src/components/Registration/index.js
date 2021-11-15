import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";

import { setName as setPlayerName, getIsRegistered, setRequestToReconnect, addReport} from "../../redux-toolkit/slices";
import { useWebsocketSend } from "../WebsocketController";
import "./styles.css";

const Registration = memo(() => {
  const dispatch = useDispatch();
  const sendWebsocketMessage = useWebsocketSend();

  const [name, setName] = useState("");
  const [showReconnectButton, setShowReconnectButton] = useState(false);
  const isRegistered = useSelector(getIsRegistered);
  const timer = useRef(null);

  const isNameEmpty = name.length === 0;

  const startTimer = () => {
    timer.current = setTimeout(() => {
      if (!isRegistered) {
        setShowReconnectButton(true);
        dispatch(addReport(["Ошибка соединения с сервером"]));
      }
    }, 3500);
  }

  const onRegister = () => {
    dispatch(setPlayerName(name));
    sendWebsocketMessage("REGISTER", { playerId: name });
    startTimer();
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    }
  }, []);

  const onReconnect = () => {
    dispatch(setRequestToReconnect(true));
    setShowReconnectButton(false);
  }

  return (
    <div className="page">
      <div className="registration">
        <div>
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
        {showReconnectButton && (
          <div>
            <h4>Похоже, что-то пошло не так. Попробуйте <button onClick={onReconnect}>переподключиться</button></h4>
          </div>
        )}
      </div>
    </div>
  )
});

export { Registration };