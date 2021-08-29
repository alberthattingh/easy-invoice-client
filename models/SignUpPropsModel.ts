import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigators/MainStackNavigator';
import { AppScreens } from './AppScreensEnum';

type SignUpScreenNavProps = StackNavigationProp<MainStackParamList, AppScreens.SignUp>;

export default interface SignUpPropsModel {
    navigation: SignUpScreenNavProps;
}
