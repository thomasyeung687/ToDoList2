import React, { memo } from 'react'
import {jsTPS_Transaction} from './jsTPS'

//similar to hw 1 removing the item fromt he actual list and then set that as the new list. 
//constructor. this.listitem.id
//have the variables to hold the values of the
//this.model.remove item.
export default class deleteRowTransaction extends jsTPS_Transaction{
    /**
     * This method is called by jTPS when a transaction is executed.
     */
    doTransaction() {
        console.log("doTransaction - MISSING IMPLEMENTATION");
    }
    
    /**
     * This method is called by jTPS when a transaction is undone.
     */
    undoTransaction() {
        console.log("undoTransaction - MISSING IMPLEMENTATION");
    }
}
