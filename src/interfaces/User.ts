export interface User {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  dob: Date | null;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
}
