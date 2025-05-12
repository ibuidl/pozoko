#![allow(clippy::result_large_err)]

pub mod error;
pub mod instructions;
pub mod states;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("34i6xqWDw9e67z4vyfHz8AoRdqqBpuY2nV1Fcvg9PyQB");

pub mod admin {
    use anchor_lang::prelude::declare_id;
    #[cfg(feature = "devnet")]
    declare_id!("3Mxb3vnmPRcf8UCYSVaUrCc5VKV1P33EjMGuaJMuah4q"); //Please change admin Pubkey before deploy
    #[cfg(not(feature = "devnet"))]
    declare_id!("3Mxb3vnmPRcf8UCYSVaUrCc5VKV1P33EjMGuaJMuah4q");
}

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

    pub fn initialize_user(
        ctx: Context<UserCreate>,
        nickname: String,
        avatar: String,
    ) -> Result<()> {
        instructions::initialize_user(ctx, nickname, avatar)
    }

    pub fn channel_nft_create(ctx: Context<ChannelNFTCreate>, args: ChannelNftArgs) -> Result<()> {
        instructions::channel_nft_create(ctx, args)
    }

    pub fn channel_nft_mint(ctx: Context<ChannelNftMint>, amount: u16) -> Result<()> {
        instructions::channel_nft_mint(ctx, amount)
    }

    pub fn update_ep(ctx: Context<EpCreate>, args: EpisodeArgs) -> Result<()> {
        instructions::update_ep(ctx, args)
    }
    pub fn update_user(ctx: Context<UserUpdate>, nickname: String, avatar: String) -> Result<()> {
        instructions::update_user(ctx, nickname, avatar)
    }
    pub fn create_channel_model_config(
        ctx: Context<ChannelModelConfigCreate>,
        max_channel_nft_mint: u16,
    ) -> Result<()> {
        instructions::create_channel_model_config(ctx, max_channel_nft_mint)
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
