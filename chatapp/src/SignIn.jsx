import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useHistory } from 'react-router-dom';

function SignInPage() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const history = useHistory();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Redirect to chat page after successful login
        history.push('/chat');
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className="signin-container">
      <h1>Welcome to My Chat App</h1>
      <button onClick={googleLogin} className="signin-button">Sign In with Google</button>
    </div>
  );
}

export default SignInPage;
