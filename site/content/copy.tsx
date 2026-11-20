import type { ReactNode } from 'react';

// Every word on the site, in both languages. A page takes one of these and
// renders it; nothing is written into a component.
//
// Rules (docs/website.md): every claim must be true of the app, never promise
// an amount of earnings, never say "salary", never mention an undecided
// feature, and never suggest Dhun knows where anyone is.

export type Lang = 'en' | 'hi';

export interface Copy {
  meta: { title: string; description: string; deleteTitle: string; deleteDescription: string };
  skip: string;
  nav: { hosts: string; safety: string; contact: string; switchLabel: string; switchTo: string };
  hero: { title: ReactNode; lede: string; cta: string; status: string; phone: string };
  lang: { eyebrow: string; title: string; note: string };
  how: { eyebrow: string; title: string; steps: { title: string; body: string }[] };
  hosts: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: string;
    agency: ReactNode;
    facts: { title: string; body: string }[];
  };
  safety: {
    eyebrow: string;
    title: string;
    chance: { title: string; body: string };
    items: { title: string; body: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    supportTitle: string;
    supportBody: string;
    grievanceTitle: string;
    grievanceName: string;
    grievanceBody: string;
    deleteTitle: string;
    deleteBody: string;
    deleteLink: string;
  };
  foot: { delete: string; privacy: string; terms: string; home: string };
  del: {
    eyebrow: string;
    title: string;
    lede: string;
    appTitle: string;
    appSteps: ReactNode[];
    emailTitle: string;
    emailBody: ReactNode;
    beforeTitle: string;
    beforeBody: string;
    whatTitle: string;
    deletedTitle: string;
    deleted: string[];
    keptTitle: string;
    kept: string[];
    why: string;
    againTitle: string;
    againBody: string;
  };
  notFound: { title: string; body: string; home: string };
}

const Path = ({ children }: { children: ReactNode }) => <span className="path">{children}</span>;
const supportDelete = (
  <a href="mailto:support@dhunlive.com?subject=Delete%20my%20account">support@dhunlive.com</a>
);
const partners = <a href="mailto:partners@dhunlive.com">partners@dhunlive.com</a>;

