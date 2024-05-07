import React,{PropsWithChildren} from 'react';
import { Card, Button, Paragraph,ProgressBar, useTheme,Modal,Portal } from 'react-native-paper';
import UpdateBudget from './UpdateBudgetModal';
import DeleteModal from './DeleteModal';

type BudgetCardProps = PropsWithChildren<{budget:Budget}>

const BudgetCard = ({ budget}:BudgetCardProps) => {
    const { id, name, start_amount, current_amount, start_date, end_date } = budget;
    const theme = useTheme()
    const [updateVisible, setUpdateVisible] = React.useState(false);
    const showUpdateModal = () => setUpdateVisible(true);
    const hideUpdateModal = () => setUpdateVisible(false);

    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const showDeleteModal = () => setDeleteVisible(true);
    const hideDeleteModal = () => setDeleteVisible(false);

    const remainingAmount = (start_amount -current_amount) / start_amount;

    const containerStyle = {backgroundColor: 'white', padding: 20,height:200};

    const handleUpdate = () =>{
        showUpdateModal()
    }
    const handleDelete = () =>{
        showDeleteModal()
    }

    return (
        <Card style={{backgroundColor:theme.colors.primaryContainer,marginVertical:10,marginHorizontal:8}}>
            <Card.Content>
                <Paragraph>Name: {name}</Paragraph>
                <Paragraph>Start Amount: {start_amount}</Paragraph>
                <Paragraph>Current Amount: {current_amount}</Paragraph>
                <Paragraph>Start Date: {start_date}</Paragraph>
                <Paragraph>End Date: {end_date}</Paragraph>
                <ProgressBar progress={remainingAmount} color={remainingAmount <= 0.5 ? 'green' : remainingAmount <= 0.8 ? 'orange' : 'red'} />
                <Paragraph>Budget Spent: {(remainingAmount*100).toFixed(0)}%</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button icon="pencil" onPress={handleUpdate}>Update</Button>
                <Button icon="delete" onPress={handleDelete}>Delete</Button>
            </Card.Actions>
            <Portal>
                <Modal visible={updateVisible} onDismiss={hideUpdateModal} contentContainerStyle={containerStyle}>
                    <UpdateBudget hideModal={hideUpdateModal} budgetLimit={start_amount} budgetName={name} budgetId={id}/>
                </Modal>
            </Portal>
            <DeleteModal visible={deleteVisible} hideModal={hideDeleteModal} id={id} type='budget'/>
        </Card>
    );
};

export default BudgetCard;
