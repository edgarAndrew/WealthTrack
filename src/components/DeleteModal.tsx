import React,{PropsWithChildren} from 'react';
import { Dialog, Paragraph, Portal, Button as PaperButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { deleteBudget,getBudgets } from '../actions/budget';
import { deleteGoal,getGoals } from '../actions/goals';

type DeleteModalProps = PropsWithChildren<{hideModal:Function,visible:boolean,type:string,id:number}>

const DeleteModal = ({hideModal,visible,type,id}:DeleteModalProps) => {
    const dispatch = useDispatch()

    const handleYes = async() => {
        if(type === 'goal'){
            await deleteGoal(dispatch,id)
            getGoals(dispatch)
        }else if(type === 'budget'){
            await deleteBudget(dispatch,id)
            getBudgets(dispatch)
        }
        hideModal()
    };

    const handleNo = () => {
        hideModal()
    };

    const handleDismissDialog = () => {
        hideModal()
    };

    return (
            <Portal>
            <Dialog visible={visible} onDismiss={handleDismissDialog}>
                <Dialog.Title>Confirmation</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Do you confirm your action ?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <PaperButton onPress={handleNo}>No</PaperButton>
                    <PaperButton onPress={handleYes}>Yes</PaperButton>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default DeleteModal;
