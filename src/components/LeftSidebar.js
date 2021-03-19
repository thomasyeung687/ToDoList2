// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import ListLink from './ListLink'
import AddBox from '@material-ui/icons/AddBox';

class LeftSidebar extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewList = () => {
        this.props.addNewListCallback();
    }

    render() {
        return (
            <div id="left-sidebar">
                <div id="left-sidebar-header" class="section-header">
                    <span class="left-sidebar-header-text">Todolists</span>
                    <span class="left-sidebar-controls" id="add-undo-redo-box" style={{paddingLeft:10}}>
                        <AddBox 
                            id="add-list-button"
                            className="material-icons todo_button"
                            onClick={this.handleAddNewList} />
                    </span>
                </div>
                <div id="todo-lists-list">
                {/* {console.log(this.props.toDoLists)} */}
                {
                    this.props.toDoLists.map((toDoList) => (
                        <ListLink
                            key={toDoList.id}
                            toDoList={toDoList}                                // PASS THE LIST TO THE CHILDREN
                            currentListid = {this.props.currentListid}
                            loadToDoListCallback={this.props.loadToDoListCallback} 
                            clearAllTransactionscb = {this.props.clearAllTransactionscb}
                            editListNamecb = {this.props.editListNamecb}
                            />  // PASS THE CALLBACK TO THE CHILDREN
                            
                    ))
                }
                </div>
            </div>
        );
    }
}

export default LeftSidebar;