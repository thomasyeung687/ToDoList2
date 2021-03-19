'use strict'

import { jsTPS_Transaction } from "./jsTPS"

export default class MoveTaskUpDown_Transaction extends jsTPS_Transaction{
    constructor(moveItemcb, listItemId, action){
        super();
        this.listItemid = listItemId
        this.action = action
        if(this.action == "up"){
            this.undoAction = "down";
        }else{
            this.undoAction = "up";
        }
    }
    doTransaction() {
        this.moveItemcb(this.listItemid, this.action);
    }
    
    undoTransaction() {
        this.moveItemcb(this.listItemid, this.undoAction);
        //if out here then calling modifyTaskPosition didnt actually movePostion of list item so we wouldnt want to do the reverse of it.
    }
}