import { useParams } from 'react-router-dom';

export const withRouter = (Component) => {
  function Wrapper(props) {
    const params = useParams();
    return <Component {...props} params={params} />;
  }

  return Wrapper;
};
