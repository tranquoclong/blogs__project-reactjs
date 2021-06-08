import { CommentsService } from "../../services/comments";

export const ACT_SET_COMMENTS_PARENT = 'ACT_SET_COMMENTS_PARENT';
export const ACT_SET_COMMENTS_CHILD = 'ACT_SET_COMMENTS_CHILD';
export const ACT_INIT_COMMENTS_CHILD = 'ACT_INIT_COMMENTS_CHILD';
export const ACT_POST_COMMENT = 'ACT_POST_COMMENT';
export const ACT_ADD_NEW_PARENT_COMMENT = 'ACT_ADD_NEW_PARENT_COMMENT';
export const ACT_ADD_NEW_CHILD_COMMENT = 'ACT_ADD_NEW_CHILD_COMMENT';

export const actPostComment = ({
  userId,
  content,
  postId,
  parentId
}) => {
  return {
    type: ACT_POST_COMMENT,
    payload: {
      userId,
      content,
      postId,
      parentId
    }
  }
}
export const actFetchComments = ({ 
  comments, 
  page, 
  per_page, 
  // total_items,
  totalPages,
  parentId = 0
} = {}) => {


  return {
    type: parentId === 0 ? ACT_SET_COMMENTS_PARENT : ACT_SET_COMMENTS_CHILD,
    payload: { 
      comments, 
      page, 
      per_page, 
      totalPages, 
      // total_items,
      parentId
    }
  }
}
export const actInitCommentsChild = (commentsParent) => {
  return {
    type: ACT_INIT_COMMENTS_CHILD,
    payload: {
      commentsParent
    }
  }
}

export const actAddNewComment = ({
  newComment,
  parentId = 0
}) => {
  const payload = {
    newComment,
    parentId
  };

  if (parentId === 0) {
    return {
      type: ACT_ADD_NEW_PARENT_COMMENT,
      payload
    }
  } else {
    return {
      type: ACT_ADD_NEW_CHILD_COMMENT,
      payload
    }
  }
  
}

export function actFetchCommentsAsync({
  page = 1,
  per_page = 3,
  parentId = 0,
  postId,
}) {
  return async (dispatch) => {
    try {
      const response = await CommentsService.getCommentsByPostId({
        page,
        per_page,
        postId,
        parentId
      })
      const headers = response.headers;
      // const totalElement = headers['x-wp-total'];
      const totalPages = Number(headers['x-wp-totalpages']);
      const comments = response.data;

      dispatch(actFetchComments({
        comments,
        page,
        per_page,
        totalPages,
        parentId,
        // totalElement
      }))
      
      if (parentId === 0) {
        dispatch(actInitCommentsChild(comments))
      }

    } catch(e) {

    }
  }
}

export function actPostCommentAsync({
  content,
  postId,
  parentId = 0
}) {
  return async (dispatch, getState) => {
    if (!postId || !content) {
      return
    }

    try {
      const rootState = getState();
      const userId = rootState.Auth.currentUser.id;
      const response = await CommentsService.postComment({
        userId,
        content,
        postId,
        parentId
      })
      const newComment = response.data; 
      dispatch(actAddNewComment({
        newComment,
        parentId
      }))

      return {
        ok: true,
        newComment
      }
    } catch(e) {
      return {
        ok: false,
        error: e.message
      }
    }
  }
}