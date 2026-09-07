export type Locale = 'ru' | 'en' | 'zh';

export const GAME = {
  name: 'Void Dominion',
  apkUrl:
    'https://github.com/Moonwuk/Nygame/releases/download/alpha/void-dominion-alpha.apk',
  browserUrl: 'https://moongametechnology.github.io/MoonGame/',
};

export interface Feature {
  icon: string;
  title: string;
  text: string;
}

export interface Faction {
  name: string;
  color: string;
  passive: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface UpcomingLink {
  icon: string;
  title: string;
  text: string;
  /** Появится URL — блок автоматически станет ссылкой. */
  href?: string;
}

export interface SectionHead {
  kicker: string;
  h2: string;
  sub?: string;
}

export interface SiteContent {
  meta: { title: string; description: string };
  nav: { features: string; factions: string; play: string };
  hero: {
    eyebrow: string;
    intro: string;
    download: string;
    browser: string;
    apkNote: string;
    modeNote: string;
  };
  soonBadge: string;
  stats: Stat[];
  features: { head: SectionHead; items: Feature[] };
  factions: { head: SectionHead; items: Faction[] };
  cta: { h2: string; text: string; download: string };
  upcoming: UpcomingLink[];
  footer: { copyright: string; soon: string };
}

export const CONTENT: Record<Locale, SiteContent> = {
  ru: {
    meta: {
      title: 'Void Dominion — космическая стратегия в реальном времени',
      description:
        'Void Dominion — космическая стратегия в реальном времени для игроков, которые привыкли считать ходы наперёд. Развивайте колонии, исследуйте технологии, командуйте флотами и меняйте баланс сил. Играбельная альфа на Android.',
    },
    nav: { features: 'Возможности', factions: 'Фракции', play: 'Играть' },
    hero: {
      eyebrow: 'Real-time · MMO · Стратегия',
      intro:
        'Космическая стратегия в реальном времени для тех, кто привык считать ходы наперёд. Выбирайте фракцию, развивайте колонии, исследуйте технологии, командуйте флотами и меняйте баланс сил.',
      download: 'Скачать альфу (Android)',
      browser: 'Играть в браузере',
      apkNote: 'Файл .apk — при установке разрешите «неизвестные источники»',
      modeNote: 'Пока доступен только одиночный тестовый режим с ботами.',
    },
    soonBadge: 'Скоро',
    stats: [
      { value: '10', label: 'живых игроков в матче' },
      { value: '24/7', label: 'кампания в реальном времени' },
      { value: '5', label: 'ресурсов в экономике' },
      { value: '4', label: 'фракции на выбор' },
    ],
    features: {
      head: {
        kicker: 'Что внутри',
        h2: 'Стратегия на масштабе галактики',
        sub: 'Экономика, исследования, дипломатия и война соединены в одной карте. Выберите фракцию, определите приоритеты и проведите империю через конфликт.',
      },
      items: [
        {
          icon: '🛰',
          title: 'Флоты и наземные армии',
          text: 'Собирайте флоты и высаживайте десант из пехоты и танков. Захватывайте миры в два этапа — сначала орбита, потом поверхность — под прикрытием дальнобойной артиллерии.',
        },
        {
          icon: '⛏',
          title: 'Экономика на 5 ресурсов',
          text: 'Развивайте добычу, стройте и налаживайте логистику между мирами. Темп кампании задаётся приказами, снабжением и тем, насколько далеко вы планируете.',
        },
        {
          icon: '🔬',
          title: 'Технологии и герои',
          text: 'Открывайте дерево технологий, собирайте совет учёных и ведите в бой героев со способностями. Между матчами прокачивайте командира по трём веткам.',
        },
        {
          icon: '🤝',
          title: 'Дипломатия и шпионаж',
          text: 'Мир, война, пакт и союз — с живыми игроками и ИИ. Засылайте разведчиков, ловите чужих шпионов и заключайте сделки на бирже.',
        },
        {
          icon: '🌐',
          title: 'Онлайн-матчи',
          text: 'До 10 живых командиров на одной карте. Прогресс хранится на сервере и не теряется, а опустевшие троны подхватывает ИИ.',
        },
        {
          icon: '🛡',
          title: '«Хранитель»',
          text: 'Передайте империю Хранителю — ИИ-помощнику для обороны и экономики. Настройте приоритеты и сосредоточьтесь на решениях, которые меняют кампанию.',
        },
      ],
    },
    factions: {
      head: {
        kicker: 'Дома космоса',
        h2: 'Выберите свою фракцию',
        sub: 'Четыре дома, четыре стиля игры. Выберите бонусы, определите приоритеты и вступите в борьбу за одну карту.',
      },
      items: [
        { name: 'Azure Compact', color: '#35d6e6', passive: '+12% экономика' },
        { name: 'Crimson Hegemony', color: '#ff5a4d', passive: '+10% урон' },
        { name: 'Amber Concord', color: '#ffb43a', passive: '+15% скорость флотов' },
        { name: 'Violet Ascendancy', color: '#b48cff', passive: '+5% экономика и +5% урон' },
      ],
    },
    cta: {
      h2: 'Ваш следующий ход начинается здесь.',
      text: 'Играбельная альфа доступна на Android: скирмиш против ИИ и тестовые онлайн-матчи. Выберите фракцию и проверьте свою стратегию.',
      download: 'Скачать APK',
    },
    upcoming: [
      {
        icon: '🌐',
        title: 'Браузерная версия',
        text: 'Тестовая версия без установки — открывается в браузере.',
        href: 'https://moongametechnology.github.io/MoonGame/',
      },
      { icon: '💬', title: 'Форум', text: 'Находите союзников, обсуждайте тактики, договаривайтесь о пактах.' },
      { icon: '🛒', title: 'Магазин', text: 'Всё для вашей империи — ближе к релизу.' },
    ],
    footer: {
      copyright: '© 2026 Void Dominion · Играбельная альфа для Android',
      soon: 'Скоро: форум · магазин',
    },
  },

  en: {
    meta: {
      title: 'Void Dominion — real-time space strategy',
      description:
        'Void Dominion is a real-time space strategy for players who think several moves ahead. Develop colonies, research technologies, command fleets and shift the balance of power. Playable alpha on Android.',
    },
    nav: { features: 'Features', factions: 'Factions', play: 'Play' },
    hero: {
      eyebrow: 'Real-time · MMO · Strategy',
      intro:
        'A real-time space strategy for players who think several moves ahead. Choose a faction, develop colonies, research technologies, command fleets and shift the balance of power.',
      download: 'Download alpha (Android)',
      browser: 'Play in browser',
      apkNote: 'APK file — allow “unknown sources” when installing',
      modeNote: 'Only a single-player test mode with bots is available for now.',
    },
    soonBadge: 'Soon',
    stats: [
      { value: '10', label: 'live players per match' },
      { value: '24/7', label: 'real-time campaign' },
      { value: '5', label: 'resources to manage' },
      { value: '4', label: 'factions to choose from' },
    ],
    features: {
      head: {
        kicker: "What's inside",
        h2: 'Strategy at galactic scale',
        sub: 'Economy, research, diplomacy and war meet on one map. Choose a faction, set your priorities and lead your empire through conflict.',
      },
      items: [
        {
          icon: '🛰',
          title: 'Fleets and ground armies',
          text: 'Assemble fleets and land troops of infantry and tanks. Capture worlds in two stages — orbit first, then the surface — under cover of long-range artillery.',
        },
        {
          icon: '⛏',
          title: 'A 5-resource economy',
          text: 'Expand mining, develop your worlds and run logistics between them. The campaign rewards clear orders, strong supply lines and planning several moves ahead.',
        },
        {
          icon: '🔬',
          title: 'Tech and heroes',
          text: 'Unlock the tech tree, assemble a council of scientists and lead heroes with abilities. Between matches, level up your commander across three branches.',
        },
        {
          icon: '🤝',
          title: 'Diplomacy and espionage',
          text: 'Peace, war, pacts and alliances — with live players and AI. Send out spies, catch enemy agents and strike deals on the exchange.',
        },
        {
          icon: '🌐',
          title: 'Online matches',
          text: 'Up to 10 live commanders on one map. Progress is stored on the server and never lost, and abandoned thrones are picked up by AI.',
        },
        {
          icon: '🛡',
          title: 'The Warden',
          text: 'The Warden is an AI assistant for defense and economy. Set priorities and keep your attention on the decisions that shape the campaign.',
        },
      ],
    },
    factions: {
      head: {
        kicker: 'Houses of space',
        h2: 'Choose your faction',
        sub: 'Four houses, four ways to play. Choose your bonuses, set your priorities and enter the fight for one map.',
      },
      items: [
        { name: 'Azure Compact', color: '#35d6e6', passive: '+12% economy' },
        { name: 'Crimson Hegemony', color: '#ff5a4d', passive: '+10% damage' },
        { name: 'Amber Concord', color: '#ffb43a', passive: '+15% fleet speed' },
        { name: 'Violet Ascendancy', color: '#b48cff', passive: '+5% economy and +5% damage' },
      ],
    },
    cta: {
      h2: 'Your next move starts here.',
      text: 'The playable alpha is available on Android: skirmish against AI and test online matches. Choose a faction and test your strategy.',
      download: 'Download APK',
    },
    upcoming: [
      {
        icon: '🌐',
        title: 'Browser version',
        text: 'Try the browser test version without installing.',
        href: 'https://moongametechnology.github.io/MoonGame/',
      },
      { icon: '💬', title: 'Forum', text: 'Find allies, discuss tactics, negotiate pacts.' },
      { icon: '🛒', title: 'Shop', text: 'Everything for your empire — closer to release.' },
    ],
    footer: {
      copyright: '© 2026 Void Dominion · Playable alpha for Android',
      soon: 'Coming soon: forum · shop',
    },
  },

  zh: {
    meta: {
      title: 'Void Dominion — 实时太空战略游戏',
      description:
        'Void Dominion 是一款面向策略老手的实时太空战略游戏。发展殖民地、研究科技、指挥舰队，改变银河的力量平衡。Android 试玩版现已推出。',
    },
    nav: { features: '特色', factions: '阵营', play: '开始游戏' },
    hero: {
      eyebrow: '实时 · MMO · 战略',
      intro:
        '面向策略老手的实时太空战略游戏。选择阵营、发展殖民地、研究科技、指挥舰队，改变银河的力量平衡。',
      download: '下载测试版（Android）',
      browser: '浏览器试玩',
      apkNote: 'APK 文件——安装时请允许「未知来源」',
      modeNote: '目前仅开放单人测试模式（对战机器人）。',
    },
    soonBadge: '即将推出',
    stats: [
      { value: '10', label: '每场实时玩家' },
      { value: '24/7', label: '实时战役节奏' },
      { value: '5', label: '种经济资源' },
      { value: '4', label: '个可选阵营' },
    ],
    features: {
      head: {
        kicker: '游戏内容',
        h2: '银河尺度的战略',
        sub: '经济、研究、外交与战争汇聚在同一张地图。选择阵营，确定优先级，带领帝国穿越冲突。',
      },
      items: [
        {
          icon: '🛰',
          title: '舰队与地面部队',
          text: '组建舰队，投放步兵和坦克。分两个阶段夺取星球——先控制轨道，再攻占地表，远程火炮为你提供掩护。',
        },
        {
          icon: '⛏',
          title: '五种资源的经济',
          text: '扩大开采、建设星球、打通星际物流。清晰的指令、可靠的补给线与提前规划，决定战局走向。',
        },
        {
          icon: '🔬',
          title: '科技与英雄',
          text: '解锁科技树，组建科学家委员会，率领拥有技能的英雄。在比赛之间沿三条分支培养你的指挥官。',
        },
        {
          icon: '🤝',
          title: '外交与谍报',
          text: '和平、战争、条约与同盟——与真人玩家和 AI 周旋。派出间谍、抓捕敌探、在交易所达成交易。',
        },
        {
          icon: '🌐',
          title: '在线对战',
          text: '同一张地图最多 10 名真人指挥官。进度保存在服务器上永不丢失，空出的王座由 AI 接管。',
        },
        {
          icon: '🛡',
          title: '「守护者」',
          text: '「守护者」是负责防线与经济的 AI 助手。设定优先级，把注意力留给真正改变战局的决策。',
        },
      ],
    },
    factions: {
      head: {
        kicker: '太空豪门',
        h2: '选择您的阵营',
        sub: '四大家族，四种玩法。选择专属加成，确定优先级，加入同一张地图的争夺。',
      },
      items: [
        { name: 'Azure Compact', color: '#35d6e6', passive: '+12% 经济' },
        { name: 'Crimson Hegemony', color: '#ff5a4d', passive: '+10% 伤害' },
        { name: 'Amber Concord', color: '#ffb43a', passive: '+15% 舰队速度' },
        { name: 'Violet Ascendancy', color: '#b48cff', passive: '+5% 经济与 +5% 伤害' },
      ],
    },
    cta: {
      h2: '下一步，从这里开始。',
      text: 'Android 试玩版现已推出：与 AI 遭遇战，或参与测试在线对战。选择阵营，验证您的战略。',
      download: '下载 APK',
    },
    upcoming: [
      {
        icon: '🌐',
        title: '网页版',
        text: '无需安装，在浏览器中试玩。',
        href: 'https://moongametechnology.github.io/MoonGame/',
      },
      { icon: '💬', title: '论坛', text: '寻找盟友、探讨战术、商定条约。' },
      { icon: '🛒', title: '商店', text: '帝国所需的一切——临近正式发布时推出。' },
    ],
    footer: {
      copyright: '© 2026 Void Dominion · Android 试玩版',
      soon: '即将推出：论坛 · 商店',
    },
  },
};
