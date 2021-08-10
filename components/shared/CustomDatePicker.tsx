import { CustomDatePickerPropsModel } from '../../models/CustomDatePickerPropsModel';
import { View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';

export default function CustomDatePicker(props: CustomDatePickerPropsModel) {
	const { label, selectedDate, setSelectedDate } = props;
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

	const toggleDatePicker = () => {
		setShowDatePicker(!showDatePicker);
	};

	const onDatePickerConfirm = (selectedDate: CalendarDate) => {
		const date = selectedDate ? new Date(selectedDate.toDateString()) : null;
		if (date) {
			setSelectedDate(date);
		}
		setShowDatePicker(false);
	};

	const onDatePickerDismiss = () => {
		setShowDatePicker(false);
	};

	return (
		<View>
			<TextInput
				disabled
				mode="outlined"
				label={label}
				value={selectedDate.toDateString()}
				right={<TextInput.Icon name="calendar-month" onPress={() => toggleDatePicker()} />}
			/>
			<DatePickerModal
				mode="single"
				date={selectedDate}
				onConfirm={(params) => onDatePickerConfirm(params.date)}
				onDismiss={onDatePickerDismiss}
				visible={showDatePicker}
			/>
		</View>
	);
}
