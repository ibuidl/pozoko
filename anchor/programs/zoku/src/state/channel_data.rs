use anchor_lang::prelude::*;
use crate::state::episode_info::EpisodeInfo;


#[account]
#[derive(InitSpace)]
pub struct ChannelData{

    //频道名称
    #[max_len(500)]
    pub title: String,

    //封面图片
    #[max_len(10000)]
    pub image: String,

    //创作者
    pub creator: Pubkey,

    //频道创建时间
    pub create_at: i64,

    //频道描述
    #[max_len(500)]
    pub description: String,

    //剧集
    #[max_len(10000)]
    pub eps: Vec<EpisodeInfo>,
}