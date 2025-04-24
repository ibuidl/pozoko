use anchor_lang::{prelude::*, solana_program::{program::invoke, stake::state::Meta, system_instruction}};
use anchor_spl::{associated_token::AssociatedToken
    , metadata::{create_master_edition_v3, create_metadata_accounts_v3, mpl_token_metadata::types::{Creator, DataV2}, update_metadata_accounts_v2, CreateMasterEditionV3, CreateMetadataAccountsV3, Metadata, MetadataAccount, UpdateMetadataAccountsV2}
, token::{mint_to, transfer, Mint, MintTo, Token, TokenAccount, Transfer}};
use crate::{ChannelInfo, PodCastError, SubscribeArgs};

pub fn channel_subscribe(ctx: Context<ChannelSbscribe>, args:SubscribeArgs) -> Result<()>{
    //check the remaining quantity of minted tokens.
    let supply = ctx.accounts.channel_mint_account.supply;
    let channel_info_account = &mut ctx.accounts.channel_info_account;
    //if nft have supply, free mint
    if supply > 0 {
        transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer{
                    from: ctx.accounts.creator_ata.to_account_info(),
                    to: ctx.accounts.listener_ata.to_account_info(),
                    authority: ctx.accounts.creator.to_account_info(),
                },
            ),
            1,
        )?;
    }
    channel_info_account.follow += 1;

    Ok(())
}


#[derive(Accounts)]
#[instruction(args:SubscribeArgs)]
pub struct ChannelSbscribe<'info>{

    #[account()]
    pub creator: AccountInfo<'info>,

    #[account(
        mut,
        seeds = [
            ChannelInfo::SEED_PREFIX.as_bytes(),
            &args.channel_title.to_string().as_bytes(),
            &args.channnel_create_at.to_string().as_bytes(),
            creator.key().as_ref(),
        ],
        bump,
    )]

    pub channel_info_account: Box<Account<'info, ChannelInfo>>,

    #[account(
        mut,
        seeds=[
            ChannelInfo::SEED_PREFIX.as_bytes(),
            channel_info_account.key().as_ref(),
            creator.key().as_ref(),
        ],
        bump
    )]
    pub channel_mint_account: Box<Account<'info, Mint>>,

    #[account(
        mut,
        associated_token::mint = channel_mint_account,
        associated_token::authority = creator.key(),
    )]
    pub creator_ata: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = listener,
        associated_token::mint = channel_mint_account,
        associated_token::authority = listener,
    )]
    pub listener_ata: Box<Account<'info, TokenAccount>>,


    #[account(mut)]
    pub listener: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub token_metadata_program: Program<'info, Metadata>,
}