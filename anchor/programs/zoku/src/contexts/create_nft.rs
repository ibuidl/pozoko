use crate::args::CreateNftArgs;
use crate::states::Podcast;
use anchor_lang::prelude::*;
use anchor_spl::{
    metadata::Metadata,
    token::{Mint, Token},
};

#[derive(Accounts)]
#[instruction(args: CreateNftArgs)]
pub struct CreateNftContext<'info> {
    #[account(
        mut,
        seeds = [
            Podcast::SEED_PREFIX.as_bytes(),
            args.podcast_id.as_bytes(),
            authority.key().as_ref(),
        ],
        bump,
    )]
    pub podcast_account: Account<'info, Podcast>,

    /// CHECK
    #[account(
        mut,
        seeds = [
            b"metadata",
            token_metadata_program.key().as_ref(),
            mint_account.key().as_ref()
        ],
        bump,
        seeds::program = token_metadata_program.key(),
    )]
    pub metadata_account: UncheckedAccount<'info>,

    #[account(
        init_if_needed,
        payer = authority,
        seeds = [
            Podcast::NFT_SEED_PREFIX.as_bytes(),
            args.podcast_id.as_bytes(),
            authority.key().as_ref(),
        ],
        bump,
        mint::decimals = 0,
        mint::authority = mint_account.key(),
    )]
    pub mint_account: Account<'info, Mint>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub token_metadata_program: Program<'info, Metadata>,

    pub rent: Sysvar<'info, Rent>,
}
