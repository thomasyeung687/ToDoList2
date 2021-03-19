import { jsTPS_Transaction } from "./jsTPS"

export default class ChgTaskDate_Transaction extends jsTPS_Transaction{
    constructor(editDatecb, listItemId, newText, oldText){
        super();
        this.editDatecb = editDatecb;
        this.id = listItemId;
        this.newText = newText;
        this.oldText = oldText;
        // console.log("chgtaskdesctransaction");
        // console.log(this.id);
        // console.log(this.newText);
        // console.log(this.oldText);
    }
    doTransaction() {
        this.editDatecb(this.id,this.newText, "due_date");
    }
    
    undoTransaction() {
        this.editDatecb(this.id, this.oldText, "due_date");
    }
}