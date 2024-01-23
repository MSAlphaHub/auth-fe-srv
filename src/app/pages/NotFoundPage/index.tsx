import styled from 'styled-components';
import pageNotFound from '../../assets/images/pageNotFound.gif';
// import { Link } from 'react-router-dom';
import { Button } from 'antd';
const NotFoundPage = () => {
  return (
    <Wrapper>
      <img src={pageNotFound} />
      <p>Oops! The page you’re looking for could not be found</p>
      <Button href="/home">Go to home page</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  img {
    width: 500px;
  }
  p {
    font-size: 2rem;
    text-align: center;
    line-height: 1.5;
    color: ${(p) => p.theme.textSecondary};
    margin: 0.625rem 0 1.5rem 0;
  }
`;
export default NotFoundPage;
