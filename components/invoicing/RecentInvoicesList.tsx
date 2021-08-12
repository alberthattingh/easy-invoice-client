import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RecentInvoiceListItem from './RecentInvoiceListItem';
import { InvoicesListPropsModel } from '../../models/InvoiceModels';

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
    },
    list: {
        padding: 10,
    },
});
