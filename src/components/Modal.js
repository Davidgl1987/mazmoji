export const Modal = ({ show, onClose, header, body, children, footer }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{header}</h4>
        </div>
        <div className="modal-body">
          {body}
          {children}
        </div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  );
};
