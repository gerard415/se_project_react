import './ModalWithForm.css'

function ModalWithForm({
  onClose, isOpen, title, children, buttonText
}) {
    return (
      <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
        <div className="modal__content">
          <p className="modal__title">{title}</p>
          <button
            onClick={onClose}
            type="button"
            className="modal__close"
          ></button>
          <form className="modal__form">
            {children}
            <button type="submit" className="modal__form-button">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
  )
}

export default ModalWithForm
