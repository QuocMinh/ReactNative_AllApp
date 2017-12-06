const QRCodeReducer = (state = {result: 'unknown'}, action) => {
  switch (action.type) {
    case 'READ_CODE':
      return {
        ...state,
        result: action.result
      }
    default:
      return state
  }
}

export default QRCodeReducer;