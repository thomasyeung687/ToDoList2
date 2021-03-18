'use strict'

import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class DeleteTask_Transaction extends jsTPS_Transaction{
    constructor(initModel, listItemId, newText){
        super();
        this.model = initModel;
        this.id = listItemId;
        this.view = this.model.view;
    }
    doTransaction() {
        console.log("deleting listitem id="+this.id);
        this.oldListItem = this.model.currentList.getItemAtIndex(this.model.currentList.getIndexOfItemById(this.id)); //getting item we are about to remove and saving it
        console.log(this.oldListItem);
        this.oldIndex = this.model.currentList.removeItemByID(this.id); //oldDueDates
        console.log(this.oldIndex);
        this.view.viewList(this.model.currentList);
    }
    
    undoTransaction() {
        this.model.currentList.addItemAtIndex(this.oldListItem, this.oldIndex);
        console.log(this.model.currentList);
        this.view.viewList(this.model.currentList);
        console.log(this.model.currentList);
    }
}