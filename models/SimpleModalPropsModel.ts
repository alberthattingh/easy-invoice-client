export interface SimpleModalPropsModel {
	message: string;
	buttonText: string;

	modalVisible: boolean;
	setModalVisible: (value: boolean) => void;
}
