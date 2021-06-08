import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function usePaging({
  actionAsync,
  funcSelector,
  extraParams = {},
} = {}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const itemsPaging = useSelector(funcSelector);
  const items = itemsPaging.list;
  const { currentPage, totalPage, per_page, totalElement } = itemsPaging;

  const hasMoreItems = currentPage < totalPage;

  async function handleLoadMore() {
    if (hasMoreItems === false || loading === true) {
      return;
    }

    setLoading(true);
    const action = actionAsync({
      per_page,
      page: currentPage + 1,
      ...extraParams,
    });

    await dispatch(action);
    setLoading(false);
  }
  return {
    items,
    loading,
    currentPage,
    totalElement,
    hasMoreItems,
    handleLoadMore,
  };
}

// ArticlesList

// Search
