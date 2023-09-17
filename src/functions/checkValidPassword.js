const checkValidPassword = (password) => {
   if (password !== '') {
      if (password.length < 6) {
         console.log('unvalid password');
         return false;
      } else {
         return true;
      }
   } else {
      console.log('unrequired password');
      return false;
   }
};

export default checkValidPassword;
