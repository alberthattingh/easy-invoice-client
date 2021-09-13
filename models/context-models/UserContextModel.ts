import UserModel from '../UserModel';

export interface UserContextModel {
    user?: UserModel;
    setUser: (user: UserModel) => void;
}
