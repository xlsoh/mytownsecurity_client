import { Route, Redirect, withRouter, Link } from 'react-router-dom';

function MainHeader(props) {
  const { isLogin } = props;
  console.log(isLogin);
  return (
    <div>
      {isLogin ? (
        <Link to="/mypage/userId">마이페이지</Link>
      ) : (
        <div>로그인</div>
      )}
    </div>
  );
}
export default withRouter(MainHeader);
