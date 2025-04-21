use anchor_lang::prelude::*;



#[account]
#[derive(InitSpace)]
pub struct UserTransData{

    //subscipe user
    pub user: Pubkey,

    //pay time
    pub trans_at: i64,

    //pay
    pub amount: u64,
}