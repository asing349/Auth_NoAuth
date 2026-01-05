import { Example } from '../types';

export const examples: Example[] = [
  {
    site_name: 'GitHub',
    url: 'https://github.com/login',
    found: true,
    has_traditional_auth: true,
    has_oauth: true,
    scrape_success: true,
    explanation: 'Traditional login form found, OAuth/social login found',
    traditional_auth_html: `<form data-turbo="false" action="/session" accept-charset="UTF-8" method="post"><input type="hidden" data-csrf="true" name="authenticity_token" value="1DA8ZO/in5cgA++mU+lSPQyTiD10zvz6ag4tOrBUUpUgUc5/4s0dUH1ohGdBrw9BQp9wUvqU7URX9F6BVc/SQQ==">  <div>

  <input type="hidden" name="add_account" id="add_account" autocomplete="off" class="form-control">

    <label for="login_field">
      Username or email address
    </label>
    <input type="text" name="login" id="login_field" autocapitalize="off" autocorrect="off" autocomplete="username" class="form-control  js-login-field" autofocus="autofocus" required="required">
  </div>


  <div class="position-relative">
    <label for="password">
      Password
    </label>
    <input type="password" name="password" id="password" class="form-control form-control js-password-field" autocomplete="current-password" required="required">
    <a class="label-link position-absolute top-0 right-0" id="forgot-password" href="/password_reset">Forgot password?</a>

<input type="hidden" name="webauthn-conditional" value="undefined">
<input type="hidden" class="js-support" name="javascript-support" value="true">
<input type="hidden" class="js-webauthn-support" name="webauthn-support" value="supported">
<input type="hidden" class="js-webauthn-iuvpaa-support" name="webauthn-iuvpaa-support" value="unsupported">
<input type="hidden" name="return_to" id="return_to" value="https://github.com/login" autocomplete="off" class="form-control">
<input type="hidden" name="allow_signup" id="allow_signup" autocomplete="off" class="form-control">
<input type="hidden" name="client_id" id="client_id" autocomplete="off" class="form-control">
<input type="hidden" name="integration" id="integration" autocomplete="off" class="form-control">
<input class="form-control" type="text" name="required_field_b00b" hidden="hidden">
<input class="form-control" type="hidden" name="timestamp" value="1766548931197">
<input class="form-control" type="hidden" name="timestamp_secret" value="bea684ce671af90a94920cb3d96f2e1b3b3eb4f16301d1a770a9a6d296fb683d">


  </div>

  <div>
    <input type="submit" name="commit" value="Sign in" class="btn btn-primary btn-block js-sign-in-button" data-disable-with="Signing in…" data-signin-label="Sign in" data-sso-label="Sign in with your identity provider" development="false" disable-emu-sso="false">
  </div>
</form>`,
    oauth_html: `<form data-turbo="false" action="/sessions/social/google/initiate" accept-charset="UTF-8" method="get">
    <input type="hidden" name="return_to" value="">
    <input type="hidden" name="disable_signup" value="false">
    <button data-disable-with="Continuing with Google..." type="submit" data-view-component="true" class="Button--secondary Button--medium Button Button--fullWidth mt-2">  <span class="Button-content">
      <span class="Button-visual Button-leadingVisual">
        <svg width="16" height="16" data-view-component="true">        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" data-view-component="true" class="octicon color-fg-default">
  <g clip-path="url(#clip0_643_9687)">
    <path d="M8.00018 3.16667C9.18018 3.16667 10.2368 3.57333 11.0702 4.36667L13.3535 2.08333C11.9668 0.793333 10.1568 0 8.00018 0C4.87352 0 2.17018 1.79333 0.853516 4.40667L3.51352 6.47C4.14352 4.57333 5.91352 3.16667 8.00018 3.16667Z" fill="#EA4335"></path>
    <path d="M15.66 8.18335C15.66 7.66002 15.61 7.15335 15.5333 6.66669H8V9.67335H12.3133C12.12 10.66 11.56 11.5 10.72 12.0667L13.2967 14.0667C14.8 12.6734 15.66 10.6134 15.66 8.18335Z" fill="#4285F4"></path>
    <path d="M3.51 9.53001C3.35 9.04668 3.25667 8.53334 3.25667 8.00001C3.25667 7.46668 3.34667 6.95334 3.51 6.47001L0.85 4.40668C0.306667 5.48668 0 6.70668 0 8.00001C0 9.29334 0.306667 10.5133 0.853333 11.5933L3.51 9.53001Z" fill="#FBBC05"></path>
    <path d="M8.0001 16C10.1601 16 11.9768 15.29 13.2968 14.0633C10.0034 12.5467 9.0801 12.83 8.0001 12.83C5.91343 12.83 4.14343 11.4233 3.5101 9.52667L0.850098 11.59C2.1701 14.2067 4.87343 16 8.0001 16Z" fill="#34A853"></path>
  </g>
  <defs>
    <clipPath id="clip0_643_9687">
      <rect width="16" height="16" fill="white"></rect>
    </clipPath>
  </defs>
</svg>
</svg>
      </span>
    <span class="Button-label">Continue with Google</span>
  </span>
</button>
</form>`,
  },
  {
    site_name: 'LinkedIn',
    url: 'https://www.linkedin.com/login',
    found: true,
    has_traditional_auth: true,
    has_oauth: true,
    scrape_success: true,
    explanation: 'Traditional login form found, OAuth/social login found',
    traditional_auth_html: `<form method="post" class="login__form" action="/checkpoint/lg/login-submit" novalidate=""><input name="csrfToken" value="ajax:0043773687088971462" type="hidden"><div class="form__input--floating margin-top-24 email-input-type"><input id="username" name="session_key" aria-describedby="error-for-username" required="" validation="email|tel" value="" autofocus="" autocomplete="username webauthn" placeholder=" " aria-label="Email or phone" type="email"><label class="form__label--floating" for="username" aria-hidden="true">Email or phone</label><div error-for="username" id="error-for-username" class="form__label--error  hidden__imp" role="alert" aria-live="assertive"></div></div><div class="form__input--floating margin-top-24"><input id="password" aria-describedby="error-for-password" name="session_password" required="" validation="password" autocomplete="current-password" aria-label="Password" type="password"><label for="password" class="form__label--floating" aria-hidden="true">Password</label><span id="password-visibility-toggle" class="button__password-visibility" role="button" tabindex="0">Show</span><div error-for="password" id="error-for-password" class="form__label--error  hidden__imp" role="alert" aria-live="assertive"></div></div><a href="/checkpoint/rp/request-password-reset" id="reset-password-button" class="btn__tertiary--medium forgot-password" data-cie-control-urn="forgot-password-btn">Forgot password?</a><div class="remember_me__opt_in"><input name="rememberMeOptIn" id="rememberMeOptIn-checkbox" class="large-input" checked="" value="true" type="checkbox"><label for="rememberMeOptIn-checkbox">Keep me logged in</label></div><div class="login__form_action_container "><button class="btn__primary--large from__button--floating" data-litms-control-urn="login-submit" aria-label="Sign in" type="submit">Sign in</button></div></form>`,
    oauth_html: `<button class="sign-in-with-apple-button" aria-label="Sign in with Apple" type="button"><svg width="24" height="24" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="transparent"></rect><path d="M17.569 12.6254C17.597 15.652 20.2179 16.6592 20.247 16.672C20.2248 16.743 19.8282 18.1073 18.8662 19.5166C18.0345 20.735 17.1714 21.9488 15.8117 21.974C14.4756 21.9986 14.046 21.1799 12.5185 21.1799C10.9915 21.1799 10.5142 21.9489 9.2495 21.9987C7.93704 22.0485 6.93758 20.6812 6.09906 19.4673C4.38557 16.9842 3.0761 12.4508 4.83438 9.39061C5.70786 7.87092 7.26882 6.90859 8.96311 6.88391C10.2519 6.85927 11.4683 7.753 12.2562 7.753C13.0436 7.753 14.5219 6.67821 16.0759 6.83605C16.7265 6.8632 18.5527 7.09947 19.7253 8.81993C19.6309 8.87864 17.5463 10.095 17.569 12.6254ZM15.058 5.1933C15.7548 4.34789 16.2238 3.171 16.0959 2C15.0915 2.04046 13.877 2.67085 13.1566 3.5158C12.5109 4.26404 11.9455 5.46164 12.0981 6.60946C13.2176 6.69628 14.3612 6.03925 15.058 5.1933Z" fill="black"></path></svg><span class="sign-in-with-apple-button__text">Sign in with Apple</span></button>`,
  },
  {
    site_name: 'Dropbox',
    url: 'https://www.dropbox.com/login',
    found: true,
    has_traditional_auth: true,
    has_oauth: true,
    scrape_success: true,
    explanation: 'Traditional login form found, OAuth/social login found',
    traditional_auth_html: `<form method="POST" novalidate=""><div class="_susi-auth-field_4srl7_4"><div class="_field-input-wrapper_4srl7_50"><label class="_field-input-label_4srl7_100" for="susi_email4812251726349345">Email</label><input id="susi_email4812251726349345" type="email" class="_field-input_4srl7_50" name="susi_email" autocomplete="username webauthn" aria-describedby="susi_email4812251726349345__input-error" aria-invalid="false" inputmode="text" value=""><input class="_hide-password_vs4tt_4" type="password" id="credential-autofill-hint" name="autofill-password"></div><div id="susi_email4812251726349345__input-error" aria-live="polite" aria-atomic="true" class="text-input-error-wrapper"></div></div><div class="_submit-container_vs4tt_12"><div class="_email-check-button_vs4tt_8"><button class="email-submit-button dwg-button2" type="submit"><span>Continue</span></button></div></div></form>`,
    oauth_html: `<button class="dwg-sso-button auth-apple"><div class="dwg-sso-button--apple-logo"><svg viewBox="0 0 24 24" fill="none"><path d="M18.695 16.469..." fill="currentColor"></path></svg></div><div class="dwg-sso-button--text-container-v2"><span>Continue with Apple</span></div></button>`,
  },
  {
    site_name: 'Spotify',
    url: 'https://accounts.spotify.com/en/login',
    found: true,
    has_traditional_auth: true,
    has_oauth: true,
    scrape_success: true,
    explanation: 'Traditional login form found, OAuth/social login found',
    traditional_auth_html: `<form><div class="form-group"><label for="username">Email or username</label><input id="username" type="text" autocomplete="username" spellcheck="false" value=""></div><button type="submit">Continue</button></form>`,
    oauth_html: `<a href="/en/login/google">Continue with Google</a><a href="/en/login/facebook">Continue with Facebook</a><a href="/en/login/apple">Continue with Apple</a>`,
  },
  {
    site_name: 'Reddit',
    url: 'https://www.reddit.com/login',
    found: false,
    has_traditional_auth: false,
    has_oauth: false,
    scrape_success: true,
    explanation: 'No authentication components found - Possible bot blocking or dynamic page loading',
    error: 'Possible bot blocking detected',
  },
  {
    site_name: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Main_Page',
    found: false,
    has_traditional_auth: false,
    has_oauth: false,
    scrape_success: true,
    explanation: 'No authentication components found',
    error: 'Rate limit exceeded',
  },
  {
    site_name: 'BBC News',
    url: 'https://www.bbc.com/news',
    found: false,
    has_traditional_auth: false,
    has_oauth: false,
    scrape_success: true,
    explanation: 'No authentication components found',
  },
];
