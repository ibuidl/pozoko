import { useZokuProgram } from '@/hooks/dev/program';
import { Keypair } from '@solana/web3.js';

export function ZokuProgramCreate() {
  const { initialize } = useZokuProgram();

  return (
    <button
      className="btn btn-xs lg:btn-md btn-primary"
      onClick={() => initialize.mutateAsync(Keypair.generate())}
      disabled={initialize.isPending}
    >
      Create {initialize.isPending && '...'}
    </button>
  );
}
