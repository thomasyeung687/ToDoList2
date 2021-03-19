import { jsTPS_Transaction } from "./jsTPS"

export default class DeleteTask_Transaction extends jsTPS_Transaction{
    constructor(addItemcb, removeItemcb, listToRemove){
        super();
        this.addItemcb = addItemcb;
        this.removeItemcb = removeItemcb;
        this.listToRemove = listToRemove;
        this.listToRemoveid = listToRemove.id;
    }
    doTransaction() {
        // console.log("deleting listitem id="+this.id);
        // this.oldListItem = this.model.currentList.getItemAtIndex(this.model.currentList.getIndexOfItemById(this.id)); //getting item we are about to remove and saving it
        // console.log(this.oldListItem);
        // this.oldIndex = this.model.currentList.removeItemByID(this.id); //oldDueDates
        // console.log(this.oldIndex);
        // this.view.viewList(this.model.currentList);
        this.index = this.removeItemcb(this.listToRemove.id);
        console.log("dtt index to remove:" +this.index);
    }
    
    undoTransaction() {
        // this.model.currentList.addItemAtIndex(this.oldListItem, this.oldIndex);
        // console.log(this.model.currentList);
        // this.view.viewList(this.model.currentList);
        // console.log(this.model.currentList);
        this.addItemcb(this.listToRemove, this.index);
    }
}