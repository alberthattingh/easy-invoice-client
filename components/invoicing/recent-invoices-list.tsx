import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RecentInvoiceListItem from './recent-invoice-list-item';
import { InvoicesListPropsModel } from '../../shared/models/invoice-models';

export default function RecentInvoicesList(props: InvoicesListPropsModel) {
    const { invoices } = props;

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.list}>
                {invoices.map((invoice) => (
                    <RecentInvoiceListItem key={invoice.invoiceId} invoice={invoice} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        flex: 1,
    },
    list: {
        padding: 10,
        flex: 1,
    },
});
