/**
 * forum.js — 校园论坛：固定帖 + ID搜索（拼音/汉字兼容）
 */

// ─── 拼音映射（关键ID） ───
const PINYIN_MAP = {
  "liutianqing": "ltq2007", "刘天清": "ltq2007",
  "ltq": "ltq2007", "ltq2007": "ltq2007",
  "dongxinfei": "dxf_teacher", "董新飞": "dxf_teacher",
  "dxf": "dxf_teacher", "dxf_teacher": "dxf_teacher",
  "admin": "admin_jw", "jiaowuchu": "admin_jw", "admin_jw": "admin_jw",
  "stu9981": "stu_9981", "stu_9981": "stu_9981",
  "张国强": "zhanggq", "zhangguoqiang": "zhanggq", "zhanggq": "zhanggq",
  "stu8843": "stu_8843", "stu_8843": "stu_8843",
  "陈昱": "chenyu", "chenyu": "chenyu", "cy": "chenyu"
};

function resolveId(raw) {
  const q = raw.trim().toLowerCase().replace(/[\s_-]/g, "");
  for (const [key, val] of Object.entries(PINYIN_MAP)) {
    if (q === key.toLowerCase().replace(/[\s_-]/g, "")) return val;
  }
  return raw.trim();
}

// ─── 固定帖子 ───
const FIXED_POSTS = [
  {
    id: "post-1",
    title: "[求助] 高中数学竞赛有没有好的资料推荐？",
    time: "11月5日 14:22",
    authorId: "stu_2233",
    views: 312, replies: 8,
    body: `最近想自学高中数学竞赛的内容，不知道从哪里入手，求各位推荐一下资料！`,
    comments: [
      { id: "stu_4401", text: "《初等数学问题》挺适合入门的，各大网站有电子版。" },
      { id: "ltq2007", text: "《高中数学竞赛指南》第三版挺好，图书馆有一本，我借过。" },
      { id: "stu_0071", text: "感谢楼上！" },
      { id: "stu_8812", text: "AMC的题也很有用。" },
      { id: "stu_2233", text: "谢谢大家！" },
      { id: "stu_6601", text: "ltq2007 你最近研究什么呢，上次说在研究别的方向？" },
      { id: "ltq2007", text: "……说了你也不一定感兴趣。跟记忆有关的东西。" },
      { id: "stu_6601", text: "记忆？心理学吗" }
    ]
  },

  {
    id: "post-1a",
    title: "[求助] 有没有数学晚自习的答疑老师联系方式",
    time: "11月6日 18:22",
    authorId: "stu_2315",
    views: 87, replies: 5,
    body: `这周数学晚自习的刘老师请假了，想问一下代课老师是哪位？有同学知道联系方式吗？\n\n有道导数题卡了两天了。`,
    comments: [
      { id: "stu_1243", text: "好像是张老师代课，周二周四晚自习" },
      { id: "stu_2315", text: "谢谢！张老师在哪个办公室" },
      { id: "stu_1243", text: "教学楼三楼东边，数学组" },
      { id: "stu_5512", text: "导数题发出来看看" },
      { id: "stu_2315", text: "已经问到了，谢谢大家" }
    ]
  },

  {
    id: "post-2",
    title: "旧实验楼那边最近是不是有什么情况",
    time: "11月18日 23:08",
    authorId: "stu_5514",
    views: 876, replies: 9,
    body: `今晚从操场回宿舍路过旧实验楼，黑灯瞎火的但能看到地下室窗子有光透出来。\n学校不是说禁止进入整修吗？\n而且感觉能听到低频的声音，不知道是机器还是什么。\n有没有人也注意到了？`,
    comments: [
      { id: "stu_1102", text: "整修工程加班很正常吧" },
      { id: "stu_5514", text: "整修加班到晚上十一点？" },
      { id: "stu_7732", text: "可能是设备测试，别想太多。" },
      { id: "stu_0334", text: "我也看见过，不止一次了，上周也有。" },
      { id: "stu_2291", text: "上周？那不是整修刚开始没多久吗" },
      { id: "stu_0334", text: "对，感觉从10月初就有了，但禁止进入通知是10月10号发的……" },
      { id: "stu_5514", text: "这个顺序有点奇怪" },
      { id: "stu_1102", text: "别疑神疑鬼了，可能早就开始整修只是晚公告。" },
      { id: "stu_anon_x", text: "……树洞有个帖子也说了类似的事，不只你一个人注意到。" }
    ]
  },

  {
    id: "post-2a",
    title: "[交易] 出高三一轮复习资料（九成新）",
    time: "11月9日 12:45",
    authorId: "stu_1845",
    views: 156, replies: 8,
    body: `高三毕业了，出一轮复习资料：

- 五三数学（理） 25元
- 语文基础知识手册 15元  
- 英语维克多词汇 20元
- 物理必刷题 15元

全部九成新，基本没怎么写。打包50元。`,
    comments: [
      { id: "stu_3321", text: "五三还有吗" },
      { id: "stu_1845", text: "还在" },
      { id: "stu_5514", text: "物理必刷题我要了" },
      { id: "stu_1845", text: "私聊" },
      { id: "stu_2291", text: "维克多词典是正版吗" },
      { id: "stu_1845", text: "正版，书店买的" },
      { id: "stu_2291", text: "好，我一起要了" },
      { id: "stu_1845", text: "全部已出，谢谢" }
    ]
  },

  {
    id: "post-3",
    pinned: true,
    title: "【公告】请不要在校园论坛上评价老师！",
    time: "10月10日 08:00",
    authorId: "admin_jw",
    views: 2847, replies: 5,
    body: `近期发现部分同学在论坛发表对老师的不当评论，严重影响校园秩序。\n请所有同学谨记：本论坛为学习交流平台，禁止发表涉及教职工的评价内容，违者将由教务处处理。`,
    comments: [
      { id: "stu_anon", text: "……知道了。" },
      { id: "stu_9981", text: `评论老师去树洞，匿名的。<a href="hole/index.html" style="color:#1a3a5c;font-weight:600;text-decoration:underline">hole.lbyz.internal</a>` },
      { id: "stu_3301", text: "👆 那个网站学生自己搭的，有意思的东西挺多。" },
      { id: "stu_0071", text: "树洞能看什么" },
      { id: "stu_9981", text: "各种，什么都有。自己去看。" }
    ]
  },

  {
    id: "post-3a",
    title: "[闲聊] 食堂二楼新开的牛肉面怎么样",
    time: "11月11日 12:10",
    authorId: "stu_4512",
    views: 203, replies: 9,
    body: `看到食堂二楼新开了家牛肉面窗口，有人吃过吗？\n\n味道怎么样？价格贵不贵？`,
    comments: [
      { id: "stu_3344", text: "刚吃完，还行，肉挺多的" },
      { id: "stu_4512", text: "多少钱一碗" },
      { id: "stu_3344", text: "12块，加肉15" },
      { id: "stu_5512", text: "排队的人多吗" },
      { id: "stu_3344", text: "中午人多，建议晚点去" },
      { id: "stu_0091", text: "汤不错，可以加一次汤" },
      { id: "stu_4512", text: "下午放学去试试" },
      { id: "stu_9981", text: "我也想去，一起？" },
      { id: "stu_4512", text: "行啊，五点二十食堂见" }
    ]
  },

  {
    id: "post-4",
    title: "有没有人见过来学校的那个陈博士",
    time: "11月8日 20:14",
    authorId: "stu_2291",
    views: 467, replies: 7,
    body: `格致计划成果展示会那天，报告厅外面站着一个戴眼镜的中年男人，旁边跟着两个人像是助理。\n\n有同学说他是外聘的什么顾问，叫陈昱，是搞神经科学的。\n\n我感觉他看人的眼神有点奇怪，一直在打量台下的同学……可能是我多想了。`,
    comments: [
      { id: "stu_4401", text: "我也注意到他了，一直没说话，就在角落站着。" },
      { id: "stu_0334", text: "他是格致计划的技术顾问，学校官网好像有介绍，去查查。" },
      { id: "stu_2291", text: "查了，没有单独介绍，只在那篇展示会的文章里提了一下。" },
      { id: "stu_6601", text: "北境神经工程研究院……这个机构我没怎么听说过。" },
      { id: "stu_4401", text: "搜了一下，官网有，但内容很少，就几行介绍，联系方式也是一个邮箱。" },
      { id: "stu_2291", text: "我问了一个跟格致计划接触过的同学，他说陈昱每次来都是晚上，也不在教职工那边登记……" },
      { id: "stu_0334", text: "别多想了吧，顾问来学校很正常的。" }
    ]
  },

  {
    id: "post-4a",
    title: "[寻物] 校服落在操场了，有人看到吗",
    time: "11月8日 20:30",
    authorId: "stu_3417",
    views: 94, replies: 6,
    body: `下午体育课把校服外套落在操场看台上了，上面有姓名贴：高一(3)班 李雨桐。\n\n有同学看到吗？`,
    comments: [
      { id: "stu_3301", text: "去失物招领处看看，在行政楼一楼" },
      { id: "stu_3417", text: "明天去看看" },
      { id: "stu_4482", text: "体育组老师那里也可能有" },
      { id: "stu_3417", text: "好的谢谢" },
      { id: "stu_0071", text: "帮你问问我们班" },
      { id: "stu_3417", text: "找到了，在体育组，谢谢大家" }
    ]
  },

  {
    id: "post-5",
    title: "林小雨到底怎么了，有没有人知道",
    time: "11月12日 21:45",
    authorId: "stu_8843",
    views: 892, replies: 10,
    body: `我跟林小雨是初中同学，她10月底就不在学校了，说是"回老家了"。\n\n但我昨天联系她妈妈，她妈妈说完全联系不上她，很急，但学校方面一直说"已在处理"。\n\n这也太奇怪了，她手机完全打不通，微信也没有在线过。`,
    comments: [
      { id: "stu_4482", text: "我们班也有人请假说是家事，但感觉越来越多……" },
      { id: "stu_1102", text: "可能真的有事，别往坏处想。" },
      { id: "stu_8843", text: "她走之前状态确实不对，10月底她参加了旧实验楼那边的什么志愿者活动，之后就消失了。" },
      { id: "stu_3301", text: "旧实验楼那个格致计划的活动吗？我也看到过招募帖，没报名，感觉怪怪的。" },
      { id: "stu_6601", text: "我报名了但没被选上，当时觉得可惜……现在感觉还好。" },
      { id: "stu_8843", text: "被选上的人都去哪了？？" },
      { id: "stu_anon_x", text: "别在这里说，去树洞说。" }
    ]
  },

  {
    id: "post-5a",
    title: "[求助] 物理竞赛初赛大概什么时候",
    time: "11月13日 22:15",
    authorId: "stu_5523",
    views: 132, replies: 7,
    body: `想参加明年的物理竞赛，不知道初赛一般在几月份？\n\n现在开始准备来得及吗？`,
    comments: [
      { id: "stu_4401", text: "一般是4月报名，9月比赛" },
      { id: "stu_6601", text: "现在准备来得及，先看基础" },
      { id: "stu_5523", text: "有什么推荐的教材吗" },
      { id: "stu_6601", text: "《物理学难题集》《力学篇》" },
      { id: "stu_2291", text: "可以去问物理组王老师，他带竞赛" },
      { id: "stu_5523", text: "好的，明天去问问" },
      { id: "stu_3301", text: "我也准备报，一起加油" }
    ]
  },

  {
    id: "post-6",
    title: "旧实验楼昨晚又有灯",
    time: "11月18日 23:08",
    authorId: "stu_5514",
    views: 634, replies: 9,
    body: `今晚从操场回宿舍路过旧实验楼，地下室窗子透出灯光，一直亮着。\n\n学校说这楼在整修，但整修要在深夜十一点还亮灯吗？\n\n而且我站在外面听了一会儿，能听到低频的机器声，持续不断的那种。`,
    comments: [
      { id: "stu_1102", text: "整修加班很正常的。" },
      { id: "stu_5514", text: "整修加班到夜里11点？" },
      { id: "stu_0334", text: "我上周也注意到了，不止一次了。" },
      { id: "stu_2291", text: "10月初就有了，但禁止进入通知是10月10号才发……这顺序不对吧。" },
      { id: "stu_5514", text: "对，通知比灯光晚了好几周。" },
      { id: "stu_anon_x", text: "保安系统那边有进出记录，但普通人进不去查。" },
      { id: "ltq2007", text: "我知道怎么进去查。" },
      { id: "stu_5514", text: "??你知道？" },
      { id: "ltq2007", text: "树洞。" }
    ]
  },

  {
    id: "post-6a",
    title: "[拼车] 周末回家，有去火车站的没",
    time: "11月15日 16:40",
    authorId: "stu_6631",
    views: 78, replies: 5,
    body: `这周六下午回家，打车去火车站，有没有一起拼车的？\n\n4个人刚好一辆车，人均十几块。`,
    comments: [
      { id: "stu_1102", text: "几点走" },
      { id: "stu_6631", text: "下午两点左右" },
      { id: "stu_2291", text: "我！我也两点走" },
      { id: "stu_7732", text: "+1，在哪集合" },
      { id: "stu_6631", text: "校门口见，私聊" }
    ]
  },

  {
    id: "post-7",
    title: "格致计划那个陈昱博士到底是什么来头",
    time: "11月9日 22:41",
    authorId: "stu_6601",
    views: 521, replies: 8,
    body: `格致计划成果展示会，我去看了那篇官网文章，里面提到一个"北境神经工程研究院"的陈昱博士。\n\n我搜了一下这个机构，官网有，但内容极少，就几行介绍。联系方式是一个邮箱。\n\n他"长期从事认知科学与神经接口技术研究"……这跟学校的"健康数据采集"感觉对不上。\n\n有没有人知道更多？`,
    comments: [
      { id: "stu_4401", text: "我也搜了，那个研究院在工商系统里注册地址是一个商务楼，在狼堡市区。" },
      { id: "stu_0334", text: "神经接口……这不就是那种接脑子的技术吗" },
      { id: "stu_6601", text: "对，他的研究方向跟「健康数据采集」根本不是一回事。" },
      { id: "stu_2291", text: "他去学校的时候从来不走正门，保安室那边没他的记录。" },
      { id: "stu_6601", text: "你确定？" },
      { id: "stu_2291", text: "我跟保安大叔熟，他说确实没有，但实验楼那边单独记录。" },
      { id: "ltq2007", text: "他有记录的。只是不在你能查到的地方。" },
      { id: "stu_6601", text: "ltq2007 你怎么知道？你进系统了？" }
    ]
  },

  {
    id: "post-7a",
    title: "[闲聊] 晚自习有人讲话怎么办",
    time: "11月12日 21:03",
    authorId: "stu_2351",
    views: 187, replies: 8,
    body: `我们班晚自习后面几排总是有人讲话，影响学习。\n\n跟班长说了也没用，有什么办法吗？`,
    comments: [
      { id: "stu_6612", text: "告诉班主任" },
      { id: "stu_2351", text: "不想打小报告" },
      { id: "stu_0091", text: "戴耳塞" },
      { id: "stu_2351", text: "试过，还是能听到" },
      { id: "stu_2244", text: "换座位到前面" },
      { id: "stu_2351", text: "老师说座位固定" },
      { id: "stu_5514", text: "我们班也有这种人，烦死了" },
      { id: "stu_9981", text: "联合几个同学一起跟老师说" }
    ]
  },

  {
    id: "post-7b",
    title: "[分享] 整理了一份语文作文素材",
    time: "11月17日 19:30",
    authorId: "stu_4418",
    views: 312, replies: 9,
    body: `把最近考试用的作文素材整理了一下：

- 人物素材（袁隆平、钟南山、张桂梅）
- 名言警句（传统文化类）
- 开头结尾模板

需要的同学可以来高二(5)班找我复印，或者加我QQ：4418***`,
    comments: [
      { id: "stu_3321", text: "谢谢学长！" },
      { id: "stu_7788", text: "可以发班级群吗" },
      { id: "stu_4418", text: "可以的" },
      { id: "stu_2231", text: "张桂梅那个写得好详细" },
      { id: "stu_3344", text: "明天去找你复印" },
      { id: "stu_5512", text: "在哪个班" },
      { id: "stu_4418", text: "高二5班，靠窗第三排" },
      { id: "stu_9981", text: "好人一生平安" },
      { id: "stu_0091", text: "已加QQ，谢谢" }
    ]
  },

  {
    id: "post-8",
    title: "刘天清你在吗",
    time: "11月25日 08:01",
    authorId: "stu_8812",
    views: 1203, replies: 12,
    body: `五天了。\n\n他的账号还在线，但不回复任何人。我们都知道这不正常。\n\n他最后一条帖子发在11月20日晚上，说图书馆的签到记录有问题。之后就没有了。\n\n学校说他请假了。他没有跟我说过要请假。`,
    comments: [
      { id: "stu_4401", text: "已转发给班主任了，班主任说「学校在处理」。" },
      { id: "stu_8812", text: "处理什么，处理成什么？" },
      { id: "stu_3301", text: "林小雨也是这样，「学校在处理」，然后就没有然后了。" },
      { id: "stu_8843", text: "两个人了。我不相信是巧合。" },
      { id: "stu_0334", text: "都跟那个格致计划有关系吗？林小雨参加了，刘天清在调查……" },
      { id: "stu_8812", text: "他们的账号都还在线，但人不见了。" },
      { id: "stu_anon_x", text: "账号在线但人不在——这本身就是一个线索。" }
    ]
  },

  {
    id: "post-8a",
    title: "[求助] 教室多媒体坏了找谁修",
    time: "11月20日 08:15",
    authorId: "stu_3213",
    views: 67, replies: 4,
    body: `我们班的投影仪打不开了，老师上课要用。\n\n应该找哪个部门修？`,
    comments: [
      { id: "stu_3391", text: "找电教委员报修" },
      { id: "stu_3213", text: "电教委员说不知道找谁" },
      { id: "stu_4451", text: "去行政楼二楼总务处" },
      { id: "stu_3213", text: "好的，我现在去" }
    ]
  },

  {
    id: "post-8b",
    title: "[求助] 这周六补课吗",
    time: "11月21日 16:50",
    authorId: "stu_1721",
    views: 243, replies: 6,
    body: `听说这周六要补下周一的课？\n\n有同学知道确切通知吗？`,
    comments: [
      { id: "stu_3341", text: "班主任说了，补周一的课" },
      { id: "stu_1721", text: "全天吗" },
      { id: "stu_3341", text: "对，按周一的课表上" },
      { id: "stu_7721", text: "为什么补课啊" },
      { id: "stu_3341", text: "下周一周二运动会" },
      { id: "stu_1721", text: "哦哦，谢谢" }
    ]
  },

  {
    id: "post-deleted",
    deleted: true,
    title: "【内容已删除】",
    time: "11月19日 19:22",
    authorId: "ltq2007",
    views: 0, replies: 0,
    body: `此帖子内容已被管理员删除。`,
    comments: []
  }
];

