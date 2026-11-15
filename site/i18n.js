// English is written in the HTML, so the site reads fully without JavaScript.
// This file adds Hindi: every element carrying data-i18n="key" has its Hindi
// below, and the switch swaps between the two in place.
//
// Values are our own static strings, some with a link or an <em> inside, so
// they are set with innerHTML. Nothing here ever comes from a visitor.
//
// The choice is remembered on the device. A first visit from a phone set to
// Hindi opens in Hindi.
(function () {
  'use strict';

  var HI = {
    'title.index': 'Dhun: अपनी भाषा में लाइव रूम',
    'title.delete': 'अपना Dhun अकाउंट डिलीट करें',
    'title.notfound': 'पेज नहीं मिला · Dhun',

    skip: 'मुख्य हिस्से पर जाएँ',
    'nav.hosts': 'होस्ट के लिए',
    'nav.safety': 'सुरक्षा',
    'nav.contact': 'संपर्क',

    'hero.title': 'गाइए, बात कीजिए, दोस्ती कीजिए। <em>लाइव, अपनी भाषा में।</em>',
    'hero.lede':
      'Dhun भारत के लिए लाइव ऑडियो और वीडियो ऐप है। 20 सीटों तक वाले पार्टी रूम में शामिल हों, या किसी होस्ट को लाइव देखें, हिन्दी, भोजपुरी, तमिल और 11 दूसरी भाषाओं में।',
    'hero.cta': 'होस्ट बनें',
    'hero.status': 'Android ऐप जल्द आ रहा है। सिर्फ़ 18+ के लिए।',
    'hero.phone': 'Dhun के एक पार्टी रूम का उदाहरण',

    'lang.eyebrow': 'नज़दीक मतलब आपकी भाषा',
    'lang.title': '14 भाषाओं में रूम',
    'lang.note':
      'उन लोगों से मिलिए जो आपकी तरह बात करते हैं। Dhun कभी नहीं पूछता कि आप कहाँ हैं। रूम भाषा से ढूँढे जाते हैं, दूरी से नहीं।',

    'how.eyebrow': 'रूम कैसे काम करता है',
    'how.title': 'आइए, सीट लीजिए, गाने में शामिल होइए।',
    'how.1.title': 'रूम चुनें',
    'how.1.body':
      'देखिए अभी क्या लाइव है: गाना, बातचीत, नए दोस्त, गेमिंग। हर रूम पर उसकी भाषा लिखी होती है।',
    'how.2.title': 'सीट लें',
    'how.2.body':
      'पार्टी रूम में 20 तक सीटें होती हैं। खाली सीट लेकर बोलिए या गाइए, या ऑडियंस में बैठकर सुनिए और चैट कीजिए।',
    'how.3.title': 'गिफ़्ट से हौसला बढ़ाएँ',
    'how.3.body':
      'गुलाब से लेकर रॉकेट तक, गिफ़्ट होस्ट को शुक्रिया कहने का तरीका है। होस्ट को मिलने वाले हर गिफ़्ट से उनकी कमाई होती है।',

    'hosts.eyebrow': 'होस्ट के लिए',
    'hosts.title': 'आपकी आवाज़, आपका समय, आपकी ऑडियंस।',
    'hosts.lede':
      'गाइए, कहानियाँ सुनाइए, कोई हुनर दिखाइए या बस अच्छी महफ़िल जमाइए। जब मन हो लाइव जाइए, और अपनी ऑडियंस के भेजे गिफ़्ट से कमाइए।',
    'hosts.cta': 'होस्ट के लिए आवेदन करें',
    'hosts.agency':
      'टैलेंट एजेंसी चलाते हैं? <a href="mailto:partners@dhunlive.com">partners@dhunlive.com</a> पर लिखें।',
    'hosts.f1.title': 'कोई तय घंटे नहीं',
    'hosts.f1.body': 'जब चाहें लाइव जाएँ, जितनी देर चाहें।',
    'hosts.f2.title': 'गिफ़्ट से कमाई',
    'hosts.f2.body': 'आपको मिलने वाला हर गिफ़्ट आपकी कमाई में पॉइंट जोड़ता है।',
    'hosts.f3.title': 'सीधे आपके अपने बैंक खाते में',
    'hosts.f3.body': 'PAN और चेहरे की पुष्टि के बाद अपने पॉइंट रुपयों में निकालें।',
    'hosts.f4.title': 'एजेंसी का साथ',
    'hosts.f4.body':
      'कोचिंग और मदद के लिए किसी एजेंसी से जुड़ें, या हमारी एजेंसी से शुरुआत करें।',
    'hosts.f5.title': '18 साल और उससे ज़्यादा',
    'hosts.f5.body': 'हर होस्ट बालिग है, और किसी भी पेमेंट से पहले उसकी पुष्टि होती है।',

    'safety.eyebrow': 'सुरक्षा',
    'safety.title': 'अच्छे रूम के लिए अच्छे नियम ज़रूरी हैं।',
    'safety.chance.title': 'किस्मत का कोई खेल नहीं। कभी नहीं।',
    'safety.chance.body':
      'Dhun पर कोई लकी ड्रॉ, स्पिन, मिस्ट्री बॉक्स या सट्टा नहीं है। गिफ़्ट बस गिफ़्ट है: आप हमेशा जानते हैं कि आप क्या भेज रहे हैं, और किसे।',
    'safety.adults.title': 'सिर्फ़ बालिगों के लिए',
    'safety.adults.body':
      'Dhun 18 साल और उससे ज़्यादा उम्र के लोगों के लिए है। पेमेंट मिलने से पहले होस्ट PAN और चेहरे की जाँच से अपनी पहचान की पुष्टि करते हैं।',
    'safety.report.title': 'किसी को भी रिपोर्ट या ब्लॉक करें',
    'safety.report.body':
      'किसी भी रूम या प्रोफ़ाइल से, दो टैप में। हर रिपोर्ट को एक इंसान देखता है, और होस्ट अपने रूम से किसी को भी हटा सकते हैं।',
    'safety.limits.title': 'आपकी तय की हुई सीमा',
    'safety.limits.body':
      'रोज़ाना या महीने की खर्च सीमा तय करें, या 30 दिन, 90 दिन या हमेशा के लिए खर्च रोक दें। Dhun इसे सिर्फ़ याद नहीं दिलाता, लागू करता है।',
    'safety.location.title': 'आपकी लोकेशन सिर्फ़ आपकी',
    'safety.location.body':
      'Dhun कभी नहीं पूछता कि आप कहाँ हैं, और कभी किसी को नहीं दिखाता कि आप कितनी दूर रहते हैं।',

    'contact.eyebrow': 'संपर्क',
    'contact.title': 'किसी इंसान से बात कीजिए।',
    'contact.support.title': 'अकाउंट से जुड़ी मदद',
    'contact.support.body':
      'अपनी प्रोफ़ाइल से अपना Dhun ID साथ लिखें, ताकि हम आपको जल्दी ढूँढ सकें।',
    'contact.grievance.title': 'शिकायत अधिकारी',
    'contact.grievance.name': 'नाम लॉन्च से पहले प्रकाशित होगा',
    'contact.grievance.body':
      'IT नियम, 2021 के तहत हम शिकायत मिलने की पुष्टि 24 घंटे में करते हैं और 15 दिनों में उसका हल करते हैं।',
    'contact.delete.title': 'Dhun छोड़ना',
    'contact.delete.body':
      'आप कभी भी ऐप में अपना अकाउंट डिलीट कर सकते हैं। <a href="/delete-account">अकाउंट डिलीट करने का तरीका</a>',

    'foot.delete': 'अपना अकाउंट डिलीट करें',
    'foot.privacy': 'प्राइवेसी पॉलिसी (लॉन्च से पहले)',
    'foot.terms': 'सेवा की शर्तें (लॉन्च से पहले)',
    'foot.home': 'होम',

    'del.eyebrow': 'आपका अकाउंट',
    'del.title': 'अपना Dhun अकाउंट डिलीट करें',
    'del.lede':
      'आप ऐप में खुद, कभी भी अपना अकाउंट डिलीट कर सकते हैं। यह तुरंत लागू होता है और हर फ़ोन से आपको साइन आउट कर देता है।',
    'del.app.title': 'ऐप में',
    'del.app.1': 'Dhun खोलें और <span class="path">प्रोफ़ाइल</span> टैब पर जाएँ।',
    'del.app.2': '<span class="path">अकाउंट और सुरक्षा</span> पर टैप करें।',
    'del.app.3': '<span class="path">अकाउंट डिलीट करें</span> पर टैप करें।',
    'del.app.4': 'पुष्टि करें। अगर आप ईमेल से साइन इन करते हैं, तो अपना पासवर्ड डालें।',
    'del.email.title': 'अगर ऐप नहीं खुल रहा',
    'del.email.body':
      '"Delete my account" विषय के साथ <a href="mailto:support@dhunlive.com?subject=Delete%20my%20account">support@dhunlive.com</a> पर ईमेल करें। अपने अकाउंट वाले ईमेल पते से लिखें, या साइन अप वाला फ़ोन नंबर साथ लिखें। अकाउंट आपका है, यह पक्का करने के लिए हम उस नंबर या पते पर एक कोड भेजेंगे, फिर 7 दिनों के अंदर उसे डिलीट कर देंगे।',
    'del.before.title': 'डिलीट करने से पहले',
    'del.before.body':
      'बिना खर्च किए कॉइन और जेम, और बिना निकाले पॉइंट, आपके अकाउंट के साथ खत्म हो जाते हैं और वापस नहीं मिलते। अगर आप होस्ट हैं, तो पहले अपने पॉइंट निकाल लें।',
    'del.what.title': 'आपके डेटा का क्या होता है',
    'del.deleted.title': 'तुरंत डिलीट',
    'del.deleted.1': 'आपका फ़ोन नंबर और ईमेल पता',
    'del.deleted.2': 'आपका पासवर्ड',
    'del.deleted.3': 'आपका नाम, फ़ोटो, बायो, जेंडर और जन्मतिथि',
    'del.deleted.4': 'आपकी चुनी हुई भाषाएँ',
    'del.deleted.5': 'आपके डिवाइस और नोटिफ़िकेशन सेटिंग',
    'del.deleted.6': 'हर साइन-इन सेशन',
    'del.kept.title': 'रखा जाता है, आपके नाम के बिना',
    'del.kept.1': 'कॉइन खरीदारी, गिफ़्ट और पेमेंट का रिकॉर्ड, बिना किसी नाम, नंबर या ईमेल के',
    'del.kept.2': 'आपके भेजे मैसेज और गिफ़्ट वहीं रहते हैं, लेकिन उन पर आपका नाम नहीं दिखता',
    'del.why':
      'भारत के टैक्स और अकाउंटिंग कानून के तहत हमें वित्तीय रिकॉर्ड रखने होते हैं। हम उन्हें सिर्फ़ उतने समय तक रखते हैं जितना कानून कहता है, अभी अधिकतम आठ साल, और सिर्फ़ हिसाब-किताब, टैक्स और विवाद सुलझाने के लिए इस्तेमाल करते हैं।',
    'del.again.title': 'वापस आना',
    'del.again.body':
      'डिलीट होने के बाद अकाउंट वापस नहीं हो सकता। आप उसी फ़ोन नंबर से नए अकाउंट के रूप में फिर से साइन अप कर सकते हैं।',

    'nf.title': 'यह पेज नहीं मिला',
    'nf.body': 'लिंक पुराना हो सकता है, या पता गलत लिखा गया है।',
    'nf.home': 'होम पेज पर जाएँ',
  };

  var KEY = 'dhun.lang';
  var english = new Map();
  var englishLabels = new Map();
  var englishTitle = document.title;

  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function remember(lang) {
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      // Private mode or blocked storage: the choice lasts this page only.
    }
  }

  function apply(lang) {
    var hindi = lang === 'hi';
    document.documentElement.lang = hindi ? 'hi' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!english.has(el)) english.set(el, el.innerHTML);
      el.innerHTML = hindi && HI[key] ? HI[key] : english.get(el);
    });

    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-label');
      if (!englishLabels.has(el)) englishLabels.set(el, el.getAttribute('aria-label'));
      el.setAttribute('aria-label', hindi && HI[key] ? HI[key] : englishLabels.get(el));
    });

    var page = document.body.getAttribute('data-page');
    var titleKey = page ? 'title.' + page : null;
    document.title = hindi && titleKey && HI[titleKey] ? HI[titleKey] : englishTitle;

    document.querySelectorAll('[data-lang-switch]').forEach(function (button) {
      // The button names the language it switches TO, in that language.
      button.textContent = hindi ? 'English' : 'हिन्दी';
      button.setAttribute('lang', hindi ? 'en' : 'hi');
      button.setAttribute('aria-label', hindi ? 'Read this page in English' : 'यह पेज हिन्दी में पढ़ें');
    });
  }

  function start() {
    var initial = stored();
    if (initial !== 'hi' && initial !== 'en') {
      initial = (navigator.language || '').toLowerCase().indexOf('hi') === 0 ? 'hi' : 'en';
    }
    apply(initial);

    document.querySelectorAll('[data-lang-switch]').forEach(function (button) {
      button.hidden = false;
      button.addEventListener('click', function () {
        var next = document.documentElement.lang === 'hi' ? 'en' : 'hi';
        remember(next);
        apply(next);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
