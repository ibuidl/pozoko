
use anchor_lang::{prelude::*, solana_program::{program::invoke, system_instruction}};
use anchor_spl::{associated_token::AssociatedToken, metadata::{create_master_edition_v3, create_metadata_accounts_v3, mpl_token_metadata::types::DataV2, CreateMasterEditionV3, CreateMetadataAccountsV3, Metadata}, token::{mint_to, transfer, Mint, MintTo, Token, TokenAccount, Transfer}};

use crate::{ChannelData, SubscribeArgs};



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
    } else {
        if args.amount == channel_info_account.price {
            let sender = &ctx.accounts.listener;
            let receiver = &ctx.accounts.creator;
            let transfer_instruction = system_instruction::transfer(
                &sender.key(),
                &receiver.key(),
                args.amount,
            );
            invoke(
                &transfer_instruction,
                &[
                    sender.to_account_info(),
                    receiver.to_account_info(),
                    ctx.accounts.system_program.to_account_info(),
                ],
            )?;
            //How do I create pay record mapping for nft?
        } else {

        }
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
        seeds=[
            ChannelData::SEED_PREFIX.as_bytes(),
            &args.channel_id.to_string().as_bytes(),
        ],
        bump
    )]
    pub channel_mint_account: Box<Account<'info, Mint>>,

    #[account(
        mut,
        seeds = [
            ChannelData::SEED_PREFIX.as_bytes(),
            channel_mint_account.key().as_ref(),
        ],
        bump,
    )]

    pub channel_info_account: Box<Account<'info, ChannelData>>,

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


}