// ─── ID搜索数据库 ───
const ID_POSTS = {
  "ltq2007": [
    {
      title: "[思考] 关于「还原」的一道思维题",
      time: "11月9日 23:11",
      body: `睡不着，随手想到一道题，欢迎讨论。

一个三维物体被沿某轴做了完整的镜像翻转，等价于把它的所有坐标参数都乘以了 -1。

如果你想把这个物体「完整还原」到翻转之前的状态，你需要对那些参数做什么操作？

说明：这不是数学题，也不是物理题。答案是一个日常的中文词。你不需要计算，只需要理解那个「操作的本质」。`,
      comments: [
        { id: "stu_0044", text: "乘以-1？那不就还是原来了……翻转的反操作还是翻转？" },
        { id: "ltq2007", text: "对，但那个「操作」叫什么名字？两个字，日常用语。" },
        { id: "stu_7821", text: "反转？反向？逆向？" },
        { id: "ltq2007", text: "最后那个对了。" },
        { id: "stu_3302", text: "感觉这题不只是在问数学……" },
        { id: "ltq2007", text: "你说对了。" }
      ]
    },
    {
      title: "[分享] 几本最近读的书",
      time: "10月28日 21:03",
      body: `最近从图书馆借了几本跨领域的书，分享一下感想：

《社会性动物》：人在群体中的行为模式，读完之后感觉很多事情有了不同解释。
《行为分析导论》：比较学术，有点难啃，但某些章节很关键。
《逆向思维训练》：书名一般，但里面有一句话我觉得挺有意思，大意是说真正的逆向不是反方向走，而是「把参数重置到起点」。

如果有人读过类似方向的书欢迎聊聊。`,
      comments: [
        { id: "stu_8812", text: "你读这些干嘛，心理学方向的？" },
        { id: "ltq2007", text: "不完全是……在研究一个问题。" },
        { id: "stu_8812", text: "什么问题" },
        { id: "ltq2007", text: "暂时不方便说。" }
      ]
    },
    {
      title: "[物理竞赛] 波动光学备考整理",
      time: "10月15日 16:45",
      body: `整理了波动光学的竞赛考点，分享给有需要的同学。\n涵盖：干涉条件、衍射、偏振、光程差计算。\n个人笔记可能有疏漏，欢迎指正。`,
      comments: [
        { id: "stu_8812", text: "谢谢！你最近状态有点奇怪，没什么事吧？" },
        { id: "ltq2007", text: "没事，就是在想一些东西。" }
      ]
    },
    {
      title: "图书馆今天怎么没系统维护通知",
      time: "11月20日 22:33",
      body: `今晚闭馆前一直在图书馆自习，馆员说系统正常。\n\n但我刚刚在借阅记录里看到一条奇怪的东西——有一个人签到进了馆，却显示没有从正门签出，但闭馆记录里却有他的签出时间戳。\n\n两条记录时间差了三分钟，地点标注也对不上。\n\n……或许只是系统bug，但我忍不住发出来。`,
      comments: [
        { id: "stu_4482", text: "什么人的记录？" },
        { id: "ltq2007", text: "不方便说。" },
        { id: "stu_4482", text: "你在图书馆发现什么了吗" },
        { id: "stu_4482", text: "你在线吗，怎么不回了" }
      ]
    }
  ],

  "dxf_teacher": [
    {
      title: "[招募] 格致科研项目志愿者 · 截止10月20日",
      time: "9月22日 09:00",
      body: `同学们好，

为配合学校与科研机构的合作项目（格致计划），现招募健康数据采集志愿者若干名。

时间：10月28日（周二）晚7:30
地点：旧实验楼 B1 层（地下室）
项目：无创健康检测，采集基础生理数据，全程约3小时
奖励：50元超市购物券

名额有限，有意向的同学请在本帖回复，截止9月10日。
参与者须签署知情同意书。`,
      comments: [
        { id: "stu_6612", text: "报名！" },
        { id: "stu_0091", text: "报名+1" },
        { id: "lxy_0312", text: "我参加！" },
        { id: "stu_2244", text: "什么叫「基础生理数据」" },
        { id: "dxf_teacher", text: "心率、皮肤电导、脑电基线等常规指标，无创，完全安全。" },
        { id: "stu_5514", text: "旧实验楼不是说要整修吗" },
        { id: "dxf_teacher", text: "B1实验室不受影响，已与维修方协调。" },
        { id: "stu_anon2", text: "旧实验楼晚上……感觉怪怪的" },
        { id: "dxf_teacher", text: "全程有人陪同，请放心报名 😊" }
      ]
    }
  ],

  // 干扰项
  "stu_9981": [
    {
      title: "树洞那个地址是什么",
      time: "10月22日 11:30",
      body: `有人说有个匿名网站，在哪里？`,
      comments: [
        { id: "stu_3301", text: "hole.lbyz.internal，直接在地址栏输就行。" },
        { id: "stu_9981", text: "谢了" }
      ]
    }
  ],
  "zhanggq": [
    {
      title: "竞赛复习资料整理（数论部分）",
      time: "11月3日 18:22",
      body: `各位竞赛同学：\n\n附上本次期末前的数论专题整理，涵盖整除性、同余、质数分布基础。\n\n刘天清同学此前曾和我讨论过一个关于"逆向参数"的数学问题，思路很有意思，等他回来可以一起研究。\n\n——张国强`,
      comments: [
        { id: "stu_4401", text: "张老师，刘天清现在在哪里啊，他失踪了吗" },
        { id: "zhanggq", text: "学校说是暂时请假，有消息我会告诉你们。" },
        { id: "stu_6601", text: "张老师，他在失踪前有没有跟你说过他在查什么？" },
        { id: "zhanggq", text: "他问过我旧实验楼的建筑档案在哪里查，我说不清楚，让他去图书馆问。" },
        { id: "stu_6601", text: "……" }
      ]
    }
  ],
  "chenyu": [
    {
      title: "【外部顾问简介】北境神经工程研究院 · 陈昱博士",
      time: "10月20日 系统存档",
      body: `以下信息来自格致计划项目备案文件（内部）：

姓名：陈昱
机构：北境神经工程研究院
职务：首席研究员 / 格致计划项目顾问
研究方向：神经接口技术、认知数据采集、记忆建模

与本校合作始于2025年8月。

特别说明：陈昱博士不属于本校在编教职工，进出校园不经保安室主通道登记，由格致计划项目组单独安排。

访问记录：10月28日（志愿者首次实验当晚）、11月15日（B203设备检查）`,
      comments: [
        { id: "SYSTEM", text: "⚠ 此条目来自教师内网档案系统，通过项目组账号权限查阅。非公开信息。" }
      ]
    }
  ],
  "admin_jw": [
    {
      title: "【通知】期末考试安排",
      time: "11月24日 08:00",
      body: `期末考试时间：2026年1月（具体日期另行通知）\n座位安排请查阅教学楼公告栏\n考试纪律请同学们认真遵守\n\n教务处`,
      comments: []
    },
    {
      title: "【公告】关于近期部分同学请假事宜的说明",
      time: "11月10日 09:00",
      body: `近期有家长询问部分同学请假情况。\n\n学校已按照相关程序处理，请家长和同学们放心，如有具体问题请联系班主任，不要在网络平台散播未经证实的信息。\n\n——教务处`,
      comments: [
        { id: "stu_anon", text: "什么叫「按相关程序处理」……" },
        { id: "stu_4401", text: "这公告根本什么都没说。" }
      ]
    }
  ],
  "stu_8843": [
    {
      title: "林小雨你在哪里",
      time: "11月14日 22:01",
      body: `我已经发了帖子求助，但还是没有消息。\n\n她妈妈昨天哭着给我打电话，说警察说要等72小时才能立案，但学校方面一直说"学生自愿离校"。\n\n我不相信。`,
      comments: [
        { id: "stu_3301", text: "72小时……那要等到什么时候。" },
        { id: "stu_8843", text: "我不会等的，我在自己查。" },
        { id: "ltq2007", text: "我也在查。" },
        { id: "stu_8843", text: "@ltq2007 你查到什么了吗？" },
        { id: "ltq2007", text: "不方便在这里说。" }
      ]
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  renderFixedPosts();
  const searchInput = document.getElementById("forum-search-input");
  const searchBtn = document.getElementById("forum-search-btn");
  if (searchBtn) searchBtn.addEventListener("click", () => doForumSearch(searchInput?.value));
  if (searchInput) searchInput.addEventListener("keydown", e => { if (e.key === "Enter") doForumSearch(searchInput.value); });
});

function renderFixedPosts() {
  const container = document.getElementById("forum-posts");
  if (!container) return;
  container.innerHTML = FIXED_POSTS.map(renderPost).join("");
  bindToggle();
}

function renderPost(post) {
  // 已删帖：显示删除痕迹
  if (post.deleted) {
    return `
  <div class="forum-post" style="opacity:0.55;border-left:3px solid #c0392b">
    <div class="forum-post-header">
      <span class="campus-badge campus-badge-danger" style="margin-right:6px">已删除</span>
      <div class="forum-post-title" style="color:#999;text-decoration:line-through">${post.title}</div>
      <div class="forum-post-meta">
        <span>👤 ${post.authorId}</span>
        <span>🕐 ${post.time}</span>
        <span style="color:#c0392b">⚠ 该帖子已被管理员删除</span>
      </div>
    </div>
    <div class="forum-post-body" style="color:#bbb;font-size:13px;font-style:italic">[ 此内容已被移除 ]</div>
  </div>`;
  }

  const repliesHtml = post.comments.map(c => `
    <div class="forum-reply">
      <div class="forum-reply-avatar" style="background:${hashColor(c.id)}">${c.id.charAt(0).toUpperCase()}</div>
      <div>
        <span class="forum-reply-id">${c.id}</span>
        <span style="font-size:13px;color:#2c3e50">${c.text}</span>
      </div>
    </div>`).join("");

  return `
  <div class="forum-post">
    <div class="forum-post-header">
      ${post.pinned ? '<span class="campus-badge campus-badge-danger" style="margin-right:6px">置顶</span>' : ""}
      <div class="forum-post-title">${post.title}</div>
      <div class="forum-post-meta">
        <span>👤 ${post.authorId}</span>
        <span>🕐 ${post.time}</span>
        <span>👁 ${post.views}</span>
        <span>💬 ${post.replies || post.comments.length}</span>
      </div>
    </div>
    <div class="forum-post-body" style="white-space:pre-line">${post.body}</div>
    <div class="forum-post-footer">
      <button class="forum-toggle-btn" data-target="${post.id}-replies">
        展开 ${post.comments.length} 条回复 ▾
      </button>
    </div>
    <div class="forum-replies" id="${post.id}-replies">
      <div class="forum-replies-inner">${repliesHtml}</div>
    </div>
  </div>`;
}

function doForumSearch(query) {
  if (!query) return;
  const resolved = resolveId(query);
  const resultArea = document.getElementById("forum-search-result");
  if (!resultArea) return;

  const posts = ID_POSTS[resolved];
  if (!posts) {
    resultArea.innerHTML = `
      <div class="campus-alert campus-alert-info" style="margin-bottom:16px">
        📭 未找到用户 "<strong>${query.trim()}</strong>" 的发帖记录
      </div>`;
    return;
  }

  const postsHtml = posts.map((p, i) => {
    const tmpId = `search-post-${i}`;
    const repliesHtml = p.comments.map(c => `
      <div class="forum-reply">
        <div class="forum-reply-avatar" style="background:${hashColor(c.id)}">${c.id.charAt(0).toUpperCase()}</div>
        <div>
          <span class="forum-reply-id">${c.id}</span>
          <span style="font-size:13px;color:#2c3e50">${c.text}</span>
        </div>
      </div>`).join("");

    return `
    <div class="forum-post">
      <div class="forum-post-header">
        <div class="forum-post-title">${p.title}</div>
        <div class="forum-post-meta">
          <span>👤 ${resolved}</span>
          <span>🕐 ${p.time}</span>
          <span>💬 ${p.comments.length}</span>
        </div>
      </div>
      <div class="forum-post-body" style="white-space:pre-line">${p.body}</div>
      <div class="forum-post-footer">
        <button class="forum-toggle-btn" data-target="${tmpId}-replies">
          展开 ${p.comments.length} 条回复 ▾
        </button>
      </div>
      <div class="forum-replies" id="${tmpId}-replies">
        <div class="forum-replies-inner">${repliesHtml}</div>
      </div>
    </div>`;
  }).join("");

  resultArea.innerHTML = `
    <div class="campus-alert campus-alert-success mb-16">
      找到用户 "<strong>${resolved}</strong>" 的 ${posts.length} 条发帖记录
    </div>
    ${postsHtml}`;
  bindToggle();
}

function bindToggle() {
  document.querySelectorAll(".forum-toggle-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const target = document.getElementById(this.dataset.target);
      if (!target) return;
      const isOpen = target.classList.toggle("open");
      this.textContent = isOpen
        ? this.textContent.replace("展开", "收起").replace("▾", "▴")
        : this.textContent.replace("收起", "展开").replace("▴", "▾");
    });
  });
}

function hashColor(str) {
  const colors = ["#1a3a5c", "#2e4a7c", "#3a6080", "#1e5a3a", "#5a1e3a", "#3a3a1e", "#1e3a5a", "#4a2e6a"];
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) & 0xff;
  return colors[h % colors.length];
}
