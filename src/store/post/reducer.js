import { 
  ACT_FETCH_POSTS,
  ACT_FETCH_LATEST_POSTS,
  ACT_FETCH_POPULAR_POSTS,
  ACT_FETCH_POSTS_SEARCH,
  ACT_FETCH_POST_DETAIL,
  ACT_FETCH_RELATED_AUTHOR_POST,
  ACT_RESET_DATA_DETAIL,
  ACT_SET_LOADING_STATUS
} from "./actions";

const initPostState = {
  articlesLatest: [],
  articlesPopular: [],
  // articlesList: [],
  articlesPaging: {
    list: [],
    currentPage: 1,
    totalPage: 1,
    per_page: 2
  },
  articlesSearchPaging: {
    list: [],
    currentPage: 1,
    totalPage: 1,
    per_page: 2
  },
  postDetail: null,
  relatedAuthorPosts: [],
  loadingLatestStatus: 'loading', // 'loading' , 'error', 'success'
}

export default function reducer(state = initPostState, action) {
  switch (action.type) {
    case ACT_SET_LOADING_STATUS:
      return {
        ...state,
        loadingLatestStatus: action.payload.status
      }
    case ACT_RESET_DATA_DETAIL:
      return {
        ...state,
        postDetail: null
      }
    case ACT_FETCH_POSTS:
      return {
        ...state,
        articlesPaging: {
          list: action.payload.page === 1 
            ? action.payload.posts 
            : [
              ...state.articlesPaging.list,
              ...action.payload.posts
            ],
          currentPage: action.payload.page,
          totalPage: action.payload.totalPages,
          per_page: action.payload.per_page
        }
      }
    case ACT_FETCH_POSTS_SEARCH:
      // let listSearch = null;

      // if (action.payload.page === 1) {
      //   listSearch = action.payload.posts;
      // } else {
      //   listSearch = [
      //     ...state.articlesSearchPaging.list,
      //     ...action.payload.posts
      //   ]
      // }

      return {
        ...state,
        articlesSearchPaging: {
          list: action.payload.page === 1 
            ? action.payload.posts 
            : [
              ...state.articlesSearchPaging.list,
              ...action.payload.posts
            ],
          totalElement: action.payload.totalElement,
          currentPage: action.payload.page,
          totalPage: action.payload.totalPages,
          per_page: action.payload.per_page
        }
      }
    case ACT_FETCH_LATEST_POSTS:
      return {
        ...state,
        articlesLatest: action.payload.posts
      }
    case ACT_FETCH_POPULAR_POSTS:
      return {
        ...state,
        articlesPopular: action.payload.posts
      }
    case ACT_FETCH_POST_DETAIL:
      return {
        ...state,
        postDetail: action.payload.post
      }
    case ACT_FETCH_RELATED_AUTHOR_POST:
      return {
        ...state,
        relatedAuthorPosts: action.payload.post
      }
    default:
      return state;
  }
  
}