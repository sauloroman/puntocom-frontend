export function extractIdFromPath(filePath: string): string | null {
  const parts = filePath.split("/");
  const filename = parts[parts.length - 1]; 

  const id = filename.replace(/\.pdf$/i, ""); 
  return id || null;
}