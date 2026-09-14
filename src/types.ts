export interface TokenLaunchEvent {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  deployerAddress: string;
  blockNumber: number;
  initialTax: number;
  decayMs: number;
  timestamp: string;
  status: 'pending' | 'armed' | 'sniped' | 'skipped';
  score: number;
}

export interface FeeRecipient {
  wallet: string;
  launches: number;
  graduated: number;
  deployedSelf: string | boolean;
  claimedEth: string;
  lastSeen: string;
  statusColor: 'red' | 'yellow' | 'emerald' | 'gray';
  tags?: string[];
  totalVolume?: string;
  flaggedNotes?: string;
}

export interface NodeStatus {
  city: string;
  code: string;
  latencyMs: number;
  status: 'ACTIVE' | 'SYNCING';
}

export interface ExitScenario {
  amount: number;
  keptPercentage: number;
  dollarKept: number;
  slippagePct: number;
  warningLevel: 'safe' | 'caution' | 'danger';
}
