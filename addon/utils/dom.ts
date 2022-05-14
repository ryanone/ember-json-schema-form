import { guidFor } from '@ember/object/internals';

export function createDomId(obj: unknown): string {
  return guidFor(obj);
}
