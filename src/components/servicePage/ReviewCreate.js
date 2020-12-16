import React, { useState } from 'react';
import styled from 'styled-components';
import { useReviewDispatch, useReviewNextId } from './ReviewContext';
import ReviewRating from './ReviewRating';

const InsertFormPositioner = styled.div`
  width: 100%;
  position: relative;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
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

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
`;

function ReviewCreate() {
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useReviewDispatch();
  const nextId = useReviewNextId();

  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      Review: {
        id: nextId.current,
        text: value,
        rating: rating,
      },
    });
    nextId.current += 1;
    setValue('');
  };

  return (
    <>
      <InsertFormPositioner>
        <ReviewRating rating={rating} setRating={setRating} />
        <InsertForm>
          <Input
            autoFocus
            onChange={onChange}
            value={value}
            placeholder='리뷰를 입력하신 후, Enter 를 누르세요'
          />
          <Button onClick={onSubmit}>enter</Button>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
}

export default React.memo(ReviewCreate);
