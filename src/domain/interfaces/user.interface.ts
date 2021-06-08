import { Observable } from "rxjs";
import { UserDomain } from "../user.domain";

export interface UserId {
  id: number
}

export interface UserService {
  getById(data: UserId): Observable<UserDomain>
}
