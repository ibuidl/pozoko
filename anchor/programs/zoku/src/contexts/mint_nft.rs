use crate::args::MintNftArgs;
use crate::states::Podcast;
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

#[derive(Accounts)]
#[instruction(args: MintNftArgs)]
pub struct MintNftContext<'info> {
    #[account(
        mut,
        seeds = [
            Podcast::NFT_SEED_PREFIX.as_bytes(),
            args.podcast_id.as_bytes(),
            authority.key().as_ref(),
        ],
        bump,
    )]
    pub mint_account: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = mint_account,
        associated_token::authority = authority,
    )]
    pub associated_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}
