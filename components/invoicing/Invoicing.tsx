import React, { useContext, useEffect, useState } from 'react';
import StudentContext from '../provider/StudentsProvider';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StatusBarBackground from '../shared/StatusBarBackground';
import RecentInvoices from './RecentInvoicesList';
import { getAllInvoices } from '../../services/InvoiceService';
import { InvoiceModel } from '../../models/InvoiceModels';
import NewInvoiceModal from '../popups/NewInvoiceModal';

export default function Invoicing() {
    const { myStudents, setMyStudents } = useContext(StudentContext);
    const [invoices, setInvoices] = useState<InvoiceModel[]>([]);
    const [createInvoiceMode, setCreateInvoiceMode] = useState<boolean>(false);

    useEffect(() => {
        getAllInvoices()
            .then((response) => response.data)
            .then((invoices) => {
                console.log('Updating invoices in state...');
                setInvoices(invoices);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <View style={styles.mainContainer}>
            <StatusBarBackground barStyle={'dark-content'} style={{ backgroundColor: 'transparent' }} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => setCreateInvoiceMode(true)}>
                    <View style={styles.buttonWrapper}>
                        <Image style={styles.image} source={require('../../images/plus.png')} />
                    </View>
                </TouchableOpacity>
            </View>
            <RecentInvoices invoices={invoices} />
            <NewInvoiceModal visible={createInvoiceMode} setVisible={setCreateInvoiceMode} myStudents={myStudents} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 5,
        flex: 1,
    },
    topBar: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonWrapper: {
        marginEnd: 10,
        width: 30,
        height: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
