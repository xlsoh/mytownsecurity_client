import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import MyReviewListEntry from './MyReviewListEntry';

const ReviewWrapper = styled.div`
  width: 750px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #e1f5f1;
  margin-right: 170px;
  margin-bottom: 50px;
  padding: 0px; 30px;
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
                // createdAt={review.createdAt}
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
