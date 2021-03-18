'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, oldText, newText, id) {
        super();
        this.model = initModel;
        this.oldText = oldText;
        this.newText = newText;
        this.id = id; //peice of html component
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.itemAdded = this.model.addNewItem();
        //changing text of item you would do something like
        //this.model.updateText(this.id, this.newText) //id for which component to be changed
    }

    undoTransaction() {
        this.model.removeItem(this.itemAdded.id);
        //changing text of item you would do something like
        //this.model.updateText(this.id, this.oldText) //id for which component to be changed
    }
}