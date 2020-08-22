interface Action {
  type: number;
}
export default (state = { page: 1 }, action: Action) => {
  let page: number = state.page;
  switch (action.type) {
    case -1:
      return Object.assign({}, state, { page: page - 1 });
    case 1:
      return Object.assign({}, state, { page: page + 1 });
    case 2:
      return Object.assign({}, state, { page: 1 });
    case 3:
      return Object.assign({}, state, { page: 2 });
    case 4:
      return Object.assign({}, state, { page: 3 });
    case 5:
      return Object.assign({}, state, { page: 4 });
    case 6:
      return Object.assign({}, state, { page: 5 });
    default:
      return state;
  }
};