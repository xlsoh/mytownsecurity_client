import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import StarRatings from 'react-star-ratings';
import swal from '@sweetalert/with-react';

function ReviewRating({ rating, setNewRating }) {
  const changeRating = async (newRating, name) => {
    try {
      await setNewRating(newRating);
      swal({
        button: false,
        icon: 'success',
        title: '별점이 수정되었습니다.',
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StarRatings
        rating={rating}
        starRatedColor='red'
        changeRating={changeRating}
        numberOfStars={5}
        name='rating'
        starDimension='25px'
        starSpacing='5px'
      />
    </>
  );
}

export default ReviewRating;
