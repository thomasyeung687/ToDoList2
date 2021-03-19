// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.id + " did mount");
    }

    handleLoadList = () => {
        this.props.clearAllTransactionscb();
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log(this.props.toDoList.id);
        console.log("\t\t\tListLink render");
        let thisId = this.props.toDoList.id;
        let currentListId = this.props.currentListid;
        console.log(this.props.toDoList.id+" vs "+currentListId );
        return (
            <>
            {thisId != undefined && currentListId != undefined && this.props.toDoList.id === currentListId ? 
            <div 
                className='todo-list-button selected_list'
                onClick={this.handleLoadList}
            >
                {this.props.toDoList.name}<br />
            </div>
            :
            <div 
                className='todo-list-button'
                onClick={this.handleLoadList}
            >
                {this.props.toDoList.name}<br />
            </div>
            }
            </>
        )
    }
}

export default ListLink;