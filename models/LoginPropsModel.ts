import {StackNavigationProp} from "@react-navigation/stack";
import {AppScreens, MainStackParamList} from "../navigators/MainStackNavigator";

type LoginScreenNavProps = StackNavigationProp<MainStackParamList, AppScreens.Login>;

export default interface LoginPropsModel {
    navigation: LoginScreenNavProps;
}
