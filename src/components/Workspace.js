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
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        
                        {this.props.undoSize == 0 ? 
                            <><Undo id="undo-button" className="disabled_button" /></>
                        :
                            <><Undo id="undo-button" className="list-item-control material-icons todo-button" onClick={()=>{this.props.undoTransactioncb()}}/></>
                        }
                        {this.props.redoSize == 0 ? 
                            <><Redo id="redo-button" className="disabled_button" /></>
                        :
                            <><Redo id="redo-button" className="list-item-control material-icons todo-button" onClick={()=>{this.props.redoTransactioncb()}}/></>
                        }
                        
                        
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button" />
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button" />
                        <Close id="close-list-button" className="list-item-control material-icons todo-button" />
                    </div>
                </div>
                <div id="todo-list-items-div">
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
        );
    }
}

export default Workspace;