const deckData = [
    // Existing cards
    { "hanzi": "我", "pinyin": "wo3", "english": "I; me" },
    { "hanzi": "你", "pinyin": "ni3", "english": "you" },
    { "hanzi": "好", "pinyin": "hao3", "english": "good" },
    { "hanzi": "是", "pinyin": "shi4", "english": "to be" },
    { "hanzi": "吗", "pinyin": "ma5", "english": "question particle" },
    { "hanzi": "很", "pinyin": "hen3", "english": "very" },
    { "hanzi": "谢谢", "pinyin": "xie4 xie5", "english": "thank you" },
    { "hanzi": "中国", "pinyin": "zhong1 guo2", "english": "China" },
    
    // Basic pronouns & common words
    { "hanzi": "他", "pinyin": "ta1", "english": "he; him" },
    { "hanzi": "她", "pinyin": "ta1", "english": "she; her" },
    { "hanzi": "们", "pinyin": "men5", "english": "plural marker" },
    { "hanzi": "的", "pinyin": "de5", "english": "possessive particle" },
    { "hanzi": "不", "pinyin": "bu4", "english": "not; no" },
    { "hanzi": "这", "pinyin": "zhe4", "english": "this" },
    { "hanzi": "那", "pinyin": "na4", "english": "that" },
    
    // Common verbs
    { "hanzi": "有", "pinyin": "you3", "english": "to have" },
    { "hanzi": "在", "pinyin": "zai4", "english": "to be at/in" },
    { "hanzi": "会", "pinyin": "hui4", "english": "can; know how to" },
    { "hanzi": "去", "pinyin": "qu4", "english": "to go" },
    { "hanzi": "来", "pinyin": "lai2", "english": "to come" },
    { "hanzi": "吃", "pinyin": "chi1", "english": "to eat" },
    { "hanzi": "喝", "pinyin": "he1", "english": "to drink" },
    { "hanzi": "说", "pinyin": "shuo1", "english": "to speak; to say" },
    { "hanzi": "看", "pinyin": "kan4", "english": "to see; to look" },
    { "hanzi": "要", "pinyin": "yao4", "english": "to want" },
    
    // Numbers 1-10
    { "hanzi": "一", "pinyin": "yi1", "english": "one" },
    { "hanzi": "二", "pinyin": "er4", "english": "two" },
    { "hanzi": "三", "pinyin": "san1", "english": "three" },
    { "hanzi": "四", "pinyin": "si4", "english": "four" },
    { "hanzi": "五", "pinyin": "wu3", "english": "five" },
    { "hanzi": "六", "pinyin": "liu4", "english": "six" },
    { "hanzi": "七", "pinyin": "qi1", "english": "seven" },
    { "hanzi": "八", "pinyin": "ba1", "english": "eight" },
    { "hanzi": "九", "pinyin": "jiu3", "english": "nine" },
    { "hanzi": "十", "pinyin": "shi2", "english": "ten" },
    
    // Common adjectives
    { "hanzi": "大", "pinyin": "da4", "english": "big" },
    { "hanzi": "小", "pinyin": "xiao3", "english": "small" },
    { "hanzi": "多", "pinyin": "duo1", "english": "many; much" },
    { "hanzi": "少", "pinyin": "shao3", "english": "few; little" },
    { "hanzi": "新", "pinyin": "xin1", "english": "new" },
    { "hanzi": "旧", "pinyin": "jiu4", "english": "old (things)" },
    
    // Useful phrases
    { "hanzi": "你好", "pinyin": "ni3 hao3", "english": "hello" },
    { "hanzi": "再见", "pinyin": "zai4 jian4", "english": "goodbye" },
    { "hanzi": "对不起", "pinyin": "dui4 bu5 qi3", "english": "sorry" },
    { "hanzi": "没关系", "pinyin": "mei2 guan1 xi5", "english": "it's okay; no problem" },
    { "hanzi": "什么", "pinyin": "shen2 me5", "english": "what" },
    { "hanzi": "哪里", "pinyin": "na3 li3", "english": "where" },
    { "hanzi": "谁", "pinyin": "shei2", "english": "who" },
    { "hanzi": "怎么", "pinyin": "zen3 me5", "english": "how" }
];