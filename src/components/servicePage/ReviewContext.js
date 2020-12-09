import React, { useReducer, createContext, useContext, useRef } from 'react';

const ReviewStateContext = createContext(null);
const ReviewDispatchContext = createContext(null);
const ReviewNextIdContext = createContext(null);

const initialReviews = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true,
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true,
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false,
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false,
  },
];

function ReviewReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.Review);
    case 'TOGGLE':
      return state.map((Review) =>
        Review.id === action.id ? { ...Review, done: !Review.done } : Review
      );
    case 'REMOVE':
      return state.filter((Review) => Review.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function ReviewProvider({ children }) {
  const [state, dispatch] = useReducer(ReviewReducer, initialReviews);
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
