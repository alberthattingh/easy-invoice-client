import React, { useContext, useEffect, useState } from 'react';
import StudentContext from '../provider/students-provider';
import { StyleSheet, View } from 'react-native';
import StatusBarBackground from '../../shared/components/status-bar-background';
import RecentInvoices from './recent-invoices-list';
import { getRecentInvoices } from '../../services/invoice.service';
import { CreatedInvoice, InvoiceModel } from '../../shared/models/invoice-models';
import NewInvoiceModal from '../popups/new-invoice-modal';
import { IconButton } from 'react-native-paper';

export default function Invoicing() {
    const { myStudents, setMyStudents } = useContext(StudentContext);
    const [invoices, setInvoices] = useState<InvoiceModel[]>([]);
    const [createInvoiceMode, setCreateInvoiceMode] = useState<boolean>(false);
    const [skip, setSkip] = useState<number>(0);

    useEffect(() => {
        getRecentInvoices({
            skip,
            take: 20,
        })
            .then((response) => response.data)
            .then((invoices) => {
                setInvoices(invoices);
                setSkip(skip);
            })
            .catch((error) => console.log(error));
    }, []);

    const addNewInvoiceToState = (newInvoice: CreatedInvoice) => {
        const invoice: InvoiceModel = {
            createdDate: newInvoice.createdDate,
            invoiceId: newInvoice.invoiceId,
            invoiceNumber: newInvoice.invoiceNumber,
            description: newInvoice.description,
            endDate: newInvoice.endDate,
            startDate: newInvoice.startDate,
            total: newInvoice.total,
        };

        setInvoices([invoice, ...invoices]);
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBarBackground barStyle={'dark-content'} style={{ backgroundColor: 'transparent' }} />
            <View style={styles.topBar}>
                <IconButton icon="plus" size={40} style={styles.button} onPress={() => setCreateInvoiceMode(true)} />
            </View>
            <RecentInvoices invoices={invoices} />
            <NewInvoiceModal
                visible={createInvoiceMode}
                setVisible={setCreateInvoiceMode}
                myStudents={myStudents}
                newInvoiceCallback={addNewInvoiceToState}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 5,
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        marginVertical: 0,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
