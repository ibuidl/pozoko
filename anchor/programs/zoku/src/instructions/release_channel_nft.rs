
use anchor_lang::prelude::*;
use anchor_spl::{associated_token::{AssociatedToken}, metadata::{create_master_edition_v3, create_metadata_accounts_v3, mpl_token_metadata::types::DataV2, CreateMasterEditionV3, CreateMetadataAccountsV3, Metadata}, token::{mint_to, Mint, MintTo, Token, TokenAccount}};

use crate::{ChannelArgs, ChannelInfo, PodCastError};



pub fn release_channel_nft(ctx: Context<ReleaseChannelnft>, args:ChannelArgs) -> Result<()>{
    //check balance
    require!(
        ctx.accounts.authority.lamports() >= ChannelInfo::MIN_BALANCE,
        PodCastError::NoEnoughBalance,
    );

    let channel_info_account = ctx.accounts.channel_info_account.key();
    let authority = ctx.accounts.authority.key();
    let singer_seeds: &[&[&[u8]]] = &[&[
        ChannelInfo::SEED_PREFIX.as_bytes(),
        channel_info_account.as_ref(),
        authority.as_ref(),
        &[ctx.bumps.channel_mint_account],
    ]];
    create_metadata_accounts_v3(
        CpiContext::new_with_signer(
            ctx.accounts.token_metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                metadata: ctx.accounts.metadata_account.to_account_info(),
                mint: ctx.accounts.channel_mint_account.to_account_info(),
                mint_authority: ctx.accounts.authority.to_account_info(),
                update_authority: ctx.accounts.authority.to_account_info(),
                payer: ctx.accounts.authority.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
            singer_seeds,
        ),
        DataV2 {
            name: args.channel_title.to_string(),
            symbol: args.channel_title.to_string(),
            uri: args.image.to_string(),
            seller_fee_basis_points: 0,
            creators: None,
            collection: None,
            uses: None,
        },
        false, // Is mutable
        true,  // Update authority is signer
        None,  // Collection details
    )?;

    mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo{
                mint: ctx.accounts.channel_mint_account.to_account_info(),
                to: ctx.accounts.creator_ata.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            },
            singer_seeds,
        ),
        10000,
    )?;

    //available in limited quantities
    create_master_edition_v3(
        CpiContext::new_with_signer(
            ctx.accounts.token_metadata_program.to_account_info(),
            CreateMasterEditionV3 {
                edition: ctx.accounts.master_edition_account.to_account_info(),
                payer: ctx.accounts.authority.to_account_info(),
                mint: ctx.accounts.channel_mint_account.to_account_info(),
                metadata: ctx.accounts.metadata_account.to_account_info(),
                mint_authority: ctx.accounts.authority.to_account_info(),
                update_authority: ctx.accounts.authority.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                token_program: ctx.accounts.token_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
            singer_seeds,
        ),
        Some(10000),
    )?;

    //set channel info into pda account
    let channel_info = args.create_channel_data(ctx.accounts.authority.key());
    ctx.accounts.channel_info_account.set_inner(channel_info.clone());

    Ok(())
}


#[derive(Accounts)]
#[instruction(args:ChannelArgs)]
pub struct ReleaseChannelnft<'info>{

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
    pub master_edition_account: AccountInfo<'info>,

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
    pub metadata_account: AccountInfo<'info>,

    
    #[account(
        init_if_needed,
        payer = authority,
        mint::decimals=0,
        mint::authority = authority,
        mint::freeze_authority = authority,
        seeds=[
            ChannelInfo::SEED_PREFIX.as_bytes(),
            channel_info_account.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump
    )]
    pub channel_mint_account: Box<Account<'info, Mint>>,

    #[account(
        mut,
        seeds = [
            ChannelInfo::SEED_PREFIX.as_bytes(),
            &args.channel_title.to_string().as_bytes(),
            args.channel_create_at.to_string().as_bytes(),
            authority.key().as_ref(),
        ],
        bump,
    )]
    pub channel_info_account: Box<Account<'info, ChannelInfo>>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = channel_mint_account,
        associated_token::authority = authority,
    )]
    pub creator_ata: Box<Account<'info, TokenAccount>>,


    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,

    pub token_metadata_program: Program<'info, Metadata>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub rent: Sysvar<'info, Rent>,


}