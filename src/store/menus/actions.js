import { MenusService } from "../../services/menus"

export const ACT_SET_MAIN_MENUS = 'ACT_SET_MAIN_MENUS';

export const actSetMainMenus = ({ menus }) => {
  return {
    type: ACT_SET_MAIN_MENUS,
    payload: { menus }
  }
}

function handleMapMenuItem(menuItem) {
  const data = {
    id: menuItem.ID,
    title: menuItem.title,
    url: menuItem.url,
    // child_items: menuItem.child_items
  }

  if (menuItem.child_items) {
    const menusItems = menuItem.child_items.map((menuItemItem) => {
      return handleMapMenuItem(menuItemItem)
    })

    data.child_items = menusItems;
  }

  return data;
}

export const actFetchMainMenusAsync = () => {
  return async (dispatch, getState) => {
    try {
      const lang = getState().App.lang;
      const response = await MenusService.getMenusBySlug(`main-menu-` + lang);
      const menusItems = response.data.items.map(menuItem => {
        return handleMapMenuItem(menuItem);
      })
      
      dispatch(actSetMainMenus({
        menus: menusItems
      }))

    } catch(e) { }
  }
}


// const menusItems = response.data.items.map(menuItem => {
//   const data = {
//     id: menuItem.ID,
//     title: menuItem.title,
//     url: menuItem.url,
//     // child_items: menuItem.child_items
//   }

//   if (menuItem.child_items) {
//     const menusItemsItems = menuItem.child_items.map(menuItemItem => {
//       const dataItem = {
//         id: menuItemItem.ID,
//         title: menuItemItem.title,
//         url: menuItemItem.url,
//         // child_items: menuItemItem.child_items
//       }

//       if (menuItemItem.child_items) {
//         const menusItemsItemsItems = menuItemItem.child_items.map(menuItemItemItem => {
//           const dataItemItem = {
//             id: menuItemItemItem.ID,
//             title: menuItemItemItem.title,
//             url: menuItemItemItem.url,
//             // child_items: menuItemItemItem.child_items
//           }

//           if (menuItemItemItem.child_items) {
//             const menusItemsItemsItemsItems = menuItemItemItem.child_items.map(menuItemItemItemItem => {
//               const dataItemItemItem = {
//                 id: menuItemItemItemItem.ID,
//                 title: menuItemItemItemItem.title,
//                 url: menuItemItemItemItem.url,
//                 child_items: menuItemItemItemItem.child_items
//               }

//               return dataItemItemItem;
//             })

//             dataItemItem.child_items = menusItemsItemsItemsItems
//           }

//           return dataItemItem;
//         })

//         dataItem.child_items = menusItemsItemsItems;
//       }

//       return dataItem
//     })

//     data.child_items = menusItemsItems
//   }


//   return data;
// })