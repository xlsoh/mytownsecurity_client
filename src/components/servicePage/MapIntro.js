import React from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';

import PoliceStation from './PoliceStation';

const GET_MYINFO = gql`
  query getMyInfo($userId: ID!) {
    getMyInfo(userId: $userId) {
      review {
        id
        text
        rating
        createdAt
        updatedAt
        postedAt {
          detail
          X
          Y
        }
      }
      favorite {
        id
        aliasInput
        createdAt
        updatedAt
        postedAt {
          detail
          X
          Y
        }
      }
    }
  }
`;

function MapIntro({ isToken, address, userInfo }) {
  if (isToken) {
    const { data, loading, error } = useQuery(GET_MYINFO, {
      variables: {
        userId: userInfo.id,
      },
    });
    //console.log(data.getMyInfo.favorite);
    //console.log(data);
    return (
      <>
        {loading && '로딩중입니다.'}
        {!loading && (
          <>
            <PoliceStation
              address={address}
              favorites={data.getMyInfo.favorite}
              reviews={data.getMyInfo.review}
            />
          </>
        )}
      </>
    );
  } else {
    const data = { getMyInfo: { favorite: [], review: [] } };

    return (
      <>
        <PoliceStation
          address={address}
          favorites={data.getMyInfo.favorite}
          reviews={data.getMyInfo.review}
        />
      </>
    );
  }
}

export default withRouter(MapIntro);
