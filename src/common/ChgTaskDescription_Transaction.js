'use strict'

import { jsTPS_Transaction } from "./jsTPS"

export default class ChgTaskDescription_Transaction extends jsTPS_Transaction{
    constructor(editDeskcb, listItemId, newText, oldText){
        super();
        this.editDeskcb = editDeskcb;
        this.id = listItemId;
        this.newText = newText;
        this.oldText = oldText;
        // console.log("chgtaskdesctransaction");
        // console.log(this.id);
        // console.log(this.newText);
        // console.log(this.oldText);
    }
    doTransaction() {
        this.editDeskcb(this.id, this.newText, "description");
    }
    
    undoTransaction() {
        this.editDeskcb(this.id, this.oldText, "description");
    }
}