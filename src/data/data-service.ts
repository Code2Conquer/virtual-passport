import { User } from "./types";
import { mockUsers } from "./mock-users";

export async function getUserById(userId: string): Promise<User | null> {
  return mockUsers[userId] ?? null;
}

export async function getAllUserIds(): Promise<string[]> {
  return Object.keys(mockUsers);
}
