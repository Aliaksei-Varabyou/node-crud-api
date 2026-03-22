import z from "zod";

export function hasStatusCode(error: unknown): error is {statusCode: number} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof (error as {statusCode?: unknown}).statusCode === 'number'
  )
}

export function isUUID(id: string): boolean {
  const UUIDSchema = z.uuid();
  return UUIDSchema.safeParse(id).success;
}
