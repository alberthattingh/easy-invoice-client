import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RecentInvoiceItemPropsModel } from '../../models/RecentInvoiceItemPropsModel';

export default function RecentInvoiceListItem(props: RecentInvoiceItemPropsModel) {
	const { invoice } = props;

	return (
		<View>
			{!invoice ? (
				<View style={styles.container}>
					<Text>Error</Text>
				</View>
			) : (
				<View style={styles.container}>
					<View style={styles.time}>
						<Text>{`R ${invoice.total}`}</Text>
					</View>
					<View style={styles.description}>
						<Text>{`${invoice.endDate}`}</Text>
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
	time: {
		flex: 1,
		margin: 5,
		justifyContent: 'center',
		textAlign: 'center',
		alignItems: 'center',
	},
	description: {
		flex: 3,
		margin: 5,
		justifyContent: 'center',
	},
});
