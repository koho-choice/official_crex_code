import { sleep } from './timeUtils';
import { isAxiosError } from './errorUtils';
import { API_CONFIG } from './config';

export async function retryOperation<T>(
  operation: () => Promise<T>,
  retries: number = API_CONFIG.MAX_RETRIES,
  delay: number = API_CONFIG.RETRY_DELAY
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0 && isAxiosError(error)) {
      console.log(`Retrying operation. Attempts remaining: ${retries - 1}`);
      await sleep(delay);
      return retryOperation(operation, retries - 1, delay);
    }
    throw error;
  }
}