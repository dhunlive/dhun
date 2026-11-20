-- ---------------------------------------------------------------------------
-- 041 · Social sign-in identities (build-plan M2, the OAuth item)
--
-- One row per (provider, provider's account id). The provider's `sub` is the
-- identity, NEVER the email: an address can change hands or be edited at the
-- provider, a `sub` cannot. The email is kept only as what the provider said
-- at link time, for support.
--
--   · UNIQUE (provider, subject)  — one Google account is one Dhun account.
--   · UNIQUE (user_id, provider)  — and a Dhun account holds at most one
--     Google account, so "which Google am I signed in with" has one answer.
--
-- Account deletion DELETES these rows (account.service.ts): an identity is a
-- way in, and a deleted account must have none left. The money trail does not
-- point here, so nothing append-only is lost.
--
-- The provider list is a CHECK so a typo cannot create a provider; adding
-- Facebook later is one more value here and a verifier in social.service.ts.
-- ---------------------------------------------------------------------------

CREATE TABLE user_identities (
  id            uuid PRIMARY KEY,
  user_id       uuid NOT NULL REFERENCES users (id),
  provider      text NOT NULL CHECK (provider IN ('google')),
  subject       text NOT NULL CHECK (length(subject) BETWEEN 1 AND 255),
  email         text CHECK (email IS NULL OR length(email) <= 254),
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_used_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (provider, subject),
  UNIQUE (user_id, provider)
);
