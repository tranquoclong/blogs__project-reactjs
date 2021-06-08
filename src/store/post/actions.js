import { PostService } from "../../services/post";
import { actFetchCommentsAsync } from '../comments/actions';

export const ACT_FETCH_LATEST_POSTS = 'ACT_FETCH_LATEST_POSTS';
export const ACT_FETCH_POPULAR_POSTS = 'ACT_FETCH_POPULAR_POSTS';
export const ACT_FETCH_POSTS = 'ACT_FETCH_POSTS';
export const ACT_FETCH_POSTS_SEARCH = 'ACT_FETCh_POSTS_SEARCH';
export const ACT_FETCH_POST_DETAIL = 'ACT_FETCH_POST_DETAIL';
export const ACT_FETCH_RELATED_AUTHOR_POST = 'ACT_FETCH_RELATED_AUTHOR_POST';
export const ACT_RESET_DATA_DETAIL = 'ACT_RESET_DATA_DETAIL';
export const ACT_SET_LOADING_STATUS = 'ACT_SET_LOADING_STATUS';

// Action creator
export function actSetLoadingStatus({
  status
}) {
  return {
    type: ACT_SET_LOADING_STATUS,
    payload: {
      status
    }
  }
}
export function actResetDataDetail() {
  return {
    type: ACT_RESET_DATA_DETAIL
  }
}
export function actFetchLatestPosts({ posts = [] } = {}) {
  return {
    type: ACT_FETCH_LATEST_POSTS,
    payload: {
      posts
    }
  }
}
export function actFetchPopularPosts({ posts = [] } = {}) {
  return {
    type: ACT_FETCH_POPULAR_POSTS,
    payload: {
      posts
    }
  }
}
export function actFetchPosts({
  posts = [],
  page = 1,
  per_page = 3,
  totalPages = 1
} = {}) {
  return {
    type: ACT_FETCH_POSTS,
    payload: {
      posts,
      page,
      per_page,
      totalPages
    }
  }
}
export function actFetchPostsSearch({
  posts = [],
  page = 1,
  per_page = 3,
  totalPages = 1,
  totalElement = 0
} = {}) {
  return {
    type: ACT_FETCH_POSTS_SEARCH,
    payload: {
      posts,
      page,
      per_page,
      totalPages,
      totalElement
    }
  }
}
export function actFetchPostDetail({ post }) {
  return {
    type: ACT_FETCH_POST_DETAIL,
    payload: { post }
  }
}
export function actFetchRelatedAuthorPost({ posts }) {
  return {
    type: ACT_FETCH_RELATED_AUTHOR_POST,
    payload: { posts }
  }
}

// Action async
export const actFetchLatestPostsAsync = () => {
  return async (dispatch, getState) => {
    try {
      const rootState = getState();
      const lang = rootState.App.lang;
      dispatch(actSetLoadingStatus({ status: 'loading' }))
      const response = await PostService.getLatestPosts({ lang });
      const posts = response.data;
      
      dispatch(actFetchLatestPosts({
        posts
      }));
      dispatch(actSetLoadingStatus({ status: 'success' }));

    } catch(e) {
      dispatch(actSetLoadingStatus({ status: 'error' }));
    }
  }
}
export const actFetchPopularPostsAsync = () => {
  return async dispatch => {
    try {
      const response = await PostService.getPopularPosts();
      const posts = response.data;
      
      dispatch(actFetchPopularPosts({
        posts
      }))

    } catch(e) {

    }
  }
}
export const actFetchPostsAsync = ({
  page = 1,
  per_page = 2
} = {}) => {
  return async dispatch => {
    try {
      const response = await PostService.getListPosts({
        page,
        per_page
      });
      const headers = response.headers;
      // const totalElement = headers['x-wp-total'];
      const totalPages = Number(headers['x-wp-totalpages']);
      const posts = response.data;

      dispatch(actFetchPosts({
        posts,
        page,
        per_page,
        totalPages
      }))

    } catch(e) {

    }
  }
}

export const actFetchPostsSearchAsync = ({
  page = 1,
  per_page = 2,
  ...extraSearchParams
} = {}) => {
  return async dispatch => {
    try {
      const response = await PostService.getListPosts({
        page,
        per_page,
        ...extraSearchParams
      });
      const headers = response.headers;
      const totalElement = Number(headers['x-wp-total']);
      const totalPages = Number(headers['x-wp-totalpages']);
      const posts = response.data;

      dispatch(actFetchPostsSearch({
        posts,
        page,
        per_page,
        totalPages,
        totalElement
      }))

    } catch(e) {

    }
  }
}


export function actFetchPostDetailAsync({ slug }) {
  return async (dispatch) => {
    try {
      const response = await PostService.getPostBySlug(slug);
      const post = response.data[0];
      
      if (!post) {
        throw new Error('No post');
      }
      const postId = post.id;
      const userId = post.author;

      dispatch(actFetchRelatedAuthorPostAsync({ 
        author: userId,
        exclude: [postId]
      }))
      dispatch(actFetchCommentsAsync({ postId }));


      dispatch(actFetchPostDetail({ post }));

      return {
        ok: true,
        post,
      }

    } catch(e) {
      return {
        ok: false,
        error: e
      }
    }
  }
}

export function actFetchRelatedAuthorPostAsync({ author, exclude }) {
  return async function(dispatch) {
    try {
      const response = await PostService.getRelatedPostByAuthor(author, exclude);
      const posts = response.data;
      dispatch(actFetchRelatedAuthorPost({ posts }))
    } catch(e) { }
  }
}

/*
Trên server tổng 6 phần tử 

Trong lần đầu tiên F5 lại trang -> Mặc định tải trang 1 (Từ trang homepage dispatch action): currentPage = 1

Bắt sự kiện onClick vào button LoadMore 
Mỗi lần click 
  -> kiểm tra xem còn page để tải hay không???
  -> Nếu còn page để tải thêm thì tăng curentPage lên 1 đơn vị -> currentPage = 2
  -> Gọi API (dispatch lại actFetchPosts) lấy data mới về ứng với currentPage = 2

*/