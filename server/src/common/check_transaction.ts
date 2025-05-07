import { ProgramService } from '../program/program.service';

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
