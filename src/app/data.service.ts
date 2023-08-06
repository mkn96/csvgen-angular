import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  async fetchDataFromAPI(apiUrl: string): Promise<any> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    return response.json();
  } catch (error) {
    throw error; // rethrow the original error
  }
}
}
