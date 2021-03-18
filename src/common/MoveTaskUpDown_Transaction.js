'use strict'

import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class MoveTaskUpDown_Transaction extends jsTPS_Transaction{
    constructor(initModel, listItemId, action){ //action will be 'up' to indicate move task up or 'down to indicate move task down.
        super();
        this.model = initModel;
        this.id = listItemId;
        this.action = action; //newStatus
        this.undoaction = action == 'up' ? 'down' : 'up'; //if action is up, then undoaction should be down and vice versa
    }
    doTransaction() {
        this.moved = this.model.modifyTaskPosition(this.id, this.action);
    }
    
    undoTransaction() {
        if(this.moved == 1){
            this.model.modifyTaskPosition(this.id, this.undoaction);
        }
        //if out here then calling modifyTaskPosition didnt actually movePostion of list item so we wouldnt want to do the reverse of it.
    }
}