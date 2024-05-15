import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormInputValues(
  form: HTMLFormElement,
  inputNames: string[]
): Record<string, string | FileList | null> {
  const inputValues: Record<string, string | FileList | null> = {};

  inputNames.forEach((name) => {
    const input = form.elements.namedItem(name) as HTMLInputElement;

    // Check if the input exists and its type is 'file'
    if (input && input.type === "file") {
      // If the input is of type 'file', assign the file object(s) to the input value
      inputValues[name] = input.files;
    } else {
      // For other input types, assign the input value
      inputValues[name] = input ? input.value : "";
    }
  });

  return inputValues;
}

export function getFormData(
  form: HTMLFormElement,
  inputNames: string[]
): Record<string, HTMLInputElement> {
  const inputValues: Record<string, HTMLInputElement> = {};

  inputNames.forEach((name) => {
    const input = form.elements.namedItem(name) as HTMLInputElement;

    inputValues[name] = input;
  });

  return inputValues;
}

export function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`done`);
    }, seconds * 1000); // 4000 milliseconds = 4 seconds
  });
}

export function isValidUrl(url: string): boolean {
  try {
    return url?.startsWith("http://") || url?.startsWith("https://") || url?.startsWith("/");
  } catch (err) {
    console.log(err);
    return false;
  }
}

// export const getValue = (data: any[], key: string) => {
//   return data.find((d) => d.identifier == key)?.value ?? null;
// };
