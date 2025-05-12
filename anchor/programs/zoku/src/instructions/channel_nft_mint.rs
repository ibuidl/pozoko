use std::ops::DerefMut;

use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{mint_to, MintTo, Token}, token_interface::{Mint, TokenAccount}};


use crate::states::{ChannelInfo, ChannelModelConfig, ChannelNftMintEvent};
use crate::error::ErrorCode;

pub fn channel_nft_mint(ctx: Context<ChannelNftMint>,amount: u16)-> Result<()>{
    require!(amount > 0 , ErrorCode::InvalidAmount);
    require!(ctx.accounts.channel_info.nft_mint_amount < ctx.accounts.channel_model_config.max_channel_nft_mint, ErrorCode::MaxNftMintReached);

    let m = ctx.accounts.channel_mint_account.key();
    let channel_info = ctx.accounts.channel_info.deref_mut();
    let signer_seeds: &[&[&[u8]]] = &[&[
        ChannelInfo::SEED_PREFIX.as_bytes(),
        m.as_ref(),
        &[ctx.bumps.channel_info],
    ]];

    channel_info.nft_mint_amount = channel_info
        .nft_mint_amount
        .checked_add(amount)
        .ok_or(ErrorCode::MathOverflow)?;
    

    mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.channel_mint_account.to_account_info(),
                to: ctx.accounts.channel_nft_ata.to_account_info(),
                authority: ctx.accounts.channel_info.to_account_info(), // PDA mint authority, required as signer
            },
            signer_seeds,
        ),
        amount as u64,
    )?;

    msg!("nft minted successfully.");

    emit!(ChannelNftMintEvent {
        channel_nft_mint: ctx.accounts.channel_mint_account.key(),
        creator: ctx.accounts.creator.key(),
        amount,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct ChannelNftMint<'info> {

    #[account(
        mut,
        seeds = [
            ChannelInfo::SEED_PREFIX.as_bytes(),
            channel_mint_account.key().as_ref(),          
        ],
        bump,
    )]
    pub channel_info: Account<'info, ChannelInfo>,

    #[account(mut)]
    pub channel_mint_account: InterfaceAccount<'info, Mint>,

    #[account(
        init_if_needed,
        payer = creator,
        associated_token::mint = channel_mint_account,
        associated_token::authority = creator,
    )]
    pub channel_nft_ata: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        mut,
        seeds = [
            ChannelModelConfig::CONFIG_PREFIX_SEED.as_bytes(),
            &crate::admin::id().key().as_ref(),
        ],
        bump,   
         
    )]
    pub channel_model_config: Account<'info, ChannelModelConfig>,

    #[account(mut)]
    pub creator: Signer<'info>,


    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
