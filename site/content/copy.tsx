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
  privacy: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    updated: string;
    lede: string;
    sections: { title: string; body?: ReactNode[]; list?: ReactNode[] }[];
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
    privacy: 'Privacy policy',
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
  privacy: {
    metaTitle: 'Privacy policy · Dhun',
    metaDescription:
      'What the Dhun app collects, why, who it is shared with, how long it is kept, and how to see, correct or delete it.',
    eyebrow: 'Privacy',
    title: 'Privacy policy',
    updated: 'Last updated 23 November 2026',
    lede: 'This policy covers the Dhun app and this website, both run by Dhunlive ("we"). It says what we collect, why, who else sees it, how long we keep it, and what you can do about it. We do not sell your data and we do not show ads.',
    sections: [
      {
        title: 'What we collect',
        list: [
          <>
            <strong>Your account.</strong> Your phone number or email address. If you set a password, we keep
            only a one-way hash of it, never the password. If you sign in with Google, we receive your Google
            account ID and email address, nothing else from your Google account.
          </>,
          <>
            <strong>Your profile.</strong> Your name, photo, bio, gender, date of birth and up to three
            languages. Your name, photo, bio and Dhun ID are public; your date of birth is not.
          </>,
          <>
            <strong>Host checks.</strong> If you apply to host, a photo of your face, and a selfie taken each
            time you go live. Our staff look at these to confirm a host is a real adult and the same person
            each time.
          </>,
          <>
            <strong>What you do in Dhun.</strong> The rooms you join and host, room chat, private messages,
            follows, profile visits, gifts, check-ins and rewards, the spending limits you set, and reports
            and blocks.
          </>,
          <>
            <strong>Payments.</strong> Purchases go through Google Play or Razorpay. We receive the order
            record (order ID, product, amount, time), never your card, UPI or bank details.
          </>,
          <>
            <strong>Your phone and the app.</strong> A random ID the app creates when it is installed (not a
            hardware ID), your phone&apos;s platform, the app version, a notification token, crash reports, and
            events such as &quot;app opened&quot; or &quot;room joined&quot;. Your IP address is used for a few
            minutes to stop abuse and is not stored.
          </>,
        ],
      },
      {
        title: 'What we do not collect',
        list: [
          'Your location. Dhun never asks where you are and never shows anyone how far away you are.',
          'Your contacts, or photos and files on your phone other than the ones you choose to upload.',
          'Recordings of rooms. Live audio and video pass through our media servers to reach the other people in the room and are not recorded.',
        ],
      },
      {
        title: 'Permissions on your phone',
        body: [
          'Microphone and camera, so you can speak and appear in rooms and take a profile photo or selfie. Notifications, so we can tell you when someone you follow goes live. Each is asked for when you first need it, and you can turn it off in your phone settings.',
        ],
      },
      {
        title: 'Why we use it',
        list: [
          'To run Dhun: sign you in, show your profile, run rooms, deliver messages and gifts.',
          'To keep people safe: review reports, check that hosts are adults, enforce our rules, and stop fraud.',
          'To handle money: credit purchases, keep the ledger of coins, gifts and points, and meet tax and accounting law.',
          'To send the notifications you allow, such as a host you follow going live.',
          'To fix and improve the app, using crash reports and usage events.',
          'To meet our legal obligations, including lawful requests from Indian authorities.',
        ],
      },
      {
        title: 'Who else sees it',
        body: [
          'Other people in Dhun see your public profile, what you say in rooms, gifts you send in a room, and rankings built from gifts. Private messages are seen only by the person you send them to, and by our staff when one is reported.',
          'We use these companies to run Dhun. Each gets only what its job needs:',
        ],
        list: [
          'DigitalOcean: our servers and database, in Bengaluru, India.',
          'Cloudflare: storage for photos you upload.',
          'LiveKit: the software that carries live audio and video, run on our servers or on LiveKit’s.',
          'Google: Google sign-in, Google Play billing, and delivering notifications.',
          'Expo: delivering notifications and app updates.',
          'Sentry: crash reports, processed in Germany, identified only by an internal ID.',
          'Razorpay: payments made on the web.',
          'MSG91: sending sign-in codes by SMS.',
          'Vercel: hosting this website.',
        ],
      },
      {
        title: 'How long we keep it',
        list: [
          'Your account and profile: until you delete your account.',
          'Room chat: 14 days.',
          'Sign-in codes: 7 days. Signed-in sessions: 30 days after they end.',
          'Usage events: 90 days in detail, then in a private analytics archive tied only to an internal ID.',
          'Error and security logs: 30 to 90 days.',
          'Records of purchases, gifts and payouts: as long as Indian tax and accounting law requires, currently up to eight years.',
          'Reports, safety actions and host checks: as long as needed to keep Dhun safe, including after an account is deleted, so that a removed person cannot simply return.',
          'Private messages: until your account is deleted. After that, messages you sent stay with the person who received them, without your name.',
        ],
      },
      {
        title: 'Deleting your account',
        body: [
          <>
            You can delete your account in the app at any time, under Me › Account and security. Your phone
            number, email, password, Google link, name, photo, bio, gender, date of birth and languages are
            removed at once, and every phone is signed out. <a href="/delete-account">What is deleted and
            what is kept</a>.
          </>,
          <>
            Photos you uploaded can remain in our photo storage after the link to your account is removed.
            Write to <a href="mailto:support@dhunlive.com">support@dhunlive.com</a> and we will delete them
            within 7 days.
          </>,
        ],
      },
      {
        title: 'Your rights',
        body: [
          <>
            Under India&apos;s Digital Personal Data Protection Act, 2023, you can ask to see the personal data we
            hold about you, have it corrected or completed, have it erased, and name someone to act for you
            if you die or cannot act. You can change your profile and delete your account in the app; for
            anything else write to <a href="mailto:support@dhunlive.com">support@dhunlive.com</a> from the
            email or with the phone number on your account. We reply within 30 days.
          </>,
        ],
      },
      {
        title: 'Adults only',
        body: [
          'Dhun is for people aged 18 and over. We ask for your date of birth when you sign up, and the app does not let anyone under 18 finish. Buying coins and sending gifts also need a confirmed adult account. If we learn an account belongs to someone under 18, we close it.',
        ],
      },
      {
        title: 'Keeping it safe',
        body: [
          'Everything between the app and our servers is encrypted. Passwords and sign-in codes are stored only as hashes. Only staff who need it can see personal data, and their actions on accounts are recorded. No system is perfectly secure; if a breach affects you, we will tell you and the authorities as the law requires.',
        ],
      },
      {
        title: 'Changes',
        body: [
          'When this policy changes, the date at the top changes. If a change affects how we use your data, we will tell you in the app before it takes effect.',
        ],
      },
      {
        title: 'Questions and complaints',
        body: [
          <>
            For anything about your data, write to <a href="mailto:support@dhunlive.com">support@dhunlive.com</a>.
            For a complaint, write to our Grievance Officer at{' '}
            <a href="mailto:grievance@dhunlive.com">grievance@dhunlive.com</a>. Under the IT Rules, 2021, we
            acknowledge a complaint within 24 hours and resolve it within 15 days.
          </>,
        ],
      },
    ],
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
    privacy: 'प्राइवेसी पॉलिसी',
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
  privacy: {
    metaTitle: 'प्राइवेसी पॉलिसी · Dhun',
    metaDescription:
      'Dhun ऐप क्या जानकारी लेता है, क्यों, किसके साथ साझा होती है, कितने समय तक रखी जाती है, और आप उसे कैसे देख, सुधार या डिलीट कर सकते हैं।',
    eyebrow: 'प्राइवेसी',
    title: 'प्राइवेसी पॉलिसी',
    updated: 'आखिरी बदलाव 23 नवंबर 2026',
    lede: 'यह पॉलिसी Dhun ऐप और इस वेबसाइट पर लागू होती है, दोनों Dhunlive ("हम") चलाता है। इसमें बताया गया है कि हम क्या जानकारी लेते हैं, क्यों, और कौन उसे देखता है, हम उसे कितने समय तक रखते हैं, और आप क्या कर सकते हैं। हम आपका डेटा नहीं बेचते और विज्ञापन नहीं दिखाते।',
    sections: [
      {
        title: 'हम क्या लेते हैं',
        list: [
          <>
            <strong>आपका अकाउंट।</strong> आपका फ़ोन नंबर या ईमेल पता। अगर आप पासवर्ड बनाते हैं, तो हम सिर्फ़ उसका
            एकतरफ़ा हैश रखते हैं, पासवर्ड कभी नहीं। Google से साइन इन करने पर हमें आपकी Google अकाउंट ID और
            ईमेल पता मिलता है, आपके Google अकाउंट से और कुछ नहीं।
          </>,
          <>
            <strong>आपकी प्रोफ़ाइल।</strong> आपका नाम, फ़ोटो, बायो, जेंडर, जन्मतिथि और अधिकतम तीन भाषाएँ। आपका
            नाम, फ़ोटो, बायो और Dhun ID सबको दिखते हैं; आपकी जन्मतिथि नहीं।
          </>,
          <>
            <strong>होस्ट की जाँच।</strong> होस्ट बनने के लिए आवेदन करने पर आपके चेहरे की एक फ़ोटो, और हर बार लाइव
            जाने पर एक सेल्फ़ी। हमारी टीम इन्हें देखकर पक्का करती है कि होस्ट एक असली वयस्क है और हर बार वही
            व्यक्ति है।
          </>,
          <>
            <strong>Dhun में आप क्या करते हैं।</strong> आप किन रूम में जाते हैं और कौन से होस्ट करते हैं, रूम चैट,
            निजी मैसेज, फ़ॉलो, प्रोफ़ाइल विज़िट, गिफ़्ट, चेक-इन और रिवॉर्ड, आपकी तय की हुई खर्च सीमा, और रिपोर्ट व
            ब्लॉक।
          </>,
          <>
            <strong>भुगतान।</strong> खरीदारी Google Play या Razorpay से होती है। हमें ऑर्डर का रिकॉर्ड (ऑर्डर ID,
            प्रोडक्ट, रकम, समय) मिलता है, आपके कार्ड, UPI या बैंक की जानकारी कभी नहीं।
          </>,
          <>
            <strong>आपका फ़ोन और ऐप।</strong> इंस्टॉल होने पर ऐप की बनाई एक रैंडम ID (हार्डवेयर ID नहीं), फ़ोन का
            प्लेटफ़ॉर्म, ऐप वर्ज़न, नोटिफ़िकेशन टोकन, क्रैश रिपोर्ट, और &quot;ऐप खोला&quot; या &quot;रूम में
            गए&quot; जैसे इवेंट। दुरुपयोग रोकने के लिए आपका IP पता कुछ मिनट इस्तेमाल होता है और सेव नहीं होता।
          </>,
        ],
      },
      {
        title: 'हम क्या नहीं लेते',
        list: [
          'आपकी लोकेशन। Dhun कभी नहीं पूछता कि आप कहाँ हैं और किसी को नहीं दिखाता कि आप कितनी दूर हैं।',
          'आपके कॉन्टैक्ट, या फ़ोन की फ़ोटो और फ़ाइलें, सिवाय उनके जिन्हें आप खुद अपलोड करते हैं।',
          'रूम की रिकॉर्डिंग। लाइव ऑडियो और वीडियो हमारे मीडिया सर्वर से होकर रूम के बाकी लोगों तक पहुँचते हैं और रिकॉर्ड नहीं होते।',
        ],
      },
      {
        title: 'आपके फ़ोन की परमिशन',
        body: [
          'माइक्रोफ़ोन और कैमरा, ताकि आप रूम में बोल सकें, दिख सकें, और प्रोफ़ाइल फ़ोटो या सेल्फ़ी ले सकें। नोटिफ़िकेशन, ताकि हम बता सकें कि आपका फ़ॉलो किया होस्ट लाइव है। हर परमिशन तभी माँगी जाती है जब पहली बार उसकी ज़रूरत हो, और आप उसे फ़ोन की सेटिंग में बंद कर सकते हैं।',
        ],
      },
      {
        title: 'हम इसका इस्तेमाल क्यों करते हैं',
        list: [
          'Dhun चलाने के लिए: साइन इन, आपकी प्रोफ़ाइल दिखाना, रूम चलाना, मैसेज और गिफ़्ट पहुँचाना।',
          'लोगों को सुरक्षित रखने के लिए: रिपोर्ट देखना, होस्ट के वयस्क होने की जाँच, नियम लागू करना और धोखाधड़ी रोकना।',
          'पैसों के लिए: खरीदारी क्रेडिट करना, कॉइन, गिफ़्ट और पॉइंट का हिसाब रखना, और टैक्स व अकाउंटिंग कानून मानना।',
          'आपकी अनुमति वाले नोटिफ़िकेशन भेजने के लिए, जैसे आपका फ़ॉलो किया होस्ट लाइव आना।',
          'क्रैश रिपोर्ट और इस्तेमाल के इवेंट से ऐप ठीक करने और बेहतर बनाने के लिए।',
          'कानूनी ज़िम्मेदारियाँ निभाने के लिए, जिसमें भारतीय अधिकारियों के कानूनी अनुरोध शामिल हैं।',
        ],
      },
      {
        title: 'और कौन देखता है',
        body: [
          'Dhun के बाकी लोग आपकी सार्वजनिक प्रोफ़ाइल, रूम में आपकी बातें, रूम में भेजे आपके गिफ़्ट, और गिफ़्ट से बनी रैंकिंग देखते हैं। निजी मैसेज सिर्फ़ वही देखता है जिसे आपने भेजा, और रिपोर्ट होने पर हमारी टीम।',
          'Dhun चलाने के लिए हम इन कंपनियों की सेवाएँ लेते हैं। हर एक को सिर्फ़ उतना मिलता है जितना उसके काम के लिए ज़रूरी है:',
        ],
        list: [
          'DigitalOcean: हमारे सर्वर और डेटाबेस, बेंगलुरु, भारत में।',
          'Cloudflare: आपकी अपलोड की गई फ़ोटो का स्टोरेज।',
          'LiveKit: लाइव ऑडियो और वीडियो पहुँचाने वाला सॉफ़्टवेयर, हमारे सर्वर पर या LiveKit के सर्वर पर।',
          'Google: Google साइन-इन, Google Play बिलिंग, और नोटिफ़िकेशन पहुँचाना।',
          'Expo: नोटिफ़िकेशन और ऐप अपडेट पहुँचाना।',
          'Sentry: क्रैश रिपोर्ट, जर्मनी में प्रोसेस, सिर्फ़ एक अंदरूनी ID से पहचानी जाती हैं।',
          'Razorpay: वेब पर किए गए भुगतान।',
          'MSG91: SMS से साइन-इन कोड भेजना।',
          'Vercel: यह वेबसाइट होस्ट करना।',
        ],
      },
      {
        title: 'हम इसे कितने समय तक रखते हैं',
        list: [
          'आपका अकाउंट और प्रोफ़ाइल: जब तक आप अकाउंट डिलीट न करें।',
          'रूम चैट: 14 दिन।',
          'साइन-इन कोड: 7 दिन। साइन-इन सेशन: खत्म होने के 30 दिन बाद तक।',
          'इस्तेमाल के इवेंट: 90 दिन तक पूरे, फिर एक निजी एनालिटिक्स आर्काइव में, सिर्फ़ एक अंदरूनी ID से जुड़े।',
          'एरर और सुरक्षा लॉग: 30 से 90 दिन।',
          'खरीदारी, गिफ़्ट और पेमेंट के रिकॉर्ड: जितना भारत का टैक्स और अकाउंटिंग कानून कहता है, अभी अधिकतम आठ साल।',
          'रिपोर्ट, सुरक्षा कार्रवाई और होस्ट की जाँच: Dhun को सुरक्षित रखने के लिए जितना ज़रूरी हो, अकाउंट डिलीट होने के बाद भी, ताकि हटाया गया व्यक्ति आसानी से वापस न आ सके।',
          'निजी मैसेज: अकाउंट डिलीट होने तक। उसके बाद आपके भेजे मैसेज पाने वाले के पास रहते हैं, आपके नाम के बिना।',
        ],
      },
      {
        title: 'अकाउंट डिलीट करना',
        body: [
          <>
            आप कभी भी ऐप में Me › Account and security से अपना अकाउंट डिलीट कर सकते हैं। आपका फ़ोन नंबर, ईमेल,
            पासवर्ड, Google लिंक, नाम, फ़ोटो, बायो, जेंडर, जन्मतिथि और भाषाएँ तुरंत हट जाती हैं, और हर फ़ोन से साइन
            आउट हो जाता है। <a href="/hi/delete-account">क्या डिलीट होता है और क्या रखा जाता है</a>।
          </>,
          <>
            आपकी अपलोड की गई फ़ोटो, अकाउंट से उनका लिंक हटने के बाद भी हमारे फ़ोटो स्टोरेज में रह सकती हैं।{' '}
            <a href="mailto:support@dhunlive.com">support@dhunlive.com</a> पर लिखें, हम उन्हें 7 दिन के अंदर
            डिलीट कर देंगे।
          </>,
        ],
      },
      {
        title: 'आपके अधिकार',
        body: [
          <>
            भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के तहत आप माँग सकते हैं कि हमारे पास आपका जो
            व्यक्तिगत डेटा है वह आपको दिखाया जाए, सुधारा या पूरा किया जाए, मिटाया जाए, और किसी व्यक्ति को नामित कर
            सकते हैं जो आपकी मृत्यु या असमर्थता में आपकी ओर से काम करे। प्रोफ़ाइल बदलना और अकाउंट डिलीट करना ऐप में
            हो जाता है; बाकी किसी भी चीज़ के लिए अपने अकाउंट वाले ईमेल से, या अकाउंट वाला फ़ोन नंबर लिखकर,{' '}
            <a href="mailto:support@dhunlive.com">support@dhunlive.com</a> पर लिखें। हम 30 दिन के अंदर जवाब देते
            हैं।
          </>,
        ],
      },
      {
        title: 'सिर्फ़ वयस्कों के लिए',
        body: [
          'Dhun 18 साल और उससे ज़्यादा उम्र के लोगों के लिए है। साइन अप करते समय हम आपकी जन्मतिथि पूछते हैं, और ऐप 18 से कम उम्र वाले किसी को साइन अप पूरा नहीं करने देता। कॉइन खरीदने और गिफ़्ट भेजने के लिए भी पुष्टि किया हुआ वयस्क अकाउंट चाहिए। अगर हमें पता चले कि कोई अकाउंट 18 से कम उम्र वाले का है, तो हम उसे बंद कर देते हैं।',
        ],
      },
      {
        title: 'डेटा की सुरक्षा',
        body: [
          'ऐप और हमारे सर्वर के बीच सब कुछ एन्क्रिप्टेड होता है। पासवर्ड और साइन-इन कोड सिर्फ़ हैश के रूप में रखे जाते हैं। व्यक्तिगत डेटा सिर्फ़ वही स्टाफ़ देख सकता है जिसे ज़रूरत है, और अकाउंट पर उनकी हर कार्रवाई रिकॉर्ड होती है। कोई भी सिस्टम पूरी तरह सुरक्षित नहीं होता; अगर किसी सेंधमारी का असर आप पर पड़ता है, तो हम कानून के मुताबिक आपको और अधिकारियों को बताएँगे।',
        ],
      },
      {
        title: 'बदलाव',
        body: [
          'जब यह पॉलिसी बदलती है, ऊपर की तारीख बदल जाती है। अगर किसी बदलाव से आपके डेटा के इस्तेमाल पर असर पड़ता है, तो हम लागू होने से पहले ऐप में बताएँगे।',
        ],
      },
      {
        title: 'सवाल और शिकायत',
        body: [
          <>
            अपने डेटा से जुड़ी किसी भी बात के लिए <a href="mailto:support@dhunlive.com">support@dhunlive.com</a> पर
            लिखें। शिकायत के लिए हमारे शिकायत अधिकारी को{' '}
            <a href="mailto:grievance@dhunlive.com">grievance@dhunlive.com</a> पर लिखें। IT नियम, 2021 के तहत हम
            24 घंटे के अंदर शिकायत की पुष्टि करते हैं और 15 दिन के अंदर उसका समाधान करते हैं।
          </>,
        ],
      },
    ],
  },
  notFound: {
    title: 'यह पेज नहीं मिला',
    body: 'लिंक पुराना हो सकता है, या पता गलत लिखा गया है।',
    home: 'होम पेज पर जाएँ',
  },
};

export const copyFor = (lang: Lang): Copy => (lang === 'hi' ? hi : en);
