// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import ChgTaskDescription_Transaction from './common/ChgTaskDescription_Transaction.js'
import ChgTaskDate_Transaction from './common/ChgTaskDate_Transaction.js'
import ChgTaskStatus_Transaction from './common/ChgTaskStatus_Transaction.js'
import AddNewItem_Transaction from './common/AddNewItem_Transaction.js'
import MoveTaskUpDown_Transaction from './common/MoveTaskUpDown_Transaction.js'
import DeleteTask_Transaction from './common/DeleteTask_Transaction.js'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");  //if list is undefined then load from json.
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    }; 

    console.log("app.js constructor");
    console.log(highListId);
    console.log(highListItemId);
    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []}, //list object. id name items
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);//assuming it makes the list about to be displayed to the top of the todolists.

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
    this.forceUpdate();
  }

  // WILL LOAD THE SELECTED LIST
  closeLists = (toDoList) => {
    console.log("loading " + toDoList);

    this.setState({
      currentList: {items: []},
    });
    this.forceUpdate();
  }


  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  deleteList = () => {
    let copyTodolist = this.state.toDoLists.map((todolist)=>{return todolist}); //
    let indexOfList = this.getIndex(this.state.currentList.id, copyTodolist, 'id');
    copyTodolist.splice(indexOfList,1);//at indexoflist remove one item.
    console.log("deleted list at index: "+indexOfList);
    this.setState({
      toDoLists: copyTodolist,
      currentList: {items: []},
    }, this.afterToDoListsChangeComplete);
    this.forceUpdate();
  }

  editListName = (listid, newListName)=>{
    console.log(listid+" "+newListName);
    let copyTodolist = this.state.toDoLists.map((todolist)=>{return todolist}); //
    let todolistToEdit = copyTodolist.filter((list)=>list.id == listid)[0]; //for list in state.todolists.
    todolistToEdit.name = newListName;
    this.setState({
      toDoLists: copyTodolist,
    }, this.afterToDoListsChangeComplete);
    this.forceUpdate();
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      dueDate: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  undoTransaction = () => {
    console.log("undoing");
    this.tps.undoTransaction();
  }

  redoTransaction = () => {
    console.log("redoing");
    this.tps.doTransaction();
  }

  clearAllTransactions = () =>{
    console.log("clearing all transactions");
    this.tps.clearAllTransactions();
  }
  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  // call this function after you make a change to the todolist. ************************************************
  //turns it inot a json string and stores it into the local storage.
  //little broken
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString); //
  }

  /**my stuff */

  //*function passed to todoitem as a callback for when user is trying to change a row.
  editDescInTodoList = (listItemid, newDesc, oldDesc)=>{
    console.log("editDescInTodoList item.id recieved: "+listItemid+" new Description: "+newDesc+" olddesc:"+oldDesc);
    let chgdesc = new ChgTaskDescription_Transaction(this.actuallyEditRecentlist, listItemid, newDesc, oldDesc);
    this.tps.addTransaction(chgdesc);
  }
  editDDateInTodoList = (listItemid, newDate, oldDate)=>{
    console.log("editDDateInTodoList item.id recieved: "+listItemid+" new Due_Date: "+newDate);
    let chgddate = new ChgTaskDate_Transaction(this.actuallyEditRecentlist, listItemid, newDate, oldDate);
    this.tps.addTransaction(chgddate);
  }
  editStatusInTodoList = (listItemid, newStatus, oldStatus)=>{
    console.log("editStatusInTodoList item.id recieved: "+listItemid+" new status: "+newStatus);
    let chgstatus = new ChgTaskStatus_Transaction(this.actuallyEditRecentlist, listItemid, newStatus, oldStatus);
    this.tps.addTransaction(chgstatus);
  }

  deleteTaskInTodoList = (listItem) =>{
    console.log(listItem);
    let deleteTask = new DeleteTask_Transaction(this.actuallyAddTask, this.removeTask, listItem);
    this.tps.addTransaction(deleteTask);
  }

  addNewTaskInTodoList = () => {
    console.log("addNewTaskInTodoList ");
    let addTask = new AddNewItem_Transaction(this.actuallyAddNewTask, this.removeTask);
    this.tps.addTransaction(addTask);
  }
  moveRowUpInTodoList=(listItemid)=>{
    // let drt = new deleteRowTransaction(listItemid);
    // this.tps.addTransaction(drt);
    console.log("moveRowUpInTodoList item.id recieved: "+listItemid)
    let moveUp = new MoveTaskUpDown_Transaction(this.moveTaskUpDown, listItemid,'up')
    this.tps.addTransaction(moveUp);
  }
  moveRowDownInTodoList=(listItemid)=>{
    // let drt = new deleteRowTransaction(listItemid);
    // this.tps.addTransaction(drt);
    console.log("moveRowDownInTodoList item.id recieved: "+listItemid)
    let moveDown = new MoveTaskUpDown_Transaction(this.moveTaskUpDown, listItemid,'down')
    this.tps.addTransaction(moveDown);
  }  
  //add new id.
  //this function will be what the transactions call in order to alter the data.
  //the listItemid is the id of the task (the row shown in workspace) we are trying to change, the newString is the new string we want to replace, and the col will take in status, due_date or description to signify which col to change.
  actuallyEditRecentlist = (listItemid, newString, col)=>{ 
    //have to get a copy of the todolists as it currently exists. Find the lsit that you  are editing by its id. get a copy of the list. update
    //the copy of the list. and then update the todolist. setstate. you have to update the todolist array with a  new todolsit array.
    //list to edit is the currentlistid.
    console.log("chgtaskdesctransaction");
    console.log(listItemid);
    console.log(newString);
    console.log(col);
    let copyTodolist = this.state.toDoLists.map((todolist)=>{return todolist}); //
    console.log(this.state.toDoLists);
    console.log(copyTodolist);
    let currentList = copyTodolist.filter((list)=>list.id == this.state.currentList.id)[0]; //for list in state.todolists. 
    // console.log(currentList);
    currentList.items.map((task)=>{if(task.id == listItemid){task[col] = newString; console.log(task);}})
    console.log(currentList);

    //edit the task
    //now you just have to replace the copytodolist.

    this.setState({
      toDoLists: copyTodolist,
      currentList: currentList,
    }, this.afterToDoListsChangeComplete);

    //extra: recall whatever function is in charge of rendering the list again. 
    //setting state to the current list will automatically refresh it.
  }

  //function that will add a new task to a list. user in addnewItemTransaction and to undo a deletetransaction.
  
  actuallyAddTask = (newListItem, index) => {
    newListItem.id = this.state.nextListItemId;//if newListItem.id is undefined then we are creting a new item in list.
    console.log("actuallyAddTask"+newListItem);
    let copyTodolist = this.state.toDoLists.map((todolist)=>{return todolist}); //
    let currentList = copyTodolist.filter((list)=>list.id == this.state.currentList.id)[0]; //getting the currentlist.
    console.log(currentList);
    currentList.items.splice(index, 0, newListItem);

    this.setState({
      toDoLists: copyTodolist,
      currentList: currentList,
      nextListItemId: this.state.nextListItemId+1,
    }, this.afterToDoListsChangeComplete);
    this.forceUpdate();
  }

  actuallyAddNewTask = () =>{
    let copyTodolist = this.state.toDoLists.map((todolist)=>{return todolist}); //
    let currentList = copyTodolist.filter((list)=>list.id == this.state.currentList.id)[0]; //for list in state.todolists. 
    let newTask = 
    {id: 
      this.state.nextListItemId,
      description: "untitled",
      due_date: "2021-12-14",
      status: "incomplete",
    };
    //console.log(currentList);
    currentList.items.push(newTask)
    this.setState({
      toDoLists: copyTodolist,
      currentList: currentList,
      nextListItemId: this.state.nextListItemId+1,
    }, this.afterToDoListsChangeComplete);
    this.forceUpdate();
    return newTask.id;//returning so that transaction can store it and use the id for deletion during undo
  }

  removeTask = (listItemid) =>{
    console.log("removing " + listItemid);
    let copyTodolist = this.state.toDoLists.map((todolist)=>{return todolist}); //
    let currentList = copyTodolist.filter((list)=>list.id == this.state.currentList.id)[0]; //for list in state.todolists. 
    let indexRemoved = this.getIndex(listItemid, currentList.items, "id");
    //currentList.items.filter((task)=>task.id != listItemid);//only returning an array with elements that do not have the id of listItemid. 
    currentList.items.splice(indexRemoved,1);//removing one item at indexRemoved.
    console.log("List after removal:" +currentList.items);
    this.setState({
      toDoLists: copyTodolist,
      currentList: currentList,
    }, this.afterToDoListsChangeComplete);
    this.forceUpdate();
    return indexRemoved;
  }

  getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  moveTaskUpDown = (listitemid, action)=>{
    console.log(listitemid+" action: "+action);
    let copyTodolist = this.state.toDoLists.map((todolist)=>{return todolist}); //
    let currentList = copyTodolist.filter((list)=>list.id == this.state.currentList.id)[0]; //for list in state.todolists. 
    let index = this.getIndex(listitemid, currentList.items, 'id');
    let removedarray = currentList.items.splice(index,1);
    console.log(index);
    console.log(removedarray);
    if(action == "up"){
      currentList.items.splice(index-1, 0, removedarray[0]);
    }else{
      currentList.items.splice(index+1, 0, removedarray[0]);
    }
    console.log(currentList);

    this.setState({
      toDoLists: copyTodolist,
      currentList: currentList,
    }, this.afterToDoListsChangeComplete);
    this.forceUpdate();
  }

  render() {
    let items = this.state.currentList.items;
    console.log(this.state.toDoLists);
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          currentListid = {this.state.currentList.id}
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          clearAllTransactionscb = {this.clearAllTransactions}
          editListNamecb = {this.editListName}
        />
        <Workspace 
        toDoListItems={items} 
        deleteRowOfTodoListcb={this.deleteTaskInTodoList}
        moveRowUpInTodoListcb = {this.moveRowUpInTodoList}
        moveRowDownInTodoListcb = {this.moveRowDownInTodoList}
        editDescInTodoListcb = {this.editDescInTodoList}
        editDDateInTodoListcb = {this.editDDateInTodoList}
        editStatusInTodoListcb = {this.editStatusInTodoList}
        undoTransactioncb = {this.undoTransaction}
        redoTransactioncb = {this.redoTransaction}
        undoSize = {this.tps.getUndoSize()}
        redoSize = {this.tps.getRedoSize()}
        addNewTaskInTodoListcb = {this.addNewTaskInTodoList}
        closeListscb = {this.closeLists}
        deleteListcb = {this.deleteList}
        />
      </div>
    );
  }
  
  
}

export default App;