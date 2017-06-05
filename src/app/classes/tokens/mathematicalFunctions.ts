export interface IMathematicalFunction {
	evaluate(): number;
	toString(): string;
}

export class MathsFn {

	/**
	 * Checks whether an object implements IMathematicalFunction.
	 * 
	 * @param obj The object to check.
	 * @return True if the object implements IMathematicalFunction.
	 */
	public static isMathematicalFunction(obj: any): obj is IMathematicalFunction {
		if(typeof obj !== 'object') {
			return false;
		}
		
		return ("evaluate" in obj) && ("toString" in obj);
	}
}