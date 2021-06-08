import { 
  ACT_INIT_COMMENTS_CHILD, 
  ACT_SET_COMMENTS_PARENT, 
  ACT_SET_COMMENTS_CHILD,
  ACT_ADD_NEW_PARENT_COMMENT,
  ACT_ADD_NEW_CHILD_COMMENT,
} from './actions';

import {
  ACT_RESET_DATA_DETAIL
} from '../post/actions';

const initState = {
  commentsParentPaging: {
    list: [],
    currentPage: 0,
    totalPage: 0,
    per_page: 2
  },
  hashCommentsByParentById: {}
}

function getDefaultCmtPaging() {
  return {
    list: [],
    currentPage: 0,
    totalPage: 0,
    per_page: 2
  }
}

export default function commentsReducer(state = initState, action) {
  switch (action.type) {
    case ACT_RESET_DATA_DETAIL:
      return {
        ...state,
        commentsParentPaging: {
          list: [],
          currentPage: 1,
          totalPage: 1,
          per_page: 2
        },
        hashCommentsByParentById: {}
      }
    case ACT_SET_COMMENTS_PARENT:
      return {
        ...state,
        commentsParentPaging: {
          list: action.payload.page === 1 
            ? action.payload.comments 
            : [
              ...state.commentsParentPaging.list,
              ...action.payload.comments
            ],
          currentPage: action.payload.page,
          totalPage: action.payload.totalPages,
          per_page: action.payload.per_page
        }
      }

    case ACT_SET_COMMENTS_CHILD:
      const key = 'parent-' + action.payload.parentId;
      let arr = [];
      const oldCmt = state.hashCommentsByParentById[key];

      if (oldCmt.currentPage === 0 && oldCmt.list.length > 0) {
        arr = oldCmt.list
      }

      return {
        ...state,
        hashCommentsByParentById: {
          ...state.hashCommentsByParentById,
          [key]: {
            ...state.hashCommentsByParentById[key],
            list: action.payload.page === 1 
              ? [
                ...arr,
                ...action.payload.comments
              ]
              : [
                ...state.hashCommentsByParentById[key].list,
                ...action.payload.comments
              ],
            currentPage: action.payload.page,
            totalPage: action.payload.totalPages,
            per_page: action.payload.per_page
          }
        }
      }

    case ACT_INIT_COMMENTS_CHILD:

      const hashCommentsByParentById = state.hashCommentsByParentById;
      action.payload.commentsParent.forEach(cmtParent => {
        const key = 'parent-' + cmtParent.id;

        if (!state.hashCommentsByParentById[key]) {
          const value = getDefaultCmtPaging();
          hashCommentsByParentById[key] = value;
        }

      })

      return {
        ...state,
        hashCommentsByParentById
      };
    
    case ACT_ADD_NEW_PARENT_COMMENT:
      const newComment = action.payload.newComment;

      return {
        ...state,
        commentsParentPaging: {
          ...state.commentsParentPaging,
          list: [
            ...state.commentsParentPaging.list,
            newComment
          ]
        },
        hashCommentsByParentById: {
          ...state.hashCommentsByParentById,
          [`parent-` + newComment.id]: getDefaultCmtPaging()
        }
      }
    case ACT_ADD_NEW_CHILD_COMMENT:
      const newChildCmt = action.payload.newComment;
      const parentCmtId = action.payload.parentId;
      const parentKey = 'parent-' + parentCmtId;

      if (!state.hashCommentsByParentById[parentKey]) {
        return state
      }

      return {
        ...state,
        hashCommentsByParentById: {
          ...state.hashCommentsByParentById,
          [parentKey]: {
            ...state.hashCommentsByParentById[parentKey],
            list: [
              ...state.hashCommentsByParentById[parentKey].list,
              newChildCmt
            ]
          }
        }
      }
      
    default:
      return state;
  }
}