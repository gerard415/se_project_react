import './ModalWithForm.css'

function ModalWithForm({
  onClose, activeModal
}) {
    return (
      <div className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}>
        <div className="modal__content">
          <p className="modal__title">New garment</p>
          <button
            onClick={onClose}
            type="button"
            className="modal__close"
          ></button>
          <form className="modal__form">
            <label htmlFor="name" className="modal__label">
              Name{" "}
              <input
                type="text"
                className="modal__input"
                id="name"
                placeholder="Name"
              />
            </label>
            <label htmlFor="imageUrl" className="modal__label">
              Image{" "}
              <input
                type="url"
                className="modal__input"
                id="imageUrl"
                placeholder="Image URL"
              />
            </label>
            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">Select the weather type:</legend>
              <label htmlFor="hot" className="modal__label_type_radio">
                <input
                  type="radio"
                  name="weather-type"
                  className="modal__radio-input"
                  id="hot"
                />
                Hot
              </label>
              <label htmlFor="warm" className="modal__label_type_radio">
                <input
                  type="radio"
                  name="weather-type"
                  className="modal__radio-input"
                  id="warm"
                />
                Warm
              </label>
              <label htmlFor="cold" className="modal__label_type_radio">
                <input
                  type="radio"
                  name="weather-type"
                  className="modal__radio-input"
                  id="cold"
                />
                Cold
              </label>
            </fieldset>
            <button type="submit" className="modal__form-button">
              Add garment
            </button>
          </form>
        </div>
      </div>
  )
}

export default ModalWithForm
