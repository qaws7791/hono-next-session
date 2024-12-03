import { argon2id, argon2Verify } from "hash-wasm";

const HASH_OPTIONS = {
  parallelism: 1,
  iterations: 2,
  memorySize: 19456,
  hashLength: 32,
  outputType: "encoded",
} as const;

export const hashPassword = (password: string): Promise<string> => {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);

  return argon2id({
    password,
    salt,
    ...HASH_OPTIONS,
  });
};

export const verifyPassword = (hash: string, password: string) => {
  return argon2Verify({
    password,
    hash,
  });
};
