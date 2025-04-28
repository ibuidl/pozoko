use anchor_lang::{prelude::*, solana_program::{program::invoke, stake::state::Meta, system_instruction}};
use anchor_spl::{associated_token::AssociatedToken
    , metadata::{create_master_edition_v3, create_metadata_accounts_v3, mpl_token_metadata::types::{Creator, DataV2}, update_metadata_accounts_v2, CreateMasterEditionV3, CreateMetadataAccountsV3, Metadata, MetadataAccount, UpdateMetadataAccountsV2}
, token::{mint_to, transfer, Mint, MintTo, Token, TokenAccount, Transfer}};
use crate::{ChannelInfo, PodCastError, SubscribeArgs};

pub fn channel_subscribe(ctx: Context<ChannelSbscribe>) -> Result<()>{
    //check the remaining quantity of minted tokens.
    let supply = ctx.accounts.channel_mint_account.supply;
    //if nft have supply, free mint
    if supply > 0 {
        transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer{
                    from: ctx.accounts.creator_ata.to_account_info(),
                    to: ctx.accounts.listener_ata.to_account_info(),
                    authority: ctx.accounts.nft_manager.to_account_info(),
                },
            ),
            1,
        )?;
    }
    Ok(())
}


#[derive(Accounts)]
pub struct ChannelSbscribe<'info>{

    #[account(
        mut,
    )]
    pub channel_mint_account: Box<Account<'info, Mint>>,

    #[account(
        mut,
    )]
    pub creator_ata: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = listener,
        associated_token::mint = channel_mint_account,
        associated_token::authority = listener,
    )]
    pub listener_ata: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds = [
            b"nft_manager", 
            channel_mint_account.key().as_ref()],
        bump,
    )]
    /// CHECK: This account is a PDA used to manage NFT-related operations.
    /// It is validated through seeds and bump, and its ownership is checked.
    /// The PDA is derived using the seeds and bump, ensuring it is the correct account.
    pub nft_manager: AccountInfo<'info>,


    #[account(mut)]
    pub listener: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub token_metadata_program: Program<'info, Metadata>,
}