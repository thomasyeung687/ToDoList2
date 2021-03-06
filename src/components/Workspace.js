// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
    }

    componentDidMount = () =>{
        document.addEventListener('keydown', this.keydownChecker)
    }

    modalOpen() {
        console.log("setting modal to open");
        this.setState({ modal: true });
        this.forceUpdate();
    }

    modalClose() {
        console.log("closing modal");
        this.setState({
            modal: false
        });
        this.forceUpdate();
    }


    keydownChecker = (e) =>{
        if(e.ctrlKey === true && e.key === 'y'){
            this.props.redoTransactioncb();
        }else if(e.ctrlKey === true && e.key === 'z'){
            this.props.undoTransactioncb();
        }
    }

    render() {
        const todolistitems = [];
        this.props.toDoListItems.map((toDoListItem)=>{todolistitems.push(toDoListItem.id)})
        let firstListItemId;
        let lastListItemId;
        // console.log("render func of ws");
        // console.log(todolistitems)
        console.log(this.props.undoSize)
        console.log(this.props.redoSize)
        if(todolistitems < 1){
            console.log("todolistitems empty");
        }else{
            firstListItemId = todolistitems[0];
            lastListItemId = todolistitems[todolistitems.length-1];
            console.log(firstListItemId + " "+ lastListItemId);
        }
        const showModalOrHide = this.state.modal ? "modal modal_show" : "modal modal_hide";
        console.log(showModalOrHide);
        return (
            <>
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        
                        {this.props.currentlist.id==undefined?
                            <></>
                        :   
                            <>
                            {this.props.undoSize === 0 ? 
                                <><Undo id="undo-button" className="disabled_button" /></>
                            :
                                <><Undo id="undo-button" className="list-item-control material-icons todo-button" onClick={()=>{this.props.undoTransactioncb()}}/></>
                            }
                            {this.props.redoSize === 0 ? 
                                <><Redo id="redo-button" className="disabled_button" /></>
                            :
                                <><Redo id="redo-button" className="list-item-control material-icons todo-button" onClick={()=>{this.props.redoTransactioncb()}}/></>
                            }
                            <AddBox id="add-item-button" className="list-item-control material-icons todo-button" onClick={()=>{this.props.addNewTaskInTodoListcb()}}/>
                            <Delete id="delete-list-button" className="list-item-control material-icons todo-button" onClick={()=>{this.modalOpen()}}/>
                            <Close id="close-list-button" className="list-item-control material-icons todo-button" onClick={()=>{this.props.closeListscb()}}/>
                            </>
                        }
                        
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {console.log(this.props.toDoListItems)}
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            deleteRowOfTodoListcb={this.props.deleteRowOfTodoListcb} //passing delete row callback to todolistitem. (where it will pass row id when delete is clicked back to app.js)
                            moveRowUpInTodoListcb = {this.props.moveRowUpInTodoListcb}
                            moveRowDownInTodoListcb = {this.props.moveRowDownInTodoListcb}
                            editDescInTodoListcb = {this.props.editDescInTodoListcb}
                            editDDateInTodoListcb = {this.props.editDDateInTodoListcb}
                            editStatusInTodoListcb = {this.props.editStatusInTodoListcb}
                            firstListItemId = {firstListItemId}
                            lastListItemId = {lastListItemId}
                        />))
                    }
                </div>
                
                <br />
            </div>
            <div id="myModal" class={showModalOrHide}>
                <div class="modal-content">
                <span class="close" onClick={()=>{this.modalClose()}}>&times;</span>
                <p>Are you sure you want to delete this list?</p>
                <button id="myModalyes" onClick={()=>{this.props.deleteListcb(); this.modalClose();}}>yes</button>
                <button id="myModalno" onClick={()=>{this.modalClose()}}>no</button>
                </div>
            </div>
            </>
        );
    }
}

export default Workspace;