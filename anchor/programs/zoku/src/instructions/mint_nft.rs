use crate::args::MintNftArgs;
use crate::contexts::MintNftContext;
use crate::events::MintNftEvent;
use crate::states::Podcast;
use anchor_lang::prelude::*;
use anchor_spl::token::{mint_to, MintTo};

pub fn mint_nft(ctx: Context<MintNftContext>, args: MintNftArgs) -> Result<()> {
    let authority_key = &mut ctx.accounts.authority.key();
    let signer_seeds: &[&[&[u8]]] = &[&[
        Podcast::NFT_SEED_PREFIX.as_bytes(),
        args.podcast_id.as_bytes(),
        authority_key.as_ref(),
        &[ctx.bumps.mint_account],
    ]];

    mint_to(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.mint_account.to_account_info(),
                to: ctx.accounts.associated_token_account.to_account_info(),
                authority: ctx.accounts.mint_account.to_account_info(),
            },
        )
        .with_signer(signer_seeds),
        args.amount,
    )?;

    emit!(MintNftEvent {
        mint: ctx.accounts.mint_account.key(),
        to: ctx.accounts.associated_token_account.key(),
        amount: args.amount,
    });
    Ok(())
}
