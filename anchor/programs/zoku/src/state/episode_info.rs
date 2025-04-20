use anchor_lang::prelude::*;



#[account]
#[derive(InitSpace)]
pub struct EpisodeInfo{

    //频道中的序号
    pub order: i32,

    //单元名称
    #[max_len(500)]
    pub title: String,

    //单元图片
    #[max_len(1000)]
    pub image: String,

    //音频链接地址
    #[max_len(500)]
    pub url: String,

    //发布时间
    pub publish_at: i64,
}