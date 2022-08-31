import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
export async function HashCrypto(password: string): Promise<string> {
  return await bcrypt.hash(password, saltOrRounds);
}

export async function HashCompare(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
