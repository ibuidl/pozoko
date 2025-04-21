pub enum ChannelType{
    Free = 1,
    Pay = 2,
}

impl ChannelType{

    fn type_from_value(self, value: i32) -> ChannelType{
        match value {
            1 => ChannelType::Free,
            2 => ChannelType::Pay,
            _ => panic!("Invalid type value"),
        }

    }

}