import { Transform } from 'class-transformer';
export const IsDefault = (defaultValue: any) => {
  return Transform(({ value }: any) => {
    if (value) return parseInt(value);
    return defaultValue;
  });
};
