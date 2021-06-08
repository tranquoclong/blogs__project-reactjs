import { 
  ACT_FETCH_CATEGORIES
} from "./actions";

const initPostState = {
  hashCategoryFromId: {}
}

export default function reducer(state = initPostState, action) {
  switch (action.type) {
    case ACT_FETCH_CATEGORIES:

      let hashCategoryFromId = {};
      for(let index = 0; index < action.payload.categories.length; index++) {
        let category = action.payload.categories[index];
        let categoryId = category.id;

        hashCategoryFromId[categoryId] = category;
      }

      return {
        ...state,
        hashCategoryFromId
      }
    default:
      return state;
  }
}

// var categories = [];

// for(let index = 0; index < categoriesId.length; index++) {
//   let found = null;
//   let cateId = categoriesId[index];

//   for(let cateElIdx = 0; cateElIdx < action.payload.categories.length; cateElIdx++) {
//     let cateElement =  action.payload.categories[cateElIdx];
//     if (cateElement.id === cateId) {
//       found = cateElement;
//       break;
//     }
//   }
// }

// categoriesId.map(cateId => {
//   let findCateFromArray = action.payload.categories.find((cateElement) => {
//     if (cateElement.id === cateId) {
//       return true;
//     }
//     return false;
//   })
  
//   return {
//     id: cateId
//   }
// })