export const en: Copy = {
  meta: {
    title: 'Dhun: live rooms in your language',
    description:
      'Dhun is a live audio and video app for India. Sing, talk and hang out in party rooms of up to 20 seats, in Hindi, Bhojpuri, Tamil and eleven more languages. 18+ only.',
    deleteTitle: 'Delete your Dhun account',
    deleteDescription:
      'How to delete your Dhun account, what is deleted, and what Dhunlive keeps and for how long.',
  },
  skip: 'Skip to content',
  nav: {
    hosts: 'For hosts',
    safety: 'Safety',
    contact: 'Contact',
    switchLabel: 'यह पेज हिन्दी में पढ़ें',
    switchTo: 'हिन्दी',
  },
  hero: {
    title: (
      <>
        Sing, talk and hang out. <em>Live, in your language.</em>
      </>
    ),
    lede: 'Dhun is a live audio and video app for India. Join a party room with up to 20 seats, or watch a host go live, in Hindi, Bhojpuri, Tamil and eleven more languages.',
    cta: 'Become a host',
    status: 'Android app coming soon. 18+ only.',
    phone: 'An example Dhun party room',
  },
  lang: {
    eyebrow: 'Nearby means your language',
    title: 'Rooms in 14 languages',
    note: 'Find people who talk the way you do. Dhun never asks where you are. Rooms are found by language, not by distance.',
  },
  how: {
    eyebrow: 'How a room works',
    title: 'Walk in, take a seat, join the song.',
    steps: [
      {
        title: 'Pick a room',
        body: 'Browse what is live right now: singing, chatting, making friends, gaming. Every room shows its language.',
      },
      {
        title: 'Take a seat',
        body: 'Party rooms have up to 20 seats. Take a free one to talk or sing, or just listen and chat from the audience.',
      },
      {
        title: 'Cheer with a gift',
        body: 'From a rose to a rocket, a gift is how you thank a host. Hosts earn from every gift they receive.',
      },
    ],
  },
  hosts: {
    eyebrow: 'For hosts',
    title: 'Your voice, your hours, your audience.',
    lede: 'Sing, tell stories, share a skill or just keep good company. Go live when it suits you, and earn from the gifts your audience sends.',
    cta: 'Apply to host',
    agency: <>Run a talent agency? Write to {partners}.</>,
    facts: [
      { title: 'No fixed hours', body: 'Go live whenever you like, for as long as you like.' },
      { title: 'Earn from gifts', body: 'Every gift you receive adds points to your earnings.' },
      {
        title: 'Paid to your own bank account',
        body: 'Withdraw your points as rupees once your PAN and face are verified.',
      },
      {
        title: 'Backed by an agency',
        body: 'Join an agency for coaching and support, or start with ours.',
      },
      { title: '18 and over', body: 'Every host is an adult, and verified before any payout.' },
    ],
  },
  safety: {
    eyebrow: 'Safety',
    title: 'A good room needs good rules.',
    chance: {
      title: 'No games of chance. Ever.',
      body: 'Dhun has no lucky draws, spins, mystery boxes or betting. A gift is a gift: you always know exactly what you are sending, and to whom.',
    },
    items: [
      {
        title: 'Adults only',
        body: 'Dhun is for people aged 18 and over. Hosts confirm who they are with PAN and a face check before they can be paid.',
      },
      {
        title: 'Report or block anyone',
        body: 'From any room or profile, in two taps. A person reviews every report, and hosts can remove anyone from their room.',
      },
      {
        title: 'Limits you set',
        body: 'Set a daily or monthly spending limit, or pause spending for 30 days, 90 days or for good. Dhun enforces it, not just reminds you.',
      },
      {
        title: 'Your location stays yours',
        body: 'Dhun never asks where you are and never shows anyone how far away you live.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Talk to a person.',
    supportTitle: 'Help with your account',
    supportBody: 'Include your Dhun ID from your profile so we can find you quickly.',
    grievanceTitle: 'Grievance Officer',
    // IT Rules 2021, rule 3(2): the officer's NAME must be published. Replace
    // before launch (docs/website.md).
    grievanceName: 'Name published before launch',
    grievanceBody:
      'Under the IT Rules, 2021, we acknowledge a complaint within 24 hours and resolve it within 15 days.',
    deleteTitle: 'Leaving Dhun',
    deleteBody: 'You can delete your account in the app at any time.',
    deleteLink: 'How to delete your account',
  },
  foot: {
    delete: 'Delete your account',
    privacy: 'Privacy policy (before launch)',
    terms: 'Terms of service (before launch)',
    home: 'Home',
  },
  del: {
    eyebrow: 'Your account',
    title: 'Delete your Dhun account',
    lede: 'You can delete your account yourself, in the app, at any time. It takes effect at once and signs you out on every phone.',
    appTitle: 'In the app',
    appSteps: [
      <>
        Open Dhun and go to the <Path>Me</Path> tab.
      </>,
      <>
        Tap <Path>Account and security</Path>.
      </>,
      <>
        Tap <Path>Delete account</Path>.
      </>,
      <>Confirm. If you sign in with an email address, enter your password.</>,
    ],
    emailTitle: "If you can't open the app",
    emailBody: (
      <>
        Email {supportDelete} with the subject &quot;Delete my account&quot;. Write from the email address on
        your account, or include the phone number you signed up with. We will send a code to that number or
        address to confirm the account is yours, then delete it within 7 days.
      </>
    ),
    beforeTitle: 'Before you delete',
    beforeBody:
      'Coins and gems you have not spent, and points you have not withdrawn, end with your account and cannot be recovered. If you are a host, withdraw your points first.',
    whatTitle: 'What happens to your data',
    deletedTitle: 'Deleted straight away',
    deleted: [
      'Your phone number and email address',
      'Your password',
      'Your name, photo, bio, gender and date of birth',
      'The languages you chose',
      'Your devices and notification settings',
      'Every signed-in session',
    ],
    keptTitle: 'Kept, without your name',
    kept: [
      'A record of coin purchases, gifts and payouts, with no name, number or email attached',
      'Messages and gifts you sent stay where they are, but no longer show your name',
    ],
    why: 'Indian tax and accounting law requires us to keep financial records. We keep them only as long as the law requires, currently up to eight years, and use them only for accounts, tax and resolving disputes.',
    againTitle: 'Coming back',
    againBody:
      'Once deleted, an account cannot be restored. You can sign up again with the same phone number, as a new account.',
  },
  notFound: {
    title: "This page isn't here",
    body: 'The link may be old, or the address mistyped.',
    home: 'Go to the home page',
  },
};

export const hi: Copy = {
  meta: {
    title: 'Dhun: अपनी भाषा में लाइव रूम',
    description:
      'Dhun भारत के लिए लाइव ऑडियो और वीडियो ऐप है। 20 सीटों तक वाले पार्टी रूम में गाइए, बात कीजिए और दोस्त बनाइए, हिन्दी, भोजपुरी, तमिल और 11 दूसरी भाषाओं में। सिर्फ़ 18+ के लिए।',
    deleteTitle: 'अपना Dhun अकाउंट डिलीट करें',
    deleteDescription:
      'अपना Dhun अकाउंट कैसे डिलीट करें, क्या डिलीट होता है, और Dhunlive क्या रखता है और कितने समय तक।',
  },
  skip: 'मुख्य हिस्से पर जाएँ',
  nav: {
    hosts: 'होस्ट के लिए',
    safety: 'सुरक्षा',
    contact: 'संपर्क',
    switchLabel: 'Read this page in English',
    switchTo: 'English',
  },
  hero: {
    title: (
      <>
        गाइए, बात कीजिए, दोस्ती कीजिए। <em>लाइव, अपनी भाषा में।</em>
      </>
    ),
    lede: 'Dhun भारत के लिए लाइव ऑडियो और वीडियो ऐप है। 20 सीटों तक वाले पार्टी रूम में शामिल हों, या किसी होस्ट को लाइव देखें, हिन्दी, भोजपुरी, तमिल और 11 दूसरी भाषाओं में।',
    cta: 'होस्ट बनें',
    status: 'Android ऐप जल्द आ रहा है। सिर्फ़ 18+ के लिए।',
    phone: 'Dhun के एक पार्टी रूम का उदाहरण',
  },
  lang: {
    eyebrow: 'नज़दीक मतलब आपकी भाषा',
    title: '14 भाषाओं में रूम',
    note: 'उन लोगों से मिलिए जो आपकी तरह बात करते हैं। Dhun कभी नहीं पूछता कि आप कहाँ हैं। रूम भाषा से ढूँढे जाते हैं, दूरी से नहीं।',
  },
  how: {
    eyebrow: 'रूम कैसे काम करता है',
    title: 'आइए, सीट लीजिए, गाने में शामिल होइए।',
    steps: [
      {
        title: 'रूम चुनें',
        body: 'देखिए अभी क्या लाइव है: गाना, बातचीत, नए दोस्त, गेमिंग। हर रूम पर उसकी भाषा लिखी होती है।',
      },
      {
        title: 'सीट लें',
        body: 'पार्टी रूम में 20 तक सीटें होती हैं। खाली सीट लेकर बोलिए या गाइए, या ऑडियंस में बैठकर सुनिए और चैट कीजिए।',
      },
      {
        title: 'गिफ़्ट से हौसला बढ़ाएँ',
        body: 'गुलाब से लेकर रॉकेट तक, गिफ़्ट होस्ट को शुक्रिया कहने का तरीका है। होस्ट को मिलने वाले हर गिफ़्ट से उनकी कमाई होती है।',
      },
    ],
  },
  hosts: {
    eyebrow: 'होस्ट के लिए',
    title: 'आपकी आवाज़, आपका समय, आपकी ऑडियंस।',
    lede: 'गाइए, कहानियाँ सुनाइए, कोई हुनर दिखाइए या बस अच्छी महफ़िल जमाइए। जब मन हो लाइव जाइए, और अपनी ऑडियंस के भेजे गिफ़्ट से कमाइए।',
    cta: 'होस्ट के लिए आवेदन करें',
    agency: <>टैलेंट एजेंसी चलाते हैं? {partners} पर लिखें।</>,
    facts: [
      { title: 'कोई तय घंटे नहीं', body: 'जब चाहें लाइव जाएँ, जितनी देर चाहें।' },
      { title: 'गिफ़्ट से कमाई', body: 'आपको मिलने वाला हर गिफ़्ट आपकी कमाई में पॉइंट जोड़ता है।' },
      {
        title: 'सीधे आपके अपने बैंक खाते में',
        body: 'PAN और चेहरे की पुष्टि के बाद अपने पॉइंट रुपयों में निकालें।',
      },
      {
        title: 'एजेंसी का साथ',
        body: 'कोचिंग और मदद के लिए किसी एजेंसी से जुड़ें, या हमारी एजेंसी से शुरुआत करें।',
      },
      {
        title: '18 साल और उससे ज़्यादा',
        body: 'हर होस्ट बालिग है, और किसी भी पेमेंट से पहले उसकी पुष्टि होती है।',
      },
    ],
  },
  safety: {
    eyebrow: 'सुरक्षा',
    title: 'अच्छे रूम के लिए अच्छे नियम ज़रूरी हैं।',
    chance: {
      title: 'किस्मत का कोई खेल नहीं। कभी नहीं।',
      body: 'Dhun पर कोई लकी ड्रॉ, स्पिन, मिस्ट्री बॉक्स या सट्टा नहीं है। गिफ़्ट बस गिफ़्ट है: आप हमेशा जानते हैं कि आप क्या भेज रहे हैं, और किसे।',
    },
    items: [
      {
        title: 'सिर्फ़ बालिगों के लिए',
        body: 'Dhun 18 साल और उससे ज़्यादा उम्र के लोगों के लिए है। पेमेंट मिलने से पहले होस्ट PAN और चेहरे की जाँच से अपनी पहचान की पुष्टि करते हैं।',
      },
      {
        title: 'किसी को भी रिपोर्ट या ब्लॉक करें',
        body: 'किसी भी रूम या प्रोफ़ाइल से, दो टैप में। हर रिपोर्ट को एक इंसान देखता है, और होस्ट अपने रूम से किसी को भी हटा सकते हैं।',
      },
      {
        title: 'आपकी तय की हुई सीमा',
        body: 'रोज़ाना या महीने की खर्च सीमा तय करें, या 30 दिन, 90 दिन या हमेशा के लिए खर्च रोक दें। Dhun इसे सिर्फ़ याद नहीं दिलाता, लागू करता है।',
      },
      {
        title: 'आपकी लोकेशन सिर्फ़ आपकी',
        body: 'Dhun कभी नहीं पूछता कि आप कहाँ हैं, और कभी किसी को नहीं दिखाता कि आप कितनी दूर रहते हैं।',
      },
    ],
  },
  contact: {
    eyebrow: 'संपर्क',
    title: 'किसी इंसान से बात कीजिए।',
    supportTitle: 'अकाउंट से जुड़ी मदद',
    supportBody: 'अपनी प्रोफ़ाइल से अपना Dhun ID साथ लिखें, ताकि हम आपको जल्दी ढूँढ सकें।',
    grievanceTitle: 'शिकायत अधिकारी',
    grievanceName: 'नाम लॉन्च से पहले प्रकाशित होगा',
    grievanceBody:
      'IT नियम, 2021 के तहत हम शिकायत मिलने की पुष्टि 24 घंटे में करते हैं और 15 दिनों में उसका हल करते हैं।',
    deleteTitle: 'Dhun छोड़ना',
    deleteBody: 'आप कभी भी ऐप में अपना अकाउंट डिलीट कर सकते हैं।',
    deleteLink: 'अकाउंट डिलीट करने का तरीका',
  },
  foot: {
    delete: 'अपना अकाउंट डिलीट करें',
    privacy: 'प्राइवेसी पॉलिसी (लॉन्च से पहले)',
    terms: 'सेवा की शर्तें (लॉन्च से पहले)',
    home: 'होम',
  },
  del: {
    eyebrow: 'आपका अकाउंट',
    title: 'अपना Dhun अकाउंट डिलीट करें',
    lede: 'आप ऐप में खुद, कभी भी अपना अकाउंट डिलीट कर सकते हैं। यह तुरंत लागू होता है और हर फ़ोन से आपको साइन आउट कर देता है।',
    appTitle: 'ऐप में',
    appSteps: [
      <>
        Dhun खोलें और <Path>प्रोफ़ाइल</Path> टैब पर जाएँ।
      </>,
      <>
        <Path>अकाउंट और सुरक्षा</Path> पर टैप करें।
      </>,
      <>
        <Path>अकाउंट डिलीट करें</Path> पर टैप करें।
      </>,
      <>पुष्टि करें। अगर आप ईमेल से साइन इन करते हैं, तो अपना पासवर्ड डालें।</>,
    ],
    emailTitle: 'अगर ऐप नहीं खुल रहा',
    emailBody: (
      <>
        &quot;Delete my account&quot; विषय के साथ {supportDelete} पर ईमेल करें। अपने अकाउंट वाले ईमेल पते से
        लिखें, या साइन अप वाला फ़ोन नंबर साथ लिखें। अकाउंट आपका है, यह पक्का करने के लिए हम उस नंबर या पते पर
        एक कोड भेजेंगे, फिर 7 दिनों के अंदर उसे डिलीट कर देंगे।
      </>
    ),
    beforeTitle: 'डिलीट करने से पहले',
    beforeBody:
      'बिना खर्च किए कॉइन और जेम, और बिना निकाले पॉइंट, आपके अकाउंट के साथ खत्म हो जाते हैं और वापस नहीं मिलते। अगर आप होस्ट हैं, तो पहले अपने पॉइंट निकाल लें।',
    whatTitle: 'आपके डेटा का क्या होता है',
    deletedTitle: 'तुरंत डिलीट',
    deleted: [
      'आपका फ़ोन नंबर और ईमेल पता',
      'आपका पासवर्ड',
      'आपका नाम, फ़ोटो, बायो, जेंडर और जन्मतिथि',
      'आपकी चुनी हुई भाषाएँ',
      'आपके डिवाइस और नोटिफ़िकेशन सेटिंग',
      'हर साइन-इन सेशन',
    ],
    keptTitle: 'रखा जाता है, आपके नाम के बिना',
    kept: [
      'कॉइन खरीदारी, गिफ़्ट और पेमेंट का रिकॉर्ड, बिना किसी नाम, नंबर या ईमेल के',
      'आपके भेजे मैसेज और गिफ़्ट वहीं रहते हैं, लेकिन उन पर आपका नाम नहीं दिखता',
    ],
    why: 'भारत के टैक्स और अकाउंटिंग कानून के तहत हमें वित्तीय रिकॉर्ड रखने होते हैं। हम उन्हें सिर्फ़ उतने समय तक रखते हैं जितना कानून कहता है, अभी अधिकतम आठ साल, और सिर्फ़ हिसाब-किताब, टैक्स और विवाद सुलझाने के लिए इस्तेमाल करते हैं।',
    againTitle: 'वापस आना',
    againBody:
      'डिलीट होने के बाद अकाउंट वापस नहीं हो सकता। आप उसी फ़ोन नंबर से नए अकाउंट के रूप में फिर से साइन अप कर सकते हैं।',
  },
  notFound: {
    title: 'यह पेज नहीं मिला',
    body: 'लिंक पुराना हो सकता है, या पता गलत लिखा गया है।',
    home: 'होम पेज पर जाएँ',
  },
};

export const copyFor = (lang: Lang): Copy => (lang === 'hi' ? hi : en);
