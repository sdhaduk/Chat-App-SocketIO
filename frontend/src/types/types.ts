    interface Register {
    name: string;
    email: string;
    password: string;
  }
  
  interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
  }
  
  interface Login {
    email: string;
    password: string;
  }

  export type {Register as Register, User as User, Login as Login}