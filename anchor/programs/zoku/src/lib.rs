#![allow(clippy::result_large_err)]

pub mod error;
pub mod instructions;
pub mod states;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("3y53pS9zx5fLA6sSVsiwYJMot9FgEE1g9s8UnywjnU9s");

#[program]
pub mod zoku {

    use super::*;

    pub fn close(_ctx: Context<CloseZoku>) -> Result<()> {
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.zoku.count = ctx.accounts.zoku.count.checked_sub(1).unwrap();
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.zoku.count = ctx.accounts.zoku.count.checked_add(1).unwrap();
        Ok(())
    }

    pub fn initialize(_ctx: Context<InitializeZoku>) -> Result<()> {
        Ok(())
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        ctx.accounts.zoku.count = value.clone();
        Ok(())
    }

    pub fn initialize_creator(
        ctx: Context<CreatorCreate>,
        nickname: String,
        avatar: String,
    ) -> Result<()> {
        instructions::initialize_creator(ctx, nickname, avatar)
    }

    pub fn channel_nft_create(ctx: Context<ChannelNFTCreate>, args: ChannelNftArgs) -> Result<()> {
        instructions::channel_nft_create(ctx, args)
    }

    pub fn channel_nft_mint(ctx: Context<ChannelNftMint>, amount: u64) -> Result<()> {
        instructions::channel_nft_mint(ctx, amount)
    }
}

#[derive(Accounts)]
pub struct InitializeZoku<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  init,
  space = 8 + Zoku::INIT_SPACE,
  payer = payer
  )]
    pub zoku: Account<'info, Zoku>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseZoku<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
    pub zoku: Account<'info, Zoku>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub zoku: Account<'info, Zoku>,
}

#[account]
#[derive(InitSpace)]
pub struct Zoku {
    count: u8,
}
