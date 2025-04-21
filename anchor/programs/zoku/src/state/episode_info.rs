use anchor_lang::prelude::*;



#[account]
#[derive(InitSpace)]
pub struct EpisodeInfo{

    //episode order
    pub order: u64,

    //episode title
    #[max_len(500)]
    pub title: String,

    //episode image
    #[max_len(1000)]
    pub image: String,

    //episode audio file link
    #[max_len(500)]
    pub url: String,

    //episode publish time
    pub publish_at: i64,
}