import React,{PropsWithChildren} from 'react';
import { Card, Button, Paragraph,ProgressBar, useTheme,Modal,Portal } from 'react-native-paper';
import DeleteModal from '../components/DeleteModal';

type AccountCardProps = PropsWithChildren<{account:BankAccount}>

const AccountCard = ({ account}:AccountCardProps) => {
    const { id, accountNumber, balance } = account;
    const theme = useTheme()

    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const showDeleteModal = () => setDeleteVisible(true);
    const hideDeleteModal = () => setDeleteVisible(false);

    const handleDelete = () =>{
        showDeleteModal()
    }

    return (
        <Card style={{backgroundColor:theme.colors.primaryContainer,marginVertical:10,marginHorizontal:8}}>
            <Card.Content>
                <Paragraph>Account Number: {accountNumber}</Paragraph>
                <Paragraph>Balance : {balance}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button icon="delete" onPress={handleDelete}>Delete</Button>
            </Card.Actions>
            <DeleteModal visible={deleteVisible} hideModal={hideDeleteModal} id={id} type='account'/>
        </Card>
    );
};

export default AccountCard;
