import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar, Card } from 'react-native-paper';
import { InvoiceModel } from '../../shared/models/invoice-models';

interface Props {
    invoice: InvoiceModel;
}

export default function RecentInvoiceListItem(props: Props) {
    const { invoice } = props;
    const hasDescription = !!invoice.description;

    return (
        <View>
            {!invoice ? (
                <View style={styles.container}>
                    <Text>Error</Text>
                </View>
            ) : (
                <Card.Title
                    title={hasDescription ? invoice.description : `Invoice #${invoice.invoiceNumber ?? '0'}`}
                    subtitle={
                        hasDescription
                            ? `Invoice #${invoice.invoiceNumber ?? '0'}`
                            : `Created on ${new Date(invoice.createdDate).toDateString()}`
                    }
                    left={(props) => <Avatar.Icon {...props} icon="receipt" />}
                />
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
});
