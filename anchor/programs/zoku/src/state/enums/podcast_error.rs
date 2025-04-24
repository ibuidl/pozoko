use anchor_lang::error_code;

#[error_code]
pub enum PodCastError{
    #[msg("Create fail! There isn't enough solana. The minimum required is 0.03 sol!")]
    NoEnoughBalance,

    #[msg("Subscribe fail! This channel doesn't exist!")]
    NoChannel,

    #[msg("Metadata account not initialized.")]
    MetadataAccountNotInitialized,

    #[msg("Master edition account not initialized.")]
    MasterEditionAccountNotInitialized,

    #[msg("Please pay the full amount of solana.")]
    NoPayEnoughSol,

}