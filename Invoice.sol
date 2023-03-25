// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

contract InvoiceContract {
    
    struct Invoice {
        uint256 invoiceID;
        address fromWallet;
        address toWallet;
        uint256 generatedTime;
        uint256 paidTime;
        uint256 amount;
        address currency;
        bool paid;
        bool active;
    }
    
    mapping (uint256 => Invoice) invoices;
    
    function createInvoice(
        uint256 invoiceID, 
        address fromWallet, 
        address toWallet, 
        uint256 amount,
        address currency
    ) public {
        invoices[invoiceID] = Invoice(
            invoiceID, 
            fromWallet, 
            toWallet, 
            block.timestamp,
            0,
            amount,
            currency,
            false,
            true
        );
    }
    
    function payInvoice(uint256 invoiceID) public {
        require(invoices[invoiceID].active == true, "Invoice does not exist.");
        require(invoices[invoiceID].paid == false, "Invoice has already been paid.");
        invoices[invoiceID].paid = true;
        invoices[invoiceID].paidTime = block.timestamp;
    }
    
    function deactivateInvoice(uint256 invoiceID) public {
        require(invoices[invoiceID].active == true, "Invoice does not exist.");
        invoices[invoiceID].active = false;
    }
}

