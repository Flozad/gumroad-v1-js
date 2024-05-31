class ROTModel {
    private retryAttempts: number;
    private retryInterval: number;
  
    constructor(retryAttempts: number = 3, retryInterval: number = 1000) {
      this.retryAttempts = retryAttempts;
      this.retryInterval = retryInterval;
    }
  
    async executeWithRetry<T>(operation: () => Promise<T>): Promise<T> {
      let attempts = 0;
      while (attempts < this.retryAttempts) {
        try {
          return await operation();
        } catch (error) {
          if (attempts < this.retryAttempts - 1) {
            attempts++;
            await new Promise(resolve => setTimeout(resolve, attempts * this.retryInterval));
          } else {
            throw error;
          }
        }
      }
      throw new Error('Operation failed after retrying');
    }
  }
  
  export default ROTModel;
  