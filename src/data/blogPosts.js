// Blog articles. Content is original writing based on general, widely-known
// South Indian catering/wedding-dining conventions — not business-specific
// claims. No prices, years of experience, awards, testimonials, ratings or
// addresses are stated anywhere here; see businessConfig.js for why.
//
// `content` blocks: {type:'p'|'h2'|'h3', text} | {type:'ul', items:[...]} |
// {type:'link', to, label, description} (an in-article internal link card).
export const blogPosts = [
  {
    id: 'post-1',
    slug: 'best-catering-services-chennai',
    title: 'Best Catering Services in Chennai – How to Choose the Right Caterer',
    excerpt:
      'A practical guide to evaluating catering services in Chennai — menu fit, service style, guest planning and the questions worth asking before you book.',
    metaDescription:
      'How to choose the right catering service in Chennai: menu selection, traditional dining vs buffet, guest planning, food quality and key questions to ask before booking.',
    categories: ['chennai-catering-guides', 'catering-planning-tips'],
    date: '2026-10-20',
    image: '/assets/services/buffet-catering.webp',
    imageAlt: 'Catering buffet counter set up for an event in Chennai',
    content: [
      {
        type: 'p',
        text:
          "Chennai has no shortage of caterers, which is exactly why picking the right one can feel overwhelming. Instead of chasing whichever name comes up first in a search, it helps to judge a caterer against a short, practical checklist — menu fit, service style, food quality, and how clearly they communicate before the event.",
      },
      { type: 'h2', text: 'Start with the menu, not the marketing' },
      {
        type: 'p',
        text:
          "The most useful first question isn't \"who is the best caterer in Chennai\" — it's \"who serves the kind of meal my guests expect\". A traditional wedding crowd expecting a full banana-leaf sadya-style meal will be happiest with a caterer who specialises in that format, while a corporate lunch or a mixed-age birthday party may suit a buffet far better. Ask to see a sample menu broken into categories (tiffin items, rice varieties, gravies, sweets, accompaniments) rather than a vague \"veg package\" description.",
      },
      { type: 'h2', text: 'Traditional dining vs buffet service' },
      {
        type: 'p',
        text:
          'Traditional banana-leaf service suits weddings, Seemantham ceremonies, housewarming functions and other occasions where the ritual of being served, course by course, is part of the experience. It needs more serving staff and a layout where guests are seated in rows. Buffet service is faster to set up, works well for standing or mixed seating events, and gives guests more control over portions — but it can feel less personal for a traditional family function. Neither is objectively "better"; the right choice depends on the occasion and the venue.',
      },
      { type: 'h2', text: 'Plan the guest count early, not last' },
      {
        type: 'p',
        text:
          "Guest count affects almost every other decision: how many serving counters or serving lines are needed, how much kitchen prep time is required, and how the venue layout should be arranged. Share your expected guest count — and a realistic buffer for last-minute additions — with your caterer as early as possible, rather than finalising it the week before the event.",
      },
      { type: 'h2', text: 'Questions worth asking before you book' },
      {
        type: 'ul',
        items: [
          'Can I see or taste a sample of the actual menu I am considering?',
          'How many serving staff will be assigned for my guest count?',
          'What is included in the quoted package — rice varieties, sweets, accompaniments — and what counts as an add-on?',
          'How much advance notice do you need for the final guest count and menu confirmation?',
          'Can the menu accommodate specific requirements (fully vegetarian, Brahmin-style, Jain, etc.)?',
          'Who handles setup and clearing at the venue, and how long does that take?',
        ],
      },
      { type: 'h2', text: 'Food quality considerations that matter on the day' },
      {
        type: 'p',
        text:
          'Beyond taste, ask how food is kept hot or fresh through a long event, how rice and gravies are replenished during service, and how hygiene is maintained at the serving counters. A caterer who can answer these clearly — rather than with generic reassurance — is usually one who has actually thought through event-day logistics.',
      },
      {
        type: 'link',
        to: '/menus',
        label: 'Explore Our Menu Packages',
        description: 'See predefined banana-leaf menu packages with full dish lists.',
      },
      { type: 'h2', text: 'Getting in touch' },
      {
        type: 'p',
        text:
          'If you’d like to discuss a menu or get a sense of what would suit your event, you can reach Madhava Catering Services through the enquiry form on any menu page, or using the phone numbers in the footer of this site.',
      },
    ],
    faqs: [
      {
        q: 'Is buffet or traditional banana-leaf service better for a wedding?',
        a: 'It depends on the occasion and guest profile. Traditional service suits formal, ritual-led wedding meals; buffet suits receptions and mixed/standing-style events. Many families choose traditional service for the main wedding meal and a buffet for a reception the same evening.',
      },
      {
        q: 'How far in advance should I finalise my catering menu?',
        a: 'As a general practice, finalising the menu and an approximate guest count a few weeks ahead gives a caterer enough time to plan sourcing and staffing, with a final headcount confirmed closer to the event date.',
      },
    ],
  },

  {
    id: 'post-2',
    slug: 'south-indian-wedding-catering-menu',
    title: 'Traditional South Indian Wedding Catering Menu Guide',
    excerpt:
      'A walkthrough of the traditional banana-leaf wedding meal — serving order, common menu categories, and how the arrangement on the leaf works.',
    metaDescription:
      'Guide to traditional South Indian wedding catering menus: banana leaf serving traditions, common menu categories, rice varieties, sweets and accompaniments.',
    categories: ['wedding-catering', 'traditional-south-indian-menus', 'tamil-nadu-celebrations'],
    date: '2026-10-24',
    image: '/assets/services/wedding-catering.webp',
    imageAlt: 'Traditional South Indian wedding meal served on a banana leaf',
    content: [
      {
        type: 'p',
        text:
          'A traditional South Indian wedding meal served on a banana leaf is as much about arrangement and sequence as it is about the dishes themselves. For families planning a wedding, understanding how this meal is structured makes it much easier to have a useful conversation with a caterer about what to include.',
      },
      { type: 'h2', text: 'Why the banana leaf?' },
      {
        type: 'p',
        text:
          'The banana leaf is a practical and traditional serving surface across Tamil Nadu — it keeps food fresh, imparts a subtle aroma, and its disposability suits large gatherings. Leaves are typically placed with the tapering end to the diner’s left, and washed with a little water before serving begins, which is itself a small ritual moment at the start of the meal.',
      },
      { type: 'h2', text: 'The general layout' },
      {
        type: 'p',
        text:
          "While exact placement varies by family and region, wedding meals are generally arranged with salt, pickle and crunchy accompaniments like appalam toward the top of the leaf, poriyal (stir-fried vegetable) and kootu dishes along the upper-middle section, and rice — the centrepiece — taking up the lower-middle area where sambar, rasam and kulambu are served and mixed in sequence. Sweets are commonly placed in the upper-right section, and curd rice or buttermilk typically signals the final course.",
      },
      { type: 'h2', text: 'Common menu categories' },
      {
        type: 'ul',
        items: [
          'Welcome drinks or a starter course, often served before guests are seated for the main meal',
          'Vadai and other fried tiffin-style items',
          'Pachadi, kosumalli and other fresh vegetable/yogurt-based sides',
          'Pickle and thogayal (chutney-style preparations)',
          'Poriyal (dry vegetable stir-fries) and kootu (lentil-vegetable preparations)',
          'Rice varieties, sambar, rasam and kulambu',
          'Appalam (papad) as a crunchy side',
          'Payasam and other traditional sweets',
          'Curd or buttermilk to close the meal',
        ],
      },
      { type: 'h2', text: 'Rice varieties and serving sequence' },
      {
        type: 'p',
        text:
          'Plain rice is usually served first, paired with sambar, then rasam, and finally a thicker kulambu — each poured over a fresh portion of rice rather than all at once. Some menus also include a flavoured rice variety later in the meal as a change of pace before the sweet course.',
      },
      { type: 'h2', text: 'Sweets and savouries' },
      {
        type: 'p',
        text:
          'Payasam is the most common wedding sweet across Tamil Nadu, though menus often include a second sweet such as a traditional halwa or laddu-style item for variety. Savoury fried items like vadai or murukku frequently appear earlier in the meal as part of the starter course.',
      },
      {
        type: 'link',
        to: '/menus',
        label: 'See Our Menu Packages',
        description: 'Browse predefined wedding menu packages with category-wise dish lists.',
      },
      { type: 'h2', text: 'Planning tip' },
      {
        type: 'p',
        text:
          'When discussing a wedding menu with a caterer, it helps to go category by category — tiffin, rice, gravies, sweets, accompaniments — rather than asking for "a traditional menu" in general terms, since the right balance of items depends on guest count, meal timing and family preference.',
      },
    ],
    faqs: [
      {
        q: 'Is the banana leaf meal always fully vegetarian?',
        a: 'Many traditional South Indian wedding meals are vegetarian, especially for Brahmin or temple-adjacent weddings, but this varies by community and family preference — it is worth confirming directly with your caterer rather than assuming.',
      },
      {
        q: 'How many sweets are typically included in a wedding menu?',
        a: 'This varies widely by budget and family tradition — some menus include a single payasam, others include two or three sweets. It is a good point to discuss explicitly when finalising your package.',
      },
    ],
  },

  {
    id: 'post-3',
    slug: 'brahmin-catering-chennai',
    title: 'Brahmin Catering in Chennai – Traditional Vegetarian Menu Ideas',
    excerpt:
      'What Brahmin-style vegetarian catering usually involves, and practical menu-planning considerations for families organising this kind of event.',
    metaDescription:
      'A guide to Brahmin catering in Chennai: traditional vegetarian menu ideas, family preferences, serving conventions and what to discuss with your caterer.',
    categories: ['brahmin-catering', 'chennai-catering-guides', 'traditional-south-indian-menus'],
    date: '2026-10-28',
    image: '/assets/services/brahmin-catering.webp',
    imageAlt: 'Traditional vegetarian South Indian meal served on a banana leaf',
    content: [
      {
        type: 'p',
        text:
          'Brahmin catering refers broadly to a style of fully vegetarian South Indian catering, typically without onion and garlic in certain dishes, served in the traditional banana-leaf format. It is commonly requested for weddings, Seemantham ceremonies, housewarming functions and other occasions rooted in family or religious tradition. Exact conventions differ between families, so this guide covers general planning considerations rather than a fixed rulebook.',
      },
      { type: 'h2', text: 'What "Brahmin-style" usually means for a menu' },
      {
        type: 'p',
        text:
          'In most cases, it means a strictly vegetarian menu, often prepared without onion and garlic, using traditional South Indian cooking methods and a serving format that follows the conventional banana-leaf layout. Because the exact restrictions (asafoetida use, specific lentils, particular vegetables) vary by family and occasion, it is worth stating your preferences clearly rather than assuming a caterer will apply a single fixed standard.',
      },
      { type: 'h2', text: 'Menu planning considerations' },
      {
        type: 'ul',
        items: [
          'Confirm whether onion and garlic should be excluded from all dishes or only specific ones',
          'Ask how pickle, thogayal and chutney varieties are prepared, since these often contain stronger spicing',
          'Discuss rice and kulambu varieties — some families have a strong preference for specific preparations for ceremonial occasions',
          'Clarify dessert expectations — payasam is near-universal, but the type (semiya, paal, etc.) is worth specifying',
          'Mention any additional dietary notes (Jain-style, no root vegetables, etc.) explicitly, since these are easy to miss otherwise',
        ],
      },
      { type: 'h2', text: 'Traditional serving arrangements' },
      {
        type: 'p',
        text:
          'Brahmin-style catering is almost always served on a banana leaf, following the general layout used for traditional South Indian meals — accompaniments and pickles toward the top, poriyal and kootu in the middle, rice and gravies taking the central position, and sweets typically placed to one side. For ceremonial occasions like Seemantham or housewarming functions, families sometimes request a slightly adjusted arrangement; it is reasonable to ask your caterer whether this is something they can accommodate.',
      },
      { type: 'h2', text: 'Common festive dishes' },
      {
        type: 'p',
        text:
          'Depending on the occasion, menus commonly include vadai, a vegetable kootu, one or two poriyal varieties, sambar, rasam, a kulambu, payasam, and curd rice to close the meal. The exact combination is best discussed dish-by-dish with your caterer rather than requested as a single generic "traditional menu".',
      },
      {
        type: 'link',
        to: '/services',
        label: 'View Our Catering Services',
        description: 'See the full range of occasions Madhava Catering Services caters for.',
      },
      { type: 'h2', text: 'A note on confirmation' },
      {
        type: 'p',
        text:
          'Because dietary practices and ritual conventions differ meaningfully between families, this article intentionally avoids stating a single fixed set of rules. Always confirm specific requirements directly with your caterer before finalising a Brahmin-style menu for your event.',
      },
    ],
    faqs: [
      {
        q: 'Does Brahmin catering always exclude onion and garlic?',
        a: 'Often, but not universally — it depends on the family and the specific occasion. Confirm this directly rather than assuming.',
      },
      {
        q: 'Can Brahmin-style menus be adjusted for modern tastes?',
        a: 'Many caterers can offer lighter spicing or additional variety within the traditional format — it is worth discussing what flexibility is available for your event.',
      },
    ],
  },

  {
    id: 'post-4',
    slug: 'wedding-catering-cost-chennai',
    title: 'Wedding Catering Cost in Chennai – What Affects the Price?',
    excerpt:
      'The main factors that influence a catering quotation — guest count, menu complexity, service style and venue — explained without guessing at numbers.',
    metaDescription:
      'What affects wedding catering costs in Chennai: guest count, menu selection, buffet vs traditional service, venue logistics, and questions to ask for an accurate quotation.',
    categories: ['wedding-catering', 'chennai-catering-guides', 'catering-planning-tips'],
    date: '2026-11-02',
    image: '/assets/services/reception-buffet.webp',
    imageAlt: 'Catering buffet set up for a wedding reception',
    content: [
      {
        type: 'p',
        text:
          "Catering cost varies enormously based on guest count, menu, service style and venue — there is no single meaningful \"average price\" that applies to every event. Instead of looking for a fixed number, it's more useful to understand the specific factors a caterer actually prices against, so you can ask for — and understand — an accurate, itemised quotation.",
      },
      { type: 'h2', text: 'Number of guests' },
      {
        type: 'p',
        text:
          'This is the single biggest driver of cost, since it determines raw ingredient quantities, staffing levels and serving-counter requirements. Caterers generally quote per-head pricing for a given menu, so an accurate guest estimate (with a reasonable buffer) is the starting point for any quotation.',
      },
      { type: 'h2', text: 'Menu selection and number of items' },
      {
        type: 'p',
        text:
          'A compact menu with fewer categories costs less than an elaborate spread covering multiple rice varieties, several sweets, and additional starter courses. It helps to decide early which categories matter most to you — rather than defaulting to the largest package — and build the menu around that.',
      },
      { type: 'h2', text: 'Buffet vs traditional banana-leaf service' },
      {
        type: 'p',
        text:
          'Traditional banana-leaf service generally requires more serving staff (since food is served to seated guests course by course), while buffet service needs fewer serving staff but more counters and equipment (chafing dishes, display setups). Which costs more depends on your specific guest count and venue layout — it is not a fixed rule either way.',
      },
      { type: 'h2', text: 'Event location and logistics' },
      {
        type: 'p',
        text:
          'Distance from the caterer’s base, availability of a functional kitchen at the venue, and whether equipment needs to be transported and set up on-site all affect the final cost. An outdoor or non-standard venue may need additional setup time and equipment compared to a venue with an existing catering-ready space.',
      },
      { type: 'h2', text: 'Service requirements beyond food' },
      {
        type: 'p',
        text:
          'Serving staff, cleanup, and sometimes additional equipment rental are often priced separately from the food itself. When comparing quotations from different caterers, check carefully whether these are included or listed as add-ons — otherwise you may be comparing incomplete numbers.',
      },
      { type: 'h2', text: 'Questions to ask when requesting a quotation' },
      {
        type: 'ul',
        items: [
          'Is the quote per-head, and does it already include serving staff?',
          'What exactly is included in the base package versus offered as an add-on?',
          'Does the quote change based on final guest count confirmation closer to the date?',
          'Are setup, service and cleanup all covered, or billed separately?',
          'What is the cancellation or guest-count-reduction policy?',
        ],
      },
      {
        type: 'link',
        to: '/menus',
        label: 'Browse Menu Packages',
        description: 'See our predefined menu packages and enquire about one for your event.',
      },
      {
        type: 'p',
        text:
          'This article intentionally does not quote specific prices, since catering costs genuinely vary by event. For an accurate quotation for your event, the most reliable approach is to share your guest count, preferred menu categories and venue details directly with a caterer.',
      },
    ],
    faqs: [
      {
        q: 'Is buffet catering always cheaper than traditional service?',
        a: 'Not necessarily — it depends on guest count and venue. Buffet needs fewer serving staff but more equipment; traditional service needs more staff but less equipment. Get quotes for both if you are undecided.',
      },
      {
        q: 'When should I confirm my final guest count?',
        a: 'Most caterers appreciate an early estimate for planning, with a final confirmed number closer to the event — ask your caterer what their specific cutoff is.',
      },
    ],
  },

  {
    id: 'post-5',
    slug: 'seemantham-catering-menu',
    title: 'Seemantham Catering – Traditional Menu and Planning Guide',
    excerpt:
      'An introduction to Seemantham celebrations and the traditional vegetarian menu choices, guest planning and catering arrangements involved.',
    metaDescription:
      'Seemantham catering guide: introduction to the ceremony, traditional vegetarian menu ideas, sweets and accompaniments, and guest-count planning.',
    categories: ['tamil-nadu-celebrations', 'traditional-south-indian-menus', 'catering-planning-tips'],
    date: '2026-11-05',
    image: '/assets/services/seemantham-catering.webp',
    imageAlt: 'Traditional Seemantham ceremony celebration with family gathered',
    content: [
      {
        type: 'p',
        text:
          'Seemantham (also called Valaikaapu or Godh Bharai in other regional traditions) is a traditional ceremony celebrating a pregnancy, typically held during the later months. It usually brings together close family and friends for a warm, celebratory occasion, and catering for it tends to follow a traditional vegetarian format similar to other South Indian family functions.',
      },
      { type: 'h2', text: 'The nature of the occasion' },
      {
        type: 'p',
        text:
          'Unlike a wedding, Seemantham gatherings are often smaller and more intimate, focused on close family. This generally means a catering setup that favours a warm, home-style traditional meal over a large elaborate spread — though the right scale depends entirely on how many guests the family chooses to invite.',
      },
      { type: 'h2', text: 'Traditional vegetarian menu ideas' },
      {
        type: 'ul',
        items: [
          'A simple tiffin item or starter to welcome guests',
          'Rice served with sambar, rasam and a kulambu variety',
          'One or two poriyal or kootu preparations',
          'Pickle, pachadi or kosumalli as fresh accompaniments',
          'Appalam as a crunchy side',
          'Payasam as the traditional sweet',
          'Curd rice to close the meal',
        ],
      },
      { type: 'h2', text: 'Sweets and accompaniments' },
      {
        type: 'p',
        text:
          'Payasam is the most traditional choice for a Seemantham menu, though some families add a second sweet for variety. Keeping the accompaniments simple — a pickle, a pachadi, and appalam — tends to suit the intimate, home-style character of the occasion better than an elaborate multi-item spread.',
      },
      { type: 'h2', text: 'Guest count planning' },
      {
        type: 'p',
        text:
          'Because Seemantham gatherings vary so much in scale — from a small family lunch to a larger function with extended relatives — it is worth deciding on an approximate guest list early and sharing it with your caterer, so the menu and serving arrangement can be sized appropriately rather than over- or under-planned.',
      },
      { type: 'h2', text: 'Catering arrangements' },
      {
        type: 'p',
        text:
          'Most Seemantham functions use traditional banana-leaf service, especially for smaller, home-style gatherings, though larger functions held at a hall sometimes opt for a buffet-style setup instead. Either way, a caterer familiar with traditional ceremonial menus can help translate family preferences into a practical, well-organised menu.',
      },
      {
        type: 'link',
        to: '/services',
        label: 'Seemantham Catering Service',
        description: 'See our Seemantham Catering service listing and enquire for your event.',
      },
    ],
    faqs: [
      {
        q: 'Is Seemantham catering always vegetarian?',
        a: 'It is typically a traditional vegetarian meal, though exact preferences vary by family — confirm specifics directly with your caterer.',
      },
      {
        q: 'How many guests are typical for a Seemantham function?',
        a: 'This varies widely, from a small family gathering to a larger function with extended relatives — there is no fixed norm, so plan around your own guest list.',
      },
    ],
  },

  {
    id: 'post-6',
    slug: 'buffet-vs-banana-leaf-catering',
    title: 'Buffet Catering vs Banana Leaf Dining for Weddings',
    excerpt:
      'Comparing traditional banana-leaf service and buffet catering across guest experience, space requirements and service considerations.',
    metaDescription:
      'Buffet catering vs traditional banana leaf dining for weddings: guest experience, space requirements, service considerations and how to choose the right format.',
    categories: ['wedding-catering', 'catering-planning-tips', 'traditional-south-indian-menus'],
    date: '2026-11-08',
    image: '/assets/backgrounds/Bg2.png',
    imageAlt: 'Festive catering spread with traditional South Indian decor',
    content: [
      {
        type: 'p',
        text:
          'Choosing between buffet catering and traditional banana-leaf dining is one of the first practical decisions in wedding planning, and it genuinely shapes the guest experience, the venue layout, and the service team required. Neither format is universally better — the right choice depends on your event.',
      },
      { type: 'h2', text: 'Traditional banana-leaf dining' },
      {
        type: 'p',
        text:
          "Guests are seated in rows, usually on the floor or at long tables, and food is served directly onto a banana leaf by catering staff moving along the rows. It carries strong cultural and ritual significance for traditional weddings and tends to feel more personal and ceremonial, but needs more serving staff and a layout with enough row space for everyone to sit at once.",
      },
      { type: 'h2', text: 'Buffet dining' },
      {
        type: 'p',
        text:
          'Guests serve themselves (or are served) from counters set up along one side of the hall, then find their own seating. It needs fewer serving staff relative to guest count, suits mixed or standing-style events well, and gives guests more control over portions and dish selection — but can feel less personal for a traditional ceremonial meal.',
      },
      { type: 'h2', text: 'Guest experience' },
      {
        type: 'p',
        text:
          'Older guests and those expecting a traditional ceremonial meal often prefer banana-leaf service, since it closely follows familiar wedding conventions. Younger guests, or a more diverse guest list, may find a buffet more comfortable and flexible, especially if the event spans a longer window with guests arriving at different times.',
      },
      { type: 'h2', text: 'Space requirements' },
      {
        type: 'p',
        text:
          'Banana-leaf service needs enough floor or table space to seat a large portion of your guests simultaneously, since the format works best when rows are served together. Buffet service needs less simultaneous seating space but more room for counters, and benefits from a layout that lets guest traffic flow smoothly without bottlenecks.',
      },
      { type: 'h2', text: 'Service considerations' },
      {
        type: 'ul',
        items: [
          'Banana-leaf service generally needs more serving staff per guest',
          'Buffet service needs more equipment (chafing dishes, display counters) but fewer staff',
          'Banana-leaf service suits a single, synchronised meal sitting; buffet suits staggered guest arrival',
          'Buffet makes it easier to offer visible variety across many dishes at once',
        ],
      },
      { type: 'h2', text: 'Choosing the right format for your event' },
      {
        type: 'p',
        text:
          'Many families choose traditional banana-leaf service for the main wedding meal, where ritual and tradition matter most, and a buffet-style setup for an evening reception where a more relaxed, flexible format suits the occasion better. Discussing both your venue layout and guest expectations with your caterer is the most reliable way to decide.',
      },
      {
        type: 'link',
        to: '/menus',
        label: 'See Our Menu Packages',
        description: 'Explore menu packages suited to both traditional and buffet-style service.',
      },
    ],
    faqs: [
      {
        q: 'Can I combine both formats for one event?',
        a: 'Yes — many weddings use traditional banana-leaf service for the main meal and a buffet for a separate reception. Discuss this with your caterer when planning your event schedule.',
      },
      {
        q: 'Which format needs more lead time to set up?',
        a: 'Buffet counters generally take longer to set up and style than banana-leaf rows, so factor this into your venue access and setup schedule.',
      },
    ],
  },

  {
    id: 'post-7',
    slug: 'catering-planning-guest-count',
    title: 'How to Plan Catering for 100, 300 or 500 Guests',
    excerpt:
      'How menu complexity, serving arrangements and event scheduling change as guest count scales up — a practical planning checklist.',
    metaDescription:
      'How to plan catering for 100, 300 or 500 guests: menu complexity, serving arrangements, event scheduling, venue considerations and a coordination checklist.',
    categories: ['catering-planning-tips', 'chennai-catering-guides'],
    date: '2026-11-11',
    image: '/assets/backgrounds/Bg3.png',
    imageAlt: 'Large outdoor wedding catering setup with decorated dining tables',
    content: [
      {
        type: 'p',
        text:
          "Catering logistics don't scale in a simple straight line — a 500-guest event isn't just a bigger version of a 150-guest one. Serving arrangements, kitchen prep timing, and even menu complexity need to adapt as guest count grows. Here is a practical way to think through planning at different scales.",
      },
      { type: 'h2', text: 'Guest count estimates: plan with a buffer' },
      {
        type: 'p',
        text:
          'Whatever your target number — 100, 300 or 500 — it helps to share both your expected count and a realistic upper buffer with your caterer early, since kitchen prep, ingredient sourcing and staffing all need lead time. A last-minute 20% jump in guests is far easier to absorb if the caterer knew it was a possibility in advance.',
      },
      { type: 'h2', text: 'Menu complexity at different scales' },
      {
        type: 'p',
        text:
          'Smaller gatherings (around 100 guests) can often support a more elaborate, varied menu, since kitchen logistics are simpler at that scale. As guest count grows toward 300–500, many caterers recommend a slightly more focused menu — fewer total categories, executed well — rather than an very large menu that becomes harder to serve fresh and consistently at scale.',
      },
      { type: 'h2', text: 'Serving arrangements by scale' },
      {
        type: 'ul',
        items: [
          'Around 100 guests: a single banana-leaf row setup or one buffet line is usually sufficient',
          'Around 300 guests: expect multiple buffet counters or several serving rows running in parallel to avoid long waits',
          'Around 500 guests: serving logistics become a significant part of planning — discuss staggered serving, multiple counters, and realistic total serving-time estimates with your caterer',
        ],
      },
      { type: 'h2', text: 'Event schedule considerations' },
      {
        type: 'p',
        text:
          'Larger events benefit from a clear, agreed serving window (e.g., lunch service starting and effectively wrapping within a defined period) rather than an open-ended "serve whenever guests arrive" approach, since this affects how much food needs to be kept ready at any given time.',
      },
      { type: 'h2', text: 'Venue considerations' },
      {
        type: 'p',
        text:
          'Check whether the venue has an existing catering-ready kitchen or serving area, how much space is available for counters or seating rows, and whether there is adequate access for bringing in equipment and supplies. These factors matter more as guest count increases, since there is less room for improvisation at scale.',
      },
      { type: 'h2', text: 'A simple coordination checklist' },
      {
        type: 'ul',
        items: [
          'Confirm an estimated guest count (with buffer) at least a few weeks ahead',
          'Agree on the menu category by category, not as one broad request',
          'Clarify the serving format (traditional, buffet, or a mix) based on your venue and guest profile',
          'Confirm serving staff numbers and expected total serving time',
          'Walk through the venue layout with your caterer if possible, especially for larger events',
          'Reconfirm the final guest count closer to the event date',
        ],
      },
      {
        type: 'link',
        to: '/menus',
        label: 'Explore Menu Packages',
        description: 'See menu packages that can be scaled to your expected guest count.',
      },
    ],
    faqs: [
      {
        q: 'Does a larger guest count always mean a more complicated menu?',
        a: 'Not necessarily — many caterers recommend a slightly more focused menu at larger scales to keep quality and serving speed consistent, rather than a more elaborate one.',
      },
      {
        q: 'How much lead time should I give for a 500-guest event?',
        a: 'More lead time is generally better for large events, since it affects staffing, sourcing and venue coordination — discuss a specific timeline directly with your caterer based on your event date.',
      },
    ],
  },

  {
    id: 'post-8',
    slug: 'about-madhava-catering-services',
    title: 'Madhava Catering Services – Traditional Flavours for Special Celebrations',
    excerpt:
      'An introduction to Madhava Catering Services — the occasions we cater for, our menu packages, and how to get in touch.',
    metaDescription:
      'An introduction to Madhava Catering Services: catering service categories, traditional food presentation, available menu packages and how to enquire.',
    categories: ['madhava-catering-updates'],
    date: '2026-11-14',
    image: '/assets/backgrounds/Bg1.png',
    imageAlt: 'Traditional South Indian banana leaf meal with festive decor',
    content: [
      {
        type: 'p',
        text:
          'Madhava Catering Services focuses on traditional South Indian catering — the kind of meal that brings people together around shared food, served with attention to presentation and tradition. This article is a short introduction to who we cater for and how our menu packages work.',
      },
      { type: 'h2', text: 'What we cater for' },
      {
        type: 'p',
        text:
          'Our catering services cover a wide range of occasions, from weddings and receptions to more intimate family functions like Seemantham and housewarming ceremonies, as well as birthdays, engagements, corporate events and festival celebrations. Each of these is listed on our Services page with a short description of what it typically involves.',
      },
      {
        type: 'link',
        to: '/services',
        label: 'View All Our Catering Services',
        description: 'See the full list of occasions we cater for.',
      },
      { type: 'h2', text: 'Traditional food presentation' },
      {
        type: 'p',
        text:
          'We serve food in the traditional South Indian style wherever it suits the occasion — the banana leaf arrangement that places accompaniments, rice, gravies and sweets in their conventional positions, giving guests a familiar, complete meal experience rather than a randomly arranged spread.',
      },
      { type: 'h2', text: 'Available menu packages' },
      {
        type: 'p',
        text:
          'We offer a set of predefined menu packages — each with its own category-wise dish list covering tiffin items, rice varieties, gravies, accompaniments and sweets — so you can see roughly what a package includes before enquiring about it for your event.',
      },
      {
        type: 'link',
        to: '/menus',
        label: 'Browse Our Menu Packages',
        description: 'See each package’s photo, description and full dish list.',
      },
      { type: 'h2', text: 'Types of events served' },
      {
        type: 'p',
        text:
          'From small family gatherings to larger wedding functions, our catering is built around the same core idea: a well-organised, traditionally-presented meal that fits the scale and character of your specific event, rather than a one-size-fits-all package.',
      },
      { type: 'h2', text: 'Get in touch' },
      {
        type: 'p',
        text:
          'If you would like to discuss a menu for your event, you can reach us through the enquiry form on any menu page, or using the phone numbers listed in the footer of this site. We’re happy to talk through what would suit your occasion best.',
      },
    ],
    faqs: [],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}

export function postsByCategory(categorySlug) {
  if (!categorySlug || categorySlug === 'all') return blogPosts;
  return blogPosts.filter((p) => p.categories.includes(categorySlug));
}

export function relatedPosts(post, limit = 3) {
  return blogPosts
    .filter((p) => p.slug !== post.slug && p.categories.some((c) => post.categories.includes(c)))
    .slice(0, limit);
}
