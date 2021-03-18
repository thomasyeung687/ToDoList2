'use strict'

import { jsTPS_Transaction } from "./jsTPS"

export default class ChgTaskStatus_Transaction extends jsTPS_Transaction{
    constructor(editStatuscb, listItemId, newText, oldText){
        super();
        this.editStatuscb = editStatuscb;
        this.id = listItemId;
        this.newText = newText;
        this.oldText = oldText;
        // console.log("chgtaskdesctransaction");
        // console.log(this.id);
        // console.log(this.newText);
        // console.log(this.oldText);
    }
    doTransaction() {
        this.editStatuscb(this.id,this.newText, "status");
    }
    
    undoTransaction() {
        this.editStatuscb(this.id, this.oldText, "status");
    }
}