import { z } from 'zod';

export interface OuraTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export class OuraAuth {
  private baseUrl = 'https://api.ouraring.com/v2';
  private tokens: OuraTokens;

  constructor(personalAccessToken?: string, clientId?: string, clientSecret?: string, redirectUri?: string) {
    if (personalAccessToken) {
      this.tokens = {
        accessToken: personalAccessToken
      };
    } else if (clientId && clientSecret) {
      // Store OAuth credentials for later use
      this.tokens = {
        accessToken: '',
        refreshToken: '',
        expiresAt: 0
      };
    } else {
      throw new Error('Either personal access token or OAuth credentials must be provided');
    }
  }

  async getHeaders(): Promise<Record<string, string>> {
    if (!this.tokens.accessToken) {
      throw new Error('Not authenticated');
    }

    // For OAuth tokens, check expiration and refresh if needed
    if (this.tokens.expiresAt && this.tokens.expiresAt <= Date.now()) {
      await this.refreshTokens();
    }

    return {
      'Authorization': `Bearer ${this.tokens.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  private async refreshTokens(): Promise<void> {
    if (!this.tokens.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('https://api.ouraring.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.tokens.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const data = await response.json();
    this.tokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
} 