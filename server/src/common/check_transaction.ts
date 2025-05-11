import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { ProgramService } from '../program/program.service';

interface TransferDetail {
  type: 'SOL' | 'SPL';
  amount: number;
  mint?: string;
}

export const check_transaction = async (
  txHash: string,
  programService: ProgramService,
) => {
  const tx =
    await programService.program.provider.connection.getParsedTransaction(
      txHash,
      {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0,
      },
    );
  if (!tx) throw new Error('Transaction not found');
  return tx;
};

export const getTransferAmountAndTokenType = (
  tx: ParsedTransactionWithMeta,
): TransferDetail[] => {
  const result: TransferDetail[] = [];

  if (!tx.meta) {
    return result;
  }

  const { preBalances, postBalances, fee } = tx.meta;
  if (
    preBalances &&
    postBalances &&
    preBalances.length > 0 &&
    postBalances.length > 0
  ) {
    const delta = preBalances[0] - postBalances[0];
    const solTransferred = delta > fee ? delta - fee : 0;
    if (solTransferred > 0) {
      result.push({
        type: 'SOL',
        amount: solTransferred / 1e9,
      });
    }
  }

  const preTokens = tx.meta.preTokenBalances || [];
  const postTokens = tx.meta.postTokenBalances || [];

  const preMap = new Map<number, (typeof preTokens)[0]>();
  for (const token of preTokens) preMap.set(token.accountIndex, token);

  for (const post of postTokens) {
    const pre = preMap.get(post.accountIndex);
    const preAmount = pre ? parseFloat(pre.uiTokenAmount.amount) : 0;
    const postAmount = parseFloat(post.uiTokenAmount.amount);
    const delta = postAmount - preAmount;
    if (delta !== 0) {
      result.push({
        type: 'SPL',
        mint: post.mint,
        amount: delta / 10 ** post.uiTokenAmount.decimals,
      });
    }
  }

  return result;
};
