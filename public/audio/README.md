# Signature audio snippets

Empty on purpose — no real audio exists yet. Drop files in here with these
exact names and they pick up automatically, no code changes:

```
default/select.mp3    default/confirm.mp3
shadowork/select.mp3  shadowork/confirm.mp3
faerie/select.mp3     faerie/confirm.mp3
```

`select.*` is the short (~2-4s) hover snippet on the hex switcher at the top
of the page. `confirm.*` is the slightly longer sting played once you click
a hex and it becomes the active era.

The audio trigger component (`src/lib/useEraAudio.ts`) treats a missing or
failing file as a silent no-op, not an error — so the site works fine before
these exist and nothing needs updating when they land.
