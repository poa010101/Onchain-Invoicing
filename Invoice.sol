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
        string POnumber;
        bool paid;
        bool active;
    }
    
    Invoice[] public invoices;
    
    function createInvoice(
        address fromWallet, 
        address toWallet, 
        uint256 amount,
        address currency,
        string memory POnumber
    ) public {
        invoices.push(Invoice(
            invoices.length + 1, 
            fromWallet, 
            toWallet, 
            block.timestamp,
            0,
            amount,
            currency,
            POnumber,
            false,
            true
        ));
        
        if (invoices.length > 10000) {
            removeFirstInvoice();
        }
    }
    
    function payInvoice(uint256 invoiceID) public {
        require(invoices[invoiceID - 1].active == true, "Invoice does not exist.");
        require(invoices[invoiceID - 1].paid == false, "Invoice has already been paid.");
        invoices[invoiceID - 1].paid = true;
        invoices[invoiceID - 1].paidTime = block.timestamp;
    }
    
    function deactivateInvoice(uint256 invoiceID) public {
        require(invoices[invoiceID - 1].active == true, "Invoice does not exist.");
        invoices[invoiceID - 1].active = false;
    }
    
    function getUnpaidInvoice(address toWallet, uint256 x) public view returns (Invoice[] memory) {
        uint256 resultCount = 0;
        Invoice[] memory results = new Invoice[](x);
        for (uint256 i = invoices.length - 1; i >= 0 && resultCount < x; i--) {
            if (invoices[i].toWallet == toWallet && !invoices[i].paid) {
                results[resultCount] = invoices[i];
                resultCount++;
            }
        }
        return results;
    }
    
    function getPaidInvoice(address fromWallet, uint256 x) public view returns (Invoice[] memory) {
        uint256 resultCount = 0;
        Invoice[] memory results = new Invoice[](x);
        for (uint256 i = invoices.length - 1; i >= 0 && resultCount < x; i--) {
            if (invoices[i].fromWallet == fromWallet && invoices[i].paid) {
                results[resultCount] = invoices[i];
                resultCount++;
            }
        }
        return results;
    }
    
    function getGeneratedInvoice(address fromWallet, uint256 x) public view returns (Invoice[] memory) {
        uint256 resultCount = 0;
        Invoice[] memory results = new Invoice[](x);
        for (uint256 i = invoices.length - 1; i >= 0 && resultCount < x; i--) {
            if (invoices[i].fromWallet == fromWallet) {
                results[resultCount] = invoices[i];
                resultCount++;
            }
        }
        return results;
    }
    
    function removeFirstInvoice() internal {
        for (uint256 i = 0; i < invoices.length - 1; i++) {
            invoices[i] = invoices[i + 1];
        }
        invoices.pop();
    }
}


