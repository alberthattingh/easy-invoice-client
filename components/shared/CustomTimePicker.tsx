import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { CustomTimePickerPropsModel } from '../../models/PropsModels';
import { TimeObjectModel } from '../../models/TimeObjectModel';

export default function CustomTimePicker(props: CustomTimePickerPropsModel) {
	const { label, selectedTime, setSelectedTime } = props;
	const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

	const toggleTimePicker = () => {
		setShowTimePicker(!showTimePicker);
	};

	const onTimePickerConfirm = (time: TimeObjectModel) => {
		if (time) {
			setSelectedTime(time);
		}
		setShowTimePicker(false);
	};

	const onTimePickerDismiss = () => {
		setShowTimePicker(false);
	};

	return (
		<View>
			<TextInput
				disabled
				mode="outlined"
				label={label}
				value={`${selectedTime.hours.toString().padStart(2, '0')}:${selectedTime.minutes
					.toString()
					.padStart(2, '0')}`}
				right={<TextInput.Icon name="clock-outline" onPress={() => toggleTimePicker()} />}
			/>
			<TimePickerModal
				visible={showTimePicker}
				onDismiss={onTimePickerDismiss}
				onConfirm={(time) => onTimePickerConfirm(time)}
			/>
		</View>
	);
}
