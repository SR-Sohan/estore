import jwtDecode from 'jwt-decode';

export function isTokenValid(jwtToken) {
  try {
    if(jwtToken !== null){
      const decodedToken = jwtDecode(jwtToken);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTimestamp;
    }else{
      return false;
    }
   
  } catch (error) {
    
    return false;
  }
}

export function isTokenDecode(jwtToken){
    if(jwtToken !== null){
      return jwtDecode(jwtToken);
    }else{
      return false;
    }

}