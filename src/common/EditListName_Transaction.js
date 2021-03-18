'use strict'

import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class EditListName_Transaction extends jsTPS_Transaction{
    constructor(initModel, listId, newListName){
        super();
        this.model = initModel;
        this.id = listId;
        this.view = this.model.view;
        this.newListName = newListName;
    }
    doTransaction() {
        this.listObject = this.model.getListById(this.id);
        console.log(this.listObject);
        this.oldName = this.listObject.getName();
        console.log(this.oldName);
        console.log(this.newListName);
        this.listObject.setName(this.newListName);
        console.log(this.model.toDoLists);
        this.view.refreshLists(this.model.toDoLists);
    }
    
    undoTransaction() {
        this.listObject.setName(this.oldName);
        this.view.refreshLists(this.model.toDoLists);
    }
}