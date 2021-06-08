import { ACT_SET_MAIN_MENUS } from "./actions";

const initState = {
  mainMenus: [
    {
      id: 'home',
      url: '/',
      title: 'Trang chủ',
    }
  ]
}

function menusReducer(state = initState, action) {
  switch (action.type) {
    case ACT_SET_MAIN_MENUS:
      return {
        ...state,
        mainMenus: action.payload.menus
      }
    default:
      return state;
  }
  
}

export default  menusReducer;