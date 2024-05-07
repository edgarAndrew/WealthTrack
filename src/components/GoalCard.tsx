import React,{PropsWithChildren} from 'react';
import { Card, Button, Paragraph,ProgressBar, useTheme,Modal, Portal } from 'react-native-paper';
import UpdateGoal from './UpdateGoalModal';
import DeleteModal from './DeleteModal';
import AddMoney from './AddMoney';

type GoalCardProps = PropsWithChildren<{goal:Goal}>
const GoalCard = ({ goal} : GoalCardProps) => {
    const { id,currentAmount,targetAmount,name,startDate,endDate } = goal;
    
    const theme = useTheme()
    const [updateVisible, setUpdateVisible] = React.useState(false);
    const showUpdateModal = () => setUpdateVisible(true);
    const hideUpdateModal = () => setUpdateVisible(false);

    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const showDeleteModal = () => setDeleteVisible(true);
    const hideDeleteModal = () => setDeleteVisible(false);

    const [addMoneyVisible, setAddMoneyVisible] = React.useState(false);
    const showAddMoneyModal = () => setAddMoneyVisible(true);
    const hideAddMoneyModal = () => setAddMoneyVisible(false);

    const remainingAmount = currentAmount / targetAmount;

    const containerStyle = {backgroundColor: 'white', padding: 20,height:200};

    const handleAddMoney = () =>{
        showAddMoneyModal()
    }
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
                <Paragraph>Target Amount: {targetAmount}</Paragraph>
                <Paragraph>Current Amount: {currentAmount}</Paragraph>
                <Paragraph>Start Date: {startDate}</Paragraph>
                <Paragraph>End Date: {endDate}</Paragraph>
                <ProgressBar progress={remainingAmount} color={theme.colors.onPrimaryContainer} />
                <Paragraph>Completion: {(remainingAmount*100).toFixed(0)}%</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button icon="cash" onPress={handleAddMoney}>Add money</Button>
                <Button icon="pencil" onPress={handleUpdate}>Update</Button>
                <Button icon="delete" onPress={handleDelete}>Delete</Button>
            </Card.Actions>
            <Portal>
                <Modal visible={updateVisible} onDismiss={hideUpdateModal} contentContainerStyle={containerStyle}>
                    <UpdateGoal hideModal={hideUpdateModal} goal_id={id} goal_amount={targetAmount} goal_name={name} goal_deadline={endDate}/>
                </Modal>
            </Portal>
            <DeleteModal visible={deleteVisible} hideModal={hideDeleteModal} id={id} type='goal'/>
            <Portal>
                <Modal visible={addMoneyVisible} onDismiss={hideAddMoneyModal} contentContainerStyle={containerStyle}>
                    <AddMoney hideModal={hideAddMoneyModal} goal_id={id}/>
                </Modal>
            </Portal>
        </Card>
    );
};

export default GoalCard;
