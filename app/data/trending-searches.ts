import { useTranslation } from "react-i18next";
import { useMemo } from "react";

// Trending search items with stable IDs for cross-language matching
export const TRENDING_ITEMS = [
  { id: "zpd-traffic", en: "ZPD traffic report this morning", zh: "ZPD 今早交通报告" },
  { id: "tundratown-snow", en: "Tundratown snowstorm alert", zh: "冰川镇暴风雪警报" },
  { id: "sahara-heat", en: "Sahara Square heat advisory", zh: "撒哈拉广场高温预警" },
  { id: "elephant-shoes", en: "where to buy jumbo elephant shoes", zh: "哪里买大象特大号鞋子" },
  { id: "carrot-futures", en: "Burrowtown carrot futures price", zh: "兔窝镇胡萝卜期货价格" },
  { id: "rodentia-safe", en: "is Little Rodentia safe at night", zh: "小啮齿城晚上安全吗" },
  { id: "support-groups", en: "best predator-prey support groups", zh: "最佳捕食者-猎物互助小组" },
  { id: "chief-bogo", en: "how to file complaint with Chief Bogo", zh: "如何向博格局长投诉" },
  { id: "night-howler", en: "night howler sightings downtown", zh: "午夜嚎叫者市中心目击" },
  { id: "gazelle-concert", en: "Gazelle surprise concert rumors", zh: "夏奇羊惊喜演唱会传闻" },
  { id: "metro-delay", en: "Zootopia Metro delay explanation", zh: "动物城地铁延误解释" },
  { id: "clawhauser-donut", en: "Clawhauser donut discount code", zh: "豹警官甜甜圈优惠码" },
  { id: "mr-big-wedding", en: "Mr Big daughter wedding photos", zh: "大先生女儿婚礼照片" },
  { id: "polar-bear-apt", en: "legal size apartment for polar bears", zh: "北极熊合法公寓尺寸" },
  { id: "fox-adopt", en: "can foxes adopt rabbits legally", zh: "狐狸可以合法收养兔子吗" },
  { id: "zpd-recruit", en: "ZPD recruitment requirements 2026", zh: "ZPD 2026年招聘要求" },
  { id: "cooling-tax", en: "Arctic Circle cooling tax update", zh: "北极圈降温税更新" },
  { id: "savanna-rent", en: "Savanna Central rent increase", zh: "草原中心房租上涨" },
  { id: "skyline-designer", en: "who designed Zootopia skyline", zh: "谁设计了动物城天际线" },
  { id: "rainforest-humid", en: "Rainforest District humidity complaint", zh: "雨林区湿度投诉" },
  { id: "hibernation-leave", en: "is hibernation leave paid", zh: "冬眠假有工资吗" },
  { id: "sahara-brunch", en: "best brunch in Sahara Square", zh: "撒哈拉广场最佳早午餐" },
  { id: "skyline-photos", en: "Zootopia skyline at night photos", zh: "动物城天际线夜景照片" },
  { id: "predator-curfew", en: "predator curfew law fact check", zh: "捕食者宵禁法律核实" },
  { id: "missing-mammal", en: "how to report missing mammal", zh: "如何报告失踪哺乳动物" },
  { id: "election", en: "Zootopia election candidates", zh: "动物城选举候选人" },
  { id: "bellwether", en: "Bellwether policy archives", zh: "羊副市长政策档案" },
  { id: "ranger-program", en: "junior ranger program sign up", zh: "少年骑警项目报名" },
  { id: "recycle-fur", en: "where to recycle shed fur", zh: "哪里回收脱落的毛发" },
  { id: "roommate-advice", en: "inter-species roommate advice", zh: "跨物种室友建议" },
  { id: "fox-insurance", en: "fox-friendly insurance plans", zh: "狐狸友好保险计划" },
  { id: "rabbit-stats", en: "rabbit population statistics", zh: "兔子人口统计" },
  { id: "paw-pass", en: "Zootopia transit paw pass balance", zh: "动物城交通爪通卡余额" },
  { id: "soundproof-burrow", en: "DIY soundproof burrow tips", zh: "自制隔音洞穴技巧" },
  { id: "lionheart-height", en: "how tall is Mayor Lionheart really", zh: "狮市长到底有多高" },
  { id: "howler-blackmarket", en: "night howler black market rumors", zh: "午夜嚎叫黑市传闻" },
  { id: "claw-salon", en: "best claw salon near me", zh: "附近最佳爪子沙龙" },
  { id: "food-truck", en: "Zootopia food truck festival", zh: "动物城美食车节" },
  { id: "tundratown-small", en: "is Tundratown good for small mammals", zh: "冰川镇适合小型哺乳动物吗" },
  { id: "moving-permit", en: "moving permit large mammals", zh: "大型哺乳动物搬家许可" },
  { id: "zpd-scanner", en: "ZPD scanner live feed", zh: "ZPD 扫描仪直播" },
  { id: "skunk-spray", en: "how to avoid skunk spray incidents", zh: "如何避免臭鼬喷雾事件" },
  { id: "size-zoning", en: "animal size zoning regulations", zh: "动物体型分区法规" },
  { id: "rodentia-flood", en: "Little Rodentia flood warning", zh: "小啮齿城洪水警报" },
  { id: "rooftop-bars", en: "Savanna Central rooftop bars", zh: "草原中心屋顶酒吧" },
  { id: "tech-startups", en: "Zootopia tech startups hiring", zh: "动物城科技初创公司招聘" },
  { id: "predator-meditation", en: "predator meditation classes", zh: "捕食者冥想课程" },
  { id: "drone-ban", en: "Zootopia skyline drone ban", zh: "动物城天际线无人机禁令" },
  { id: "glow-carrot", en: "where to buy glow carrot juice", zh: "哪里买发光胡萝卜汁" },
  { id: "nick-license", en: "Nick Wilde business license lookup", zh: "尼克·王尔德营业执照查询" },
  { id: "gary-snake", en: "who is Gary the snake", zh: "蛇盖瑞到底是谁" },
  { id: "gary-stole-diary", en: "why Gary stole the ancient diary", zh: "盖瑞为何偷古籍" },
  { id: "snake-ancestor", en: "Agnes the climate wall designer", zh: "气候墙设计师艾格尼丝沉冤待雪" },
  { id: "lynx-conspiracy", en: "Lynx family climate wall fraud", zh: "猞猁家族篡改气候墙数据真相" },
  { id: "reptile-expulsion", en: "why reptiles were banished", zh: "爬行动物百年前为何被驱逐" },
  { id: "marsh-market", en: "Zootopia Marsh Market guide", zh: "沼泽区湿地市场游玩指南" },
  { id: "mayor-winddancer", en: "Mayor Winddancer actor background", zh: "新市长马飞扬演艺圈背景起底" },
  { id: "nibbles-maplestick", en: "Nibbles urban explorer tips", zh: "狸宝城市探险攻略" },
  { id: "pawbert-lynxley", en: "Pawbert Lynxley family tree", zh: "宝伯特·林雪猁家族关系" },
  { id: "zpd-wanted", en: "why Nick and Judy are wanted", zh: "朱迪尼克为何成逃犯" },
  { id: "reptile-district", en: "new reptile district map", zh: "动物城爬行动物区地图解禁" },
  { id: "fuzzby-lab", en: "Dr. Fuzzby quokka lab explosion", zh: "弗兹比医生实验室爆炸事故" },
  { id: "steampunk-bazaar", en: "underground steampunk black market", zh: "地下蒸汽朋克黑市入口" },
  { id: "gazelle-new-song", en: "Gazelle new song Zoo", zh: "夏奇羊新单曲《动物园》试听" },
  { id: "mayor-conference", en: "Zootopia 100th anniversary gala", zh: "动物城百年庆典红毯直击" },
  { id: "judy-gown", en: "Judy Hopps gala gown designer", zh: "朱迪庆典华服设计师是谁" },
  { id: "nick-umbrella", en: "Nick Wilde wet fox fur quote", zh: "尼克淋雨名言狐狸毛防水" },
  { id: "reptile-rights", en: "reptile rights march today", zh: "爬行动物平权游行现场" },
  { id: "climate-wall-history", en: "climate wall original blueprint", zh: "气候墙原始草图藏秘密" },
  { id: "snake-warmth", en: "are snakes cold-blooded", zh: "蛇真的是冷血动物吗" },
  { id: "mammal-reptile-conflict", en: "mammal-reptile conflict explained", zh: "哺乳动物与爬行动物对立始末" },
  { id: "bogo-attitude", en: "Chief Bogo on reptile case", zh: "博格局长谈爬行动物案件" },
  { id: "clawhauser-reaction", en: "Clawhauser snake reaction", zh: "豹警官见到蛇的反应" },
  { id: "flash-cameo", en: "Flash the sloth driving scene", zh: "树懒闪电飙车名场面" },
  { id: "gary-fang", en: "Gary the snake missing fang", zh: "盖瑞的毒牙去哪了" },
  { id: "fifty-million-animals", en: "50k animals per frame tech", zh: "单帧5万动物同框怎么做到的" },
  { id: "new-species-list", en: "Zootopia 2 new species list", zh: "二代新增76种动物全名单" },
  { id: "marsh-market-food", en: "best food in Marsh Market", zh: "湿地市场必吃小吃" },
  { id: "amphibian-district", en: "amphibian underwater district", zh: "两栖动物水下区域开放" },
  { id: "gary-optimism", en: "Gary optimistic personality", zh: "极度乐观的蛇是怎样炼成的" },
  { id: "lynx-privilege", en: "Lynx family privilege exposed", zh: "猞猁家族特权地位遭质疑" },
  { id: "snake-scale-recycling", en: "where to recycle snake scales", zh: "哪里回收蛇蜕" },
  { id: "reptile-housing", en: "reptile-friendly housing", zh: "爬行动物友好公寓推荐" },
  { id: "cold-blooded-heating", en: "cold-blooded heating bill help", zh: "冷血动物取暖补贴申请" },
  { id: "venom-antidote", en: "snake venom antidote locations", zh: "蛇毒血清哪里有" },
  { id: "boa-constrictor-permit", en: "boa constrictor moving permit", zh: "蟒蛇搬家许可特殊要求" },
  { id: "lizard-daycare", en: "lizard daycare temperature", zh: "蜥蜴托儿所恒温标准" },
  { id: "turtle-pace", en: "turtle lane traffic law", zh: "龟速车道交通法规" },
  { id: "crocodile-bags", en: "crocodile skin bag ban", zh: "鳄鱼皮包禁令讨论" },
  { id: "chameleon-camouflage", en: "chameleon camouflage legal", zh: "变色龙伪装术是否合法" },
  { id: "gecko-feet", en: "gecko feet ceiling repair", zh: "壁虎脚掌天花板维修费谁出" },
  { id: "reptile-restaurants", en: "insect restaurants for reptiles", zh: "爬行动物昆虫餐厅推荐" },
  { id: "snake-yoga", en: "snake yoga classes", zh: "蛇式瑜伽班" },
  { id: "lizard-tails", en: "lizard tail regrowth clinic", zh: "蜥蜴尾巴再生诊所" },
  { id: "turtle-shell", en: "turtle shell repair shop", zh: "龟壳修复店" },
  { id: "snake-hibernation", en: "snake brumation vs hibernation", zh: "蛇的冬眠和哺乳动物不同" },
  { id: "reptile-schools", en: "first reptile school opens", zh: "首家爬行动物学校开学" },
  { id: "inter-species-marriage", en: "mammal-reptile marriage legal", zh: "哺乳动物与爬行动物通婚合法吗" },
  { id: "nick-undercover", en: "Nick Wilde undercover photos", zh: "尼克卧底照泄露" },
  { id: "zootopia-2-ending", en: "Zootopia 2 ending explained", zh: "二代结局真相深度解析" }
];

