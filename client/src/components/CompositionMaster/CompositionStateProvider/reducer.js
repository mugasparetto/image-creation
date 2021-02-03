export default function (state, { type, payload }) {
  switch (type) {
    case 'SET_HORIZONTAL_VALUE':
      return {
        ...state,
        horizontalValue: payload,
      };

    case 'SET_VERTICAL_VALUE':
      return {
        ...state,
        verticalValue: payload,
      };

    case 'SET_SPACING':
      return {
        ...state,
        spacing: payload,
      };

    case 'SET_DISPLACEMENT':
      return {
        ...state,
        displacement: payload,
      };

    case 'SET_SIZE':
      return {
        ...state,
        size: payload,
      };

    case 'SET_COMPOSITION_TYPE':
      return {
        ...state,
        compositionType: payload,
      };

    default:
      return state;
  }
}
