'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./jsTPS"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(addNewItemcb, removeItemcb){
        super();
        this.addNewItemcb = addNewItemcb;
        this.removeItemcb = removeItemcb;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.itemAddedid = this.addNewItemcb();
        console.log("itemAddedID: "+this.itemAddedid);
        //changing text of item you would do something like
        //this.model.updateText(this.id, this.newText) //id for which component to be changed
    }

    undoTransaction() {
        this.removeItemcb(this.itemAddedid);
        //changing text of item you would do something like
        //this.model.updateText(this.id, this.oldText) //id for which component to be changed
    }
}