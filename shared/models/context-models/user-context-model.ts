import UserModel from '../user-model';

export interface UserContextModel {
    user?: UserModel;
    setUser: (user: UserModel) => void;
}
