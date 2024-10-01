import { loadTagGroups } from '../../src/tags/tag-groups'

const languageWidget = {
  label: 'Language',
  name: 'language',
  widget: 'select',
  default: 'en',
  options: ['en', 'de'],
}

const blogSectionWidgetTags = {
  label: 'Blog section tags',
  name: 'blog_section_tags',
  widget: 'select',
  multiple: true,
  options: [] as string[],
}

const blogSectionWidget = [
  {
    label: 'Blog section',
    name: 'blog_section',
    widget: 'boolean',
  },
  blogSectionWidgetTags,
  {
    label: 'Blog section custom title',
    name: 'blog_section_title',
    widget: 'text',
  },
]

const testimonialsWidget = {
  label: 'Testimonials',
  name: 'testimonials',
  widget: 'list',
  fields: [
    {
      label: 'Quote',
      name: 'testimonials_quote',
      widget: 'markdown',
    },
    {
      label: 'Author',
      name: 'testimonials_author',
      widget: 'string',
    },
    {
      label: 'Photo',
      name: 'testimonials_photo',
      widget: 'image',
      required: false,
    },
    {
      label: 'Position',
      name: 'testimonials_position',
      widget: 'string',
    },
    {
      label: 'Company',
      name: 'testimonials_company',
      widget: 'string',
    },
  ],
}

export const blogCollectionName = 'blog'
const authorFieldName = 'author'
const secondAuthorFieldName = 'secondAuthor'
const thirdAuthorFieldName = 'thirdAuthor'

export const authorFieldNames = [authorFieldName, secondAuthorFieldName, thirdAuthorFieldName]

