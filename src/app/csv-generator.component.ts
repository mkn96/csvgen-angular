import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-csv-generator',
  template: `
    <button (click)="handleDownloadCSV()">Download Report</button>
  `,
})
export class CsvGeneratorComponent {
  private jsonData: any[] = []; // init as an empty array
  private apiURL = 'https://jsonplaceholder.typicode.com/posts'; // replace

  constructor(private dataService: DataService) {}

  async handleDownloadCSV(): Promise<void> {
    if (this.jsonData.length === 0) { // check if jsonData is empty array
      try {
        this.jsonData = await this.dataService.fetchDataFromAPI(this.apiURL);
      } catch (error) {
        console.error(error);
        return;
      }
    }

    try {
      const csvContent = this.convertToCSV(this.jsonData);
      this.downloadCSVFile(csvContent, 'data.csv');
      console.log('CSV file downloaded successfully');
    } catch (error) {
      console.error('Failed to download CSV file', error);
    }
  }

  private downloadCSVFile(csvContent: string, filename: string) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);

    // simulate click
    link.click();

    // Clean up the URL object after download
    URL.revokeObjectURL(url);
  }

  private convertToCSV(data: any[]): string {
    const headers = Object.keys(data[0]);
    const rows = data.map((item) =>
      headers.map((header) => this.escapeCSVValue(item[header]))
    );

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    return csvContent;
  }

  private escapeCSVValue(value: any): string {
    if (typeof value === 'string') {
      value = value.replace(/"/g, '""');
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        value = `"${value}"`;
      }
    }
    return String(value);
  }
}
