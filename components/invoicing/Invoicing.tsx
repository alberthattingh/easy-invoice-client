import React, { useContext, useEffect, useState } from 'react';
import StudentContext from '../provider/StudentsProvider';
import { StyleSheet, View } from 'react-native';
import StatusBarBackground from '../shared/StatusBarBackground';
import RecentInvoices from './RecentInvoicesList';
import { getRecentInvoices } from '../../services/InvoiceService';
import { InvoiceModel } from '../../models/InvoiceModels';
import NewInvoiceModal from '../popups/NewInvoiceModal';
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

    const addNewInvoiceToState = (invoice: InvoiceModel) => {
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
