---
title: 'Claude Code con cualquier modelo: OpenRouter como gateway'
date: 2026-09-30
excerpt: 'Claude Code lee unas pocas variables de entorno que deciden a dónde van las peticiones y qué modelo responde. Apúntalas a OpenRouter y el harness se queda mientras el modelo pasa a ser un argumento.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/claude-code-with-any-model-openrouter.png'
imageAlt: "Portada oscura con el texto 'Claude Code with any model' sobre una línea roja y la variable ANTHROPIC_BASE_URL"
counterpartId: 'en/claude-code-with-any-model-openrouter'
---

Llevo un tiempo usando Claude Code y en algún momento se me quedó una pregunta en la cabeza: ¿y si no quiero que Claude sea el modelo detrás de Claude Code?

Resulta que la herramienta es más flexible de lo que parece. Claude Code lee un conjunto de variables de entorno que controlan a dónde van sus peticiones a la API y qué modelo usa cada rol. La importante es `ANTHROPIC_BASE_URL`: apunta Claude Code a cualquier endpoint que hable la Messages API de Anthropic, no solo al de Anthropic.

Anthropic documenta esto para [LLM gateways](https://code.claude.com/docs/en/llm-gateway), y OpenRouter ofrece un endpoint compatible con Anthropic pensado justo para este caso.

## OpenRouter como gateway

En lugar de hablar directamente con Anthropic, Claude Code puede hablar con:

```text
https://openrouter.ai/api
```

OpenRouter es una sola API delante de cientos de modelos de decenas de proveedores, con una sola clave y una sola factura. Claude Code sigue hablando su protocolo nativo y OpenRouter traduce la petición para el modelo que hayas elegido. Sin proxy local de por medio.

Así mantienes la interfaz de Claude Code, sus herramientas, el loop del agente y la experiencia en terminal, y cambias lo que hay debajo.

Una advertencia antes de seguir. Claude Code está ajustado a la semántica de la API de Anthropic: tool calls, streaming, extended thinking. Un modelo que no sea de Anthropic puede manejar parte de eso peor, o no manejarlo. El propio OpenRouter recomienda el proveedor first-party de Anthropic para compatibilidad total. Trata los otros modelos como un experimento, no como un reemplazo directo.

## Las variables de entorno

Tres variables hacen la redirección:

```bash
export ANTHROPIC_BASE_URL="https://openrouter.ai/api"
export ANTHROPIC_AUTH_TOKEN="$OPENROUTER_API_KEY"
export ANTHROPIC_API_KEY=""
```

- `ANTHROPIC_BASE_URL` manda todas las peticiones a OpenRouter.
- `ANTHROPIC_AUTH_TOKEN` se autentica con tu clave de OpenRouter.
- `ANTHROPIC_API_KEY` tiene que estar vacía de forma explícita. Si tiene un valor, Claude Code puede volver a su autenticación normal con Anthropic. La [guía de integración de OpenRouter](https://openrouter.ai/docs/cookbook/coding-agents/claude-code-integration) también lo remarca.

Después, los overrides de modelo. Claude Code usa alias de modelo internamente (`opus`, `sonnet`, `haiku`, `fable`) y un valor por defecto aparte para los subagentes. Cada uno tiene su variable, [documentada aquí](https://code.claude.com/docs/en/model-config):

```bash
export ANTHROPIC_DEFAULT_FABLE_MODEL="$MODEL"
export ANTHROPIC_DEFAULT_OPUS_MODEL="$MODEL"
export ANTHROPIC_DEFAULT_SONNET_MODEL="$MODEL"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="$MODEL"
export CLAUDE_CODE_SUBAGENT_MODEL="$MODEL"
```

Pon todas. Si solo cambias el modelo principal, las tareas en segundo plano y los subagentes siguen pidiendo un modelo de Claude por alias, y acabas usando dos modelos sin darte cuenta.

Exportar ocho variables a mano cada vez cansa, así que lo metí en un comando.

## El script `orclaude`

La interfaz:

```text
orclaude <vendor/model-slug> [claude args...]
```

Por ejemplo:

```bash
orclaude anthropic/claude-sonnet-5.5
orclaude openai/gpt-6.1-sol
```

El script:

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

Las variables solo viven en ese proceso. Tu sesión normal de `claude` sigue en tu cuenta de siempre, y `orclaude` es la de OpenRouter. Sin proxy, sin contenedor de Docker, sin fork de Claude Code.

Para confirmar que funcionó, ejecuta `/status` dentro de la sesión. Debería mostrar el auth token como origen y `https://openrouter.ai/api` como base URL.

## Un comando `orclaude` nativo en PowerShell

En Windows, añade un wrapper a tu perfil de PowerShell (`notepad $PROFILE`) para que `orclaude` se comporte como cualquier otro comando:

```powershell
function orclaude {
    & "$HOME\Scripts\orclaude.ps1" @args
}
```

Como el modelo es solo un argumento, la versión de PowerShell también puede guardar una lista corta de favoritos y dejarte elegir uno por número:

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

Hay dos detalles fáciles de hacer mal:

- `@($args | Select-Object -Skip 1)` en lugar de `$args[1..($args.Count - 1)]`. Con un solo argumento, ese rango se convierte en `1..0`, que PowerShell recorre hacia atrás, así que el slug del modelo se le pasa a `claude` una segunda vez como argumento suelto.
- En PowerShell, asignar `""` a una variable de entorno la elimina del proceso actual. Para `ANTHROPIC_API_KEY` es justo lo que queremos: no queda ninguna clave a la que volver.

Ahora `orclaude -help` imprime la lista:

```text
Available models:

  [1] anthropic/claude-sonnet-5.5
  [2] openai/gpt-6.1-sol
  [3] google/gemini-3.8-flash
  [4] deepseek/deepseek-v4.1-flash
```

y `orclaude 3` arranca una sesión con el tercero. Un número fuera de la lista falla con un mensaje en lugar de lanzar Claude Code con un modelo vacío.

## macOS y Linux

En macOS o Linux, el script de Bash de arriba es toda la configuración. Guárdalo como `orclaude` en algún directorio de tu `$PATH` y hazlo ejecutable:

```bash
chmod +x orclaude
```

Y luego:

```bash
orclaude <vendor/model-slug>
```

Si prefieres que todas las sesiones pasen por OpenRouter, pon las variables en `~/.zshrc` o `~/.bashrc`. Esa es la configuración persistente que recomienda OpenRouter. Claude Code no lee archivos `.env`, así que el perfil de la shell es el sitio.

## Por qué importa la separación

El script es corto. Lo interesante es la arquitectura que deja ver.

Claude Code es el harness: las herramientas, los permisos, el loop del agente, la interfaz de terminal. El modelo es otra capa, y el harness no tiene por qué venir del mismo proveedor que el modelo.

Así que en lugar de:

> **Claude Code → Claude**

el stack pasa a ser:

> **Claude Code → gateway compatible con Anthropic → modelo**

Con OpenRouter como capa intermedia tienes una clave de API, una factura, un catálogo, routing entre proveedores con failover y seguimiento de uso en un solo panel. Cambiar de modelo es un argumento, no una migración.

Mantienes el flujo de Claude Code que ya conoces, y aun así puedes descubrir qué hace un modelo distinto dentro de él.
