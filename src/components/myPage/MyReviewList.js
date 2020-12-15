import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import MyReviewListEntry from './MyFavoriteListEntry';

const ReviewWrapper = styled.div`
  width: 100%;
  padding: 20px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 2;
  border-radius: 10px;
`;

function MyReviewList({ data, id }) {
  return (
    <>
      <ReviewWrapper>
        {data &&
          data.reviews &&
          data.reviews.map((review, index) => (
            <Fragment key={index}>
              <MyReviewListEntry
                id={id}
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
      </ReviewWrapper>
    </>
  );
}

export default withRouter(MyReviewList);
