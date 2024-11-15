import type { CollectionConfig } from 'payload'

import { env } from '@local/env/payload'
import { AdminAccess } from '@local/payload/access/AdminAccess'
import { EveryoneAccess } from '@local/payload/access/EveryoneAccess'
import { hideFromIndexingField } from '@local/payload/fields/hideFromIndexing'
import { publishedDateField } from '@local/payload/fields/publishedDate'
import { slugField } from '@local/payload/fields/slug'
import { titleField } from '@local/payload/fields/title'
import { PopulatePublishDateHook } from '@local/payload/hooks/PopulatePublishDateHook'
import { RevalidatePageHook } from '@local/payload/hooks/RevalidatePageHook'

export const Articles: CollectionConfig<'articles'> = {
  access: {
    create: AdminAccess,
    delete: AdminAccess,
    read: EveryoneAccess,
    update: AdminAccess,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'status', 'updatedAt', 'publishedDate'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => {
        if ('slug' in data && typeof data.slug === 'string') {
          return `${env.NEXT_PUBLIC_PAYLOAD_URL}/articles/${data.slug}?isLivePreview=true`
        }

        return ''
      },
    },
    pagination: {
      defaultLimit: 25,
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      tabs: [
        {
          fields: [...titleField()],
          label: 'Content',
        },
        {
          fields: [...slugField()],
          label: 'Path Setup',
        },
      ],
      type: 'tabs',
    },
    ...publishedDateField(),
    ...hideFromIndexingField(),
  ],
  hooks: {
    afterChange: [RevalidatePageHook],
    beforeChange: [PopulatePublishDateHook],
  },
  slug: 'articles',
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
    },
  },
}
