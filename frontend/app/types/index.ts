/**
 * TypeScript Type Definitions
 */

export interface ScrapeResult {
  url: string;
  found: boolean;
  has_traditional_auth: boolean;
  has_oauth: boolean;
  traditional_auth_html?: string;
  oauth_html?: string;
  error?: string;
  explanation?: string;
  scrape_success: boolean;
  html_size?: number;
}

export interface Example {
  site_name: string;
  url: string;
  found: boolean;
  has_traditional_auth: boolean;
  has_oauth: boolean;
  scrape_success: boolean;
  explanation: string;
  traditional_auth_html?: string;
  oauth_html?: string;
  error?: string;
}

export type AuthType = 'oauth' | 'traditional' | 'none';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
export type ButtonSize = 'small' | 'medium' | 'large';

export type BadgeVariant = 'oauth' | 'traditional' | 'none' | 'success' | 'error' | 'warning';
