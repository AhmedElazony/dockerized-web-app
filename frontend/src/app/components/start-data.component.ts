import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ApiResponse } from '../services/api.service';

@Component({
  selector: 'app-start-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>Start Data</h1>
        <button 
          class="refresh-btn" 
          (click)="loadData()" 
          [disabled]="loading()">
          {{ loading() ? 'Loading...' : 'Refresh Data' }}
        </button>
      </div>

      @if (loading()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Loading data...</p>
        </div>
      }

      @if (error()) {
        <div class="error">
          <h3>Error</h3>
          <p>{{ error() }}</p>
          <button class="retry-btn" (click)="loadData()">Try Again</button>
        </div>
      }

      @if (data() && !loading()) {
        <div class="success-message">
          <p class="message">{{ data()?.message }}</p>
        </div>
        
        <div class="data-grid">
          @for (item of data()?.data; track item.id) {
            <div class="data-card">
              <div class="card-header">
                <span class="id">ID: {{ item.id }}</span>
              </div>
              <div class="card-body">
                <h3>{{ item.name }}</h3>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e5e7eb;
    }

    h1 {
      color: #1f2937;
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
    }

    .refresh-btn, .retry-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .refresh-btn:hover:not(:disabled), .retry-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .refresh-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      color: #6b7280;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f4f6;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin: 1rem 0;
      text-align: center;
    }

    .error h3 {
      color: #dc2626;
      margin: 0 0 0.5rem 0;
    }

    .error p {
      color: #7f1d1d;
      margin-bottom: 1rem;
    }

    .success-message {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 2rem;
    }

    .message {
      color: #15803d;
      font-weight: 600;
      margin: 0;
      text-align: center;
    }

    .data-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .data-card {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid #e5e7eb;
    }

    .data-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem;
      color: white;
    }

    .id {
      font-size: 0.875rem;
      font-weight: 600;
      opacity: 0.9;
    }

    .card-body {
      padding: 1.5rem;
    }

    .card-body h3 {
      margin: 0;
      color: #1f2937;
      font-size: 1.25rem;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }

      .header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .data-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StartDataComponent implements OnInit {
  data = signal<ApiResponse | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.apiService.getStartData().subscribe({
      next: (response) => {
        this.data.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.error.set('Failed to fetch data from the server. Please try again.');
        this.loading.set(false);
      }
    });
  }
}
