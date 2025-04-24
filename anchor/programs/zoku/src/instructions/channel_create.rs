
use anchor_lang::prelude::*;
use crate::{ChannelArgs, ChannelInfo, PodCastError, ProfileInfo};



pub fn channel_create(ctx: Context<ChannelCreate>, args:ChannelArgs) -> Result<()>{
    //check balance
    require!(
        ctx.accounts.authority.lamports() >= ChannelInfo::MIN_BALANCE,
        PodCastError::NoEnoughBalance,
    );

    //set channel info into pda account
    let channel_info = args.create_channel_data(ctx.accounts.authority.key());
    ctx.accounts.channel_info_account.set_inner(channel_info.clone());
    let profile_account = &mut ctx.accounts.profile_account;
    profile_account.channel_count += 1;

    Ok(())
}


#[derive(Accounts)]
#[instruction(args:ChannelArgs)]
pub struct ChannelCreate<'info>{

    #[account(
        seeds = [
            ProfileInfo::SEED_PREFIX.as_bytes(),
            authority.key().as_ref(),
        ],
        bump,
    )]

    pub profile_account: Box<Account<'info, ProfileInfo>>,

    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + ChannelInfo::INIT_SPACE,
        seeds = [
            ChannelInfo::SEED_PREFIX.as_bytes(),
            &args.channel_title.to_string().as_bytes(),
            args.channel_create_at.to_string().as_bytes(),
            authority.key().as_ref(),
        ],
        bump,
    )]

    pub channel_info_account: Box<Account<'info, ChannelInfo>>,


    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}