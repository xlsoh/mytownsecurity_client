import React, { useReducer, createContext, useContext, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';

const ReviewStateContext = createContext(null);
const ReviewDispatchContext = createContext(null);
const ReviewNextIdContext = createContext(null);

function ReviewReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.Review);
    case 'REMOVE':
      return state.filter((Review) => Review.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function ReviewProvider({ addressData, children }) {
  console.log(addressData);

  const [state, dispatch] = useReducer(ReviewReducer, addressData); // 서버에서 받는 데이터 값 확인 후 수정 필요!!
  const nextId = useRef(5);

  return (
    <ReviewStateContext.Provider value={state}>
      <ReviewDispatchContext.Provider value={dispatch}>
        <ReviewNextIdContext.Provider value={nextId}>
          {children}
        </ReviewNextIdContext.Provider>
      </ReviewDispatchContext.Provider>
    </ReviewStateContext.Provider>
  );
}

export function useReviewState() {
  const context = useContext(ReviewStateContext);
  if (!context) {
    throw new Error('Cannot find ReviewProvider');
  }
  return context;
}

export function useReviewDispatch() {
  const context = useContext(ReviewDispatchContext);
  if (!context) {
    throw new Error('Cannot find ReviewProvider');
  }
  return context;
}

export function useReviewNextId() {
  const context = useContext(ReviewNextIdContext);
  if (!context) {
    throw new Error('Cannot find ReviewProvider');
  }
  return context;
}
