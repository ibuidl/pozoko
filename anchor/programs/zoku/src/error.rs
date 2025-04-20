use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("The total creator share must be 100.")]
    InvalidCreatorShare,

    #[msg("Math operation overflowed")]
    MathOverflow,

    #[msg("Invalid amount")]
    InvalidAmount,
}
