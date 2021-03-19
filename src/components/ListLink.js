// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.id + " constructor");
        this.state = {
            editingName: false
        }
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.id + " did mount");
    }

    handleLoadList = () => {
        this.props.clearAllTransactionscb();
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    editlist = () =>{
        this.setState({editingName: true});
    }

    noteditlist = () =>{
        this.setState({editingName: false});
    }

    editListNamehelperfunc = (event) => {
        this.noteditlist();
        this.props.editListNamecb(this.props.toDoList.id, event.target.value);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log(this.props.toDoList.id);
        console.log("\t\t\tListLink render");
        let thisId = this.props.toDoList.id;
        let currentListId = this.props.currentListid;
        console.log(this.props.toDoList.id+" vs "+currentListId );
        let editlist = this.state.editingName;
        return (
            <>
            {/* {editlist ?
                <input onBlur={(event)=>{this.editListNamehelperfunc(event)}} className='todo-list-button-input'></input>
            :
                [thisId != undefined && currentListId != undefined && this.props.toDoList.id === currentListId ? 
                    <div 
                        className='todo-list-button selected_list'
                        onClick={this.handleLoadList}
                        onDoubleClick = {this.editlist}
                    >
                        {this.props.toDoList.name}<br />
                    </div>
                :
                    <div 
                        className='todo-list-button'
                        onClick={this.handleLoadList}
                        onDoubleClick = {this.editlist}
                    >
                        {this.props.toDoList.name}<br />
                    </div>
                ]
            } */}
            {thisId != undefined && currentListId != undefined && this.props.toDoList.id === currentListId ? 
                <div 
                    className='todo-list-button selected_list'
                    onClick={this.handleLoadList}
                    onDoubleClick = {this.editlist}
                >
                    {editlist? 
                    <input onBlur={(event)=>{this.editListNamehelperfunc(event)}} className='todo-list-button-input'></input> 
                    :
                    this.props.toDoList.name}
                    <br />
                </div>
            :
                <div 
                    className='todo-list-button'
                    onClick={this.handleLoadList}
                    onDoubleClick = {this.editlist}
                >
                    {editlist? 
                    <input onBlur={(event)=>{this.editListNamehelperfunc(event)}} className='todo-list-button-input'></input> 
                    :
                    this.props.toDoList.name}
                    <br />
                </div>
            }
            </>
        )
    }
}

export default ListLink;