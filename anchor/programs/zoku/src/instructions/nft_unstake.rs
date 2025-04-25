use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, metadata::{mpl_token_metadata::{accounts::Metadata as MPLMetadata, types::{Creator, DataV2}}, update_metadata_accounts_v2, Metadata, UpdateMetadataAccountsV2}, token::{mint_to, transfer, Mint, MintTo, Token, TokenAccount, Transfer}};

use crate::{state::StakeInfo, PodCastError};

pub fn stake(ctx:Context<NftUnStake>)->Result<()>{
    let nft_amount = ctx.accounts.stake_info_account.amount;
    require!(
        nft_amount >= 1,
        PodCastError::NoStake,
    );
    let channel_mint_account = ctx.accounts.channel_mint_account.key();
    let user = ctx.accounts.user.key();
    let singer_seeds: &[&[&[u8]]] = &[&[
        StakeInfo::SEED_PREFIX.as_bytes(),
        channel_mint_account.as_ref(),
        user.as_ref(),
        &[ctx.bumps.stake_info_account],
    ]];
    //unstake mint
    transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer{
                from: ctx.accounts.program_receipt_nft_ata.to_account_info(),
                to: ctx.accounts.user_ata.to_account_info(),
                authority: ctx.accounts.stake_info_account.to_account_info(),
            },
            singer_seeds,
        ),
        1,
    )?;

    let stakeInfo = StakeInfo::new(ctx.accounts.user.key()
    , ctx.accounts.channel_mint_account.key());
    ctx.accounts.stake_info_account.set_inner(stakeInfo);

    // get metadata account
    let metadata_account = &ctx.accounts.metadata_account.to_account_info();
    require!(
        !metadata_account.data_is_empty(),
        PodCastError::MetadataAccountNotInitialized,
    );
    let data = ctx.accounts.metadata_account.data.try_borrow_mut().unwrap();
    let metadata_data = MPLMetadata::deserialize(&mut data.as_ref()).unwrap();
    //get creators
    let mut creators = metadata_data.creators.unwrap_or(vec![]);
    creators.retain(|x| x.address != user);
    let mut share = 100;
    let create_len = creators.len();
    if(create_len > 0){
        share = 100 / create_len as u8;
    }
    for creator in creators.iter_mut(){
        creator.share = share;
    }


    // update metadata
    let updated_data = DataV2 {
        name: metadata_data.name,
        symbol: metadata_data.symbol,
        uri: metadata_data.uri,
        seller_fee_basis_points: metadata_data.seller_fee_basis_points,
        creators: Some(creators),
        collection: metadata_data.collection,
        uses: metadata_data.uses,
    };

    update_metadata_accounts_v2(
        CpiContext::new(
            ctx.accounts.token_metadata_program.to_account_info(),
            UpdateMetadataAccountsV2 {
                metadata: metadata_account.to_account_info(),
                update_authority: ctx.accounts.nft_manager.to_account_info(),
            },
        ),
        Some(ctx.accounts.nft_manager.key()),
        Some(updated_data),
        None,
        None,
    )?;

    Ok(())
}

#[derive(Accounts)]
pub struct NftUnStake<'info>{

    #[account(
        seeds = [
            b"nft_manager", 
            channel_mint_account.key().as_ref()],
        bump,
    )]
    pub nft_manager: AccountInfo<'info>,

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
    ///CHECK
    pub metadata_account: UncheckedAccount<'info>,

    #[account(
        mut,
        seeds = [
            StakeInfo::SEED_PREFIX.as_bytes(),
            channel_mint_account.key().as_ref(),
            user.key().as_ref(),
        ],
        bump,
    )]
    pub stake_info_account: Box<Account<'info, StakeInfo>>,

    #[account(
        init_if_needed,
        payer=user,
        associated_token::mint = channel_mint_account,
        associated_token::authority = stake_info_account,
    )]
    pub program_receipt_nft_ata: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
    )]
    pub channel_mint_account: Box<Account<'info, Mint>>,

    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = channel_mint_account,
        associated_token::authority = user,
    )]
    pub user_ata: Box<Account<'info, TokenAccount>>,
    
    #[account(mut)]
    pub user: Signer<'info>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,

    pub token_metadata_program: Program<'info, Metadata>,
}