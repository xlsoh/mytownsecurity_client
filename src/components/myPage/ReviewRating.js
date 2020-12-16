import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import StarRatings from 'react-star-ratings';

function ReviewRating({ rating }) {
  return (
    <>
      <StarRatings
        rating={rating}
        starRatedColor='red'
        numberOfStars={5}
        name='rating'
        starDimension='25px'
        starSpacing='5px'
      />
    </>
  );
}

export default ReviewRating;
