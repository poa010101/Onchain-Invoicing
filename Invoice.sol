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
        string transactionID;
    }
    
    uint256 public largestInvoiceID = 0;
    Invoice[] public invoices;

    
    function createInvoice(
        address fromWallet, 
        address toWallet, 
        uint256 amount,
        address currency,
        string memory POnumber
    ) public {
        largestInvoiceID++;
        invoices.push(Invoice(
            largestInvoiceID, 
            fromWallet, 
            toWallet, 
            block.timestamp,
            0,
            amount,
            currency,
            POnumber,
            false,
            true,
            ""
        ));
        
        if (invoices.length > 10000) {
            removeFirstInvoice();
        }
    }
    
    function payInvoice(uint256 invoiceID, string memory transactionID) public {
        require(invoices[invoiceID-1].active == true, "Invoice does not exist.");
        require(invoices[invoiceID-1].paid == false, "Invoice has already been paid.");
        invoices[invoiceID-1].paid = true;
        invoices[invoiceID-1].paidTime = block.timestamp;
        invoices[invoiceID - 1].transactionID = transactionID;
    }
    
    function deactivateInvoice(uint256 invoiceID) public {
        require(invoices[invoiceID - 1].active == true, "Invoice does not exist.");
        invoices[invoiceID - 1].active = false;
    }
    
    /*
    function getUnpaidInvoice(address toWallet) public view returns (Invoice[] memory) {
        uint256 resultCount = 0;
        Invoice[] memory results = new Invoice[](100);
        for (uint256 i = invoices.length - 1; i >= 0 && resultCount < 100; i--) {
            if (invoices[i].toWallet == toWallet && !invoices[i].paid && invoices[i].active) {
                results[resultCount] = invoices[i];
                resultCount++;
            }
        }
        return results;
    }
    
    function getPaidInvoice(address fromWallet) public view returns (Invoice[] memory) {
        uint256 resultCount = 0;
        Invoice[] memory results = new Invoice[](100);
        for (uint256 i = invoices.length - 1; i >= 0 && resultCount < 100; i--) {
            if (invoices[i].fromWallet == fromWallet && invoices[i].paid && invoices[i].active) {
                results[resultCount] = invoices[i];
                resultCount++;
            }
        }
        return results;
    }
    
    function getGeneratedInvoice(address fromWallet) public view returns (Invoice[] memory) {
        uint256 resultCount = 0;
        Invoice[] memory results = new Invoice[](100);
        for (uint256 i = invoices.length - 1; i > =0 && resultCount < 100; i--) {
            if (invoices[i].fromWallet == fromWallet) {
                results[resultCount] = invoices[i];
                resultCount++;
            }
        }
        return results;
    }
    */
    
    function removeFirstInvoice() internal {
        for (uint256 i = 0; i < invoices.length - 1; i++) {
            invoices[i] = invoices[i + 1];
        }
        invoices.pop();
    }

    function getInvoiceByID(uint256 invoiceID) public view returns (Invoice memory) {
        require(invoiceID > 0 && invoiceID <= invoices.length, "Invalid invoice ID");
        return invoices[invoiceID - 1];
    }

    function getLargestInvoiceID() public view returns (uint256) {
        
        return largestInvoiceID;
    }

   function getInvoicebyPage(uint256 pageNumber) public view returns (Invoice[] memory) {
        uint256 pageSize = 1000;
        uint256 startIndex = (pageNumber - 1) * pageSize;
        uint256 endIndex = startIndex + pageSize;
        uint256 totalInvoices = invoices.length;

        if (startIndex >= totalInvoices) {
            return new Invoice[](0);
        }

        if (endIndex > totalInvoices) {
            endIndex = totalInvoices;
        }

        uint256 resultLength = endIndex - startIndex;
        Invoice[] memory result = new Invoice[](resultLength);

        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = invoices[i];
        }

        return result;
    }

    function getAllInvoice() public view returns (Invoice[] memory) {
        return invoices;
    }

}
