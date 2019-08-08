export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"

export const openModal = (modalName, modalInfo) => {
    return {
        type: OPEN_MODAL,
        modal: {modalName, modalInfo}
    }
}
export const closeModal = (modalName) => {
    return {
        type: CLOSE_MODAL,
        modalName
    }
}