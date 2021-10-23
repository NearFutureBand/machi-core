import { memo } from "react";
import "./styles.scss";

const Modal = memo(({ children, onClose, hideCloseButtons, layer = 1, size }) => {

  const sizes = { width: size === "huge" ? "60%" : "auto", height: size === "huge" ? "90%" : "auto" };
  console.log(sizes);

  return (
    <div className="modal-background" style={{ zIndex: layer * 2 }}>
      <div className="modal" style={{ zIndex: layer * 2 + 1, ...sizes }}>
        {!hideCloseButtons && <button className="button-close" onClick={onClose}>X</button>}
        <div className="content">
          {children}
        </div>
        {!hideCloseButtons && <button onClick={onClose}>Закрыть</button>}
      </div>
    </div>
  )
});

export { Modal };