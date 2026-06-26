/*!
 * Calquto Cookie Consent Banner
 * GDPR compliant · AdSense ready · No dependencies
 */
(function () {
  const COOKIE_KEY = 'calquto_cookie_consent';
  const COOKIE_DAYS = 365;

  // Check if already decided
  function getConsent() {
    const match = document.cookie.match(new RegExp('(^| )' + COOKIE_KEY + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setConsent(value) {
    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_DAYS);
    document.cookie = COOKIE_KEY + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
  }

  function loadAdsense() {
    if (document.querySelector('script[src*="adsbygoogle"]')) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    s.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXXXXXXXX'); // ← Replace with your AdSense ID
    document.head.appendChild(s);
  }

  function removeBanner() {
    const banner = document.getElementById('calquto-cookie-banner');
    if (banner) {
      banner.style.transform = 'translateY(100%)';
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 400);
    }
  }

  function createBanner() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      #calquto-cookie-banner {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        z-index: 99999;
        background: #0A1628;
        border-top: 3px solid #FF9933;
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        flex-wrap: wrap;
        box-shadow: 0 -4px 24px rgba(0,0,0,0.3);
        transform: translateY(100%);
        opacity: 0;
        transition: transform 0.4s ease, opacity 0.4s ease;
        font-family: 'Inter', system-ui, sans-serif;
      }
      #calquto-cookie-banner.show {
        transform: translateY(0);
        opacity: 1;
      }
      #calquto-cookie-banner .cookie-text {
        flex: 1;
        min-width: 260px;
        font-size: 13px;
        color: rgba(255,255,255,0.75);
        line-height: 1.6;
      }
      #calquto-cookie-banner .cookie-text strong {
        color: white;
        font-size: 14px;
        display: block;
        margin-bottom: 3px;
      }
      #calquto-cookie-banner .cookie-text a {
        color: #FF9933;
        text-decoration: none;
      }
      #calquto-cookie-banner .cookie-text a:hover {
        text-decoration: underline;
      }
      #calquto-cookie-banner .cookie-actions {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-shrink: 0;
      }
      #calquto-cookie-banner .btn-accept {
        background: #FF9933;
        color: white;
        border: none;
        padding: 9px 22px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        transition: background 0.2s;
        white-space: nowrap;
      }
      #calquto-cookie-banner .btn-accept:hover {
        background: #E8831A;
      }
      #calquto-cookie-banner .btn-decline {
        background: transparent;
        color: rgba(255,255,255,0.5);
        border: 1px solid rgba(255,255,255,0.2);
        padding: 9px 16px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s;
        white-space: nowrap;
      }
      #calquto-cookie-banner .btn-decline:hover {
        color: white;
        border-color: rgba(255,255,255,0.5);
      }
      @media (max-width: 600px) {
        #calquto-cookie-banner {
          flex-direction: column;
          align-items: flex-start;
          padding: 16px;
        }
        #calquto-cookie-banner .cookie-actions {
          width: 100%;
        }
        #calquto-cookie-banner .btn-accept {
          flex: 1;
        }
      }
    `;
    document.head.appendChild(style);

    // Create banner HTML
    const banner = document.createElement('div');
    banner.id = 'calquto-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-text">
        <strong>🍪 We use cookies</strong>
        Calquto uses cookies to improve your experience and show relevant ads.
        By clicking "Accept", you agree to our use of cookies as described in our
        <a href="/privacy-policy.html">Privacy Policy</a>.
      </div>
      <div class="cookie-actions">
        <button class="btn-decline" id="calquto-decline">Decline</button>
        <button class="btn-accept" id="calquto-accept">Accept All</button>
      </div>
    `;
    document.body.appendChild(banner);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => banner.classList.add('show'));
    });

    // Button handlers
    document.getElementById('calquto-accept').addEventListener('click', function () {
      setConsent('accepted');
      removeBanner();
      loadAdsense();
    });

    document.getElementById('calquto-decline').addEventListener('click', function () {
      setConsent('declined');
      removeBanner();
    });
  }

  // Init on DOM ready
  function init() {
    const consent = getConsent();
    if (consent === 'accepted') {
      loadAdsense(); // Already accepted — load ads silently
    } else if (consent === 'declined') {
      // Do nothing — respect user choice
    } else {
      // No decision yet — show banner
      createBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
