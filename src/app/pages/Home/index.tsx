import { useGoogleLogin } from 'app/hooks/useGoogleLogin';

const Home = () => {
  const { loginWithGoogle } = useGoogleLogin();

  return (
    <>
      <h1>This is home page</h1>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </>
  );
};

export default Home;
