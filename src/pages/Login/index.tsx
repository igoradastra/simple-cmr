import { Login } from './Login';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
export const LoginPage = () => {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <>
      {/* <section style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> */}
        {/* <Login /> */}
        <GoogleLogin 
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse)
          if (credentialResponse.credential) {
            console.log(jwtDecode(credentialResponse.credential))
          }
        }}

        onError={()=> console.log('Login error')} />
      {/* </section> */}
      </>
    </main>
  );
};