const config = {
  backend: {
    name: 'github',
    repo: 'bright/new-www',
    branch: 'gatsby',
    base_url: 'https://github-auth.brightinventions.pl',
  },
  publish_mode: 'editorial_workflow',
  site_url: 'https://brightinventions.pl/',
  logo_url: 'https://brightinventions.pl/images/logo.png',
  media_folder: '/static/images',
  public_folder: '/images',
  collections: [
    {
      name: blogCollectionName,
      label: 'Blog',
      folder: 'content/blog',
      create: true,
      sortable_fields: ['meaningfullyUpdatedAt'],
      fields: [
        {
          label: 'Author',
          name: authorFieldName,
          widget: 'relation',
          collection: 'members',
          searchFields: ['name'],
          valueField: 'author_id',
          displayFields: ['name', 'author_id'],
        },
        {
          label: 'SecondAuthor',
          name: secondAuthorFieldName,
          widget: 'relation',
          collection: 'members',
          searchFields: ['name'],
          valueField: 'author_id',
          displayFields: ['name', 'author_id'],
          required: false,
        },
        {
          label: 'ThirdAuthor',
          name: thirdAuthorFieldName,
          widget: 'relation',
          collection: 'members',
          searchFields: ['name'],
          valueField: 'author_id',
          displayFields: ['name', 'author_id'],
          required: false,
        },
        {
          label: 'Tags',
          name: 'tags',
          widget: 'tags',
        },
        {
          label: 'Publish Date',
          name: 'date',
          widget: 'datetime',
        },
        {
          label: 'Meaningfully updated at',
          name: 'meaningfullyUpdatedAt',
          widget: 'datetime',
          required: false,
          hint: 'when creating a new post, Update Date must be Publish date',
        },
        {
          label: 'Custom slug - do not change after publishing',
          name: 'slug',
          widget: 'string',
          required: false,
        },
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Body',
          name: 'body',
          widget: 'mdx',
        },
        {
          label: 'Layout',
          name: 'layout',
          widget: 'hidden',
          default: 'post',
        },
        {
          label: 'Featured Image',
          name: 'image',
          widget: 'image',
        },
        {
          label: 'Hidden',
          name: 'hidden',
          widget: 'boolean',
          default: false,
        },
        {
          label: 'Comments',
          name: 'comments',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Published',
          name: 'published',
          widget: 'boolean',
          default: true,
        },
        languageWidget,
      ],
    },
    {
      name: 'members',
      label: 'Members',
      folder: 'content/members',
      create: true,
      slug: '{{slug}}',
      identifier_field: 'name',
      fields: [
        {
          label: 'Layout',
          name: 'layout',
          widget: 'hidden',
          default: 'member',
        },
        {
          label: 'Author id',
          name: 'author_id',
          widget: 'string',
        },
        {
          label: 'No longer with us',
          name: 'ex',
          widget: 'boolean',
          default: false,
          required: false,
        },
        {
          label: 'Slug',
          name: 'slug',
          widget: 'string',
          hint: 'URL path',
        },
        {
          label: 'Name',
          name: 'name',
          widget: 'string',
        },
        {
          label: 'Short Name',
          name: 'short_name',
          widget: 'string',
        },
        {
          label: 'Email',
          name: 'email',
          widget: 'string',
        },
        {
          label: 'Bio',
          name: 'bio',
          widget: 'string',
        },
        {
          label: 'Description',
          name: 'description',
          widget: 'string',
        },
        {
          label: 'Website',
          name: 'web',
          widget: 'string',
          required: false,
        },
        {
          label: 'Avatar',
          name: 'avatar',
          widget: 'image',
          required: false,
        },
        {
          label: 'AvatarHover',
          name: 'avatar_hover',
          widget: 'image',
          required: false,
        },
        {
          label: 'Twitter',
          name: 'twitter',
          widget: 'string',
          required: false,
        },
        {
          label: 'Github',
          name: 'github',
          widget: 'string',
          required: false,
        },
        {
          label: 'Stack Overflow',
          name: 'stackoverflow',
          widget: 'string',
          required: false,
        },
        {
          label: 'Full description',
          name: 'body',
          widget: 'markdown',
        },
        {
          label: 'Redirect from',
          name: 'redirect_from',
          widget: 'list',
          allow_add: true,
          required: false,
        },
        {
          label: 'Published',
          name: 'published',
          widget: 'boolean',
          default: true,
        },
        languageWidget,
      ],
    },
    {
      name: 'jobs',
      label: 'Jobs',
      folder: 'content/jobs',
      create: true,
      slug: '{{slug}}',
      fields: [
        {
          label: 'Layout',
          name: 'layout',
          widget: 'hidden',
          default: 'job',
        },
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Subtitle',
          name: 'subtitle',
          widget: 'string',
        },
        {
          label: 'ImageJob',
          name: 'imagejob',
          widget: 'image',
        },
        {
          label: 'Image-Alt-Job',
          name: 'image-alt-job',
          widget: 'string',
        },
        {
          label: 'Hours',
          name: 'hours',
          widget: 'string',
        },
        {
          label: 'Salary',
          name: 'salary',
          widget: 'string',
        },
        {
          label: 'Salary Min',
          name: 'salary_min',
          widget: 'number',
          required: false,
        },
        {
          label: 'Salary Max',
          name: 'salary_max',
          widget: 'number',
          required: false,
        },
        {
          label: 'Working Time',
          name: 'working time',
          widget: 'select',
          options: ['full time', 'part time'],
        },
        {
          label: 'Technology',
          name: 'technology',
          widget: 'select',
          multiple: true,
          options: [
            'Android',
            'iOS',
            'Kotlin',
            'Blockchain',
            'Java',
            'Spring',
            'TypeScript',
            'React',
            'Angular',
            'Node.js',
            'NestJS',
            'MySQL',
            'PostgreSQL',
            'Swift',
            'AWS',
            'Bluetooth',
            'iBeaconIoT',
          ],
        },
        {
          label: ' New title More About Us',
          name: 'title_more_about_us',
          widget: 'string',
          required: false,
          hint: 'section more about us',
        },
        {
          label: 'Show new title More About Us',
          name: 'show_new_title_more_about_us',
          widget: 'boolean',
          default: false,
        },
        {
          label: 'Links',
          name: 'links_more_about_us',
          widget: 'markdown',
          required: false,
        },
        {
          label: 'Title Recruiter Info',
          name: 'title_recruiter_info',
          widget: 'string',
          required: false,
          hint: 'section recruiter info',
        },
        {
          label: 'Name Recruiter',
          name: 'name_recruiter',
          widget: 'string',
          required: false,
          hint: 'section recruiter info',
        },
        {
          label: 'Workplace Recruiter',
          name: 'workplace_recruiter',
          widget: 'string',
          required: false,
          hint: 'section recruiter info',
        },
        {
          label: 'Image Recruiter Info',
          name: 'image_recruiter_info',
          widget: 'image',
          required: false,
          hint: 'section recruiter info',
        },
        {
          label: 'Image Alt Recruiter Info',
          name: 'image_alt_recruiter_info',
          widget: 'string',
          required: false,
          hint: 'section recruiter info',
        },
        {
          label: 'Button LinkedIn ',
          name: 'button_linkedin',
          widget: 'string',
          required: false,
          hint: 'https://www.linkedin.com/in/your_address/  -section recruiter info',
        },
        {
          label: 'Button',
          name: 'button',
          widget: 'string',
        },
        {
          label: 'Body',
          name: 'body',
          widget: 'markdown',
        },
        {
          label: 'Redirect from',
          name: 'redirect_from',
          widget: 'list',
          allow_add: true,
          required: false,
        },
        {
          label: 'Published',
          name: 'published',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Show recruiter info',
          name: 'show_recruiter_info',
          widget: 'boolean',
          default: false,
        },
        {
          label: 'Order',
          name: 'order',
          widget: 'number',
          required: true,
          valueType: 'int',
          min: 1,
          step: 1,
          default: 1,
        },
        {
          label: 'Recruting Process Image2 Title',
          name: 'recruting_image2_title',
          widget: 'string',
        },
        {
          label: 'Recruting Process Image3 Title',
          name: 'recruting_image3_title',
          widget: 'string',
        },
        languageWidget,
      ],
    },
    {
      name: 'projects',
      label: 'Projects',
      folder: 'content/projects',
      create: true,
      slug: '{{slug}}',
      identifier_field: 'name',
      fields: [
        {
          label: 'TeamMembers',
          name: 'team_members',
          widget: 'relation',
          collection: 'members',
          searchFields: ['name'],
          valueField: 'author_id',
          displayFields: ['name', 'author_id'],
          multiple: true,
        },
        {
          label: 'Our Service',
          name: 'our_service',
          widget: 'relation',
          collection: 'our-areas',
          searchFields: ['name'],
          valueField: 'our_service_id',
          displayFields: ['name', 'our_service_id'],
          multiple: true,
        },
        {
          label: 'Layout',
          name: 'layout',
          widget: 'hidden',
          default: 'project',
        },
        {
          label: 'Project-id',
          name: 'project_id',
          widget: 'string',
        },
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Image',
          name: 'image',
          widget: 'image',
        },
        {
          label: 'Description',
          name: 'description',
          widget: 'text',
        },
        {
          label: 'Hero Image',
          name: 'hero_image',
          widget: 'image',
        },
        {
          label: 'Hero Image Alt',
          name: 'Hero Image_alt',
          widget: 'string',
        },
        {
          label: 'Social Media Previev',
          name: 'social_media_previev',
          widget: 'image',
        },
        {
          label: 'Social Media Previev Alt',
          name: 'social_media_previev_alt',
          widget: 'string',
        },
        {
          label: 'Achievements',
          name: 'bar_achievements',
          widget: 'list',
          fields: [
            {
              label: 'Number',
              name: 'number',
              widget: 'string',
            },
            {
              label: 'Label',
              name: 'label',
              widget: 'string',
            },
          ],
        },
        {
          label: 'Body',
          name: 'body',
          widget: 'markdown',
        },
        {
          label: 'Tags',
          name: 'tags',
          widget: 'list',
          allow_add: true,
        },
        {
          label: 'Title Team',
          name: 'title_team',
          widget: 'string',
        },
        {
          label: 'Title Case Study',
          name: 'title_case_study',
          widget: 'string',
        },
        {
          label: 'Title Contact',
          name: 'title_contact',
          widget: 'string',
        },
        {
          label: 'Description Contact',
          name: 'description_contact',
          widget: 'markdown',
        },
        {
          label: 'Order',
          name: 'order',
          widget: 'number',
          required: false,
          valueType: 'int',
          min: 1,
          step: 1,
          default: 99,
        },
        {
          label: 'Slug',
          name: 'slug',
          widget: 'string',
        },
        {
          label: 'Redirect from',
          name: 'redirect_from',
          widget: 'list',
          allow_add: true,
          required: false,
        },
        {
          label: 'Show team',
          name: 'show_team',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Show Case Study',
          name: 'show_case_study',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Show on homepage',
          name: 'show on homepage',
          widget: 'boolean',
          default: false,
        },
        {
          label: 'Published',
          name: 'published',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Work in progress',
          name: 'work_in_progress',
          widget: 'boolean',
          default: false,
        },
        languageWidget,
      ],
    },
    {
      name: 'our-areas',
      label: 'Our Service',
      folder: 'content/our-areas',
      create: true,
      slug: '{{slug}}',
      identifier_field: 'name',
      fields: [
        {
          label: 'TeamMembers',
          name: 'team_members',
          widget: 'relation',
          collection: 'members',
          searchFields: ['name'],
          valueField: 'author_id',
          displayFields: ['name', 'author_id'],
          multiple: true,
        },
        {
          label: 'FAQs',
          name: 'faqs',
          widget: 'relation',
          collection: 'faqs',
          searchFields: ['name'],
          valueField: 'faqs_id',
          displayFields: ['name', 'faqs_id'],
          multiple: true,
        },
        {
          label: 'Project',
          name: 'project',
          widget: 'relation',
          collection: 'projects',
          searchFields: ['name'],
          valueField: 'project_id',
          displayFields: ['name', 'project_id'],
          multiple: true,
        },
        {
          label: 'Layout',
          name: 'layout',
          widget: 'hidden',
          default: 'our-service',
        },
        {
          label: 'Our Service Id',
          name: 'our_service_id',
          widget: 'string',
        },
        {
          label: 'Meta title',
          name: 'meta_title',
          widget: 'text',
          pattern: ['^.{0,50}$', 'Must have no more than 50 characters'],
        },
        {
          label: 'Meta description',
          name: 'meta_description',
          widget: 'text',
          pattern: ['^.{0,160}$', 'Must have no more than 160 characters'],
        },
        {
          label: 'Our services icon',
          name: 'our_services_icon',
          widget: 'image',
        },
        {
          label: 'Name',
          name: 'name',
          widget: 'string',
        },
        {
          label: 'Slug',
          name: 'slug',
          widget: 'string',
          hint: 'URL path',
        },
        {
          label: 'Short Description Seen At What We Do',
          name: 'short_description',
          widget: 'markdown',
        },
        {
          label: 'Order',
          name: 'order',
          widget: 'number',
          required: false,
          valueType: 'int',
          min: 1,
          step: 1,
          default: 1,
        },
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Highlighted Words (Max. 2)',
          name: 'highlighted_word',
          widget: 'string',
        },
        {
          label: 'Image Our Service Desktop',
          name: 'image_our_service_desktop',
          widget: 'image',
        },
        {
          label: 'Image Our Service Mobile',
          name: 'image_our_service_mobile',
          widget: 'image',
        },
        {
          label: 'Image Alt OurService',
          name: 'image_alt_our_service',
          widget: 'string',
        },
        {
          label: 'Video Url',
          name: 'video_url',
          widget: 'string',
          required: false,
        },
        {
          label: 'Video file',
          name: 'video_file',
          widget: 'image',
          required: false,
        },
        {
          label: 'Video Placeholder Image',
          name: 'video_placeholder_image',
          widget: 'image',
          required: false,
        },
        {
          label: 'Bullet points',
          name: 'bullet_points',
          widget: 'list',
          summary: '{{fields.bullet_point}}',
          field: {
            label: 'Bullet point',
            name: 'bullet_point',
            widget: 'markdown',
          },
        },
        {
          label: 'Stack',
          name: 'bar_stack',
          allow_add: true,
          widget: 'list',
        },
        {
          label: 'Button',
          name: 'button',
          widget: 'string',
        },
        {
          label: 'Body',
          name: 'body',
          widget: 'markdown',
        },
        {
          label: 'Button2',
          name: 'button2',
          widget: 'string',
        },
        {
          label: 'Published',
          name: 'published',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Show case study',
          name: 'show_case_study',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Show technology stack',
          name: 'show_technology_stack',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Title Team',
          name: 'title_team',
          widget: 'string',
        },
        {
          label: 'Title Case Study',
          name: 'title_case_study',
          widget: 'string',
        },
        {
          label: 'Title FAQs',
          name: 'title_faqs',
          widget: 'string',
        },
        {
          label: 'Title Contact',
          name: 'title_contact',
          widget: 'string',
        },
        {
          label: 'Description Contact',
          name: 'description_contact',
          widget: 'markdown',
        },
        {
          label: 'Boxes',
          name: 'boxes',
          widget: 'list',
          summary: '{{fields.box_title}}',
          fields: [
            {
              label: 'Title',
              name: 'box_title',
              widget: 'string',
            },
            {
              label: 'Description',
              name: 'box_description',
              widget: 'markdown',
            },
            {
              label: 'Icon',
              name: 'box_icon',
              widget: 'image',
            },
          ],
        },
        languageWidget,
        ...blogSectionWidget,
        testimonialsWidget,
        {
          label: 'Show team',
          name: 'show_team',
          widget: 'boolean',
          default: true,
        },
      ],
    },
    {
      name: 'faqs',
      label: 'FAQs',
      folder: 'content/faqs',
      create: true,
      slug: '{{slug}}',
      identifier_field: 'name',
      fields: [
        {
          label: 'Layout',
          name: 'layout',
          widget: 'hidden',
          default: 'faqs',
        },
        {
          label: 'FAQs id',
          name: 'faqs_id',
          widget: 'string',
        },
        {
          label: 'Name',
          name: 'name',
          widget: 'string',
        },
        {
          label: 'Slug',
          name: 'slug',
          widget: 'string',
          hint: 'URL path',
          pattern: ['[a-z-]+', 'Only lowercase letters or -'],
        },
        {
          label: 'Question',
          name: 'question',
          widget: 'markdown',
        },
        {
          label: 'Answer',
          name: 'answer',
          widget: 'markdown',
        },
        {
          label: 'Published',
          name: 'published',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Show on Career',
          name: 'show_on_career',
          widget: 'boolean',
          default: false,
        },
        {
          label: 'Order',
          name: 'order',
          widget: 'number',
          required: false,
          valueType: 'int',
          min: 1,
          step: 1,
          default: 1,
        },
        languageWidget,
      ],
    },
  ],
}

const getTags = async () => {
  const ymlDocTags = await loadTagGroups()

  return ymlDocTags.allGroups.map(({ name }) => name)
}

function isBlogSectionWidget(field: unknown): field is typeof blogSectionWidgetTags {
  return (field as typeof blogSectionWidgetTags).name === 'blog_section_tags'
}

export default async () => {
  const options = await getTags()

  config.collections.forEach(collection => {
    collection.fields.forEach(field => {
      if (isBlogSectionWidget(field)) {
        field.options = options
      }
    })
  })

  return config
}
