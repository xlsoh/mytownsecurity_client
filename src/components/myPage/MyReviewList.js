import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import MyReviewListEntry from './MyReviewListEntry';

function MyReviewList({ data, id }) {
  return (
    <>
      {data &&
        data.map((review, index) => (
          <Fragment key={index}>
            <MyReviewListEntry
              id={id}
              reviewId={review.id}
              text={review.text}
              rating={review.rating}
              addressDetail={review.postedAt.detail}
              // createdAt={review.createdAt}
              updatedAt={review.updatedAt}
            />
          </Fragment>
        ))}
    </>
  );
}

export default withRouter(MyReviewList);
