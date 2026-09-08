import InputStateAnimation from '@/components/snippets/previews/InputStateAnimation.astro'
import type { CollectionEntry } from 'astro:content'

type PreviewComponent = typeof InputStateAnimation

export enum Previews {
  INPUT_STATE_ANIMATION = 'input-state-animation'
}

const PREVIEWS_COMPONENTS: Record<Previews, PreviewComponent> = {
  [Previews.INPUT_STATE_ANIMATION]: InputStateAnimation
}

export const getPreviewComponent = (
  snippet: CollectionEntry<'snippets'>
): PreviewComponent => {
  return PREVIEWS_COMPONENTS[snippet.data.preview]
}
