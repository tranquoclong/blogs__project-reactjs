import "./comments.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostCommentItem from "./PostCommentItem";
import Button from "../../common/Button";
import {
  actFetchCommentsAsync,
  actPostCommentAsync,
} from "../../store/comments/actions";
import { usePaging } from "../../hooks/usePaging";
import { useIsLogin } from "../../hooks/useIsLogin";
import PostCommentForm from "./PostCommentForm";

export default function PostComments() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.Post.postDetail);
  const { isLogin, currentUser } = useIsLogin();

  const {
    items: comments,
    loading,
    // totalElement,
    handleLoadMore,
    hasMoreItems,
  } = usePaging({
    funcSelector: (state) => state.Comments.commentsParentPaging,
    actionAsync: actFetchCommentsAsync,
    extraParams: {
      parentId: 0,
      postId: post.id,
    },
  });

  function onSubmitComment(text, cb) {
    dispatch(
      actPostCommentAsync({
        content: text,
        postId: post.id,
        parentId: 0,
      })
    ).then(cb);
  }

  if (!post) {
    return <div></div>;
  }

  return (
    <div id="comments">
      <div className="comments-wrap">
        <h3 className="single-post_heading blog_heading_border">
          Comments ({post.comment_count})
        </h3>
        <ol className="comments-lists">
          {comments &&
            comments.map((item) => {
              return (
                <PostCommentItem comment={item} key={item.id} isParent={true} />
              );
            })}
          {hasMoreItems && (
            <div className="text-center">
              <Button
                type="primary"
                isLoading={loading}
                onClick={handleLoadMore}
              >
                Tải thêm
              </Button>
            </div>
          )}
        </ol>
        <div className="leave_comment">
          <h3 className="blog_heading_border"> Leave a Comment </h3>
          {isLogin ? (
            <PostCommentForm
              currentUser={currentUser}
              onSubmit={onSubmitComment}
            />
          ) : (
            <p>
              Vui lòng <Link to="/login">đăng nhập</Link> để để lại bình luận
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
