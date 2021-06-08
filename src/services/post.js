import { api } from '.';
import { defaultLocale } from '../i18n';

export const PostService = {
  getListPosts({ 
    page = 1, 
    per_page = 3,
    lang = defaultLocale,
    ...restParams
  } = {}) {
    return api.call().get('/wp/v2/posts', {
      params: {
        page,
        per_page,
        lang,
        ...restParams
      }
    })
  },
  getLatestPosts({ lang }) {
    return PostService.getListPosts({ lang });
  },
  getPopularPosts() {
    return PostService.getListPosts({
      orderby: "post_views"
    });
  },
  getPostBySlug: (slug) => {
    return PostService.getListPosts({
      slug
    })
  },
  getRelatedPostByAuthor: (authorId, exclude = []) => {
    return PostService.getListPosts({
      author: authorId,
      exclude
    })
  }
}