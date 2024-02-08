'use client'


const { atom } = require("recoil");
export const timeStamp = atom({
  key: 'timeStamp',
  default: '', 
});
export const Password = atom({
  key: 'Password',
  default: '', 
});
export const NameState = atom({
  key: 'NameState',
  default: '', 
});
export const ProfilState = atom({
  key: 'ProfilStete',
  default: '', 
});
export const EmailState = atom({
  key: 'EmailStete',
  default: '', 
});
export const UserName = atom({
  key: 'NewUserName',
  default: '',
});
export const Description = atom({
  key: 'Description',
  default: '',
});
export const Gender = atom({
  key: 'Gender',
  default: '',
});

  export const isUserLogedIn = atom({
    key: 'isUserLogedIn',
    default: false, 
  });
  export const isLoading = atom({
    key: 'isLoading',
    default: false, 
  });
  export const verifiedChecking = atom({
    key: 'verifiedChecking',
    default: false,
  });
  export const userUid = atom({
    key: 'userUid',
    default: '',
  });
  export const Seconds = atom({
    key: 'Seconds',
    default: '',
  });

  
 