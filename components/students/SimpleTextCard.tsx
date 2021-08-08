import SimpleTextCardPropsModel from '../../models/SimpleTextCardPropsModel';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function SimpleTextCard(props: SimpleTextCardPropsModel) {
	const { text } = props;

	return (
		<View>
			{text === undefined ? (
				<View style={styles.container}>
					<Text>Error</Text>
				</View>
			) : (
				<View style={styles.container}>
					<View style={styles.description}>
						<Text>{text}</Text>
					</View>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,

		flexDirection: 'row',
		borderRadius: 10,
		backgroundColor: 'white',
		marginBottom: 10,
		minHeight: 50,
	},
	description: {
		flex: 1,
		margin: 5,
		justifyContent: 'center',
	},
});
