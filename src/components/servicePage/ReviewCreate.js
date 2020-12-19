import React, { useState } from 'react';
import styled from 'styled-components';
import { useReviewDispatch, useReviewNextId } from './ReviewContext';
import ReviewRating from './ReviewRating';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import swal from '@sweetalert/with-react';
import { useStylesBtn } from '../../styles/globalBtnCss';
import {
  useReviewInputStyles,
  ReviewTextField,
  reviewTheme,
} from './ReviewCss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useTheme, ThemeProvider } from '@material-ui/core/styles';

const InsertFormPositioner = styled.div`
  width: 100%;
  position: relative;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 32px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

// const Button = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: 15px;
//   margin-bottom: 15px;
//   cursor: pointer;
//   position: relative;
//   left: 200px;
// `;

const StarAndButton = styled.div`
  display: block;
  flex-direction: row;
  justify-content: start;
`;

const ADD_REVIEW = gql`
  mutation addReview(
    $userId: ID!
    $addressId: ID!
    $text: String!
    $rating: Int!
  ) {
    addReview(
      userId: $userId
      addressId: $addressId
      text: $text
      rating: $rating
    ) {
      id
    }
  }
`;

function ReviewCreate({ userInfo, addressId }) {
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useReviewDispatch();
  const nextId = useReviewNextId();
  const { palette } = useTheme();
  const classes = useReviewInputStyles({
    primary: palette.dark,
  });
  const writeStyle = useStylesBtn();
  const [addReview] = useMutation(ADD_REVIEW, {
    variables: {
      userId: userInfo.id,
      addressId: addressId,
      rating: rating,
      text: value,
    },
  });

  const onChange = (e) => setValue(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      data: {
        addReview: { id },
      },
    } = await addReview();

    if (value == '') {
      swal('내용을 입력해 주세요.', {
        button: false,
        timer: 1000,
        icon: 'info',
      });
    } else {
      dispatch({
        type: 'CREATE',
        Review: {
          id: id,
          text: value,
          rating: rating,
          postedBy: { id: userInfo.id },
        },
      });
      nextId.current += 1;
      setValue('');
    }
  };

  return (
    <>
      {userInfo.id && (
        <InsertFormPositioner>
          <InsertForm>
            <StarAndButton>
              <ReviewRating rating={rating} setRating={setRating} />
              <Button className={writeStyle.WriteBtn} onClick={onSubmit}>
                작성
              </Button>
            </StarAndButton>
            <ReviewTextField>
              <ThemeProvider theme={reviewTheme}>
                <TextField
                  id='outlined-multiline-static'
                  label='리뷰와 별점을 입력하세요'
                  multiline
                  rows={2}
                  value={value}
                  variant='outlined'
                  onChange={onChange}
                  className={classes.root}
                  fullWidth={true}
                />
              </ThemeProvider>
            </ReviewTextField>
          </InsertForm>
        </InsertFormPositioner>
      )}
      {!userInfo.id && (
        <InsertFormPositioner>
          <InsertForm>
            <StarAndButton>
              <ReviewRating rating={rating} setRating={setRating} />
              <Button
                className={writeStyle.WriteBtn}
                onClick={() => {
                  swal('로그인 후 이용해 주세요.', {
                    button: false,
                    timer: 1000,
                  });
                }}
              >
                작성
              </Button>
            </StarAndButton>
            <ThemeProvider theme={reviewTheme}>
              <TextField
                id='outlined-multiline-static'
                label='리뷰와 별점을 입력하세요'
                multiline
                rows={2}
                value={value}
                variant='outlined'
                onChange={onChange}
                className={classes.root}
                fullWidth='true'
              />
            </ThemeProvider>
          </InsertForm>
        </InsertFormPositioner>
      )}
    </>
  );
}

export default React.memo(ReviewCreate);
