import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// 수정필요
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return;
}

export default withRouter(ScrollToTop);
