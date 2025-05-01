declare namespace LuciaSDK {
  export function init(config: {
    clientId: string;
    baseURL: string;
    api_key: string;
    username?: string;
  }): void;

  export async function authenticate(): void;
  export async function userInfo(user: string, userInfo: any): void;
  export async function pageView(page: string): void;
  export async function trackConversion(event_tag: string, amount: number, event_details: any): void;
  export async function buttonClick(button: string): void;
  export async function sendWalletInfo(walletAddress: string, chainId: number): void;
  export function checkMetaMaskConnection(): boolean;
}

export default LuciaSDK;
