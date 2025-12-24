'use client';

import CodeDisplay from './CodeDisplay';

// Example data - 4 with auth, 3 without auth
const examples = [
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
</form>
    <form data-turbo="false" action="/sessions/social/apple/initiate" accept-charset="UTF-8" method="get">
      <input type="hidden" name="return_to" value="">
      <input type="hidden" name="disable_signup" value="false">
      <button data-disable-with="Continuing with Apple..." type="submit" data-view-component="true" class="Button--secondary Button--medium Button Button--fullWidth mt-2">  <span class="Button-content">
      <span class="Button-visual Button-leadingVisual">
        <svg width="16" height="16" data-view-component="true">          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" width="16" height="16" data-view-component="true" class="octicon">
  <g clip-path="url(#clip0_3150_11451)">
    <path d="M8.08803 4.3535C8.74395 4.3535 9.56615 3.91006 10.0558 3.31881C10.4992 2.78299 10.8226 2.03469 10.8226 1.28639C10.8226 1.18477 10.8133 1.08314 10.7948 1C10.065 1.02771 9.18738 1.48963 8.6608 2.10859C8.24508 2.57975 7.86631 3.31881 7.86631 4.07635C7.86631 4.18721 7.88479 4.29807 7.89402 4.33502C7.94021 4.34426 8.01412 4.3535 8.08803 4.3535ZM5.77846 15.5318C6.67457 15.5318 7.07182 14.9313 8.18965 14.9313C9.32596 14.9313 9.57539 15.5133 10.5731 15.5133C11.5524 15.5133 12.2083 14.608 12.8273 13.7211C13.5201 12.7049 13.8065 11.7072 13.825 11.661C13.7603 11.6425 11.885 10.8757 11.885 8.7232C11.885 6.85707 13.3631 6.01639 13.4462 5.95172C12.467 4.5475 10.9796 4.51055 10.5731 4.51055C9.47377 4.51055 8.57766 5.1757 8.01412 5.1757C7.4044 5.1757 6.60066 4.5475 5.64912 4.5475C3.83842 4.5475 2 6.0441 2 8.87101C2 10.6263 2.68363 12.4832 3.52432 13.6842C4.2449 14.7004 4.87311 15.5318 5.77846 15.5318Z" fill="currentColor"></path>
  </g>
  <defs>
    <clipPath id="clip0_3150_11451">
      <rect width="16" height="16"></rect>
    </clipPath>
  </defs>
</svg>
</svg>
      </span>
    <span class="Button-label">Continue with Apple</span>
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
    oauth_html: `<div class="alternate-signin__btn--google margin-top-12"><div class="S9gUrf-YoZ4jf" style="position: relative;"><div></div><iframe src="https://accounts.google.com/gsi/button?logo_alignment=center&amp;shape=pill&amp;size=large&amp;text=continue_with&amp;theme=undefined&amp;type=undefined&amp;width=302&amp;client_id=990339570472-k6nqn1tpmitg8pui82bfaun3jrpmiuhs.apps.googleusercontent.com&amp;iframe_id=gsi_990584_599531&amp;as=H%2Bqlz%2B7E0oQ5fy8sqiKSTg&amp;hl=en_US" allow="identity-credentials-get" id="gsi_990584_599531" title="Sign in with Google Button" style="display: block; position: relative; top: 0px; left: 0px; height: 44px; width: 322px; border: 0px; margin: -2px -10px;"></iframe></div></div><button class="sign-in-with-apple-button" aria-label="Sign in with Apple" type="button"><svg width="24" height="24" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="transparent"></rect><path d="M17.569 12.6254C17.597 15.652 20.2179 16.6592 20.247 16.672C20.2248 16.743 19.8282 18.1073 18.8662 19.5166C18.0345 20.735 17.1714 21.9488 15.8117 21.974C14.4756 21.9986 14.046 21.1799 12.5185 21.1799C10.9915 21.1799 10.5142 21.9489 9.2495 21.9987C7.93704 22.0485 6.93758 20.6812 6.09906 19.4673C4.38557 16.9842 3.0761 12.4508 4.83438 9.39061C5.70786 7.87092 7.26882 6.90859 8.96311 6.88391C10.2519 6.85927 11.4683 7.753 12.2562 7.753C13.0436 7.753 14.5219 6.67821 16.0759 6.83605C16.7265 6.8632 18.5527 7.09947 19.7253 8.81993C19.6309 8.87864 17.5463 10.095 17.569 12.6254ZM15.058 5.1933C15.7548 4.34789 16.2238 3.171 16.0959 2C15.0915 2.04046 13.877 2.67085 13.1566 3.5158C12.5109 4.26404 11.9455 5.46164 12.0981 6.60946C13.2176 6.69628 14.3612 6.03925 15.058 5.1933Z" fill="black"></path></svg><span class="sign-in-with-apple-button__text">Sign in with Apple</span></button>`,
  },
  {
    site_name: 'Dropbox',
    url: 'https://www.dropbox.com/login',
    found: true,
    has_traditional_auth: true,
    has_oauth: true,
    scrape_success: true,
    explanation: 'Traditional login form found, OAuth/social login found',
    traditional_auth_html: `<form method="POST" novalidate=""><div class="_susi-auth-field_4srl7_4"><div class="_field-input-wrapper_4srl7_50"><label class="_field-input-label_4srl7_100" for="susi_email4812251726349345">Email</label><input id="susi_email4812251726349345" type="email" class="_field-input_4srl7_50" name="susi_email" autocomplete="username webauthn" aria-describedby="susi_email4812251726349345__input-error" aria-invalid="false" inputmode="text" value=""><input class="_hide-password_vs4tt_4" type="password" id="credential-autofill-hint" name="autofill-password"></div><div id="susi_email4812251726349345__input-error" aria-live="polite" aria-atomic="true" class="text-input-error-wrapper"></div></div><div class="_submit-container_vs4tt_12"><div class="_email-check-button_vs4tt_8"><button class="email-submit-button dwg-button2 dwg-button2--button-style-primary dwg-button2--button-size-standard dwg-box dwg-display--inline-block dwg-width--full dwg-pt--2 dwg-pr--3 dwg-pb--2 dwg-pl--3 dwg-bg-color--core-accent disabled:dwg-bg-color--disabled dwg-border-color--core-accent disabled:dwg-border-color--disabled dwg-border-style--solid dwg-color--inverse-standard disabled:dwg-color--inverse-faint" rel="" type="submit"><div class="dwg-stack dwg-stack--v2 dwg-stack--grid-flow-column dwg-column-gap--3 dwg-box dwg-display--inline-grid dwg-position--relative dwg-width--full dwg-height--full dwg-align-items--center dwg-justify-content--center dwg-p--0 dwg-m--0 dwg-text-decoration--none"><span class="dwg-text dwg-font-family--atlas-grotesk dwg-font-size--16 dwg-font-weight--medium dwg-font-style--normal dwg-line-height--120% dwg-text-align--center dwg-button2__text dwg-box dwg-p--0 dwg-m--0 dwg-bg-color--transparent dwg-color--inherit">Continue</span></div></button></div></div></form>`,
    oauth_html: `<div class="third-party-container _third-party-container_1p0e9_12" data-testid="third-party-auth"><div><div class="" data-testid="google-onetap-button"><div id="sign-in-with-google-button-container--login" class="google-one-tap-inline-button-container"><div class="sig-wrapper--dwg-refresh" data-wrapper-index="0"><div class="S9gUrf-YoZ4jf" style="position: relative;"><div></div><iframe src="https://accounts.google.com/gsi/button?text=continue_with&amp;width=350&amp;logo_alignment=left&amp;click_listener=()%3D%3E%7Bthis.hasPendingAuthFlow%26%26this.getLogger().logLoginCancel(!1)%2Cthis.hasPendingAuthFlow%3D!0%2Cthis.getLogger().logLoginStart(!1)%7D&amp;is_fedcm_supported=true&amp;client_id=801668726815.apps.googleusercontent.com&amp;iframe_id=gsi_32216_668648&amp;cas=HAsF3uDhboe%2FMwkm60wubRzx9DdnVdY6wmFdsHHAQF8&amp;hl=en" class="L5Fo6c-PQbLGe" allow="identity-credentials-get" id="gsi_32216_668648" title="Sign in with Google Button" style="display: block; position: relative; top: 0px; left: 0px; height: 44px; width: 370px; border: 0px; margin: -2px -10px;"></iframe></div></div></div></div><div id="google-one-tap-inline-tos-login" class="inline-tos-container"></div></div><div class="login-form-container__apple-div" data-testid="apple-login-button"><button class="dwg-sso-button dwg-sso-button-v2 auth-apple dwg-box dwg-theme--coconut-200 dwg-display--flex dwg-width--full dwg-align-items--center dwg-p--0 dwg-bg-color--core-secondary disabled:dwg-border-color--disabled dwg-color--standard" data-uxa-log="sia_login_start"><div class="dwg-sso-button--apple-logo dwg-sso-button--apple-logo-v2 dwg-box dwg-display--flex dwg-align-items--center dwg-justify-content--center"><span class="dwg-lazy-icon--large dwg-box dwg-display--inline-block"><svg viewBox="0 0 24 24" fill="none" class="dig-UIIcon" width="32" height="32" role="presentation" focusable="false"><path d="M18.695 16.469a8.691 8.691 0 0 1-.86 1.546c-.453.645-.823 1.092-1.109 1.34-.442.407-.916.615-1.424.627-.364 0-.804-.104-1.315-.314-.514-.21-.985-.313-1.417-.313-.452 0-.937.103-1.456.313-.52.21-.938.32-1.258.33-.487.021-.972-.193-1.457-.643-.309-.27-.696-.732-1.159-1.387a9.591 9.591 0 0 1-1.225-2.434c-.343-.999-.515-1.966-.515-2.902 0-1.072.232-1.997.696-2.772a4.082 4.082 0 0 1 1.457-1.474 3.92 3.92 0 0 1 1.97-.556c.387 0 .894.12 1.524.355.628.236 1.032.355 1.209.355.132 0 .58-.14 1.34-.418.718-.259 1.325-.366 1.822-.324 1.346.109 2.357.64 3.03 1.595-1.204.73-1.8 1.752-1.788 3.062.01 1.021.381 1.87 1.109 2.545.33.313.698.555 1.108.727-.089.258-.183.505-.282.742ZM15.607 4.32c0 .8-.292 1.547-.875 2.239-.703.822-1.553 1.297-2.476 1.222a2.502 2.502 0 0 1-.018-.303c0-.768.334-1.59.928-2.263.296-.34.673-.623 1.13-.849.457-.222.889-.345 1.295-.366.011.107.016.214.016.32Z" fill="currentColor" vector-effect="non-scaling-stroke"></path></svg></span></div><div class="dwg-sso-button--text-container-v2 dwg-box dwg-display--flex dwg-width--full dwg-justify-content--center dwg-pr--1_5"><span class="dwg-text dwg-font-family--atlas-grotesk dwg-font-size--14 dwg-font-weight--regular dwg-line-height--16 dwg-box dwg-p--0 dwg-m--0 dwg-bg-color--transparent">Continue with Apple</span></div></button></div></div>`,
  },
  {
    site_name: 'Spotify',
    url: 'https://accounts.spotify.com/en/login',
    found: true,
    has_traditional_auth: true,
    has_oauth: true,
    scrape_success: true,
    explanation: 'Traditional login form found, OAuth/social login found',
    traditional_auth_html: `<form><div class="e-91132-form-group e-91132-baseline" style="padding-block-end:var(--encore-spacing-base)" data-encore-id="formGroup"><div class="e-91132-form-group__label-group e-91132-baseline encore-text-body-small-bold"><label for="username" class="e-91132-form-group__label"><span class="e-91132-form-group__label-inner">Email or username</span></label></div><input aria-invalid="false" class="e-91132-form-input e-91132-baseline e-91132-form-control encore-text-body-medium e-91132-focus-border" data-encore-id="formInput" id="username" type="text" autocapitalize="off" autocomplete="username" spellcheck="false" autocorrect="off" data-testid="login-username" value=""></div><button type="submit" style="inline-size:100%" data-testid="login-button" data-encore-id="buttonPrimary" class="encore-text-body-medium-bold e-91132-focus-border e-91132-button-primary e-91132-button"><span class="e-91132-baseline e-91132-overflow-wrap-anywhere e-91132-button-primary__inner encore-bright-accent-set e-91132-button--medium">Continue</span></button></form>`,
    oauth_html: `<div class="sc-6cff0ead-0 bEUwjZ"><a class="encore-text-body-medium-bold e-91132-focus-border e-91132-button--medium e-91132-button--leading e-91132-button-secondary--text-base encore-internal-color-text-base e-91132-button e-91132-baseline e-91132-button-secondary e-91132-overflow-wrap-anywhere" style="inline-size:100%" href="/en/login/google?flow_ctx=940b4eaf-62f3-43eb-a3f3-d5c43210d5d3%3A1766570916" data-encore-id="buttonSecondary"><span aria-hidden="true" class="e-91132-button__icon-wrapper"><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.1 12.2272C22.1 11.5182 22.0364 10.8363 21.9182 10.1818H12.5V14.05H17.8818C17.65 15.3 16.9455 16.3591 15.8864 17.0682V19.5772H19.1182C21.0091 17.8363 22.1 15.2727 22.1 12.2272Z" fill="#4285F4"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.4998 21.9999C15.1998 21.9999 17.4635 21.1045 19.118 19.5772L15.8862 17.0681C14.9907 17.6681 13.8453 18.0227 12.4998 18.0227C9.89529 18.0227 7.69075 16.2636 6.90439 13.8999H3.56348V16.4908C5.20893 19.759 8.59075 21.9999 12.4998 21.9999Z" fill="#34A853"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.90455 13.9C6.70455 13.3 6.59091 12.6591 6.59091 12C6.59091 11.3409 6.70455 10.7 6.90455 10.1V7.50909H3.56364C2.88636 8.85909 2.5 10.3864 2.5 12C2.5 13.6136 2.88636 15.1409 3.56364 16.4909L6.90455 13.9Z" fill="#FBBC05"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.4998 5.97727C13.968 5.97727 15.2862 6.48182 16.3226 7.47273L19.1907 4.60455C17.4589 2.99091 15.1953 2 12.4998 2C8.59075 2 5.20893 4.24091 3.56348 7.50909L6.90439 10.1C7.69075 7.73636 9.89529 5.97727 12.4998 5.97727Z" fill="#EA4335"></path></svg></span>Continue with Google</a><a class="encore-text-body-medium-bold e-91132-focus-border e-91132-button--medium e-91132-button--leading e-91132-button-secondary--text-base encore-internal-color-text-base e-91132-button e-91132-baseline e-91132-button-secondary e-91132-overflow-wrap-anywhere" style="inline-size:100%" href="/en/login/facebook?flow_ctx=940b4eaf-62f3-43eb-a3f3-d5c43210d5d3%3A1766570916" data-encore-id="buttonSecondary"><span aria-hidden="true" class="e-91132-button__icon-wrapper"><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12.5" cy="12" r="10" fill="white"></circle><path d="M22.5 12C22.5 6.477 18.023 2 12.5 2C6.977 2 2.5 6.477 2.5 12C2.5 16.991 6.157 21.128 10.938 21.878V14.891H8.398V12H10.938V9.797C10.938 7.291 12.43 5.907 14.715 5.907C15.808 5.907 16.953 6.102 16.953 6.102V8.562H15.693C14.45 8.562 14.063 9.333 14.063 10.125V12H16.836L16.393 14.89H14.063V21.878C18.843 21.128 22.5 16.991 22.5 12Z" fill="#1877F2"></path></svg></span>Continue with Facebook</a><a class="encore-text-body-medium-bold e-91132-focus-border e-91132-button--medium e-91132-button--leading e-91132-button-secondary--text-base encore-internal-color-text-base e-91132-button e-91132-baseline e-91132-button-secondary e-91132-overflow-wrap-anywhere" style="inline-size:100%" href="/en/login/apple?flow_ctx=940b4eaf-62f3-43eb-a3f3-d5c43210d5d3%3A1766570916" data-encore-id="buttonSecondary"><span aria-hidden="true" class="e-91132-button__icon-wrapper"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.195 4.513C15.873 3.69 16.351 2.567 16.351 1.433C16.351 1.278 16.341 1.123 16.318 1C15.206 1.044 13.872 1.734 13.083 2.668C12.449 3.379 11.871 4.513 11.871 5.647C11.871 5.825 11.905 5.991 11.916 6.047C11.982 6.058 12.094 6.08 12.216 6.08C13.206 6.08 14.45 5.413 15.195 4.513ZM15.973 6.313C14.317 6.313 12.961 7.325 12.093 7.325C11.171 7.325 9.97 6.38 8.525 6.38C5.779 6.38 3 8.648 3 12.918C3 15.586 4.023 18.398 5.301 20.211C6.391 21.744 7.347 23 8.725 23C10.081 23 10.682 22.1 12.371 22.1C14.083 22.1 14.472 22.978 15.973 22.978C17.463 22.978 18.453 21.61 19.397 20.265C20.442 18.72 20.887 17.219 20.897 17.142C20.809 17.119 17.963 15.952 17.963 12.695C17.963 9.871 20.198 8.604 20.331 8.504C18.852 6.381 16.596 6.314 15.973 6.314V6.313Z" fill="white"></path></svg></span>Continue with Apple</a></div>`,
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

export default function ExamplesTab() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <p className="text-sm" style={{ color: '#E9E9E9' }}>
          Pre-analyzed examples showing authentication detection results
        </p>
      </div>

      {examples.map((example, idx) => (
        <div
          key={idx}
          className="rounded-lg p-6"
          style={{
            backgroundColor: '#FFFFFF',
            border: `2px solid ${example.found ? '#3148F6' : '#E9E9E9'}`,
          }}
        >
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#1C2127' }}>
              {example.site_name}
            </h3>
            <a
              href={example.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
              style={{ color: '#3148F6' }}
            >
              {example.url}
            </a>
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            {example.found ? (
              <>
                {example.has_traditional_auth && (
                  <span
                    className="text-xs px-3 py-1 rounded font-semibold"
                    style={{ backgroundColor: '#3148F6', color: '#FFFFFF' }}
                  >
                    Traditional Auth
                  </span>
                )}
                {example.has_oauth && (
                  <span
                    className="text-xs px-3 py-1 rounded font-semibold"
                    style={{ backgroundColor: '#1C4B8F', color: '#FFFFFF' }}
                  >
                    OAuth
                  </span>
                )}
              </>
            ) : (
              <span
                className="text-xs px-3 py-1 rounded font-semibold"
                style={{ backgroundColor: '#E9E9E9', color: '#1C2127' }}
              >
                No Auth Found
              </span>
            )}
          </div>

          {example.explanation && (
            <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#E9E9E9' }}>
              <p className="text-sm" style={{ color: '#1C2127' }}>
                {example.explanation}
              </p>
            </div>
          )}

          {example.error && (
            <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#FFECB3', border: '1px solid #FFA000' }}>
              <p className="text-sm font-semibold" style={{ color: '#1C2127' }}>
                ⚠️ {example.error}
              </p>
            </div>
          )}

          {example.has_traditional_auth && example.traditional_auth_html && (
            <CodeDisplay
              html={example.traditional_auth_html}
              title="Traditional Login Form (Username/Password)"
              type="traditional"
            />
          )}

          {example.has_oauth && example.oauth_html && (
            <CodeDisplay
              html={example.oauth_html}
              title="OAuth/Social Login Buttons"
              type="oauth"
            />
          )}

          {!example.found && (
            <div className="text-center py-6">
              <p style={{ color: '#1C2127', opacity: 0.6 }}>
                No authentication components detected on this page
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
