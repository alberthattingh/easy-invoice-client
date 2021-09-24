import React, { createContext, useState } from 'react';
import { UserContextModel } from '../../shared/models/context-models/user-context-model';
import UserModel from '../../shared/models/user-model';

const UserContext = createContext<UserContextModel>({
    user: undefined,
    setUser: () => {},
});

export function UserProvider(props: { children: any }) {
    const [user, setUser] = useState<UserModel>();

    return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
}

export default UserContext;
