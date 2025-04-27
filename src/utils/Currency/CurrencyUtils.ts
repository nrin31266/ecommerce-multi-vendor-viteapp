export class CurrencyUtils {
   
  
    
    static formatVNDCurrency(amount: number | string): string {
      const numericAmount = typeof amount === 'string' ? parseInt(amount) : amount;
      if (isNaN(numericAmount)) return '₫0';
      return '₫' + numericAmount.toLocaleString('vi-VN');
    }
  }
  