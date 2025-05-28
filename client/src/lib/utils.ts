import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Smooth scroll to element by ID
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 20,
      behavior: "smooth"
    });
  }
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}

// Format prompt content with markdown-like styling
export function formatPromptContent(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/##(.*?)$/gm, '<h2 class="text-2xl font-bold mb-4 text-gray-900">$1</h2>')
    .replace(/###(.*?)$/gm, '<h3 class="text-xl font-bold mb-3 text-gray-800">$1</h3>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/---/g, '<hr class="my-6 border-gray-200">');
}
