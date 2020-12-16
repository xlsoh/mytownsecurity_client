import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import MyReviewListEntry from './MyReviewListEntry';

const ReviewWrapper = styled.div`
  width: 100%;
  padding: 20px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  color: #000;
  display: grid;
  border-radius: 10px;
`;

function MyReviewList({ data, id }) {
  return (
    <>
      <ReviewWrapper>
        {data &&
          data.map((review, index) => (
            <Fragment key={index}>
              <br />
              <MyReviewListEntry
                id={id}
                reviewId={review.id}
                text={review.text}
                rating={review.rating}
                addressDetail={review.postedAt.detail}
                createdAt={review.createdAt}
                updatedAt={review.updatedAt}
              />
              <br />
              <hr />
            </Fragment>
          ))}
      </ReviewWrapper>
    </>
  );
}

export default withRouter(MyReviewList);
