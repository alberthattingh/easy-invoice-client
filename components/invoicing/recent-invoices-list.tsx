import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { InvoiceModel } from '../../shared/models/invoice-models';
import RecentInvoiceListItem from './recent-invoice-list-item';

interface Props {
    invoices: InvoiceModel[];
}

export default function RecentInvoicesList(props: Props) {
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
