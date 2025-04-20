use anchor_lang::prelude::*;



#[account]
#[derive(InitSpace)]
pub struct UserTransData{

    //创作者
    pub user: Pubkey,

    //交易时间
    pub trans_at: i64,

    //金额
    pub amount: u64,
}