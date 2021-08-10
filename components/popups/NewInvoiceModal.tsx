import React, { useState } from 'react';
import {
	ActivityIndicator,
	Button,
	KeyboardAvoidingView,
	Modal,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { CreateInvoiceModalPropsModel } from '../../models/InvoiceModels';
import MultiSelectionBox from '../shared/MultiSelectionBox';
import { SelectableItem } from '../../models/MultiSelectionBoxPropsModel';
import CustomDatePicker from '../shared/CustomDatePicker';
import { TextInput } from 'react-native-paper';

export default function NewInvoiceModal(props: CreateInvoiceModalPropsModel) {
	const { visible, setVisible, myStudents } = props;

	const [loading, setLoading] = useState<boolean>(false);
	const [selectedStudents, setSelectedStudents] = useState<SelectableItem[]>([]);
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>(new Date());

	const selectableStudents = myStudents.map((student) => ({
		label: `${student.firstName} ${student.lastName}`,
		key: Number(student.studentId),
		value: student,
	}));

	const onCancel = () => {
		setVisible(false);
	};

	const onSave = () => {};

	return (
		<Modal
			style={styles.modal}
			animationType={'slide'}
			presentationStyle={'formSheet'}
			visible={visible}
		>
			<View style={styles.actionBar}>
				<Button title={'Cancel'} onPress={onCancel} />
				<Button title={'Generate'} onPress={onSave} />
			</View>
			<KeyboardAvoidingView behavior={'padding'} style={styles.kav}>
				<ScrollView>
					<View style={styles.mainForm}>
						<View style={styles.formGroup}>
							<MultiSelectionBox
								label="Students"
								list={selectableStudents}
								selected={selectedStudents}
								setSelected={setSelectedStudents}
							/>
						</View>
						<View style={styles.formGroup}>
							<CustomDatePicker
								label="Start date"
								selectedDate={startDate}
								setSelectedDate={setStartDate}
							/>
						</View>
						<View style={styles.formGroup}>
							<CustomDatePicker
								label="End date"
								selectedDate={endDate}
								setSelectedDate={setEndDate}
							/>
						</View>
						<View style={styles.formGroup}>
							<TextInput mode="outlined" label="Description" />
						</View>
						<View style={styles.empty} />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
			{loading && (
				<View style={styles.loader}>
					<ActivityIndicator size="large" />
				</View>
			)}
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {},
	actionBar: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	kav: {
		flex: 1,
	},
	mainForm: {
		marginTop: 25,
		paddingHorizontal: 50,
		justifyContent: 'flex-end',
	},
	formGroup: {
		marginBottom: 25,
	},
	empty: {
		height: 25,
	},
	textInput: {
		borderColor: 'lightgrey',
		borderBottomWidth: 1,
		padding: 10,
	},
	loader: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		opacity: 0.5,
	},
});
