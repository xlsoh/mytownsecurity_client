import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import StarRatings from 'react-star-ratings';

function ReviewRating({ rating, setNewRating }) {
  const changeRating = async (newRating, name) => {
    try {
      await setNewRating(newRating);
      alert('The modification was successful!😄');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const Rating = styled.div`
    margin-left: 10px;
  `;

  return (
    <Rating>
      <StarRatings
        rating={rating}
        starRatedColor='red'
        changeRating={changeRating}
        numberOfStars={5}
        name='rating'
        starDimension='25px'
        starSpacing='5px'
      />
    </Rating>
  );
}

export default ReviewRating;
