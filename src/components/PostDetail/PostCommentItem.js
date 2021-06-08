import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePaging } from "../../hooks/usePaging";
import { useIsLogin } from "../../hooks/useIsLogin";
import {
  actFetchCommentsAsync,
  actPostCommentAsync,
} from "../../store/comments/actions";
import Button from "../../common/Button";
import Loading from "../../common/Loading";
import PostCommentForm from "./PostCommentForm";
import { useAvatar } from "../../hooks/useAvatar";

function PostCommentItem({ comment, isParent, ...props }) {
  const dispatch = useDispatch();
  const { currentUser } = useIsLogin();
  const [isShowForm, setIsShowForm] = useState(false);
  const [replyUsername, setReplyUsername] = useState("");
  const [loadingFirstPage, setLoadingFirstPage] = useState(false);
  const post = useSelector((state) => state.Post.postDetail);
  const postId = post.id;
  const parentCmtId = comment.id;

  const userId = comment.author;
  const avatar = comment.author_data.avatar;
  const avatarStr = useAvatar(userId, avatar);

  useEffect(() => {
    if (isShowForm === false) {
      setReplyUsername("");
    }
  }, [isShowForm]);

  const {
    items: commentsChild,
    loading,
    // totalElement,
    currentPage,
    handleLoadMore,
    hasMoreItems,
  } = usePaging({
    funcSelector: (state) => {
      const key = "parent-" + parentCmtId;
      if (state.Comments.hashCommentsByParentById[key] === undefined) {
        return {
          list: [],
          currentPage: 0,
          totalPage: 0,
          per_page: 2,
        };
      }
      return state.Comments.hashCommentsByParentById["parent-" + parentCmtId];
    },
    actionAsync: actFetchCommentsAsync,
    extraParams: {
      parentId: parentCmtId,
      postId: post.id,
    },
  });

  function handleFetchInitCommentsChild(evt) {
    evt.preventDefault();

    if (loadingFirstPage) {
      return;
    }

    setLoadingFirstPage(true);
    dispatch(
      actFetchCommentsAsync({
        postId,
        parentId: parentCmtId,
      })
    ).then(() => {
      setLoadingFirstPage(false);
    });
  }

  function toggleShowForm() {
    setIsShowForm(!isShowForm);
  }

  function onClickReplyChild(evt) {
    evt.preventDefault();

    if (isParent === false) {
      props.onChangeReplyUsername(comment.author_name);
    }
  }

  function onSubmitReply(text, cb) {
    dispatch(
      actPostCommentAsync({
        content: text,
        postId,
        parentId: parentCmtId,
      })
    ).then(cb);
  }

  if (!comment) {
    return null;
  }
  // console.log('totalElement', totalElement);
  return (
    <li className="comment">
      <div className="activity_rounded">
        <a href="/">
          <img src={avatarStr} alt="" />
        </a>
      </div>
      <div className="comment-body">
        <h4 className="text-left">
          <a href="/" className="comments__section--user">
            {comment.author_name}
          </a>
          <small className="date-posted pull-right">{comment.date}</small>
        </h4>
        <p
          className="comments__section--text"
          dangerouslySetInnerHTML={{
            __html: comment.content.rendered,
          }}
        ></p>
        {isParent && (
          <a className="pull-left btn-blog" href="/" onClick={toggleShowForm}>
            Trả lời
          </a>
        )}
        {!isParent && (
          <a
            className="pull-left btn-blog"
            href="/"
            onClick={onClickReplyChild}
          >
            Trả lời
          </a>
        )}
        <div className="clearfix" />
      </div>
      {isParent && currentPage === 0 && comment.comment_reply_count !== 0 && (
        <div className="comments__hidden">
          <a href="/" onClick={handleFetchInitCommentsChild}>
            {loadingFirstPage ? (
              <Loading />
            ) : (
              <i className="icons ion-ios-undo"></i>
            )}
            Xem thêm {comment.comment_reply_count} câu trả lời
          </a>
        </div>
      )}
      {isParent && commentsChild.length !== 0 && (
        <ul className="comments">
          {commentsChild.map((cmtChild) => {
            return (
              <PostCommentItem
                comment={cmtChild}
                key={cmtChild.id}
                isParent={false}
                onChangeReplyUsername={(valueText) => {
                  if (isParent) {
                    setIsShowForm(true);
                    setReplyUsername(valueText);
                  }
                }}
              />
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
        </ul>
      )}

      {isShowForm && isParent && (
        <PostCommentForm
          currentUser={currentUser}
          value={replyUsername ? `@${replyUsername}: ` : ""}
          onSubmit={onSubmitReply}
        />
      )}
    </li>
  );
}

export default PostCommentItem;