// Default English searches (for backward compatibility)
export const DEFAULT_TRENDING_SEARCHES = TRENDING_ITEMS.map(item => item.en);

// Hook to get translated trending searches with stable ordering
export function useTrendingSearches(): string[] {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return useMemo(() => {
    const isZh = currentLang.startsWith("zh");
    return TRENDING_ITEMS.map(item => isZh ? item.zh : item.en);
  }, [currentLang]);
}

// Hook to get shuffled trending searches with stable ID-based ordering
export function useShuffledTrendingSearches(count: number): string[] {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return useMemo(() => {
    // Create a stable shuffle based on current date hour
    // This ensures all users see the same shuffle within the same hour
    // but it changes every hour
    const now = new Date();
    const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate() + now.getHours();

    const isZh = currentLang.startsWith("zh");

    // Fisher-Yates shuffle with seed
    const items = [...TRENDING_ITEMS];
    let currentSeed = seed;

    for (let i = items.length - 1; i > 0; i--) {
      // Simple seeded random
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      const j = Math.floor((currentSeed / 233280) * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items.slice(0, count).map(item => isZh ? item.zh : item.en);
  }, [currentLang, count]);
}

/** 客户端用日期做种子的 shuffle，仅在水合后调用，避免 SSR 与客户端不一致 */
export function shuffleTrendingItems(items: string[], count: number): string[] {
  const now = new Date();
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate() + now.getHours();
  const arr = [...items];
  let currentSeed = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const j = Math.floor((currentSeed / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

// Backward compatibility
export const TRENDING_SEARCHES = DEFAULT_TRENDING_SEARCHES;
