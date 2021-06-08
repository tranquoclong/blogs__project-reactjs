import { Skeleton } from 'antd';
import cls from 'classnames';

export default function ArticleItemSkeleton({
  isStyleRow,
  isStyleCard,
  isShowDesc,
  isShowAvatar = true,
}) {

  const classes = cls('article-item', {
    'style-row': isStyleRow,
    'style-card': isStyleCard,
  })

  return (
    <article className={classes}>
      <div className="article-item__thumbnail">
        <Skeleton.Image active/>
      </div>
      <div className="article-item__content">
        <h2 className="article-item__title">
          { !isShowDesc && <Skeleton title paragraph={{ rows: 1, width: '100%' }} active /> }
        </h2>
        {isShowDesc && (
          <Skeleton title paragraph={{ rows: 2 }} active />
        )}
        <div className="article-item__info">
          {
            isShowAvatar &&
            <div className="article-item__author-image">
              <Skeleton avatar active />
            </div>
          }
          <div className="article-item__info-right">
            <div className="article-item__author-name">
              <Skeleton title paragraph={{ rows: 1 }} active />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}