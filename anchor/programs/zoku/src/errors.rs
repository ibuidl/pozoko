use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Podcast name is too long")]
    NameTooLong,
    #[msg("Podcast description is too long")]
    DescriptionTooLong,
    #[msg("Podcast link is too long")]
    LinkTooLong,
    #[msg("Podcast language is too long")]
    LanguageTooLong,
    #[msg("Podcast category is too long")]
    CategoryTooLong,
    #[msg("Podcast image URL is too long")]
    ImageUrlTooLong,
    #[msg("Episode title is too long")]
    TitleTooLong,
    #[msg("Episode audio IPFS CID is too long")]
    AudioCidTooLong,
    #[msg("Episode audio fallback URL is too long")]
    AudioUrlFallbackTooLong,
    #[msg("Episode description is too long")]
    EpisodeDescriptionTooLong,
    #[msg("Episode duration is too long")]
    EpisodeDurationTooLong,
    #[msg("Episode GUID is too long")]
    EpisodeGuidTooLong,
    #[msg("Episode image URL is too long")]
    EpisodeImageUrlTooLong,
    #[msg("Too many episodes in this podcast")]
    TooManyEpisodes,
    #[msg("Invalid episode index")]
    InvalidEpisodeIndex,
}