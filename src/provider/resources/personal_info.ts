import { OuraAuth } from '../oura_connection.js';

interface PersonalInfo {
  age: number;
  weight: number;
  height: number;
  biological_sex: string;
  email: string;
}

export async function fetchPersonalInfo(auth: OuraAuth): Promise<PersonalInfo> {
  const headers = await auth.getHeaders();
  const response = await fetch(`${auth.getBaseUrl()}/usercollection/personal_info`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch personal info: ${response.statusText}`);
  }

  return response.json();
} 