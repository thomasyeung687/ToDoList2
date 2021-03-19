// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component} from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
        const listitem = this.props.toDoListItem;
        this.state = {
            editingDescCol: false,
            editingDueDateCol: false, 
            editingStatusCol: false,
            itemid: listitem.id,
            DescColVal: listitem.description,
            DueDateCol: listitem.due_date,
            StatusCol: listitem.status,
            listitem: this.props.toDoListItem,
        };
        // console.log(this.state.editingDescCol);
        // console.log(this.state.editingDueDateCol);
        // console.log(this.state.editingStatusCol);
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    descColOnChange = (event)=>{
        console.log(event.target.value); console.log("New Desc Entered");
        let olddesc = this.state.DescColVal;//getting curr val
        this.setState({DescColVal: event.target.value});
        this.props.editDescInTodoListcb(this.state.itemid, event.target.value, olddesc);
    }

    dateColOnChange = (event)=>{
        console.log(event.target.value); console.log("New Date Entered");
        let olddate = this.state.DueDateCol;//getting curr val
        this.setState({DueDateCol: event.target.value});
        this.props.editDDateInTodoListcb(this.state.itemid, event.target.value, olddate);
    }

    StatusColOnChange = (event)=>{
        console.log(event.target.value); console.log("New Status Entered");
        let oldStatus = this.state.StatusCol;//getting curr val
        this.setState({StatusCol: event.target.value});
        this.props.editStatusInTodoListcb(this.state.itemid, event.target.value, oldStatus);
    }

    deleteRowFunction = ()=>{
        console.log(this.state.itemid+" delete button clicked!");
        this.props.deleteRowOfTodoListcb(this.state.listitem);
    }
    
    moveRowUpInTodoList = () =>{
        console.log(this.state.itemid+" moveRowUpInTodoList button clicked!");
        this.props.moveRowUpInTodoListcb(this.state.itemid);
    }

    moveRowDownInTodoList = () =>{
        console.log(this.state.itemid+" moveRowDownInTodoList button clicked!");
        this.props.moveRowDownInTodoListcb(this.state.itemid);
    }

    //have a state variable toggle when onclick. changes tehe state variable. and on change of state the coponent is rerenders.
    //possible to have a if statement. onblur in the input object. end goal is to modify the state of the app.js so you have to make a callback function
    //in app.js that you pass to here through props. function that takes in parameter status the desc and data and updates the currentlist. 
    //two things you edit. the state. this.state.currentlist ex. and the local storage. 
    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {/* {console.log(listItem.id+" "+this.state.editingDescCol)}
                {console.log(listItem.id+" "+this.state.editingDueDateCol)}
                {console.log(listItem.id+" "+this.state.editingStatusCol)} */}
                {console.log(this.state.listitem)}

                {this.state.editingDescCol ? 
                    <><input className='item-col task-col' defaultValue={listItem.description} onBlur={(event)=>{this.setState({editingDescCol: false,}); this.descColOnChange(event);}}></input></>
                :
                    <><div className='item-col task-col' onClick={()=>{this.setState({editingDescCol: true,})}}>{listItem.description}</div></>
                }
                {this.state.editingDueDateCol ? 
                    <><input type="date" className='item-col task-col' defaultValue={listItem.due_date} onBlur={(event)=>{this.setState({editingDueDateCol: false,}); this.dateColOnChange(event);}}></input></>
                :
                    <><div className='item-col due-date-col' onClick={()=>{this.setState({editingDueDateCol: true,})}}>{listItem.due_date}</div></>
                }
                {this.state.editingStatusCol ? 
                    <>
                        <select id = "dropdown" className='item-col task-col' onBlur={(event)=>{this.setState({editingStatusCol: false,}); this.StatusColOnChange(event); }}>
                            {listItem.status === "complete" ? 
                                <>
                                <option value="complete" selected>complete</option>
                                <option value="incomplete">incomplete</option>
                                </>
                            :
                                <>
                                <option value="complete">complete</option>
                                <option value="incomplete"selected>incomplete</option>
                                </>
                            }
                        </select>
                    </>
                :
                    <><div className='item-col status-col' className={statusType} onClick={()=>{this.setState({editingStatusCol: true,})}}>{listItem.status}</div></>
                }

                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    {this.props.firstListItemId === listItem.id ?
                        <><KeyboardArrowUp className='disabled_button '/></>
                        :
                        <><KeyboardArrowUp className='list-item-control todo-button ' onClick={()=>{this.moveRowUpInTodoList()}} /></>
                    }
                    {this.props.lastListItemId === listItem.id ?
                        <><KeyboardArrowDown className='disabled_button '/></>
                        :
                        <><KeyboardArrowDown className='list-item-control todo-button' onClick={()=>{this.moveRowDownInTodoList()}} /></>
                    }
                    <Close className='list-item-control todo-button' onClick={()=>{this.deleteRowFunction()}}/>
                    <div className='list-item-control'></div>
                    <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;