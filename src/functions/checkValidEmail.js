const checkValidEmail = (email) => {
   if (email !== '') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
         console.log('unvalid email');
         return false;
      } else {
         return true;
      }
   } else {
      console.log('unrequired email');
      return false;
   }
};

export default checkValidEmail;
