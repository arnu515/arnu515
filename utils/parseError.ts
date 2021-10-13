export interface ParsedError {
  name: string;
  description: string;
}

export default function parseError(errorObj: Record<string, any>): ParsedError {
  if (Array.isArray(errorObj.errors)) {
    errorObj.error_description = errorObj.errors.map(i => i.message).join("\n");
    errorObj.name ??= "Error";
  }
  return {
    name: errorObj.error || errorObj.name || "Unexpected error",
    description:
      errorObj.error_description || errorObj.message || "An unkown error occured"
  };
}
