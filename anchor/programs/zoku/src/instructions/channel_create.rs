
use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, metadata::{create_master_edition_v3, create_metadata_accounts_v3, mpl_token_metadata::types::DataV2, CreateMasterEditionV3, CreateMetadataAccountsV3, Metadata}, token::{mint_to, Mint, MintTo, Token, TokenAccount}};

use crate::{ChannelArgs, ChannelData};



pub fn channel_create(ctx: Context<ChannelCreate>, args:ChannelArgs) -> Result<()>{

    let unique_key_bytes = args.id.to_string().into_bytes();
    let title_bytes = args.title.to_string().into_bytes();
    let singer_seeds: &[&[&[u8]]] = &[&[
        ChannelData::SEED_PREFIX.as_bytes(),
        &unique_key_bytes,
        &title_bytes,
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
            name: args.title.to_string(),
            symbol: args.title.to_string(),
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
                to: ctx.accounts.channel_associated_token_account.to_account_info(),
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
            ChannelData::SEED_PREFIX.as_bytes(),
            &args.id.to_string().as_bytes(),
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
            ChannelData::SEED_PREFIX.as_bytes(),
        ],
        bump,
    )]

    pub channel_info_account: Box<Account<'info, ChannelData>>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = channel_mint_account,
        associated_token::authority = authority,
    )]
    pub channel_associated_token_account: Box<Account<'info, TokenAccount>>,


    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,

    pub token_metadata_program: Program<'info, Metadata>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub rent: Sysvar<'info, Rent>,


}