---
title: 'Claude Code with any model: OpenRouter as the gateway'
date: 2026-09-30
excerpt: 'Claude Code reads a handful of environment variables that decide where requests go and which model answers. Point them at OpenRouter and the harness stays while the model becomes a flag.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/claude-code-with-any-model-openrouter.png'
imageAlt: "Dark title card reading 'Claude Code with any model' above a red rule and the ANTHROPIC_BASE_URL variable"
counterpartId: 'es/claude-code-con-cualquier-modelo-openrouter'
---

I've been using Claude Code for a while, and at some point a question stuck: what if I don't want Claude as the model behind Claude Code?

It turns out the tool is more flexible than it looks. Claude Code reads a set of environment variables that control where its API requests go and which model each role uses. The important one is `ANTHROPIC_BASE_URL`: it points Claude Code at any endpoint that speaks the Anthropic Messages API, not only Anthropic's own.

Anthropic documents this for [LLM gateways](https://code.claude.com/docs/en/llm-gateway), and OpenRouter ships an Anthropic-compatible endpoint built for exactly this case.

## OpenRouter as the gateway

Instead of talking to Anthropic directly, Claude Code can talk to:

```text
https://openrouter.ai/api
```

OpenRouter is one API in front of hundreds of models from dozens of providers, with a single key and a single bill. Claude Code keeps speaking its native protocol, and OpenRouter translates the request for whichever model you picked. No local proxy in between.

So you keep the Claude Code interface, its tools, the agent loop and the terminal experience, and you swap what sits underneath.

One caveat before going further. Claude Code is tuned for Anthropic's API semantics: tool calls, streaming, extended thinking. A non-Anthropic model may handle some of that worse, or not at all. OpenRouter itself recommends Anthropic's first-party provider for full compatibility. Treat other models as an experiment, not a drop-in.

## The environment variables

Three variables do the redirect:

```bash
export ANTHROPIC_BASE_URL="https://openrouter.ai/api"
export ANTHROPIC_AUTH_TOKEN="$OPENROUTER_API_KEY"
export ANTHROPIC_API_KEY=""
```

- `ANTHROPIC_BASE_URL` sends every request to OpenRouter.
- `ANTHROPIC_AUTH_TOKEN` authenticates with your OpenRouter key.
- `ANTHROPIC_API_KEY` must be explicitly empty. If it holds a value, Claude Code can fall back to its normal Anthropic auth. The [OpenRouter integration guide](https://openrouter.ai/docs/cookbook/coding-agents/claude-code-integration) calls this out too.

Then the model overrides. Claude Code uses model aliases internally (`opus`, `sonnet`, `haiku`, `fable`) plus a separate default for subagents. Each has its own variable, [documented here](https://code.claude.com/docs/en/model-config):

```bash
export ANTHROPIC_DEFAULT_FABLE_MODEL="$MODEL"
export ANTHROPIC_DEFAULT_OPUS_MODEL="$MODEL"
export ANTHROPIC_DEFAULT_SONNET_MODEL="$MODEL"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="$MODEL"
export CLAUDE_CODE_SUBAGENT_MODEL="$MODEL"
```

Set all of them. If you only change the main model, background tasks and subagents keep asking for a Claude model by alias, and you end up running two models without noticing.

Exporting eight variables by hand every time gets old, so I wrapped it in a command.

## The `orclaude` script

The interface:

```text
orclaude <vendor/model-slug> [claude args...]
```

For example:

```bash
orclaude anthropic/claude-sonnet-5.5
orclaude openai/gpt-6.1-sol
```

The script:

```bash
#!/usr/bin/env bash

# Run Claude Code against any OpenRouter model:
# orclaude <vendor/model-slug> [claude args...]

: "${OPENROUTER_API_KEY:?Set OPENROUTER_API_KEY in your shell profile}"

MODEL="${1:?Usage: orclaude <vendor/model-slug> [claude args...]}"
shift

export ANTHROPIC_BASE_URL="https://openrouter.ai/api"
export ANTHROPIC_AUTH_TOKEN="$OPENROUTER_API_KEY"
export ANTHROPIC_API_KEY=""

export ANTHROPIC_DEFAULT_FABLE_MODEL="$MODEL"
export ANTHROPIC_DEFAULT_OPUS_MODEL="$MODEL"
export ANTHROPIC_DEFAULT_SONNET_MODEL="$MODEL"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="$MODEL"
export CLAUDE_CODE_SUBAGENT_MODEL="$MODEL"

exec claude --model "$MODEL" "$@"
```

The variables only live in that process. Your normal `claude` session stays on your usual account, and `orclaude` is the OpenRouter one. No proxy, no Docker container, no fork of Claude Code.

To confirm it took, run `/status` inside the session. It should show the auth token as the source and `https://openrouter.ai/api` as the base URL.

## A native `orclaude` command in PowerShell

On Windows, add a wrapper to your PowerShell profile (`notepad $PROFILE`) so `orclaude` behaves like any other command:

```powershell
function orclaude {
    & "$HOME\Scripts\orclaude.ps1" @args
}
```

Since the model is only an argument, the PowerShell version can also keep a shortlist of favorites and let you pick one by number:

```powershell
# Run Claude Code against any OpenRouter model:
# orclaude <vendor/model-slug | list number> [claude args...]

$Models = @(
    "anthropic/claude-sonnet-5.5"
    "openai/gpt-6.1-sol"
    "google/gemini-3.8-flash"
    "deepseek/deepseek-v4.1-flash"
)

if ($args.Count -eq 0 -or $args[0] -in @("-help", "--help", "-h")) {
    Write-Host ""
    Write-Host "Available models:" -ForegroundColor Cyan
    for ($i = 0; $i -lt $Models.Count; $i++) {
        Write-Host "  [$($i + 1)] $($Models[$i])"
    }
    Write-Host ""
    exit 0
}

if (-not $env:OPENROUTER_API_KEY) {
    Write-Error "Set OPENROUTER_API_KEY in your environment"
    exit 1
}

$Model = [string]$args[0]
if ($Model -match '^\d+$') {
    $Index = [int]$Model
    if ($Index -lt 1 -or $Index -gt $Models.Count) {
        Write-Error "No model #$Index. Run orclaude -help to see the list."
        exit 1
    }
    $Model = $Models[$Index - 1]
}
$ClaudeArgs = @($args | Select-Object -Skip 1)

$env:ANTHROPIC_BASE_URL = "https://openrouter.ai/api"
$env:ANTHROPIC_AUTH_TOKEN = $env:OPENROUTER_API_KEY
$env:ANTHROPIC_API_KEY = ""

$env:ANTHROPIC_DEFAULT_FABLE_MODEL = $Model
$env:ANTHROPIC_DEFAULT_OPUS_MODEL = $Model
$env:ANTHROPIC_DEFAULT_SONNET_MODEL = $Model
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL = $Model
$env:CLAUDE_CODE_SUBAGENT_MODEL = $Model

& claude --model $Model @ClaudeArgs
exit $LASTEXITCODE
```

Two details in there are easy to get wrong:

- `@($args | Select-Object -Skip 1)` instead of `$args[1..($args.Count - 1)]`. With a single argument, that range becomes `1..0`, which PowerShell walks backwards, so the model slug gets passed to `claude` a second time as a stray argument.
- In PowerShell, assigning `""` to an environment variable removes it for the current process. For `ANTHROPIC_API_KEY` that is what we want: no key left to fall back to.

Now `orclaude -help` prints the list:

```text
Available models:

  [1] anthropic/claude-sonnet-5.5
  [2] openai/gpt-6.1-sol
  [3] google/gemini-3.8-flash
  [4] deepseek/deepseek-v4.1-flash
```

and `orclaude 3` starts a session on the third one. A number outside the list fails with a message instead of launching Claude Code with an empty model.

## macOS and Linux

For macOS or Linux, the Bash script above is the whole setup. Save it as `orclaude` somewhere in your `$PATH` and make it executable:

```bash
chmod +x orclaude
```

Then:

```bash
orclaude <vendor/model-slug>
```

If you'd rather have every session go through OpenRouter, put the variables in `~/.zshrc` or `~/.bashrc` instead. That is the persistent setup OpenRouter recommends. Claude Code does not read `.env` files, so the shell profile is the place.

## Why the split matters

The script is short. The interesting part is the architecture it exposes.

Claude Code is the harness: the tools, permissions, the agent loop, the terminal UI. The model is a separate layer, and the harness does not need to come from the same vendor as the model.

So instead of:

> **Claude Code → Claude**

the stack becomes:

> **Claude Code → Anthropic-compatible gateway → model**

With OpenRouter as that middle layer you get one API key, one bill, one catalog, provider routing with failover, and usage tracking in one dashboard. Switching models is an argument, not a migration.

You keep the Claude Code workflow you already know, and you can still find out what a different model does inside it.
