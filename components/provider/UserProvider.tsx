import React, { createContext, useState } from 'react';
import { UserContextModel } from '../../models/context-models/UserContextModel';
import UserModel from '../../models/UserModel';

const UserContext = createContext<UserContextModel>({
    user: undefined,
    setUser: () => {},
});

export function UserProvider(props: { children: any }) {
    const [user, setUser] = useState<UserModel>();

    return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
}

export default UserContext;
