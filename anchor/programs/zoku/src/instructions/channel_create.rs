
use anchor_lang::prelude::*;
use anchor_spl::{metadata::Metadata, token::{Mint, Token}};

use crate::{state::ChannelNft, ChannelArgs, ChannelData};



pub fn channel_create(ctx: Context<ChannelCreate>, args:ChannelArgs) -> Result<()>{

    Ok(())
}


#[derive(Accounts)]
#[instruction(args:ChannelArgs)]
pub struct ChannelCreate<'info>{

    #[account(
        mut,
        seeds = [
            b"metadata".as_ref(),
            token_metadata_program.key().as_ref(),
            channel_mint_account.key().as_ref(),
            b"edition".as_ref(),
        ],
        bump,
        seeds::program = token_metadata_program.key()
    )]
    /// CHECK:
    pub master_edition_account: UncheckedAccount<'info>,

    #[account(
        mut,
        seeds = [
            b"metadata".as_ref(),
            token_metadata_program.key().as_ref(),
            channel_mint_account.key().as_ref(),
        ],
        bump,
        seeds::program = token_metadata_program.key()
    )]
    /// CHECK: Validate address by deriving pda
    pub metadata_account: UncheckedAccount<'info>,

    
    #[account(
        init,
        payer = authority,
        mint::decimals=0,
        mint::authority = authority,
        mint::freeze_authority = authority,
        seeds=[
            ChannelNft::SEED_PREFIX.as_bytes(),
            &args.order.to_string().as_bytes(),
            &args.title.to_string().as_bytes(),
        ],
        bump
    )]
    pub channel_mint_account: Box<Account<'info, Mint>>,

    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + ChannelData::INIT_SPACE,
        seeds = [
            channel_mint_account.key().as_ref(),
            ChannelNft::SEED_PREFIX.as_bytes(),
        ],
        bump,
    )]

    pub channel_info: Box<Account<'info, ChannelData>>,



    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,

    pub token_metadata_program: Program<'info, Metadata>,

}