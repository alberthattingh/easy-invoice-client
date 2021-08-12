import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigators/MainStackNavigator';
import { AppScreens } from './AppScreensEnum';

type LoginScreenNavProps = StackNavigationProp<MainStackParamList, AppScreens.Login>;

export default interface LoginPropsModel {
    navigation: LoginScreenNavProps;
}
