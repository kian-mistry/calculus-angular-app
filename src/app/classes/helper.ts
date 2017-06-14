import { Queue } from 'typescript-collections';

export class Helper {

	/**
	 * Converts an array into a queue.
	 * 
	 * @param arr The array to retrieve the data from.
	 * @return A queue that lists all the data from the array.
	 */
	public static arrayToQueue<T>(arr: Array<T>): Queue<T> {
		if(arr.length > 0) {
			let queue = new Queue<T>();

			for(let i: number = 0; i < arr.length; i++) {
				queue.enqueue(arr[i]);
			}

			return queue;
		}

		return null;
	}

	/**
	 * Inserts a string into a string.
	 * 
	 * @param index The location where the new string is to be inserted.
	 * @param currentString The string to be amended.
	 * @param newString The value to be inserted into the string.
	 * 
	 * @return A new string with the inserted value.
	 */
	public static splice(index: number, currentString: string, newString): string {
		return currentString.slice(0, index) + newString + currentString.slice(index);
	}

}