import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import MyReviewListEntry from './MyFavoriteListEntry';

// 쿼리 수정 필요
const GET_MYREVIEW = gql`
  query getMyReview($userId: Int!) {
    getMyReview(userId: $userId)
  }
`;

function MyReviewList() {
  const { userId } = useState(0); //수정 필요
  const { data, loading, error } = useQuery(GET_MYREVIEW, {
    variables: {
      userId,
    },
  });
  console.log(data);
  console.log(loading);
  console.log(error);

  useEffect(() => {
    if (!loading & data && data.review) {
      console.log(data.review);
    }
  }, [loading, data]);

  return (
    <>
      {data &&
        data.review &&
        data.review.map((review, index) => (
          <Fragment key={index}>
            <MyReviewListEntry
              reviewId={review.id}
              text={review.text}
              grade={review.grade}
              addressDetail={review.addressDetail}
              createdAt={review.createdAt}
              updatedAt={review.updatedAt}
            />
            <hr />
          </Fragment>
        ))}
    </>
  );
}

export default withRouter(MyReviewList);
